import React, { useState } from "react";
import {
  ShoppingBag,
  Eye,
  EyeOff,
  Edit,
  Trash,
  Settings,
  BarChart,
  Phone,
  Plus,
  Search,
  X,
  Check,
  Zap,
  Image as ImageIcon,
  MessageCircle,
  TrendingUp,
  ChevronRight,
  FileText,
  User, // Menambahkan User yang sebelumnya terlewat
} from "lucide-react";

// --- DATA DUMMY ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Pakan Ayam Broiler Premium",
    category: "Pakan",
    owner: "Admin",
    phone: "-",
    clicks: 1250,
    isSponsor: true,
    isHidden: false,
    image: "P",
  },
  {
    id: 2,
    name: "Vitamin Unggas Cair 1L",
    category: "Obat & Vitamin",
    owner: "Budi Santoso",
    phone: "08123456789",
    clicks: 980,
    isSponsor: false,
    isHidden: false,
    image: "V",
  },
  {
    id: 3,
    name: "Wadah Pakan Otomatis K-5",
    category: "Peralatan",
    owner: "Toko Ternak Jaya",
    phone: "08198765432",
    clicks: 450,
    isSponsor: true,
    isHidden: false,
    image: "W",
  },
  {
    id: 4,
    name: "DOC Ayam Petelur Platinum",
    category: "Bibit",
    owner: "Admin",
    phone: "-",
    clicks: 2100,
    isSponsor: false,
    isHidden: false,
    image: "D",
  },
  {
    id: 5,
    name: "Vaksin ND-AI 500 Dosis",
    category: "Obat & Vitamin",
    owner: "Agus Pratama",
    phone: "08561122334",
    clicks: 320,
    isSponsor: false,
    isHidden: true,
    image: "V",
  },
  {
    id: 6,
    name: "Lampu Penghangat IR",
    category: "Peralatan",
    owner: "Siti Aminah",
    phone: "08130099887",
    clicks: 150,
    isSponsor: false,
    isHidden: false,
    image: "L",
  },
  {
    id: 7,
    name: "Pakan Starter Repacking",
    category: "Pakan",
    owner: "Rahmat H.",
    phone: "08776655443",
    clicks: 85,
    isSponsor: false,
    isHidden: false,
    image: "P",
  },
];

const CATEGORIES = ["Pakan", "Obat & Vitamin", "Peralatan", "Bibit"];

const Products = () => {
  // --- States ---
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [tcContent, setTcContent] = useState(
    "1. Semua produk harus berkaitan dengan peternakan.\n2. Foto produk dilarang mengandung unsur SARA.\n3. Penjual bertanggung jawab penuh atas keaslian produk.",
  );

  // Filter States
  const [filters, setFilters] = useState({
    name: "",
    user: "",
    category: "Semua",
    phone: "",
  });

  // --- Logika ---
  const popularProducts = [...products]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 5);

  const toggleStatus = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isHidden: !p.isHidden } : p)),
    );
  };

  const toggleSponsor = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, isSponsor: !p.isSponsor } : p,
      ),
    );
  };

  const deleteProduct = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesName = p.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());
    const matchesUser = p.owner
      .toLowerCase()
      .includes(filters.user.toLowerCase());
    const matchesPhone = p.phone.includes(filters.phone);
    const matchesCategory =
      filters.category === "Semua" || p.category === filters.category;
    return matchesName && matchesUser && matchesPhone && matchesCategory;
  });

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Header Statistik (Top 5 Populer) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="text-teal-500" size={24} />
            Produk Terpopuler (Klik WA)
          </h2>
          <button
            onClick={() => setShowStatsModal(true)}
            className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-lg transition-all"
          >
            Lihat Lebih Banyak <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {popularProducts.map((p, index) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 relative overflow-hidden group"
            >
              <div className="absolute -left-1 top-0 bottom-0 w-1 bg-teal-500" />
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                #{index + 1}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {p.name}
                </p>
                <div className="flex items-center gap-1 text-slate-400 mt-1">
                  <MessageCircle size={12} />
                  <span className="text-[10px] font-bold">
                    {p.clicks.toLocaleString()} Klik
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Bar Aksi Global */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 space-y-6 text-left">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Katalog Produk</h1>
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={() => setShowTCModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm"
            >
              <Settings size={18} /> Update T&C
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-xl font-bold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
            >
              <Plus size={18} /> Tambah Produk Admin
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari nama produk..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
          </div>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari nama user..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filters.user}
              onChange={(e) => setFilters({ ...filters, user: e.target.value })}
            />
          </div>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Cari no. telepon..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              value={filters.phone}
              onChange={(e) =>
                setFilters({ ...filters, phone: e.target.value })
              }
            />
          </div>
          <select
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none cursor-pointer"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="Semua">Semua Kategori</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Tabel Produk Utama */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Owner / Uploader</th>
                <th className="px-6 py-4 text-center">Status Sponsor</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-50 transition-colors ${p.isHidden ? "opacity-50" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                        {p.image}
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {p.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-semibold ${p.owner === "Admin" ? "text-teal-600" : "text-slate-800"}`}
                      >
                        {p.owner}
                      </span>
                      {p.phone !== "-" && (
                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone size={10} /> {p.phone}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {p.isSponsor ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-amber-50 text-amber-600 border border-amber-200">
                        <Zap size={12} fill="currentColor" /> Sponsored
                      </span>
                    ) : (
                      <span className="text-xs text-slate-300">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className={`p-2 rounded-lg transition-colors ${p.isHidden ? "text-slate-400 hover:bg-slate-200" : "text-teal-600 hover:bg-teal-50"}`}
                        title={p.isHidden ? "Tampilkan" : "Sembunyikan"}
                      >
                        {p.isHidden ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => toggleSponsor(p.id)}
                        className={`p-2 rounded-lg transition-colors ${p.isSponsor ? "text-amber-500 hover:bg-amber-50" : "text-slate-400 hover:bg-slate-200"}`}
                        title="Toggle Sponsor"
                      >
                        <Zap size={18} />
                      </button>
                      {p.owner === "Admin" && (
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
              <p>Produk tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MODAL --- */}

      {/* 1. Modal Tambah Produk */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in text-left">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                <Plus size={24} className="text-teal-500" /> Tambah Produk
                Internal
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Kategori
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan nama produk..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Deskripsi
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Detail deskripsi produk..."
                ></textarea>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Upload Foto (Maks 5)
                </label>
                <div className="flex gap-2">
                  <div className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-50 cursor-pointer">
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 font-bold text-slate-500"
              >
                Batal
              </button>
              <button className="bg-teal-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700">
                Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal T&C */}
      {showTCModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 animate-scale-in text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FileText size={24} className="text-teal-500" /> Katalog T&Cs
              </h3>
              <button
                onClick={() => setShowTCModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <textarea
              rows="10"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-teal-500 mb-6 font-sans leading-relaxed"
              value={tcContent}
              onChange={(e) => setTcContent(e.target.value)}
            ></textarea>
            <button
              onClick={() => setShowTCModal(false)}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700"
            >
              Update Syarat & Ketentuan
            </button>
          </div>
        </div>
      )}

      {/* 3. Modal Statistik Lengkap */}
      {showStatsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 animate-scale-in max-h-[80vh] flex flex-col text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BarChart size={24} className="text-teal-500" /> Ranking Klik
                Produk
              </h3>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {[...products]
                .sort((a, b) => b.clicks - a.clicks)
                .map((p, idx) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-400 w-6">
                        #{idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{p.owner}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-teal-600 font-bold">
                      <MessageCircle size={14} />
                      <span>{p.clicks.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
