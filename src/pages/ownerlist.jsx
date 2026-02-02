import React, { useState } from "react";
import {
  Users,
  Store,
  ShieldCheck,
  Award,
  Eye,
  Plus,
  Search,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  Package,
  UserCheck,
  CheckCircle,
  AlertCircle,
  UserPlus,
  FileText,
  BadgeCheck,
  Layers,
  Building2,
  Trash2,
  UserCog,
  Home,
  ShieldAlert,
  Fingerprint,
} from "lucide-react";

// --- DATA DUMMY ---
const INITIAL_OWNERS = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi.s@berkahfarm.com",
    phone: "0812-3456-7890",
    status: "PRO",
    isUserVerified: true, // Verifikasi Identitas (KTP)
    isOfficialStore: true, // Verifikasi Toko (NIB)
    isExpert: false, // Status Tenaga Ahli
    address: "Blitar, Jawa Timur",
    avatar: "BS",
    coops: [
      { name: "Kandang Starter A", capacity: 5000 },
      { name: "Kandang Finisher B", capacity: 3500 },
    ],
    products: [
      {
        id: 101,
        name: "Pakan Ayam Broiler Premium",
        price: "Rp 450.000",
        stock: 120,
      },
    ],
    investors: [{ name: "Mandiri Capital", type: "Institusi", since: "2023" }],
    members: ["Staff Lapangan 1"],
  },
  {
    id: 2,
    name: "Drh. Siti Aminah",
    email: "siti.aminah@vet.id",
    phone: "0856-7788-9900",
    status: "FREE",
    isUserVerified: true,
    isOfficialStore: false,
    isExpert: true,
    address: "Jakarta Selatan",
    avatar: "SA",
    coops: [{ name: "Unit Riset Mandiri", capacity: 500 }],
    products: [],
    investors: [],
    members: ["Asisten Riset A"],
  },
  {
    id: 3,
    name: "Agus Pratama",
    email: "agus.p@gmail.com",
    phone: "0813-9988-7766",
    status: "PRO",
    isUserVerified: false, // Belum Verif User
    isOfficialStore: false,
    isExpert: false,
    address: "Sleman, Yogyakarta",
    avatar: "AP",
    coops: [{ name: "Farm Utama Sleman", capacity: 10000 }],
    products: [
      {
        id: 103,
        name: "DOC Ayam Layer Super",
        price: "Rp 12.000",
        stock: 5000,
      },
    ],
    investors: [],
    members: [],
  },
];

