"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.charge = charge;

var _stripe = _interopRequireDefault(require("stripe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = (0, _stripe.default)(process.env.STRIPE_SK); // define secret key in ENV_VAR

function charge(token, email) {
  // returning a promise, so when we call .charge, we can use .then(...)
  return stripe.charge.create({
    amount: 2000,
    //amount in cents
    currency: 'usd',
    source: token,
    description: 'PMM Weekend',
    receipt_email: email
  });
}

;