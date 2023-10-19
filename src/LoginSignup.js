import React from "react";
import { useState } from "react";
import "./LoginSignup.css";
import  Signup from './Signup'
import  Login from './Login'


const Loginorsignup = () => {
  let [lcolor, setlcolor] = useState("white");
  let [lbackground, setlbackgroundcolor] = useState("blue");
  let [Scolor, setScolor] = useState("blue");
  let [component,setcomponent] = useState(()=>{
    return <Login/>
  });
  let [Sbackground, setSbackgroundcolor] = useState("white");
  const mystyle1 = { background: lbackground, color: lcolor };
  const mystyle2 = { background: Sbackground, color: Scolor };
  
  function login() {
    setlcolor("white");
    setlbackgroundcolor("blue");
    setScolor("blue");
    setSbackgroundcolor("white");
    setcomponent(()=>{
      return <Login/>
    })
  }
  function signup() {
    setlcolor("blue");
    setlbackgroundcolor("white");
    setScolor("white");
    setSbackgroundcolor("red");
    setcomponent(()=>{
      return <Signup/>
    })
  }
  return (
    <div className="body">
    <center>
      <div className="lsnav">
        
        <li className="lsitem lsnavitem1" onClick={login} style={mystyle1}>Login</li>
        <li className="lsitem lsnavitem2" onClick={signup} style={mystyle2}> Signup</li>
      </div>
    
    </center>
   {component}
    </div>
  );
};
export default Loginorsignup;
