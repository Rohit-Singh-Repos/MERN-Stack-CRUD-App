const express = require("express")
const router = express.Router()
const simpleMernAppRouter = require("./simplemernapp.routes")

router.use(simpleMernAppRouter)
module.exports = router