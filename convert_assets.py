"""Normalize the hero images in assets/ to a single format (PNG).

Converts image_1..image_4 from whatever format they arrive in
(webp / gif / jpg) to PNG, then deletes the stale originals.
background.png is skipped since it is already PNG.

Usage: .venv/bin/python convert_assets.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ASSETS_DIR = Path(__file__).parent / "assets"
TARGET_FORMAT = "PNG"
TARGET_SUFFIX = ".png"


def convert(path: Path) -> Path | None:
    """Convert one image file to PNG. Returns the new path, or None on failure."""
    new_path = path.with_suffix(TARGET_SUFFIX)
    if new_path.exists():
        print(f"skip   {path.name} -> {new_path.name} already exists")
        return None
    try:
        with Image.open(path) as img:
            # GIF/P-mode images can carry palette or alpha info; convert to RGB(A)
            fmt = img.convert("RGBA") if img.mode in ("P", "LA", "RGBA") else img.convert("RGB")
            fmt.save(new_path, TARGET_FORMAT)
        print(f"ok     {path.name} -> {new_path.name} ({fmt.width}x{fmt.height})")
    except Exception as exc:  # noqa: BLE001
        print(f"FAIL   {path.name}: {exc}")
        new_path.unlink(missing_ok=True)
        return None
    # only delete the source once the conversion succeeded
    path.unlink()
    print(f"del    {path.name}")
    return new_path


def main() -> None:
    sources = sorted(
        p
        for p in ASSETS_DIR.iterdir()
        if p.name.startswith("image_") and p.suffix.lower() != TARGET_SUFFIX
    )
    if not sources:
        print("Nothing to convert — all assets already PNG.")
        return
    for src in sources:
        convert(src)


if __name__ == "__main__":
    main()
