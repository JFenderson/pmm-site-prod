"use strict";

var _firebase = _interopRequireDefault(require("firebase"));

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)(); //creates a new authorized user

router.post('/', function (req, res) {
  _firebaseAdmin.default.auth().createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    disabled: false
  }).then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  }).catch(function (error) {
    console.log("Error creating new user:", error);
  });
}); //deletes an authorized user

router.delete('/:id', function (req, res) {
  var uid = req.params.id;

  _firebaseAdmin.default.auth().deleteUser(uid).then(function () {
    console.log("Successfully deleted user");
  }).catch(function (error) {
    console.log("Error deleting user:", error);
  });
}); //lists all the authorized users

router.get('/', function (req, res) {
  // List batch of users, 1000 at a time.
  _firebaseAdmin.default.auth().listUsers(1000, nextPageToken).then(function (listUsersResult) {
    listUsersResult.users.forEach(function (userRecord) {
      console.log("user", userRecord.toJSON());
    });

    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken);
    }
  }).catch(function (error) {
    console.log("Error listing users:", error);
  });
}); //get one authorized user

router.get('/id', function (req, res) {
  _firebaseAdmin.default.auth().getUser(uid).then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  }).catch(function (error) {
    console.log("Error fetching user data:", error);
  });
}); //update a authorized user

router.put('/id', function (req, res) {
  var uid = req.params.id;

  _firebaseAdmin.default.auth().updateUser(uid, {
    email: "modifiedUser@example.com",
    phoneNumber: "+11234567890",
    emailVerified: true,
    password: "newPassword",
    displayName: "Jane Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: true
  }).then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated user", userRecord.toJSON());
  }).catch(function (error) {
    console.log("Error updating user:", error);
  });
});
module.exports = router;