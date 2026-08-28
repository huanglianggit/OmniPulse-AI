"""
OmniPulse AI - Unified Production Server
Serves static frontend assets & handles live multi-agent crawling API endpoints.
Zero-dependency implementation using Python standard library.
"""

import http.server
import socketserver
import json
import os
import sys

# Configure standard output to utf-8 for Windows compatibility
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if sys.stderr and hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

# Add backend directory to sys.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from crawler import crawl_url
from agent_orchestrator import AgentOrchestrator

PORT = 8080

class OmniPulseRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for local testing
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "service": "OmniPulse AI Swarm Server v2.6"}).encode("utf-8"))
            return

        # Serve static files
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/scan":
            try:
                content_length = int(self.headers.get("Content-Length", 0))
                body_bytes = self.rfile.read(content_length)
                body = json.loads(body_bytes.decode("utf-8"))

                target_url = body.get("url", "https://linear.app").strip()
                target_name = body.get("targetName", "").strip()
                if not target_name:
                    target_name = target_url.replace("https://", "").replace("http://", "").split(".")[0].capitalize()

                api_key = body.get("apiKey", "").strip()
                api_base = body.get("apiBase", "https://api.deepseek.com/v1").strip()
                model = body.get("model", "deepseek-chat").strip()

                print(f"\n[OmniPulse Server] 🛰️ Launching Real Crawl for: {target_url} ({target_name})")
                
                # Step 1: Live Web Crawl
                scraped_data = crawl_url(target_url)
                print(f"[OmniPulse Server] ✅ Scraped Title: {scraped_data.get('title')}")

                # Step 2: Multi-Agent Synthesis (LLM or Heuristic)
                orchestrator = AgentOrchestrator(api_key=api_key, api_base=api_base, model=model)
                intelligence_data = orchestrator.synthesize_intelligence(target_name, target_url, scraped_data)

                # Return structured JSON
                response_bytes = json.dumps(intelligence_data).encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(response_bytes)
                print(f"[OmniPulse Server] 🎯 Intelligence synthesis complete and delivered.")

            except Exception as e:
                print(f"[OmniPulse Server] ❌ Error processing /api/scan: {e}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()


def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), OmniPulseRequestHandler) as httpd:
        print(f"===========================================================")
        print(f"🚀 OmniPulse AI Server running at http://localhost:{PORT}")
        print(f"🛰️ Live Web Crawler & Multi-Agent API Active at /api/scan")
        print(f"===========================================================")
        httpd.serve_forever()


if __name__ == "__main__":
    run_server()
