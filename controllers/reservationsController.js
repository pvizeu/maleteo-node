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
        res.status(401).json({status:401,message:err.message});
    }
};

const findSpaces = async (req,res) => {
    try {
        console.log("entra en spaces.Controller.findSpaces");
        const spaces = await crud.findSpaces(req,res);
        res.status(200).json({status:200,message:"leido correctamente",data:spaces});
    }
    catch (err) {
        res.status(401).json({status:401,message:err.message});
    }
};
const updateOneSpace = async(req,res)=>{
    let spaces;
    try{
        spaces=await crud.updateOneSpace(req);
        res.status(200).json({status:200,message:"modificado correctamente",data:spaces});
    }
    catch(err){   
        console.log(err.stack);
        res.status(401).json({status:401,message:err.message,data:[]});
    }

};
module.exports = {
    newReservation
};