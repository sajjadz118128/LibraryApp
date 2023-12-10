const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publisher:{
        type:String,
        default:""
    },
    bookCountAvailable:{
        type:Number,
        default: 1
    }
},
{
    timestamps:true
})

module.exports =  mongoose.model("Book",BookSchema)