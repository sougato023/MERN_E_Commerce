const express = require("express");

const router = express.Router();

const {createProduct,
    productById, 
    readProduct, 
    removeProduct, 
    updateProduct, 
    productsList, 
    relatedProductList, 
    listProductCategories, 
    listProductsBySearch,
    productPhoto} = require("../controllers/productsController");

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

router.get("/products", productsList);

router.get("/products/related/:productId", relatedProductList);

router.get("/products/categories", listProductCategories);

// route - make sure its post
router.post("/products/by/search", listProductsBySearch);

router.get("/product/photo/:productId", productPhoto);






module.exports = {
    router
};