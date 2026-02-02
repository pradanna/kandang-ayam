import React, { useState } from "react";
import {
  Key,
  Edit,
  Trash2,
  Plus,
  Mail,
  ShieldCheck,
  Search,
  X,
  RefreshCw,
  Lock,
  Activity,
  MoreVertical,
  Shield,
  User,
  History,
  Check,
  UserRound, // Mengganti UserShield yang tidak tersedia
} from "lucide-react";

// --- DATA DUMMY ---
const CURRENT_LOGGED_IN_ID = 1; // ID Admin yang sedang login saat ini

const INITIAL_ADMINS = [
  {
    id: 1,
    name: "Admin Utama",
    email: "superadmin@poultry.id",
    role: "Superadmin",
    lastLogin: "2024-02-02 14:30",
    status: "Active",
    avatar: "AU",
  },
  {
    id: 2,
    name: "Siti Rahma",
    email: "siti.staff@poultry.id",
    role: "Staff Admin",
    lastLogin: "2024-02-01 09:15",
    status: "Active",
    avatar: "SR",
  },
  {
    id: 3,
    name: "Budi Kurniawan",
    email: "budi.mod@poultry.id",
    role: "Staff Admin",
    lastLogin: "2024-01-30 16:45",
    status: "Inactive",
    avatar: "BK",
  },
];

const ACTIVITY_LOGS = [
  {
    id: 1,
    admin: "Admin Utama",
    action: "Menyetujui pendaftaran Owner: Berkah Farm",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    admin: "Siti Rahma",
    action: "Menghapus produk komunitas: Pakan Ilegal",
    time: "5 jam yang lalu",
  },
  {
    id: 3,
    admin: "Admin Utama",
    action: "Mengubah status verifikasi Tenaga Ahli: Drh. Ahmad",
    time: "1 hari yang lalu",
  },
];

const PERMISSIONS = [
  "Manajemen Owner",
  "Moderasi Komunitas",
  "Katalog Produk",
  "Verifikasi & Laporan",
  "Tenaga Ahli",
];

const App = () => {
  // --- States ---
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [generatedPass, setGeneratedPass] = useState("");

  // --- Logika ---
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPass(pass);
  };

  const stats = {
    total: admins.length,
    super: admins.filter((a) => a.role === "Superadmin").length,
    staff: admins.filter((a) => a.role === "Staff Admin").length,
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Header Statistik Admin */}
      <div className="flex justify-between items-center mb-8 text-left text-left">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Admin</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Kelola akses panel kontrol dan batasi izin akses staf administrator.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedAdmin(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
        >
          <Plus size={18} />
          <span>Tambah Admin Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <UserRound size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total Admin
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.total} User
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Superadmin
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.super} Full Access
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Admin Staff
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.staff} Restricted
            </h3>
          </div>
        </div>
      </div>

      {/* 2. Tabel Admin Utama */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left mb-8">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama atau email admin..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">User Admin</th>
                <th className="px-6 py-4">Role / Izin</th>
                <th className="px-6 py-4">Aktivitas Terakhir</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 border border-white shadow-sm">
                        {admin.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {admin.name}{" "}
                          {admin.id === CURRENT_LOGGED_IN_ID && (
                            <span className="text-[10px] bg-slate-100 px-1.5 rounded ml-1 font-normal text-slate-400">
                              (Anda)
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-500">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${
                        admin.role === "Superadmin"
                          ? "bg-purple-100 text-purple-700 border-purple-200"
                          : "bg-blue-100 text-blue-700 border-blue-200"
                      }`}
                    >
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <History size={14} className="text-slate-300" />
                      {admin.lastLogin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${admin.status === "Active" ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-slate-300"}`}
                      ></div>
                      <span className="text-xs font-semibold text-slate-600">
                        {admin.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Edit Akun"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        disabled={admin.id === CURRENT_LOGGED_IN_ID}
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setIsDeleteConfirmOpen(true);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          admin.id === CURRENT_LOGGED_IN_ID
                            ? "text-slate-200 cursor-not-allowed"
                            : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title={
                          admin.id === CURRENT_LOGGED_IN_ID
                            ? "Tidak dapat menghapus diri sendiri"
                            : "Hapus Akun"
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bagian Pratinjau Log Aktivitas */}
      <div className="bg-slate-900 rounded-2xl p-6 text-left shadow-xl border border-slate-800 text-left">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Activity className="text-teal-400" size={20} />
            Log Aktivitas Admin
          </h3>
          <button className="text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors">
            Lihat Seluruh Log
          </button>
        </div>
        <div className="space-y-4">
          {ACTIVITY_LOGS.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <div className="p-2 bg-slate-700 text-teal-400 rounded-lg">
                <History size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300">
                  <span className="font-bold text-teal-400">{log.admin}</span>{" "}
                  {log.action}
                </p>
                <span className="text-[10px] text-slate-500 font-medium uppercase mt-1 block tracking-wider">
                  {log.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL --- */}

      {/* Modal Tambah/Edit Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <UserRound size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  {selectedAdmin ? "Edit Detail Admin" : "Daftarkan Admin Baru"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Siti Rahma"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    defaultValue={selectedAdmin?.name}
                  />
                </div>
                <div className="space-y-1 text-left text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      placeholder="email@admin.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                      defaultValue={selectedAdmin?.email}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Level Akses (Role)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAdmin?.role === "Superadmin" || !selectedAdmin ? "border-purple-500 bg-purple-50/30" : "border-slate-100 hover:border-slate-200"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-purple-700">
                        Superadmin
                      </span>
                      <ShieldCheck size={18} className="text-purple-600" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 text-left">
                      Akses penuh ke seluruh fitur dan pengaturan.
                    </p>
                  </label>
                  <label
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedAdmin?.role === "Staff Admin" ? "border-blue-500 bg-blue-50/30" : "border-slate-100 hover:border-slate-200"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-blue-700">
                        Staff Admin
                      </span>
                      <Shield size={18} className="text-blue-600" />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 text-left">
                      Akses terbatas sesuai izin yang ditentukan.
                    </p>
                  </label>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Pengaturan Keamanan
                </label>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-xs text-slate-500 mb-2">
                      Atur kata sandi baru untuk akun ini:
                    </p>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        placeholder="Klik Generate atau isi manual..."
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                        value={generatedPass}
                        onChange={(e) => setGeneratedPass(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={generatePassword}
                    className="self-end px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={14} /> Generate
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Izin Akses Spesifik (Khusus Staff)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {PERMISSIONS.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <div className="w-5 h-5 rounded border border-slate-300 bg-white flex items-center justify-center cursor-pointer">
                        <Check size={14} className="text-teal-600" />
                      </div>
                      <span className="text-xs font-medium text-slate-600">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 font-bold text-slate-400 hover:text-slate-600"
              >
                Batal
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all">
                {selectedAdmin ? "Perbarui Akun" : "Daftarkan Admin"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-center">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 animate-scale-in text-left text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Hapus Akun Admin?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed text-center">
              Anda akan menghapus akses{" "}
              <span className="font-bold text-slate-800">
                {selectedAdmin?.name}
              </span>
              . Tindakan ini tidak dapat dibatalkan dan akan tercatat di sistem
              audit.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all"
              >
                Ya, Hapus Akses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
