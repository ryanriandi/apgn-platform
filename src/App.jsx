import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Handshake, BarChart3, ChevronRight, Star, Award, TrendingUp, LogIn, UserPlus, Menu, X, Play, CheckCircle, Clock, Lock, Building2, MapPin, Search, Filter, ArrowRight, Eye, Calendar, Target, Briefcase, Heart, FileText, LogOut, User, Settings, Home, GraduationCap, MessageSquare, Bell, ChevronDown, CircleDot, Sparkles } from 'lucide-react';

// ============================================
// DUMMY DATA
// ============================================
const DUMMY_MEMBERS = [
  { id: 1, name: 'Ahmad Fauzi', businessName: 'Berkah Jaya Food', sector: 'F&B', city: 'Jakarta', description: 'Produsen makanan ringan halal dengan kapasitas produksi 10.000 pcs/hari', products: 'Keripik, Snack, Frozen Food', logo: '🍜', kelas: 'E2', omzet: 2000000000 },
  { id: 2, name: 'Siti Nurhaliza', businessName: 'Hijab Syari Collection', sector: 'Fashion', city: 'Bandung', description: 'Produsen hijab dan busana muslim premium dengan 50+ reseller', products: 'Hijab, Gamis, Mukena', logo: '👗', kelas: 'E2', omzet: 1500000000 },
  { id: 3, name: 'Muhammad Rizki', businessName: 'Tekno Solusi Digital', sector: 'Technology', city: 'Surabaya', description: 'Software house yang fokus pada solusi digital untuk UMKM', products: 'Web Development, Mobile App, ERP', logo: '💻', kelas: 'E3', omzet: 8000000000 },
  { id: 4, name: 'Fatimah Azzahra', businessName: 'Herbal Nusantara', sector: 'Health', city: 'Yogyakarta', description: 'Produsen herbal dan jamu tradisional dengan sertifikasi BPOM', products: 'Jamu, Herbal Tea, Suplemen', logo: '🌿', kelas: 'E1', omzet: 80000000 },
  { id: 5, name: 'Umar Abdullah', businessName: 'Properti Amanah Group', sector: 'Property', city: 'Jakarta', description: 'Developer properti syariah dengan 5 proyek aktif', products: 'Perumahan, Ruko, Kavling', logo: '🏠', kelas: 'E3', omzet: 25000000000 },
  { id: 6, name: 'Khadijah Putri', businessName: 'Catering Barokah', sector: 'F&B', city: 'Medan', description: 'Layanan catering untuk acara kantor dan pernikahan', products: 'Catering, Snack Box, Nasi Box', logo: '🍱', kelas: 'E1', omzet: 50000000 },
  { id: 7, name: 'Ibrahim Hakim', businessName: 'Logistik Cepat Amanah', sector: 'Logistics', city: 'Semarang', description: 'Jasa pengiriman dan logistik dengan armada 100+ unit', products: 'Ekspedisi, Warehouse, Last Mile', logo: '🚚', kelas: 'E3', omzet: 15000000000 },
  { id: 8, name: 'Aisyah Ramadhani', businessName: 'Edu Islamic Kids', sector: 'Education', city: 'Malang', description: 'Penyedia konten edukasi Islam untuk anak-anak', products: 'Buku, Video Edukasi, Board Game', logo: '📚', kelas: 'E1', omzet: 75000000 },
];

const DUMMY_COURSES = [
  { id: 1, title: 'Fundamental Bisnis Syariah', level: 'E1', duration: '4 jam', modules: 8, image: '📖', description: 'Dasar-dasar membangun bisnis sesuai prinsip syariah', progress: 0 },
  { id: 2, title: 'Digital Marketing untuk UMKM', level: 'E1', duration: '6 jam', modules: 12, image: '📱', description: 'Strategi pemasaran digital dengan budget terbatas', progress: 0 },
  { id: 3, title: 'Manajemen Keuangan Bisnis', level: 'E2', duration: '8 jam', modules: 15, image: '💰', description: 'Pengelolaan keuangan dan laporan keuangan bisnis', progress: 0 },
  { id: 4, title: 'Leadership & Team Building', level: 'E2', duration: '5 jam', modules: 10, image: '👥', description: 'Membangun tim solid dan kepemimpinan efektif', progress: 0 },
  { id: 5, title: 'Scaling Business Strategy', level: 'E3', duration: '10 jam', modules: 20, image: '🚀', description: 'Strategi scale-up bisnis ke level nasional', progress: 0 },
  { id: 6, title: 'Investment & Funding', level: 'E3', duration: '8 jam', modules: 16, image: '📈', description: 'Cara mendapatkan investasi dan pendanaan bisnis', progress: 0 },
  { id: 7, title: 'Legal Compliance Bisnis', level: 'E2', duration: '4 jam', modules: 8, image: '⚖️', description: 'Aspek hukum dan perizinan usaha di Indonesia', progress: 0 },
  { id: 8, title: 'Supply Chain Management', level: 'E3', duration: '7 jam', modules: 14, image: '🔗', description: 'Optimalisasi rantai pasok untuk efisiensi maksimal', progress: 0 },
];

