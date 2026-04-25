import React from "react";
import { Button } from "../ui/button.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover.jsx"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { User_API_Endpoint } from "../../Utils/constant.js";
import axios from "../../utils/axios";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice.js";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

  const logoutHandler= async()=>{
try {
  const response = await axios.get(`${User_API_Endpoint}/logout`, 
     {
    withCredentials: true
  }
     );
    if(response.data.success){
      console.log(response.data.message);
      dispatch(logout());
     
      navigate("/", { replace: true });
      alert("Logged out successfully");
  };
} catch (error) {
  console.log(error.data.message);
  alert(error.data.message);
}

  }

  return (
    <div className="bg-white flex justify-between items-center 
      px-4 sm:px-8 md:px-16 py-4 shadow-md">

      {/* Logo */}
      <h1 className="text-xl sm:text-2xl font-bold">
        Job<span className="text-red-600">Portal</span>
      </h1>

      {/* Right Section */}
      <div className="hidden sm:flex gap-4 md:gap-6 items-center">
        
        {
          user && user.role === "recruiter"?  (
            <>
        <Link to="/admin/companies"><span className="font-medium cursor-pointer">companies</span></Link>
        <Link to="admin/job"><span className="font-medium cursor-pointer">Jobs</span></Link>
            </>
          ):(
            <>
        <Link to="/"><span className="font-medium cursor-pointer">Home</span></Link>
        <Link to="/job"><span className="font-medium cursor-pointer">Jobs</span></Link>
        

            </>
          )
        }
       
        {!user ? (
          <>
            <Link to="/login">
              <Button className="bg-purple-500">Login</Button>
            </Link>
            <Link to="/signUp">
              <Button>SignUp</Button>
            </Link>
          </>
        ) : (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profile?.profilePhoto} />
                <AvatarFallback>!found</AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="flex flex-col gap-4 items-center w-40">
              <Avatar className="cursor-pointer">
                <AvatarImage  src={user?.profile?.profilePhoto} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <Link to="/profile">
                <Button variant="link">View Profile</Button>
              </Link>

             
                <Button  onClick={logoutHandler} variant="link">Logout</Button>
              
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Hamburger Icon (Mobile Only) */}
      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger>
            <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
              <span className="block w-full h-[3px] bg-black"></span>
              <span className="block w-full h-[3px] bg-black"></span>
              <span className="block w-full h-[3px] bg-black"></span>
            </div>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col gap-4 w-48">
            <Link to="/"><span className="font-medium cursor-pointer">Home</span></Link>
            <Link to="/job"><span className="font-medium cursor-pointer">Jobs</span></Link>
            

            {!user ? (
              <>
                <Link to="/login"><Button className="bg-purple-500 w-full">Login</Button></Link>
                <Link to="/signUp"><Button className="w-full">SignUp</Button></Link>
              </>
            ) : (
              <>
                <Link to="/profile"><Button variant="link">View Profile</Button></Link>
               <Button   onClick={logoutHandler} variant="link">Logout</Button>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
