import fs from 'fs';
import path from 'path';

const dir = 'dist/public/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && !f.startsWith('vendor-framer'));
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  if (content.includes('vendor-framer')) {
    console.log(f, '→ imports vendor-framer');
  }
}
