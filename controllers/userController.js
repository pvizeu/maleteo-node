const crud = require('../lib/crudUser');
const bcrypt = require('bcrypt');
const token =require('./authController');

const newUser = async (req, res) => {
    try{
        const newUser = await crud.createNewUser(req,res);
        console.log(newUser);
        //res.json(newUser);
        res.status(200).json({status:200,message:"Insertado correctamente",data:newUser});
    }
    catch(err){
        res.status(401).json({status:401,message:err.message,data:[]});
    }

};
const findOneUser = async (req,res,err) => { //lee filtrando email o name o el primero
    try{
        
        //obtencion de valores de de la base datos por email y verificando que se envia el email y en crud
        user = await crud.findOneUser(req,res);
        if(Object.keys(user).length == 0) res.status(200).json({status:404,message:"NOT FOUND email",data:[]});
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            const tokenUser=token.getToken(req,res);
            console.log(token);
            res.status(200).json({status:200,message:"leido correctamente",data:user,tokenUser});
        }
        else {
            res.sendStatus(401).json({status:403,message:"usuario o password incorrecta",data:user});
        }
        console.log(user);
    }
    catch(err){   
        res.status(404).json({status:404,message:err.message});
    }

};
const updateOneUser = async(req,res,next)=>{
    try{
        const user=await crud.updateOneUser(req);
        if(Object.keys(user).length == 0) res.status(200).json({status:404,message:"NOT FOUND email",data:[]});
        res.status(200).json({status:200,message:"modificado correctamente",data:user});
    }
    catch(err){   
        res.status(401).json({status:401,message:err.message,data:[]});
    }

};

const addImgUser = async (req, res) => {

    await crud.addImgToUser(req.params.id, req.cloudinaryImgUrl);
    res.json({img: true});
};

module.exports = {
    newUser,
    findOneUser,
    updateOneUser,
    addImgUser
};