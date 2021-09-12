const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/categoryModel");

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    //console.log(req.body);
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

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: "Category not found"
            });
            
        }
        req.category = data;
        next();
    });
}

exports.readCategory = (req,res) => {
    return res.json(req.category);
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    //console.log(`Current Category: ${category}`);

    //in request set the header "contentType = application/json"
    category.name = req.body.name;

    category.description = req.body.description ? req.body.description : ""

    //console.log(`Updated Category: ${category}`);
    //console.log(req.body);
    category.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
  //console.log(data);
        return res.json({data})
    });
}

exports.removeCategory = (req, res) => {
    let category = req.category;

    //what about the related products?

    category.remove((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            
            message: "Categroy deleted"
        });
    })
}

exports.readCategoryList = (req, res) => {
 const categoryList = Category.find().exec((err, data) => {
    if(err || !data){
        return res.status(400).json({
            error: "Category not found"
        });
        
    }
    res.json(data);
    
 });

}