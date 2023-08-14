const express = require("express")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()

// using common middlewares
app.use(cors())
app.use(bodyParser.json())

// configuring express routes
const fileRoutes = require("./routes/files")
const authRoutes = require("./routes/auth")
app.use("/auth",authRoutes)
app.use("/files",fileRoutes)



// database connections
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0")
.then(() => console.log("Database Connnected"))
.catch(() => console.log("Database Connection Failed"))



app.listen(3001,() => console.log("App is running"))