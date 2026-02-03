"use client";

import React from "react";
import {
  X,
  Package,
  Tag,
  Store,
  MessageCircle,
  TrendingUp,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  // Format Rupiah
  const formatRp = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* --- HEADER --- */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-teal-200">
                {product.category}
              </span>
              {product.isSponsor && (
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-amber-200">
                  Sponsor
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-tight w-full pr-8">
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-red-500 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- BODY (SCROLLABLE) --- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* SECTION 1: STATISTIK PERFORMA (HIGHLIGHT) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium uppercase tracking-wide">
                  Total Klik WA
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {product.stats.waClicks}
                </p>
                <p className="text-[10px] text-slate-500">Potensi pembeli</p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs text-blue-700 font-medium uppercase tracking-wide">
                  Dilihat
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {product.stats.views}
                </p>
                <p className="text-[10px] text-slate-500">Total impresi</p>
              </div>
            </div>
          </div>

          {/* SECTION 2: INFORMASI PRODUK UTAMA */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Placeholder */}
            <div className="w-full md:w-1/3 aspect-square bg-slate-100 rounded-xl flex items-center justify-center text-slate-300 border border-slate-200 shrink-0">
              {/* Jika ada image asli, ganti div ini dengan <img src={product.image} ... /> */}
              <Package size={48} />
            </div>

            {/* Detail Text */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase block mb-1">
                  Harga Satuan
                </label>
                <p className="text-2xl font-bold text-teal-600">
                  {formatRp(product.price)}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase mb-2">
                  <FileText size={12} /> Deskripsi Produk
                </label>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {product.description}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 3: INFO TOKO / PENJUAL */}
          <div>
            <h4 className="text-xs text-slate-400 font-bold uppercase mb-3 border-b border-slate-100 pb-2">
              Informasi Penjual
            </h4>
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:border-teal-300 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold">
                  {product.store.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1">
                    {product.store.name}
                    {product.store.isVerified && (
                      <Store size={14} className="text-blue-500" />
                    )}
                  </h5>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {product.store.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Join {product.store.joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  Lihat Toko
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER --- */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-2">
          {/* Tombol Aksi Admin */}
          {/* <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
            Lihat di Aplikasi
          </button> */}
          <button
            onClick={onClose}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-sm font-medium shadow-lg shadow-teal-500/20 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
