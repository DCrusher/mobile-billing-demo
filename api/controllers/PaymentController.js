const jwt = require('jsonwebtoken');

/**
 * PaymentControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async pay(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, sails.config.custom.superSecretKey);
    const userId = payload.data.userId;

    const newPayment = await Payment.create(
      Object.assign({ user: userId }, req.body )
    ).fetch();

    return res.json(newPayment);
  }
};

