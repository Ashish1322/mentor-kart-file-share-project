

const Files = require("../modals/files")
const User = require("../modals/user")
const nodemailer = require("nodemailer")
const path = require("path")

const addFile = (req,res) => {



    if( !req.body.receiverEmail)
    {
        return res.json({success: false, message: "invalid Details"})
    }

    let {receiverEmail} = req.body;

    // find the user whose email is equal to receiverEmail
    User.findOne({email: receiverEmail})
    .then(user => {
        // if receiver account found then only do all these things
        if(user)
        {
            let file = new Files({ filedetails: req.file, to: user._id, owner: req.user.id,description: req.body.description})
            file.save()
            .then(() => 
            {
                // send an alert email to the receiver
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: '',
                      pass: ''
                    }
                  });

                let mailDetails = {
                    from: 'a.m2001nov@gmail.com',
                    to: receiverEmail,
                    subject: 'File has Been Shared with you !',
                    text: `Hello, A file has been shared with you. 
                    File Name: ${req.file.originalname}`
                };
                transporter.sendMail(mailDetails, (err,data) => {
                    if(!err)
                    {
                        res.json({success: true, message:"File Uploaded"})
                    }
                    else
                     res.json({success: false, message: err.message})

                })

                
            }
            
            )
            .catch(err => res.json({success: false, message: err.message}))
        }
        else
        return res.json({success: false, message: "Receiver's Email Doesn't found in system !"})
    })

} 

const getAllReceivedFiles = (req,res) => {
    Files.find({to: req.user.id})
    .populate("owner")
    .then(files => res.json({success: true,files}))
    .catch(err => res.json({success: false,message: err.message}))
}

const getAllSentFiles = (req,res) => {
    Files.find({owner: req.user.id})
    .populate("to")
    .then(files => res.json({success: true,files}))
    .catch(err => res.json({success: false,message: err.message}))
}

const downloadFile = (req,res) => {
//    const userId = req.user.id;
   const fileId = req.params.fileId;
    console.log(fileId)

   Files.findOne({_id: fileId})
   .then(file => {
    if(file)
    {
        const filename = file.filedetails.filename
        const filePath = path.join(__dirname,"../","files",filename)
        return res.download(filePath)
    }
    else
    return res.json({success: false, message: "File not found!"})

   })
   .catch((err) => res.json({success: false, message: err.message}))
}

module.exports = {addFile,getAllReceivedFiles,getAllSentFiles,downloadFile}