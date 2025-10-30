import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     username: {
          type:  String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     avatar: {
          type: String,
          required: false
     }
}, { timestamps: true })
const User = mongoose.model('user', userSchema)

export default User