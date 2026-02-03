// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/navtop";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import OwnerList from "./pages/ownerlist";
import Registrations from "./pages/registration";
import Community from "./pages/comunity";
import Products from "./pages/product";
import Reports from "./pages/reports";
import Experts from "./pages/experts";
import Admins from "./pages/admins";
import Data from "./pages/data";
import DataExportPage from "./pages/DataExportPage";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto ">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/owner" element={<OwnerList />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/community" element={<Community />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/data" element={<Data />} />
          <Route path="/export-data" element={<DataExportPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
