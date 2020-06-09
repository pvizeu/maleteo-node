const mongoose = require('mongoose');

const NovedadesSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
    }
)