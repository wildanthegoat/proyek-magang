import React, { useState, useEffect } from 'react';
import Layout from "../pages/Layout";
import axios from 'axios';
import LokasiTambah from './LokasiTambah';
import { useSelector } from 'react-redux';
import KonfirmasiHapus from './KonfirmasiHapus';
import LokasiEdit from './LokasiEdit';

const LokasiList = () => {
  const [lokasi, setLokasi] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedLokasi, setSelectedLokasi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getLokasi();
  }, []);

  const getLokasi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/lokasi');
      setLokasi(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLokasi = async (lokasiId) => {
    try {
      await axios.delete(`http://localhost:5000/lokasi/${lokasiId}`);
      getLokasi();
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (lokasi) => {
    setSelectedLokasi(lokasi);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (lokasi) => {
    setSelectedLokasi(lokasi);
    setShowModal(true); // Show confirmation modal
  };

  return (
    <Layout>
      <div className="mt-11 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data Lokasi</h1>
          {user && (user.role === "admin" || user.role === "super admin") && (
            <LokasiTambah />
          )}
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nama Kampus</th>
              <th scope="col" className="px-6 py-3">Gedung</th>
              <th scope="col" className="px-6 py-3">Ruangan</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {lokasi.map((lokasi, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {lokasi.kampus}
                </th>
                <td className="px-6 py-4">{lokasi.gedung}</td>
                <td className="px-6 py-4">{lokasi.ruangan}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDeleteClick(lokasi)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openEditModal(lokasi)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <KonfirmasiHapus
          show={showModal}
          onClose={() => setShowModal(false)}
          onDelete={() => deleteLokasi(selectedLokasi.uuid)}
          message="Barang yang ada di Lokasi ini akan ikut terhapus, Apakah Anda yakin ingin menghapus Lokasi"
          itemName={selectedLokasi?.kampus}
        />
      </div>
      {isEditModalOpen && (
        <LokasiEdit
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          lokasi={selectedLokasi}
          refreshLokasi={getLokasi}
        />
      )}
    </Layout>
  );
};

export default LokasiList;
