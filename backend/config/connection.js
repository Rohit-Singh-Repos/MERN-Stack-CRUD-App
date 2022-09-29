const mongoose = require("mongoose");
const config = require("./config");

const connectToDB = async() => {
    try {
        const db_Options = {
            dbName:config.dbname // Here only "dbName" key works fine other keys will show error
        }
        await mongoose.connect(config.mongoUri,db_Options)
        console.log("Connected Successfully")
    } catch (error) {
        console.log("Error while connecting")
    }
}

module.exports = connectToDB