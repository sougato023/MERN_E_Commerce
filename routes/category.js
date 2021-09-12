const express = require("express");

const router = express.Router();

const {createCategory, categoryById, readCategory, updateCategory,removeCategory, readCategoryList} = require("../controllers/categoryController");

const {requireSignin, isAuth, isAdmin} = require("../controllers/authController");
const {userById} = require("../controllers/userController");



//middle ware for userID
router.param("userId", userById);
router.param("categoryId", categoryById);

router.post("/category/create/:userId" ,requireSignin, isAuth, isAdmin,createCategory);
router.get("/category/:categoryId", readCategory );
router.put("/category/:categoryId/:userId" ,requireSignin, isAuth, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId" ,requireSignin, isAuth, isAdmin, removeCategory);

router.get("/categories", readCategoryList );









module.exports = {
    router
};