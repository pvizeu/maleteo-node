const mongoose = require('mongoose');

const User = require('../models/Users');
const Space = require('../models/Spaces');

const createNewSpace = async (req,res) => {

    //deteccion del usuario por email
    const email=req.query.email;
    if(Object.keys(email).length == 0 || email==""){
        throw new Error('no escribio en el body el email');
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

        const email=req.body.email;
        const alias=req.body.alias;
        const title=req.body.title;
        const localization=req.body.localization;
        const photos=req.body.photos;
        const property=req.body.property;
        const space=req.body.space;
        const locker=req.body.locker;
        const availability=req.body.availability;
        const services=req.body.services;
        const discount=req.body.discount;
        const latitud=req.body.latitud;
        const longitud=req.body.longitud;

        //validacion de parametros obligatorio el email y title
        console.log("email:",req.body.email);
        console.log("title:",req.body.title);
        if(!req.body.hasOwnProperty('email') || typeof req.body.email !== "string" || Object.keys(req.body.email).length == 0  || req.body.email=="" ){
            throw new Error("Obligatorio escribir en el body el email");
        };
        if(!req.body.hasOwnProperty('title') || typeof req.body.title !== "string" || Object.keys(req.body.title).length == 0  || req.body.title=="" ){
            throw new Error("Obligatorio escribir en el body el title");
        };
        /*if(req.body.hasOwnProperty('title') && Object.keys(req.body.title).length !== 0  && req.body.title!=="" ){
            throw new Error('Obligatorio escribir en el body el title y es unico');
        };*/
        //OPCION 1
       const spaces= await Space.findOneAndUpdate({email:email,title:title},
        {$set:{alias:alias,localization:localization,photos:photos,
            property:property,space:space,locker:locker,availability:availability,
            services:services,discount:discount,latitud:latitud,longitud:longitud}},
        {new:true, timestamp:true, runValidators:true},
        function(err,data){
            if(err) throw new Error()
            return data;
        });
       console.log("despues de modificar");
       console.log(spaces);
       return spaces;
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