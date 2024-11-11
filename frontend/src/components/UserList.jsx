import React, { useEffect, useState } from 'react';
import Layout from "../pages/Layout";
import { useSelector } from "react-redux";
import axios from 'axios';
import UserTambah from './UserTambah';
import KonfirmasiHapus from './KonfirmasiHapus';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const {user} = useSelector((state) => state.auth);
  const [selectedUsers, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
  };

  const deleteUser = async (usersId) => {
    await axios.delete(`http://localhost:5000/users/${usersId}`);
    setShowModal(false); // Menutup modal konfirmasi
    getUsers();
  };

  const handleDeleteClick = (users) => {
  setSelectedUser(users);
  setShowModal(true); // Tampilkan modal konfirmasi
  };
  return (
    <Layout>
      <div className="mt-11 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-3">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Data User</h1>
          <UserTambah />
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
            {users.map((users, index)=> (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {users.username}
              </th>
              <td className="px-6 py-4">{users.name}</td>
              <td className="px-6 py-4">{users.role}</td>
              <td className="px-6 py-4">{users.divisi}</td>
              <td className="px-6 py-4 text-right">
              <button
                    onClick={() => handleDeleteClick(users)}
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
        onDelete={() => deleteUser(selectedUsers.uuid)}
        message="Barang yang di-Input oleh User ini akan ikut terhapus,
                Apakah Anda yakin ingin menghapus User"
        itemName={selectedUsers?.username}
      />
      </div>
    </Layout>
  );
};

export default UserList;
