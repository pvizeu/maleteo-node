const mongoose = require('mongoose');
const User = require('../models/Users');

const createNewUser = async (req,res) => {

    const newUser = new User({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        surname:req.body.surname,
        email: req.body.email,
        password: req.body.password,
        birthdate:req.body.date,
        guardian:req.body.guardian,
        photo:req.body.photo,
    });

    try {
        console.log("nombere"+newUser.name);
        return await newUser.save();
    }
    catch (err) {
        throw err;
    }
};
const findOneUser = async (req,res) => {
    try {
        console.log(req.query.email);
        const user = await User.find({email:req.query.email}).limit(1);
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const updateOneUser = async (email, name, surname, password, date, image_url, guardian) => {

    const user = await findOneUser(email);

    try {
        user.name = name;
        user.surname = surname;
        user.password = password;
        user.date = date;
        user.image_url = image_url;
        user.guardian = guardian;
        user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const fullListOfUsers = async () => {

    try {
        const list = await User.find();
        return list;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

const addImgToUser = async (email, image_url) => {

    const user = await findOneUser(email);

    try {
        user.image_url = image_url;
        user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    createNewUser,
    findOneUser,
    addImgToUser,
    updateOneUser,
    fullListOfUsers
}