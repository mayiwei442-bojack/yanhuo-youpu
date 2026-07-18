from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "dishes" / "ai"
TARGET = ROOT / "assets" / "dishes" / "thumbnails"


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    files = sorted(SOURCE.glob("*.png"))
    for source in files:
        with Image.open(source) as image:
            image = image.convert("RGB")
            image = ImageOps.fit(image, (240, 240), method=Image.Resampling.LANCZOS)
            image.save(TARGET / f"{source.stem}.jpg", quality=82, optimize=True)
    print(f"created={len(files)}")


if __name__ == "__main__":
    main()
