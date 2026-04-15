const mongoose = require('mongoose');

const WorkshopSchema = new mongooseSchema({
    title : {type : String},
    date : {type : String},
    category : {type : String, enum: ['VIRTUAL','IN_PERSON']},
    tag :  { type : String},
    image_url: {type : String}
});

module.exports=mongoose.models('Workshop',WorkshopSchema);  