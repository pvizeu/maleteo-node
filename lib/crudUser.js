const User = require('../models/Users');

const createNewUser = async (email, name, surname, password, date, image_url, guardian) => {

    const newUser = new User({
        email: email,
        name: name,
        password: password,
        date:date,
        image_url:image_url,
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
const updateOneUser = async (email, name, surname, password, date, image_url, guardian) => {

    const user = await findOneUser(email);

    try {
        user.name = name;
        user.surname = surname;
        user.password = password;
        user.date = date;
        user.image_url = image_url;
        user.guardian = guardian;
        user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const fullListOfUsers = async () => {

    try {
        const list = await User.find();
        return list;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

const addImgToUser = async (email, image_url) => {

    const user = await findOneUser(email);

    try {
        user.image_url = image_url;
        user.save();
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    createNewUser,
    findOneUser,
    addImgToUser,
    updateOneUser,
    fullListOfUsers
}