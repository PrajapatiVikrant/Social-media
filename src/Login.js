import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './Login.css';

function Login(){
   let [email,setemail] = useState('');
   let [password,setpassword] = useState('');
   const navigate = useNavigate();
 
  async function login(){
      let data = await axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/login?email='+email+'&password='+password)
      console.log(data)
      if(data.data.message === "login successfully"){
         localStorage.setItem("token", data.data.signature)
         localStorage.setItem('email',email)
         console.log(`The value of Token is ${localStorage.getItem('token')}`)
         setpassword('');
         setemail('');
         toast.success('login successfully', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            navigate("/home");
      }else if(data.data === "Invalid detail"){


         toast.success('Invalid detail', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });


      }else if(data.data.message === "wrong password"){

         toast.success('Wrong password', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

      }else{
         alert('Site error')
      }
      
   }
   return (
    <center>
 <div className="loginpage">
  <br />
  <br />
<input type="text" value={email} placeholder="user email id" onChange={(e)=>setemail(e.target.value)} /><br /><br />
<input type="password" value={password} placeholder="user password" onChange={(e)=>setpassword(e.target.value)}/><br /><br />
<button className="loginbtn" onClick={login}>Login</button>
<ToastContainer />

</div>

    </center>
   
   )
}
export default Login;