import React from "react";
import './Allpost.css'
function showlike(){
    async function like(ind,postname){
        if(document.getElementById(ind).style.color === 'red'){
          let Notlike  =  await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/decreaselike?email='+email+'&postname='+postname)
          document.getElementById(ind).style.color = 'black'
        }else{
          let like  =  await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/increaselike?email='+email+'&postname='+postname)
          document.getElementById(ind).style.color = 'red'
  
        }
        
      }
    return (
        <div className="likedislike">
        <p className='likeno'>{elem.like} <i className="fa-solid fa-thumbs-up" style={{color:likecolor}}  id={ind} onClick = {()=>{like(ind,elem.name)}}></i></p>
     
   
      
      </div>
    )
}
export default showlike;