const DUMMY_OPPORTUNITIES = [
  { id: 1, title: 'Supplier Bahan Baku Makanan', category: 'Supplier', deadline: '2025-02-15', description: 'Mencari supplier bahan baku untuk produksi makanan ringan skala besar. Kebutuhan: tepung, minyak, bumbu.', requirements: 'Minimal E2, Sektor F&B atau Distributor', postedBy: 'APGN Pusat', date: '2025-01-10' },
  { id: 2, title: 'Mitra Distribusi Jawa Timur', category: 'Distribusi', deadline: '2025-02-28', description: 'Membuka peluang kemitraan distribusi produk fashion muslim di wilayah Jawa Timur.', requirements: 'Memiliki jaringan retail, Minimal E2', postedBy: 'APGN Pusat', date: '2025-01-08' },
  { id: 3, title: 'Kerjasama Pengembangan Aplikasi', category: 'Technology', deadline: '2025-03-01', description: 'Proyek pengembangan aplikasi mobile untuk komunitas. Butuh partner teknologi.', requirements: 'Sektor Technology, Portfolio aplikasi', postedBy: 'APGN Pusat', date: '2025-01-05' },
  { id: 4, title: 'Program Wakaf Produktif', category: 'Wakaf', deadline: '2025-04-01', description: 'Kesempatan berpartisipasi dalam program wakaf produktif APGN untuk pemberdayaan ekonomi umat.', requirements: 'Terbuka untuk semua kelas', postedBy: 'APGN Pusat', date: '2025-01-01' },
];

