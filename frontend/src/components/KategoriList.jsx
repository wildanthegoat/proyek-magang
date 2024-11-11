import React, { useEffect, useState } from 'react';
import Layout from "../pages/Layout";
import KategoriTambah from './KategoriTambah';
import { useSelector } from 'react-redux';
import axios from 'axios';
import KonfirmasiHapus from './KonfirmasiHapus';

const KategoriList = () => {
  const [kategori, setKategori] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null);

  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    try {
      const response = await axios.get('http://localhost:5000/kategori');
      setKategori(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (kategori) => {
    setSelectedKategori(kategori);
    setShowModal(true); // Tampilkan modal konfirmasi
  };

  const deleteKategori = async (kategoriId) => {
    await axios.delete(`http://localhost:5000/kategori/${kategoriId}`);
    getKategori();
    setShowModal(false);
  };

  const handleAddKategori = (newKategori) => {
    setKategori((prevKategori) => [...prevKategori, newKategori]);
  };

  return (
    <Layout>
      <div className="mt-11 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data Kategori</h1>
          {user && (user.role === "admin" || user.role === "super admin") && (
            <KategoriTambah onAddKategori={handleAddKategori} />
          )}
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nama Kategori</th>
              <th scope="col" className="px-8 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {kategori.map((kategori, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {kategori.nama_kategori}
                </th>
                <td className="px-6 py-4 text-right">
                  <button
                     onClick={() => handleDeleteClick(kategori)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
        <KonfirmasiHapus
        show={showModal}
        onClose={() => setShowModal(false)}
        onDelete={() => deleteKategori(selectedKategori.uuid)}
        message="Barang yang ada di Kategori ini akan ikut terhapus,
                Apakah Anda yakin ingin menghapus kategori"
        itemName={selectedKategori?.nama_kategori}
      />
    </div>
    </Layout>
  );
};

export default KategoriList;