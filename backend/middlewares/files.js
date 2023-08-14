
const multer = require("multer")
const aws = require("aws-sdk")
const multerS3 = require("multer-s3")
const {uid} = require("uid")

// configuring storage for multer to use
aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET_S3,
    accessKeyId: process.env.ACCESS_KEY_S3,
    region: process.env.REGION_S3
})

const S3 = new aws.S3();


const storage = multerS3({
    s3: S3,
    acl: "public-read",
    bucket: "temp1322",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key:  function (req, file, cb) {
        cb(null, uid() + file.originalname) // generating unique key for each object to identify it
    }
})

// creating middleware for routes
const upload = multer({storage: storage})


module.exports = {upload}