var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

describe("Test login service", function() {
  
  it("should login successfully", function() {
    frisby.create('do login')
    .post(URL_USER + '/auth/web', {
      username: 'validador',
      password: 'validador'
    })
    .expectStatus(200)
    .expectJSONTypes({
      token: String,
      user: {type: String}
    })
    .toss();
  });
    
  it("should return an authentication error", function() {
    frisby.create('do login')
    .post(URL_USER + '/auth/web', {
      username: 'validador',
      password: 'validador2'
    })
    .expectStatus(401)
    .toss();
  });
  
});