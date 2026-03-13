const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const FILE = path.join(__dirname, 'index.html');

http.createServer((req, res) => {
  try {
    const content = fs.readFileSync(FILE);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    });
    res.end(content);
  } catch (e) {
    res.writeHead(404);
    res.end('index.html not found in ' + __dirname);
  }
}).listen(PORT, () => {
  console.log('✅ Running at http://localhost:' + PORT);
  console.log('   File:', FILE);
});
