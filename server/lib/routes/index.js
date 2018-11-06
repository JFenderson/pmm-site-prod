"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import stateRouting from '../middleware/routing.mw';
// import contactRouter from './gmail';
// import stripeDonationsRouter from './stripePay';
// import awsPhotoRouter from './photos';
// import dotenv from 'dotenv';
// dotenv.config();
var router = (0, _express.Router)();
router.use('/user', _user.default); // router.use('/charge', stripeDonationsRouter);
// router.use('/contact', contactRouter);
// router.use('/photos', awsPhotoRouter);

var _default = router;
exports.default = _default;