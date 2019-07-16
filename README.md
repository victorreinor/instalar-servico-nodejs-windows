# Instalar serviços nodejs no windows

A maneira recomendada de instalar é com o npm, usando:

`npm install -g node-windows`

Então, na raiz do seu projeto, execute:

`npm link node-windows`

Caso não funcione a solução acima, instale a dependencia no seu projeto como desenvolvimento.

`npm install node-windows -D`

---

Script para instalação de serviço.

```javascript
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
```

A seguir iremos abrir a tela de serviço do windows para verificar se foi realmente instalado

[![Serviço instalado](https://raw.githubusercontent.com/victorreinor/instalar-servico-nodejs-windows/master/servico.png "Serviço instalado")](https://raw.githubusercontent.com/victorreinor/instalar-servico-nodejs-windows/master/servico.png "Serviço instalado")

Scripts para desinstalação do serviço
```javascript
const Service = require('node-windows').Service;
const path = require('path');

const svc = new Service({
  // Nome do serviço
  name: 'helloWorld',
  // Diretorio do arquivo de entrada
  script: path.join(__dirname, 'helloWorld.js'),
});

svc.on('uninstall', function() {
  !svc.exists
  ? console.log('Desinstalação completa.')
  : console.log('Não foi possível desinstalar o serviço.')
});

svc.uninstall();
```

Para rodar os scripts acima e necessario abrir o prompt com o administrador pois o SO necessita de privilegios de administrador.

No prompt de comando abra seu projete e digite:

Para instalar
`node install`
Para desinstalar
`node uninstall`

O objeto `Service` objeto emite os seguintes eventos:

- **install** - Disparado quando o script é instalado como um serviço.
- **alreadyinstalled** - Verifica se o script já é conhecido por ser um serviço.
- **invalidinstallation** - Disparado se uma instalação for detectada, mas faltando arquivos necessários.
- **uninstall** - Disparado quando uma desinstalação estiver concluída.
- **alreadyuninstalled** - Disparado quando uma desinstalação é solicitada e não existe instalação.
- **start** - Disparado quando o novo serviço é iniciado.
- **stop** - Disparado quando o serviço é interrompido.
- **erro** - disparado em alguns casos quando ocorre um erro.

No exemplo acima, o script escuta o install. Como esse evento é disparado quando uma instalação de serviço é concluída.

[Repositório Original e Fonte](https://github.com/coreybutler/node-windows "Repositório Original e Fonte")
