const mongoose = require('mongoose');
const experiences = require('../models/Experiences');


const findExp= async (req,res,next) => {
    console.log('entrado en crud.findExperiences');
    const list = await experiences.find({},
        function(err,docs){
            if(err)next(err);
            return docs;
        });
    return list;
};

module.exports = {
    findExp
}