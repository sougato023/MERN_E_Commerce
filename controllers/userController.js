const User = require("../models/usersModel");

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                err:"User not found"
            });
        }

        req.profile = data;
        next();
    });
}