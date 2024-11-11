import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BarangTambah = () => {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [barang, setBarang] = useState("");
    const [jumlah, setJumlah] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [masuk, setMasuk] = useState("");
    const [keluar, setKeluar] = useState("");
    const [kondisi, setKondisi] = useState("");
    const [lokasiUUID, setLokasiUUID] = useState("");
    const [kategori, setKategori] = useState("");
    const [msg, setMsg] = useState("");
    const [lokasiOptions, setLokasiOptions] = useState([]);
    const [kategoriOptions, setKategoriOptions] = useState([]);
  
    const navigate = useNavigate();
  
    const toggleModal = () => {
      setTambahOpen(!TambahOpen);
    };
  
    const fetchLokasi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/lokasi");
        console.log("Fetched lokasi data:", response.data); // Log the fetched data
        setLokasiOptions(response.data);
      } catch (error) {
        console.error("Error fetching lokasi:", error);
      }
    };
  
    const fetchKategori = async () => {
      try {
        const response = await axios.get("http://localhost:5000/kategori");
        console.log("Fetched kategori data:", response.data); // Log the fetched data
        setKategoriOptions(response.data);
      } catch (error) {
        console.error("Error fetching kategori:", error);
      }
    };
  
    useEffect(() => {
      fetchLokasi();
      fetchKategori();
    }, []);
  
    const saveBarang = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/barang", {
          nama_barang: barang,
          jumlah: jumlah,
          deskripsi: deskripsi,
          tanggal_masuk: masuk,
          tanggal_keluar: keluar,
          kondisi: kondisi,
          lokasiKampusUUID: lokasiUUID, // Match the backend parameter name
          kategoriNama: kategori // Match the backend parameter name
        });
        console.log("Response:", response.data);
        window.location.reload();
        navigate("/barang");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
      toggleModal();
    };

  return (
    <div>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={toggleModal}
      >
        Tambahkan Barang
      </button>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${
          TambahOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 transition-transform duration-300 transform ${
            TambahOpen ? "scale-100" : "scale-95"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Tambah Barang
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            <form onSubmit={saveBarang} className="">
              {msg && (
                <p className="flex items-center justify-center font-bold text-red-600 bg-neutral-50">
                  {msg}
                </p>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Nama Barang
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  value={barang}
                  onChange={(e) => setBarang(e.target.value)}
                  placeholder="Masukkan nama Barang"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Jumlah
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="number"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  min="1"
                  max={100}
                  maxLength={3}
                  placeholder="Masukkan jumlah barang"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Kondisi
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={kondisi}
                  onChange={(e) => setKondisi(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih kondisi barang
                  </option>
                  <option value="Baik">Baik</option>
                  <option value="Rusak">Rusak</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Tanggal Masuk
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="date"
                  value={masuk}
                  onChange={(e) => setMasuk(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Tanggal Keluar
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="date"
                  value={keluar}
                  onChange={(e) => setKeluar(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                  htmlFor="deskripsiBarang"
                >
                  Deskripsi
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  rows="3"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan deskripsi barang"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Lokasi
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={lokasiUUID}
                  onChange={(e) => setLokasiUUID(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Lokasi
                  </option>
                  {lokasiOptions.map((item) => (
                    <option key={item.id} value={item.uuid}>
                      {`${item.kampus} - ${item.gedung} - ${item.ruangan}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                  htmlFor="kategoriBarang"
                >
                  Kategori
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {kategoriOptions.map((item) => (
                    <option key={item.id} value={item.nama_kategori}>
                      {item.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center  dark:border-gray-600">
                  <button
                    type="submit"
                    className="flex items-center focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                    </svg>
                    Tambahkan
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    onClick={toggleModal}
                  >
                    Batal
                  </button>
                </div>
              
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BarangTambah;