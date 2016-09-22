var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

frisby.create('Testa listagem de academias detalhada: Efetua login')
.post(URL_USER + '/auth/web'
  ,{ username: 'validador' , password: 'validador' }
  ,{ json: true }
  ,{ headers: { 'Content-Type': 'application/json' }})
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.afterJSON(function (res) {
  frisby.globalSetup({
    request: {
      headers: { 'Authorization': res.token }
      }
  });
  frisby.create('Testa listagem de academias detalhada: Lista detalhe das academias')
   .get(URL_USER + '/gym')
   .expectStatus(200)
   .expectHeaderContains('content-type', 'application/json')
   .expectJSONTypes({
     id: undefined,
     name: undefined,
   }).toss();
}).toss();