const mongoose = require("mongoose");

const Schema = mongoose.Schema ;

const articaleSchema = new Schema ({
    title: String,
    body: String,
    numbOfLikes: Number
})

const Articale = mongoose.model("Articale" , articaleSchema);


module.exports = Articale;