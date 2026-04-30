import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <footer className="w-full h-[30vh] bg-white-600 text-white py-6 mt-10 border-t border-gray-300 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex gap-6 text-2xl">
          <a
            href="https://www.instagram.com/"
            className="hover:text-pink-400 transition text-gray-900"
          >
            <FaInstagram />
          </a>
          
         
          <a
            href="https://www.linkedin.com/in/madhav-kaushik-388a122b3/"
            className="hover:text-blue-500 transition  text-gray-900"
          >
            <FaLinkedin />
          </a>
         
          <a
            href="https://github.com/Madhav01-Tech/"
            className="hover:text-gray-400 transition  text-gray-900"
          >
            <FaGithub />
          </a>
        </div>

        <div className="text-center text-sm text-gray-900">
          <p className=" text-gray-900">
            © 2025 JobPortal. All rights reserved.
          </p>
          <p className="mt-1  text-gray-900">
            Built with ❤️ to give you the best experience.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-300 mt-2">
          <Link to="/about" className="text-gray-900 hover:text-gray-500">
            About me
          </Link>

         <Link to="/contact" className="text-gray-500 hover:text-gray-900">
  Contact
</Link>


          <Link to="/terms" className="text-gray-900 hover:text-gray-500">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
