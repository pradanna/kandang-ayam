import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  TrendingUp,
  Users,
  Home,
  MessageSquare,
  Calendar,
  MapPin,
  Filter,
  ChevronRight,
  PieChart,
  BarChart3,
  MousePointerClick,
  UserCheck,
  Activity,
  Award,
  AlertCircle,
  ShoppingBag,
  Share2,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// --- DUMMY DATA FOR EACH CONTEXT ---

const USER_DATA = [
  {
    name: "Budi Santoso",
    joinDate: "2024-01-15",
    status: "PRO",
    activityScore: 92,
  },
  {
    name: "Siti Rahma",
    joinDate: "2024-01-20",
    status: "FREE",
    activityScore: 45,
  },
  {
    name: "Agus Pratama",
    joinDate: "2024-01-22",
    status: "PRO",
    activityScore: 78,
  },
  {
    name: "Andi Wijaya",
    joinDate: "2024-01-25",
    status: "PRO",
    activityScore: 88,
  },
  {
    name: "Rina Maria",
    joinDate: "2024-01-28",
    status: "FREE",
    activityScore: 12,
  },
];

const COOP_DATA = [
  {
    farm: "Berkah Farm",
    location: "Blitar, Jatim",
    coops: 12,
    lastInput: "2024-02-02",
    compliance: "High",
  },
  {
    farm: "Siti Poultry",
    location: "Tasikmalaya, Jabar",
    coops: 4,
    lastInput: "2024-02-01",
    compliance: "Medium",
  },
  {
    farm: "Makmur Group",
    location: "Kendal, Jateng",
    coops: 45,
    lastInput: "2024-02-02",
    compliance: "High",
  },
  {
    farm: "Jaya Abadi",
    location: "Lampung",
    coops: 8,
    lastInput: "2024-01-30",
    compliance: "Low",
  },
];

const COMMUNITY_DATA = [
  {
    topic: "Penyakit Gumboro",
    category: "Kesehatan",
    engagement: 1240,
    expertResponse: "20m",
  },
  {
    topic: "Harga Jagung Pipil",
    category: "Pakan",
    engagement: 850,
    expertResponse: "1h",
  },
  {
    topic: "Kandang Closed House",
    category: "Manajemen",
    engagement: 2100,
    expertResponse: "45m",
  },
  {
    topic: "Vaksinasi Mandiri",
    category: "Kesehatan",
    engagement: 420,
    expertResponse: "15m",
  },
];

const MARKETPLACE_DATA = [
  {
    product: "Pakan Broiler A1",
    seller: "Admin Poultry",
    clicks: 1250,
    potential: "High",
  },
  {
    product: "Vitamin Booster",
    seller: "Toko Ternak Jaya",
    clicks: 840,
    potential: "Medium",
  },
  {
    product: "DOC Layer Super",
    seller: "Poultry Center",
    clicks: 2100,
    potential: "High",
  },
  {
    product: "Wadah Pakan Otomatis",
    seller: "Budi Farm",
    clicks: 320,
    potential: "Low",
  },
];

