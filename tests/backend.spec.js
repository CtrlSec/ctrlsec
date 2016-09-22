var frisby = require('frisby');
var URL_USER = 'http://btmgm.tokenlab.com.br/api'
var login = 1; //define se é admin ou validador
/* 1 - admin; 2 - validador */
var select = 1; //define qual teste será executado
/*
   1 - Lista as academias
   2 - Lista as academias com detalhe
*/


var accessToken = ''; //token de acesso pro usuário ao resto do sistema
var user= ''; //se o usuário é admin ou validador




efetuaLogin()
//função principal


/*function criaNumeroUsuarios( qtde ){

 for (numero=1; numero<=qtde; numero++){
asasa
     console.log(numero)
     criarUsuario()

 }
}*/


function efetuaLogin(){

  frisby.create('Logando Usuário')
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

  })
  .afterJSON(function (res) {
       accessToken = res.token
       user = res.user

       console.log(accessToken)
       console.log("Tipo do usuário é " + user.type)
       if(user.type === "admin" )
       {
            login = 1
       }
       else if(user.type === "validator")
       {
            login = 2
       }

   frisby.globalSetup({
           request: {
             headers: { 'Authorization': res.token }
           }
           }
           )

       if(login === 1)
       {
           if(select === 1) //lista as academias do sistema
           {
               listaAcademia() //lista todas as academias do sistema
               listaAcademiaDetalhado() //lista todas as academias do sistema com detalhes

               var gym; //varíavel do ID da academia
               listaAcademiaDetalhadoEspecifica(5) //lista uma academia específica com detalhes
           }
           else if(select === 2)//cria configurações pra academia
           {
               var gym; //variável do ID da academia
               criaConfiguracoes(1)//cria configurações pra academia passando o id
           }
           else if(select === 3)//ativa um cupom
           {

              ativarCupom() //ativa o cupom se existir

           }
           else if(select === 4)//regulamento
           {

              regulamentoUsuario() //pega o regulamento para o usuário corrente

           }
       }else if(login === 2)
       {
            regulamentoUsuario()
       }

  }).toss()
}






//funções de teste
function listaAcademia(){ //lista todas as academias que há no sistema


   frisby.create('Listando Academias')
   .get(URL_USER + '/gym')
   .expectStatus(200)
   .expectHeaderContains('content-type', 'application/json')
   .inspectBody()
   .inspectRequest()
   .expectJSONTypes({
     id: undefined,
     name: undefined,
   }).toss()

 }

function listaAcademiaDetalhado(){ //lista todas as academias que há no sistema com detalhes


      frisby.create('Listando Academias com Detalhes')
      .get(URL_USER + '/gym/details')
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .inspectBody()
      .inspectRequest()
      .expectJSONTypes({
        id: undefined,
        name: undefined,
      }).toss()

    }

function listaAcademiaDetalhadoEspecifica(gym){ //lista uma academia específica que há no sistema com detalhes


   frisby.create('Listando Academia Específica com Detalhes')
   .get(URL_USER + '/gym/details?gym='+gym)
   .expectStatus(200)
   .expectHeaderContains('content-type', 'application/json')
   .inspectBody()
   .inspectRequest()
   .expectJSONTypes({
     id: undefined,
     name: undefined,
   }).toss()

 }
 function criaConfiguracoes(gym){ //cria as configurações de uma determinada academia


     frisby.create('Criando configurações de academia')
     .post(URL_USER + '/gym/'+gym+'/setting'
     ,{setting: { number_of_available_invitations: '100',invitations_per_student: '1', trial_period: '1'}}
     ,{ json: true }
     ,{ headers: { 'Content-Type': 'application/json' }})
     .expectStatus(200)
     .expectHeaderContains('content-type', 'application/json')
     .inspectBody()
     .inspectRequest()
     .expectJSONTypes({

     }).toss()

     listaAcademiaDetalhadoEspecifica(gym)


   }

/*function ativarCupom( ){

    var code='';
    fisbry.create('Busca um cupom')
    .get(URL_USER + 'coupon/search?q=7NRLUQA1')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .inspectBody()
    .inspectRequest()
    .expectJSONTypes({
        id = undefined

    })
    .afterJSON(function (res) {
        code = res.id
    }).toss()
    if(code)
    {
        frisby.create('Validando um cupom')
        .get(URL_USER + '/coupon/activate?code=7NRLUQA1')
        .expectStatus(200)
        .expectHeaderContains('content-type', 'application/json')
        .inspectBody()
        .inspectRequest()
        .expectJSONTypes({

        }).toss()
    }

}*/
function regulamentoUsuario(){

   frisby.create('Listando os regulamentos do usuário corrente')
   .get(URL_USER + '/terms')
   .expectStatus(200)
   .expectHeaderContains('content-type', 'application/json')
   .inspectBody()
   .inspectRequest()
   .expectJSONTypes({

   }).toss()


}
