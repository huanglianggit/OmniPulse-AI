"""
OmniPulse AI - Audio Narration Synthesizer
Uses Windows Native Speech Synthesis to generate clear spoken English / Chinese voiceover for the demo video.
"""

import subprocess
import os

def generate_voiceover(text: str, output_wav: str):
    ps_script = f"""
Add-Type -AssemblyName System.Speech
$voice = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voice.Rate = 0
$voice.Volume = 100
$voice.SetOutputToWaveFile('{output_wav.replace(os.sep, "/")}')
$voice.Speak('{text.replace("'", "")}')
$voice.Dispose()
"""
    ps_file = os.path.join(os.path.dirname(output_wav), "_temp_tts.ps1")
    with open(ps_file, "w", encoding="utf-8") as f:
        f.write(ps_script)

    subprocess.run(["powershell", "-ExecutionPolicy", "Bypass", "-File", ps_file], check=True)
    if os.path.exists(ps_file):
        os.remove(ps_file)
    print(f"[TTS] Generated: {output_wav}")

if __name__ == "__main__":
    out = os.path.abspath("docs/test_narration.wav")
    generate_voiceover("Welcome to OmniPulse AI, the autonomous enterprise market and competitor intelligence platform.", out)
    print("File created:", os.path.exists(out), "Size:", os.path.getsize(out))
