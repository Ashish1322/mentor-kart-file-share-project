
const User = require("../modals/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const signup = (req,res) => {
 
    const {name,email,password} = req.body;
    // check data validity
    if(name == undefined || email == undefined || password==undefined)
    {
        return res.json({success: false,message:"Invalid Data"})
    }
    // check password
    if(password.length < 8)
    {
        return res.json({success: false,message:"Password is not strong"})
    }
    // check if account already exists with given email
    User.findOne({email: email })
    .then( user => {
        // if user already exits
    
        if(user)
        {
            return res.json({success:false,message:"Email Already in use"})
        }
        // if not we have to create
        let newUser = new User({name: name,email: email})

        bcrypt.hash(password,10, (err,codedPassword) => {
            if(err) 
            {
               return res.json({success: false, message:"Something Went Wrong!"})
            }
            // if no erro set passord
            newUser.password = codedPassword;
            newUser.save()
            .then(user => {

                // create account activation link
                const token = jwt.sign({
                    id: user._id,
                },"5678ABC",{ expiresIn: '1h' })
                // sending link on user email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '',
                      pass: ''
                    }
                  });

                let mailDetails = {
                    from: 'a.m2001nov@gmail.com',
                    to: user.email,
                    subject: 'Please Activate your account',
                    text: `Activate your account by following link:
                    http://localhost:3001/auth/verify/${token}`
                };

                transporter.sendMail(mailDetails, (err,data) => {
                    if(!err)
                    {
                        return res.json({success: true, message:"Acccount Activation email has been sent on your email. Please activate your account"})
                    }
                    else
                     return res.json({success: false, message: err.message})

                })

          
            })
            .catch(err =>  res.json({success: false, message:err.message}))
            
        })

       
    })
    .catch( () => res.json({success: false, message:"Something Went Wrong!"}))

}

const login = (req,res) => {
    const {email,password} = req.body;
    console.log(email,password)
    // chekc if values are valid
    if( email == undefined || password==undefined)
    {
        return res.json({success: false,message:"Invalid Credentials"})
    }
    // check if adcount exits
    User.findOne({email: email})
    .then(user => {

        // if email not exits
        if(!user )
        {
            return res.json({success: false,message:"Email not Found"})
        }
        // check if user account is activated or not
        if(user.active == false)
        {
            return res.json({success: false,message:"Please activate your account !"})
        }
        // else check the password
        bcrypt.compare(password, user.password, function(err, result) {
            // result == true
            if(result == true)
            {
                const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },"5678ABC",{ expiresIn: '1h' })
                
                return res.json({success: true,token: token,name: user.name, })
            }
            else
            {
                return res.json({success: false, message:"Invalid Password"})
            }
        });



    })
    .catch( () => res.json({success: false, message:"Something Went Wrong!"}))

}


const activateAccount = (req,res) => {
    const token = req.params.token;
    
    try {
        var decoded = jwt.verify(token,"5678ABC")
        let userId = decoded.id;
        User.findById(userId)
        .then(user => {
            user.active = true;
            user.save()
            .then(data => res.send("<h1> Your Account has been activated now you can login </h1>"))
        })
        
    }
    catch(err) {
        return res.json({success: false, messaage:err.message})
    }

}

module.exports = {signup,login,activateAccount}