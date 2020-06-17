const crud = require('../lib/crudExperiences');

const fullListOfExperiences = async (req,res,next) => { //lee filtrando email o name o el primero
    try{
       // if(req.query.email){
        console.log("hemos entrado en el controlador de experiences");
        const experiences= await crud.findExp(req,res,next);
        console.log("hemos salido de la llamada a findexperiences")
        console.log(experiences);
        if(Object.keys(experiences).length == 0) res.status(200).json({status:404,message:"NOT FOUND",data:[]});

        //res.json(newUser);
        res.status(200).json({status:200,message:"leido correctamente",data:experiences});
        //}
    }
    catch(err){   
        res.status(403).json({status:403,message:err.message});
    }

};

module.exports = {
    fullListOfExperiences
};