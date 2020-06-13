const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

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
        newUser.password= await bcrypt.hash(newUser.password, 12);
        console.log("nuevo usuario:"+newUser.name);
        return await newUser.save();
    }
    catch (err) {
        throw err;
    }
};
const findOneUser = async (email) => {
    try {
        console.log(email);
        const user = await User.find({email:email}).limit(1);
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const updateOneUser = async (req,res,next) => {
    try {
        const name= req.body.name;
        const surname=req.body.surname;
        const email= req.body.email;
        const birthdate=req.body.birthdate;
        const guardian=req.body.guardian;
        const photo=req.body.photo;
        //validacion de parametros
        if(Object.keys(email).length == 0 || email==""){
            throw new Error({message:'no escribio en el body el email'});
        };
        const user = await User.findOneAndUpdate(
            {email:email},
            {$set:{name:name,surname:surname,birthdate:birthdate,
                   photo:photo,guardian:guardian}},
            {new:true, timestamp:true, runValidators:true},  //run validator valida lo del modelo
            function (error,data){
                //if (err)throw new Error(err);
                if(error) throw new Error(error);
                return data;
            });
        return user;

 
     //   return await user.save();
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
    updateOneUser,
    addImgToUser,
    fullListOfUsers
}