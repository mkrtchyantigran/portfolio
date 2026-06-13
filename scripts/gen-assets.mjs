// One-off generator for placeholder images + a placeholder CV.
// Run: node scripts/gen-assets.mjs
// Replace the generated files in public/projects and public/cv with your real assets.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const projDir = join(root, 'public', 'projects');
const cvDir = join(root, 'public', 'cv');
mkdirSync(projDir, { recursive: true });
mkdirSync(cvDir, { recursive: true });

const palettes = {
  'nexus-crm': ['#6366f1', '#a855f7'],
  taskflow: ['#0ea5e9', '#14b8a6'],
  devradar: ['#f59e0b', '#f43f5e'],
  portfolio: ['#334155', '#6366f1'],
};

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function coverSvg(id, title) {
  const [c1, c2] = palettes[id] ?? ['#6366f1', '#a855f7'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" font-family="Segoe UI, system-ui, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#bg)"/>
  <circle cx="980" cy="140" r="220" fill="#ffffff" opacity="0.08"/>
  <circle cx="240" cy="640" r="180" fill="#000000" opacity="0.08"/>
  <rect x="160" y="160" width="880" height="430" rx="20" fill="#ffffff" opacity="0.95"/>
  <rect x="160" y="160" width="880" height="56" rx="20" fill="#e2e8f0"/>
  <circle cx="196" cy="188" r="8" fill="#f87171"/>
  <circle cx="224" cy="188" r="8" fill="#fbbf24"/>
  <circle cx="252" cy="188" r="8" fill="#34d399"/>
  <text x="600" y="400" text-anchor="middle" font-size="56" font-weight="700" fill="#0f172a">${escapeXml(title)}</text>
  <text x="600" y="450" text-anchor="middle" font-size="24" fill="#64748b">cover — replace with a real screenshot</text>
</svg>`;
}

function screenSvg(id, title, n) {
  const [c1] = palettes[id] ?? ['#6366f1'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" font-family="Segoe UI, system-ui, sans-serif">
  <rect width="1280" height="800" fill="#f8fafc"/>
  <rect width="1280" height="64" fill="${c1}"/>
  <text x="32" y="40" font-size="22" font-weight="700" fill="#ffffff">${escapeXml(title)}</text>
  <text x="1248" y="40" text-anchor="end" font-size="18" fill="#ffffff" opacity="0.85">Screen ${n}</text>
  <rect x="0" y="64" width="240" height="736" fill="#ffffff"/>
  <rect x="24" y="100" width="192" height="36" rx="8" fill="#e2e8f0"/>
  <rect x="24" y="148" width="192" height="36" rx="8" fill="#eef2ff"/>
  <rect x="24" y="196" width="192" height="36" rx="8" fill="#e2e8f0"/>
  <rect x="24" y="244" width="192" height="36" rx="8" fill="#e2e8f0"/>
  <rect x="288" y="104" width="300" height="120" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="612" y="104" width="300" height="120" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="936" y="104" width="300" height="120" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="288" y="252" width="624" height="496" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="936" y="252" width="300" height="496" rx="14" fill="#ffffff" stroke="#e2e8f0"/>
  <rect x="320" y="292" width="220" height="20" rx="6" fill="${c1}" opacity="0.8"/>
  <rect x="320" y="332" width="540" height="12" rx="6" fill="#e2e8f0"/>
  <rect x="320" y="360" width="500" height="12" rx="6" fill="#e2e8f0"/>
  <rect x="320" y="388" width="520" height="12" rx="6" fill="#e2e8f0"/>
</svg>`;
}

const manifest = {
  'nexus-crm': { title: 'Nexus CRM', shots: 4 },
  taskflow: { title: 'TaskFlow', shots: 2 },
  devradar: { title: 'DevRadar', shots: 1 },
  portfolio: { title: 'This Portfolio', shots: 1 },
};

for (const [id, { title, shots }] of Object.entries(manifest)) {
  writeFileSync(join(projDir, `${id}-cover.svg`), coverSvg(id, title), 'utf8');
  for (let n = 1; n <= shots; n++) {
    writeFileSync(join(projDir, `${id}-${n}.svg`), screenSvg(id, title, n), 'utf8');
  }
}

// ---- Minimal one-page placeholder CV (valid PDF with correct xref) ----
function buildPdf() {
  const content = [
    'BT',
    '/F1 24 Tf 72 780 Td (Tigran Mkrtchyan) Tj',
    '/F1 14 Tf 0 -34 TD (Full-Stack Developer) Tj',
    '/F1 12 Tf 0 -40 TD (This is a placeholder CV.) Tj',
    '0 -20 TD (Replace public/cv/cv.pdf with your real CV.) Tj',
    'ET',
  ].join('\n');

  const objs = [
    '<</Type/Catalog/Pages 2 0 R>>',
    '<</Type/Pages/Kids[3 0 R]/Count 1>>',
    '<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>',
    `<</Length ${Buffer.byteLength(content, 'latin1')}>>\nstream\n${content}\nendstream`,
    '<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  objs.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.from(pdf, 'latin1');
}

writeFileSync(join(cvDir, 'cv.pdf'), buildPdf());

console.log('Generated placeholder assets in public/projects and public/cv.');
