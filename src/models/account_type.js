const Sequelize = require('sequelize');
const db = require('../config/sequelize');

const AccountType = db.define('AccountType', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  c_fixed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  c_dynamic: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  c_override: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  c_perm: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "'{}'",
  },
  q_nation_cap: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  q_year_limit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  q_deviation_limit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  q_range_limit: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  q_perm: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "'{}'",
  },
}, {
  tableName: 'account_type',
  timestamps: false, // Nonaktifkan timestamps


});

module.exports = { AccountType };
