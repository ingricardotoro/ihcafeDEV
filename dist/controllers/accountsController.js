"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listAccounts = listAccounts;
exports.CreateAccount = CreateAccount;
exports.deleteAccount = deleteAccount;

var _Account = _interopRequireDefault(require("../models/Account"));

var _Coin = _interopRequireDefault(require("../models/Coin"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function listAccounts(_x, _x2) {
  return _listAccounts.apply(this, arguments);
}

function _listAccounts() {
  _listAccounts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cuentas;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Account["default"].findAll({
              include: [_Coin["default"], _User["default"]]
            });

          case 3:
            cuentas = _context.sent;
            res.json({
              cuentas: cuentas
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("ERROR AL QUERE LISTAR Account:" + _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _listAccounts.apply(this, arguments);
}

function CreateAccount(_x3, _x4) {
  return _CreateAccount.apply(this, arguments);
}

function _CreateAccount() {
  _CreateAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, description, coin_id, person_id, newAccount;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, description = _req$body.description, coin_id = _req$body.coin_id, person_id = _req$body.person_id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Account["default"].create({
              name: name,
              description: description,
              initialbalance: 0.0,
              actualbalance: 0.0,
              coin_id: coin_id,
              person_id: person_id
            }, {
              fields: ["name", "description", "initialbalance", "actualbalance", "coin_id", "person_id"]
            });

          case 4:
            newAccount = _context2.sent;

            if (!newAccount) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.json({
              message: "Cuenta Creada Exitosamente",
              data: newAccount
            }));

          case 9:
            return _context2.abrupt("return", res.json({
              message: "No se Pudo Crear newAccount",
              data: {}
            }));

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            //console.log(error);
            res.status(500).json({
              message: "Error al crear nuevas Cuentas",
              data: {}
            });

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return _CreateAccount.apply(this, arguments);
}

function deleteAccount(_x5, _x6) {
  return _deleteAccount.apply(this, arguments);
}

function _deleteAccount() {
  _deleteAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, deleteRowCount;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Account["default"].destroy({
              where: {
                id: id
              }
            });

          case 4:
            deleteRowCount = _context3.sent;
            res.json({
              message: "Cuenta Eliminada Satifactoriamente",
              count: deleteRowCount
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log("ERROR AL QUERE ELIMINAR CUENTA:" + _context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return _deleteAccount.apply(this, arguments);
}