import React, {useState} from "react";
import Layout from "../core/Layout";
import {Link} from "react-router-dom";

import { signup } from "../auth/index";

const Signup = () => {
    
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });
    const {name, email, password, error, success} = values;

    //higher order function=> function returning a function 
    const handleChange = (name) => {
        return ( (event) => {
            setValues({...values, error:false, [name]: event.target.value})
        });
    };

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false});
        signup({name,email, password})
        .then((data) => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else{
                setValues({
                    ...values,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
                })
            }
        });

    }



    const SignupForm = () => 
        (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control"
                value={name}></input>
    
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control"
                value={email}></input>
    
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control"
                value={password}></input>
    
            </div>
            <button onClick={clickSubmit} className="btn btn-priamry">
                Submit
            </button>
            
        </form>
        );

    const showError = () => {
        return(
            <div className="alert alert-danger" style={{display: error? '': 'none'}}>
                {error}
            </div>
        );
    } 
    
    const showSuccess = () => {
        return(
            <div className="alert alert-info" style={{display: success? '': 'none'}}>
                New acount is created. Please <Link to="/signin">signin</Link>
            </div>
        );
    }  
    
    return (
        <Layout title="Signup Page" 
        description="Signup toNode React E-Commerce App"
        className="container col-md-8 offset-md-2">
            {showError()}
            {showSuccess()}
           {SignupForm()}
           {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup;