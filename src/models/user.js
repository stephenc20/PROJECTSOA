const Sequelize = require('sequelize');
const db = require('../config/sequelize');
const {AccountType} = require('./account_type');

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    acc_type: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'account_type',
        key: 'id',
      },
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    saldo: {
      type: Sequelize.INTEGER(25),
      allowNull: true,
    },
    pkey: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    quota: {
      type: Sequelize.INTEGER(25),
      allowNull: true,
    },
    valid_until: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('current_timestamp'),
    },
  },
  {
    tableName: 'user',
    timestamps: true,
  }
);

User.belongsTo(AccountType, { foreignKey: 'acc_type' });


module.exports = {User};
