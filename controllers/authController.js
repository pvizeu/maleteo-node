const jwt = require('jsonwebtoken');

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
    verifyToken
};
