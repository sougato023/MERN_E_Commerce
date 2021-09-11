const User = require("../models/usersModel");
const jwt = require("jsonwebtoken"); // required for signed token
const expressJwt = require("express-jwt"); // for authorization check
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    
    
    const user = new User(req.body);
    user.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        //remove salt and hashed_password from response
        user.salt = undefined;
        user.hashed_password = undefined;
        
        res.json({data})
    });
    //res.json(user);
};

exports.signin = (req, res) => {
    //find the user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err,data) => {
        if(err || !data){
            return res.status(400).json({
                err:"User does not exist. Please sign-up"
            });
        }

        //if user is found make sure the emaila nd password match
        //create a authenticate module in user module
        if(!data.authenticate(password)){
            return res.status(400).json({
                error: "Email and password doesnot match"
            });
        }

        //generate a signed token and secret
        const token = jwt.sign({_id:data._id}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, {expire:new Date() + 9999}  );

        //resturn the response with the user
        const {_id,name, email, role} = data;


        return res.json({token, user: {_id, email, name, role}});
    })
}


exports.signout = (req,res) => {
    res.clearCookie("t");
    res.json({message: "Signout success"});
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && (req.profile._id == req.auth._id);
    if(!user){
        res.status(403).json({
            error: "Access denied"
        });
    }
    next();
}

exports.isAdmin = (req, res, next) => {
   // let user = req.profile.role===0;
    if(req.profile.role===0){
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
}

