const crud = require('../lib/crudSpaces');

const newSpace = async (req, res) => {
    try{
        console.log("entra en spaces.Controller.newSpaces");
        const newSpace = await crud.createNewSpace(req,res);
        console.log(newSpace);
        res.status(200).json({status:200,message:"Insertado correctamente",data:newSpace});
    }
    catch(err){
        res.status(401).json({status:401,message:err.message,data:[]});
    }
};

const findSpaces = async (req,res) => {
    try {
        console.log("entra en spaces.Controller.findSpaces");
        const spaces = await crud.findSpaces(req,res);
        if(Object.keys(spaces).length == 0){res.status(200).json({status:404,message:"not Found",data:[]})}
        res.status(200).json({status:200,message:"leido correctamente",data:spaces});
    }
    catch (err) {
        res.status(401).json({status:401,message:err.message,data:[]});
    }
};
const updateOneSpace = async(req,res)=>{
    let spaces;
    try{
        spaces=await crud.updateOneSpace(req); 
        console.log("spaces modificado",spaces);
        if(spaces == undefined){
            res.status(200).json({status:404,message:"not Found",data:[]});
        }
        else{
            res.status(200).json({status:200,message:"modificado correctamente",data:spaces});
        }
    }
    catch(err){   
        console.log(err.stack);
        res.status(401).json({status:401,message:err.message,data:[]});
    }

};
module.exports = {
    newSpace,
    findSpaces,
    updateOneSpace
};