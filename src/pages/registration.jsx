import React, { useState } from "react";
import {
  Search,
  Settings,
  ChevronDown,
  X,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Calendar,
  Home,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Ban,
  ClipboardList,
  MapPin,
  Check,
  UserCheck,
  ShieldAlert, // Menambahkan ikon yang sebelumnya terlewat
} from "lucide-react";

// --- DATA DUMMY ---
const INITIAL_REGISTRATIONS = [
  {
    id: "REG-2024-001",
    name: "Budi Santoso",
    email: "budi.s@berkahfarm.com",
    type: "Owner",
    date: "2024-02-02",
    status: "Menunggu",
    phone: "0812-3456-7890",
    address: "Blitar, Jawa Timur",
    farms: [
      { name: "Kandang A (Starter)", location: "Blitar", capacity: 5000 },
      { name: "Kandang B (Finisher)", location: "Kediri", capacity: 3500 },
    ],
    plannedDailyInput:
      "Input pakan harian, suhu, dan angka kematian pagi/sore.",
  },
  {
    id: "REG-2024-002",
    name: "Agus Pratama",
    email: "agus.p@gmail.com",
    type: "Owner",
    date: "2024-02-02",
    status: "Menunggu",
    phone: "0813-9988-7766",
    address: "Sleman, Yogyakarta",
    farms: [{ name: "Farm Utama", location: "Sleman", capacity: 10000 }],
    plannedDailyInput: "Pencatatan FCR mingguan dan stok gudang.",
  },
  {
    id: "REG-2024-003",
    name: "Siti Rahma",
    email: "siti.rahma@vet.id",
    type: "Member",
    date: "2024-02-01",
    status: "Diterima",
    phone: "0856-7788-9900",
    address: "Jakarta Selatan",
    farms: [],
    plannedDailyInput: "Akses edukasi dan forum diskusi.",
  },
  {
    id: "REG-2024-004",
    name: "Rahmat Hidayat",
    email: "rahmat.h@poultry.id",
    type: "Owner",
    date: "2024-01-30",
    status: "Ditolak",
    phone: "0811-2233-4455",
    address: "Lampung Tengah",
    farms: [{ name: "Rahmat Farm", location: "Lampung", capacity: 2000 }],
    plannedDailyInput: "Input data populasi.",
  },
];

