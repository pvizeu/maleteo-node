const mongoose = require('mongoose');

const ExperienciasSchema = new mongoose.Schema(
    {
        title:{
            type:String,
        },
        photo:{
            type: String
        },
        text:{
            type:String
        },
        rating:{
            type:Number
        }
    }
)
const  Experiencias = mongoose.model('experiencias', ExperienciasSchema);
//exportacion
module.exports = Experiencias;