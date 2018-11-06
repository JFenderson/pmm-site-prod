"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _db = require("../config/db");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Table =
/*#__PURE__*/
function () {
  function Table(tableName) {
    _classCallCheck(this, Table);

    if (!tableName) {
      throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
    }

    this.tableName = tableName;
  }

  _createClass(Table, [{
    key: "getOne",
    value: function getOne(id) {
      var sql = "SELECT * FROM ".concat(this.tableName, " WHERE id = ").concat(id, ";");
      return (0, _db.executeQuery)(sql, [id]).then(function (results) {
        return results[0];
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var sql = "SELECT * FROM ".concat(this.tableName);
      return (0, _db.executeQuery)(sql);
    }
  }, {
    key: "find",
    value: function find(query) {
      var columns = Object.keys(query);
      var values = Object.values(query);
      var conditions = columns.map(function (columnName) {
        return "".concat(columnName, " LIKE ?");
      });
      var sql = "SELECT * FROM ".concat(this.tableName, " WHERE ").concat(conditions.join(' AND '), ";");
      return (0, _db.executeQuery)(sql, values);
    }
  }, {
    key: "insert",
    value: function insert(row) {
      var columns = Object.keys(row);
      var values = Object.values(row);
      var placeholderString = (0, _db.generatePlaceholders)(values);
      var sql = "INSERT INTO ".concat(this.tableName, " (").concat(columns.join(','), ") VALUES (").concat(placeholderString, ");");
      return (0, _db.executeQuery)(sql, values).then(function (results) {
        return {
          id: results.insertId
        };
      });
    }
  }, {
    key: "update",
    value: function update(id, row) {
      var columns = Object.keys(row);
      var values = Object.values(row);
      var updates = columns.map(function (columnName) {
        return "".concat(columnName, " = ?");
      });
      var sql = "UPDATE ".concat(this.tableName, " SET ").concat(updates.join(','), " WHERE id = ").concat(id, ";");
      return (0, _db.executeQuery)(sql, values);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var sql = "DELETE FROM ".concat(this.tableName, " WHERE id = ").concat(id);
      return (0, _db.executeQuery)(sql);
    }
  }]);

  return Table;
}();

var _default = Table;
exports.default = _default;