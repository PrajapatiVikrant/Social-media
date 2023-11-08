import axios from "axios";
import React from "react";

import { useState } from "react";
import './Signup.css'
function Signup(){
  let [name,setname] = useState('');
  let [email,setemail] = useState('');
  let [discription,setdiscription] = useState('');
  let [password,setpassword] = useState('');
 async function signup(){
     let data = await axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/signup?name='+name+'&email='+email+'&password='+password+'&discription='+discription+'&visit='+email);
     if(data.data === 'success'){
      alert('Signup successfully');
     }
     
     setname('');
     setpassword('');
     setemail('');
     setdiscription('')
  }
   return (
    <center>
    <div className="Signuppage">
     <br />
   <input type="text" placeholder="user name" value={name}  onChange={(e)=>setname(e.target.value)} minLength="3"/><br /><br />
   <input type="email" placeholder="user email" value={email}  onChange={(e)=>setemail(e.target.value)}/><br /><br />
   <input type="text" placeholder="Write about yourself" value={discription}  onChange={(e)=>setdiscription(e.target.value)}/><br /><br />
   <input type="password" placeholder="user password" value={password} onChange={(e)=>setpassword(e.target.value)} minLength="6"/><br /><br />
   <button className="Signupbtn" onClick={signup}>Signup</button>
  
   </div>
       </center>
   )
}
export default Signup;