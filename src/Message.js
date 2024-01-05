import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';
import './Mynetwork.css'
import './Message.css'
import Myimage from './Myimage';
const Message = ()=>{
    useEffect(()=>{
        getdata();
    })
    const [connections,setconnections] = useState([]);
    const [inputvalue,setinputvalue] = useState('');
    const [selectemail,setselectemail] = useState('Not selected')
    const [message,setmessage] = useState([]);
    
   
     async function getdata(){
        
          let data  =  await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/showconnection',{
        headers: {
            "mytoken":localStorage.getItem('token'),
          }
        })
        const data1 = await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getmessage/'+localStorage.getItem('email')+'/'+selectemail)
        console.log(data1)
        setconnections(data.data.connected)
        // setmessage(data1.data[0].message)
    }
    async function handlekeydown(e){
        if(e.key === 'Enter'){
        await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/sendmessage?from='+localStorage.getItem('email')+'&to='+selectemail+'&message='+inputvalue)

         const data1 = await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getmessage/'+localStorage.getItem('email')+'/'+selectemail)
         console.log(data1)
         setmessage(data1.data[0].message)
         setinputvalue('');
       
        }
      }
    async function getchat(email){
         setselectemail(email);
        document.getElementById("setconnectionmsg").style.display = "none";
        document.getElementById("msgctn").style.display = "block";
        const data = await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getmessage/'+localStorage.getItem('email')+'/'+email)
        console.log(data)
        setmessage(data.data[0].message)
    } 
      
      async function select(email){
        setselectemail(email);
        const data = await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getmessage/'+localStorage.getItem('email')+'/'+email)
        console.log(data)
        setmessage(data.data[0].message)
       
      }
       
    return (
    
     <div className="connectionctn">
        <div className="setconnection">
        {connections.map((elem,ind)=>{
                    return (
                        <a href="#writemessage">
                           <div className="reqctn" onClick={()=>select(elem.email)}>
                           <Myimage email = {elem.email}/>
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                        </a>
                    
                    )
                })}
        </div> 
            <div id="setconnectionmsg" className="setconnectionmsg">
        {connections.map((elem,ind)=>{
                    return (
                        <a href="#writemessage">
                           <div className="reqctn" onClick={()=>getchat(elem.email)}>
                           <Myimage email = {elem.email}/>
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                        </a>
                    
                    )
                })}
        </div>
        <div id="msgctn" >
            <div className="selectperson" id='writemessage'>{selectemail}</div>
         <div className="messagectn" id='messageroot'>
            {
               message.map((elem)=>{
                 let c = 'to';
                 console.log(elem.email)
                   if(elem.email === localStorage.getItem('email')){
                    c = 'from';
                    
                   }else{
                    c = 'to'
                   }
                
                    return (
                        <div className="usermessage">
                             <div className = {`${c}`}>
                           
                           <div className="msg"> {elem.message}</div>
                        </div>
                        </div>
                       
                    )
                
              
               
               })
            }
         </div>
         <input type="text" className="messageinput" id='writemessage'  value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)} onKeyDown = {handlekeydown}  placeholder='Write message here...' />
        </div> 
     </div>
     
    )
}
export default Message;
