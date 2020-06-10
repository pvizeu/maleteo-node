const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        logo:{
            type:String
        },
        photo:{
            type: String
        },
        title:{
            type:String
        },
        text:{
            type:String
        }
    }
)
const Blog = mongoose.model('blog', BlogSchema);
model.exports = Blog;