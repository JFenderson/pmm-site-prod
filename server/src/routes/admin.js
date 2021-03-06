import { Router } from 'express';
import passport from 'passport';
import Table from '../utils/table';
import { encode } from '../utils/tokens';
// import { generateHash } from '../utils/security';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';


let router = Router();
let members = new Table('members');
//base index page for admin
router.get('/signin', function(req, res){
    res.render('login',{'message' :req.flash('message')});
  });

  //when the admin post the login info to view the backend data
router.post('/signin', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/api/user',//if success will redirect to user page to show database of users
    failureRedirect: '/signin',//if fail will redirect to signin page
    failureFlash: true
}), function(req, res, info){
    res.render('user',{'message' :req.flash()});
});


router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});

router.get('/user', (req, res) => {
    members.getAll()
    .then((member) => {
      res.render('user', {"member_list": member});
      // res.status(200).json(member)
    })
    .catch((err) => {
      console.log(err)
    })
  });

  router.get('/user/:id', (req,res) => {
    members.getOne(req.params.id)
    .then((member) => {
      res.render('detail', {"member": member})
      // res.status(200).json(member)
    })
    .catch((err) => {
      console.log(err)
    })
  })

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, token, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else if (!token) {
            return res.status(401).json(info);
        } else {
            return res.status(201).json(token);
        }
    })(req, res, next);
});

// router.get('/generate/:pw', (req, res, next)=>{
//     generateHash(req.params.pw)
//         .then((hash)=>{
//             res.send(hash)
//         })
//         .catch((err)=>{
//             next(err);
//         })
// })

router.put('/user/:id', passport.authenticate('bearer'), (req,res) => {
    members.update(req.params.id, req.body)
    .then((results) => {
        res.render('user',{"member_list": results});
    }).catch((err) => {
        console.log(err);
        res.render('error',{'message' :req.flash()} )
    });
});

router.delete('/user/:id', passport.authenticate('bearer'), (req, res) => {
    let id = req.params.id;
    members.delete(id)
    .then((results) => {
        res.render('user',{"member_list": results});
    }).catch((err) => {
        console.log(err);
        res.render('error',{'message' :req.flash()} )
    });
});

function isAuthenticated(req, res, next) {

    if (req.isAuthenticated())
  
      return next();
  
    res.redirect('/signin');
  
  }

export default router;