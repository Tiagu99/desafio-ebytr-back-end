const service = require('../../services/task/getAll');

module.exports = async (req, res, next) => {
  try {
    const listTask = await service();

    return res.status(200).send(listTask);
  } catch (error) {
    return next(error);
  }
}