#!/usr/bin/env python3
"""Validate content/cv.json, then export JSON, single-column DOCX, PDF (and XLSX) to exports/.
DOCX, PDF and JSON are copied to public/downloads/ (served by Astro). Source is cv.json only, never content/private/."""
import json, re, shutil, subprocess, sys, tempfile
from datetime import datetime
from pathlib import Path

root = Path(__file__).resolve().parents[4]
cv = json.loads((root / "content/cv.json").read_text())
out = root / "exports"
pub = root / "public/downloads"
out.mkdir(exist_ok=True)
pub.mkdir(parents=True, exist_ok=True)

try:
    import jsonschema
    jsonschema.validate(cv, json.loads((root / ".ai/schemas/cv.schema.json").read_text()))
except ImportError:
    print("skip validation: pip install jsonschema")

base = "cv-" + re.sub(r"[^a-z0-9]+", "-", cv["name"].split(",")[0].lower()).strip("-")


def fmt(d):
    if not d:
        return "present"
    try:
        return datetime.strptime(d, "%Y-%m").strftime("%b %Y")
    except ValueError:
        return d


# JSON (cv.json is the public CV only)
(out / f"{base}.json").write_text(json.dumps(cv, indent=2, ensure_ascii=False))

# DOCX: single column, no tables/text boxes/images/headers, standard headings (ATS friendly)
docx_path = out / f"{base}.docx"
try:
    from docx import Document
    from docx.shared import Pt, Cm
    d = Document()
    for s in d.sections:
        s.top_margin = s.bottom_margin = Cm(2)
        s.left_margin = s.right_margin = Cm(2.2)
    st = d.styles["Normal"]
    st.font.name, st.font.size = "Calibri", Pt(10.5)
    for n, sz in (("Title", 22), ("Heading 1", 13), ("Heading 3", 11)):
        d.styles[n].font.name, d.styles[n].font.size = "Calibri", Pt(sz)

    def h(text, lvl):
        d.add_heading(text, lvl)

    def p(text, style=None):
        d.add_paragraph(text, style=style)

    h(cv["name"], 0)
    p(cv["headline"])
    if cv.get("summary"):
        p(cv["summary"])
    if cv.get("links"):
        p(" | ".join(f'{l["label"]}: {l["url"]}' for l in cv["links"]))
    h("Experience", 1)
    for e in cv["experience"]:
        h(f'{e["role"]}, {e["org"]}', 3)
        p(f'{fmt(e["start"])} to {fmt(e.get("end"))}')
        for x in e.get("highlights", []):
            p(x, "List Bullet")
    if cv.get("education"):
        h("Education", 1)
        for e in cv["education"]:
            p(f'{e["degree"]}, {e["school"]}' + (f' ({e["year"]})' if e.get("year") else ""))
    if cv.get("skills"):
        h("Skills", 1)
        p(", ".join(cv["skills"]))
    if cv.get("awards"):
        h("Awards", 1)
        for a in cv["awards"]:
            p(a["title"] + (f' ({a["year"]})' if a.get("year") else ""), "List Bullet")
    if cv.get("publications_summary"):
        h("Publications", 1)
        p(cv["publications_summary"])
    if cv.get("volunteering"):
        h("Volunteering", 1)
        for v in cv["volunteering"]:
            h(v["role"], 3)
            p(v.get("year", ""))
            p(v.get("description", ""))
    if cv.get("languages"):
        h("Languages", 1)
        p(", ".join(f'{l["language"]} ({l["level"]})' for l in cv["languages"]))
    d.core_properties.title = f'CV {cv["name"]}'
    d.core_properties.author = cv["name"].split(",")[0]
    d.save(docx_path)
except ImportError:
    print("skip docx: pip install python-docx")

