import React, { Component } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter,useNavigate } from "react-router-dom";
import axios from "axios";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import constants from '../constants/constants'; 

export const AddNewProduct = () => {

    let history = useNavigate();

    const storeAPI = `${constants.API_BASE_URL}/storedata`;

    const [image, setImage] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('');



    let userInformation = Cookies.get(constants.authorization_token);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");



    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('image', image.data)
        formData.append('price', price);
        formData.append('product_name', name);
        formData.append('description', description);
        formData.append('userInformation', userInformation);
        const response = await fetch(storeAPI, {
            method: 'POST',
            body: formData,
        })
        if (response) {
            console.log("response: ",response);
            setStatus(response.statusText);
            alert("Product added");
            history("/products");
        }
}

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    

    return (
        <div className="container wishlist-container">
            
            <h1>Add a product</h1>
            {image.preview && <img src={image.preview} width='100' height='100' />}

            <form onSubmit={handleSubmit}>
                <input type='file' name='file' onChange={handleFileChange}></input>
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type='submit'>Upload</button>
            </form>

            {status && <h4>{status}</h4>}


        </div>
    );
}




/* <div class="wishlist-card" style={{ float: 'left' }}>
                                {/* <img src={r.thumbnail_path + r.id + "/image1.webp"} width="195" height="260"></img> */
/* <div class="wishlist-card-body">
<h5 class="wishlist-card-title">{r.id}</h5>
</div>
<ul class="list-group list-group-flush">
<h4 class="list-group-item">CAD: {r.Name}</h4>
</ul>
<ul class="list-group list-group-flush">
<h4 class="list-group-item">CAD: {r.Description}</h4>
</ul>
<ul class="list-group list-group-flush">
<h4 class="list-group-item">CAD: {r.Price}</h4>
</ul> */

                            //</div> 