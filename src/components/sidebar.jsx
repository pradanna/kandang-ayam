import React from "react";
import { NavLink } from "react-router-dom"; // Hapus BrowserRouter dari import
import {
  Home,
  UserPlus,
  Briefcase,
  MessageSquare,
  ShoppingBag,
  ShieldAlert,
  Award,
  Users,
  FileText,
  LogOut,
  Crown,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Manajemen Pendaftar", path: "/registrations", icon: UserPlus },
    { name: "Manajemen Owner", path: "/owner", icon: Briefcase }, // Sesuaikan path dengan App.jsx Anda (/owner)
    { name: "Moderasi Komunitas", path: "/community", icon: MessageSquare },
    { name: "Katalog Produk", path: "/products", icon: ShoppingBag },
    { name: "Verifikasi & Laporan", path: "/reports", icon: ShieldAlert },
    { name: "Tenaga Ahli", path: "/experts", icon: Award },
    { name: "Manajemen Admin", path: "/admins", icon: Users },
    { name: "Data & Laporan", path: "/data", icon: FileText },
  ];

  return (
    // <BrowserRouter> DIHAPUS DARI SINI
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen  left-0 top-0 border-r border-slate-800 font-sans z-50">
      {/* 1. Header (Logo Area) */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Crown className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-none tracking-tight">
            AdminPanel
          </h1>
          <span className="text-[10px] text-teal-400 font-medium tracking-wider uppercase">
            Superadmin
          </span>
        </div>
      </div>

      {/* 2. Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-teal-600 text-white shadow-md"
                  : "hover:bg-slate-800 hover:text-white text-slate-400"
              }`
            }
          >
            <item.icon size={18} className="transition-colors" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* 3. Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors duration-200 group">
          <LogOut size={18} className="group-hover:stroke-red-400" />
          <span>Logout</span>
        </button>
      </div>
    </div>
    // </BrowserRouter> DIHAPUS DARI SINI
  );
};

export default Sidebar;
