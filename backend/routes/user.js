const express = require("express");
const router = express.Router();

const {requireSignin, isAuth, isAdmin} = require("../controllers/authController");
const {userById , readUserProfile, updateUserProfile} = require("../controllers/userController");



//middle ware for userID
router.param("userId", userById);

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user:req.profile
    });
});

router.get("/users/:userId", requireSignin, isAuth, readUserProfile);
router.put("/users/:userId", requireSignin, isAuth, updateUserProfile);


module.exports = {
    router
};