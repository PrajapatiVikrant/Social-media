import React from 'react'
import axios from 'axios'
import './Post.css'
import { useState } from 'react'
const Post = ()=>{

    const [discription,setdiscription] = useState();
    
    function handlechange(e){
      const imgdata = new FormData();
      imgdata.append('Post',e.target.files[0]);
       axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/userpost?discription='+discription+'&email='+localStorage.getItem('email'),imgdata,{headers:{
        "mytoken":localStorage.getItem('token'),
       "Content-Type": "multipart/form-data",
       }}).then(res=>{
            console.log(res.data);
           alert(res.data.message)
       
       })
     
 
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
