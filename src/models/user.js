const Sequelize = require('sequelize');
const db = require('../config/sequelize');

const User = db.define(
  'User',
  {
    email: {
      type: Sequelize.STRING(200),
      allowNull: false,
      primaryKey: true,
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
      type: Sequelize.TEXT,
      allowNull: false,
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
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'email' }],
      },
      {
        name: 'acc_type_on_user',
        using: 'BTREE',
        fields: [{ name: 'acc_type' }],
      },
    ],
  }
);

module.exports = {User};
