import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import constants from '../constants/constants'; 

export const ProductListing = () => {
    const [listItems, setListItems] = useState([]);
    const getAPI = `${constants.API_BASE_URL}/get-all-listings`;
    let userInformation = Cookies.get(constants.authorization_token);

    useEffect(() => {
        console.log("in effect");
        axios.get(getAPI).then((res) => {
            console.log("In API");
            console.log("res",res);
            if (res && res.data && res.data.products) {
                console.log("In IF");
                console.log(res.data);
                setListItems(res.data.products);
                console.log(Object.keys(listItems).length);
            }

        });
    }, []);

    return (
        <div className="container product-container">
            <div className="row product-row">
                <h1>All Listings</h1>
                {
                    listItems.map((r) => {
                        console.log("r: ",r)
                        let url = "/products/" + r.uuid;
                    return (
                       
                            <div className="col-lg-3 border-20-px mt-4" >
                                <a href={url}>
                                <div class="product-card border border-dark" style={{ float: 'left' }}>
                                    <img src={r.product_image_url} width="250" height="250"  alt="product" />
                                    <div class="product-card-body">
                                        <h5 class="list-group-item">{r.product_name}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <h4 class="list-group-item">{r.product_description}</h4>
                                    </ul>
                                    <ul class="list-group list-group-flush">
                                        <h4 class="list-group-item">CAD $: {r.price}</h4>
                                    </ul>
                                    
                                </div>
                                </a>
                            </div>
                        
                        
                    )})
                }



            </div>
           
        </div>

    )


}
