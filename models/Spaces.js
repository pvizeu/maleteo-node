const mongoose = require('mongoose');
const User = mongoose.model('user')

const SpaceSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: {
            type: mongoose.Schema.ObjectId, ref:'user'
        },
        alias:{
            type: String
        },
        title:{
            type:String
        },
        localization:{
            type:String
        },
        image_url:{
            type:Array
        },
        property:{
            type:String
        },
        space:{
            type:String
        },
        locker:{
            type:String
        },
        availability:{
            type:String
        },
        services:{
            type:String
        },
        discount:{
            type:Number
        }
    }
)

const Spaces = mongoose.model('spaces', SpaceSchema);
module.exports = Spaces;