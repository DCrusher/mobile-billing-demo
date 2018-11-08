module.exports = {
  async index(req, res) {
    operators = await Operator.find()

    return res.json(operators);
  }
}