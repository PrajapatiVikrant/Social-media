import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './Post.css'
import { useState } from 'react'
const Post = ()=>{
    useEffect(()=>{
        getdata();
    },[])
    const [discription,setdiscription] = useState();
    async function getdata(){
        console.log(localStorage.getItem('token'))
          let data  =  await axios.get('https://socialmedia-orpin.vercel.app/Socialmedia/uploadpost',{
        headers: {
            "mytoken":localStorage.getItem('token'),
          }
        })
        console.log(data)
        
       
    }
    function handlechange(e){
      const imgdata = new FormData();
      imgdata.append('Post',e.target.files[0]);
       axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/userpost?discription='+discription+'&email='+localStorage.getItem('email'),imgdata,{headers:{
        "Content-Type": "multipart/form-data",
       }}).then(res=>{
         
        
         return 1;
       })
        alert("post uploaded")
 
    }
    return (
    <div className='postformBody'>
        <center>
          
        <input type="text" placeholder='What do you want to talk about?' onChange={(e)=>setdiscription(e.target.value)} className='postdiscription'/>
      <form onClick={()=>document.querySelector('.post-input').click()} className='postForm'>
      <i class="fa-solid fa-cloud-arrow-up"></i>
      <p className='uploadtext'>Upload Post</p>
      
        <input type="file" accept='.png,.jpg,.jpeg' onChange={handlechange} className='post-input' hidden />
      </form>
      </center>
    </div>
    )
}
export default Post;
