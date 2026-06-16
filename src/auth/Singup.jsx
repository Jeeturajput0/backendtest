// import React, { useEffect, useState } from "react";
// import Authform from "./Authform";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const Singup = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     password: "",
//   });

//   const handlesubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (resizeBy.success == true) {
//         Swal.fire({
//           title: "SUCCESS",
//           text: "Your Are Register Successfully.",
//           icon: "success",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "ERROR",
//         text: error.message(),
//         icon: "error",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
//           <Authform
//             type="register"
//             setFormData={setFormData}
//             handlesubmit={handlesubmit}
//           />
//           <p>
//             Do You Have Account{" "}
//             <button onClick={() => navigate("/login")} className="text-blue-300">
//               Click Me!
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Singup;

import React, { useState } from "react";
import Authform from "./Authform";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/user/register",
        formData
      );

      localStorage.setItem(
        "userdetails",
        JSON.stringify(res.data)
      );

      Swal.fire({
        title: "SUCCESS",
        text: "Registered Successfully",
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "ERROR",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <Authform
          type="register"
          formData={formData}
          handleChange={handleChange}
          handlesubmit={handlesubmit}
        />
           <p> Do You Have Account
             <button onClick={() => navigate("/login")} className="text-blue-300">
               Click Me!
             </button>
           </p>
      </div>
   
    </div>
  );
};

export default Signup;