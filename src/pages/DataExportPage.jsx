"use client";

import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Users,
  Package,
  Home,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function DataExportPage() {
  const [selectedCategory, setSelectedCategory] = useState("users");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [fileFormat, setFileFormat] = useState("excel");
  const [isDownloading, setIsDownloading] = useState(false);

  // Data Kategori yang bisa di-download
  const exportCategories = [
    {
      id: "users",
      label: "Data Pengguna",
      desc: "Daftar Owner, Member & Investor",
      icon: Users,
      count: "1,250 Record",
    },
    {
      id: "products",
      label: "Katalog Produk",
      desc: "Data item, harga & stok toko",
      icon: Package,
      count: "450 Record",
    },
    {
      id: "farms",
      label: "Data Kandang",
      desc: "Lokasi, populasi & kapasitas",
      icon: Home,
      count: "89 Kandang",
    },
    {
      id: "community",
      label: "Postingan Komunitas",
      desc: "Diskusi, komentar & laporan",
      icon: MessageCircle,
      count: "3,200 Post",
    },
    {
      id: "leads",
      label: "Leads (Klik WA)",
      desc: "Statistik klik tombol beli",
      icon: checkIconWrapper(FileText),
      count: "5,100 Klik",
    }, // Custom icon logic wrapper below
  ];

  // Dummy Handler Download
  const handleDownload = () => {
    setIsDownloading(true);
    // Simulasi delay server
    setTimeout(() => {
      setIsDownloading(false);
      alert(
        `Berhasil mengunduh data ${selectedCategory.toUpperCase()} dalam format .${fileFormat === "excel" ? "xlsx" : "csv"}`,
      );
    }, 2000);
  };

  // Helper untuk icon wrapper agar tidak error
  function checkIconWrapper(Icon) {
    return Icon;
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-800">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Download className="text-teal-500" /> Pusat Export Data
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Unduh database lengkap untuk keperluan backup, analisis, atau laporan
          bulanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- KOLOM KIRI: PILIH KATEGORI --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs">
                1
              </span>
              Pilih Data Database
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exportCategories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 group ${
                    selectedCategory === item.id
                      ? "border-teal-500 bg-teal-50/30"
                      : "border-slate-100 bg-white hover:border-teal-200"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full ${selectedCategory === item.id ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-500"}`}
                  >
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-sm ${selectedCategory === item.id ? "text-teal-700" : "text-slate-700"}`}
                    >
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                      Est. {item.count}
                    </span>
                  </div>

                  {/* Checkmark Active */}
                  {selectedCategory === item.id && (
                    <div className="absolute top-3 right-3 text-teal-500">
                      <CheckCircle
                        size={18}
                        fill="currentColor"
                        className="text-white"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- TABEL RIWAYAT EXPORT (AUDIT LOG) --- */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Clock size={18} className="text-slate-400" />
              Riwayat Unduhan Terakhir
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Admin</th>
                    <th className="px-4 py-3">Kategori Data</th>
                    <th className="px-4 py-3">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">
                      03 Feb 2026, 10:00
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      Admin Utama
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">
                        Data Pengguna
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">.xlsx</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-600">
                      01 Feb 2026, 14:30
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">
                      Budi Santoso (Staff)
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-xs font-bold">
                        Katalog Produk
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">.csv</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: KONFIGURASI --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 sticky top-6">
            <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs">
                2
              </span>
              Konfigurasi Export
            </h3>

            {/* Format File */}
            <div className="mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">
                Format File
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFileFormat("excel")}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    fileFormat === "excel"
                      ? "border-green-500 bg-green-50 text-green-700 font-bold shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-500"
                  }`}
                >
                  <FileSpreadsheet size={18} /> Excel
                </button>
                <button
                  onClick={() => setFileFormat("csv")}
                  className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    fileFormat === "csv"
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-sm"
                      : "border-slate-200 hover:border-slate-300 text-slate-500"
                  }`}
                >
                  <FileText size={18} /> CSV
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-8">
              <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">
                Rentang Waktu Data
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
                <div className="text-center text-xs text-slate-400 font-bold">
                  SAMPAI DENGAN
                </div>
                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                <AlertCircle size={10} /> Kosongkan untuk mengunduh semua
                history.
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-teal-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                isDownloading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {isDownloading ? (
                <>Loading...</>
              ) : (
                <>
                  <Download size={20} />
                  Download Data
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 mt-4">
              Data sensitif dilindungi enkripsi. Jangan bagikan file ini ke
              pihak luar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
