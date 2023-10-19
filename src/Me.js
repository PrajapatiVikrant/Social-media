import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Mypost from './Allpost'
import { useNavigate } from "react-router-dom";

import './Me.css'

const Me = ()=>{
 
  const [postlist,setpostlist] = useState();
  const navigate = useNavigate();
 
  let [userprofile,setuserprofile] = useState({name:'Not register',views:'0',followers:'0'})
    let [myimage,setmyimage] = useState('hello');
 
  useEffect(() => {
  getdata();
     
  });
    
 

  async function handlechange(e){
      const imgdata = new FormData();
      imgdata.append('userfile',e.target.files[0]);
    await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/setimage?email='+localStorage.getItem('email'),imgdata,{headers:{
        
        "Content-Type": "multipart/form-data",
       }})
       navigate("/home");
      
 
    }
  
    async function getdata(){
     
        let data  =  await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/myprofile',{
      headers: {
          "mytoken":localStorage.getItem('token'),
        },
      })
      
       data.data.post.map((elem,ind)=>{
        setpostlist(ind);
        return ind;
      })
      
       setuserprofile({name:data.data.name,email:data.data.email,views:data.data.views,followers:data.data.followers,post:data.data.post,discription:data.data.discription})
      
       setmyimage(()=>{
        return <img src={`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/myimage/${localStorage.getItem('email')}`} className='image' alt='myimage' />
      })
    }

    return (
             <div className="profilebody">
            <center>
             <div className='profilectn'>
 
                    <div className='imgctn'>
                    {myimage}<br />
                    <a href="/me"> <input type="file" accept='.png,jpg,jpeg' onChange={handlechange} /></a>
                     
                   
      
                    </div>
            <div className="profilctninner">
                 <div className="pitem">Name</div>
                 <div className="pitem">{userprofile.name}</div>
                 <div className="pitem">Email</div>
                 <div className="pitem">{userprofile.email}</div>
                 <div className="pitem pitem1">Post</div>
                 <div className="pitem">{postlist+1}</div>
                 <div className="pitem">Followers</div>
                 <div className="pitem">{userprofile.followers}</div>
                 <div className="pitem">Views</div>
                 <div className="pitem">{userprofile.views}</div>
                 <div className="pitem">Discription</div>
                 <div className="pitem">{userprofile.discription}</div>
            </div>
            </div>
            <Mypost/>
            </center>
           

            
          
             
             
             
           
           
           
            
             </div>
               
           
    )
}
export default Me;
