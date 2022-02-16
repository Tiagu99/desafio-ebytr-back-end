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

  describe('POST', () => {
    response = await chai.request(server)
     
  });
});
