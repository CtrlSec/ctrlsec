var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'

describe("Listing detailed gyms", function() {
  it("should return a list of gyms", function() {
    function login() {
      frisby.create('Do login')
      .post(URL_USER + '/auth/web', {
        username: 'admin',
        password: 'admin'
      })
      .expectStatus(200)
      .afterJSON(listDetailedGyms)
      .toss()
    }
    function listDetailedGyms(res) {
      frisby.create('Return list of detailed gyms')
      .get(URL_USER + '/gym/details', {
        headers: { 'Authorization': res.token }
      })
      .expectStatus(200)
      .expectJSONTypes({
        gyms2: Array,
        days_to_expire: Number,
        start_date: String,
        end_date: String
      })
      .toss();
    }
    login();
  });

  it("should return an empty list of gyms", function() {
    function login() {
      frisby.create('Do login')
      .post(URL_USER + '/auth/web', {
        username: 'admin',
        password: 'admin'
      })
      .expectStatus(200)
      .afterJSON(listDetailedGyms)
      .toss()
    }
    function listDetailedGyms(res) {
      frisby.create('Return list of detailed gyms')
      .get(URL_USER + '/gym/details?gym=99999', {
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
    login();
  });
});