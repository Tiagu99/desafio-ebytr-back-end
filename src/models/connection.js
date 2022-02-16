require('dotenv').config();
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Ebytr`;
const DB_NAME = 'Ebytr';

let connection = null;

module.exports = async () => {
  try {
    if(connection) return connection;
    connection = (await MongoClient.connect(
      MONGO_DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )).db(DB_NAME);
    return connection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};