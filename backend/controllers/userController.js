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

exports.readUserProfile = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json({user: req.profile});
}
exports.updateUserProfile = (req, res) => {
    
    User.findOneAndUpdate({_id: req.profile}, {$set: req.body}, {new: true}, (err, data) => {
        if(err || !data){
            return res.status(400).json({
                err:"You are not authorised to perform this action"
            });
        }
        data.hashed_password = undefined;
        data.salt = undefined;
        res.json(data);
    });
}