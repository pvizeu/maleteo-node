const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  //no hace falta
        useremail: {type:String,required:true},  //users.email
        guardianemail:{type:String,required:true},   //users.email
        spacetitle:{type:String,required:true},  //spaces.title
        deliver:{type:Date,default:Date.now,required:true},
        removal:{type: Date,default:Date.now,required:true},
        pieces:{type:Number,required:true},
        code:{type:String,required:true},
        state:{type:String, enum:["reject","accept","pending"],default:"pending"},
        price:{type:Number,required:true}
    },
    {timestamps: true}
);
ReservationSchema.pre('save', async function (next) {
    try {  
          console.log('paso por el presave');
        next(); 
    } catch (err) {
       console.log(err);
       res.json(err);
        throw err;
    }

});
const reservations = mongoose.model('reservations', ReservationSchema);
module.exports = reservations;