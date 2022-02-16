const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../src/api/app');

chai.use(chaiHttp);

const { expect } = chai;
const DBServer = new MongoMemoryServer();

describe('Testa as rotas referente as "tasks".', ()=> {
  let response = {};

  beforeAll(async () => {
    const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
      { userNewUrlParser: true, useUnifieldTopology: true }
    );
    
    sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);
  });

  afterAll(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });

  describe('POST', async () => {
    response = await chai.request(server)
    .post('/')
    .send({
      task: 'Emitir relatório do balano mensal'
    });

    it('Retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Retorna no no corpo o objeto criado com sua ID', () =>{
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('_id');
    });

  });
});
