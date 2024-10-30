import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers } from 'react-icons/fa';
import { FaLocationDot, FaCubes } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <div>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <p className="font-medium text-gray-600">General</p>
            <li>
              <NavLink to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group"
              >
                <FaTachometerAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                <span className="ml-3 group-hover:text-white">Dashboard</span>
              </NavLink>
            </li>
            <p className="font-medium text-gray-600">Data</p>
            <li>
              <NavLink to="/barang"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group"
              >
                <FaBox className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                <span className="ml-3 group-hover:text-white">Barang</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/kategori"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group"
              >
                <FaCubes className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                <span className="ml-3 group-hover:text-white">Kategori</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/lokasi"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group"
              >
                <FaLocationDot className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                <span className="ml-3 group-hover:text-white">Lokasi</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700 group"
              >
                <FaUsers className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                <span className="ml-3 group-hover:text-white">Users</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;