import { Router } from 'express';
import Table from '../utils/table';
import ZipCodes from 'zipcodes';
import human from 'humanparser';
// import dotenv from 'dotenv';
// import db from '../config/googleDb';
// import { transporter, sendInBlueTransporter, mailgunTransporter } from '../config/nodemailer';
// dotenv.config();

let router = Router();
let members = new Table('members');
// let pmmMember = db.firestore.collection('pmmMembers').doc();

router.get('/', (req, res) => {
  // pmmMember.get()
  // .then((snapshot) => {
  //   snapshot.forEach((doc) => {
  //     res.json(doc.data());
  //   })
  // })
  // .catch((err) => {
  //   console.log('Error getting documents', err);
  // })

  members.getAll()
  .then((member) => {
    res.status(200).json(member)
  })
  .catch((err) => {
    console.log(err)
  })
});

router.get('/:id', (req,res) => {
  members.getOne(req.params.id)
  .then((member) => {
    res.status(200).json(member)
  })
  .catch((err) => {
    console.log(err)
  })
})

router.post('/signup', (req, res) => {
  let { email, phoneNumber, crabYear} = req.body;
  let name = human.parseName(req.body.name);
  let location = ZipCodes.lookup(req.body.location);
 
  let data = {
    firstName: name.firstName,
    lastName: name.lastName,
    email: email,
    phoneNumber: phoneNumber,
    city: location.city,
    state: location.state,
    crabYear: crabYear
  }
  
//   const mailOption = {
//     from: `fenderson.joseph@gmail.com`,// who the email is coming from..in the contact form
//     to: `${name} <${email}>`,//who the email is going to
//     subject: `Thank you for Signing Up to the PMM Weekend Site`,//subject line
//     html: `
//     <div style="text-align: center;">
//       <h1>Hello <span style="color: purple;">${name.firstName}</span>,</h1> <h2>Thank you signing up. You have been added to the PMM Database which will be used to contact you for future events such as road trips to support the band, band schedules and more currently in the works.</h2>
//       <h3>Our goal is to build and get every person that marched as PMM in our database so that we can have a directory. With your help we can get there so spread the word to sign up from the website.</h3>
//       <h1 style="color: purple"><span style="color: gold;">P</span>MM 1X!!!</h1>
//       <p>If you do not wish to be contacted please repond to this email saying <strong>"PLEASE REMOVE"</strong> and you will be removed from the listing.</p>
//     </div>`,
// };


// pmmMember.set(data)
// .then((ref) => {
//   res.json(ref.writeTime.toDate());
//   console.log('added!')
// })
// .then((res) => {
//   console.log(res);
//   transporter.sendMail(mailOption,(error, res)=> {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('email sent!')
//         res.sendStatus(201);
//     }
//     transporter.close();
//   })
// })
// .catch((err)=> {
//   console.log('There was an error posting users',err);
// })

  members.insert(data)
  .then((id) => { 
      res.status(201).json(id);
  })
  .catch((err)=> {
    console.log(err);
  })

  //   mailgunTransporter.sendMail(mailOption, (error, info)=> {
  //     if (error) {
  //         console.log(error);
  //     } else {
  //         console.log('email sent!')
  //         console.log(info)
  //     }
  //     transporter.close();
  //   })    
  // })


})



module.exports = router;