const OwnerList = () => {
  // --- States ---
  const [owners, setOwners] = useState(INITIAL_OWNERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");

  // Modal States
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeVerificationModal, setActiveVerificationModal] = useState(null); // 'user', 'store', null
  const [detailTab, setDetailTab] = useState("profil");

  // --- Logic Filtering ---
  const filteredOwners = owners.filter((owner) => {
    const matchesSearch =
      owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchTerm.toLowerCase());

    if (roleFilter === "Semua") return matchesSearch;
    if (roleFilter === "Verifikasi User")
      return matchesSearch && owner.isUserVerified;
    if (roleFilter === "Official Store")
      return matchesSearch && owner.isOfficialStore;
    if (roleFilter === "Tenaga Ahli") return matchesSearch && owner.isExpert;

    return matchesSearch;
  });

  // --- Actions ---
  const handleVerifyUser = (id) => {
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isUserVerified: true } : o)),
    );
    setActiveVerificationModal(null);
    setSelectedOwner(null);
  };

  const handleVerifyStore = (id) => {
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isOfficialStore: true } : o)),
    );
    setActiveVerificationModal(null);
    setSelectedOwner(null);
  };

  const toggleExpertStatus = (id) => {
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isExpert: !o.isExpert } : o)),
    );
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800 text-left">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Manajemen Owner
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Otorisasi identitas, toko resmi, dan kredibilitas tenaga ahli.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all active:scale-95"
        >
          <UserPlus size={18} />
          <span>Tambah Owner Baru</span>
        </button>
      </div>

      {/* 2. Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Cari nama atau email owner..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Filter:
            </span>
            <select
              className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option>Semua</option>
              <option>Verifikasi User</option>
              <option>Official Store</option>
              <option>Tenaga Ahli</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Profil Owner</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Lencana Verifikasi</th>
                <th className="px-6 py-4">Aktivitas</th>
                <th className="px-6 py-4 text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOwners.map((owner) => (
                <tr
                  key={owner.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-600 border border-white shadow-sm shrink-0">
                        {owner.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-800 truncate">
                          {owner.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {owner.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                        owner.status === "PRO"
                          ? "bg-teal-100 text-teal-700 border-teal-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {owner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="group relative">
                        <BadgeCheck
                          size={20}
                          className={
                            owner.isUserVerified
                              ? "text-blue-500"
                              : "text-slate-200"
                          }
                        />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                          Verif User
                        </span>
                      </div>
                      <div className="group relative">
                        <Store
                          size={20}
                          className={
                            owner.isOfficialStore
                              ? "text-teal-500"
                              : "text-slate-200"
                          }
                        />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                          Official Store
                        </span>
                      </div>
                      <div className="group relative">
                        <Award
                          size={20}
                          className={
                            owner.isExpert ? "text-amber-500" : "text-slate-200"
                          }
                        />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                          Tenaga Ahli
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    {owner.coops.length} Kandang • {owner.products.length}{" "}
                    Produk
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Contextual Actions */}
                      {!owner.isUserVerified && (
                        <button
                          onClick={() => {
                            setSelectedOwner(owner);
                            setActiveVerificationModal("user");
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                          title="Verifikasi Identitas"
                        >
                          <Fingerprint size={18} />
                        </button>
                      )}
                      {owner.isUserVerified && !owner.isOfficialStore && (
                        <button
                          onClick={() => {
                            setSelectedOwner(owner);
                            setActiveVerificationModal("store");
                          }}
                          className="p-2 text-teal-500 hover:bg-teal-50 rounded-lg"
                          title="Verifikasi Toko Resmi"
                        >
                          <Store size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedOwner(owner);
                          setDetailTab("profil");
                        }}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* A. Modal Verifikasi Identitas (User) */}
      {activeVerificationModal === "user" && selectedOwner && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scale-in border border-blue-50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                  <Fingerprint size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Verifikasi Identitas User
                </h3>
              </div>
              <button
                onClick={() => setActiveVerificationModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-6">
              Tinjau kartu identitas (KTP) dan foto diri untuk memvalidasi akun{" "}
              <strong>{selectedOwner.name}</strong>.
            </p>

            <div className="space-y-3 mb-8">
              <div className="aspect-video bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                <FileText size={32} />
                <span className="text-[10px] font-bold uppercase mt-2 tracking-widest">
                  Foto_KTP_User.jpg
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl text-blue-700">
                <ShieldAlert size={18} />
                <span className="text-xs font-bold uppercase">
                  Identitas Sesuai dengan Profil
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveVerificationModal(null)}
                className="px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all"
              >
                Tolak
              </button>
              <button
                onClick={() => handleVerifyUser(selectedOwner.id)}
                className="px-4 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                Terima Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. Modal Verifikasi Toko (Official Store) */}
      {activeVerificationModal === "store" && selectedOwner && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scale-in border border-teal-50 text-left">
            <div className="flex justify-between items-center mb-6 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <Store size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Verifikasi Toko Resmi
                </h3>
              </div>
              <button
                onClick={() => setActiveVerificationModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-6 text-left">
              Validasi dokumen NIB dan izin operasional peternakan{" "}
              <strong>{selectedOwner.name}</strong>.
            </p>

            <div className="space-y-3 mb-8 text-left">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-teal-200">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400" size={18} />
                  <span className="text-xs font-bold text-slate-700">
                    NIB_Peternakan_Berkah.pdf
                  </span>
                </div>
                <ExternalLink size={14} className="text-slate-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveVerificationModal(null)}
                className="px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all"
              >
                Tolak
              </button>
              <button
                onClick={() => handleVerifyStore(selectedOwner.id)}
                className="px-4 py-3 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 hover:bg-teal-700"
              >
                Verifikasi Toko
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. Detail Modal (Deep Dive) */}
      {selectedOwner && !activeVerificationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-md">
                  {selectedOwner.avatar}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                    {selectedOwner.name}
                    {selectedOwner.isUserVerified && (
                      <BadgeCheck size={18} className="text-blue-500" />
                    )}
                    {selectedOwner.isOfficialStore && (
                      <Store size={18} className="text-teal-500" />
                    )}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {selectedOwner.email} • {selectedOwner.status}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOwner(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b border-slate-100 bg-white px-6">
              {[
                { id: "profil", label: "Profil & Kandang", icon: Home },
                { id: "produk", label: "Katalog Produk", icon: Package },
                { id: "investor", label: "Investor & Member", icon: Layers },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id)}
                  className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                    detailTab === tab.id
                      ? "border-teal-600 text-teal-600"
                      : "border-transparent text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-white text-left">
              {detailTab === "profil" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                      Informasi Biodata
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={14} className="text-slate-400" />{" "}
                        <span className="font-medium">
                          {selectedOwner.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={14} className="text-slate-400" />{" "}
                        <span className="font-medium">
                          {selectedOwner.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                      Manajemen Kandang
                    </h4>
                    {selectedOwner.coops.map((coop, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:border-teal-200 transition-all"
                      >
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-800">
                            {coop.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            Kapasitas: {coop.capacity.toLocaleString()} Ekor
                          </p>
                        </div>
                        <ChevronRight
                          size={16}
                          className="text-slate-300 group-hover:text-teal-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Tab lain dikosongkan untuk demo ringkas */}
              {detailTab !== "profil" && (
                <div className="py-20 text-center text-slate-400 italic">
                  Data modul {detailTab} tersedia dalam audit lengkap.
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center rounded-b-3xl">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleExpertStatus(selectedOwner.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    selectedOwner.isExpert
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-white border-slate-200 text-slate-500"
                  }`}
                >
                  <Award size={16} />{" "}
                  {selectedOwner.isExpert
                    ? "Cabut Status Ahli"
                    : "Jadikan Tenaga Ahli"}
                </button>
              </div>
              <button
                onClick={() => setSelectedOwner(null)}
                className="bg-slate-900 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-black shadow-lg"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 animate-scale-in">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 text-left">
              <UserPlus size={24} className="text-teal-500" /> Pendaftaran Owner
              Baru
            </h3>

            <div className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                  Nama Lengkap Pemilik
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                  Alamat Email Aktif
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                    size={16}
                  />
                  <input
                    type="email"
                    placeholder="email@owner.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1 text-left text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nomor Handphone (WhatsApp)
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="0812-xxxx-xxxx"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                  />
                </div>
              </div>
              <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-all group">
                <div className="p-3 bg-white rounded-full text-slate-400 group-hover:text-teal-500 transition-colors shadow-sm">
                  <Plus size={24} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">
                  Pilih Foto Profil (Avatar)
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-3 bg-teal-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                Simpan Owner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerList;
