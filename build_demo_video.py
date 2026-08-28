"""
OmniPulse AI - Automated Demo Video Generator
Generates high-resolution 1080p video presentation frames and compiles them into a smooth MP4 demo video using FFmpeg.
"""

import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "docs", "video_frames")
VIDEO_OUTPUT = os.path.join(os.path.dirname(__file__), "docs", "omnipulse_demo_video.mp4")
os.makedirs(OUTPUT_DIR, exist_ok=True)

WIDTH, HEIGHT = 1920, 1080
BG_COLOR = (6, 8, 13)
CARD_BG = (15, 23, 42)
CYAN = (0, 242, 254)
VIOLET = (139, 92, 246)
EMERALD = (16, 185, 129)
ROSE = (244, 63, 94)
WHITE = (248, 250, 252)
MUTED = (148, 163, 184)
BORDER = (30, 41, 59)

def get_font(size, bold=False):
    # Try Windows system fonts
    font_paths = [
        "C:\\Windows\\Fonts\\arialbd.ttf" if bold else "C:\\Windows\\Fonts\\arial.ttf",
        "C:\\Windows\\Fonts\\segoeuib.ttf" if bold else "C:\\Windows\\Fonts\\segoeui.ttf",
        "C:\\Windows\\Fonts\\msyhbd.ttc" if bold else "C:\\Windows\\Fonts\\msyh.ttc"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

def draw_header(draw, title_text, category="OMNIPULSE AI // DEMO SHOWCASE"):
    # Header badge
    draw.rectangle([80, 50, 420, 85], fill=(0, 242, 254, 35), outline=CYAN, width=1)
    draw.text((100, 58), category, font=get_font(16, bold=True), fill=CYAN)
    draw.text((80, 105), title_text, font=get_font(42, bold=True), fill=WHITE)
    draw.line([80, 175, 1840, 175], fill=BORDER, width=2)

def draw_card(draw, box, title="", subtitle=""):
    x1, y1, x2, y2 = box
    draw.rounded_rectangle([x1, y1, x2, y2], radius=16, fill=CARD_BG, outline=BORDER, width=1)
    if title:
        draw.text((x1 + 30, y1 + 25), title, font=get_font(24, bold=True), fill=WHITE)
    if subtitle:
        draw.text((x1 + 30, y1 + 65), subtitle, font=get_font(16), fill=MUTED)

def create_slide_1():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Title & Hero
    draw.rectangle([80, 140, 560, 185], fill=(0, 242, 254, 40), outline=CYAN, width=2)
    draw.text((100, 150), "AI BUILDERS HACKATHON 2026 // BEST SAAS PRODUCT", font=get_font(18, bold=True), fill=CYAN)
    
    draw.text((80, 220), "OmniPulse AI", font=get_font(84, bold=True), fill=CYAN)
    draw.text((80, 330), "Autonomous Enterprise Market & Competitor Intelligence Platform", font=get_font(34, bold=True), fill=WHITE)
    draw.text((80, 390), "Continuous Multi-Agent Web Reconnaissance, Dynamic SWOT Telemetry & Revenue Counter-Playbooks", font=get_font(22), fill=MUTED)

    # 3 Core Highlights
    cards = [
        ("🛰️ 4-Agent Autonomous Swarm", "Recon Scout, Sentiment Lens, StratOps Moat, and Action Dispatch executing parallel missions."),
        ("🌐 Real-Time Live Web Crawler", "Scrapes domain sitemaps, pricing matrices, and HTML features on any target startup."),
        ("🎯 Tactical Action Playbooks", "Synthesizes battlecards, ARR projections, and one-click Jira & Slack dispatch backlogs.")
    ]
    for i, (title, desc) in enumerate(cards):
        x = 80 + i * 595
        draw_card(draw, [x, 500, x + 565, 840], title)
        draw.text((x + 30, 580), desc, font=get_font(20), fill=MUTED)
        draw.rectangle([x + 30, 750, x + 240, 795], fill=(16, 185, 129, 30), outline=EMERALD, width=1)
        draw.text((x + 45, 762), "🟢 PRODUCTION READY", font=get_font(15, bold=True), fill=EMERALD)

    # Footer
    draw.text((80, 980), "Open Source Repository: https://github.com/huanglianggit/OmniPulse-AI", font=get_font(18), fill=CYAN)
    return img

def create_slide_2():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "The Problem vs. The OmniPulse Solution")

    # Left: The Problem
    draw_card(draw, [80, 210, 920, 880], "❌ The Pain: Manual & Fragmented Market Tracking")
    problems = [
        ("20+ Hours Wasted Weekly", "Teams manually refresh competitor changelogs, pricing tables, and G2 reviews."),
        ("Disjointed & Blind Decisions", "Critical competitor pricing updates are discovered weeks too late when deals are lost."),
        ("Lack of Actionable Counter-Strategies", "Generic LLM summaries fail to provide engineering sprint tasks and ARR models.")
    ]
    for i, (t, d) in enumerate(problems):
        y = 300 + i * 180
        draw.rectangle([110, y, 890, y + 140], fill=(244, 63, 94, 20), outline=ROSE, width=1)
        draw.text((135, y + 20), t, font=get_font(22, bold=True), fill=ROSE)
        draw.text((135, y + 60), d, font=get_font(16), fill=WHITE)

    # Right: The Solution
    draw_card(draw, [960, 210, 1840, 880], "✅ The Solution: Autonomous Multi-Agent Intelligence")
    solutions = [
        ("Autonomous Parallel Swarm", "4 specialized AI agents scrape, cluster sentiment, and model moats in under 5 seconds."),
        ("Domain-Adaptive Intelligence", "Automatically switches analysis framework between SaaS, E-Commerce, DevTools, & Fintech."),
        ("Executive Action Dispatch", "Generates prioritized sprint backlogs with estimated ARR impacts, pushable to Slack & Jira.")
    ]
    for i, (t, d) in enumerate(solutions):
        y = 300 + i * 180
        draw.rectangle([990, y, 1810, y + 140], fill=(16, 185, 129, 20), outline=EMERALD, width=1)
        draw.text((1015, y + 20), t, font=get_font(22, bold=True), fill=EMERALD)
        draw.text((1015, y + 60), d, font=get_font(16), fill=WHITE)

    return img

