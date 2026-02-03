import React, { useState } from "react";
import {
  ShieldCheck,
  AlertOctagon,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff, // Menambahkan ikon EyeOff yang sebelumnya terlewat
  Info,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Trash2,
  Lock,
  User,
  Store,
  ExternalLink,
  MessageSquare,
  Search,
  ChevronRight,
  X,
  ShoppingBag,
} from "lucide-react";

// --- DATA DUMMY ---

const VERIFICATION_REQUESTS = [
  {
    id: 1,
    user: "Budi Santoso",
    storeName: "Berkah Farm Sejahtera",
    date: "2024-02-01",
    status: "Pending",
    nib: "1234567890123",
    address: "Blitar, Jawa Timur",
    docs: ["KTP_Budi.jpg", "NIB_Berkah.pdf"],
  },
  {
    id: 2,
    user: "Siti Aminah",
    storeName: "Siti Poultry Shop",
    date: "2024-01-31",
    status: "Resolved",
    nib: "9876543210987",
    address: "Tasikmalaya, Jawa Barat",
    docs: ["KTP_Siti.jpg", "NIB_Poultry.pdf"],
  },
  {
    id: 3,
    user: "Joko Widjaja",
    storeName: "Joko Layer Farm",
    date: "2024-01-28",
    status: "Rejected",
    nib: "4567890123456",
    address: "Lampung Tengah",
    docs: ["KTP_Joko.jpg"],
  },
];

const ABUSE_REPORTS = [
  {
    id: 101,
    type: "Product",
    reporter: "Andi Wijaya",
    subject: "Pakan Ayam Kadaluarsa",
    reportedEntity: "Toko Makmur Jaya",
    reason: "Fraud/Penipuan",
    urgency: "High",
    status: "Pending",
    evidence:
      "Pakan yang dikirim sudah menggumpal dan berbau apek, berbeda dengan foto deskripsi.",
  },
  {
    id: 102,
    type: "User",
    reporter: "Ani Rahayu",
    subject: "Komentar Tidak Sopan",
    reportedEntity: "User99_Poultry",
    reason: "Ujaran Kebencian",
    urgency: "Low",
    status: "Resolved",
    evidence:
      "User melakukan provokasi dan kata-kata kasar di postingan forum kesehatan ayam.",
  },
  {
    id: 103,
    type: "Product",
    reporter: "Suryo",
    subject: "Harga Tidak Masuk Akal",
    reportedEntity: "Toko Sinar",
    reason: "Spam",
    urgency: "Low",
    status: "Pending",
    evidence:
      "Produk DOC dijual seharga Rp 1, terlihat hanya untuk menarik klik ke toko.",
  },
];

