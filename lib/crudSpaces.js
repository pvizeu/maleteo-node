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
    console.log("solo id")
    const prueba=(user);
    console.log(prueba);
    const newSpace = new Space({
        _id:new mongoose.Types.ObjectId(),
        //_userid:mongoose.Types.ObjectId(user._id), crea un nuevo id no me vale
        email:req.query.email,
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
    //newSpace.user_id=user;
    console.log("modelo new space");
    console.log(newSpace);

    try {
        return await newSpace.save();
    }
    catch (err) {
        throw err;
    }
};

const findSpaces= async (req,resp) => {
    var filter={};
    console.log(req.query);
    
    if(req.query.hasOwnProperty('email') && Object.keys(req.query.email).length !== 0  && req.query.email!=="" ){
        filter={email:req.query.email};
    }
    else{  
        if(req.query.hasOwnProperty('title') &&Object.keys(req.query.title).length !== 0 && req.query.title!=="" ){
            filter={title:req.query.title};
        }
        else{ 
            console.log("vacio",filter);
        }
    }
    console.log("filtro");
    console.log(filter);
    //const space = await Space.find(filter);
    const space = await Space.find(filter);
    return space;
};

const updateOneSpace = async (req) => {
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
    findSpaces,
    updateOneSpace
}