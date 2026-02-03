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
  ShieldAlert,
  UserPlus,
  Phone,
  Plus,
  Pin,
  Map,
  Eye,
  Store,
  Fingerprint,
  Award,
  BadgeCheck,
  FileText,
  ExternalLink,
  Package,
  Layers,
  ChevronRight, // Menambahkan ikon yang sebelumnya terlewat
} from "lucide-react";
import CoopDetailModal from "../components/CoopDetailModal";
import ProductDetailModal from "../components/ProductDetailModal";

// --- DATA DUMMY ---
const INITIAL_REGISTRATIONS = [
  {
    id: "REG-2024-001",
    name: "Budi Santoso",
    email: "budi.s@berkahfarm.com",
    type: "user",
    date: "2024-02-02",
    status: "Menunggu",
    isUserVerified: true,
    phone: "0812-3456-7890",
    address: "Blitar, Jawa Timur",
    farms: [
      { name: "Kandang A (Starter)", location: "Blitar", capacity: 5000 },
      { name: "Kandang B (Finisher)", location: "Kediri", capacity: 3500 },
    ],
    products: [
      {
        id: 101,
        name: "Pakan Ayam Broiler Premium",
        price: "Rp 450.000",
        stock: 120,
      },
    ],
    plannedDailyInput:
      "Input pakan harian, suhu, dan angka kematian pagi/sore.",
  },
  {
    id: "REG-2024-002",
    name: "Agus Pratama",
    email: "agus.p@gmail.com",
    type: "user",
    date: "2024-02-02",
    status: "Menunggu",
    isUserVerified: false,
    products: [],
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
    isUserVerified: false,
    phone: "0856-7788-9900",
    address: "Jakarta Selatan",
    farms: [],
    products: [
      {
        id: 103,
        name: "DOC Ayam Layer Super",
        price: "Rp 12.000",
        stock: 5000,
      },
    ],
    plannedDailyInput: "Akses edukasi dan forum diskusi.",
  },
  {
    id: "REG-2024-004",
    name: "Rahmat Hidayat",
    email: "rahmat.h@poultry.id",
    type: "user",
    date: "2024-01-30",
    status: "Ditolak",
    isUserVerified: true,
    phone: "0811-2233-4455",
    address: "Lampung Tengah",
    farms: [{ name: "Rahmat Farm", location: "Lampung", capacity: 2000 }],
    products: [
      {
        id: 103,
        name: "DOC Ayam Layer Super",
        price: "Rp 12.000",
        stock: 5000,
      },
    ],
    plannedDailyInput: "Input data populasi.",
  },
];

const dummyDataKandang = {
  id: "KND-01",
  name: "Kandang A - Layer Fase 1",
  location: "Blok Selatan No. 4",
  initialPopulation: 5000,
  logs: {
    pakan: [
      {
        date: "2023-10-01",
        type: "Sentrat CJ-45",
        qty: 3,
        totalKg: 150,
        notes: "Pagi & Sore",
      },
      {
        date: "2023-10-02",
        type: "Jagung Giling",
        qty: 2,
        totalKg: 100,
        notes: "Campuran",
      },
    ],
    ayam: [
      { date: "2023-10-01", start: 5000, death: 2, cull: 0, end: 4998 },
      { date: "2023-10-02", start: 4998, death: 1, cull: 5, end: 4992 },
    ],
    telur: [
      {
        date: "2023-10-01",
        bagus: 4500,
        bucek: 20,
        putih: 10,
        kampung: 5,
        total: 4535,
        totalKg: 285,
      },
      {
        date: "2023-10-02",
        bagus: 4600,
        bucek: 15,
        putih: 12,
        kampung: 8,
        total: 4635,
        totalKg: 290,
      },
    ],
    obat: [
      {
        date: "2023-10-01",
        name: "Vitamin Egg Stimulant",
        dosage: "100gr",
        cost: 150000,
        method: "Campur Air Minum",
      },
    ],
    penjualan: [
      {
        date: "2023-10-02",
        buyer: "Agen Budi Jaya",
        type: "Bersih",
        weight: 200,
        pricePerKg: 24000,
        total: 4800000,
      },
      {
        date: "2023-10-02",
        buyer: "Warung Bu Susi",
        type: "Bucek",
        weight: 10,
        pricePerKg: 15000,
        total: 150000,
      },
    ],
  },
};

