const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    unique:true,
    required:true
  },

  password:{
    type:String,
    required:true
  },
  role:{                      // 🔥 ADD THIS
    type:String,
    enum:["admin","vendor","user"],
    default:"admin"
  },

  status:{
    type:String,
    enum:["active","blocked"],
    default:"active"
  }

},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
