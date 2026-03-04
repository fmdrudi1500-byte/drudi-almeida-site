#!/usr/bin/env python3
"""
Download heavy PNG images, convert to WebP with proper sizing,
and upload to CDN via manus-upload-file --webdev.
"""
import urllib.request
import subprocess
import os
import sys
from PIL import Image
import io

# Images to optimize: (name, url, max_width, quality)
IMAGES_TO_OPTIMIZE = [
    # Logo - 4MB PNG -> should be tiny WebP
    ("logo", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/RWurHUWujtEFRSAi_0f8e994c.png", 400, 90),
    # Doctors - 5-7MB PNGs -> WebP at 800px max
    ("dr-fernando-doctors", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dMCAJeYRVKlvSJwN_1eac77ec.png", 800, 82),
    ("dra-priscilla-doctors", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dra-priscilla-profissional_5ab57a9e.png", 800, 82),
    ("dra-maria-amelia", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/nNfvXsUoQXCkKIBI_f5ffd24c.png", 800, 82),
    # Art images - large PNGs
    ("monet-japanese-bridge", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/JOOmfherpxYDKbvj_0762dd95.png", 1200, 80),
    # Catarata symptom images
    ("dificuldade-noite", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dificuldadedeenxergaranoite_f2a9f190.png", 800, 80),
    ("diplopia", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/diplopia_75d41ba4.png", 800, 80),
    ("visao-embacada", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/visaoemba%C3%A7ada_c12f98d4.png", 800, 80),
    ("sensibilidade-luz", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sensibilidadealuz_9e2c2355.png", 800, 80),
    # Clinic photos
    ("clinica-guarulhos", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/clinica_guarulhos_8e7690c7.png", 1200, 82),
    ("consultorio-lapa", "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/consultorio_lapa_be866546.png", 1200, 82),
]

OUTPUT_DIR = "/home/ubuntu/webdev-static-assets"
os.makedirs(OUTPUT_DIR, exist_ok=True)

results = {}

for name, url, max_width, quality in IMAGES_TO_OPTIMIZE:
    print(f"\nProcessing: {name}")
    try:
        # Download
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        original_size = len(data) / 1024
        print(f"  Downloaded: {original_size:.1f} KB")
        
        # Open with Pillow
        img = Image.open(io.BytesIO(data))
        
        # Convert RGBA to RGB if needed (WebP supports RGBA, but let's keep it)
        # Resize if too large
        w, h = img.size
        if w > max_width:
            ratio = max_width / w
            new_h = int(h * ratio)
            img = img.resize((max_width, new_h), Image.LANCZOS)
            print(f"  Resized: {w}x{h} -> {max_width}x{new_h}")
        
        # Save as WebP
        output_path = os.path.join(OUTPUT_DIR, f"{name}-opt.webp")
        img.save(output_path, "WEBP", quality=quality, method=6)
        
        new_size = os.path.getsize(output_path) / 1024
        print(f"  Saved: {new_size:.1f} KB (was {original_size:.1f} KB, saved {(1 - new_size/original_size)*100:.0f}%)")
        results[name] = output_path
        
    except Exception as e:
        print(f"  ERROR: {e}")
        results[name] = None

print("\n\nSummary:")
for name, path in results.items():
    if path:
        size = os.path.getsize(path) / 1024
        print(f"  {name}: {size:.1f} KB -> {path}")
    else:
        print(f"  {name}: FAILED")

print("\nDone! Now uploading...")
