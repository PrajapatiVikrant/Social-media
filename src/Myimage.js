import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
function Myimage(props){
    const [connetion,setconnectionimg] = useState('');
    useEffect(()=>{
     imageurl();
    })
   async function imageurl(){
        const data = await axios.get(`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/myimage/${props.email}`);
        setconnectionimg(data.data);
    } 
    return (
      <img className="homeimage" src={connetion} alt="myimage" />
    )
}
export default Myimage;