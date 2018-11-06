"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _express = require("express");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _multer = _interopRequireDefault(require("multer"));

var _table = _interopRequireDefault(require("../utils/table"));

var _db = require("../config/db");

var _multerS = _interopRequireDefault(require("multer-s3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

var router = (0, _express.Router)(); //information from .env_var(accessKey,secretKey,region,bucketname)

_awsSdk.default.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

var s3 = new _awsSdk.default.S3({
  apiVersion: '2006-03-01'
});
var bucketName = process.env.AWS_S3_BUCKET;
var photos = new _table.default('photos');
var upload = (0, _multer.default)({
  contentType: 'image/jpeg',
  storage: (0, _multerS.default)({
    s3: s3,
    acl: 'public-read',
    bucket: bucketName,
    contentType: _multerS.default.AUTO_CONTENT_TYPE,
    metadata: function metadata(req, file, cb) {
      cb(null, {
        fieldName: file.originalname
      });
    },
    key: function key(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});
router.get('/', function (req, res) {
  photos.getAll().then(function (photos) {
    res.send(photos); // res.json(photos)
  }).catch(function (error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    } else if (error.status === 500) {
      console.log('Server Error');
    }
  }); // s3.listBuckets(function(err, data) {
  //     if (err) {
  //        console.log("Error", err);
  //     } else {
  //        console.log(data.Buckets);
  //     }
  //  });
  // s3.listObjects({Bucket: 'pmmpicnic96'},(err, data)=> {
  //     if (err) {
  //         console.log("Error", err);
  //      } else {
  //         console.log("Bucket Object List", data);
  //      }
  // })
});
router.get('/:id', function (req, res) {
  var id = req.params.id;
  photos.getOne(id).then(function (photos) {
    console.log('these are get:id images');
    console.log(photos);
    res.json(photos);
  });
});
router.post('/', upload.single('imageFile'), function (req, res) {
  photos.insert({
    imageName: req.file.originalname,
    url: req.file.location
  }).then(function () {
    res.json({
      code: 201,
      data: {
        imageName: req.file.originalname,
        url: req.file.location
      }
    });
  }).catch(function (err) {
    console.log(err);
  }); // res.send('Successfully uploaded ' + req.files.length + ' files!')
});
router.post('/multi', upload.any(), function (req, res) {
  // console.log('this is the file', req.files);
  req.files.map(function (image, index) {
    console.log('these are the images', image);
    photos.insert({
      imageName: image.originalname,
      url: image.location
    }).then(function () {
      res.json({
        code: 201,
        data: {
          imageName: image.originalname,
          url: image.location
        }
      });
    }).catch(function (err) {
      console.log(err);
    });
  }); // res.send('Successfully uploaded ' + req.files.length + ' files!')
});
var _default = router;
exports.default = _default;