const http = require('http');

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.end('Hello World');
});

server.listen(3000, '127.0.0.1');
console.log('Servidor está rodando na porta: 3000');
