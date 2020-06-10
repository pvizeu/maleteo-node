const User = require('../models/Users');

const createNewUser = async (email, name, surname, password, date, guardian) => {

    const newUser = new User({
        email: email,
        name: name,
        password: password,
        date:date,
        guardian:guardian

    });

    try {
        return await newUser.save();
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const findOneUser = async (email) => {
    try {
        const user = await User.findOne({ "email": email });
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const addImgToUser = async (id, image_url) => {

    const movie = await findOneUser(email);

    try {
        movie.image_url = image_url;
        movie.save();
        return movie;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    createNewUser,
    findOneUser,
    addImgToUser
}