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

const findReservations= async (req,res) => {
    let filter={};
    console.log("dtos el query en crud fidnreservations")
    console.log(req.query);
    
    if(req.query.hasOwnProperty('useremail') && Object.keys(req.query.useremail).length !== 0
      && req.query.useremail!=="" ){
        filter={...{useremail:req.query.useremail}};
    }  
    if(req.query.hasOwnProperty('guardianemail') &&Object.keys(req.query.guardianemail).length !== 0
     && req.query.guardianemail!=="" ){
        filterparcial={guardianemail:req.query.guardianemail};
            filter={...filter,...{guardianemail:req.query.guardianemail}};
    }
    if(req.query.hasOwnProperty('state') &&Object.keys(req.query.state).length !== 0
    && req.query.state!=="" ){
           filter={...filter,...{state:req.query.state}};
   }
        
    console.log("filtro");
    console.log(filter);
    //const space = await Space.find(filter);
    const reservation = await Reservations.find(filter);
    return reservation;
};

const updatebyIdStateReservation = async (req,res) => {

    //validacion de parametros obligatorio el email y title
    console.log("parametros de id");
    console.log(req.body._id);
    console.log("parametros del estado");
    console.log(req.body.state);
    if(!req.body.hasOwnProperty('_id') || typeof req.body._id !== "string" || 
                                        Object.keys(req.body._id).length == 0){
        throw new Error("Obligatorio escribir en el body el _id de reservations");
    }; 
    if(!req.body.hasOwnProperty('state') || typeof req.body.state !== "string" || 
                Object.keys(req.body.state).length == 0  || req.body.state=="" ){
        throw new Error("Obligatorio escribir en el body el nuevo estado reject,accept, pending");
    };
    //escritura
    const reservations= await Reservations.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.body._id)},
                        {$set:{state:req.body.state}},
                        {new:true, timestamp:true, runValidators:true},
                        function(err,data){
                            if(err) throw new Error()
                            return data;
    });
    console.log("despues de modificar");
    console.log(reservations);
    return reservations;
};

module.exports = {
    createNewReservation ,
    findReservations,
    updatebyIdStateReservation
}