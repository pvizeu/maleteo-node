const User = require('../models/Users');

const createNewUser = async (email, password) => {

    const newUser = new User({
        email: email,
        password: password
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