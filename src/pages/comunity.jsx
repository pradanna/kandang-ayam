import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  MoreVertical,
  Image,
  Send,
  CheckCircle2,
  MessageCircle,
  X,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  User,
  ShieldCheck,
  Tag,
  Search,
  Filter,
  RotateCcw,
  Calendar,
} from "lucide-react";

// --- DUMMY DATA ---
const INITIAL_POSTS = [
  {
    id: 1,
    author: "Budi Pratama",
    avatar: "BP",
    dateDisplay: "2 jam yang lalu",
    dateISO: "2024-02-02",
    category: "Kesehatan",
    title: "Ayam loyo dan tidak nafsu makan",
    content:
      "Pagi para master, ayam saya umur 3 minggu terlihat loyo dan tidak mau makan. Kotorannya agak encer putih. Ada saran obat atau penanganan awal?",
    status: "Active",
    label: "Sudah Dijawab Ahli",
    isOfficial: false,
    comments: [
      {
        id: 101,
        author: "Drh. Anwar",
        content:
          "Segera pisahkan (karantina) dan berikan asupan vitamin elektrolit.",
        isHidden: false,
      },
      {
        id: 102,
        author: "Gani S.",
        content: "Cek suhu kandang juga mas, mungkin kedinginan.",
        isHidden: false,
      },
    ],
  },
  {
    id: 2,
    author: "Admin Utama",
    avatar: "AU",
    dateDisplay: "5 jam yang lalu",
    dateISO: "2024-02-02",
    category: "Pengumuman",
    title: "Update Kebijakan Katalog Produk 2024",
    content:
      "Kami melakukan pembaruan pada syarat dan ketentuan penjualan di katalog. Pastikan semua produk memiliki foto asli dan deskripsi lengkap.",
    status: "Active",
    label: "Official Post",
    isOfficial: true,
    comments: [],
  },
  {
    id: 3,
    author: "Anonim123",
    avatar: "??",
    dateDisplay: "1 hari yang lalu",
    dateISO: "2024-02-01",
    category: "Jual Beli",
    title: "Jual DOC Murah Banget",
    content:
      "Ready stock ribuan DOC harga miring, langsung WA saja ke nomor 0812xxxxxxxx. Siapa cepat dia dapat!",
    status: "Hidden",
    label: "Spam Suspected",
    isOfficial: false,
    comments: [
      {
        id: 103,
        author: "Moderator",
        content: "Postingan disembunyikan karena indikasi spam.",
        isHidden: false,
      },
    ],
  },
];

const CATEGORIES = [
  "Semua",
  "Kesehatan",
  "Pakan",
  "Jual Beli",
  "Manajemen Kandang",
  "Pengumuman",
];