const Registrations = () => {
  // --- States ---
  const [registrations, setRegistrations] = useState(INITIAL_REGISTRATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [registrationFlow, setRegistrationFlow] = useState("Manual"); // Manual | Otomatis
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // --- Filtering Logic ---
  const filteredData = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Semua" || reg.type === typeFilter;
    const matchesStatus =
      statusFilter === "Semua Status" || reg.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // --- UI Helpers ---
  const getStatusBadge = (status) => {
    switch (status) {
      case "Menunggu":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Diterima":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Ditolak":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800 text-left">
      {/* 1. Page Header & Global Configuration */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manajemen Pendaftar
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Review dan kelola alur pendaftaran akun pengguna baru.
          </p>
        </div>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold shadow-sm transition-all"
        >
          <Settings size={18} className="text-slate-400" />
          <span>Pengaturan Registrasi</span>
        </button>
      </div>

      {/* 2. Advanced Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* <div className="relative min-w-[160px]">
            <select
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-teal-500 pr-10"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option>Semua</option>
              <option>Owner</option>
              <option>Member</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
          </div> */}

          <div className="relative min-w-[160px]">
            <select
              className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-teal-500 pr-10"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Menunggu</option>
              <option>Diterima</option>
              <option>Ditolak</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {/* 3. Application Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Nama Pendaftar</th>
                {/* <th className="px-6 py-4">Tipe Akun</th> */}
                <th className="px-6 py-4">
                  Nomor <i className="fab fa-hand-point-up"></i>
                </th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((reg) => (
                <tr
                  key={reg.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-teal-600">
                        {reg.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {reg.name}
                        </p>
                        <p className="text-xs text-slate-400">{reg.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        reg.type === "Owner"
                          ? "bg-purple-50 text-purple-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {reg.type}
                    </span>
                  </td> */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      {reg.phone}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Calendar size={14} className="text-slate-300" />
                      {reg.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(reg.status)}`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedApplicant(reg)}
                      className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">
              Tidak ada data pendaftar.
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scale-in text-left">
            <div className="flex justify-between items-center mb-6 text-left">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Settings className="text-teal-500" size={24} /> Pengaturan
                Registrasi
              </h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4 text-left">
              <p className="text-sm text-slate-500">
                Pilih bagaimana sistem menangani pendaftaran Owner baru:
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => setRegistrationFlow("Manual")}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    registrationFlow === "Manual"
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${registrationFlow === "Manual" ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      <ShieldAlert size={20} />
                    </div>
                    <div className="text-left">
                      <p
                        className={`text-sm font-bold ${registrationFlow === "Manual" ? "text-teal-900" : "text-slate-700"}`}
                      >
                        Manual
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                        Persetujuan Superadmin
                      </p>
                    </div>
                  </div>
                  {registrationFlow === "Manual" && (
                    <CheckCircle size={20} className="text-teal-500" />
                  )}
                </button>

                <button
                  onClick={() => setRegistrationFlow("Otomatis")}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                    registrationFlow === "Otomatis"
                      ? "border-teal-500 bg-teal-50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${registrationFlow === "Otomatis" ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-400"}`}
                    >
                      <RefreshCw size={20} />
                    </div>
                    <div className="text-left">
                      <p
                        className={`text-sm font-bold ${registrationFlow === "Otomatis" ? "text-teal-900" : "text-slate-700"}`}
                      >
                        Otomatis
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                        Langsung Diterima
                      </p>
                    </div>
                  </div>
                  {registrationFlow === "Otomatis" && (
                    <CheckCircle size={20} className="text-teal-500" />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsOpen(false)}
              className="w-full mt-8 bg-slate-900 text-white py-3 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all"
            >
              Simpan Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* 4. Detail Pendaftar & Action Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in text-left">
            {/* Header Modal */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <UserCheck size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Profil Pendaftar
                </h3>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Konten Modal */}
            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
              {/* User Profile */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <User size={12} /> Nama Lengkap
                  </label>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedApplicant.name}
                  </p>
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} /> Kontak
                  </label>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedApplicant.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedApplicant.phone}
                  </p>
                </div>
                <div className="col-span-2 space-y-1 text-left">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} /> Alamat
                  </label>
                  <p className="text-sm text-slate-700">
                    {selectedApplicant.address}
                  </p>
                </div>
              </div>
              {/* Informasi Kandang (For Owners) */}
              {selectedApplicant.type === "Owner" &&
                selectedApplicant.farms.length > 0 && (
                  <div className="space-y-4 pt-6 border-t border-slate-100 text-left">
                    <h4 className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2">
                      <Home size={12} /> Informasi Kandang Terdaftar
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedApplicant.farms.map((farm, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                        >
                          <p className="text-sm font-bold text-slate-800">
                            {farm.name}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={10} /> {farm.location}
                          </p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              Jumlah ayam
                            </span>
                            <span className="text-xs font-bold text-teal-600">
                              {farm.capacity.toLocaleString()} Ekor
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              {/* <div className="space-y-3 pt-6 border-t border-slate-100 text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ClipboardList size={12} /> Simulasi Rencana Input Harian
                </h4>
                <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl italic text-sm text-teal-800 leading-relaxed shadow-inner">
                  "{selectedApplicant.plannedDailyInput}"
                </div>
              </div> */}
            </div>

            {/* Footer Modal (Contextual Action Buttons) */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              {selectedApplicant.status === "Menunggu" && (
                <>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="px-6 py-2.5 font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Terima Pendaftaran
                  </button>
                </>
              )}

              {selectedApplicant.status === "Diterima" && (
                <>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="px-6 py-2.5 font-bold text-slate-400 hover:text-slate-600 transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all flex items-center gap-2"
                  >
                    <Ban size={18} />
                    Suspend Akun
                  </button>
                </>
              )}

              {selectedApplicant.status === "Ditolak" && (
                <>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="px-6 py-2.5 font-bold text-slate-400 hover:text-slate-600 transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
                  >
                    <RefreshCw size={18} />
                    Review Ulang
                  </button>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="bg-red-100 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-200 transition-all flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Hapus Data
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registrations;
