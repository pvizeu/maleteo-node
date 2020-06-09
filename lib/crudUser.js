const User = require('../models/Users');

const createNewUser = async (email, name, surname, password, date) => {

    const newUser = new User({
        email: email,
        name: name,
        password: password,
        date:date

    });

    try {
        return await newUser.save();
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
const findOneUser = async (id) => {
    try {
        const user = await User.findOne({ "id": id });
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    createNewUser,
    findOneUser
}