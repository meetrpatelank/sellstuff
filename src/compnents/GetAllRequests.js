import React, { Component } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import constants from '../constants/constants';
import AWS from 'aws-sdk';

export const GetAllRequests = () => {

    const [requestArray, setRequestArray] = useState([]);
    const param = useParams();
    console.log("Params:",param);
    const productDetails_api = `${constants.API_BASE_URL}/get-all-requests`;



    useEffect(() => {
        console.log("in effect");
        let userInformation = Cookies.get(constants.authorization_token);
            // userInformation = "harsh@gm.com";
            axios.post(productDetails_api, {
                    "userInformation" : userInformation,
            }).then((res) => {
                console.log("In API");
                console.log("res",res);
                if (res && res.data && res.data.data) {
                    console.log("In IF");
                    console.log("res.data.data: ",res.data.data.requestArray);
                    setRequestArray(res.data.data.requestArray);
                    // console.log(Object.keys(listItems).length);
                }

            }).catch((err) => {
                console.log("Err",err);
            });
    }, []);


    const handleSubmit = React.useCallback( (e, message,item) => {
        e.preventDefault();
        let userInformation = Cookies.get(constants.authorization_token);
        // userInformation = "BUYER@GMAIL.COM";
        console.log("Line 36", userInformation);

        // let productSellerEmail = productDetails.email;
        let productSellerEmail = "SELLER@GMAIL.COM";
        axios.post(`${constants.API_BASE_URL}/`, {
            "userInformation" : userInformation,
            "seller_email" : productSellerEmail,
        });
    },[])


    //handleEvent
    function handleAccept(email) {

        console.log("email",email);
        let handleAcceptAPI = `${constants.API_BASE_URL}/accept-request`;
        let userInformation = Cookies.get(constants.authorization_token);
        // userInformation = "harsh@gm.com";
        axios.post(handleAcceptAPI, {
            "userInformation" : userInformation,
            "buyer_email": email,
        }).then((res) => {
            console.log("In API");
            console.log("res",res);
            if (res && res.data && res.data.data) {
                console.log("In IF");
                console.log("res.data.data: ",res.data.data.requestArray);
                setRequestArray(res.data.data.requestArray);
                console.log("res.data.data",res.data);
                let phoneNumber = res.data.phone;
                let message_content = res.data.message_content;
                let handleTrigger = `${constants.API_BASE_URL}/trigger-lambda`;
                // console.log(Object.keys(listItems).length);
                console.log("phoneNumber: ",phoneNumber);
                console.log("message_content: ",message_content);
                triggerLambda(phoneNumber,message_content);
                // axios.post(handleTrigger,{
                //     phone_number: phoneNumber,
                //     message_content: message_content
                // }).then((res)=>{
                //     console.log("resp ",res);
                // })
            }

        }).catch((err) => {
            console.log("Err",err);
        });
    }


    function handleReject(email) {
        console.log("email",email);

        let handleAcceptAPI = `${constants.API_BASE_URL}/reject-request`;
        let userInformation = Cookies.get(constants.authorization_token);
        // userInformation = "harsh@gm.com";
        axios.post(handleAcceptAPI, {
            "userInformation" : userInformation,
            "buyer_email": email,
        }).then((res) => {
            console.log("In API");
            console.log("res",res);
            if (res && res.data && res.data.data) {
                console.log("In IF");
                console.log("res.data.data: ",res.data.data.requestArray);
                setRequestArray(res.data.data.requestArray);
                // console.log(Object.keys(listItems).length);
            }

        }).catch((err) => {
            console.log("Err",err);
        });

        // axios.post()
    }

    function triggerLambda(phoneNumber,content){
        console.log("LINE 121");

        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: 'ASIASI7QFLTC5YF4BPBJ',
            secretAccessKey: 'U5VtCx9j2xvFXZ18hjoPMjxNhWihGsHpQ3Y4pvw+',
            sessionToken: 'FwoGZXIvYXdzEBwaDLr42OiR7fxtA3gmfiLAAXcOeb+r7Erii9xAelqCblaByt464yrSUhn6Uc9XmyhabjX4lJQEc/VWeia5+itxJlM6FZnMrtA2xljpP++TcK1iQB3f2WUNSPpvFCj05G72dBIYq24mXPDPyo6f36uzJ4nBvA61F7sEqoNusCwwH7Mx+jHmJrCpoUOy9vxEYDzwTNfwcbYn2MFE9eF2UPjzibNq39w4ko9VppjDJ//fCNPGCoLKFmta9ofinFwGKJup+OryQXezB9TMg/f70TVUiyjf5bWSBjIt6UZR0K0WwKSWXxlxiPZJRSTG8MVlnS6DA8kSqADCWS+B3ITseH6O/pH1q4Da'
        })

        var lambda = new AWS.Lambda();

        var params = {
            FunctionName: 'send-notification',
            Payload: JSON.stringify({'phone': phoneNumber, 'content': content})
        };

        lambda.invoke(params, function (err,data){
            if(err) console.log(err,err.stack);
            else console.log(data)
        })
    }

    return(
        <div>
            <div>
                <div className="container">
                    <div className="row">
                        <h1>Your Requests</h1>
                        {
                            requestArray.map((item) => {
                                console.log("item",item);
                                return(
                                    <div>
                                        <b>{item}</b>
                                        <button className="mx-3" onClick={() => handleAccept(item)}>Accept</button>
                                        <button className="mx-3" onClick={() => handleReject(item)}>Reject</button>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>


        </div>
    )

}

