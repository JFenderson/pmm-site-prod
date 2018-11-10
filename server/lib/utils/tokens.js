"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;

var _v = _interopRequireDefault(require("uuid/v4"));

var _crypto = _interopRequireWildcard(require("crypto"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ALGORITHM = 'aes-256-ctr';
var SECRET = 'forests';

function encode(value) {
  var IV = new Buffer(_crypto.default.randomBytes(16));
  var cipher = (0, _crypto.createCipheriv)(ALGORITHM, SECRET, IV);
  var encoded = cipher.update("".concat((0, _v.default)(), "_").concat(value), 'ascii', 'base64');
  encoded += cipher.final('base64');
  return encoded;
}

function decode(value) {
  var decipher = (0, _crypto.createDecipher)(ALGORITHM, SECRET);
  var decoded = decipher.update(value, 'base64', 'ascii');
  decoded += decipher.final('ascii');
  var split = decoded.split('_');
  split.shift();
  return split.join('_');
}