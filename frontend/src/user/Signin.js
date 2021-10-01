import React, {useState} from "react";
import Layout from "../core/Layout";
import { Redirect} from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth/index";



const Signin = () => {
    const {user} = isAuthenticated();
    
    const [values, setValues] = useState({
        email:"sougato023@gmail.com",
        password:"abcd1234",
        error:"",
        loading:false,
        redirectToReferrer:false
    });
    const { email, password, error, loading, redirectToReferrer} = values;

    //higher order function=> function returning a function 
    const handleChange = (name) => {
        return ( (event) => {
            setValues({...values, error:false, [name]: event.target.value})
        });
    };

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false, loading: true});
        signin({email, password})
        .then((data) => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }else{

                authenticate(data, () => {
                    setValues({
                        ...values,
                        
                        redirectToReferrer: true
                    });
                });
                
            }
        });

    }



    const SigninForm = () => 
        (
        <form>
            
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
    
    const showLoading = () => {
        return(
            <div className="alert alert-info" style={{display: loading? '': 'none'}}>
                <h2>Loading...</h2>
            </div>
        );
    }  

    const redirectUser = () => {
        if(redirectToReferrer){
            console.log(user);
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
            return(
                <Redirect to="/user/dashboard" />

            )
            }

            
        }

        if(isAuthenticated()){
            return(
                <Redirect to="/" />

            )
        }
    }
    
    return (
        <Layout title="Signin Page" 
        description="Signin to Node React E-Commerce App"
        className="container col-md-8 offset-md-2">
            {showError()}
            {showLoading()}
           {SigninForm()}
           {redirectUser()}
           {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signin;