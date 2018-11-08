const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, sails.config.custom.superSecretKey);
    const userId = payload.data.userId;
    let targetPayments;
    let operator;
    let totalBalance;
    let paymentsCount;
    const operators = await Operator.find();

    const operatorsWithBalance = [] 
    
    for (let i = 0; i < operators.length; i++) {
      operator = operators[i];
      totalBalance = 0

      targetPayments = await Payment.find({
        operator: operator.id,
        user: userId
      })
      paymentsCount = targetPayments.length;
      
      if (paymentsCount) {
        if (paymentsCount === 1) {
          totalBalance = targetPayments[0].amount;
        } else {
          totalBalance = targetPayments.reduce((res, next) => {
            if (Number.isFinite(res)) {
              return res + next.amount;
            } else {
              return res.amount + next.amount;
            }
          })
        }
      }

      operatorsWithBalance.push(
          Object.assign({
          totalBalance,
          payments: targetPayments,
          paymentsCount: targetPayments.length
        }, operator)
      );
    }
 
    return res.json(operatorsWithBalance);
  }
}