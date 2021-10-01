import React, {useState, useEffect} from "react";
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth/index";
import { Link } from "react-router-dom";
import {createProduct} from "./apiAdmin";

const AddProduct = () => {

   
    
    

    const [values, setValues] = useState({
        name:"",
        description:"",
        price: "",
        categories:[],
        category:"",
        shipping:"",
        quantity:"",
        photo:"",
        loading:false,
        error:"",
        createdProduct:"",
        redirectToProfile:false,
        formData:""
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //destructure user and oekn from localStorage
    const {user, token} = isAuthenticated();

    useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, [])

    const handleChange = (name) => (event) => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values, [name]: value});
    }




    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false,loading: true});
    
         //make request to create a category
         createProduct(user._id, token, formData)
         .then(data => {
            
             if(data.error){
                 setValues({...values, error: data.error, loading:false})
             }else{
                setValues({...values,  name:"",
                description:"",
                price: "",
                categories:[],
                category:"",
                shipping:"",
                quantity:"",
                photo:"",
                loading:false,
                error:"",
                createdProduct:data.name
                })
                 
             }
         })
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

    const newProductForm = () => {
        return(
            <form className="mb-3" onSubmit={clickSubmit}>
                <h4>Post Photo</h4>
                <div className="form-group">
                    <label htmlFor="" className="btn btn-secondary">
                    <input type="file" onChange={handleChange("photo")} name="photo" accespt="images/*"/>
                    </label>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="text-muted">Name</label>
                    <input type="text" onChange={handleChange("name")} className="form-control" value={name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="text-muted">Description</label>
                    <textarea type="text" onChange={handleChange("description")} className="form-control" value={description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Price</label>
                    <input type="number" onChange={handleChange("price")} className="form-control" value={price}/>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Category</label>
                    <select onChange={handleChange("category")} className="form-control" >
                        <option value="6156d93aef098c12fc464a01">Node</option>
                        <option value="6156e67a088086f4f622bd7d">Sorse Tel</option>
                        
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="" className="text-muted">Quanity</label>
                    <input type="number" onChange={handleChange("quantity")} className="form-control" value={quantity}/>
                </div>

                <div className="form-group">
                    <label htmlFor="" className="text-muted">Shipping</label>
                    <select onChange={handleChange("shipping")} className="form-control" >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                        
                    </select>
                </div>

            <button className="btn btn-outline-primary">Create Product</button>
            </form>
        )
    }
return (
        <Layout title="Add a new Product" description={`Welcome to Shopping ${user.name}, ready to add a new Product`} className="container">
            <div className="row">
                

                <div className="col-md-8 offset-md-2">
{newProductForm()}
                </div>
            </div>
       
        </Layout>
    )
}

export default AddProduct;