import Home from './Home.jsx'
import React from 'react'
import LatestJob from './LatestJob.jsx'
import BottomNav from './BottomNav.jsx'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
 const HomepagesContainer = () => {

  const{user} = useSelector((store) => store.auth);
  const navigate = useNavigate();
 useEffect(() => {
   if(user && user.role==="recruiter"){
  navigate("/admin/companies");
   }
});
  
  return (
    <>
   <Home/>
    <LatestJob/>
    <BottomNav/>
    </>
  )
}


export {HomepagesContainer}