def create_slide_3():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Multi-Agent Swarm Architecture")

    # 4 Agents Flow
    agents = [
        ("🛰️ Recon Scout Agent", "Web & Pricing Intelligence", "Crawls target domains, parses HTML sitemaps, pricing matrices, and technical endpoints in real-time.", CYAN),
        ("🎙️ Sentiment Lens Agent", "Voice of Customer Miner", "Ingests 850+ reviews across G2, Reddit, & TrustPilot to isolate customer churn vulnerabilities.", VIOLET),
        ("⚔️ StratOps Moat Agent", "SWOT & Elasticity Engine", "Synthesizes 5-dimension Capability Radar scores, price elasticity deltas, and moat indices.", (245, 158, 11)),
        ("🎯 Action Dispatch Agent", "Tactical Playbook Synthesizer", "Drafts counter-attack playbooks with projected ARR ROI, sprint tasks, and webhook dispatches.", EMERALD)
    ]

    for i, (name, role, desc, color) in enumerate(agents):
        x = 80 + i * 445
        draw.rounded_rectangle([x, 240, x + 420, 820], radius=16, fill=CARD_BG, outline=color, width=2)
        draw.text((x + 25, 270), name, font=get_font(24, bold=True), fill=WHITE)
        draw.text((x + 25, 310), role, font=get_font(16, bold=True), fill=color)
        draw.line([x + 25, 350, x + 395, 350], fill=BORDER, width=1)
        draw.text((x + 25, 380), desc, font=get_font(17), fill=MUTED)
        
        # Bottom Status
        draw.rectangle([x + 25, 730, x + 395, 780], fill=(255, 255, 255, 10), outline=BORDER, width=1)
        draw.text((x + 40, 745), "⚡ PARALLEL WORKFLOW", font=get_font(14, bold=True), fill=color)

    # Synthesis Bar
    draw.rounded_rectangle([80, 870, 1840, 970], radius=12, fill=(0, 242, 254, 25), outline=CYAN, width=1)
    draw.text((120, 905), "➡️ Central Intelligence Engine: Synthesizes Radar Polygons, Battlecards, Playbooks, and Executive Dossiers.", font=get_font(20, bold=True), fill=WHITE)
    return img

