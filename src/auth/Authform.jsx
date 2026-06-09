import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Authform = ({ type }) => {

  const jeetu = useNavigate()
  return (
    <>
      <form className="space-y-5">
        {type === "register" && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Contact
              </label>
              <input
                type="number"
                placeholder="Enter your Mobile NO"
                className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
              />
            </div>
            </>
        )}
        <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
              />
            </div>
          

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl"
          onClick={()=>jeetu("/")}
        >
          {type === "register" ? "register" : "Login"}
        </button>
      </form>
    </>
  );
};

export default Authform;
