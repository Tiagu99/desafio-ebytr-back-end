const connection = require('../connection');

const getAll = async () => (await connection()).collection('task').find().toArray();

module.exports = {
  getAll,
};
