const express = require('express')
const router = express.Router()
const {Dashboard,Login} =require("../controllers/main")
router.post("/login",Login)
router.get("/dashboard",Dashboard)
module.exports=router