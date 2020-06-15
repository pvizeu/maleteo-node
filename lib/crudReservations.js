const mongoose = require('mongoose');
const User = require('../models/Users');
const Space = require('../models/Spaces');
const Reservations = require('../models/Reservations');

//objeto reserpvation
const createNewReservation = async (req,res) => {
    console.log(req.body)
    //verifico que existe el email del usuario, del guardain y del espacion
    const user=await User.find({email:req.body.useremail}).limit(1);
    const space=await Space.find({email:req.body.guardianemail,title:req.body.spacetitle}).limit(1);
    if(Object.keys(user).length == 0){
        throw new Error("usuario inexistente");
    }
    if(Object.keys(space).length == 0){
        throw new Error("espacio inexistente");
    }
    console.log("usuario")
    console.log(user);
    console.log("space");
    console.log(space);
    
    const newReservation = new Reservations({
        _id:new mongoose.Types.ObjectId(),
        //_userid:mongoose.Types.ObjectId(user._id), crea un nuevo id no me vale
        useremail:req.body.useremail,
        guardianemail:req.body.guardianemail,   //users.email
        spacetitle:req.body.spacetitle,  //spaces.title
        deliver:req.body.deliver,
        removal:req.body.removal,
        pieces:req.body.pieces,
        code:req.body.code,
        state:"pending",
        price:req.body.price
    });
    //newSpace.user_id=user;
    console.log("modelo new reservation");
    console.log(newReservation);
    return await newReservation.save();
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
    createNewReservation ,

}