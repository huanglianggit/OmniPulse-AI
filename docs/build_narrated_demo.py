"""
OmniPulse AI - Production Narrated WebApp Demo Video Builder
Takes real 1080p WebApp UI captures, generates synchronized TTS voiceover for each scene,
renders smooth subtitle overlays, and compiles a complete broadcast-ready MP4 with audio using FFmpeg.
"""

import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCREENS_DIR = os.path.join(BASE_DIR, "app_screens")
AUDIO_DIR = os.path.join(BASE_DIR, "audio_clips")
FRAMES_DIR = os.path.join(BASE_DIR, "narrated_frames")
FINAL_MP4 = os.path.join(BASE_DIR, "omnipulse_demo_video.mp4")

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(FRAMES_DIR, exist_ok=True)

# 12-Scene Script with Real UI Screen mappings
SCENES = [
    {
        "id": "scene_01",
        "image": "01_dashboard_overview.png",
        "title": "1. EXECUTIVE MISSION CONTROL",
        "sub": "Autonomous Multi-Agent Reconnaissance in Enterprise Productivity & SaaS.",
        "narration": "Welcome to OmniPulse AI, the autonomous enterprise market and competitor intelligence platform. Here in the Strategic Mission Control, leadership teams get continuous real-time reconnaissance across their entire competitive landscape."
    },
    {
        "id": "scene_02",
        "image": "12_dashboard_final.png",
        "title": "2. DYNAMIC 5D CAPABILITY RADAR & METRICS",
        "sub": "Real-time benchmark modeling across velocity, pricing power, and customer sentiment.",
        "narration": "Our dynamic Five-Dimension Capability Radar and Threat Gauges model product velocity, pricing advantages, customer sentiment, moats, and autonomous execution against cohort benchmarks in real time."
    },
    {
        "id": "scene_03",
        "image": "02_mission_control.png",
        "title": "3. AUTONOMOUS 4-AGENT SWARM ORCHESTRATOR",
        "sub": "Specialist agents execute parallel web scraping, sentiment clustering, and SWOT modeling.",
        "narration": "Under the hood, our four-agent autonomous swarm executes parallel missions. Recon Scout scrapes live target domains, Sentiment Lens ingests customer feedback, StratOps Moat models elasticity, and Action Dispatch synthesizes counter-strategies."
    },
    {
        "id": "scene_04",
        "image": "04_mission_complete.png",
        "title": "4. LIVE SWARM EXECUTION & REASONING STREAM",
        "sub": "Encrypted real-time telemetry stream updating sector intelligence in under 5 seconds.",
        "narration": "With a single click, the swarm triggers parallel reconnaissance, streaming live reasoning logs and updating market telemetry in under five seconds."
    },
    {
        "id": "scene_05",
        "image": "05_competitor_battlecards.png",
        "title": "5. IN-DEPTH COMPETITOR BATTLECARDS",
        "sub": "Comprehensive teardown of competitor tiers, pricing models, moats, and vulnerabilities.",
        "narration": "In the Competitor Battlecards view, teams can inspect detailed competitor tiers, pricing models, core moats, and exploitable vulnerabilities."
    },
    {
        "id": "scene_06",
        "image": "06_strategic_playbooks.png",
        "title": "6. AUTONOMOUS STRATEGIC COUNTER-PLAYBOOKS",
        "sub": "AI-synthesized tactical campaigns designed to exploit rival gaps and capture market share.",
        "narration": "Actionable Counter-Playbooks generate prioritized revenue campaigns with projected ARR impacts and tactical execution steps."
    },
    {
        "id": "scene_07",
        "image": "07_playbook_dispatch_modal.png",
        "title": "7. SPRINT TASK BREAKDOWN & WEBHOOK DISPATCH",
        "sub": "One-click webhook synchronization to Slack strategy channels and Jira backlogs.",
        "narration": "Playbooks can be dispatched instantly via Webhooks directly into Slack strategy channels and Jira engineering sprint backlogs."
    },
    {
        "id": "scene_08",
        "image": "08_sentiment_lab.png",
        "title": "8. CUSTOMER SENTIMENT & VOICE VECTOR MINER",
        "sub": "Unsupervised clustering of verified customer reviews across G2, TrustPilot, and Reddit.",
        "narration": "The Customer Sentiment Lab mines verified customer reviews to isolate why customers choose your product and where competitor churn risks can be attacked."
    },
    {
        "id": "scene_09",
        "image": "09_engine_settings.png",
        "title": "9. MULTI-MODEL ENGINE & REAL-TIME LATENCY TEST",
        "sub": "Seamless integration with DeepSeek-V3/R1, OpenAI GPT-4o, Gemini 1.5, and Ollama.",
        "narration": "OmniPulse supports multiple AI providers including DeepSeek, OpenAI, Gemini, and Ollama, with real-time latency testing to ensure optimal uptime."
    },
    {
        "id": "scene_10",
        "image": "10_custom_scan_modal.png",
        "title": "10. LIVE WEB CRAWLER & CUSTOM TARGET SCAN",
        "sub": "Scrapes and synthesizes domain-adaptive intelligence for any custom startup URL.",
        "narration": "You can scan any custom startup or enterprise domain on the fly with our zero-dependency web crawler and domain-adaptive intelligence pipeline."
    },
    {
        "id": "scene_11",
        "image": "11_export_dossier_modal.png",
        "title": "11. 1-CLICK EXECUTIVE INTELLIGENCE DOSSIER",
        "sub": "Board-ready executive briefings exportable to Markdown and printable PDF.",
        "narration": "Generate comprehensive Markdown and PDF-ready intelligence dossiers with a single click for board meetings and leadership reviews."
    },
    {
        "id": "scene_12",
        "image": "01_dashboard_overview.png",
        "title": "12. OMNIPULSE AI // BEST SAAS PRODUCT",
        "sub": "Open Source Repository: https://github.com/huanglianggit/OmniPulse-AI",
        "narration": "OmniPulse AI transforms twenty hours of manual weekly research into automated strategic clarity. Open-source, production-ready, and built for modern revenue teams."
    }
]

