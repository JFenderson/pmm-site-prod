// import { Router } from 'express';
// import firebase from 'firebase';
// import db from '../config/googleDb';
// let router = Router();
// let database = firebase.database().ref('/Users/');
// let pmmMember = db.firestore.collection('pmmMembers').doc();
// //get all users from the database
// router.get('/', (req, res) => {
//     pmmMember.get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         res.json(doc.data());
//       })
//     })
//     .catch((err) => {
//       console.log('Error getting documents', err);
//     })
// });
// //get one user from the database
// router.get('/id', (req, res) => {
//     let id = req.params.id;
// });
// //edit one user from the database
// router.put('/:id', (req, res) => {
//     let id = req.params.id;
// });
// //delete one user from the database
// router.delete('/', (req, res) => {
//     let id = req.params.id;
// });
"use strict";