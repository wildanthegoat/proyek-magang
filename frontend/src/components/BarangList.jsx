import axios from "axios";
import React, { useEffect, useState } from "react";
import BarangTambah from "./BarangTambah";
import { useSelector } from "react-redux";
import KonfirmasiHapus from "./KonfirmasiHapus";
import BarangDetail from "./BarangDetail"; // Import BarangDetailModal
import BarangEdit from "./BarangEdit";

const BarangList = () => {
  const [barang, setBarang] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    try {
      const response = await axios.get("http://localhost:5000/barang");
      setBarang(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBarang = async (barangId) => {
    await axios.delete(`http://localhost:5000/barang/${barangId}`);
    getBarang();
    setShowDeleteModal(false); // Tutup modal setelah penghapusan
  };

  const getBarangById = async (barangId) => {
    await axios.get(`http://localhost:5000/barang/${barangId}`);
    getBarang();
    setShowDetailModal(false); // Tutup modal setelah penghapusan
  };

  const handleDeleteClick = (barang) => {
    setSelectedBarang(barang);
    setShowDeleteModal(true); // Tampilkan modal konfirmasi
  };

  const handleDetailClick = (barang) => {
    setSelectedBarang(barang);
    setShowDetailModal(true); // Tampilkan modal detail
  };

  const handleEditClick = (barang) => {
    setSelectedBarang(barang);
    setShowEditModal(true); // Tampilkan modal edit
  };

  const filteredBarang = barang.filter((kat) =>
    kat.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(barang.length / itemsPerPage);
  const currentItems = filteredBarang.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="mt-11 relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Data Barang
        </h1>
        <div className="relative flex ml-auto p-2">
            <input
              type="text"
              id="default-search"
              placeholder="Search by Nama Kategori"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        {user && (user.role === "admin" || user.role === "super admin") && (
          <BarangTambah />
        )}
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nama Barang
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Jumlah</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Kategori</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Lokasi</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center">Created By</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((barang, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {barang.nama_barang}
              </th>
              <td className="px-6 py-4 font-black">{barang.jumlah}</td>
              <td className="px-6 py-4">{barang.kategori.nama_kategori}</td>
              <td className="px-6 py-4">{barang.lokasi.kampus}</td>
              <td className="px-6 py-4">{barang.user.username}</td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDeleteClick(barang)}
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDetailClick(barang)}
                  type="button"
                  className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Detail
                </button>
                <button
                  onClick={() => handleEditClick(barang)}
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
      <div className="flex flex-col md:flex-row justify-between items-center p-2">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing Page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}
            </span> 
            {" "}of{" "} 
            <span class="font-semibold text-gray-900 dark:text-white">
              {totalPages}
            </span>{" "}Pages
          </span>
          <div className="inline-flex ">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-700 bg-gray-200 rounded-s border-gray-600 hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 focus:z-10"
            >
              Prev
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-700 bg-gray-200 rounded-e border-gray-600  hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 focus:z-10"
            >
              Next
            </button>
          </div>
        </div>
      <KonfirmasiHapus
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => deleteBarang(selectedBarang.uuid)}
        message="Apakah Anda yakin ingin menghapus Barang"
        itemName={selectedBarang?.nama_barang}
      />
      <BarangDetail
        show={showDetailModal}
        onClick={() => getBarangById(selectedBarang.uuid)}
        onClose={() => setShowDetailModal(false)}
        barang={selectedBarang}
      />
      <BarangEdit
          barangId={selectedBarang?.uuid}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={getBarang}
        />
    </div>
  );
};

export default BarangList;
