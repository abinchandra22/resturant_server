const mongoose = require("mongoose")



const storeSchema = new mongoose.Schema({
    resttname:{
        type:String,
        required:true
    } ,
    place:{
        type:String,
        required:true
    } ,
    food:{
        type:String,
        required:true
    } ,
    insta:{
        type:String
    } ,
    location:{
        type:String,
        required:true
    } ,
    website:{
        type:String
    } ,
    overview:{
        type:String,
        required:true
    } ,
    phoneno:{
        type:String,
        required:true
    } ,
    storeImage1:{
        type:String,
        required:true
    } ,
    userId:{
        type:String,
        required:true
    } 

})

const stores = mongoose.model("stores",storeSchema)

module.exports = stores