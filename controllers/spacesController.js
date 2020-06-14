const crud = require('../lib/crudSpaces');

const newSpace = async (req, res) => {
    try{
        console.log("entra en spaces.Controller.newSpaces");
        const newSpace = await crud.createNewSpace(req,res);
        console.log(newSpace);
        res.status(200).json({status:200,message:"Insertado correctamente",data:newSpace});
    }
    catch(err){
        res.status(401).json({status:401,message:err.message});
    }
};


module.exports = {
    newSpace
};