"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.row = row;
exports.rows = rows;
exports.empty = empty;
exports.executeQuery = executeQuery;
exports.generatePlaceholders = generatePlaceholders;
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dotenv from 'dotenv';
// dotenv.config();
var _default = function _default() {}; // let pool = mysql.createPool({
//     connectionLimit: 10,
//     host: process.env.CLEARDB_HOST,
//     user: process.env.CLEARDB_USER,
//     password: process.env.CLEARDB_PASSWORD,
//     database:process.env.CLEARDB_DATABASE,
//     port: 3306
// });


exports.default = _default;

var pool = _mysql.default.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "pmm_admin",
  password: "password",
  database: "pmm_site",
  insecureAuth: true
});

function executeQuery(sql) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return getConnection().then(function (connection) {
    return new Promise(function (resolve, reject) {
      connection.query(sql, args, function (err, result) {
        connection.release();

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  });
}

function callProcedure(procedureName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var placeholders = generatePlaceholders(args);
  var callString = "CALL ".concat(procedureName, "(").concat(placeholders, ");");
}

function rows(procedureName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return callProcedure(procedureName, args).then(function (resultsets) {
    return resultsets[0];
  });
}

function row(procedureName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return callProcedure(procedureName, args).then(function (resultsets) {
    return resultsets[0][0];
  });
}

function empty(procedureName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return callProcedure(procedureName, args).then(function () {
    return;
  });
}

function generatePlaceholders() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholders = '';

  if (args.length > 0) {
    for (var i = 0; i < args.length; i++) {
      if (i === args.length - 1) {
        // if we are on the last argument in the array
        placeholders += '?';
      } else {
        placeholders += '?,';
      }
    }
  }

  return placeholders;
}

function getConnection() {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
        console.log('mysql connected!');
      }
    });
  });
}