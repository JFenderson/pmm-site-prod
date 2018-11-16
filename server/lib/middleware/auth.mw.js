"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenMiddleware = tokenMiddleware;
exports.isLoggedIn = isLoggedIn;
exports.isAuthenticated = isAuthenticated;

var _passport = _interopRequireDefault(require("passport"));

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenMiddleware(req, res, next) {
  _passport.default.authenticate('bearer', {
    session: false
  })(req, res, next);
}

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

function isAuthenticated(req, res, next) {
  var user = _firebase.default.auth().currentUser;

  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.redirect('/login');
  }
} // function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated())
//       return next();
//     res.redirect('/signin');
//   }