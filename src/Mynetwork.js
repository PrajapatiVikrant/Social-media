import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Showlike from './Showpost'
import './Mynetwork.css'
const Mynetwork = ()=>{
  const [connections,setconnections] = useState([]);
  const [profiledata,setprofiledata] = useState({visit:'processing'});
  const [postvalue,setpostvalue] = useState([]);
  const [email, setemail] = useState('');
  let  [commentopen,setcommentopen] = useState(false)
  let [commentdata,setcommentdata] = useState([]);
  let [mycomment,setmycomment] = useState('')
  let [postclicked,setpostclicked] = useState('');


    useEffect(()=>{
        getdata(); 
      
       
    })
   
  
     async function getdata(){
      
          let data  =  await axios.get('https://socialmedia-orpin.vercel.app/Socialmedia/showconnection',{
        headers: {
            "mytoken":localStorage.getItem('token'),
          }
        })
      
        setconnections(data.data.connected)
      
    }
    async function getprofile(link){
     
      document.querySelector('#showprofile').style.display = 'flex';
        setemail(link)
            let otherprofile = await axios.get('https://socialmedia-orpin.vercel.app/Socialmedia/showvisitprofile/'+link+'/'+localStorage.getItem('email'))
       
            let tem = await otherprofile.data.post.map((elem,ind)=>{
            
             return elem
            })
           
            setpostvalue(tem)
            setprofiledata({name:otherprofile.data.name,discription:otherprofile.data.discription,followers:otherprofile.data.followers,connection:otherprofile.data.connection,email:otherprofile.data.email,friendres:otherprofile.data.connectionRes})
         
      
       
       
    
    }



    async function getprofilesmall(link){
      document.getElementById('setconnectionsmall').style.display = 'none';
      document.querySelector('#showprofile').style.display = 'block';
      
      setemail(link)
          let otherprofile = await axios.get('https://socialmedia-orpin.vercel.app/Socialmedia/showvisitprofile/'+link+'/'+localStorage.getItem('email'))
     
          let tem = await otherprofile.data.post.map((elem,ind)=>{
          
           return elem
          })
         
          setpostvalue(tem)
          setprofiledata({name:otherprofile.data.name,discription:otherprofile.data.discription,followers:otherprofile.data.followers,connection:otherprofile.data.connection,email:otherprofile.data.email,friendres:otherprofile.data.connectionRes})
       
  }




    async function freindrequest(){
        let from = localStorage.getItem('email');
        let to = profiledata.email;
        const sendrequest = await axios.put('https://socialmedia-orpin.vercel.app/Socialmedia/myrequest?from='+from+'&to='+to);
        if(sendrequest.data === 'connecting'){
          return sendrequest.data;
        }
      }

      async function addcomment(){
        await axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/addcomment?postemail='+email+'&postname='+postclicked+'&sender='+localStorage.getItem('email')+'&message='+mycomment)
       setmycomment('');
       let data1= await axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/showcomment?postemail='+email+'&postname='+postclicked); 
           setcommentdata(data1.data) 
     }  

      async function Comment(postname){
        setpostclicked(postname);
        if(commentopen === false){
          document.getElementById('commentbox').style.display = "block";
          setcommentopen(true)
            console.log(email)
            let data= await axios.post('https://socialmedia-orpin.vercel.app/Socialmedia/showcomment?postemail='+email+'&postname='+postname); 
            setcommentdata(data.data)
          
         
          
        }else{
          
          document.getElementById('commentbox').style.display = 'none';
          setcommentopen(false)
        }
      } 


      
         
     
    
    return (
    <center>
     <div className="connectionctn">
        <div className="setconnectionnet">
        {connections.map((elem,ind)=>{
                    return (
                        
                        <div className="reqctn" onClick={()=>getprofile(elem.email)}>
                            <img className='homeimage' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${elem.email}`} alt="req" />
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                    )
                })}
        </div>



        <div  id='setconnectionsmall'>
        {connections.map((elem,ind)=>{
                    return (
                        
                        <div className="reqctn" onClick={()=>getprofilesmall(elem.email)}>
                            <img className='homeimage' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${elem.email}`} alt="req" />
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                    )
                })}
        </div>











        <div className='selectprofile'>
       
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

       
         
                <div className="showprofile" id="showprofile">
                <button className='connectionlist'>prev</button>
                <img className='image' src={`https://socialmedia-orpin.vercel.app/Socialmedia/myimage/${profiledata.email}`} alt="profileimage" />
              <div className="profilectn">
             <div className="profileitem item1">{profiledata.name}</div>
             <div className="profileitem item2">
              <div className="connetion">Connection:{profiledata.connection}</div>
              <div className="followers">Follower:{profiledata.followers}</div>
             </div>
             <div className="profileitem item3">{profiledata.discription}</div>
             <div className="profileitem item4"><button className='btn'>Follow</button><button className='btn' onClick={freindrequest}>{profiledata.friendres}</button></div>
           
              </div>
              </div>
              
             
           
        
          
         {postvalue.map((elem,ind)=>{
          return (
          
            <div className="postctn">
              <div className="name">{profiledata.name}</div>
              <div className='discription'>{elem.post}</div>
          <img className='post' src={`https://socialmedia-orpin.vercel.app/Socialmedia/showpost/${elem.name}/${profiledata.email}`} alt={elem.post} />
          <Showlike likeno = {elem.like} liked = {elem.liked} index = {ind} postemail = {profiledata.email} name = {elem.name}/>
          <input className='comment' type="submit" value={'comment'} onClick={()=>{Comment(elem.name)}} readonly />
          </div>
         
          )
         })}
       
      
    </div>
     </div>
                        </center>
     
    )
}
export default Mynetwork;
