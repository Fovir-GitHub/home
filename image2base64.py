import base64
import mimetypes
import re
from pathlib import Path

IMG_PATTERN = re.compile(r'!\[([^\]]*)\]\(([^)]+)\)')

def embed_images_in_markdown(md_path: Path):
    text = md_path.read_text(encoding="utf-8")
    changed = False

    def repl(match):
        nonlocal changed
        alt, img_path = match.groups()
        img_file = (md_path.parent / img_path).resolve()

        if not img_file.exists() or img_file.is_dir():
            return match.group(0)

        mime, _ = mimetypes.guess_type(img_file)
        if mime is None:
            return match.group(0)

        with open(img_file, "rb") as f:
            b64 = base64.b64encode(f.read()).decode("utf-8")

        changed = True
        return f"![{alt}](data:{mime};base64,{b64})"

    new_text = IMG_PATTERN.sub(repl, text)

    if changed:
        md_path.write_text(new_text, encoding="utf-8")
        print(f"✅ Embedded images in {md_path}")

def main():
    for md in Path("./content/").rglob("*.md"):
        embed_images_in_markdown(md)

if __name__ == "__main__":
    main()
