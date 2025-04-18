import express from "express"
import { Router } from "express"
import {signupcontroller} from "../controllers/signupcontroller.js"
import {logincontroller} from "../controllers/logincontroller.js"
import auth from "../middlewares/auth.js"




const router=express.Router();

router.post("/signup",signupcontroller)
router.post("/login",logincontroller);






export default router;