def get_font(size, bold=False):
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

def generate_tts_for_scene(idx, text):
    wav_path = os.path.join(AUDIO_DIR, f"scene_{idx:02d}.wav")
    clean_text = text.replace("'", "")
    ps_script = f"""
Add-Type -AssemblyName System.Speech
$v = New-Object System.Speech.Synthesis.SpeechSynthesizer
$v.Rate = 0
$v.Volume = 100
$v.SetOutputToWaveFile('{wav_path.replace(os.sep, "/")}')
$v.Speak('{clean_text}')
$v.Dispose()
"""
    ps_file = os.path.join(AUDIO_DIR, f"_tts_{idx:02d}.ps1")
    with open(ps_file, "w", encoding="utf-8") as f:
        f.write(ps_script)

    subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", ps_file], check=True)
    if os.path.exists(ps_file):
        os.remove(ps_file)
    return wav_path

def get_audio_duration(wav_path):
    cmd = [
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        wav_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True, check=True)
    return float(res.stdout.strip())

def render_scene_frame(img_path, title, sub, out_path):
    base_img = Image.open(img_path).convert("RGBA")
    if base_img.size != (1920, 1080):
        base_img = base_img.resize((1920, 1080), Image.Resampling.LANCZOS)

    overlay = Image.new("RGBA", (1920, 1080), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Top Brand Bar
    draw.rectangle([0, 0, 1920, 48], fill=(6, 8, 13, 230))
    draw.rectangle([24, 10, 240, 38], fill=(0, 242, 254, 40), outline=(0, 242, 254), width=1)
    draw.text((36, 14), "OMNIPULSE AI // LIVE DEMO", font=get_font(13, bold=True), fill=(0, 242, 254))
    draw.text((260, 14), "Autonomous Enterprise Market & Competitor Intelligence Platform", font=get_font(14, bold=True), fill=(248, 250, 252))
    draw.text((1600, 14), "AI BUILDERS HACKATHON 2026", font=get_font(13, bold=True), fill=(148, 163, 184))

    # Bottom Subtitle Banner
    draw.rectangle([0, 960, 1920, 1080], fill=(6, 8, 13, 240))
    draw.line([0, 960, 1920, 960], fill=(0, 242, 254, 180), width=2)
    
    # Title badge & text
    draw.text((40, 978), title, font=get_font(20, bold=True), fill=(0, 242, 254))
    draw.text((40, 1018), sub, font=get_font(17), fill=(248, 250, 252))

    # Watermark
    draw.text((1580, 1030), "github.com/huanglianggit/OmniPulse-AI", font=get_font(13), fill=(148, 163, 184))

    final_frame = Image.alpha_composite(base_img, overlay).convert("RGB")
    final_frame.save(out_path)
    return out_path

def build_full_narrated_video():
    print("[Video Builder] Step 1: Synthesizing voiceover narration for all 12 scenes...")
    scene_durations = []
    audio_files = []
    
    for idx, scene in enumerate(SCENES):
        wav = generate_tts_for_scene(idx, scene["narration"])
        audio_files.append(wav)
        dur = get_audio_duration(wav) + 0.4
        scene_durations.append(dur)
        print(f"  -> Scene {idx+1}: {scene['title']} ({dur:.1f}s)")

    print("[Video Builder] Step 2: Merging audio clips into master voiceover...")
    concat_txt = os.path.join(AUDIO_DIR, "concat_list.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for wav in audio_files:
            f.write(f"file '{wav.replace(os.sep, '/')}'\n")

    master_audio = os.path.join(AUDIO_DIR, "master_voiceover.wav")
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", concat_txt,
        "-c", "copy",
        master_audio
    ], check=True)

    print("[Video Builder] Step 3: Rendering scene frames with subtitle overlays...")
    rendered_frames = []
    for idx, scene in enumerate(SCENES):
        img_path = os.path.join(SCREENS_DIR, scene["image"])
        out_frame = os.path.join(FRAMES_DIR, f"scene_frame_{idx:02d}.png")
        render_scene_frame(img_path, scene["title"], scene["sub"], out_frame)
        rendered_frames.append(out_frame)

    print("[Video Builder] Step 4: Writing FFmpeg video concat script...")
    video_concat_txt = os.path.join(FRAMES_DIR, "video_concat.txt")
    with open(video_concat_txt, "w", encoding="utf-8") as f:
        for idx, frame_path in enumerate(rendered_frames):
            f.write(f"file '{frame_path.replace(os.sep, '/')}'\n")
            f.write(f"duration {scene_durations[idx]:.2f}\n")
        # Repeat last file for trailing frame
        f.write(f"file '{rendered_frames[-1].replace(os.sep, '/')}'\n")

    print("[Video Builder] Step 5: Compiling 1080p video with synchronized audio via FFmpeg...")
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", video_concat_txt,
        "-i", master_audio,
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-r", "24",
        "-crf", "18",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        FINAL_MP4
    ], check=True)

    total_dur = sum(scene_durations)
    print(f"[Video Builder] SUCCESS! Full 1080p Narrated Demo Video generated at: {FINAL_MP4} ({total_dur:.1f}s)")

if __name__ == "__main__":
    build_full_narrated_video()
