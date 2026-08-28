"""
OmniPulse AI - Live Web Crawler & Telemetry Extractor
Extracts clean metadata, headings, pricing signals, and product specs from any public URL.
Built with Python standard library for zero-dependency portability.
"""

import urllib.request
import urllib.error
import ssl
import re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.meta_desc = ""
        self.headings = []
        self.paragraphs = []
        self.pricing_texts = []
        self._current_tag = None
        self._in_title = False
        self._in_heading = False
        self._current_heading_text = ""
        self._current_p_text = ""

    def handle_starttag(self, tag, attrs):
        self._current_tag = tag.lower()
        attr_dict = dict(attrs)

        if self._current_tag == "title":
            self._in_title = True
        elif self._current_tag in ["h1", "h2", "h3"]:
            self._in_heading = True
            self._current_heading_text = ""
        elif self._current_tag == "meta":
            name = attr_dict.get("name", "").lower()
            prop = attr_dict.get("property", "").lower()
            content = attr_dict.get("content", "")
            if name == "description" or prop == "og:description":
                if not self.meta_desc:
                    self.meta_desc = content

    def handle_endtag(self, tag):
        t = tag.lower()
        if t == "title":
            self._in_title = False
        elif t in ["h1", "h2", "h3"]:
            self._in_heading = False
            if self._current_heading_text.strip():
                self.headings.append(self._current_heading_text.strip())
        elif t == "p":
            if self._current_p_text.strip():
                self.paragraphs.append(self._current_p_text.strip())
            self._current_p_text = ""
        self._current_tag = None

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return

        if self._in_title:
            self.title += " " + text
        elif self._in_heading:
            self._current_heading_text += " " + text
        elif self._current_tag == "p":
            self._current_p_text += " " + text

        # Capture pricing patterns ($10, €15, /mo, /month, /user)
        if re.search(r'(\$\d+|\€\d+|free|pricing|tier|plan|per month|\/mo)', text, re.IGNORECASE):
            if len(text) < 120 and text not in self.pricing_texts:
                self.pricing_texts.append(text)


def crawl_url(url: str, timeout: int = 8) -> dict:
    """
    Fetch and extract structured content from a target URL.
    """
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 (OmniPulse-AI-Crawler/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
    }

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    req = urllib.request.Request(url, headers=headers)
    
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=timeout) as response:
            html_bytes = response.read(500000) # Read up to 500KB
            charset = response.headers.get_content_charset() or "utf-8"
            html_text = html_bytes.decode(charset, errors="ignore")

        parser = TextExtractor()
        parser.feed(html_text)

        # Assemble clean summary text for LLM
        clean_title = parser.title.strip() or url
        clean_desc = parser.meta_desc.strip()
        top_headings = parser.headings[:15]
        top_paragraphs = parser.paragraphs[:10]
        pricing_signals = parser.pricing_texts[:10]

        combined_summary = f"""Target URL: {url}
Title: {clean_title}
Description: {clean_desc}
Key Product Headings:
{chr(10).join(['- ' + h for h in top_headings])}
Key Value Propositions:
{chr(10).join(['- ' + p for p in top_paragraphs[:6]])}
Pricing & Tier Signals:
{chr(10).join(['- ' + p for p in pricing_signals[:8]])}
"""
        return {
            "success": True,
            "url": url,
            "title": clean_title,
            "description": clean_desc,
            "headings": top_headings,
            "pricing_signals": pricing_signals,
            "raw_summary": combined_summary
        }

    except Exception as e:
        return {
            "success": False,
            "url": url,
            "error": str(e),
            "raw_summary": f"Target URL: {url}\nCould not crawl directly due to: {str(e)}. Fallback to sector intelligence analysis."
        }
