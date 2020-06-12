const mongoose = require('mongoose');
const spaces = mongoose.model('spaces')

const SpaceSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user_id: {type: mongoose.Schema.ObjectId, ref:'users'},
        alias:{type: String,required:true},
        title:{type:String,required:true},
        localization:{type:String,unique:true,required:true},
        photos:[{type:Array}],
        property:{type:String,enum:["casa","hotel","establecimiento"]},
        space:{type:String,enum:["habitacion","hall","trastero","boardilla","garaje"]},
        locker:{type:String},
        availability:{type:String},
        services:{type:String},
        discount:{type:Number},
        latitud:{type:Number},
        longitud:{type:Number}
    },
    {timestamps: true}
)

const spaces = mongoose.model('spaces', SpaceSchema);
module.exports = spaces;