const jwt = require('jsonwebtoken');

const crudUsers = require('../lib/crudUser');
const bcrypt = require('bcrypt');

const authUser = async (req, res, next) => {
    const thisUser = await crudUsers.findOneUser(req.body.email);

    //const result = await function () {
      //  if (req.body.email==thisUser.email)return true
    //}
    //const result =  bcrypt.compare(req.body.password, thisUser.password);

    if (thisUser.length>0 ) {
        bcrypt.compare(req.body.password, thisUser[0].password,(err,result)=>{
            if (err){
                res.sendStatus(401)
            }else {
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};


const getToken = (req, res) => {

    jwt.sign({
        email: req.body.email,
        password: req.body.password

    }, process.env.SECRET, { expiresIn: '86400s' }, function (err, token) {
        if (err) throw err;
        return {token: token};
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

