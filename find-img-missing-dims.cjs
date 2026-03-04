const fs = require('fs');
const path = require('path');

function findImgTags(dir) {
  const results = [];
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    const isDir = stat.isDirectory();
    const isHidden = file.startsWith('.');
    const isNodeModules = file === 'node_modules';
    if (isDir && !isHidden && !isNodeModules) {
      results.push(...findImgTags(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const imgTags = content.match(/<img[^>]+>/g) || [];
      imgTags.forEach(tag => {
        const hasWidth = tag.includes('width=');
        const hasHeight = tag.includes('height=');
        const missingDims = !hasWidth || !hasHeight;
        if (missingDims) {
          results.push({ file: fullPath.replace('/home/ubuntu/drudi-almeida-site/', ''), tag: tag.substring(0, 100) });
        }
      });
    }
  });
  return results;
}

const missing = findImgTags('/home/ubuntu/drudi-almeida-site/client/src');
console.log('Images missing width or height (' + missing.length + '):');
missing.forEach(m => console.log(m.file + ': ' + m.tag));
