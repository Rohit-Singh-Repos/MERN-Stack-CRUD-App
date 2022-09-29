require("dotenv").config({path:`${__dirname}/../.env`});

// Or,

// const path = require("path")
// require("dotenv").config({path:path.resolve(__dirname, '../../.env')});

// Or,
// Install an external package called "find-config" by using "npm i find-config" command
// require('dotenv').config({ path: require('find-config')('.env') })

const config = {
    env:process.env.NODE_ENV || "development",
    port:process.env.PORT,
    mongoUri:process.env.MONGODB_URI,
    dbname:process.env.DB_NAME,
    dr:__dirname+"../../.env"
}

module.exports = config;