const Reports = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState("verification"); // 'verification' | 'reports'
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [resolutionNote, setResolutionNote] = useState("");

  // --- Helpers ---
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Resolved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
      case "Banned":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Judul Halaman */}
      <div className="mb-8 text-left">
        <h1 className="text-3xl font-bold text-slate-900">
          Verifikasi & Laporan
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Kelola verifikasi penjual resmi dan tangani laporan penyalahgunaan
          dari pengguna.
        </p>
      </div>

      {/* Navigasi Tab Ganda */}
      <div className="flex gap-1 bg-slate-200 p-1 rounded-xl w-fit mb-8 shadow-inner">
        <button
          onClick={() => setActiveTab("verification")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "verification"
              ? "bg-white text-teal-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <ShieldCheck size={18} /> Verifikasi Official Store
          <span className="ml-1 bg-teal-100 text-teal-700 text-[10px] px-1.5 py-0.5 rounded-full">
            {VERIFICATION_REQUESTS.filter((v) => v.status === "Pending").length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "reports"
              ? "bg-white text-teal-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <AlertOctagon size={18} /> Laporan Masalah
          <span className="ml-1 bg-red-100 text-red-700 text-[10px] px-1.5 py-0.5 rounded-full">
            {ABUSE_REPORTS.filter((r) => r.status === "Pending").length}
          </span>
        </button>
      </div>

      {/* Konten Utama */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left">
        {/* Tab 1: Verifikasi Penjual */}
        {activeTab === "verification" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Toko / user</th>
                  <th className="px-6 py-4">Tanggal Request</th>
                  <th className="px-6 py-4 text-center">Dokumen</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {VERIFICATION_REQUESTS.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center">
                          <Store size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {req.storeName}
                          </p>
                          <p className="text-xs text-slate-500">{req.user}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {req.date}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-slate-400 hover:text-teal-600 transition-colors">
                        <FileText size={18} className="mx-auto" />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(req.status)}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedVerification(req)}
                        className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Laporan Masalah */}
        {activeTab === "reports" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Tipe & Subjek</th>
                  <th className="px-6 py-4">Pelapor</th>
                  <th className="px-6 py-4">Alasan</th>
                  <th className="px-6 py-4 text-center">Urgency</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ABUSE_REPORTS.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            report.type === "Product"
                              ? "bg-amber-50 text-amber-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {report.type === "Product" ? (
                            <ShoppingBag size={18} />
                          ) : (
                            <User size={18} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {report.subject}
                          </p>
                          <p className="text-xs text-slate-500">
                            Target: {report.reportedEntity}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {report.reporter}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {report.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {report.urgency === "High" ? (
                        <span className="text-red-500 font-bold text-[10px] uppercase flex items-center justify-center gap-1 animate-pulse">
                          <AlertTriangle size={12} /> High
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider">
                          Low
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        Penanganan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- MODAL --- */}

      {/* Modal Verifikasi */}
      {selectedVerification && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in text-left">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Review Verifikasi Official Store
                </h3>
              </div>
              <button
                onClick={() => setSelectedVerification(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Informasi Toko
                  </label>
                  <p className="text-lg font-bold text-slate-800 mt-1">
                    {selectedVerification.storeName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedVerification.address}
                  </p>
                </div>
                {/* <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nomor Izin Bisnis (NIB)
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-mono font-bold text-slate-700">
                      {selectedVerification.nib}
                    </p>
                    <CheckCircle size={14} className="text-emerald-500" />
                  </div>
                </div> */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Dokumen Terlampir
                  </label>
                  <div className="mt-2 space-y-2">
                    {selectedVerification.docs.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs"
                      >
                        <span className="truncate max-w-[150px]">{doc}</span>
                        <ExternalLink
                          size={14}
                          className="text-teal-600 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                  <Info size={20} className="text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Pastikan NIB valid sesuai dengan yang didaftarkan sebelum
                    menyetujui.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedVerification(null)}
                className="px-6 py-2.5 font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                Tolak Verifikasi
              </button>
              <button
                onClick={() => setSelectedVerification(null)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
              >
                Setujui Jadi Verified Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Laporan Masalah */}
      {selectedReport && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                  <ShieldAlert size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Penanganan Laporan Masalah
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Pelapor
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {selectedReport.reporter}
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">
                    Entitas Dilaporkan
                  </p>
                  <p className="text-sm font-bold text-red-700">
                    {selectedReport.reportedEntity}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Bukti Laporan (Keterangan Pelapor)
                </label>
                <div className="mt-2 p-4 bg-slate-900 rounded-2xl text-slate-300 text-sm italic leading-relaxed shadow-inner">
                  "{selectedReport.evidence}"
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Pilih Tindakan Moderasi
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all flex flex-col items-center gap-2">
                    <MessageSquare size={16} /> Peringatan
                  </button>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-200 transition-all flex flex-col items-center gap-2">
                    <EyeOff size={16} /> Hide Produk
                  </button>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all flex flex-col items-center gap-2">
                    <Lock size={16} /> Blokir (3 Hari)
                  </button>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex flex-col items-center gap-2">
                    <Trash2 size={16} /> Hapus Akun
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Catatan Penyelesaian Admin
                </label>
                <textarea
                  rows="3"
                  className="w-full mt-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                  placeholder="Tulis alasan pengambilan tindakan ini untuk arsip internal..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-6 py-2.5 font-bold text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
              >
                Abaikan Laporan
              </button>
              <button
                onClick={() => setSelectedReport(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all"
              >
                Eksekusi Tindakan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
