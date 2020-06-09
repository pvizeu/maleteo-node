const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
            require:true
        },
        name:{
            type: String,
            require: true
        },
        surName:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        date:{
            type:String,
            require:true
        }
    }
);

const  User = mongoose.model('user', UserSchema);
//exportacion
module.exports = User;