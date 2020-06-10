const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
    {
        user_id:{

        },
        guardian_id:{

        },
        deliver:{
            type:Date
        },
        removal:{
            type: Date
        },
        pieces:{
            type:Number
        },
        code:{
            type:String
        },
        state:{
            type:String
        },
        price:{
            type:Number
        }
    }
)
const Reservation = mongoose.model('reservation', ReservationSchema);
model.exports = Reservation;