# PDF: single column, real text (selectable), TTF font so diacritics render. Falls back to LibreOffice if reportlab is missing.
pdf_path = out / f"{base}.pdf"
FONTS = [
    ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf"),
    ("/Library/Fonts/Arial.ttf", "/Library/Fonts/Arial Bold.ttf"),
    ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
]
try:
    from xml.sax.saxutils import escape
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import ParagraphStyle
    from reportlab.lib.units import cm
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    from reportlab.platypus import ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer

    reg, bold = next(((r, b) for r, b in FONTS if Path(r).exists() and Path(b).exists()), (None, None))
    if not reg:
        raise FileNotFoundError("no TTF font found (Arial or DejaVu)")
    pdfmetrics.registerFont(TTFont("CVSans", reg))
    pdfmetrics.registerFont(TTFont("CVSans-Bold", bold))
    pdfmetrics.registerFontFamily("CVSans", normal="CVSans", bold="CVSans-Bold")
    body = ParagraphStyle("body", fontName="CVSans", fontSize=9.5, leading=13, spaceAfter=3)
    title = ParagraphStyle("title", parent=body, fontName="CVSans-Bold", fontSize=20, leading=24, spaceAfter=4)
    h1 = ParagraphStyle("h1", parent=body, fontName="CVSans-Bold", fontSize=12, leading=15, spaceBefore=10, spaceAfter=4)
    h3 = ParagraphStyle("h3", parent=body, fontName="CVSans-Bold", fontSize=10, leading=13, spaceBefore=5, spaceAfter=1)
    meta = ParagraphStyle("meta", parent=body, textColor="#444444")
    P = lambda t, st=body: Paragraph(escape(t), st)

    def bullets(items):
        return ListFlowable([ListItem(P(i), leftIndent=12) for i in items], bulletType="bullet", start="\u2022", leftIndent=12)

    st = [P(cv["name"], title), P(cv["headline"])]
    if cv.get("summary"):
        st.append(P(cv["summary"]))
    if cv.get("links"):
        st.append(P(" | ".join(f'{l["label"]}: {l["url"]}' for l in cv["links"]), meta))
    st.append(P("Experience", h1))
    for e in cv["experience"]:
        st += [P(f'{e["role"]}, {e["org"]}', h3), P(f'{fmt(e["start"])} to {fmt(e.get("end"))}', meta)]
        if e.get("highlights"):
            st.append(bullets(e["highlights"]))
    if cv.get("education"):
        st.append(P("Education", h1))
        for e in cv["education"]:
            st.append(P(f'{e["degree"]}, {e["school"]}' + (f' ({e["year"]})' if e.get("year") else "")))
    if cv.get("skills"):
        st += [P("Skills", h1), P(", ".join(cv["skills"]))]
    if cv.get("awards"):
        st += [P("Awards", h1), bullets([a["title"] + (f' ({a["year"]})' if a.get("year") else "") for a in cv["awards"]])]
    if cv.get("publications_summary"):
        st += [P("Publications", h1), P(cv["publications_summary"])]
    if cv.get("volunteering"):
        st.append(P("Volunteering", h1))
        for v in cv["volunteering"]:
            st += [P(v["role"], h3), P(v.get("year", ""), meta), P(v.get("description", ""))]
    if cv.get("languages"):
        st += [P("Languages", h1), P(", ".join(f'{l["language"]} ({l["level"]})' for l in cv["languages"]))]
    SimpleDocTemplate(str(pdf_path), pagesize=A4, leftMargin=2.2 * cm, rightMargin=2.2 * cm,
                      topMargin=2 * cm, bottomMargin=2 * cm, title=f'CV {cv["name"]}',
                      author=cv["name"].split(",")[0]).build(st)
except (ImportError, FileNotFoundError) as err:
    print(f"reportlab PDF skipped ({err}); trying LibreOffice")
    soffice = shutil.which("soffice") or "/Applications/LibreOffice.app/Contents/MacOS/soffice"
    if docx_path.exists() and Path(soffice).exists():
        with tempfile.TemporaryDirectory() as tmp:
            subprocess.run([soffice, "--headless", "--convert-to", "pdf", "--outdir", tmp, str(docx_path)],
                           capture_output=True, text=True, timeout=150)
            if (Path(tmp) / f"{base}.pdf").exists():
                shutil.copy(Path(tmp) / f"{base}.pdf", pdf_path)
    else:
        print("skip pdf: pip3 install --user reportlab")

# XLSX (kept for internal use, not published)
try:
    from openpyxl import Workbook
    wb = Workbook()
    ws = wb.active
    ws.title = "Experience"
    ws.append(["Role", "Organization", "Start", "End", "Highlights"])
    for e in cv["experience"]:
        ws.append([e["role"], e["org"], e["start"], e.get("end", ""), "; ".join(e.get("highlights", []))])
    ws2 = wb.create_sheet("Projects")
    ws2.append(["Title", "Description", "URL", "Tags"])
    for x in cv.get("projects", []):
        ws2.append([x["title"], x["description"], x.get("url", ""), ", ".join(x.get("tags", []))])
    wb.save(out / f"{base}.xlsx")
except ImportError:
    print("skip xlsx: pip install openpyxl")

# Publish DOCX, PDF, JSON to public/downloads
published = []
for ext in ("docx", "pdf", "json"):
    f = out / f"{base}.{ext}"
    if f.exists():
        shutil.copy(f, pub / f.name)
        published.append(f.name)
print("exports done:", sorted(x.name for x in out.iterdir() if x.name != ".gitkeep"))
print("published to public/downloads:", published)
sys.exit(0 if len(published) == 3 else 1)
