import React, {useState} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth/index";
import { Link } from "react-router-dom";
import {createCategory} from "./apiAdmin"

const AddCategroy = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false);

    //destructure user and oekn from localStorage
    const {user, token} = isAuthenticated();

    const handleChange = (event) => {
        setError(false);
        setSuccess(false)
        setName(event.target.value)
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);

        //make request to create a category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setError(false);
                setSuccess(true);
            }
        })
    }

    const showSuccess = () => {
        if(success){
        return (
            <h3 className="text-success">{name} is created</h3>
        )
        }
    }

    const showError = () => {
        if(error){
        return (
            <h3 className="text-danger">Category should be unique</h3>
        )
        }
    }

    const goBack = () => {
       return(
           <div className="mt-5">
               <Link className="text-warning" to="/admin/dashboard">
                   Back to Dashboard
               </Link>
           </div>
       )
    }

    const newCategoryForm = () => {
        return(
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Name</label>
                    <input type="text" onChange={handleChange} className="form-control"
                    value={name}
                    autoFocus
                    required
                    />
                   
                </div>
                <button className="btn btn-outline-primary">Create Category</button>
            </form>
        )
    }
return (
        <Layout title="Add a new Category" description={`Welcome to Shopping ${user.name}, ready to add a new Category`} className="container">
            <div className="row">
                

                <div className="col-md-8 offset-md-2">
{showSuccess()}
{showError()}
                {newCategoryForm()}
                {goBack()}
                </div>
            </div>
       
        </Layout>
    )
}

export default AddCategroy;