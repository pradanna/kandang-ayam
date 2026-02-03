"use client";

import React, { useState } from "react";
import {
  X,
  Utensils,
  Bird,
  Egg,
  Pill,
  TrendingUp,
  Calendar,
  MapPin,
} from "lucide-react";

const CoopDetailModal = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState("pakan");

  if (!isOpen || !data) return null;

  // Format Rupiah
  const formatRp = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  // Tab Configuration
  const tabs = [
    { id: "pakan", label: "Pakan", icon: Utensils },
    { id: "ayam", label: "Populasi", icon: Bird },
    { id: "telur", label: "Produksi Telur", icon: Egg },
    { id: "obat", label: "Medis & Obat", icon: Pill },
    { id: "penjualan", label: "Penjualan Telur", icon: TrendingUp },
  ];

  return (
    <div
      className="fixed inset-0  flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      style={{ zIndex: "100" }}
    >
      {/* Container Modal */}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* --- HEADER --- */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              {data.name}
              <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                Aktif
              </span>
            </h2>
            <div className="flex items-center gap-4 mt-1 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {data.location}
              </span>
              <span className="flex items-center gap-1">
                <Bird size={14} /> Populasi Awal: {data.initialPopulation}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- TABS NAVIGATION --- */}
        <div className="px-6 pt-4 border-b border-slate-200">
          <div className="flex gap-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENT AREA (SCROLLABLE) --- */}
        <div className="p-6 overflow-y-auto flex-1 bg-white custom-scrollbar">
          {/* TAB 1: PAKAN */}
          {activeTab === "pakan" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <SummaryCard
                  title="Total Konsumsi (Bulan Ini)"
                  value="4,250 kg"
                />
                <SummaryCard title="Rata-rata/Hari" value="141 kg" />
              </div>
              <TableWrapper>
                <thead className="bg-teal-50/50 text-teal-800">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Jenis Pakan</Th>
                    <Th>Total Berat</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.logs.pakan.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <Td>{item.date}</Td>
                      <Td>
                        <span className="font-medium text-slate-700">
                          {item.type}
                        </span>
                      </Td>
                      <Td className="font-bold text-slate-700">
                        {item.totalKg} kg
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            </div>
          )}

          {/* TAB 2: POPULASI AYAM */}
          {activeTab === "ayam" && (
            <div className="space-y-4">
              <TableWrapper>
                <thead className="bg-teal-50/50 text-teal-800">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Populasi Awal Hari</Th>
                    <Th>Mati (Deplesi)</Th>
                    <Th>Afkir</Th>
                    <Th>Sisa Akhir</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.logs.ayam.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <Td>{item.date}</Td>
                      <Td>{item.start}</Td>
                      <Td>
                        <span className="text-red-500 font-bold">
                          -{item.death}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-orange-500">-{item.cull}</span>
                      </Td>
                      <Td className="font-bold text-teal-600">{item.end}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            </div>
          )}

          {/* TAB 3: PRODUKSI TELUR */}
          {activeTab === "telur" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <SummaryCard title="Total Produksi" value="12,450 Butir" />
                <SummaryCard title="Persentase Bagus" value="96%" highlight />
              </div>
              <TableWrapper>
                <thead className="bg-teal-50/50 text-teal-800">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Bagus</Th>
                    <Th>Bucek/Retak</Th>
                    <Th>Putih/Pucat</Th>
                    <Th>Kampung/Kecil</Th>
                    <Th>Total (Butir)</Th>
                    <Th>Berat (Kg)</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.logs.telur.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <Td>{item.date}</Td>
                      <Td className="text-green-600 font-medium">
                        {item.bagus}
                      </Td>
                      <Td className="text-orange-500">{item.bucek}</Td>
                      <Td>{item.putih}</Td>
                      <Td>{item.kampung}</Td>
                      <Td className="font-bold">{item.total}</Td>
                      <Td>{item.totalKg} kg</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            </div>
          )}

          {/* TAB 4: OBAT & MEDIS */}
          {activeTab === "obat" && (
            <div className="space-y-4">
              <TableWrapper>
                <thead className="bg-teal-50/50 text-teal-800">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Jenis Obat/Vaksin</Th>
                    <Th>Biaya (Estimasi)</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.logs.obat.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <Td>{item.date}</Td>
                      <Td className="font-medium text-slate-700">
                        {item.name}
                      </Td>
                      <Td className="text-slate-600">{formatRp(item.cost)}</Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            </div>
          )}

          {/* TAB 5: PENJUALAN TELUR */}
          {activeTab === "penjualan" && (
            <div className="space-y-4">
              <TableWrapper>
                <thead className="bg-teal-50/50 text-teal-800">
                  <tr>
                    <Th>Tanggal</Th>
                    <Th>Tujuan/Pembeli</Th>
                    <Th>Jenis Telur</Th>
                    <Th>Berat (Kg)</Th>
                    <Th>Harga/Kg</Th>
                    <Th>Total Pendapatan</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.logs.penjualan.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <Td>{item.date}</Td>
                      <Td className="font-medium text-slate-700">
                        {item.buyer}
                      </Td>
                      <Td>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${item.type === "Bersih" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {item.type}
                        </span>
                      </Td>
                      <Td>{item.weight} kg</Td>
                      <Td>{formatRp(item.pricePerKg)}</Td>
                      <Td className="font-bold text-teal-600">
                        {formatRp(item.total)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </TableWrapper>
            </div>
          )}
        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 text-sm font-medium">
            Download Laporan (PDF)
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm font-medium shadow-lg shadow-teal-500/20"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components untuk Styling
const TableWrapper = ({ children }) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden">
    <table className="w-full text-sm text-left">{children}</table>
  </div>
);

const Th = ({ children }) => (
  <th className="px-4 py-3 font-semibold border-b border-slate-200 whitespace-nowrap">
    {children}
  </th>
);

const Td = ({ children, className = "" }) => (
  <td
    className={`px-4 py-3 text-slate-600 border-b border-slate-50 last:border-0 whitespace-nowrap ${className}`}
  >
    {children}
  </td>
);

const SummaryCard = ({ title, value, highlight }) => (
  <div
    className={`p-4 rounded-xl border ${highlight ? "bg-teal-50 border-teal-200" : "bg-white border-slate-200"}`}
  >
    <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider">
      {title}
    </p>
    <p
      className={`text-xl font-bold ${highlight ? "text-teal-700" : "text-slate-800"}`}
    >
      {value}
    </p>
  </div>
);

export default CoopDetailModal;
