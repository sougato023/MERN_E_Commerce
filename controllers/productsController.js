const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Product = require("../models/productsModel");

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
        const {name,description, price, category, quantity, shipping} = fields;
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
    })
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
        //check for fields
        const {name,description, price, category, quantity, shipping} = fields;
        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error:"All the  fields are required"
            });
        }

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