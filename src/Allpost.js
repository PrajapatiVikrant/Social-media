import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Showlike from './Showpost'

import './Allpost.css'



const Mypost = ()=>{
 
  let [postarray,setpostarray] = useState([]);
  let [name,setname] = useState();
  let [email,setemail] = useState();
  let  [commentopen,setcommentopen] = useState(false)
  let [commentdata,setcommentdata] = useState([]);
  let [mycomment,setmycomment] = useState('')
  let [postclicked,setpostclicked] = useState('');
  useEffect(() => {
    getpost();
  });
   
  
   
   
  
  
    async function getpost(){
 
        let post  =  await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getpost',{
      headers: {
          "mytoken":localStorage.getItem('token'),
        },
      })
      setemail(post.data.email)
      setname(post.data.name)
       let tem = await post.data.post.map((elem,ind)=>{
       
        return elem
       })
       setpostarray(tem)
     
    
      
    
    }


 async function deletepost(email,postname){
  const data = await axios.delete(`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/deletepost?email=${email}&postname=${postname}`);
    alert(data.data);
    window.location.reload();
  }

 async function addcomment(){
  await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/addcomment?postemail='+email+'&postname='+postclicked+'&sender='+localStorage.getItem('email')+'&message='+mycomment)
  setmycomment('');
  let data1= await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/showcomment?postemail='+email+'&postname='+postclicked); 
      setcommentdata(data1.data) 
}  
    
async function Comment(postname){
  setpostclicked(postname);
  if(commentopen === false){
    document.getElementById('commentbox').style.display = "block";
    setcommentopen(true)
     
      let data= await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/showcomment?postemail='+email+'&postname='+postname); 
      setcommentdata(data.data)
    
   
    
  }else{
    
    document.getElementById('commentbox').style.display = 'none';
    setcommentopen(false)
  }
} 
  
    return (
      <>
      
      <div id='commentbox'>
           <div className='commentmessagebox' id='commentarea'>
           {commentdata.map((elem,ind)=>{
              
              return (
                <div className='commentdata'>
                  <div className='commentname'>{elem.sender}</div>
                  <div className='commentmessage'>{elem.message}</div>

                </div>
              )

           })}

           </div>
           <input type="text" className='commentinput' value={mycomment} onChange={(e)=>setmycomment(e.target.value)}/><button className='commentbtn' onClick={addcomment}>send</button>
           </div>
      
      
       
       {postarray.map((elem,ind)=>{
          
          
        return (
          
          <div className="postctn">
            <div className="name"><span>{name}</span><div className='deletepost' onClick={()=>deletepost(email,elem.name)}><i class="fa-solid fa-trash"></i></div></div>
            <div className='discription'>{elem.post}</div>
        <img className='post' src={`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/showpost/${elem.name}/${email}`} alt={elem.post} />
      
       
        <Showlike likeno = {elem.like} liked = {elem.liked} index = {ind} postemail = {email} name = {elem.name} />
        <input className='comment' type="submit" value={'comment'} onClick={()=>{Comment(elem.name)}} readOnly />
        </div>
       
        )
      })}
      
     
      </>
);
   
    

  
   
}
export default Mypost;