const SECTORS = ['Semua', 'F&B', 'Fashion', 'Technology', 'Health', 'Property', 'Logistics', 'Education'];
const CITIES = ['Semua', 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan', 'Semarang', 'Malang'];

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatCurrency = (num) => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}M`;
  if (num >= 1000000) return `${(num / 1000000).toFixed(0)}jt`;
  return num.toLocaleString('id-ID');
};

const calculateKelas = (omzet) => {
  if (omzet < 100000000) return 'E1';
  if (omzet <= 5000000000) return 'E2';
  return 'E3';
};

const canAccessCourse = (userKelas, courseLevel) => {
  const kelasHierarchy = { 'E1': 1, 'E2': 2, 'E3': 3 };
  return kelasHierarchy[userKelas] >= kelasHierarchy[courseLevel];
};

const getKelasInfo = (kelas) => {
  const info = {
    'E1': { name: 'Pemula', color: 'from-emerald-400 to-teal-500', description: 'Omzet < 100jt/tahun' },
    'E2': { name: 'UMKM', color: 'from-amber-400 to-orange-500', description: 'Omzet 100jt - 5M/tahun' },
    'E3': { name: 'Menengah-Besar', color: 'from-purple-400 to-indigo-500', description: 'Omzet > 5M/tahun' }
  };
  return info[kelas] || info['E1'];
};

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function APGNPlatform() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses, setCourses] = useState(DUMMY_COURSES);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('apgn_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('apgn_user', JSON.stringify(userData));
    setShowAuthModal(false);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('apgn_user');
    setCurrentPage('landing');
  };

  const updateCourseProgress = (courseId, progress) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, progress } : c
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl" />
        {/* Islamic Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23047857' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Navigation */}
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="relative">
        {currentPage === 'landing' && <LandingPage setCurrentPage={setCurrentPage} onLoginClick={() => setShowAuthModal(true)} />}
        {currentPage === 'members' && <MembersPage members={DUMMY_MEMBERS} />}
        {currentPage === 'dashboard' && user && <DashboardPage user={user} courses={courses} opportunities={DUMMY_OPPORTUNITIES} setCurrentPage={setCurrentPage} />}
        {currentPage === 'assessment' && user && <AssessmentPage user={user} setUser={handleLogin} />}
        {currentPage === 'courses' && user && <CoursesPage user={user} courses={courses} updateProgress={updateCourseProgress} />}
        {currentPage === 'collaboration' && user && <CollaborationPage opportunities={DUMMY_OPPORTUNITIES} />}
        {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard members={DUMMY_MEMBERS} courses={courses} opportunities={DUMMY_OPPORTUNITIES} />}
        {currentPage === 'assumptions' && <AssumptionsPage />}
      </main>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleLogin}
        />
      )}
    </div>
  );
}

// ============================================
// NAVIGATION COMPONENT
// ============================================
function Navigation({ currentPage, setCurrentPage, user, onLoginClick, onLogout, mobileMenuOpen, setMobileMenuOpen }) {
  const publicLinks = [
    { id: 'landing', label: 'Beranda', icon: Home },
    { id: 'members', label: 'Anggota', icon: Users },
  ];

  const memberLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Kursus', icon: BookOpen },
    { id: 'collaboration', label: 'Kolaborasi', icon: Handshake },
    { id: 'members', label: 'Anggota', icon: Users },
  ];

  const links = user ? memberLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setCurrentPage(user ? 'dashboard' : 'landing')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200/50 group-hover:shadow-emerald-300/50 transition-shadow">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-slate-800">APGN</span>
              <span className="text-xs text-slate-500 block -mt-1">Platform Digital</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.id 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            {user?.role === 'admin' && (
              <button
                onClick={() => setCurrentPage('admin')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'admin' 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                Admin
              </button>
            )}
            <button
              onClick={() => setCurrentPage('assumptions')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'assumptions' 
                  ? 'bg-amber-50 text-amber-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              📋 Asumsi
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getKelasInfo(user.kelas).color}`} />
                  <span className="text-sm font-medium text-emerald-700">{user.kelas}</span>
                </div>
                <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium text-sm shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 hover:scale-105 transition-all"
              >
                Masuk
              </button>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => { setCurrentPage(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  currentPage === link.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setCurrentPage('assumptions'); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-600"
            >
              📋 Halaman Asumsi
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================
// LANDING PAGE
// ============================================
function LandingPage({ setCurrentPage, onLoginClick }) {
  const stats = [
    { value: '2,500+', label: 'Anggota Aktif', icon: Users },
    { value: '150+', label: 'Kursus Tersedia', icon: BookOpen },
    { value: '500+', label: 'Kolaborasi Bisnis', icon: Handshake },
    { value: '34', label: 'Provinsi', icon: MapPin },
  ];

  const features = [
    { icon: Users, title: 'Direktori Anggota', desc: 'Temukan dan terhubung dengan ribuan pengusaha muslim di seluruh Indonesia' },
    { icon: GraduationCap, title: 'Pembelajaran Terstruktur', desc: 'Akses kursus sesuai level bisnis Anda untuk pertumbuhan optimal' },
    { icon: Target, title: 'Self Assessment', desc: 'Ketahui klasifikasi bisnis Anda dan dapatkan rekomendasi pengembangan' },
    { icon: Handshake, title: 'Peluang Kolaborasi', desc: 'Akses peluang bisnis eksklusif dari jaringan APGN' },
    { icon: BarChart3, title: 'Tracking Progress', desc: 'Pantau perkembangan bisnis dan pembelajaran Anda' },
    { icon: Heart, title: 'Program Wakaf', desc: 'Berkontribusi untuk misi sosial melalui wakaf produktif' },
  ];

  const testimonials = [
    { name: 'Hj. Siti Aminah', business: 'Batik Nusantara', quote: 'Berkat APGN, bisnis saya berkembang dari E1 ke E2 dalam setahun. Kursus dan networkingnya luar biasa!', kelas: 'E2' },
    { name: 'Ust. Ahmad Dahlan', business: 'Pesantren Entrepreneur', quote: 'Platform yang sangat membantu untuk konsolidasi pengusaha muslim. Kolaborasi yang tercipta sangat berkah.', kelas: 'E3' },
    { name: 'Fatimah Zahra', business: 'Hijab Premium', quote: 'Self assessment membantu saya memahami posisi bisnis dan apa yang perlu ditingkatkan.', kelas: 'E1' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium">Platform Digital Resmi APGN</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Bersama Membangun
                <span className="block text-amber-300">Ekonomi Umat</span>
              </h1>
              
              <p className="text-lg text-emerald-100 mb-8 max-w-xl">
                Asosiasi Pengusaha Global Nusantara mengkonsolidasikan pengusaha muslim Indonesia untuk berkolaborasi, bertumbuh, dan berkontribusi melalui wakaf produktif.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onLoginClick}
                  className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  Bergabung Sekarang
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentPage('members')}
                  className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
                >
                  Lihat Anggota
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <stat.icon className="w-8 h-8 text-amber-300 mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-emerald-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ekosistem Lengkap untuk Pengusaha Muslim
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Platform yang dirancang khusus untuk memaksimalkan potensi kolaborasi dan pertumbuhan bisnis anggota APGN
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-slate-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-200/50 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Class Levels Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Klasifikasi Kelas Anggota
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Setiap anggota diklasifikasikan berdasarkan omzet tahunan untuk mendapatkan pembelajaran dan dukungan yang tepat
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { kelas: 'E1', name: 'Pemula', range: '< Rp 100 Juta/tahun', desc: 'Pengusaha yang baru memulai perjalanan bisnis', features: ['Kursus fundamental bisnis', 'Networking dengan sesama pemula', 'Mentoring dari senior'] },
              { kelas: 'E2', name: 'UMKM', range: 'Rp 100 Juta - 5 Miliar/tahun', desc: 'Bisnis yang sudah establish dan berkembang', features: ['Semua akses E1', 'Kursus manajemen & scaling', 'Peluang kolaborasi B2B'] },
              { kelas: 'E3', name: 'Menengah-Besar', range: '> Rp 5 Miliar/tahun', desc: 'Korporasi dengan kapasitas besar', features: ['Akses semua kursus', 'Program investasi & funding', 'Leadership APGN'] },
            ].map((level, i) => (
              <div key={i} className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getKelasInfo(level.kelas).color} opacity-10 rounded-bl-full`} />
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r ${getKelasInfo(level.kelas).color} rounded-full mb-4`}>
                  <span className="text-white font-bold">{level.kelas}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{level.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{level.range}</p>
                <p className="text-slate-600 text-sm mb-6">{level.desc}</p>
                <ul className="space-y-3">
                  {level.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Testimoni Anggota
            </h2>
            <p className="text-emerald-100">
              Apa kata mereka tentang APGN
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-white mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-emerald-200 text-sm">{t.business}</div>
                  </div>
                  <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getKelasInfo(t.kelas).color} text-white`}>
                    {t.kelas}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
            Siap Bergabung dengan Komunitas Pengusaha Muslim Terbesar?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Daftarkan diri Anda sekarang dan mulai perjalanan untuk bertumbuh bersama ribuan pengusaha muslim di seluruh Indonesia
          </p>
          <button 
            onClick={onLoginClick}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold shadow-xl shadow-emerald-200/50 hover:shadow-emerald-300/50 hover:scale-105 transition-all text-lg"
          >
            Daftar Sekarang — Gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="font-bold">APGN</span>
                <span className="text-slate-400 text-sm block">Asosiasi Pengusaha Global Nusantara</span>
              </div>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 APGN. Platform Digital untuk Pengusaha Muslim Indonesia.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// MEMBERS PAGE (PUBLIC)
// ============================================
function MembersPage({ members }) {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('Semua');
  const [cityFilter, setCityFilter] = useState('Semua');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = members.filter(m => {
    const matchSearch = m.businessName.toLowerCase().includes(search.toLowerCase()) ||
                       m.name.toLowerCase().includes(search.toLowerCase()) ||
                       m.products.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === 'Semua' || m.sector === sectorFilter;
    const matchCity = cityFilter === 'Semua' || m.city === cityFilter;
    return matchSearch && matchSector && matchCity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Direktori Anggota APGN</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Temukan dan terhubung dengan pengusaha muslim di seluruh Indonesia
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 border border-slate-100">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, bisnis, atau produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
          >
            {SECTORS.map(s => <option key={s} value={s}>{s === 'Semua' ? 'Semua Sektor' : s}</option>)}
          </select>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
          >
            {CITIES.map(c => <option key={c} value={c}>{c === 'Semua' ? 'Semua Kota' : c}</option>)}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-slate-600">
        Menampilkan <span className="font-semibold text-emerald-600">{filteredMembers.length}</span> anggota
      </div>

      {/* Members Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map(member => (
          <div 
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-slate-100 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {member.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 truncate">{member.businessName}</h3>
                <p className="text-sm text-slate-500">{member.name}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium">
                {member.sector}
              </span>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {member.city}
              </span>
            </div>
            <p className="text-sm text-slate-600 line-clamp-2">{member.description}</p>
          </div>
        ))}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Detail Anggota</h2>
              <button onClick={() => setSelectedMember(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-4xl">
                  {selectedMember.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedMember.businessName}</h3>
                  <p className="text-slate-500">{selectedMember.name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Sektor</div>
                    <div className="font-medium text-slate-800">{selectedMember.sector}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Lokasi</div>
                    <div className="font-medium text-slate-800">{selectedMember.city}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">Deskripsi</div>
                  <p className="text-slate-600">{selectedMember.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">Produk / Jasa</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.products.split(', ').map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// AUTH MODAL
// ============================================
function AuthModal({ mode, setMode, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    businessName: '',
    sector: 'F&B',
    city: 'Jakarta',
    description: '',
    products: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      // Demo login - check localStorage or use demo accounts
      if (formData.email === 'admin@apgn.id' && formData.password === 'admin123') {
        onSuccess({
          id: 'admin',
          email: formData.email,
          name: 'Admin APGN',
          role: 'admin',
          kelas: 'E3'
        });
        return;
      }
      
      const users = JSON.parse(localStorage.getItem('apgn_users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      
      if (user) {
        onSuccess(user);
      } else {
        setError('Email atau password salah. Coba: admin@apgn.id / admin123');
      }
    } else {
      // Register
      const users = JSON.parse(localStorage.getItem('apgn_users') || '[]');
      
      if (users.find(u => u.email === formData.email)) {
        setError('Email sudah terdaftar');
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        name: formData.name,
        businessName: formData.businessName,
        sector: formData.sector,
        city: formData.city,
        description: formData.description,
        products: formData.products,
        role: 'member',
        kelas: null, // Will be set after assessment
        assessmentComplete: false,
      };

      users.push(newUser);
      localStorage.setItem('apgn_users', JSON.stringify(users));
      onSuccess(newUser);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">
              {mode === 'login' ? 'Masuk ke APGN' : 'Daftar Anggota Baru'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                mode === 'login' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                mode === 'register' 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Daftar
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Bisnis</label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sektor</label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    {SECTORS.filter(s => s !== 'Semua').map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kota</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    {CITIES.filter(c => c !== 'Semua').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Bisnis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Produk/Jasa (pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={formData.products}
                  onChange={(e) => setFormData({...formData, products: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  placeholder="Produk A, Produk B, Jasa C"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all"
          >
            {mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
          </button>

          {mode === 'login' && (
            <p className="text-center text-sm text-slate-500">
              Demo: admin@apgn.id / admin123
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD PAGE
// ============================================
function DashboardPage({ user, courses, opportunities, setCurrentPage }) {
  const accessibleCourses = user.kelas 
    ? courses.filter(c => canAccessCourse(user.kelas, c.level))
    : [];

  const completedCourses = accessibleCourses.filter(c => c.progress === 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
          Assalamualaikum, {user.name?.split(' ')[0] || 'Member'}! 👋
        </h1>
        <p className="text-slate-600">Selamat datang di Platform Digital APGN</p>
      </div>

      {/* Assessment CTA if not completed */}
      {!user.kelas && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Lengkapi Self Assessment</h2>
              <p className="text-amber-100">
                Untuk mengakses kursus dan fitur lainnya, silakan lengkapi self assessment terlebih dahulu
              </p>
            </div>
            <button 
              onClick={() => setCurrentPage('assessment')}
              className="px-6 py-3 bg-white text-amber-600 rounded-xl font-semibold hover:bg-amber-50 transition-colors flex items-center gap-2"
            >
              Mulai Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      {user.kelas && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className={`w-12 h-12 bg-gradient-to-br ${getKelasInfo(user.kelas).color} rounded-xl flex items-center justify-center mb-4`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{user.kelas}</div>
            <div className="text-slate-500 text-sm">{getKelasInfo(user.kelas).name}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{accessibleCourses.length}</div>
            <div className="text-slate-500 text-sm">Kursus Tersedia</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{completedCourses}</div>
            <div className="text-slate-500 text-sm">Kursus Selesai</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-slate-800">{opportunities.length}</div>
            <div className="text-slate-500 text-sm">Peluang Aktif</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Kursus Terbaru</h2>
            <button 
              onClick={() => setCurrentPage('courses')}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {(user.kelas ? accessibleCourses.slice(0, 3) : courses.slice(0, 3)).map(course => (
              <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {course.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 truncate">{course.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${getKelasInfo(course.level).color} text-white flex-shrink-0`}>
                      {course.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{course.modules} modul • {course.duration}</p>
                  {user.kelas && canAccessCourse(user.kelas, course.level) ? (
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Lock className="w-4 h-4" />
                      Terkunci
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Peluang Terbaru</h2>
            <button 
              onClick={() => setCurrentPage('collaboration')}
              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
            >
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {opportunities.slice(0, 3).map(opp => (
              <div key={opp.id} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg font-medium">
                    {opp.category}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{opp.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  Deadline: {new Date(opp.deadline).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ASSESSMENT PAGE
// ============================================
function AssessmentPage({ user, setUser }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    omzet: '',
    employees: '',
    yearsInBusiness: '',
    hasLegalEntity: false,
    hasBPOM: false,
    hasHalal: false,
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'omzet',
      question: 'Berapa omzet tahunan bisnis Anda?',
      type: 'select',
      options: [
        { value: 'under100m', label: 'Kurang dari Rp 100 Juta', kelas: 'E1' },
        { value: '100m-1b', label: 'Rp 100 Juta - Rp 1 Miliar', kelas: 'E2' },
        { value: '1b-5b', label: 'Rp 1 Miliar - Rp 5 Miliar', kelas: 'E2' },
        { value: 'above5b', label: 'Lebih dari Rp 5 Miliar', kelas: 'E3' },
      ]
    },
    {
      id: 'employees',
      question: 'Berapa jumlah karyawan tetap bisnis Anda?',
      type: 'select',
      options: [
        { value: '0-5', label: '0 - 5 orang' },
        { value: '6-20', label: '6 - 20 orang' },
        { value: '21-100', label: '21 - 100 orang' },
        { value: 'above100', label: 'Lebih dari 100 orang' },
      ]
    },
    {
      id: 'yearsInBusiness',
      question: 'Sudah berapa lama bisnis Anda berjalan?',
      type: 'select',
      options: [
        { value: 'under1', label: 'Kurang dari 1 tahun' },
        { value: '1-3', label: '1 - 3 tahun' },
        { value: '3-5', label: '3 - 5 tahun' },
        { value: 'above5', label: 'Lebih dari 5 tahun' },
      ]
    },
    {
      id: 'certifications',
      question: 'Sertifikasi apa saja yang dimiliki bisnis Anda?',
      type: 'checkbox',
      options: [
        { id: 'hasLegalEntity', label: 'Badan Usaha (PT/CV)' },
        { id: 'hasBPOM', label: 'BPOM' },
        { id: 'hasHalal', label: 'Sertifikat Halal MUI' },
      ]
    }
  ];

  const handleAnswer = (value) => {
    const question = questions[step];
    if (question.type === 'checkbox') {
      setAnswers({ ...answers, [value]: !answers[value] });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let kelas = 'E1';
    
    // Primary classification based on omzet
    if (answers.omzet === 'above5b') {
      kelas = 'E3';
    } else if (answers.omzet === '100m-1b' || answers.omzet === '1b-5b') {
      kelas = 'E2';
    }

    setResult(kelas);

    // Update user
    const updatedUser = {
      ...user,
      kelas,
      assessmentComplete: true,
      assessmentDate: new Date().toISOString(),
      assessmentAnswers: answers,
    };

    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('apgn_users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('apgn_users', JSON.stringify(updatedUsers));
    
    setUser(updatedUser);
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 text-center">
          <div className={`w-24 h-24 bg-gradient-to-br ${getKelasInfo(result).color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
            <Award className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Selamat!</h1>
          <p className="text-slate-600 mb-6">Berdasarkan assessment Anda, klasifikasi bisnis Anda adalah:</p>
          
          <div className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${getKelasInfo(result).color} rounded-2xl mb-6`}>
            <span className="text-4xl font-bold text-white">{result}</span>
            <div className="text-left text-white">
              <div className="font-semibold">{getKelasInfo(result).name}</div>
              <div className="text-sm opacity-90">{getKelasInfo(result).description}</div>
            </div>
          </div>

          <p className="text-slate-600 mb-8">
            Anda sekarang dapat mengakses kursus dan fitur sesuai dengan kelas Anda. 
            Tingkatkan bisnis Anda untuk naik ke kelas berikutnya!
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Mulai Belajar
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-500 mb-2">
          <span>Pertanyaan {step + 1} dari {questions.length}</span>
          <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">{currentQuestion.question}</h2>

        {currentQuestion.type === 'select' && (
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium text-slate-700">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'checkbox' && (
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[option.id]
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    answers[option.id]
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-slate-300'
                  }`}>
                    {answers[option.id] && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-slate-700">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-6 py-3 text-slate-600 font-medium disabled:opacity-50"
          >
            Kembali
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion.type === 'select' && !answers[currentQuestion.id]}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all"
          >
            {step === questions.length - 1 ? 'Lihat Hasil' : 'Lanjut'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// COURSES PAGE
// ============================================
function CoursesPage({ user, courses, updateProgress }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeModule, setActiveModule] = useState(0);

  const getAccessStatus = (courseLevel) => {
    if (!user.kelas) return 'locked';
    return canAccessCourse(user.kelas, courseLevel) ? 'unlocked' : 'locked';
  };

  // Generate dummy modules for selected course
  const generateModules = (course) => {
    return Array.from({ length: course.modules }, (_, i) => ({
      id: i + 1,
      title: `Modul ${i + 1}: ${['Pengenalan', 'Konsep Dasar', 'Implementasi', 'Studi Kasus', 'Praktik', 'Evaluasi', 'Lanjutan', 'Advanced'][i % 8]}`,
      duration: `${Math.floor(Math.random() * 20 + 10)} menit`,
      type: i % 3 === 0 ? 'video' : i % 3 === 1 ? 'reading' : 'quiz',
      completed: i < Math.floor((course.progress / 100) * course.modules),
    }));
  };

  if (selectedCourse) {
    const modules = generateModules(selectedCourse);
    
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Kembali ke Daftar Kursus
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-3xl">
                  {selectedCourse.image}
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20`}>
                    Level {selectedCourse.level}
                  </span>
                  <h1 className="text-2xl font-bold mt-2">{selectedCourse.title}</h1>
                </div>
              </div>
              <p className="text-emerald-100">{selectedCourse.description}</p>
              <div className="flex gap-6 mt-4 text-sm">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {selectedCourse.modules} modul
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedCourse.duration}
                </span>
              </div>
            </div>

            {/* Video/Content Player Area */}
            <div className="bg-slate-900 rounded-2xl aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <p className="text-white/70">
                  {modules[activeModule]?.type === 'video' ? 'Video Player' : 
                   modules[activeModule]?.type === 'reading' ? 'Reading Material' : 'Quiz Section'}
                </p>
                <p className="text-white/50 text-sm mt-2">{modules[activeModule]?.title}</p>
              </div>
            </div>

            <button
              onClick={() => {
                const newProgress = Math.min(100, Math.round(((activeModule + 1) / modules.length) * 100));
                updateProgress(selectedCourse.id, newProgress);
                if (activeModule < modules.length - 1) {
                  setActiveModule(activeModule + 1);
                }
              }}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {activeModule < modules.length - 1 ? 'Selesai & Lanjut ke Modul Berikutnya' : 'Selesaikan Kursus'}
            </button>
          </div>

          {/* Modules Sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h2 className="font-bold text-slate-800 mb-4">Daftar Modul</h2>
              <div className="space-y-2 max-h-[60vh] overflow-auto">
                {modules.map((module, i) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(i)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      activeModule === i 
                        ? 'bg-emerald-50 border-2 border-emerald-500' 
                        : 'border border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        module.completed 
                          ? 'bg-emerald-500 text-white' 
                          : activeModule === i 
                            ? 'bg-emerald-100 text-emerald-600' 
                            : 'bg-slate-100 text-slate-400'
                      }`}>
                        {module.completed ? <CheckCircle className="w-4 h-4" /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{module.title}</div>
                        <div className="text-xs text-slate-500">{module.duration}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Kursus Pembelajaran</h1>
        <p className="text-slate-600">
          {user.kelas 
            ? `Akses kursus sesuai kelas ${user.kelas} Anda` 
            : 'Selesaikan assessment untuk mengakses kursus'}
        </p>
      </div>

      {/* Class Filter Info */}
      {user.kelas && (
        <div className="flex flex-wrap gap-3 mb-8">
          {['E1', 'E2', 'E3'].map(kelas => (
            <div 
              key={kelas}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
                canAccessCourse(user.kelas, kelas)
                  ? `bg-gradient-to-r ${getKelasInfo(kelas).color} text-white`
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {canAccessCourse(user.kelas, kelas) ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              <span className="font-medium">{kelas}</span>
            </div>
          ))}
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map(course => {
          const status = getAccessStatus(course.level);
          
          return (
            <div 
              key={course.id}
              onClick={() => status === 'unlocked' && setSelectedCourse(course)}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-all ${
                status === 'unlocked' 
                  ? 'hover:shadow-lg cursor-pointer' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className={`h-32 bg-gradient-to-br ${getKelasInfo(course.level).color} flex items-center justify-center text-5xl relative`}>
                {course.image}
                {status === 'locked' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${getKelasInfo(course.level).color} text-white`}>
                    {course.level}
                  </span>
                  <span className="text-xs text-slate-500">{course.duration}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2 mb-3">{course.description}</p>
                
                {status === 'unlocked' && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="font-medium text-emerald-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================
// COLLABORATION PAGE
// ============================================
function CollaborationPage({ opportunities }) {
  const [selectedOpp, setSelectedOpp] = useState(null);
  const [filter, setFilter] = useState('Semua');

  const categories = ['Semua', ...new Set(opportunities.map(o => o.category))];
  
  const filteredOpps = filter === 'Semua' 
    ? opportunities 
    : opportunities.filter(o => o.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Pusat Kolaborasi & Peluang Bisnis</h1>
        <p className="text-slate-600">Temukan peluang kolaborasi eksklusif dari jaringan APGN</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              filter === cat
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredOpps.map(opp => (
          <div 
            key={opp.id}
            onClick={() => setSelectedOpp(opp)}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-lg font-medium">
                  {opp.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Deadline</div>
                <div className="text-sm font-medium text-red-600">
                  {new Date(opp.deadline).toLocaleDateString('id-ID')}
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-slate-800 mb-2">{opp.title}</h3>
            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{opp.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-sm text-slate-500">
                Diposting oleh <span className="font-medium text-slate-700">{opp.postedBy}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Opportunity Detail Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOpp(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Detail Peluang</h2>
              <button onClick={() => setSelectedOpp(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-lg font-medium">
                  {selectedOpp.category}
                </span>
                <span className="text-sm text-slate-500">
                  Posted: {new Date(selectedOpp.date).toLocaleDateString('id-ID')}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-4">{selectedOpp.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-1">Deskripsi</div>
                  <p className="text-slate-600">{selectedOpp.description}</p>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-700 mb-1">Persyaratan</div>
                  <p className="text-slate-600">{selectedOpp.requirements}</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-red-500" />
                  <div>
                    <div className="text-sm text-red-600">Deadline</div>
                    <div className="font-semibold text-red-700">
                      {new Date(selectedOpp.deadline).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                Ajukan Minat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// ADMIN DASHBOARD
// ============================================
function AdminDashboard({ members, courses, opportunities }) {
  const membersByClass = {
    E1: members.filter(m => m.kelas === 'E1').length,
    E2: members.filter(m => m.kelas === 'E2').length,
    E3: members.filter(m => m.kelas === 'E3').length,
  };

  const totalMembers = members.length;
  const totalCourses = courses.length;
  const totalOpportunities = opportunities.length;

  const stats = [
    { label: 'Total Anggota', value: totalMembers, icon: Users, color: 'from-blue-400 to-indigo-500' },
    { label: 'Total Kursus', value: totalCourses, icon: BookOpen, color: 'from-emerald-400 to-teal-500' },
    { label: 'Peluang Aktif', value: totalOpportunities, icon: Handshake, color: 'from-amber-400 to-orange-500' },
    { label: 'Kolaborasi Tercipta', value: 127, icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Dashboard Admin APGN</h1>
        <p className="text-slate-600">Pantau statistik dan data organisasi</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
            <div className="text-slate-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Members by Class */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Distribusi Anggota per Kelas</h2>
          <div className="space-y-4">
            {Object.entries(membersByClass).map(([kelas, count]) => {
              const percentage = Math.round((count / totalMembers) * 100);
              return (
                <div key={kelas}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getKelasInfo(kelas).color} rounded-lg flex items-center justify-center text-white font-bold`}>
                        {kelas}
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">{getKelasInfo(kelas).name}</div>
                        <div className="text-sm text-slate-500">{getKelasInfo(kelas).description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">{count}</div>
                      <div className="text-sm text-slate-500">{percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${getKelasInfo(kelas).color} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Course Access Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Statistik Akses Kursus</h2>
          <div className="space-y-4">
            {courses.slice(0, 5).map(course => (
              <div key={course.id} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-xl">
                  {course.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 truncate">{course.title}</div>
                  <div className="text-sm text-slate-500">{course.modules} modul</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">{Math.floor(Math.random() * 500 + 100)}</div>
                  <div className="text-xs text-slate-500">akses</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Aktivitas Terbaru</h2>
          <div className="space-y-4">
            {[
              { action: 'Anggota baru mendaftar', user: 'Ahmad Fauzi', time: '5 menit lalu', icon: UserPlus },
              { action: 'Menyelesaikan kursus', user: 'Siti Nurhaliza', time: '15 menit lalu', icon: GraduationCap },
              { action: 'Mengajukan minat kolaborasi', user: 'Muhammad Rizki', time: '1 jam lalu', icon: Handshake },
              { action: 'Naik kelas dari E1 ke E2', user: 'Fatimah Azzahra', time: '2 jam lalu', icon: TrendingUp },
              { action: 'Menyelesaikan assessment', user: 'Umar Abdullah', time: '3 jam lalu', icon: CheckCircle },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <activity.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-800">
                    <span className="font-medium">{activity.user}</span> - {activity.action}
                  </div>
                  <div className="text-sm text-slate-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ASSUMPTIONS PAGE
// ============================================
function AssumptionsPage() {
  const assumptions = [
    {
      category: 'Klasifikasi Kelas Anggota',
      items: [
        { title: 'E1 - Pemula', desc: 'Omzet tahunan kurang dari Rp 100 Juta' },
        { title: 'E2 - UMKM', desc: 'Omzet tahunan Rp 100 Juta - Rp 5 Miliar' },
        { title: 'E3 - Menengah ke Besar', desc: 'Omzet tahunan lebih dari Rp 5 Miliar' },
        { title: 'Metode Klasifikasi', desc: 'Berdasarkan self-assessment yang diisi oleh anggota, auto-assign setelah mengisi' },
      ]
    },
    {
      category: 'Akses Kursus',
      items: [
        { title: 'Model Akses', desc: 'Bertingkat (tiered) - kelas lebih tinggi dapat mengakses semua kursus kelas di bawahnya' },
        { title: 'E1', desc: 'Hanya akses kursus level E1 (fundamental)' },
        { title: 'E2', desc: 'Akses kursus level E1 + E2' },
        { title: 'E3', desc: 'Akses semua kursus (E1 + E2 + E3)' },
      ]
    },
    {
      category: 'Profil Anggota (Public)',
      items: [
        { title: 'Ditampilkan', desc: 'Nama pemilik, nama bisnis, sektor industri, lokasi/kota, deskripsi bisnis, produk/jasa, foto/logo' },
        { title: 'TIDAK Ditampilkan', desc: 'Kontak (email/telp) dan kelas anggota - untuk privasi dan menghindari diskriminasi' },
      ]
    },
    {
      category: 'Pusat Kolaborasi',
      items: [
        { title: 'Posting Peluang', desc: 'Hanya Admin APGN yang dapat posting peluang kolaborasi' },
        { title: 'Akses Anggota', desc: 'Semua anggota dapat melihat dan mengajukan minat pada peluang' },
        { title: 'Tipe Peluang', desc: 'Supplier, distribusi, teknologi, wakaf, dan kategori lainnya' },
      ]
    },
    {
      category: 'User Roles',
      items: [
        { title: 'Public', desc: 'Akses landing page dan melihat list anggota' },
        { title: 'Anggota', desc: 'Akses self-assessment, kursus (sesuai kelas), profil, dan pusat kolaborasi' },
        { title: 'Admin APGN', desc: 'Akses dashboard statistik, manage data, posting peluang kolaborasi' },
      ]
    },
    {
      category: 'Branding & UI',
      items: [
        { title: 'Warna Utama', desc: 'Hijau Islami (Emerald/Teal) dengan aksen gold/amber' },
        { title: 'Tone', desc: 'Profesional, trustworthy, community-driven' },
        { title: 'Pattern', desc: 'Islamic geometric pattern sebagai elemen dekoratif' },
      ]
    },
    {
      category: 'Technical Implementation',
      items: [
        { title: 'Data Storage', desc: 'LocalStorage untuk simulasi database (prototype)' },
        { title: 'Authentication', desc: 'Simple email/password dengan localStorage' },
        { title: 'Demo Account', desc: 'admin@apgn.id / admin123 untuk akses admin' },
        { title: 'Framework', desc: 'React dengan Tailwind CSS' },
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full mb-4">
          <FileText className="w-4 h-4" />
          <span className="font-medium">Dokumentasi Prototype</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Asumsi & Keputusan Desain
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Halaman ini mendokumentasikan semua asumsi yang diterapkan dalam pembuatan prototype Platform Digital APGN
        </p>
      </div>

      <div className="space-y-8">
        {assumptions.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold text-sm">
                {i + 1}
              </div>
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item, j) => (
                <div key={j} className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-slate-800">{item.title}</div>
                    <div className="text-sm text-slate-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Development Notes */}
      <div className="mt-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold mb-4">📝 Catatan Pengembangan</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Prototype ini menggunakan localStorage untuk simulasi backend. Pada implementasi production, akan diganti dengan proper backend (API + Database).</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Data anggota, kursus, dan peluang menggunakan dummy data untuk demonstrasi fitur.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Fitur video player pada kursus masih placeholder, akan diintegrasikan dengan video hosting pada production.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>Semua fitur sudah functional dan dapat di-demo untuk menunjukkan flow aplikasi kepada klien.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
