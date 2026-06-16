// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Authform = ({type ,handlesubmit}) => {
//   const jeetu = useNavigate();
//   return (
//     <>
//       <form className="space-y-5" onSubmit={handlesubmit}>
//         {type === "register" && (
//           <>
//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your name"
                
//                 className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">
//                 Contact
//               </label>
//               <input
//                 type="number"
//                 name="mobile"
                
//                 placeholder="Enter your Mobile NO"
//                 className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
//               />
//             </div>
//           </>
//         )}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
            
//             placeholder="Enter your email"
//             className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
            
//             placeholder="Enter your password"
//             className="w-full px-4 py-3 border rounded-xl outline-none border-gray-300 focus:border-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl"
//         >
//           {type === "register" ? "register" : "Login"}
//         </button>
//       </form>
//     </>
//   );
// };

// export default Authform;

import React from "react";

const Authform = ({
  type,
  handlesubmit,
  formData,
  handleChange,
}) => {
  return (
    <form className="space-y-5" onSubmit={handlesubmit}>
      {type === "register" && (
        <>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label>Contact</label>
            <input
              type="number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>
        </>
      )}

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="w-full px-4 py-3 border rounded-xl"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          className="w-full px-4 py-3 border rounded-xl"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-xl"
      >
        {type === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Authform;