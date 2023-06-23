const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/sequelize');
const { User } = require('./user');

const Calendar = db.define('Calendardynamic', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateEnd: {
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
  tableName: 'calendardynamic',
  timestamps: true,
});

Calendar.belongsTo(User, { foreignKey: 'owner' });

module.exports = { Calendar };
