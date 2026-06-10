import React, { useState } from "react";
import Authform from "./Authform";
import { useNavigate } from "react-router-dom";

const Singup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const hendleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("path", formData);
      const resData = await res.json();
      if (resData.success === true) {
        localStorage.setItem("userdetails", resData.data);
        if (resData.userType == "admin") {
          navigate("/admin/deshboard");
        } else if (resData.userType == "vendor") {
          navigate("/vendor/dashboard");
        } else {
          navigate("/deshboard");
        }
      }
    } catch (err) {
      console.log("error : ", err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <Authform
            type="register"
            setFormData={setFormData}
            hendleSubmit={hendleSubmit}
          />
          <p>
            Do You Have Account{" "}
            <button onClick={() => jeetu("/login")} className="text-blue-300">
              Click Me!
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Singup;
