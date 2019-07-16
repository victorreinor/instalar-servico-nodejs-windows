const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  // Nome do serviço
  name: 'helloWorld',
  // Descrição do serviço
  description: 'Exemplo de instalação de serviço windows com nodejs.',
  // Diretorio do arquivo de entrada
  script: path.join(__dirname, 'helloWorld.js'),
  // Variaveis de ambiente que sua aplicação precisa (não obrigatorio)
  env: [{
    name: "NODE_ENV",
    value: "production"
  }]
});

// Instala a aplicação
svc.on('install', function() {
  svc.start();
});

// Verifica se já esta instalada
svc.on('alreadyinstalled', function() {
  console.log(`${svc.name} já foi instalado.`);
});

// Inicie o serviço
svc.on('start',function() {
  console.log(`${svc.name} iniciado.`);
});

svc.install();
