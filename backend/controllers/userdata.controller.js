const UserDataModel = require("../models/userdata.model");

class UserDataController{
    static saveData = async(req,res) => {
        try {
            const { name,email } = req.body;
            if(name && email){
                const getUserData = new UserDataModel({
                    username:name,
                    useremail:email 
                })
                const saveDocument = await getUserData.save();
                res.send(saveDocument)
            }else{
                res.send("All fields are required")
            }
        } catch (error) {
            res.send(error)
        }
    }

    static getData = async(req,res) => {
        try {
           const getUserData = await UserDataModel.find()
           res.send(getUserData);
        } catch (error) {
            res.send(error)
        }
    }

    static getDataById = async(req,res) => {
        try {
            const getId = await UserDataModel.findById(req.params.id)
            res.send(getId)
        } catch (error) {
            res.send(error)
        }
    }

    static updateUserById = async(req,res) => {
        try {
            const {id,name,email} = req.body
            const updateUser = await UserDataModel.findByIdAndUpdate(id,{
                username:name,
                useremail:email
            })
            console.log(updateUser)
            res.send(updateUser)
        } catch (error) {
            res.send(error)
        }
    }

    static deleteData = async(req,res) => {
        try {
            const deleteData = await UserDataModel.findByIdAndRemove(req.params.id)
            res.send("Data deleted successfully")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = UserDataController