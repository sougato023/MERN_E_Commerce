import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";


const Routes = () => {

    return (
        <BrowserRouter>
        
            <Switch>
                <Route path="/" exact  component={Home}></Route>
                <Route path="/signin" exact  component={Signin}></Route>
                <Route path="/signup" exact  component={Signup}></Route>

                <PrivateRoute path="/user/dashboard" exact  component={Dashboard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact  component={AdminDashboard}></AdminRoute>

                <AdminRoute path="/create/category" exact  component={AddCategory}></AdminRoute>

                <AdminRoute path="/create/product" exact  component={AddProduct}></AdminRoute>
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
