import React, { useState } from 'react'
import { CognitoUserPool, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Conformation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let history = useNavigate();
console.log("searchParams.query: ",searchParams.get("query"))
let email = searchParams.get('query')
const poolData = {
    UserPoolId: 'us-east-1_pfYk8NUoj',
    ClientId: '33uodu095oc71qicdq8nl8c8kl'
  };


    const [code,setcode]=useState("");
    const validcode =(e) =>{
        const code = e.target.value;

    setcode(code);
    console.log(code)
 }
 const validsubmit = () =>{
     console.log();
    const UserPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_pfYk8NUoj',
        ClientId: '33uodu095oc71qicdq8nl8c8kl'
      });
    var userData = {
        Username : email,
        Pool: UserPool
    };
   
    var validateUser = new CognitoUser(userData)
    validateUser.confirmRegistration(code,true, function(err, result) {
        if (err) {
            console.log( "hello herr "+err);
            return;
        }
        console.log('call result: ' + result);
        if(result){
            history('/login')
        }
    })
 }
  return (

    
    <>
    <div>
                <label className='mt-2'>Conformation code :  </label>
                <input required  type='text' onChange={validcode }/>
                <button onClick={validsubmit}>Confirm</button>
                </div>
    </>
  )
}