const dummyProductData = {
  id: "PROD-123",
  name: "Pakan Ayam Petelur High Quality (50kg)",
  category: "Pakan Ternak",
  price: 485000,
  stock: 120,
  isSponsor: true, // Jika true, muncul badge sponsor
  description:
    "Pakan konsentrat khusus untuk ayam petelur fase layer. Mengandung protein 18% dan kalsium tinggi untuk memaksimalkan kualitas cangkang telur. Produksi meningkat hingga 15% dalam 2 minggu pemakaian.",
  stats: {
    waClicks: 142, // "Seberapa laris" indikator
    views: 3500,
  },
  store: {
    name: "Toko Tani Makmur Jaya",
    location: "Blitar, Jawa Timur",
    joinDate: "Jan 2023",
    isVerified: true,
  },
};

const Registrations = () => {
  // --- States ---
  const [registrations, setRegistrations] = useState(INITIAL_REGISTRATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [registrationFlow, setRegistrationFlow] = useState("Manual"); // Manual | Otomatis
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeVerificationModal, setActiveVerificationModal] = useState(null); // 'user', 'store', null
  const [selecteduser, setSelecteduser] = useState(null);
  const [detailTab, setDetailTab] = useState("profil");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoop, setSelectedCoop] = useState(null);

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

  const handleOpenDetailProduct = () => {
    setSelectedProduct(dummyProductData);
    setIsOpen(true);
  };

  const handleOpenDetail = () => {
    setSelectedCoop(dummyDataKandang);
    setIsModalOpen(true);
  };

  const handleVerifyUser = (id) => {
    setusers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isUserVerified: true } : o)),
    );
    setActiveVerificationModal(null);
    setSelecteduser(null);
  };

  const handleVerifyStore = (id) => {
    setusers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isOfficialStore: true } : o)),
    );
    setActiveVerificationModal(null);
    setSelecteduser(null);
  };

  const toggleExpertStatus = (id) => {
    setusers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, isExpert: !o.isExpert } : o)),
    );
  };

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
        <div className="flex gap-3">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold shadow-sm transition-all"
          >
            <Settings size={18} className="text-slate-400" />
            <span>Pengaturan Registrasi</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all active:scale-95"
          >
            <UserPlus size={18} />
            <span>Tambah user Baru</span>
          </button>
        </div>
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
              <option>user</option>
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
                <th className="px-6 py-4">Tanggal Join</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Lencana Verifikasi</th>
                <th className="px-6 py-4">AKSI</th>
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
                        reg.type === "user"
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

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="group relative">
                        <BadgeCheck
                          size={20}
                          className={
                            reg.isUserVerified
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
                            reg.isOfficialStore
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
                            reg.isExpert ? "text-amber-500" : "text-slate-200"
                          }
                        />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                          Tenaga Ahli
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                    {reg.farms.length} Kandang • {reg.products.length} Produk
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Contextual Actions */}
                      {!reg.isUserVerified && (
                        <button
                          onClick={() => {
                            setSelecteduser(reg);
                            setActiveVerificationModal("user");
                          }}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                          title="Verifikasi Identitas"
                        >
                          <Fingerprint size={18} />
                        </button>
                      )}
                      {!reg.isOfficialStore && (
                        <button
                          onClick={() => {
                            setSelecteduser(reg);
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
                          // setSelecteduser(user);
                          setDetailTab("profil");
                        }}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg"
                      ></button>

                      <button
                        onClick={() => setSelecteduser(reg)}
                        className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors"
                      >
                        Detail
                      </button>
                    </div>
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
                Pilih bagaimana sistem menangani pendaftaran user baru:
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

      {/* A. Modal Verifikasi Identitas (User) */}
      {activeVerificationModal === "user" && selecteduser && (
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
              <strong>{selecteduser.name}</strong>.
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
                onClick={() => handleVerifyUser(selecteduser.id)}
                className="px-4 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700"
              >
                Terima Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. Modal Verifikasi Toko (Official Store) */}
      {activeVerificationModal === "store" && selecteduser && (
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
              Validasi dokumen NIB dan izin operasional useran{" "}
              <strong>{selecteduser.name}</strong>.
            </p>

            <div className="space-y-3 mb-8 text-left">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-teal-200">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400" size={18} />
                  <span className="text-xs font-bold text-slate-700">
                    KTP.pdf
                  </span>
                </div>

                <ExternalLink size={14} className="text-slate-300" />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-teal-200">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-400" size={18} />
                  <span className="text-xs font-bold text-slate-700">
                    NIB_useran_Berkah.pdf
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
                onClick={() => handleVerifyStore(selecteduser.id)}
                className="px-4 py-3 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20 hover:bg-teal-700"
              >
                Verifikasi Toko
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. Detail Modal (Deep Dive) */}
      {selecteduser && !activeVerificationModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in text-left">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4 text-left">
                <div className="w-14 h-14 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-md">
                  {selecteduser.avatar}
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                    {selecteduser.name}
                    {selecteduser.isUserVerified && (
                      <BadgeCheck size={18} className="text-blue-500" />
                    )}
                    {selecteduser.isOfficialStore && (
                      <Store size={18} className="text-teal-500" />
                    )}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {selecteduser.email} • {selecteduser.status}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelecteduser(null)}
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
                          {selecteduser.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={14} className="text-slate-400" />{" "}
                        <span className="font-medium">
                          {selecteduser.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
                      Manajemen Kandang
                    </h4>
                    {selecteduser.farms.map((coop, i) => (
                      <div
                        key={i}
                        onClick={handleOpenDetail}
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
              {/* --- TAB 2: KATALOG PRODUK --- */}
              {detailTab === "produk" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Daftar Produk Penjualan
                    </h4>
                    <span className="text-xs bg-teal-50 text-teal-600 px-2 py-1 rounded-md font-medium">
                      Total: 4 Item
                    </span>
                  </div>

                  {/* Grid Produk */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Pakan Konsentrat Layer",
                        category: "Pakan",
                        price: 485000,
                        img: "bg-orange-100",
                      },
                      {
                        name: "Vitamin Egg Stimulant",
                        category: "Vitamin",
                        price: 125000,
                        img: "bg-blue-100",
                      },
                      {
                        name: "Jagung Giling Halus",
                        category: "Pakan",
                        price: 8500,
                        img: "bg-yellow-100",
                      },
                      {
                        name: "Desinfektan Kandang",
                        category: "Obat",
                        price: 65000,
                        img: "bg-purple-100",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        onClick={handleOpenDetailProduct}
                        className="border border-slate-100 rounded-2xl p-3 hover:shadow-md transition-all group bg-white"
                      >
                        {/* Placeholder Gambar */}
                        <div
                          className={`h-32 w-full rounded-xl mb-3 ${item.img} flex items-center justify-center text-slate-400/50`}
                        >
                          <Package size={32} />
                        </div>

                        {/* Detail Produk */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase border border-slate-200 px-1.5 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h5 className="font-bold text-slate-700 text-sm leading-tight line-clamp-2 h-10">
                            {item.name}
                          </h5>
                          <div className="flex justify-between items-end mt-2">
                            <p className="text-teal-600 font-bold text-sm">
                              Rp {item.price.toLocaleString("id-ID")}
                              {item.unit && (
                                <span className="text-xs font-normal text-slate-400">
                                  /{item.unit}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- TAB 3: INVESTOR & MEMBER --- */}
              {detailTab === "investor" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Daftar Relasi Akun
                    </h4>
                  </div>

                  {/* List Member / Investor */}
                  <div className="space-y-3">
                    {[
                      {
                        name: "H. Susanto",
                        role: "Investor",
                        phone: "0812-3456-7890",
                        address: "Solo, Jawa Tengah",
                        joined: "2023",
                      },
                      {
                        name: "CV. Berkah Tani",
                        role: "Member",
                        phone: "0857-1231-2312",
                        address: "Klaten, Jawa Tengah",
                        joined: "2024",
                      },
                      {
                        name: "Budi Santoso",
                        role: "Member",
                        phone: "0811-9988-7766",
                        address: "Boyolali, Jawa Tengah",
                        joined: "2024",
                      },
                    ].map((user, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-white border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-teal-200 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar Initials */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 
                          ${user.role === "Investor" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                          >
                            {user.name.substring(0, 2).toUpperCase()}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-bold text-slate-700 text-sm">
                                {user.name}
                              </h5>
                              {user.role === "Investor" ? (
                                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                                  Investor
                                </span>
                              ) : (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium border border-slate-200">
                                  Member
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col gap-1 text-xs text-slate-500">
                              <div className="flex items-center gap-2">
                                <Phone size={12} /> {user.phone}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin size={12} /> {user.address}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action / Info Tambahan */}
                        <div className="text-right pl-14 md:pl-0">
                          <span className="text-xs text-slate-400 block mb-1">
                            Bergabung
                          </span>
                          <span className="text-sm font-medium text-slate-600">
                            {user.joined}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center rounded-b-3xl">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleExpertStatus(selecteduser.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                    selecteduser.isExpert
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-white border-slate-200 text-slate-500"
                  }`}
                >
                  <Award size={16} />{" "}
                  {selecteduser.isExpert
                    ? "Cabut Status Ahli"
                    : "Jadikan Tenaga Ahli"}
                </button>
              </div>
              <button
                onClick={() => setSelecteduser(null)}
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
              <UserPlus size={24} className="text-teal-500" /> Pendaftaran user
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
                    placeholder="email@reg.com"
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
              <div className="space-y-1 text-left text-left">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Alamat
                </label>
                <div className="relative">
                  <Map
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Jl. marzuki"
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
                Simpan user
              </button>
            </div>
          </div>
        </div>
      )}

      <CoopDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedCoop}
      />

      <ProductDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Registrations;
