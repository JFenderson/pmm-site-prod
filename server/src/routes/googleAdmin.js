import firebase from 'firebase';
import admin from 'firebase-admin';
import { Router } from 'express';

let router = Router();

//creates a new authorized user
router.post('/', (req,res) => {
    admin.auth().createUser({
        email: "user@example.com",
        emailVerified: false,
        phoneNumber: "+11234567890",
        password: "secretPassword",
        displayName: "John Doe",
        disabled: false
      })
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
        console.log("Error creating new user:", error);
    });    
})

//deletes an authorized user
router.delete('/:id', (req,res) => {
    let uid = req.params.id;
    admin.auth().deleteUser(uid)
      .then(function() {
        console.log("Successfully deleted user");
      })
      .catch(function(error) {
        console.log("Error deleting user:", error);
      });
})

//lists all the authorized users
router.get('/', (req, res) => {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
      .then(function(listUsersResult) {
        listUsersResult.users.forEach(function(userRecord) {
          console.log("user", userRecord.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken)
        }
      })
      .catch(function(error) {
        console.log("Error listing users:", error);
      });
})

//get one authorized user
router.get('/id', (req,res) => {
    admin.auth().getUser(uid)
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully fetched user data:", userRecord.toJSON());
    })
    .catch(function(error) {
        console.log("Error fetching user data:", error);
    });
})

  //update a authorized user
router.put('/id', (req, res) => {
    let uid = req.params.id;

    admin.auth().updateUser(uid, {
      email: "modifiedUser@example.com",
      phoneNumber: "+11234567890",
      emailVerified: true,
      password: "newPassword",
      displayName: "Jane Doe",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: true
    })
    .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully updated user", userRecord.toJSON());
    })
    .catch(function(error) {
    console.log("Error updating user:", error);
    });
});

module.exports = router;
