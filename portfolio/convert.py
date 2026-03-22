import os
from PIL import Image
import glob

sequence_dir = "public/character-sequence"
print(f"Starting batch conversion of JPG to WEBP in {sequence_dir}...")

jpg_files = glob.glob(os.path.join(sequence_dir, "*.jpg"))
count = 0

for jpg_path in jpg_files:
    webp_path = jpg_path.replace(".jpg", ".webp")
    try:
        with Image.open(jpg_path) as img:
            img.save(webp_path, "webp", quality=85)
        count += 1
        if count % 20 == 0:
            print(f"Processed {count} frames...")
            
        # Optional: remove original jpg to save space
        os.remove(jpg_path)
    except Exception as e:
        print(f"Error converting {jpg_path}: {e}")

print(f"Successfully converted and replaced {count} images to .webp at 85% quality!")
