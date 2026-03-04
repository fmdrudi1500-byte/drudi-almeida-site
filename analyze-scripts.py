import re, os

html = open('dist/public/index.html').read()

# Find all script tags loaded
scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>', html)
print('Scripts loaded on Home page:')
total = 0
for s in scripts:
    if s.startswith('/assets/'):
        path = 'dist/public' + s
    else:
        path = None
    if path and os.path.exists(path):
        size = os.path.getsize(path)
        total += size
        name = s.split('/')[-1]
        print(f'  {name[:50]:50s} {size//1024:4d} KB')
    else:
        print(f'  {s} (external or not found)')
print(f'Total local JS: {total//1024} KB')

# Also check modulepreload links
preloads = re.findall(r'<link[^>]*rel=["\']modulepreload["\'][^>]*href=["\']([^"\']+)["\'][^>]*>', html)
print(f'\nModulepreload links: {len(preloads)}')
for p in preloads:
    print(f'  {p}')

# Check render-blocking resources
print('\nAll link tags in head:')
head_end = html.find('</head>')
head = html[:head_end]
links = re.findall(r'<link[^>]+>', head)
for l in links:
    if 'stylesheet' in l or 'preload' in l or 'preconnect' in l:
        print(f'  {l[:200]}')
