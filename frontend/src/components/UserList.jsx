import React, { useEffect, useState } from 'react';
import Layout from "../pages/Layout";
import { useSelector } from "react-redux";
import axios from 'axios';
import UserTambah from './UserTambah';
import KonfirmasiHapus from './KonfirmasiHapus';
import UserEdit from './UserEdit';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("")
  const itemsPerPage = 5;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    setShowDeleteModal(false); // Menutup modal konfirmasi
    getUsers();
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true); // Tampilkan modal konfirmasi
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true); // Tampilkan modal edit
  };

  const filteredUser = users.filter((kat) =>
    kat.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentItems = filteredUser.slice(
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
    <Layout>
      <div className="mt-11 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data User</h1>
          <div className="relative flex ml-auto p-2">
          <input
              type="text"
              id="default-search"
              placeholder="Search by Username"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <UserTambah refreshUsers={getUsers} />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Nama User</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Divisi</th>
              <th scope="col" className="px-8 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.divisi}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDeleteClick(user)}
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(user)}
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
          onDelete={() => deleteUser(selectedUser.uuid)}
          message="Barang yang di-Input oleh User ini akan ikut terhapus,
                Apakah Anda yakin ingin menghapus User"
          itemName={selectedUser?.username}
        />
        <UserEdit
          userId={selectedUser?.uuid}
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={getUsers}
        />
      </div>
    </Layout>
  );
};

export default UserList;
