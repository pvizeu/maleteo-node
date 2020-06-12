const mongoose = require('mongoose');
const experiences = require('../models/Experiences');


const findExperiences = async (req,res) => {
    try {
        const list = await experiences.find();
        return list;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    findExperiences
}