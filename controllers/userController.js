const crudUsers = require('../lib/crudUsers');

const newUser = async (req, res) => {
    const newUser = await crudUsers.createNewUser(req.body.email, req.body.password);
    res.json(newUser);
};

module.exports = {
    newUser
};