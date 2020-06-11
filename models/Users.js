const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
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
        },
        image_url: {
            type: String
        },
        guardian:{
            type:Boolean,
            default:false
        },
        spaces:[
            {
            title:
                {
                    type:String
                }
            }
        ]
    }
);

UserSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
    console.log(err);
    throw err;
}

})

const  User = mongoose.model('user', UserSchema);
//exportacion
module.exports = User;