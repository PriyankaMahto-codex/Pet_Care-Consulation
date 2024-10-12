import React, { useState } from 'react'
import '../Pages/LoginSignup.css'
const LoginSignup = () => {

  const [state,setState]= useState("Login");

  const [formData,setFormData] = useState({
    patientname:"",
    email:"",
    password:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const login = async ()=>{
    let responseData;
    console.log("Login function works",formData);
    await fetch('http://localhost:4000/login',{
      method:'POST',
        headers:{
          'Accept':'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>{responseData=data});
    if(responseData.success){
      window.localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors);
    }

  }
  const signup = async ()=>{
    let responseData;
    console.log("signup function works",formData);
    await fetch('http://localhost:4000/signup',{
      method:'POST',
        headers:{
          'Accept':'application/form-data',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>{responseData=data});
    if(responseData.success){
      window.localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors);
    }
  }
  return (
    <div className='loginsingup'>
        <div className='loginsingup-container'>
          <h1>{state}</h1>
          <div className='loginsingup-field'>
            {state ==="Sign-up"?<input  name='patientname' value={formData.patientname} onChange={changeHandler} type='text' placeholder='your name'/>:<></>}
            <input value={formData.email} onChange={changeHandler} type='email' name='email' placeholder='Email Address' />
            <input onChange={changeHandler} name='password' value={formData.password} type='password' placeholder='password'/>
          </div>
          <button onClick={()=>{state ==="Login"?login():signup()}}>Continue</button>
          {state==="Sign-up"?
          <p className='loginsingup-login'>Already have an account ?<span onClick={()=>{setState("Login")}}>Login here</span></p>:
          <p className='loginsingup-login'>Create An Account ?<span onClick={()=>{setState("Sign-up")}}>Click here</span></p>
          }
          <div className='loginsignup-agree'>
            <input type='checkbox' name='' id=''/>
            <p>By continue, i agree to the terms of use & policy</p>
          </div>
        </div> 
    </div>
  )
}

export default LoginSignup