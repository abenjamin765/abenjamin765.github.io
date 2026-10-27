"""Create responsive delivery files; keep original artifacts for full-size links."""
from pathlib import Path
import re
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent / 'newsite'
count = 0
for page in root.glob('*.html'):
    def optimize(match):
        global count
        tag = match[0]
        src = re.search(r'\bsrc="([^"]+)"', tag)
        if not src or 'srcset=' in tag:
            return tag
        source = root / src[1]
        if source.suffix.lower() not in ('.png', '.jpg', '.jpeg', '.webp') or not source.exists():
            return tag
        with Image.open(source) as original:
            if original.width < 600:
                return tag
            image = ImageOps.exif_transpose(original)
            image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
            widths = sorted({min(w, image.width) for w in (480, 800, 1100, 1600)})
            candidates = []
            for width in widths:
                target = source.parent / 'responsive' / f'{source.name}-{width}.webp'
                target.parent.mkdir(exist_ok=True)
                if not target.exists() or target.stat().st_mtime < source.stat().st_mtime:
                    image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=88, method=6)
                candidates.append((str(target.relative_to(root)), width))
            sizes = '(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) 85vw, 1096px'
            if page.name == 'work.html':
                sizes = '(max-width: 800px) calc(100vw - 48px), (max-width: 1100px) 42vw, 544px'
            if 'intro-brushstroke' in tag:
                sizes = '(max-width: 700px) 160vw, 1600px'
            tag = tag.replace(src[0], f'src="{candidates[-1][0]}" srcset="' + ', '.join(f'{url} {width}w' for url, width in candidates) + f'" sizes="{sizes}"')
            if not re.search(r'\bwidth=', tag):
                tag = tag.replace('<img ', f'<img width="{image.width}" height="{image.height}" ', 1)
            count += 1
            return tag
    page.write_text(re.sub(r'<img\b[^>]*>', optimize, page.read_text()))
print(f'Optimized {count} image uses; source artifacts unchanged.')
