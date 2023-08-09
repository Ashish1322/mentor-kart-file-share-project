const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    filedetails: {},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserTemp273",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserTemp273",
        required: true
    },
    description: {
        type: String
    }

})

module.exports = mongoose.model("FilesTemp22",fileSchema)