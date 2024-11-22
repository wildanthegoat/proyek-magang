import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserEdit = ({ userId, show, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [divisi, setDivisi] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        const userData = response.data;
        setName(userData.name);
        setUsername(userData.username);
        setRole(userData.role);
        setDivisi(userData.divisi);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId && show) fetchUser();
  }, [userId, show]);

  if (!show) return null;

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        name,
        username,
        password,
        confPassword,
        role,
        divisi
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
      <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit User
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:bg-gray-200 rounded-lg p-1.5 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={updateUser}>
          <p className="flex items-center justify-center font-bold text-red-600 bg-neutral-50">{msg}</p>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Nama
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
                  Konfirmasi Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="Konfirmasi Password"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih role user
                  </option>
                  <option value="super admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                >
                  Divisi
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  value={divisi}
                  onChange={(e) => setDivisi(e.target.value)}
                  placeholder="Masukkan Divisi"
                />
              </div>
            
            {/* Other form fields for username, password, role, etc. */}
            <div className="flex justify-between mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Update
              </button>
              <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;