const Community = () => {
  // States
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isOfficialPostModalOpen, setIsOfficialPostModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [expandedPost, setExpandedPost] = useState(null);
  const [newCategory, setNewCategory] = React.useState("");

  // Search & Filter States
  const [quickSearch, setQuickSearch] = useState("");
  const [filters, setFilters] = useState({
    title: "",
    category: "Semua",
    author: "",
    date: "", // State baru untuk filter tanggal
  });

  // Actions
  const togglePostStatus = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, status: post.status === "Active" ? "Hidden" : "Active" }
          : post,
      ),
    );
  };

  const deletePost = (id) => {
    if (window.confirm("Hapus postingan ini secara permanen?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const toggleCommentVisibility = (postId, commentId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((c) =>
              c.id === commentId ? { ...c, isHidden: !c.isHidden } : c,
            ),
          };
        }
        return post;
      }),
    );
  };

  const resetFilters = () => {
    setFilters({ title: "", category: "Semua", author: "", date: "" });
    setQuickSearch("");
  };

  // Filter Logic
  const filteredPosts = posts.filter((post) => {
    const matchesQuickSearch =
      post.title.toLowerCase().includes(quickSearch.toLowerCase()) ||
      post.author.toLowerCase().includes(quickSearch.toLowerCase());
    const matchesTitle = post.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const matchesAuthor = post.author
      .toLowerCase()
      .includes(filters.author.toLowerCase());
    const matchesCategory =
      filters.category === "Semua" || post.category === filters.category;
    const matchesDate = !filters.date || post.dateISO === filters.date;

    return (
      matchesQuickSearch &&
      matchesTitle &&
      matchesAuthor &&
      matchesCategory &&
      matchesDate
    );
  });

  const isFilterActive =
    filters.title ||
    filters.author ||
    filters.category !== "Semua" ||
    filters.date;

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Moderasi Komunitas
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Pantau interaksi user, kelola konten bermasalah, dan posting
            pengumuman resmi.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-semibold transition-all shadow-sm"
          >
            <Tag size={18} />
            <span>Kategori</span>
          </button>
          <button
            onClick={() => setIsOfficialPostModalOpen(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-teal-600/20"
          >
            <Plus size={18} />
            <span>Buat Postingan Resmi</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Quick Search & Advanced Filter Button */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari judul atau pengirim..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-sm"
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all shadow-sm border ${
            isFilterActive
              ? "bg-teal-50 border-teal-200 text-teal-700"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Filter size={18} />
          <span>Filter Lanjut</span>
          {isFilterActive && (
            <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
          )}
        </button>
        {(quickSearch || isFilterActive) && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-sm font-medium transition-colors"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        )}
      </div>

      {/* 3. Community Post Feed */}
      <div className="max-w-4xl space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 ${
                post.status === "Hidden"
                  ? "opacity-75 bg-slate-50 border-slate-200"
                  : "border-slate-100 hover:shadow-md"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        post.isOfficial
                          ? "bg-teal-100 text-teal-600"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {post.author}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            post.label === "Sudah Dijawab Ahli"
                              ? "bg-teal-100 text-teal-700"
                              : post.label === "Official Post"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {post.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {post.dateDisplay} • {post.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {post.status === "Hidden" && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                        <EyeOff size={12} /> HIDDEN
                      </span>
                    )}
                    <div className="relative group">
                      <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 hidden group-hover:block z-20 overflow-hidden">
                        <button
                          onClick={() => togglePostStatus(post.id)}
                          className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          {post.status === "Active" ? (
                            <>
                              <EyeOff size={16} /> Sembunyikan
                            </>
                          ) : (
                            <>
                              <Eye size={16} /> Tampilkan
                            </>
                          )}
                        </button>
                        {post.isOfficial && (
                          <button className="w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-2">
                            <Edit3 size={16} /> Edit Post
                          </button>
                        )}
                        <button
                          onClick={() => deletePost(post.id)}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-50"
                        >
                          <Trash2 size={16} /> Hapus Permanen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-800 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <button
                    onClick={() =>
                      setExpandedPost(expandedPost === post.id ? null : post.id)
                    }
                    className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    <MessageCircle size={18} />
                    <span>{post.comments.length} Komentar</span>
                    {expandedPost === post.id ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              {expandedPost === post.id && (
                <div className="bg-slate-50/50 p-6 rounded-b-2xl border-t border-slate-100 space-y-4 animate-fade-in">
                  {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`flex gap-3 items-start ${comment.isHidden ? "opacity-50" : ""}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-400">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm relative">
                            <p className="text-xs font-bold text-slate-800 mb-1">
                              {comment.author}
                            </p>
                            <p className="text-sm text-slate-600">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mt-1 ml-2">
                            <button
                              onClick={() =>
                                toggleCommentVisibility(post.id, comment.id)
                              }
                              className="text-[10px] font-bold text-slate-400 hover:text-teal-600 uppercase tracking-wider"
                            >
                              {comment.isHidden ? "Tampilkan" : "Sembunyikan"}
                            </button>
                            <button className="text-[10px] font-bold text-slate-400 hover:text-red-600 uppercase tracking-wider">
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 text-center italic">
                      Belum ada komentar.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Postingan tidak ditemukan
            </h3>
            <p className="text-slate-500 mt-2">
              Coba sesuaikan kata kunci atau filter Anda.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-teal-600 font-bold hover:underline"
            >
              Reset Semua Filter
            </button>
          </div>
        )}
      </div>

      {/* --- MODALS --- */}

      {/* 4. Filter Modal Updated with Date Filter */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <Filter size={20} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Filter Postingan
                </h3>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Judul Postingan
                </label>
                <input
                  type="text"
                  placeholder="Filter judul..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  value={filters.title}
                  onChange={(e) =>
                    setFilters({ ...filters, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Kategori
                </label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Nama Pembuat Postingan
                </label>
                <input
                  type="text"
                  placeholder="Filter nama..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  value={filters.author}
                  onChange={(e) =>
                    setFilters({ ...filters, author: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Tanggal Postingan
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters({ ...filters, date: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between gap-3">
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2.5 font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
              >
                Terapkan Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Post Modal */}
      {isOfficialPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Buat Postingan Resmi
                </h3>
              </div>
              <button
                onClick={() => setIsOfficialPostModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Kategori
                </label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Judul Postingan
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Isi Konten
                </label>
                <textarea
                  rows="6"
                  placeholder="Tulis pengumuman resmi di sini..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                ></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Lampiran Gambar (Max 5)
                </label>
                <div className="flex items-center justify-center w-full h-24 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all text-slate-400">
                  <div className="flex flex-col items-center">
                    <Image size={24} />
                    <span className="text-xs mt-1">
                      Klik untuk upload gambar
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsOfficialPostModalOpen(false)}
                className="px-6 py-2.5 font-bold text-slate-500 hover:text-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setIsOfficialPostModalOpen(false)}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
              >
                <Send size={18} />
                <span>Publikasikan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scale-in">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Tag size={20} className="text-teal-500" /> Manajemen Kategori
            </h3>

            {/* --- INPUT TAMBAH KATEGORI BARU (UPDATE DISINI) --- */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nama kategori baru..."
                  className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
              <button
                onClick={() => {
                  // Logika tambah kategori disini
                  console.log("Tambah:", newCategory);
                  setNewCategory("");
                }}
                className="px-4 py-2.5 bg-teal-500 text-white rounded-xl font-bold hover:bg-teal-600 shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                <span className="text-sm">Tambah</span>
              </button>
            </div>
            {/* ------------------------------------------------ */}

            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Daftar Kategori
              </p>
              {CATEGORIES.filter((c) => c !== "Semua").map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {c}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit3 size={14} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