def create_slide_4():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Feature 1: Executive Analytics Dashboard")

    # 4 Metric Cards
    metrics = [
        ("Competitor Threat Index", "84 / 100", "+12% MoM High Alert", (245, 158, 11)),
        ("Pricing Advantage Gap", "-18%", "18% Lower Than Linear Pro", EMERALD),
        ("Customer Sentiment Score", "86 / 100", "+6.8 pts vs Industry Avg", VIOLET),
        ("Feature Parity Ratio", "87%", "26 / 30 Tracked Features", CYAN)
    ]
    for i, (label, val, change, col) in enumerate(metrics):
        x = 80 + i * 445
        draw_card(draw, [x, 210, x + 420, 390])
        draw.text((x + 30, 235), label, font=get_font(16), fill=MUTED)
        draw.text((x + 30, 275), val, font=get_font(42, bold=True), fill=col)
        draw.text((x + 30, 340), change, font=get_font(15, bold=True), fill=EMERALD)

    # Left: Radar Visualizer
    draw_card(draw, [80, 420, 980, 950], "📡 5-Dimension Capability Radar", "Dynamic multi-vector benchmark vs. cohort averages")
    radar_axes = ["Product Velocity (88)", "Pricing Power (78)", "Sentiment (86)", "Moat (82)", "Autonomy (90)"]
    for i, ax in enumerate(radar_axes):
        draw.rectangle([110, 530 + i * 75, 950, 585 + i * 75], fill=(0, 242, 254, 15), outline=BORDER, width=1)
        draw.text((130, 545 + i * 75), f"🔹 {ax}", font=get_font(18, bold=True), fill=WHITE)
        draw.text((800, 545 + i * 75), "🟢 Superior Lead", font=get_font(15), fill=EMERALD)

    # Right: Historical Trend & Signals
    draw_card(draw, [1010, 420, 1840, 950], "📈 6-Month Market Velocity Trend & Live Signals", "MoM Product acceleration and threat movement")
    signals = [
        ("🟢 Notion AI", "Deployed 2 new database endpoints for enterprise sync."),
        ("🔴 Linear", "Customer churn up 4% due to limited team document collaboration."),
        ("🟢 Supabase", "Vector search latency dropped 15ms on Edge functions.")
    ]
    for i, (head, text) in enumerate(signals):
        y = 530 + i * 130
        draw.rectangle([1040, y, 1810, y + 100], fill=(255, 255, 255, 8), outline=BORDER, width=1)
        draw.text((1065, y + 20), head, font=get_font(18, bold=True), fill=WHITE)
        draw.text((1065, y + 55), text, font=get_font(16), fill=MUTED)

    return img

def create_slide_5():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Feature 2: Real-Time Web Crawler & Custom Target Scan")

    # Top Hero Box
    draw_card(draw, [80, 210, 1840, 390], "🔍 1-Click Live Target Reconnaissance", "Input ANY startup or enterprise URL (e.g. Linear, Cursor, Resend, JD.com)")
    draw.rectangle([110, 290, 1400, 350], fill=(0, 0, 0, 80), outline=CYAN, width=2)
    draw.text((135, 305), "https://cursor.com  |  Target: Cursor AI Editor", font=get_font(22), fill=CYAN)
    draw.rectangle([1430, 290, 1810, 350], fill=CYAN, outline=CYAN)
    draw.text((1460, 305), "🚀 LAUNCH SWARM SCAN", font=get_font(20, bold=True), fill=(6, 8, 13))

    # Real-Time Telemetry Breakdown
    boxes = [
        ("🌐 1. Live Web Crawler", "Zero-dependency crawler fetches HTML, sitemaps, pricing keywords, & metadata.", CYAN),
        ("🤖 2. Multi-Model LLM Engine", "DeepSeek-V3/R1, OpenAI GPT-4o, Gemini 1.5, or Local Ollama parse raw telemetry.", VIOLET),
        ("📊 3. Domain Adaptation", "Automatically tunes SWOT & metrics to the exact industry (SaaS, E-Commerce, DevTools).", EMERALD)
    ]
    for i, (title, desc, color) in enumerate(boxes):
        x = 80 + i * 595
        draw_card(draw, [x, 430, x + 565, 880], title)
        draw.text((x + 30, 520), desc, font=get_font(20), fill=MUTED)
        draw.rectangle([x + 30, 770, x + 320, 830], fill=(255, 255, 255, 10), outline=color, width=1)
        draw.text((x + 50, 788), "✓ 100% Dynamic Pipeline", font=get_font(16, bold=True), fill=color)

    return img

