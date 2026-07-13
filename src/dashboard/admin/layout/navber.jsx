// import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
// import { Link, NavLink } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navClass = ({ isActive }) =>
//     isActive
//       ? "text-blue-600 font-semibold"
//       : "text-gray-700 hover:text-blue-600";

//   return (
//     <header className="sticky top-0 z-50 bg-white shadow">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           PrimeHut
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden items-center gap-6 md:flex">
//           <NavLink to="/" className={navClass}>
//             Home
//           </NavLink>

//           <NavLink to="/shop" className={navClass}>
//             Shop
//           </NavLink>

//           <NavLink to="/about" className={navClass}>
//             About
//           </NavLink>

//           <NavLink to="/contact" className={navClass}>
//             Contact
//           </NavLink>
//         </nav>

//         {/* Right Icons */}
//         <div className="hidden items-center gap-5 md:flex">
//           <Link to="/cart">
//             <FaShoppingCart size={20} />
//           </Link>

//           <Link to="/profile">
//             <FaUser size={20} />
//           </Link>
//         </div>

//         {/* Mobile Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden"
//         >
//           <FaBars size={22} />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="border-t bg-white md:hidden">
//           <nav className="flex flex-col p-4 space-y-3">
//             <NavLink to="/" className={navClass}>
//               Home
//             </NavLink>

//             <NavLink to="/shop" className={navClass}>
//               Shop
//             </NavLink>

//             <NavLink to="/about" className={navClass}>
//               About
//             </NavLink>

//             <NavLink to="/contact" className={navClass}>
//               Contact
//             </NavLink>

//             <NavLink to="/cart" className={navClass}>
//               Cart
//             </NavLink>

//             <NavLink to="/profile" className={navClass}>
//               Profile
//             </NavLink>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;