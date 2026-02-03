import React, { useState } from "react";
import {
  Award,
  CheckCircle,
  GraduationCap,
  MessageSquare,
  UserCheck,
  ShieldCheck,
  Star,
  FileText,
  X,
  Search,
  Plus,
  ThumbsUp,
  Briefcase,
  SearchCheck,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Eye,
  MapPin,
  Upload, // Menambahkan ikon Eye yang sebelumnya terlewat
} from "lucide-react";

// --- DATA DUMMY ---
const INITIAL_EXPERTS = [
  {
    id: 1,
    name: "Drh. Ahmad Subagja",
    specialization: "Kesehatan Ternak",
    credentials: "S2 Kedokteran Hewan (IPB)",
    reputation: 4.9,
    contributions: 154,
    status: "Verified",
    experience: "12 Tahun",
    location: "Bogor, Jawa Barat",
    recentAnswers: [
      "Penanganan penyakit gumboro pada ayam broiler umur 14 hari...",
      "Pentingnya biosekuriti ketat pada area perkandangan layer...",
    ],
  },
  {
    id: 2,
    name: "Prof. Siti Rahayu",
    specialization: "Nutrisi Pakan",
    credentials: "Ph.D Animal Nutrition",
    reputation: 4.8,
    contributions: 89,
    status: "Verified",
    experience: "20 Tahun",
    location: "Yogyakarta",
    recentAnswers: [
      "Formulasi pakan alternatif menggunakan bahan baku lokal...",
      "Efisiensi FCR melalui optimasi protein pada fase starter...",
    ],
  },
  {
    id: 3,
    name: "Andi Wijaya, M.Si",
    specialization: "Manajemen Bisnis",
    credentials: "Magister Agribisnis",
    reputation: 0,
    contributions: 12,
    status: "Pending",
    experience: "5 Tahun",
    location: "Kendal, Jawa Tengah",
    recentAnswers: ["Analisis ROI pembangunan kandang closed house modern..."],
  },
  {
    id: 4,
    name: "Dr. Ir. Hendra",
    specialization: "Genetika Unggas",
    credentials: "Doktor Pemuliaan Ternak",
    reputation: 4.7,
    contributions: 42,
    status: "Verified",
    experience: "15 Tahun",
    location: "Malang, Jawa Timur",
    recentAnswers: [
      "Seleksi bibit DOC berkualitas untuk hasil panen optimal...",
    ],
  },
];

