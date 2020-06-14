const mongoose = require('mongoose');

const User = require('../models/Users');
const Space = require('../models/Spaces');

const createNewSpace = async (req,res) => {

    //deteccion del usuario por email
    const email=req.query.email;
    if(Object.keys(email).length == 0 || email==""){
        throw new Error({message:'no escribio en el body el email'});
    };
    console.log("Sapce email:",req.query.email);
    console.log("space body de alta:");
    console.log(req.body);

    const user = await User.find({email:email}).limit(1);
    console.log("user");
    console.log(user);
    const newSpace = new Space({
        _id:new mongoose.Types.ObjectId(),
        user_id: user._id,
        alias:req.body.alias,
        title:req.body.title,
        localization:req.body.localization,
        photos:req.body.photos,
        property:req.body.property,
        space:req.body.space,
        locker:req.body.locker,
        availability:req.body.availability,
        services:req.body.services,
        discount:req.body.discount,
        latitud:req.body.latitud,
        longitud:req.body.longitud
    });
    console.log("modelo new space");
    console.log(newSpace);

    try {
        return await newSpace.save();
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
            throw new Error({message:'no escribio en el body el email'});
        };
        //OPCION 1
       user= await User.findOneAndUpdate({email:email},
        {$set:{name:name,surname:surname,birthdate:birthdate,
               photo:photo,guardian:guardian}},
        {new:true, timestamp:true, runValidators:true});
       console.log("despues de modificar");
       console.log(user);
       return user;
        /*console.log(user);
        user.name=name;
        user.surname=surname;
        user.birthdate=birthdate;
        user.guardian=guardian;
        user.photo=photo;
        await user.save();*/
       /* console.log(" modificacion de usuario email:",email," surname:",surname);
        const pepe =  User.updateOne(
            {email:email},
            {$set:{name:name,surname:surname,birthdate:birthdate,
                   photo:photo,guardian:guardian}},
            {new:true, timestamp:true, runValidators:true});/*,  //run validator valida lo del modelo
            function (error,data){
                //if (err)throw new Error(err);
                if(error) throw new Error(error);
                return data;
            });*/
       /*     console.log("pepe");
            console.log(pepe);
        return pepe;*/

 
     //   return await user.save();
    /*}
    catch (err) {
        console.log(err);
        next(err);
    }*/
};
const fullListOfSpaces = async () => {

    try {
        const list = await Space.find();
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
    createNewSpace,
}