const crud = require('../lib/crudUser');

const newUser = async (req, res) => {
    try{
        const newUser = await crud.createNewUser(req,res);
        console.log(newUser);
        //res.json(newUser);
        res.status(200).json({status:200,message:"Insertado correctamente",data:newUser});
    }
    catch(err){
        res.status(401).json({status:401,message:err.message});
    }

};
const findOneUser = async (req,res,err) => { //lee filtrando email o name o el primero
    try{
       // if(req.query.email){
        const user = await crud.findOneUser(req,res);
        if(Object.keys(user).length == 0) res.status(202).json({status:202,message:"no existe ese email",data:user});

        console.log(user);
        //res.json(newUser);
        res.status(200).json({status:200,message:"leido correctamente",data:user});
        //}
    }
    catch(err){   
        res.status(403).json({status:403,message:err.message});
    }

};
const addImgUser = async (req, res) => {

    await crud.addImgToUser(req.params.id, req.cloudinaryImgUrl);
    res.json({img: true});
};
module.exports = {
    newUser,
    findOneUser,
    addImgUser
};