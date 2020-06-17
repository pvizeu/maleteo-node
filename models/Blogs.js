const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  //no hace falta
        logo:{type:String},
        photo:{type: String},
        title:{type:String},
        text:{type:String}
    },
    {timestamps: true}
)
const blogs = mongoose.model('blogs', BlogSchema);
module.exports = blogs;