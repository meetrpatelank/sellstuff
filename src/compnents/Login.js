import React, { useState } from 'react'
import { CognitoUser, AuthenticationDetails, CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'bootstrap';
import constants from '../constants/constants';
import Cookies from "js-cookie";

export const Login = () => {
    let history = useNavigate();
    
  const [Password,setPassword]=useState("");
  const [Email,setEmail]=useState("");
  const poolData = {
    UserPoolId: 'us-east-1_pfYk8NUoj',
    ClientId: '33uodu095oc71qicdq8nl8c8kl'
  };
  const UserPool = new CognitoUserPool( {
    UserPoolId: 'us-east-1_pfYk8NUoj',
    ClientId: '33uodu095oc71qicdq8nl8c8kl'
  });

    const validSubmit = (event) =>{
        
        event.preventDefault();
        alert("hello")
    const user = new CognitoUser({
      Username: Email,
      Pool: UserPool
    });
    const authDetails = new AuthenticationDetails({
      Username: Email,
      Password: Password
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        Cookies.set(constants.authorization_token, Email, { expires: 30 });
        if(data){
          history('/products')
        }
        
      },

      onFailure: err => {
        console.error("onFailure:", err);
        alert(err)
      }
    });
    }
  const validPassword = (e) => {
    const pas = e.target.value;

    setPassword(pas);
    console.log(Password)
  }
  const validEmail = (e) =>{
    const mail = e.target.value;

    setEmail(mail);
    console.log(Email)
  }
  return (

    
    <>
      <div className="container">

        <div className='row d-flex justify-content-center'>
          <div className='col-lg-5'>
            <h1 className="my-4">Login</h1>
            <div className='card px-4 d-flex justify-content-center'>
            <div>
                        <label className='my-3 mt-4'>Email :  </label>
                        <input required  type='text' onChange={validEmail }/>

            </div>
            <div>
                        <label className='my-3'>Password :  </label>
                        <input required  type='password' onChange={validPassword }/>

            </div>
                        <button type='submit' className="w-50 my-4" onClick={validSubmit}>submit</button>

                  </div>
                  </div>
                </div>
      </div>
    </>
  )
}
