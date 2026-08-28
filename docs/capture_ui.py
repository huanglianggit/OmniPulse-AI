"""
OmniPulse AI - WebApp Real UI Screen Capture via Chrome CDP
Launches Chrome in headless mode, connects via DevTools Protocol, navigates through all UI tabs and modals, and captures pristine 1920x1080 frames.
"""

import subprocess
import time
import json
import base64
import os
import urllib.request

CHROME_PATHS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
]

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "app_screens")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def find_browser():
    for p in CHROME_PATHS:
        if os.path.exists(p):
            return p
    raise RuntimeError("No Chrome or Edge executable found!")

def run_cdp_capture():
    browser_exe = find_browser()
    port = 9222
    user_data = os.path.join(OUTPUT_DIR, "cdp_profile")
    
    # Launch Chrome with remote debugging
    cmd = [
        browser_exe,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--remote-allow-origins=*",
        f"--user-data-dir={user_data}",
        "--window-size=1920,1080",
        "--hide-scrollbars",
        "--disable-gpu",
        "http://localhost:8080"
    ]
    
    proc = subprocess.Popen(cmd)
    time.sleep(2.5)

    try:
        # Get WebSocket Debugger URL from Chrome
        req = urllib.request.urlopen(f"http://127.0.0.1:{port}/json")
        tabs = json.loads(req.read().decode())
        ws_url = tabs[0]["webSocketDebuggerUrl"]
        print(f"[CDP] Connected to Chrome tab: {ws_url}")

        # Use Python simple websocket client or websocket library
        # Let's check if websocket library is available or use pure standard library
        try:
            import websocket
        except ImportError:
            subprocess.run(["pip", "install", "websocket-client"], check=True)
            import websocket

        ws = websocket.create_connection(ws_url)

        def send_cdp(method, params=None):
            msg_id = int(time.time() * 1000) % 100000
            msg = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(msg))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        def capture_frame(filename):
            res = send_cdp("Page.captureScreenshot", {"format": "png"})
            img_data = base64.b64decode(res["data"])
            path = os.path.join(OUTPUT_DIR, filename)
            with open(path, "wb") as f:
                f.write(img_data)
            print(f"[CDP] Captured UI: {filename} ({len(img_data)} bytes)")
            return path

        def eval_js(expression):
            return send_cdp("Runtime.evaluate", {"expression": expression})

        # Set viewport to 1920x1080
        send_cdp("Emulation.setDeviceMetricsOverride", {
            "width": 1920,
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        })

        time.sleep(1.0)

        # 1. Main Dashboard View
        capture_frame("01_dashboard_overview.png")

        # 2. Mission Control Swarm View
        eval_js("document.querySelector('[data-view=\"view-mission-control\"]').click()")
        time.sleep(0.8)
        capture_frame("02_mission_control.png")

        # 3. Trigger Mission Scan
        eval_js("document.getElementById('btn-run-mission').click()")
        time.sleep(1.5)
        capture_frame("03_mission_scanning.png")
        time.sleep(3.5)
        capture_frame("04_mission_complete.png")

        # 4. Competitor Battlecards View
        eval_js("document.querySelector('[data-view=\"view-battlecards\"]').click()")
        time.sleep(0.8)
        capture_frame("05_competitor_battlecards.png")

        # 5. Strategic Playbooks View
        eval_js("document.querySelector('[data-view=\"view-playbooks\"]').click()")
        time.sleep(0.8)
        capture_frame("06_strategic_playbooks.png")

        # 6. Open Playbook Dispatch Modal
        eval_js("window.appInstance.dispatchPlaybook('pb-1')")
        time.sleep(0.8)
        capture_frame("07_playbook_dispatch_modal.png")
        eval_js("document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'))")
        time.sleep(0.5)

        # 7. Customer Sentiment Lab View
        eval_js("document.querySelector('[data-view=\"view-sentiment\"]').click()")
        time.sleep(0.8)
        capture_frame("08_sentiment_lab.png")

        # 8. Settings & Model Selection View
        eval_js("document.querySelector('[data-view=\"view-settings\"]').click()")
        time.sleep(0.8)
        capture_frame("09_engine_settings.png")

        # 9. Custom Target Scan Modal
        eval_js("document.getElementById('btn-open-custom-scan').click()")
        time.sleep(0.8)
        capture_frame("10_custom_scan_modal.png")
        eval_js("document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'))")
        time.sleep(0.5)

        # 10. Executive Dossier Export Modal
        eval_js("document.getElementById('btn-export-dossier').click()")
        time.sleep(0.8)
        capture_frame("11_export_dossier_modal.png")
        eval_js("document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'))")
        time.sleep(0.5)

        # Return to Dashboard
        eval_js("document.querySelector('[data-view=\"view-dashboard\"]').click()")
        time.sleep(0.5)
        capture_frame("12_dashboard_final.png")

        ws.close()
        print("[CDP] All real UI screenshots captured successfully!")

    finally:
        proc.terminate()

if __name__ == "__main__":
    run_cdp_capture()
