const express = require("express");
const simpleMernAppRouter = express.Router();
const UserDataController = require("../controllers/userdata.controller");

// ================================== Getting data from database start =====================================//

/**
 * @swagger
 * '/api/getuserdata':
 *  get:
 *     tags:
 *     - Get Users Data
 *     summary: This api will gets a specific user data from the database
 *     description: Api endpoint to get all users data
 *     responses:
 *       200:
 *         description: Successfully Get All Users Data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   useremail:
 *                     type: string
 *       400:
 *         description: Bad request
 */
simpleMernAppRouter.get("/getuserdata",UserDataController.getData) 

// ================================== Getting data from database end ========================================//

// ================================== Post data to database start ========================================//

/**
 * @swagger
 * '/api/saveuserdata':
 *  post:
 *     tags:
 *     - Save Users Data
 *     summary: This api will creates a specific user data into the database
 *     description: Api endpoint to save users data
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *            properties:
 *              name:
 *                  - type: string
 *                  - default: Yashveer Singh
 *              email:
 *                  - type: string
 *                  - default: errohitsingh@gmail.com
 *     responses:
 *      201:
 *        description: Data Created Successfully
 *      409:
 *        description: Conflict Raised
 *      404:
 *        description: Not Found
 */
simpleMernAppRouter.post("/saveuserdata",UserDataController.saveData) 

// ================================== Post data to database end ============================================//

// ================================== Update data to database start ===========================================//

/**
 * @openapi
 * '/api/updateuser':
 *  put:
 *     tags:
 *     - Update User by Id
 *     summary: This API will update the particular user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *              - email
 *            properties:
 *              id:
 *                type: string
 *              name:
 *                type: string
 *              email:
 *                type: string
 *     responses:
 *      200:
 *        description: Modified
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

simpleMernAppRouter.get("/getuserdatabyid/:id",UserDataController.getDataById) 
simpleMernAppRouter.put("/updateuser",UserDataController.updateUserById) 

// ================================== Update data to database end ============================================//

// ================================== Delete data from database start ======================================//

/**
 * @swagger
 * '/api/deleteuserdata/{id}':
 *  delete:
 *     tags:
 *     - Delete User Data
 *     summary: This api will remove a specific user data from the database
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the User
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
simpleMernAppRouter.delete("/deleteuserdata/:id",UserDataController.deleteData) 

// ================================== Delete data from database end =========================================//

module.exports = simpleMernAppRouter;
