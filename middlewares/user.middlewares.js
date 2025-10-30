import { verifyToken } from "../helper/token.js"

export const isLoggedIn = (req, res, next) => {
     if(req.cookies.token){
          const user = verifyToken(req.cookies.token)
          req.user = user
          return next()
     }
     return res.redirect("/user/auth/sign-in")
}