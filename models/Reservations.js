const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  //no hace falta
        user_id: {type: mongoose.Schema.ObjectId, ref:'users'},
        guardian_id:{type: mongoose.Schema.ObjectId, ref:'users'},
        space_id:{type: mongoose.Schema.ObjectId, ref:'spaces'},
        deliver:{type:Date,default:Date.now},
        removal:{type: Date,default:Date.now},
        pieces:{type:Number,required:true},
        code:{type:String,required:true},
        state:{type:String, enum:["reject","accept","pending"]},
        price:{type:Number}
    }
)
const reservations = mongoose.model('reservations', ReservationSchema);
model.exports = reservations;