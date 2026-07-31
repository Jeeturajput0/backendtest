import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navber";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="admin-shell min-h-screen bg-[#F8FAFC]"><aside className="fixed inset-y-0 left-0 z-50 hidden w-[280px] overflow-y-auto border-r border-slate-200 bg-slate-950 lg:block"><Sidebar/></aside><AnimatePresence>{mobileOpen && <><motion.button initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setMobileOpen(false)} className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm lg:hidden" aria-label="Close menu"/><motion.aside initial={{x:-300}} animate={{x:0}} exit={{x:-300}} transition={{type:"spring",damping:28,stiffness:300}} className="fixed inset-y-0 left-0 z-[60] w-[280px] overflow-y-auto bg-slate-950 shadow-2xl lg:hidden"><button onClick={() => setMobileOpen(false)} className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={19}/></button><Sidebar onNavigate={() => setMobileOpen(false)}/></motion.aside></>}</AnimatePresence><div className="min-w-0 lg:ml-[280px]"><Navbar onMenuClick={() => setMobileOpen(true)}/><main className="min-h-[calc(100vh-76px)] p-4 sm:p-6 lg:p-8"><Outlet/></main><footer className="border-t border-slate-200 px-6 py-5 text-xs font-medium text-slate-400 lg:px-8">© 2026 ShopEase Admin · Built for better operations.</footer></div></div>;
};
export default AdminLayout;
