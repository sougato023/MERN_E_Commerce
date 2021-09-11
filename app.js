const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const dotenv = require("dotenv");
dotenv.config();

//import user routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");



//app
const app = express();

//body parser in express
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));  
//db connection
mongoose.connect(process.env.DATA_URI,{
    useNewUrlParser:true
    })
    .then(() => console.log("Db connected"));

mongoose.connection.on("error", err => {
    console.log(`Db connection error: ${err.message}`);
});

//middleware
app.use(morgan("dev"));

app.use(cookieParser());

app.use(expressValidator());

// app.get("/", (req,res) => {
//     res.send("Hi Express Server!!!!!!");
// });

//use routes as middleware
app.use("/api",authRoutes.router);
app.use("/api",userRoutes.router);
app.use("/api",categoryRoutes.router);
app.use("/api",productRoutes.router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
});