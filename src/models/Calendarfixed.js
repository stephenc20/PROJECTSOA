const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/sequelize');
const { User } = require('./user');

const Calendar2 = db.define('Calendarfixed', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['LIBUR', 'KERJA']],
    },
  },
  information: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'calendarfixed',
  timestamps: true,
});

Calendar2.belongsTo(User, { foreignKey: 'owner' });

module.exports = { Calendar2 };
