import express from "express"
import { login } from "../controller/loginController.js"

const loginRouter=express.Router()

loginRouter.post("/login",login)

export default loginRouter