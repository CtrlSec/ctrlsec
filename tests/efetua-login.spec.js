var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

frisby.create('Testa login')
.post(URL_USER + '/auth/web'
  ,{ username: 'validador' , password: 'validador' }
  ,{ json: true }
  ,{ headers: { 'Content-Type': 'application/json' }})
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.inspectBody()
.inspectRequest()
.expectJSONTypes({
  token: String,
  user: {type: String}
}).toss();