const Experts = () => {
  // --- States ---
  const [experts, setExperts] = useState(INITIAL_EXPERTS);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Logic ---
  const stats = {
    active: experts.filter((e) => e.status === "Verified").length,
    contributions: experts.reduce((acc, curr) => acc + curr.contributions, 0),
    pending: experts.filter((e) => e.status === "Pending").length,
  };

  const filteredExperts = experts.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Page Header & Add Button */}
      <div className="flex justify-between items-center mb-8 text-left">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manajemen Tenaga Ahli
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Verifikasi identitas dan pantau kontribusi profesional dalam
            komunitas.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
        >
          <Plus size={18} />
          <span>Tambah Ahli Baru</span>
        </button>
      </div>

      {/* 1. Expert Statistics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Ahli Aktif
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.active} Ahli
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Jawaban
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.contributions.toLocaleString()} Kontribusi
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <SearchCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Verifikasi Tertunda
            </p>
            <h3 className="text-2xl font-bold text-slate-900">
              {stats.pending} Aplikasi
            </h3>
          </div>
        </div>
      </div>

      {/* 2. Main Experts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative w-80">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari ahli atau spesialisasi..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <span className="text-xs font-medium text-slate-400">
              Total: {filteredExperts.length}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                <th className="px-6 py-4">Profil Ahli</th>
                <th className="px-6 py-4">Sertifikasi</th>
                {/* <th className="px-6 py-4 text-center">Reputasi</th> */}
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExperts.map((expert) => (
                <tr
                  key={expert.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-teal-600 border border-teal-100 shrink-0">
                        {expert.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">
                          {expert.name}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 uppercase bg-teal-50 px-2 py-0.5 rounded-full mt-1">
                          {expert.specialization}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <GraduationCap size={14} className="text-slate-400" />
                      {expert.credentials}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star
                        size={14}
                        className={
                          expert.reputation > 0
                            ? "text-amber-400 fill-current"
                            : "text-slate-200"
                        }
                      />
                      <span className="text-sm font-bold text-slate-700">
                        {expert.reputation || "-"}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">
                        ({expert.contributions})
                      </span>
                    </div>
                  </td> */}
                  <td className="px-6 py-4">
                    {expert.status === "Verified" ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <ShieldCheck size={12} /> OFFICIAL
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                        <SearchCheck size={12} /> PENDING
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedExpert(expert)}
                        className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                        title="Detail & Verifikasi"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        {/* <MoreVertical size={18} /> */}
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

      {/* 3. Detail & Verifikasi Ahli Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in text-left flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xl border-4 border-white shadow-sm">
                  {selectedExpert.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                    {selectedExpert.name}
                    {selectedExpert.status === "Verified" && (
                      <ShieldCheck size={18} className="text-teal-500" />
                    )}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {selectedExpert.specialization} • {selectedExpert.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExpert(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Biodata */}
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={12} /> Pendidikan & Gelar
                  </label>
                  <p className="text-sm font-bold text-slate-800 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedExpert.credentials}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={12} /> Pengalaman Kerja
                  </label>
                  <p className="text-sm font-bold text-slate-800 mt-2">
                    {selectedExpert.experience}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Berpengalaman dalam menangani useran komersial skala besar.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-teal-600">
                        {selectedExpert.contributions}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Jawaban
                      </p>
                    </div>
                    <div className="w-[1px] h-8 bg-slate-200"></div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-amber-500">
                        {selectedExpert.reputation}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">
                        Rating
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Column: Dokumen Verifikasi */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText size={12} /> Dokumen Verifikasi
                </label>
                <div className="grid grid-cols-1 gap-3">
                  <div className="group relative w-full h-32 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden cursor-pointer hover:bg-slate-50 transition-all">
                    <FileText size={32} className="mb-1 opacity-20" />
                    <p className="text-[10px] font-bold">Ijazah Terlampir</p>
                    <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/10 transition-all flex items-center justify-center">
                      <ExternalLink
                        size={20}
                        className="text-white opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                  </div>
                  <div className="group relative w-full h-32 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden cursor-pointer hover:bg-slate-50 transition-all">
                    <Award size={32} className="mb-1 opacity-20" />
                    <p className="text-[10px] font-bold">Sertifikat Keahlian</p>
                    <div className="absolute inset-0 bg-teal-600/0 group-hover:bg-teal-600/10 transition-all flex items-center justify-center">
                      <ExternalLink
                        size={20}
                        className="text-white opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Kontribusi Komunitas */}
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={12} /> Jawaban Terbaru
                </label>
                <div className="space-y-3">
                  {selectedExpert.recentAnswers.map((answer, i) => (
                    <div
                      key={i}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all cursor-pointer group"
                    >
                      <p className="text-xs text-slate-600 line-clamp-2 italic leading-relaxed">
                        "{answer}"
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] font-bold text-teal-600 flex items-center gap-1">
                          <ThumbsUp size={10} /> 12 Terbantu
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-slate-300 group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-2 text-xs font-bold text-slate-400 hover:text-teal-600 transition-colors">
                    Lihat Semua Aktivitas
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center rounded-b-3xl">
              <div>
                <select className="bg-white border border-slate-200 text-xs font-bold text-slate-600 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Ganti Spesialisasi...</option>
                  <option>Kesehatan Ternak</option>
                  <option>Nutrisi Pakan</option>
                  <option>Manajemen Bisnis</option>
                </select>
              </div>
              <div className="flex gap-3">
                {selectedExpert.status === "Verified" ? (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all">
                    Cabut Status Ahli
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedExpert(null)}
                    className="flex items-center gap-2 px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 transition-all"
                  >
                    <ShieldCheck size={18} /> Verifikasi Akun Ahli
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Tambah Ahli Baru Modal - Full Version */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in text-left flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                  <Plus size={24} />
                </div>
                <h3 className="font-bold text-slate-800 text-xl">
                  Daftarkan Tenaga Ahli Baru
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {/* Step 1: User Search */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Search size={12} /> Cari User Terdaftar
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Masukkan nama atau email user..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  User harus sudah memiliki akun Member/user untuk didaftarkan
                  sebagai Ahli.
                </p>
              </div>

              {/* Step 2: Professional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <UserCheck size={12} /> Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Drh. Budi Utomo, M.Si"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Award size={12} /> Spesialisasi
                  </label>
                  <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer">
                    <option>Pilih Bidang Keahlian...</option>
                    <option>Kesehatan Ternak</option>
                    <option>Nutrisi Pakan</option>
                    <option>Manajemen Bisnis</option>
                    <option>Genetika Unggas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap size={12} /> Pendidikan Terakhir
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: S1 Kedokteran Hewan - IPB"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={12} /> Lokasi Domisili
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Jakarta Selatan"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={12} /> Lama Pengalaman
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      Tahun
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Upload size={12} /> Upload Bukti Sertifikasi/Ijazah
                  </label>
                  <div className="flex items-center justify-center w-full h-[46px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all text-slate-400">
                    <div className="flex items-center gap-2">
                      <Upload size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-wide">
                        Pilih File (PDF/JPG)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Biodata Singkat / Ringkasan Keahlian
                </label>
                <textarea
                  rows="3"
                  placeholder="Jelaskan secara singkat latar belakang profesional ahli..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                ></textarea>
              </div>

              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex gap-3">
                <ShieldCheck size={20} className="text-teal-600 shrink-0" />
                <p className="text-[10px] text-teal-800 leading-relaxed">
                  Menekan tombol <strong>Simpan & Aktifkan</strong> akan
                  langsung memberikan lencana <strong>Official Expert</strong>{" "}
                  kepada user tersebut dan mereka dapat mulai menjawab
                  konsultasi di komunitas.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-8 py-2.5 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-all"
              >
                Simpan & Aktifkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experts;
