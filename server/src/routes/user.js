// import { Router } from 'express';
// // import dotenv from 'dotenv';
// import db from '../config/googleDb';
// // dotenv.config();

// let router = Router();
// let pmmMember = db.firestore.collection('pmmMembers').doc();

// //get all users from the database
// router.get('/', (req, res) => {
//   pmmMember.get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       res.json(doc.data());
//     })
//   })
//   .catch((err) => {
//     console.log('Error getting documents', err);
//   })
// });

// //get one user from the database
// router.get('/id', (req, res) => {
//   let id = req.params.id;
  
// });

// //edit one user from the database
// router.put('/:id', (req, res) => {
//   let id = req.params.id;
//   let data = {
//     firstName: name.firstName,
//     lastName: name.lastName,
//     email: email,
//     phoneNumber: phoneNumber,
//     city: location.city,
//     state: location.state,
//     crabYear: crabYear
//   };

//   pmmMember.update(data)
//   .then((member) => {
//     console.log(member);
//   })
//   .catch((err) => console.log(err))
// });

// //delete one user from the database
// router.delete('/', (req, res) => {
//   let id = req.params.id;
//   pmmMember.delete()
//   .then(res.sendStatus(200).json(`PMM Member ${id} has beeen deleted`))
//   .catch((err) => console.log(err));
// });

// module.exports = router;