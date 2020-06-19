const crud = require('../lib/crudReservations');

const newReservation = async (req, res) => {
    try{
        console.log(req.body);
        console.log("entra en reservationsController.newSpaces");
        const newReservation = await crud.createNewReservation(req,res);
        console.log(newReservation);
        res.status(200).json({status:200,message:"Insertado correctamente",data:newReservation});
    }
    catch(err){
        res.status(401).json({status:401,message:err.message,data:[]});
    }
};

const findReservations = async (req,res) => {
    try {
        console.log("entra en spaces.Controller.findSpaces");
        const reservations = await crud.findReservations(req,res);
        console.log(reservations);
        if(Object.keys(reservations).length == 0){es.status(200).json({status:404,message:"not Found",data:[]})}
        res.status(200).json({status:200,message:"leido correctamente",data:reservations});
    }
    catch (err) {
        console.log(err.message.Error);
        res.status(401).json({status:401,message:err.message,data:[]});
    }
};
const updatebyIdState = async(req,res)=>{
    try{
        console.log("entra en spaces.Controller.updatebyIdStateReservation");
        reservations=await crud.updatebyIdStateReservation(req);
        if(reservations == undefined){
            res.status(200).json({status:404,message:"not Found",data:[]})
            return;
        }
        else{
            res.status(200).json({status:200,message:"modificado correctamente",data:reservations});
            return;
        }
    }
    catch(err){   
        console.log(err.stack);
        res.status(401).json({status:401,message:err.message,data:[]});
        return;
    }
};
module.exports = {
    newReservation,
    findReservations,
    updatebyIdState
};