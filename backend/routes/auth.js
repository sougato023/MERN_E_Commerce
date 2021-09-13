const express = require("express");
const router = express.Router();

const {signup, signin, signout, requireSignin} = require("../controllers/authController");
const {userSignupValidator} = require("../validators/index")

// router.get("/", (req, res) => {
//     res.send("Hello from Node Router")
// });

//use controllers
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);






router.get("/help", requireSignin, (req,res) => {
    res.send("Help provided!!!");
});

module.exports = {
    router
};