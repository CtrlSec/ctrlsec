var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

function doLogin() {
  frisby.create('List gyms - Success case - Do login')
  .post(URL_USER + '/auth/web', {
    username: 'admin',
    password: 'admin'
  })
  .expectStatus(200)
  .afterJSON(listGymsDetails)
  .toss()
} 

function listGymsDetails(res) { 
  frisby.create('List gyms - Success case - Call service to list gyms details')
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

doLogin();