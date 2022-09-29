const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    useremail:{type:String,required:true,trim:true},
})

const UserDataModel = mongoose.model("userdata",userDataSchema);
module.exports = UserDataModel;