const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('c_fixed', {
    owner: {
      type: DataTypes.STRING(200),
      allowNull: false,
      references: {
        model: 'user',
        key: 'email'
      }
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    override: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'c_fixed',
    timestamps: false,
    indexes: [
      {
        name: "user_on_c_fixed",
        using: "BTREE",
        fields: [
          { name: "owner" },
        ]
      },
    ]
  });
};