def create_slide_6():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Feature 3: Competitor Battlecards & Strategic Playbooks")

    # Left: Battlecards
    draw_card(draw, [80, 210, 980, 920], "🏢 Deep Competitor Battlecards", "Tear down competitor moats and exploit vulnerabilities")
    comps = [
        ("Notion AI (Enterprise Leader)", "Threat Score: 88/100  |  $18/mo", "Sluggish mobile UX & limited autonomous loop support."),
        ("Linear (High-Speed Challenger)", "Threat Score: 82/100  |  $12/mo", "Lacks general document collaboration for non-eng teams."),
        ("Taskade AI (Agentic Competitor)", "Threat Score: 68/100  |  $10/mo", "Steep learning curve and complex UI customization.")
    ]
    for i, (name, stats, vuln) in enumerate(comps):
        y = 300 + i * 190
        draw.rectangle([110, y, 950, y + 160], fill=(255, 255, 255, 8), outline=BORDER, width=1)
        draw.text((130, y + 20), name, font=get_font(20, bold=True), fill=WHITE)
        draw.text((130, y + 55), stats, font=get_font(16), fill=CYAN)
        draw.text((130, y + 95), f"🔴 Exploitable Weakness: {vuln}", font=get_font(16), fill=ROSE)

    # Right: Playbooks & Webhooks
    draw_card(draw, [1010, 210, 1840, 920], "🎯 Autonomous Counter-Playbooks", "Tactical revenue campaigns with Jira & Slack dispatch")
    playbooks = [
        ("Playbook #1: Flat Team Pricing Conquest", "+$320k Projected ARR", "Target rival seat fees with 3-click transparent migration tooling."),
        ("Playbook #2: Autonomous Multi-Agent Leapfrog", "+35% User Retention", "Deliver automated background task execution to outpace manual rivals."),
        ("Playbook #3: Open-Source Benchmark Sandbox", "+50k Dev Signups", "Live-stream public vector query benchmarks to capture market voice.")
    ]
    for i, (title, impact, desc) in enumerate(playbooks):
        y = 300 + i * 190
        draw.rectangle([1040, y, 1810, y + 160], fill=(16, 185, 129, 15), outline=EMERALD, width=1)
        draw.text((1065, y + 20), title, font=get_font(20, bold=True), fill=WHITE)
        draw.text((1065, y + 55), f"💰 ROI Impact: {impact}", font=get_font(16, bold=True), fill=EMERALD)
        draw.text((1065, y + 95), desc, font=get_font(16), fill=MUTED)

    return img

def create_slide_7():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Feature 4: Customer Voice Miner & 1-Click Export")

    # Left: Sentiment Miner
    draw_card(draw, [80, 210, 980, 920], "🎙️ Unsupervised Customer Voice Mining", "Isolate key praise themes vs competitor churn triggers")
    draw.rectangle([110, 300, 950, 560], fill=(16, 185, 129, 20), outline=EMERALD, width=1)
    draw.text((135, 325), "🟢 Why Customers Choose Us (92% Sentiment)", font=get_font(20, bold=True), fill=EMERALD)
    draw.text((135, 370), '"Sub-20ms query response time and instant team collaboration\nhave transformed our workflow."', font=get_font(18), fill=WHITE)

    draw.rectangle([110, 600, 950, 860], fill=(244, 63, 94, 20), outline=ROSE, width=1)
    draw.text((135, 625), "🔴 Competitor Churn Risk (48% Friction)", font=get_font(20, bold=True), fill=ROSE)
    draw.text((135, 670), '"Unpredictable seat pricing and slow customer support response\nare driving users to seek alternatives."', font=get_font(18), fill=WHITE)

    # Right: Export Dossier
    draw_card(draw, [1010, 210, 1840, 920], "📑 1-Click Executive Intelligence Dossier", "Instant board-ready briefings and print-ready PDFs")
    draw.rectangle([1040, 300, 1810, 860], fill=(0, 0, 0, 90), outline=BORDER, width=1)
    dossier_preview = """# OmniPulse AI - Executive Intelligence Dossier
Target Platform: OmniFlow Workspace (Enterprise Multi-Agent)
Overall Threat Index: 78 / 100 (High Alert)
Pricing Gap: -18% vs Sector Benchmark
Customer Sentiment: 84/100 (+6.4 pts Lead)

Key Attack Angles:
1. Launch Flat Team Pricing Conquest (+$320k ARR)
2. Deploy Zero-Cold-Start Benchmark Sandbox
3. Trigger Webhook to Slack #executive-strategy"""
    draw.text((1070, 330), dossier_preview, font=get_font(20), fill=CYAN)

    return img

