import os

log_path = r"C:\Users\harsh\.gemini\antigravity\brain\ad72cd00-4ffe-4c7d-a2b2-33943409b5d2\.system_generated\logs\overview.txt"

try:
    with open(log_path, "r", encoding="utf-8") as f:
        text = f.read()

    parts = text.split("Priority Chunking: Instead of locking")
    if len(parts) > 1:
        history = parts[0]
        out_path = r"e:\3dmodel\history.txt"
        with open(out_path, "w", encoding="utf-8") as out:
            out.write(history[-100000:]) # write the last 100k characters before the prompt
        print(f"Success! Wrote the last 100k chars before the prompt to {out_path}")
    else:
        print("Prompt not found in log.")
except Exception as e:
    print(f"Error: {e}")
