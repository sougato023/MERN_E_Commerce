const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/categoryModel");

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    console.log(req.body);
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
  console.log(data);
        return res.json({data})
    });
}