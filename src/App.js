
import './App.css';
import { Route,Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup'
import Home from './Home'
import Post from './Post'
import Menu from './Menu'
import Mynetwork from './Mynetwork'
import Message from './Message'
import Me from './Me';
import OtherProfile from './Otherprofile'
function App(){
  return (
    <>
    
    <Menu/>
   <Routes>
    <Route path='/' Component={LoginSignup}/>
    <Route path='/loginSignup' Component={LoginSignup}/>
   <Route path='/home' Component={Home}/>
    <Route path='/post' Component={Post}/>
    <Route path='/mynetwork' Component={Mynetwork}/>
    <Route path='/message' Component={Message}/>
    <Route path='/me' Component={Me}/>
    <Route path='/search' Component={OtherProfile}/>

    
   </Routes>
    
    </>
  )
}

export default App;
