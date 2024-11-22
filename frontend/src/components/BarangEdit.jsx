import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarangEdit = ({ show, onClose, onSave, barangId }) => {
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
  
  
  const fetchLokasi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lokasi");
      setLokasiOptions(response.data);
    } catch (error) {
      console.error("Error fetching lokasi:", error);
    }
  };

  const fetchKategori = async () => {
    try {
      const response = await axios.get("http://localhost:5000/kategori");
      setKategoriOptions(response.data);
    } catch (error) {
      console.error("Error fetching kategori:", error);
    }
  };

  const fetchBarangDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/barang/${id}`);
      const data = response.data;
      setBarang(data.nama_barang);
      setJumlah(data.jumlah);
      setDeskripsi(data.deskripsi);
      setMasuk(data.tanggal_masuk);
      setKeluar(data.tanggal_keluar);
      setKondisi(data.kondisi);
      setLokasiUUID(data.lokasiKampusUUID);
      setKategori(data.kategoriNama);
    } catch (error) {
      console.error("Error fetching barang details:", error);
    }
  };

  useEffect(() => {
    fetchLokasi();
    fetchKategori();
    if (barangId) {
      fetchBarangDetails(barangId);
    }
  }, [barangId]);

  if (!show) return null;

  const saveBarang = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/barang/${barangId}`, {
        nama_barang: barang,
        jumlah: jumlah,
        deskripsi: deskripsi,
        tanggal_masuk: masuk,
        tanggal_keluar: keluar,
        kondisi: kondisi,
        lokasiKampusUUID: lokasiUUID, // Match the backend parameter name
        kategoriNama: kategori, // Match the backend parameter name
      });
      onSave();
      onClose();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Barang
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={onClose}
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
        <form onSubmit={saveBarang}>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Jumlah
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="number"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  min="1"
                  max="100"
                  maxLength="3"
                  placeholder="Masukkan jumlah barang"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
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
                  <option value="Dibuang">Dibuang</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Deskripsi
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Masukkan Deskripsi"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Lokasi
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={lokasiUUID}
                  onChange={(e) => setLokasiUUID(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih lokasi barang
                  </option>
                  {lokasiOptions.map((lokasi) => (
                    <option key={lokasi.uuid} value={lokasi.uuid}>
                      {`${lokasi.kampus} - ${lokasi.gedung} - ${lokasi.ruangan}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Kategori
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih kategori barang
                  </option>
                  {kategoriOptions.map((kategori) => (
                    <option key={kategori.uuid} value={kategori.nama_kategori}>
                      {kategori.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>          
          <div className="flex justify-between space-x-2 p-4">
              <button
                type="submit"
                className="flex items-center justify-between focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
            
            </div>
        </form>
      </div>
    </div>
  );
};

export default BarangEdit;
