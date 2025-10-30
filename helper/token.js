import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (payload) => {
     try {
          const token = jwt.sign(payload, process.env.JWT_SECRET, null)
          return token
     }
      catch (error) {
          console.log(error)
     }
}

export const verifyToken = (token) => {
     try {
          const user = jwt.verify(token, process.env.JWT_SECRET)
          return user
     }
     catch (error) {
          console.log(error)
     }
}