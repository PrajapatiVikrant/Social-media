import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import Mypost from './Allpost'
import './Home.css'
const Home = ()=>{
    useEffect(()=>{
        getdata();
    })
    let [userprofile,setuserprofile] = useState({name:'Not register',views:'0',followers:'0'})
    let [myimage,setmyimage] = useState();
    let [friendreq,setfriendreq] = useState([]);
    let [friendinvite,setfriendinvite] = useState([]);
    async function getdata(){
   
      let data  =  await axios.get('https://socialmedia-orpin.vercel.app/Socialmedia',{
    headers: {
        "mytoken":localStorage.getItem('token'),
      },
    })
    
    setfriendreq(data.data.request);
    setfriendinvite(data.data.invited)
    setuserprofile({name:data.data.name,views:data.data.views,followers:data.data.followers})
    setmyimage(()=>{
        return <img className='homeimage' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${data.data.email}`} alt="profileimage" />
   })
}
async function accept(link){
    
  
   const updatedfriendreq = await friendreq.filter((elem,ind)=>{
        return elem !== link;
    });
    console.log(updatedfriendreq)
    const create = await axios.post(`https://socialmedia-orpin.vercel.app/Socialmedia/ceateconnection?link=${link}&from=${localStorage.getItem('email')}&freindreq=${updatedfriendreq}`)
    alert(create.data);
}

    return (
        <div className="body">
        <div className="homctn">
            <div className="home homectn1">
                <center>
                    {myimage}
               <br />
                <h1 className='username'>{userprofile.name}</h1>
                </center>
                <div className='viewfollower'>
                    <h2>Followers</h2>
                    <div className="myfollower">{userprofile.followers}</div>
                    <h2>Views</h2>
                    <div className="myviews">{userprofile.views}</div>
                </div>
                <div className="profilebtn"><center><a href="/me">View full profile</a> </center></div>
                

            </div>
            <div className="home homectn2">
           
             
             <Mypost/>
            
          
          
            </div>
            <div className="home homectn3">
         
            <div className="request">
                <div className="requestheading">Request</div>
                {friendreq.map((elem,ind)=>{
                    if(elem !== ''){
                        return (
                            <div className="reqctn">
                                <img className='homeimage' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${elem}`} alt="req" />
                                <p className='reqtext'>{elem}</p>
                                <button className="acceptbtn" onClick={()=>accept(elem)}>Accept</button>
                            </div>
                        )
                    }else{
                        return <h1>empty</h1>
                    }
                    
                   
                })}
               
            </div>
            <div className="invited">
                <div className="invitedheading">Invited</div>
                {friendinvite.map((elem,ind)=>{
                    if(elem !== ""){
                        return (
                            <div className="reqctn">
                                <img className='homeimage' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${elem}`} alt="req" />
                                <p className='reqtext'>{elem}</p>
                                
                            </div>
                        )
                    }else{
                        return '';
                    }
                   
                })}
               
                </div> 
             
            </div>
        </div>
        </div>
    )
}
export default Home;
