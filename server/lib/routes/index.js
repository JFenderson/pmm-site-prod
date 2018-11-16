"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _admin = _interopRequireDefault(require("./admin"));

var _auth = require("../middleware/auth.mw");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import userRouter from './user';
// import authRouter from './authOnly';
// import stateRouting from '../middleware/routing.mw';
// import contactRouter from './gmail';
// import stripeDonationsRouter from './stripePay';
// import awsPhotoRouter from './photos';
// import dotenv from 'dotenv';
// dotenv.config();
var router = (0, _express.Router)(); // router.use('/charge', stripeDonationsRouter);
// router.use('/contact', contactRouter);
// router.use('/user', userRouter);
// router.use('/photos', awsPhotoRouter);
// router.route('*')
// .get(tokenMiddleware, isLoggedIn)
// .post(tokenMiddleware, isLoggedIn)
// .put(tokenMiddleware, isLoggedIn)
// .delete(tokenMiddleware, isLoggedIn);

router.use('/admin', _admin.default);
var _default = router;
exports.default = _default;