const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const {loginValidation} = require('../validation/validation');
const db = require('../DB/db');
// import json data just for testing our table
// const path = require('path');
// const fs = require('fs');
// let rawdata = fs.readFileSync(path.join(__dirname,'data.json'));
// let data = JSON.parse(rawdata);
var name;
var admin_count;

router.get('/',(req,res)=>{
      res.render('login',{error:''});
});

router.post('/',async (req,res)=>{
  // validating request body
  const { error } = loginValidation(req.body);
  if (error) {
      return res.render('login',{error:error.details[0].message}); 
  };
  const email = req.body.email;
  db.query('select * from admins a where a.email=?',[email], function (error, results, fields) {
    if(!error & results!=''){
      if(results[0].password == req.body.password) {
            db.query('select count(*) as count from admins',(error, results, fields)=>{
              admin_count = results[0].count;
             });
        // we should give our admin a TOKEN
        name = results[0].name;
        res.redirect('/dashboard');
        // return res.render('dashboard',{
        //   name:name,
        //   data:'',
        //   admin_count:admin_count
        // });

      } else{
        return res.render('login',{error:'Incorrect Password'}); 
      }

    } else{
      return res.render('login',{error:'Email not registered'}); 
    }
       });
  // const salt =await bcrypt.genSalt(10);
  // const hashed =await bcrypt.hash(req.body.password,salt);
});


router.get('/dashboard',(req,res)=>{
  db.query('select count(*) as count from admins',(error, results, fields)=>{
    admin_count = results[0].count;
   });
  console.log(admin_count);
  return res.render('dashboard',{
    name:name,
    data:'',
    admin_count:admin_count
  });
});

// selecting admins
router.all('/showAdmins',(req,res)=>{
  db.query('select count(*) as count from admins',(error, results, fields)=>{
    admin_count = results[0].count;
   });
  console.log(admin_count);
  db.query('select * from admins', function (error, results, fields) {
    if(!error & results!=''){
      return res.render('dashboard',{
        name:name,
        data:results,
        admin_count:admin_count
      })
    } 
       });
});

// test admin count in postman
// router.get('/query',(req,res)=>{
//   var admin_count = 0;
//   db.query('select count(*) as count from admins',(error, results, fields)=>{
//     let c = results[0].count;
//     return res.send("number is : "+c);
//   });
// });
// selecting users
router.post('/showUsers',(req,res)=>{
  console.log('in construction');
});
// selecting drivers
router.post('/showDrivers',(req,res)=>{
  console.log('in construction');  
});

/**
 * admin will have :
 *  id_admin
 *  Name 
 *  Email
 *  password 
 */

router.post('/createAdmin',(req,res)=>{
  // WE MUST VALIDATE ALL FIELDS THEN WE STORE THEM TO DB

  // retreiving body data 
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  if(password!=password2){
    // flush error with that message
    // return alert("Passwords doesn't match !")
  }

  db.query('insert into admins(name,email,password) values(?,?,?)',[name,email,password], function (error, results, fields) { 
      if(!error){
        res.redirect('/showAdmins');
        // alert("Admin Inserted Successfully");
      }
  });

  /**
   * here we will receive our post data for creating new admin
   * admin password must be crypted and stored in our DB
   */
});

router.delete('/delAdmin/:id',(req,res)=>{
  //retrieving admin id to delete
  const id = req.params.id;

  db.query('delete from admins where admin_id = ?',[id], function (error, results, fields) { 
    if(!error){
      res.redirect('/showAdmins')
    }
    });
});
  /**
   * here we will receive our req to delete an admin based on it's id
   */


router.put('/updateAdmin',(req,res)=>{
  //retrieving admin id to update
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query('update admins set name=?,email=?,password=? where admin_id = ?',[name,email,password,id], function (error, results, fields) { 
    if(!error){
      res.redirect('/showAdmins');
    }
    });
  /**
   * here we will recive id and data of which Admin to update 
   */
});


// drivers will be in FIREBASE

router.post('/createDriver',(req,res)=>{
  /**
   * here we will create our drivers we must receive their Credentails then 
   * we autogenerate a password for them after register complete we will :
   * generate a pdf tiket which has (our logo / email / password)
   * send credentials (email , password) to our driver  
   */
});

router.delete('/delDriver',(req,res)=>{
  /**
   * here we will receive our req to delete a driver based on it's id
   */
});

router.put('/updateDriver',(req,res)=>{
  /**
   * here we will recive id and data of which Driver to update 
   */
});

module.exports = router;