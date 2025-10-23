const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const serve = () => {
  return http.createServer((req, res) => {
    const filePath = path.join(__dirname, '..', req.url === '/' ? 'index.html' : req.url);
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    };
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500);
          res.end('Sorry, check with the site admin for error: '+err.code+' ..\n');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  }).listen(8080);
};


(async () => {
  const server = serve();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error')
      errors.push(msg.text());
  });
  await page.goto('http://localhost:8080');
  await browser.close();
  server.close();

  if (errors.length > 0) {
    console.error('Console errors found:');
    console.error(errors);
    process.exit(1);
  } else {
    console.log('No console errors found.');
  }
})();
