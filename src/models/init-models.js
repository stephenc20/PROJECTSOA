var DataTypes = require("sequelize").DataTypes;
var _account_type = require("./account_type");
var _c_dynamic = require("./c_dynamic");
var _c_fixed = require("./c_fixed");
var _user = require("./user");

function initModels(sequelize) {
  var account_type = _account_type(sequelize, DataTypes);
  var c_dynamic = _c_dynamic(sequelize, DataTypes);
  var c_fixed = _c_fixed(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  user.belongsTo(account_type, { as: "acc_type_account_type", foreignKey: "acc_type"});
  account_type.hasMany(user, { as: "users", foreignKey: "acc_type"});
  c_dynamic.belongsTo(user, { as: "owner_user", foreignKey: "owner"});
  user.hasMany(c_dynamic, { as: "c_dynamics", foreignKey: "owner"});
  c_fixed.belongsTo(user, { as: "owner_user", foreignKey: "owner"});
  user.hasMany(c_fixed, { as: "c_fixeds", foreignKey: "owner"});

  return {
    account_type,
    c_dynamic,
    c_fixed,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
