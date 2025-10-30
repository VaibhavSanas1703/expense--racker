import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import expressEjsLayouts from 'express-ejs-layouts'
import { connectDB } from './config/db.js'
import routes from './routes/user.routes.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.set("layout", "layout/layout")
app.set("views", "./views")
app.use(express.static("public"))

app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Server Started at: 5000`)
    connectDB(process.env.MONGODB_URI)
})