const DataReports = () => {
  const [activeTab, setActiveTab] = useState("pengguna"); // pengguna, kandang, komunitas, marketplace

  // UI Helper for Status Badges
  const renderStatus = (status) => {
    const styles = {
      PRO: "bg-teal-100 text-teal-700",
      FREE: "bg-slate-100 text-slate-600",
      High: "bg-green-100 text-green-700",
      Medium: "bg-amber-100 text-amber-700",
      Low: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${styles[status] || styles.FREE}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800 text-left">
      {/* 1. GLOBAL HEADER & TOOLS */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Pusat Data & Laporan
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Monitoring aktivitas platform dan ekstraksi lead bisnis secara
            mendalam.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Simulated Date Picker */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
            <Calendar size={18} className="text-slate-400" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">
                Rentang Tanggal
              </span>
              <span className="text-xs font-bold text-slate-700">
                01 Jan 2024 - 02 Feb 2024
              </span>
            </div>
          </div>
          {/* Global Export Dropdown */}
          <div className="relative group">
            {/* <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all">
              <Download size={18} />
              <span>Audit Platform</span>
              <ChevronDown size={16} />
            </button> */}
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 hidden group-hover:block z-20 overflow-hidden">
              <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <FileText size={14} className="text-red-500" /> Full Audit (PDF)
              </button>
              <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                <FileSpreadsheet size={14} className="text-emerald-500" />{" "}
                Database Dump (CSV)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTEXT TABS NAVIGATION */}
      <div className="flex gap-2 p-1 bg-slate-200/50 rounded-2xl w-fit mb-8 shadow-inner">
        {[
          { id: "pengguna", label: "Pengguna", icon: Users },
          { id: "kandang", label: "Kandang", icon: Home },
          { id: "komunitas", label: "Komunitas", icon: MessageSquare },
          {
            id: "marketplace",
            label: "Marketplace / WA",
            icon: MousePointerClick,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id
                ? "bg-white text-teal-600 shadow-md"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}
      <div className="space-y-8 animate-fade-in">
        {/* --- TAB PENGGUNA --- */}
        {activeTab === "pengguna" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Total Free vs Pro
                </p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-3xl font-bold text-slate-900">
                    1.240{" "}
                    <span className="text-sm font-medium text-slate-400">
                      / 420
                    </span>
                  </h3>
                  <div className="flex items-center text-emerald-500 text-xs font-bold">
                    <ArrowUpRight size={14} /> 12%
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden flex">
                  <div
                    className="bg-teal-500 h-full"
                    style={{ width: "75%" }}
                  ></div>
                  <div
                    className="bg-slate-300 h-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
                  <UserCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Growth Rate
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">
                    +45 User/Hari
                  </h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Ekspor Cepat
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors">
                      <FileSpreadsheet size={18} />
                    </button>
                    <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                      <FileText size={18} />
                    </button>
                  </div>
                </div>
                <Users size={32} className="text-slate-100" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h4 className="font-bold text-slate-800">
                  Daftar Aktivitas User Terkini
                </h4>
                <button className="text-xs font-bold text-teal-600 hover:underline">
                  Lihat Semua
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Nama User</th>
                    <th className="px-6 py-4">Tgl Bergabung</th>
                    <th className="px-6 py-4">Status Akun</th>
                    <th className="px-6 py-4">Activity Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {USER_DATA.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {u.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{u.joinDate}</td>
                      <td className="px-6 py-4">{renderStatus(u.status)}</td>
                      <td className="px-6 py-4 font-mono font-bold text-teal-600">
                        {u.activityScore}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- TAB KANDANG --- */}
        {activeTab === "kandang" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm col-span-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest">
                  Distribusi Wilayah
                </h4>
                <div className="space-y-3">
                  {[
                    { r: "Jawa Timur", p: 45 },
                    { r: "Jawa Barat", p: 30 },
                    { r: "Luar Jawa", p: 25 },
                  ].map((reg, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>{reg.r}</span>
                        <span>{reg.p}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full"
                          style={{ width: `${reg.p}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                <Activity className="text-teal-500 mb-2" size={24} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Kepatuhan Input
                </p>
                <h3 className="text-2xl font-bold text-slate-900">82%</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
                <button className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mb-2">
                  <FileSpreadsheet size={16} /> Analytics (XLS)
                </button>
                <button className="w-full py-3 bg-red-50 text-red-700 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                  <FileText size={16} /> Regional (PDF)
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Nama Farm</th>
                    <th className="px-6 py-4">Lokasi</th>
                    <th className="px-6 py-4">Jumlah Kandang</th>
                    <th className="px-6 py-4">Input Terakhir</th>
                    <th className="px-6 py-4">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {COOP_DATA.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {c.farm}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{c.location}</td>
                      <td className="px-6 py-4 font-bold">{c.coops} Unit</td>
                      <td className="px-6 py-4 text-slate-500">
                        {c.lastInput}
                      </td>
                      <td className="px-6 py-4">
                        {renderStatus(c.compliance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- TAB KOMUNITAS --- */}
        {activeTab === "komunitas" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Avg Expert SLA
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">32 Menit</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Flagged Content
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">12 Post</h3>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Export Community
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold flex items-center gap-2">
                      <FileSpreadsheet size={14} /> engagement.csv
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h4 className="font-bold">Topik Diskusi Terpopuler</h4>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Topik</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Engagement (Points)</th>
                    <th className="px-6 py-4">Expert Respon Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {COMMUNITY_DATA.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {t.topic}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded uppercase">
                          {t.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-purple-600">
                        {t.engagement.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {t.expertResponse}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* --- TAB MARKETPLACE / WA LEADS --- */}
        {activeTab === "marketplace" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden relative">
                <MousePointerClick
                  size={80}
                  className="absolute -right-4 -bottom-4 text-white/5"
                />
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                  Total WA Clicks
                </p>
                <h3 className="text-4xl font-bold text-white mt-4">
                  8.420{" "}
                  <span className="text-xs font-medium text-emerald-400">
                    +15%
                  </span>
                </h3>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Conversion Potential
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mt-2">
                  Rp 4.2M
                </h3>
                <p className="text-[10px] text-slate-400 italic">
                  *Estimasi berdasarkan rata-rata harga produk yang diklik.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center items-center">
                <Share2 className="text-indigo-500 mb-2" size={24} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Unique Lead Origin
                </p>
                <h3 className="text-xl font-bold text-slate-800">42 Wilayah</h3>
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex-1 bg-emerald-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all">
                  <FileSpreadsheet size={18} /> Export Leads (XLS)
                </button>
                <button className="flex-1 bg-red-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition-all">
                  <FileText size={18} /> Export Performance (PDF)
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h4 className="font-bold flex items-center gap-2">
                  <ShoppingBag size={18} className="text-teal-500" /> Performa
                  Klik Produk
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                  <TrendingUp size={12} /> Top 5 Products
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Nama Produk</th>
                    <th className="px-6 py-4">Penjual</th>
                    <th className="px-6 py-4">Jumlah Klik (WA)</th>
                    <th className="px-6 py-4">Potensi Konversi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {MARKETPLACE_DATA.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">
                        {m.product}
                      </td>
                      <td className="px-6 py-4 text-slate-500">{m.seller}</td>
                      <td className="px-6 py-4 font-mono font-bold text-teal-600">
                        {m.clicks.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{renderStatus(m.potential)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* FOOTER INSIGHTS */}
      {/* <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3 text-slate-400">
          <Info size={16} />
          <p className="text-xs italic">
            Data diperbarui setiap 15 menit secara otomatis dari database
            sistem.
          </p>
        </div>
        <button className="flex items-center gap-2 text-teal-600 font-bold text-sm hover:underline">
          Lihat Log Perubahan Sistem <ChevronRight size={16} />
        </button>
      </div> */}
    </div>
  );
};

export default DataReports;

const Info = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
