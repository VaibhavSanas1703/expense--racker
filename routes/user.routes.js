import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'
import Expense from '../models/expenses.model.js'
import { isLoggedIn } from '../middlewares/user.middlewares.js'
import { generateToken, verifyToken } from '../helper/token.js'
import e from 'express'
const routes = express.Router()

routes.get("/", async (req, res) => {
     if(req.cookies.token){
          const user = verifyToken(req.cookies.token)
          const expenses = await Expense.find({ author: user.userid }).sort({ createdAt: -1 })
          const expensesTotal = expenses.map((expense) => expense.expenseAmount).reduce((sum, value) => sum + value, 0)
           return res.render("pages/home", {
               title: "Home",
               user,
               expenses,
               expensesTotal
          })
     }
     return res.render("pages/home", {
          title: "Home"
     })
})

routes.get("/user/auth/sign-up", (req, res) => {
     res.render("pages/sign-up", {
          title: "Sign up"
     })
})

routes.get("/user/auth/sign-in", (req, res) => {
     res.render("pages/sign-in", {
          title: "Sign in"
     })
})

routes.post("/user/auth/sign-up", async (req, res) => {
     const { username, email, password } = req.body

     try {
          const user = await User.findOne({ email })
          if(user) return res.render("pages/sign-up", {
               title: "Sign up",
               error: "Email Already Exist"
          })
          const hash = await bcrypt.hash(password, 13)
          await User.create({
               username,
               email,
               password: hash
          })
          res.redirect("/user/auth/sign-in")
     }
      catch (error) {
          console.log(error)
     }
})

routes.post("/user/auth/sign-in", async (req, res) => {
     const { email, password } = req.body

     try {
          const user = await User.findOne({ email })
          if(!user) return res.render("pages/sign-in", {
               title: "Sign in",
               error: "User Not Found"
          })
          const checkPassword = await bcrypt.compare(password, user.password)
          if(checkPassword){
               const payload = {
                    username: user.username,
                    userid: user._id,
                    email: user.email
               }
               return res.cookie('token', generateToken(payload), {
                    maxAge: 15 * 60 * 1000
               }).redirect("/")
          }
          res.render("pages/sign-in", {
               title: "Sign in",
               error: "Email or Password is Invalid"
          })
     } 
     catch (error) {
          console.log(error)
     }
})

routes.post("/expense/user/add", isLoggedIn, async (req, res) => {
     const { expenseName, expenseAmount } = req.body

     try {
          await Expense.create({
               expenseName,
               expenseAmount,
               author: req.user.userid
          })
          res.redirect("/")
     }
      catch (error) {
          console.log(error)
     }
})

routes.get("/expenses/user/delete/:expenseid", async (req, res) => {
     try {
          await Expense.findByIdAndDelete(req.params.expenseid)
          res.redirect("/")
     } 
     catch (error) {
          console.log(error)
     }
})

export default routes