const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name:{
            type: String,
            require: true
        },
        surname:{
            type:String,
            require:true
        },
        email:{
            type:String,
            unique:true,
            require:true
        },
        password:{
            type:String,
            require:true
        },
        birthdate:{
            type:String,
            require:true
        },
        guardian:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
    console.log(err);
    throw err;
}

})

const  User = mongoose.model('user', UserSchema);
//exportacion
module.exports = User;