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
        birthdate:req.body.birthdate,
        guardian:req.body.guardian,
        photo:req.body.photo,
    });
    newUser.password= await bcrypt.hash(newUser.password, 12);
    console.log("nuevo usuario:"+newUser.name);
    return await newUser.save();
};

const findOneUser = async (email) => {
    //console.log("entro en fidnOneUser");
    //console.log("findOneUser email:",req.query.email);
    //console.log("findOneUser password:",req.query.password);
    /*if(!req.query.hasOwnProperty('password')){
        throw new Error('no escribio en el query el password');
    }
    if( Object.keys(req.query.password).length == 0 || req.query.password==""){
       throw new Error('no escribio en el query el password');
    }

    if(!req.query.hasOwnProperty('email')){
        throw new Error('no escribio en el query el email');
    }
    if((Object.keys(req.query.email).length == 0 )|| (req.req.email=="")){
        throw new Error('no escribio en el query el email');
    } */
   // console.log("paso el filtro de parametros en findOneUser");
    //console.log(req.query.email);
    //console.log(req.query.password);
    //const filter={email:req.query.email};
  
    try {
        console.log(email);
        const filter={email:email};
        const user = await User.find({email:email}).limit(1);
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const updateOneUser = async (req) => {
    //try {
        const name= req.body.name;
        const surname=req.body.surname;
        const email= req.body.email;
        const birthdate=req.body.birthdate;
        const guardian=req.body.guardian;
        const photo=req.body.photo;
        //validacion de parametros
        if(Object.keys(email).length == 0 || email==""){
            throw new Error('no escribio en el body el email');
        };
        //OPCION 1
       user= await User.findOneAndUpdate({email:email},
            {$set:{name:name,surname:surname,birthdate:birthdate,
                photo:photo,guardian:guardian}},
            {new:true, timestamp:true, runValidators:true});
       console.log("despues de modificar");
       console.log(user);
       return user;
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