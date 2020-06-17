const mongoose = require('mongoose');
const blogs = require('../models/Blogs');


const findBlogs = async (req,res) => {
    const list = await blogs.find();
    return list;
};

module.exports = {
    findBlogs
}