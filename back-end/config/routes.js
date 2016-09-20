var path = require('path');
var fs = require('fs');

//Caminho completo para a pasta de rotas
var routes_path = path.join(__dirname, "../api/routes");

//Conteúdo de todos os arquivos de rotas
var contents = fs.readdirSync(routes_path).map(function(file) {
  return require("../api/routes/" + file);
});

//Combina o conteúdo de todos os arquivos de rotas
var routes = {};
contents.forEach(function(content) {
  for (p in content) {
    routes[p] = content[p];
  }
});

//Exporta as rotas recuperadas
module.exports.routes = routes;
