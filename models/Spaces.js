const mongoose = require('mongoose');

//user_id: {type: mongoose.Schema.ObjectId, ref:'users'},
const SpaceSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        //userid: {type: String, required:true},  //es el id de users
        //_userid:mongoose.Schema.Types.ObjectId, //cre un nuevo objeto
        email:{type:String,required:true},
        alias:{type: String,required:true},
        title:{type:String,unique:true,required:true},
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
);

SpaceSchema.pre('save', async function (next) {
    try {  
          console.log('paso por el presave');
        next(); 
    } catch (err) {
       console.log(err);
       res.json(err);
        throw err;
    }

})

const spaces = mongoose.model('spaces', SpaceSchema);
module.exports = spaces;