import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './Otherprofile.css'
import Showlike from './Showpost'
const Post = ()=>{
    useEffect(()=>{
        getdata();
    })
   
    let [email,setemail] = useState();
    const [profiledata,setprofiledata] = useState({visit:'processing'});
    const [postvalue,setpostvalue] = useState([]);
    let  [commentopen,setcommentopen] = useState(false)
    let [commentdata,setcommentdata] = useState([]);
    let [mycomment,setmycomment] = useState('')
    let [postclicked,setpostclicked] = useState('');
   
   
    async function getdata(){
        
          let data  =  await axios.get('https://socialmedia-vikrant.vercel.app/Socialmedia/showotherprofile',{
        headers: {
            "mytoken":localStorage.getItem('token'),
          }
        })

       let otherprofile = await axios.get('https://socialmedia-vikrant.vercel.app/Socialmedia/showvisitprofile/'+data.data.visit+'/'+localStorage.getItem('email'))
       setemail(data.data.visit)
        let tem = await otherprofile.data.post.map((elem,ind)=>{
        
         return elem
        })
       
        setpostvalue(tem)
        setprofiledata({name:otherprofile.data.name,discription:otherprofile.data.discription,followers:otherprofile.data.followers,connection:otherprofile.data.connection,email:otherprofile.data.email,friendres:otherprofile.data.connectionRes,url:otherprofile.data.url})
      
    
   
        
 
    }


    async function addcomment(){
       await axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/addcomment?postemail='+email+'&postname='+postclicked+'&sender='+localStorage.getItem('email')+'&message='+mycomment)
      setmycomment('');
      let data1= await axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/showcomment?postemail='+email+'&postname='+postclicked); 
          setcommentdata(data1.data) 
    }  
        
    async function Comment(postname){
      setpostclicked(postname);
      if(commentopen === false){
        document.getElementById('commentbox').style.display = "block";
        setcommentopen(true)
          console.log(email)
          let data= await axios.post('https://socialmedia-vikrant.vercel.app/Socialmedia/showcomment?postemail='+email+'&postname='+postname); 
          setcommentdata(data.data)
        
       
        
      }else{
        
        document.getElementById('commentbox').style.display = 'none';
        setcommentopen(false)
      }
    } 
  
   
    async function freindrequest(){
      let from = localStorage.getItem('email');
      let to = profiledata.email;
      const sendrequest = await axios.put('https://socialmedia-vikrant.vercel.app/Socialmedia/myrequest?from='+from+'&to='+to);
      if(sendrequest.data === 'connecting'){
        return sendrequest.data;
      }
    }
    return (
    <div className='Otheruser'>
        <center>
            
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

          <h1>{profiledata.email}</h1>
          <div className="bigproct">
            <img className='image' src={profiledata.url} alt="profileimage" />
          <center>
          <div className="profilectn">
         <div className="profileitem item1">{profiledata.name}</div>
         <div className="profileitem item2">
          <div className="connetion">Connection:{profiledata.connection}</div>
          <div className="followers">Follower:{profiledata.followers}</div>
         </div>
         <div className="profileitem item3">{profiledata.discription}</div>
         <div className="profileitem item4"><button className='btn'>Follow</button><button className='btn' onClick={freindrequest}>{profiledata.friendres}</button></div>
       
          </div>
          </center>
          </div>
          
         {postvalue.map((elem,ind)=>{
          
          return (
          
            <div className="postctn">
              <div className="name">{profiledata.name}</div>
              <div className='discription'>{elem.post}</div>
          <img className='post' src={elem.name} alt={elem.post} />
          <Showlike likeno = {elem.like} liked = {elem.liked} index = {ind} postemail = {profiledata.email} name = {elem.name} />
          <input className='comment' type="submit" value={'comment'} onClick={()=>{Comment(elem.name)}} readonly />
          </div>
         
          )
         })}
       
      </center>
    </div>
    )
}
export default Post;
