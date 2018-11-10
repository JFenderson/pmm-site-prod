'use strict';

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("./routes"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _compression = _interopRequireDefault(require("compression"));

var _passport = _interopRequireDefault(require("./config/passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var PUBLIC_PATH = _path.default.join(__dirname, '../public');

var app = (0, _express.default)();
(0, _passport.default)(app);
app.use((0, _expressSession.default)({
  secret: '{secret}',
  name: 'session_id',
  saveUninitialized: true,
  resave: true
}));
app.use((0, _connectFlash.default)());
app.use((0, _compression.default)());
app.use((0, _cors.default)());
app.use(_express.default.static(PUBLIC_PATH));
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', _path.default.join(__dirname, '../../views'));
app.get('/', function (_, res) {
  res.render('login');
});
app.use('/api', _routes.default);
app.listen(app.get('port'), function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server listening on ".concat(app.get('port')));
  }
});