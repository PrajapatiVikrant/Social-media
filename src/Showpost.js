import React, { useState } from "react";
import axios from 'axios'
import './Allpost.css'
function Showlike(props){
    const [currentlike,setcurrentlike] = useState(props.likeno)
    async function like(ind,postname){
        if(document.getElementById(ind).style.color === 'red'){
          let Notlike  =  await axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/decreaselike?postemail='+props.postemail+'&email='+localStorage.getItem('email')+'&postname='+postname)
          console.log(Notlike)
        
          document.getElementById(ind).style.color = 'black'
          setcurrentlike(()=>{
            return currentlike-1;
          })
         
        }else{
    let like  =  await axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/increaselike?postemail='+props.postemail+'&email='+localStorage.getItem('email')+'&postname='+postname)         
    console.log(like)
  
    document.getElementById(ind).style.color = 'red'
    setcurrentlike(()=>{
      return currentlike+1;
    })
        }
      
       }
    
   


    let my = props.liked.filter((e)=>{
      return e === localStorage.getItem('email');
     })
     if(my[0] !== localStorage.getItem('email')){
      
      return (
        <div className="likedislike">
        <p className='likeno'>{currentlike} <i className="fa-solid fa-thumbs-up"  id={props.index} onClick = {()=>{like(props.index,props.name,props.currentprofile)}} style = {{color:"black"}}></i></p>
       
      </div>
    )
     }else{
     
      return (
        <div className="likedislike">
        <p className='likeno'>{props.likeno} <i className="fa-solid fa-thumbs-up"  id={props.index} onClick = {()=>{like(props.index,props.name)}}  style = {{color:"red"}}></i></p>
        </div>
    )
     }
}
export default Showlike;