const crud = require('../lib/crudUser');

const newUser = async (req, res) => {
    const newUser = await crud.createNewUser(req.body.email, req.body.password);
    res.json(newUser);
};
const addImgUser = async (req, res) => {

    await crud.addImgToUser(req.params.id, req.cloudinaryImgUrl);
    res.json({img: true});
};
module.exports = {
    newUser,
    addImgUser
};