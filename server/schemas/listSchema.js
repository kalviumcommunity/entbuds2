const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    likedFilms: Array
});



module.exports = mongoose.model("list", listSchema)