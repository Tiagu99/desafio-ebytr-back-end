const Model = require('../../models/entity/taskModel');

module.exports = async (doc) => {
  const time = Date.now();
  const createdTask = await Model.create({ ...doc, time });
  return createdTask;
}