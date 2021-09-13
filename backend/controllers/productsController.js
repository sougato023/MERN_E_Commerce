const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/productsModel");
const productsModel = require("../models/productsModel");

exports.createProduct = (req, res) => {
    
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //console.log(`Request: ${form.req}`);
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        //check for fields
        const {name, description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error:"All the  fields are required"
            });
        }

        let product = new Product(fields);

        //kb = 1000
        //1mb = 100000
        if(files.photo){
            console.log(`Files photo: ${files.photo}`);
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error:"Files photo should not be greater the 1MB in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err,data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
      
            return res.json({data})
        });
    });


    
    
   
}
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: "Product not found"
            });
            
        }
        req.product = data;
        next();
    });
}

exports.readProduct = (req, res) => {
    //to send photo it takes lot of time hence we set it undefined. Later we will get the photo from separate API
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            
            message: "Product deleted"
        });
    })
}
exports.updateProduct = (req, res) => {


    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //console.log(`Request: ${form.req}`);
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // //check for fields
        // const {name,description, price, category, quantity, shipping} = fields;
        // if(!name || !description || !price || !category || !quantity || !shipping){
        //     return res.status(400).json({
        //         error:"All the  fields are required"
        //     });
        // }

        let product = req.product;
        product = _.extend(product, fields);

        //kb = 1000
        //1mb = 100000
        if(files.photo){
            console.log(`Files photo: ${files.photo}`);
            if(files.photo.size > 100000){
                return res.status(400).json({
                    error:"Files photo should not be greater the 1MB in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err,data) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
      
            return res.json({data})
        });
    });

   
    
}

/*
Send products based on sell/arrival

by sell = /products?sortBy=sold&order=desc&limit=4
by arrival = /products?sortBy=createdAt&order=desc&limit=4

if no params are sent then all the products are send
*/
exports.productsList = (req, res) => {
    let order = req.query.order ? req.query.order : "desc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, data) => {
            if(err || !data){
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(data);
        })

}

/** 
 * it will find the products based on the req product category
 * other products based on the same categroy wil be returned

**/
exports.relatedProductList = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
//console.log(`request product: ${req.product}`);
    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .select("-photo")
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, data) => {
            if(err || !data){
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(data);
        });
}

exports.listProductCategories = (req, res) => {
    Product.distinct("category", {}, (err, data) => {
        if(err || !data){
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(data);
    })
    
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */


exports.listProductsBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip? parseInt(req.body.skip):3;
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
}

exports.productPhoto = (req, res, next) => {
        if(req.product.photo.data){
            res.set("Content-Type", req.product.contentType);
            return res.send(req.product.photo.data);
        }
        //next();
}