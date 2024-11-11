import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard.jsx";
import BarangList from "./components/BarangList.jsx";
import Login from "./components/Login.jsx";
import LokasiList from "./components/LokasiList.jsx";
import KategoriList from "./components/KategoriList.jsx";
import UserList from "./components/UserList.jsx";
import Barang from "./pages/Barang.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/barang" element={<Barang/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/lokasi" element={<LokasiList/>}/>
          <Route path="/kategori" element={<KategoriList/>}/>
          <Route path="/users" element={<UserList/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
