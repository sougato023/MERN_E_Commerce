const express = require("express");

const router = express.Router();

const {createCategory} = require("../controllers/categoryController");

const {requireSignin, isAuth, isAdmin} = require("../controllers/authController");
const {userById} = require("../controllers/userController");



//middle ware for userID
router.param("userId", userById);

router.post("/category/create/:userId" ,requireSignin, isAuth, isAdmin,createCategory);








module.exports = {
    router
};