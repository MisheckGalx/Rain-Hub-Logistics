#!/usr/bin/env python3
"""Add a photo to the site in one command.

    python3 scripts/add-photo.py ~/Downloads/loading-dock.jpg loading-dock

Creates, in client/public/images/photos/:
    loading-dock.jpg        (full size, max 1920px wide)
    loading-dock.webp       (same, smaller file)
    loading-dock-sm.webp    (640px wide, served to phones)
and updates client/src/components/photoMeta.ts so the site picks the right size.

Then use it in a page:   <Photo name="loading-dock" alt="Describe what is in the photo" />

Before adding photos that show a number plate or a person's face, blur the plate and get the person's OK.
"""
import argparse, json, os, re, sys
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_DIR = f"{ROOT}/client/public/images/photos"
META = f"{ROOT}/client/src/components/photoMeta.ts"

ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("source", help="path to the original photo")
ap.add_argument("name", help="short lowercase name, e.g. loading-dock")
ap.add_argument("--dir", default=DEFAULT_DIR, help="output folder (default: the site's photos folder)")
ap.add_argument("--meta", default=META, help="photoMeta.ts to update")
a = ap.parse_args()

if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a.name):
    sys.exit("name must be lowercase letters, numbers and dashes, e.g. loading-dock")
os.makedirs(a.dir, exist_ok=True)

im = ImageOps.exif_transpose(Image.open(a.source)).convert("RGB")   # respect the phone's rotation
im.thumbnail((1920, 10000), Image.LANCZOS)
im.save(f"{a.dir}/{a.name}.jpg", quality=86, optimize=True, progressive=True)
im.save(f"{a.dir}/{a.name}.webp", quality=80, method=6)
sm = im.copy(); sm.thumbnail((640, 10000), Image.LANCZOS)
sm.save(f"{a.dir}/{a.name}-sm.webp", quality=78, method=6)

widths = {f[:-4]: Image.open(f"{a.dir}/{f}").width for f in sorted(os.listdir(a.dir)) if f.endswith(".jpg")}
with open(a.meta, "w") as f:
    f.write("// Real pixel widths of each photo (used for responsive srcSet). Maintained by scripts/add-photo.py.\n")
    f.write("export const PHOTO_WIDTH: Record<string, number> = " + json.dumps(widths, indent=2) + ";\n")

kb = lambda p: os.path.getsize(p) // 1024
print(f"added '{a.name}' ({im.width}x{im.height}): jpg {kb(f'{a.dir}/{a.name}.jpg')} KB, webp {kb(f'{a.dir}/{a.name}.webp')} KB, phone {kb(f'{a.dir}/{a.name}-sm.webp')} KB")
print(f'use it:  <Photo name="{a.name}" alt="..." />')
