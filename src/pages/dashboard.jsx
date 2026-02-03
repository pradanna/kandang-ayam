import React from "react";
import {
  Users,
  Home,
  UserPlus,
  AlertCircle,
  ArrowRight,
  Clock,
  ShieldAlert,
  Store,
} from "lucide-react";

// --- DUMMY DATA ---

const METRICS = {
  totalusers: 5050,
  prousers: 850,
  freeusers: 4200,
  totalCoops: 12450,
  pendingRegistrations: 15,
  urgentActions: 8, // Combined reports + verifications
};

const PENDING_APPLICANTS = [
  { id: 1, name: "Budi Santoso", type: "user", date: "2 jam yang lalu" },
  {
    id: 2,
    name: "CV. Ternak Makmur",
    type: "user",
    date: "5 jam yang lalu",
  },
  {
    id: 3,
    name: "Drh. Siti Aminah",
    type: "Tenaga Ahli",
    date: "1 hari yang lalu",
  },
  { id: 4, name: "Toko Pakan Jaya", type: "Penjual", date: "1 hari yang lalu" },
];

const URGENT_REPORTS = [
  {
    id: 1,
    type: "Report Post",
    desc: "Spam iklan obat ilegal di forum",
    status: "Pending",
    icon: AlertCircle,
  },
  {
    id: 2,
    type: "Verifikasi Penjual",
    desc: "Verifikasi dokumen Toko Berkah",
    status: "Pending",
    icon: Store,
  },
  {
    id: 3,
    type: "Report User",
    desc: "Indikasi penipuan transaksi",
    status: "High Priority",
    icon: ShieldAlert,
  },
];

const Dashboard = () => {
  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Ringkasan aktivitas dan tugas penting hari ini.
        </p>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total user */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute right-4 top-4 p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:scale-110 transition-transform">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total User Aktif
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {METRICS.totalusers.toLocaleString()}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs mt-2">
            <span className="font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
              {METRICS.prousers} PRO
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">
              {METRICS.freeusers.toLocaleString()} FREE
            </span>
          </div>
        </div>

        {/* Card 2: Total Kandang */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute right-4 top-4 p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:scale-110 transition-transform">
            <Home size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Kandang Terdaftar
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {METRICS.totalCoops.toLocaleString()}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Data real-time dari seluruh user
          </p>
        </div>

        {/* Card 3: Pendaftar Menunggu */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 bg-amber-50/10 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute right-4 top-4 p-2 bg-amber-100 rounded-lg text-amber-600 group-hover:scale-110 transition-transform">
            <UserPlus size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Pendaftar Menunggu
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {METRICS.pendingRegistrations}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-2">
            <Clock size={12} />
            <span>Perlu persetujuan segera</span>
          </div>
        </div>

        {/* Card 4: Butuh Tindakan */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 bg-red-50/10 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute right-4 top-4 p-2 bg-red-100 rounded-lg text-red-600 group-hover:scale-110 transition-transform">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">
              Butuh Tindakan Admin
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {METRICS.urgentActions}
            </h3>
          </div>
          <p className="text-xs text-red-600 font-medium mt-2">
            Laporan & Verifikasi tertunda
          </p>
        </div>
      </div>

      {/* 3. Actionable Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Antrian Pendaftar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">
              Antrian Persetujuan Pendaftar
            </h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {PENDING_APPLICANTS.map((applicant) => (
              <div
                key={applicant.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800">
                    {applicant.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                      {applicant.type}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {applicant.date}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-medium rounded-lg transition-colors shadow-sm shadow-teal-500/20">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Laporan & Moderasi */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-slate-800">
              Laporan & Moderasi Mendesak
            </h3>
            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded-full">
              {URGENT_REPORTS.length} Baru
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {URGENT_REPORTS.map((item) => (
              <div
                key={item.id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      item.type.includes("Report")
                        ? "bg-red-50 text-red-500"
                        : "bg-amber-50 text-amber-500"
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      {item.type}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {item.desc}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-1 block">
                      Status: {item.status}
                    </span>
                  </div>
                </div>
                <button className="px-3 py-1.5 border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-medium rounded-lg transition-colors">
                  Proses
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
