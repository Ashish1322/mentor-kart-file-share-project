

const router = require("express").Router()

// importing controllers
const {signup,login,activateAccount} = require("../controllers/auth")


router.post("/signup",signup)
router.post("/login",login)


router.get("/verify/:token",activateAccount)
module.exports = router