import React, { useState } from 'react'
import { CognitoUserPool, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { BrowserRouter,useNavigate } from "react-router-dom";
import axios from 'axios';
import constants from '../constants/constants';


export const Register = () => {

  let history = useNavigate();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");

  const UserPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_pfYk8NUoj',
    ClientId: '33uodu095oc71qicdq8nl8c8kl'
  });


  const handleSubmit = event => {
    event.preventDefault();

    let userData = {
        Username : email,
        Pool: UserPool
    };
    console.log("name here" + name)
    console.log("phone" + phone)
    console.log("email" + email)
    
    UserPool.signUp(email, password,[],null, (err, data) => {
      if (err){ 
      console.error("error here" + err);
      alert(err)
      }
      console.log(data);
      if(data){
        const register_url = `${constants.API_BASE_URL}/register`
        console.log("register_url",register_url);
           axios.post(register_url,{
             name: name,
             email: email,
             phone_number: phone
           }).then((res)=>{
             console.log("res",res);
            history("/Conformation?query="+email)
           }).catch((err)=>{
            console.log("err: ",err);
             alert("Technical error")
           })

          
      }
    });
 
  console.log("email",email);
  console.log("password",password);
  
  }
  const validuser = (e) => {
    const user = e.target.value;

    setName(user);
    console.log(name)
  }
  const validpassword = (e) => {
    const pas = e.target.value;

    setPassword(pas);
    console.log(password)
  }
  const validphone = (e) =>{
    const Number = e.target.value;

    setPhone(Number);
    console.log(phone)
  }
  const validemail = (e) =>{
    const mail = e.target.value;

    setEmail(mail);
    console.log(email)
  }
  return (
    <div>
      <div className="container">
        
        <div className='row d-flex justify-content-center'>
          <div className='col-lg-5'>
            <h1 className="my-4">Registration</h1>
            <div className='card px-4 d-flex justify-content-center'>

              <form onSubmit={ handleSubmit }>
                <div>
                <label className='mt-4'>Name:  </label>
                <input required id='username' type='text' onChange={validuser }/>
                </div>
                <div>
                <label className='mt-4'>Password:  </label>
                <input required id='password' type='password' onChange={ validpassword }/>
                </div>
                <div>
                <label className='mt-4'>Phone Number:  </label>
                <input required id='phone_number' type='text' onChange={ validphone }/>
                </div>
                <div>
                <label className='mt-4'>Email:  </label>
                <input required id='email' type='text' onChange={ validemail }/>
                </div>
                <button type='submit' className="w-50 my-4">Sign up</button>
            </form>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

