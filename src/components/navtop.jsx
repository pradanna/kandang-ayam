import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  LogOut,
  Shield,
  Zap,
} from "lucide-react";

const Navtop = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Left Section: Search Bar */}
      <div className="flex items-center gap-4 text-slate-400">
        <Search size={20} />
        <input
          type="text"
          placeholder="Cari fitur, data, atau bantuan..."
          className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 placeholder-slate-400"
        />
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notifications")}
            className={`relative p-2 rounded-full transition-colors focus:outline-none ${
              activeDropdown === "notifications"
                ? "bg-slate-100 text-teal-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* Notification Menu */}
          {activeDropdown === "notifications" && (
            <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in z-50">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-semibold text-slate-800">Notifikasi</h3>
                <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                  Mark all read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Item 1 */}
                <div className="p-4 hover:bg-slate-50 transition-colors border-b border-gray-50 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User size={14} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">
                        Budi Santoso
                      </span>{" "}
                      mendaftar sebagai Member.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      2 menit yang lalu
                    </span>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="p-4 hover:bg-slate-50 transition-colors border-b border-gray-50 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Shield size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">
                      Toko{" "}
                      <span className="font-semibold text-slate-800">
                        'Ayam Jago'
                      </span>{" "}
                      meminta verifikasi.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      1 jam yang lalu
                    </span>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="p-4 hover:bg-slate-50 transition-colors flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <Zap size={14} className="text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-800">
                        Siti Aminah
                      </span>{" "}
                      upgrade ke akun PRO.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      5 jam yang lalu
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-slate-50 border-t border-gray-100 text-center">
                <button className="text-xs font-medium text-slate-500 hover:text-teal-600">
                  Lihat Semua Notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-[1px] bg-gray-200"></div>

        {/* Profile Dropdown Container */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("profile")}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors focus:outline-none ${
              activeDropdown === "profile" ? "bg-slate-100" : "hover:bg-gray-50"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <span className="text-sm font-medium text-slate-700">
              Admin Utama
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`}
            />
          </button>

          {/* Profile Menu */}
          {activeDropdown === "profile" && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden animate-fade-in z-50">
              <div className="p-1">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md transition-colors">
                  <User size={16} /> Detail Profil
                </button>
                <div className="h-[1px] bg-gray-100 my-1"></div>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors font-medium">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navtop;
