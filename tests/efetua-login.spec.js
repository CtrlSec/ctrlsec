var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

function efetuaLogin() {
  frisby.create('Listagem de academias - Fluxo feliz')
  .post(URL_USER + '/auth/web', {
    username: 'admin',
    password: 'admin'
  })
  .expectStatus(200)
  .afterJSON(listaDetalheAcademias)
  .toss()
}

function listaDetalheAcademias(res) {
  frisby.create('Listagem de academias - Fluxo feliz - Chama serviço de listagem detalhada de academias')
   .get(URL_USER + '/gym/details', {
     headers: { 'Authorization': res.token }
   })
   .expectStatus(200)
   .expectJSONTypes({
     gyms: Array,
     days_to_expire: Number,
     start_date: String,
     end_date: String
   })
   .toss();
}

efetuaLogin();