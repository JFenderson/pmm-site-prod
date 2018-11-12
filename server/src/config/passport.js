
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import Table from '../utils/table';
import { encode, decode } from '../utils/tokens';

let usersTable = new Table('users')
let tokensTable = new Table('tokens');

function configurePassport(app){
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        sessions: false
    }, (email, password, done) => {
        usersTable.find({ email })
        .then ((results) => {
            return results[0];
        }).then((result) => {
            if(result && result.password && result.password === password){
                console.log(result);
                //found user in the db with the same email and password
                //we would generate a token if this is true
                tokensTable.insert({
                    userid: result.id,
                })
                .then((idObj) => {
                    return encode(idObj.id);
                }).then((tokenValue) => {
                    return done(null, { token: tokenValue })
                })
            }else{
                return done(null, false, { message: 'Invalid Login' })
            }
        }).catch((err) => {
            return done(err);
        });
    }));

    passport.use('bearer' ,new BearerStrategy((token, done) => {
        let tokenId = decode(token);
        if(!tokenId) {
            return done(null, false, { message: 'Invalid token'});
        }
        tokensTable.getOne(tokenId)
        .then((tokenRecord) => {
            return usersTable.getOne(tokenRecord.userid);
        }).then((user) => {
            if(user){
                delete user.password;
                return done(null, user); //after this, req.user is SET
            } else {
                return done(null, false, { message: 'Invalid token' });
            }
        }).catch((err) => {
            return done(err);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
    done(null, user);
    });

    app.use(passport.initialize());

    app.use(passport.session());
}

export default configurePassport;