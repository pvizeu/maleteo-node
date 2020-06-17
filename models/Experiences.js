const mongoose = require('mongoose');
const ExperiencesSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,  //no hace falta
        photo:{type: String},
        title:{type:String},
        text:{type:String},
        rating:{type:Number, enum:[0,1,2,3,4,5]}
    },
    {timestamps: true}
)
const  experiences = mongoose.model('experiences', ExperiencesSchema);
//exportacion
module.exports = experiences;