def create_slide_8():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Conclusion Slide
    draw.rectangle([80, 120, 520, 165], fill=(0, 242, 254, 40), outline=CYAN, width=2)
    draw.text((100, 130), "SUMMARY & FUTURE ROADMAP", font=get_font(18, bold=True), fill=CYAN)

    draw.text((80, 200), "Why OmniPulse AI Wins 'Best SaaS Product'", font=get_font(52, bold=True), fill=WHITE)

    points = [
        ("🏆 High-Impact B2B Value", "Transforms 20+ hours of manual weekly research into 5 seconds of automated strategic clarity."),
        ("🤖 True Multi-Agent Orchestration", "Not a chatbot wrapper — 4 autonomous specialist agents scraping, clustering, and reasoning in parallel."),
        ("🌐 100% Portable & Zero-Dependency", "Runs instantly on any browser or server with native web standards & flexible LLM backend."),
        ("💼 Board-Ready Execution", "Directly bridges raw web telemetry to actionable revenue playbooks and Jira sprint backlogs.")
    ]

    for i, (title, desc) in enumerate(points):
        y = 300 + i * 140
        draw.rounded_rectangle([80, y, 1840, y + 110], radius=12, fill=CARD_BG, outline=BORDER, width=1)
        draw.text((110, y + 20), title, font=get_font(24, bold=True), fill=CYAN)
        draw.text((110, y + 60), desc, font=get_font(18), fill=MUTED)

    draw.rounded_rectangle([80, 880, 1840, 980], radius=12, fill=(16, 185, 129, 30), outline=EMERALD, width=2)
    draw.text((120, 915), "🚀 GitHub: https://github.com/huanglianggit/OmniPulse-AI  |  AI Builders Hackathon 2026", font=get_font(22, bold=True), fill=WHITE)

    return img

def generate_all_frames():
    slides = [
        (create_slide_1, 24 * 7),  # 7 seconds
        (create_slide_2, 24 * 8),  # 8 seconds
        (create_slide_3, 24 * 8),  # 8 seconds
        (create_slide_4, 24 * 9),  # 9 seconds
        (create_slide_5, 24 * 9),  # 9 seconds
        (create_slide_6, 24 * 9),  # 9 seconds
        (create_slide_7, 24 * 8),  # 8 seconds
        (create_slide_8, 24 * 7),  # 7 seconds
    ]

    frame_idx = 0
    for s_idx, (slide_func, frame_count) in enumerate(slides):
        print(f"[Video Generator] Rendering Slide {s_idx + 1}/{len(slides)} ({frame_count} frames)...")
        img = slide_func()
        slide_img_path = os.path.join(OUTPUT_DIR, f"slide_{s_idx:02d}.png")
        img.save(slide_img_path)

        for _ in range(frame_count):
            frame_path = os.path.join(OUTPUT_DIR, f"frame_{frame_idx:05d}.png")
            img.save(frame_path)
            frame_idx += 1

    print(f"[Video Generator] Total frames generated: {frame_idx}")
    print(f"[Video Generator] Encoding MP4 video using FFmpeg...")

    # Encode with FFmpeg (24 fps, H.264, yuv420p)
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-r", "24",
        "-i", os.path.join(OUTPUT_DIR, "frame_%05d.png"),
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-crf", "18",
        "-preset", "fast",
        VIDEO_OUTPUT
    ]
    subprocess.run(ffmpeg_cmd, check=True)
    print(f"[Video Generator] ✅ Video generated successfully: {VIDEO_OUTPUT}")

if __name__ == "__main__":
    generate_all_frames()
