const express = require("express");

const router = express.Router();

const {createProduct,productById, readProduct, removeProduct, updateProduct} = require("../controllers/productsController");

const {requireSignin, isAuth, isAdmin} = require("../controllers/authController");
const {userById} = require("../controllers/userController");
const productsModel = require("../models/productsModel");



//middle ware for userID
router.param("userId", userById);
router.param("productId", productById);


router.get("/product/:productId", readProduct);
router.post("/product/create/:userId" , requireSignin, isAuth, isAdmin, createProduct);
router.delete("/product/:productId/:userId", requireSignin, isAuth, isAdmin, removeProduct);
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, updateProduct);








module.exports = {
    router
};