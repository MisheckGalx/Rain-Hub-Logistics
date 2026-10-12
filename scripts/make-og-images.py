"""Generates the 1200x630 share images (client/public/og/*.jpg) shown when a page is shared on WhatsApp, LinkedIn, Facebook, etc.
Run:  python3 scripts/make-og-images.py   (needs Pillow and an Inter TTF — see FONT below)
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import sys, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = f"{ROOT}/client/public/images/photos/"
OUT = f"{ROOT}/client/public/og/"
FONT = os.environ.get("INTER_TTF", "/tmp/fonts/Inter-600.ttf")
W, H = 1200, 630

PAGES = {
    "home":     ("hero-road.jpg",  (0.72, 0.55), "We move your cargo across Southern Africa."),
    "services": ("road-low.jpg",   (0.30, 0.50), "One team for the whole journey."),
    "fleet":    ("road-rear-a.jpg",(0.40, 0.50), "Eight tonnes to thirty-six, dispatched from Midrand."),
    "about":    ("road-rear-a.jpg",(0.75, 0.50), "A Midrand logistics company, working across Southern Africa."),
    "clients":  ("hero-road.jpg",  (0.60, 0.55), "Businesses that rely on us to move their freight."),
    "contact":  ("road-low.jpg",   (0.60, 0.50), "Tell us what needs to move."),
}

def cover(im, focus):
    r = max(W / im.width, H / im.height)
    im = im.resize((int(im.width * r) + 1, int(im.height * r) + 1), Image.LANCZOS)
    x = int((im.width - W) * focus[0]); y = int((im.height - H) * focus[1])
    return im.crop((x, y, x + W, y + H))

def wrap(draw, text, font, maxw):
    lines, cur = [], ""
    for w in text.split():
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w
    lines.append(cur); return lines

logo = Image.open(f"{ROOT}/client/public/images/logo-white.png").convert("RGBA")
logo.thumbnail((250, 250))
for key, (photo, focus, headline) in PAGES.items():
    bg = cover(Image.open(PHOTOS + photo).convert("RGB"), focus)
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(ov)
    for x in range(W):                                   # navy fade from the left
        a = int(235 * max(0, 1 - x / (W * 0.95)) ** 1.4)
        d.line([(x, 0), (x, H)], fill=(11, 22, 40, a))
    for y in range(H):                                   # and from the bottom
        a = int(150 * max(0, (y - H * 0.45) / (H * 0.55)))
        d.line([(0, y), (W, y)], fill=(11, 22, 40, a))
    img = Image.alpha_composite(bg.convert("RGBA"), ov)
    img.alpha_composite(logo, (64, 56))
    draw = ImageDraw.Draw(img)
    size = 72
    while True:
        font = ImageFont.truetype(FONT, size)
        lines = wrap(draw, headline, font, 700)
        if len(lines) <= 3 or size <= 52: break
        size -= 4
    lh = int(size * 1.08); y = H - 64 - lh * len(lines)
    for ln in lines:
        draw.text((64, y), ln, font=font, fill=(255, 255, 255)); y += lh
    img.convert("RGB").save(OUT + f"{key}.jpg", quality=86, optimize=True, progressive=True)
    print(key, len(lines), "lines @", size, "px")
