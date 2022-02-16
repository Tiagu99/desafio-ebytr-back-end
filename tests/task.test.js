const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as rotas referente as "tasks".', async () => {
  let response = {};
  let listRequest = [];
  const DBServer = new MongoMemoryServer();

  
  before(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    
    sinon.stub(MongoClient, 'connect')
    .resolves(connectionMock);

    response = await chai.request(server)
      .post('/task')
      .send({
        task: 'Emitir relatório do balano mensal.'
      });
    listRequest = await chai.request(server)
      .get('/');
  });
  
  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });
  
  describe('POST', async () => {
    
    it('Retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna no no corpo o objeto criado com sua ID', () =>{
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('_id');
    });

  });
  describe('GET', async () => {
   

    it('Retorna um array com as tasks', () => {
      expect(response.body).length(1);
    });
  });
});
