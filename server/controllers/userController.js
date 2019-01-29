const User = require('../models/User.js')
const {checkPassword} = require('../helpers/helper.js')
const jwt = require('jsonwebtoken')
const kue = require('kue')
const queue = kue.createQueue()
// var auth = new GoogleAuth;
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.clientId);

class userController{
  static checkLogin(req,res){
    let token = req.headers.token

    jwt.verify(token, process.env.SECRET, function(error, decoded){
      if(error){ //tidak bisa verify jwt (token yg dikirim null)
        res.status(400).send({status: false, message: 'please login'})
      } else {
        User.findOne({
          email: decoded.email
        })
        .then(user => {
          if(user){
            console.log('user found')
            res.status(200).send({status: true})  
          } else {
            console.log('user not found')
            res.status(400).send({status: false, message: 'please login'})  
          }
          
        })
        .catch( error =>{
          // console.log(error)
          res.status(400).send({message: error.message})
        })
      }
    })
  }

  static register(req,res){
    let {name, email, password} = req.body
    let newUser = {name, email, password}

    User.create(newUser)
    .then( user => {
      console.log('userr==',user.email)
        queue.create('email', {
          title: `Congratulation!`,
          email: user.email,
          template: `<h1> Welcome ${user.email}, Thanks for Register to our website!</h1>`
        })
          .save((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(user);
                console.log('masuk')
            }
          })
      res.status(200).json({user, message: 'success register, please login to continue'})
    })
    .catch( error=> {
      res.status(400).json({error, message: error.message})
    })
  }

  static login(req,res){
    let {email, password} = req.body
    
    User.findOne({email})
    .then( user => {
      console.log('user', user)
      if(user){
        if(checkPassword(password, user.password)){
          let token = jwt.sign({ email }, process.env.SECRET);
          res.status(200).json({ message: 'success login', token: token, userId: user._id })
        } else {
          res.status(400).json({ message: "wrong password" })
        }
      } else {
        res.status(400).json({ message: "user not found" }) 
      }
    })
    .catch( error => {
      res.status(400).json({error, message: error.message})
    })
  }

  static loginFacebook(req,res){
    console.log('masuk login facebook')
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.clientId
      });
      let payload = ticket.getPayload()
      User.findOne({ email: payload.email })
          .then((user) => {
            if(user){ //sudah ada di database
              console.log(user)
              const token = jwt.sign({ email: user.email }, process.env.SECRET);
              res.status(200).json({ user, message: 'success login', token })
            } else {
              let newUser = {
                name: payload.name, 
                email: payload.email, 
                password: '1234'
              }
              return User.create( newUser )
            }            
          })
          .then( user => {
            let token = jwt.sign({ email: user.email }, process.env.SECRET);
            res.status(200).json({ user, message: 'success login', token })
          })
          .catch((error) => {
            res.status(400).json({ error, message: error.message })
          });


  }
  verify().catch(console.error);
    // let token = req.body.token
    // let clientId = process.env.clientId
    // const client = new OAuth2Client(clientId)
    // // let client = new auth.OAuth2(clientId, '', '');
    
    // const verifyToken = new Promise(function(resolve, reject){
    //   client.verifyIdToken(token, clientId, function (e, login){
    //       if (login) {
    //           var payload = login.getPayload();
    //           var googleId = payload['sub'];
    //           resolve(googleId);
    //       } else {
    //        reject("invalid token");
    //       }
    //   })
    // })
    // .then(function(googleId){
    //     //use googleId here
    //     console.log(googleId)
    // })
    // .catch(function(error){
    //     //error
    //     console.log(error)
    // })
  }
}

module.exports = userController