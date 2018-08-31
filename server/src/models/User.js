//  const Promise = require('bluebird')
//  const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user, options) {
  //  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  //  const salt = bcrypt.genSaltSync(SALT_FACTOR)
  //  const hash = bcrypt.hashSync(user.password, salt)
  //  return user.setDataValue('password', user.password)
  return user.setDataValue('password', user.password)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    }
  )

  User.prototype.comparePassword = function(password) {
    return password === this.password
    // return bcrypt.compareSync(password, this.password)
  }

  return User
}
