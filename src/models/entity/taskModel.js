const connection = require('../connection');

const getAll = async () => (await connection()).collection('task').find().toArray();

const create = async (doc) => {
  const { insertedId: _id } = await (await connection())
    .collection('task').insertOne({ ...doc });
  return { _id, ...doc };
}

module.exports = {
  getAll,
  create,
};
