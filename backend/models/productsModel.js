const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 2000
    }, 
    price: {
        type: Number,
        trim: true,
        required: true,
        maxLength: 32
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number
       
    },
    sold:{
        type: Number,
        dafault: 0
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
    
    
}, {timestamps:true});



module.exports =  mongoose.model("Product", productsSchema);