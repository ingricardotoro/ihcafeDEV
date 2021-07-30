"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Coin = _interopRequireDefault(require("./Coin"));

var _User = _interopRequireDefault(require("./User"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//para modelar datos 
//import connection object
var Account = _database.sequelize.define('accounts', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].TEXT
  },

  /*  category_id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: Category,
         key: 'id',
        }
   }, */
  person_id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    references: {
      model: _User["default"],
      key: 'id'
    }
  },
  initialbalance: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  actualbalance: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  coin_id: {
    type: _sequelize["default"].INTEGER,
    allowNull: false,
    references: {
      model: _Coin["default"],
      key: 'id'
    }
  },
  createdAt: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  },
  updatedAt: {
    type: _sequelize["default"].DATE,
    defaultValue: _sequelize["default"].NOW
  }
}, {
  timestamps: true
});

Account.belongsTo(_Coin["default"], {
  foreignKey: 'coin_id'
});
Account.belongsTo(_User["default"], {
  foreignKey: 'person_id'
});
var _default = Account;
exports["default"] = _default;