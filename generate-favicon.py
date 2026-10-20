"""
Script para gerar favicons REDONDOS a partir de uma imagem.
Gera o favicon.ico e todos os PNGs (16, 32, apple-touch, icon-192, icon-512)
com máscara circular e fundo transparente.

Uso: python generate-favicon.py caminho/da/imagem.jpg
Exemplo: python generate-favicon.py src/assets/og-cavalheiro-wide.jpg

Requisitos: pip install Pillow
"""

import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw
except ImportError:
    print("❌ Pillow não instalado. Rode: pip install Pillow")
    sys.exit(1)


def crop_square(img: Image.Image) -> Image.Image:
    """Recorta a imagem para um quadrado centralizado."""
    width, height = img.size
    size = min(width, height)
    left = (width - size) // 2
    top = (height - size) // 2
    return img.crop((left, top, left + size, top + size))


def make_circle(img: Image.Image) -> Image.Image:
    """Aplica máscara circular com antialiasing e fundo transparente."""
    # Faz a máscara em escala maior (supersampling) para suavizar a borda
    big = img.size[0] * 4
    mask = Image.new("L", (big, big), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, big, big), fill=255)
    mask = mask.resize(img.size, Image.LANCZOS)

    output = Image.new("RGBA", img.size, (0, 0, 0, 0))
    output.paste(img.convert("RGBA"), mask=mask)
    return output


def generate(input_path: str):
    img = Image.open(input_path)
    img = crop_square(img)
    img = make_circle(img)

    # 1) favicon.ico (multi-tamanho)
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    icons = [img.resize(s, Image.LANCZOS) for s in ico_sizes]
    icons[0].save(
        "src/favicon.ico",
        format="ICO",
        sizes=[(i.width, i.height) for i in icons],
        append_images=icons[1:],
    )
    print("✅ src/favicon.ico")

    # 2) PNGs redondos usados no index.html / manifest
    png_targets = {
        "src/assets/favicon-16x16.png": 16,
        "src/assets/favicon-32x32.png": 32,
        "src/assets/apple-touch-icon.png": 180,
        "src/assets/icon-192.png": 192,
        "src/assets/icon-512.png": 512,
    }
    for path, size in png_targets.items():
        img.resize((size, size), Image.LANCZOS).save(path, format="PNG")
        print(f"✅ {path} ({size}x{size})")

    print("\n🎉 Todos os favicons redondos foram gerados.")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python generate-favicon.py caminho/da/imagem.jpg")
        print("Exemplo: python generate-favicon.py src/assets/og-cavalheiro-wide.jpg")
        sys.exit(1)

    input_file = sys.argv[1]
    if not Path(input_file).exists():
        print(f"❌ Arquivo não encontrado: {input_file}")
        sys.exit(1)

    generate(input_file)
