from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


def downscale(source: Path, destination: Path) -> None:
    image = Image.open(source).convert("RGBA")
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        raise ValueError(f"No opaque subject found in {source}")

    subject = image.crop(bbox)
    max_side = 14
    scale = min(max_side / subject.width, max_side / subject.height)
    width = max(1, round(subject.width * scale))
    height = max(1, round(subject.height * scale))
    subject = subject.resize((width, height), Image.Resampling.NEAREST)

    canvas = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
    x = (16 - width) // 2
    y = (16 - height) // 2
    canvas.alpha_composite(subject, (x, y))
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("usage: downscale_pixel_icons.py SOURCE_DIR DEST_DIR")
    source_dir = Path(sys.argv[1])
    destination_dir = Path(sys.argv[2])
    for source in sorted(source_dir.glob("*.png")):
        downscale(source, destination_dir / source.name)
