

const router = require("express").Router()

// imporing middlewares 
const {upload} = require("../middlewares/files")
const {isLoggedIn} = require("../middlewares/auth")

// importing controllers
const {addFile,getAllReceivedFiles,getAllSentFiles,downloadFile} = require("../controllers/files")


router.post("/upload-file",isLoggedIn, upload.single("file"), addFile)
router.get("/get-received-files",isLoggedIn,getAllReceivedFiles)
router.get("/get-sent-files",isLoggedIn,getAllSentFiles)
router.get("/download/:fileId",downloadFile)

module.exports = router