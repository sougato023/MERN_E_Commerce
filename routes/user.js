const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../controllers/authController");
const {userById} = require("../controllers/userController");



//middle ware for userID
router.param("userId", userById);

router.get("/secret/:userId", requireSignin, isAuth, (req, res) => {
    res.json({
        user:req.profile
    });
});



module.exports = {
    router
};