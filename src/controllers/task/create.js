const service = require('../../services/task/create');

module.exports = async (req, res, next) => {
  try {
    const { task } = req.body;

    if(!task) return res.status(400).send({ message: 'must be contain "task" key' });

    const created = await service({ task });

    return res.status(201).send(created);

  } catch (error) {
    return next(error);
  }
}