const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('c_dynamic', {
    owner: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'user',
        key: 'email'
      }
    },
    dateStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateEnd: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    monthStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monthEnd: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    yearStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    yearEnd: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'c_dynamic',
    timestamps: false,
    indexes: [
      {
        name: "user_on_c_dynamic",
        using: "BTREE",
        fields: [
          { name: "owner" },
        ]
      },
    ]
  });
};
