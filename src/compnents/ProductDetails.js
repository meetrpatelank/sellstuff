import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import constants from '../constants/constants';

export const ProductDetails = () => {
    let history = useNavigate();
    const [productDetails, setproductDetails] = useState([]);
    const [sellerEmail, setSellerEmail] = useState("");
    const param = useParams();
    console.log("Params:", param);
    const productDetails_api = `${constants.API_BASE_URL}/get-product-details/${param.uuid}`;



    useEffect(() => {
        console.log("in effect");
        axios.get(productDetails_api).then((res) => {
            console.log("In API");
            console.log("res", res);
            if (res && res.data && res.data.data) {
                console.log("In IF");
                console.log(res.data);
                setproductDetails(res.data.data);
                setSellerEmail(res.data.data.seller_email)
                console.log("res.data.data.seller_email",res.data.data.seller_email);
                // console.log(Object.keys(listItems).length);
            }

        }).catch((err) => {
            console.log("Err", err);
        });
    }, []);


    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        let userInformation = Cookies.get(constants.authorization_token);
        // userInformation = "abc@gmai.com";
        console.log("Line 36", userInformation);
        // let productSellerEmail = productDetails.email;
        let productSellerEmail = productDetails && productDetails.seller_email;
        console.log("sellerEMail: ",sellerEmail);
        console.log("productSellerEmail",productSellerEmail);
        axios.post(`${constants.API_BASE_URL}/add-request`, {
            "userInformation": userInformation,
            "seller_email": productSellerEmail
        }).then((res)=>{
            history("/products");
        }).catch((err) => {
            history("/products");
        })

    },[productDetails]);

    return (
        <div className="details-container">
            <div className="row justify-content-md-center">
                <div className="col-lg-7">
                    <img src={productDetails && productDetails.product_image_url} width="450" height="450"
                    ></img>
                </div>
                <div className="col-lg-5">
                    <div>
                        <h3>{productDetails && productDetails.product_name}</h3>
                    </div>
                    <div>
                        <h5>Description: {productDetails && productDetails.product_description}</h5>
                    </div>
                    <div>
                        <h5>Price: {productDetails && productDetails.price}</h5>
                    </div>
                    <div>
                        <h2>Seller Information</h2>
                    </div>
                    <div>
                        Seller Name: {productDetails && productDetails.name}
                    </div>
                    {/*<div>*/}
                    {/*    Seller Email: {productDetails && productDetails.seller_email}*/}
                    {/*</div>*/}
                    <button onClick={handleSubmit}>Request Details</button>
                    <div>




                    </div>

                </div>
            </div>
        </div>
    )


}

