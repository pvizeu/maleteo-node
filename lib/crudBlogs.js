const mongoose = require('mongoose');
const blogs = require('../models/Blogs');


const findBlogs = async (req,res) => {
    try {
        const list = await blogs.find();
        return list;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    findBlogs
}