module.exports = {


  friendlyName: 'Init populate',


  description: 'Initial population of a default user and mobile operators',


  inputs: {

  },


  fn: async function (inputs, exits) {
    
    var newUserRecord = await User.create({
      emailAddress: 'ivanov@gmail.com',
      password: await sails.helpers.passwords.hashPassword('ivanov'),
      fullName: 'Ivan Ivanov',
    })
    .intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid')
    .fetch();

    const operators = ['MTS', 'Beeline', 'Megafon', 'Tele2', 'Yota']

    for(let i = 0; i < operators.length; i++) {
      var res = await Operator.create({name: operators[i]})
        .intercept('E_UNIQUE', 'emailAlreadyInUse')
        .fetch()
    }

    sails.log('Running custom shell script... (`init-populate`)');

    // All done.
    return exits.success();

  }


};

