import mongoose from "mongoose";
import colors from 'colors'

export const connectDB = (URI) => {
     try {
          mongoose.connect(URI)
          .then(() => console.log(`MongoDB Connected on HOST: ${mongoose.connection.host} Connected Successfully`.bgMagenta.white))
     } 
     catch (error) {
          console.log(error)
     }
}