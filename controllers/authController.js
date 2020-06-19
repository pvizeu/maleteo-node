const jwt = require('jsonwebtoken');
const crudUsers = require('../lib/crudUser');
const bcrypt = require('bcrypt');



const authUser = async (req, res, next) => {
    let responseStatus, responseMessage;
    try{
        if(!req.query.hasOwnProperty('email') || Object.keys(req.query.email).length == 0  || req.query.email=="" ){
            responseStatus=400;
            responseMessage="falta en el query email";
        }
        else if(!req.query.hasOwnProperty('password') || Object.keys(req.query.password).length == 0  || req.query.password=="" ){
            responseStatus=400;
            responseMessage="falta en el query password";
        }
        else{
            console.log("email antes de buscar:",req.query.email);
            const user = await crudUsers.findOneUser(req.query.email);
            console.log("en authorize antes de comparar");
            console.log(user);
            if(user.length == 0){
                responseStatus=400;
                responseMessage="NOT FOUND email";
            }
            else{
                console.log("entro a validar");
                let correcto= await bcrypt.compare(req.query.password, user[0].password); 
                if(!correcto){
                    responseStatus=401;
                    responseMessage="USUARIO o PASSWORD no valida";
                }
                else{
                    console.log("validacion correcta");
                    next();
                }
            }
  
    
        }
        if(responseStatus){
            res.status(responseStatus).json({status:responseStatus,message:responseMessage});
        }
    }
    catch(err) {
        if(responseStatus == undefined){
        console.log(err.stack);
        responseStatus=500;
        responseMessage=err.message;
        }
        res.status(responseStatus).json({status:responseStatus,message:responseMessage});
    }
};
 
const getToken = (req, res) => {
    jwt.sign({
        email: req.body.email,
        password: req.body.password
    }, process.env.SECRET, { expiresIn: '1s' }, function (err, token) {
        if (err) throw err;
        res.status(200).json({status:200,message:"leido correctamente",token:token});
    });
};
const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        req.token = req.headers.authorization.split(' ')[1];
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(401);
            }
            else {
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
module.exports = {
    getToken,
    authUser,
    verifyToken
};
