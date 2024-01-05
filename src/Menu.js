
import './App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Menu(){
  const [inputvalue,setinputvalue] = useState('');
  const navigate = useNavigate();
async function handlekeydown(e){
   if(e.key === 'Enter'){
    await axios.post('https://black-chef-tktuc.pwskills.app:4000/Socialmedia/visit?email='+localStorage.getItem('email')+'&visit='+inputvalue)
    navigate("/search")
   }
 }
  return (
    <>
    <nav>
      <div className='logo'>SocialMedia</div>
        <div className='searchinput1'><input type="text" value={inputvalue} onChange={(e)=>setinputvalue(e.target.value)} onKeyDown = {handlekeydown} placeholder='Search'/></div>
        <div className='navlist'>
         <li><Link className='link' to="/home"><i className="fa-solid fa-house"></i><div className='navitem'>Home</div></Link></li>
         <li><Link className='link' to="/mynetwork"><i className="fa-regular fa-address-book"></i><div className='navitem'>Mynetwork</div></Link></li>
         <li><Link className='link' to='/post'><i className="fa-solid fa-cloud-arrow-up"></i><div className='navitem'>Post</div></Link></li>
         <li><Link className='link' to='/message'><i className="fa-regular fa-comment"></i><div className='navitem'>Message</div></Link></li>
         <li><Link className='link' to='/me'><i className="fa-solid fa-circle"></i><div className='navitem'>myprofile</div></Link></li>
         <li><Link className='link' to = '/loginSignup'><i className="fa-solid fa-user-plus"></i><div className='
         navitem'>signup/login</div> </Link></li>
        </div>
        
    </nav>

    <nav>
        <div className='navlist1'>
         <li><Link className='link' to="/home"><i className="fa-solid fa-house"></i><div className='navitem'>Home</div></Link></li>
         <li><Link className='link' to="/mynetwork"><i className="fa-regular fa-address-book"></i><div className='navitem'>Mynetwork</div></Link></li>
         <li><Link className='link' to='/post'><i className="fa-solid fa-cloud-arrow-up"></i><div className='navitem'>Post</div></Link></li>
         <li><Link className='link' to='/message'><i className="fa-regular fa-comment"></i><div className='navitem'>Message</div></Link></li>
         <li><Link className='link' to='/me'><i className="fa-solid fa-circle"></i><div className='navitem'>myprofile</div></Link></li>
         <li><Link className='link' to = '/loginSignup'><i className="fa-solid fa-user-plus"></i><div className='
         navitem'>signup/login</div> </Link></li>
         </div>
    </nav>
    </>
  )
}

export default Menu;
