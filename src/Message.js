import React from 'react'
import { useState, useEffect } from 'react';

import axios from 'axios';
import './Mynetwork.css'
import './Message.css'
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
        setconnections(data.data.connected)
        setmessage(data1.data[0].message)
    }
    async function handlekeydown(e){
        if(e.key === 'Enter'){
        await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/sendmessage?from='+localStorage.getItem('email')+'&to='+selectemail+'&message='+inputvalue)

         const data1 = await axios.get('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/getmessage/'+localStorage.getItem('email')+'/'+selectemail)
     
         setmessage(data1.data[0].message)
         setinputvalue('');
       
        }
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
                            <img className='homeimage' src={`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/myimage/${elem.email}`} alt="req" />
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                        </a>
                    
                    )
                })}
        </div> 
            <div className="setconnectionmsg">
        {connections.map((elem,ind)=>{
                    return (
                        <a href="#writemessage">
                           <div className="reqctn" onClick={()=>select(elem.email)}>
                            <img className='homeimage' src={`https://black-chef-tktuc.pwskills.app:4000/Socialmedia/myimage/${elem.email}`} alt="req" />
                            <p className='reqtext'>{elem.email}</p>
                        
                        </div>
                        </a>
                    
                    )
                })}
        </div>
        <div >
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
