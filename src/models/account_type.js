const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    c_fixed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    c_dynamic: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    c_override: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    c_perm: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'{}'"
    },
    q_nation_cap: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    q_year_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    q_deviation_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    q_range_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    q_perm: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "'{}'"
    }
  }, {
    sequelize,
    tableName: 'account_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
