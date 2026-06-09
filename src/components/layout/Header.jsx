import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
function Header() {
    const jeetu= useNavigate()
  return (
    <>
      <div className="flex h-13 justify-between px-4 my-3">
        <img src={logo} alt="logo" />
        <nav className="text-center justify-center items-center flex">
          <li className="flex gap-14 ">
            <a href="/">HOME</a>
            <a href="/About">ABOUT</a>
            <a href="/Shops">SHOPS</a>
            <a href="/Contact">CONTACT</a>
            <a href="/Blog">BLOG</a>
          </li>
        </nav>
         <button onClick={() => jeetu("/login")}
  className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-full "
>
  Login
</button>

      </div>
      <hr className="px-67"/>
    </>
  );
}
export default Header;

