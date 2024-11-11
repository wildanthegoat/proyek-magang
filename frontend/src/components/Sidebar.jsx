import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaUsers } from 'react-icons/fa';
import { FaLocationDot, FaCubes } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <p className="font-medium text-gray-600">General</p>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FaTachometerAlt className={({ isActive }) =>
                  `w-5 h-5 transition duration-75 group-hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                  }`}
                />
                <span className="ml-3 group-hover:text-white">Dashboard</span>
              </NavLink>
            </li>
            <p className="font-medium text-gray-600">Data</p>
            <li>
              <NavLink
                to="/barang"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FaBox className={({ isActive }) =>
                  `w-5 h-5 transition duration-75 group-hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                  }`}
                />
                <span className="ml-3 group-hover:text-white">Barang</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kategori"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FaCubes className={({ isActive }) =>
                  `w-5 h-5 transition duration-75 group-hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                  }`}
                />
                <span className="ml-3 group-hover:text-white">Kategori</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/lokasi"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg group ${
                    isActive ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FaLocationDot className={({ isActive }) =>
                  `w-5 h-5 transition duration-75 group-hover:text-white ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                  }`}
                />
                <span className="ml-3 group-hover:text-white">Lokasi</span>
              </NavLink>
            </li>
            {user && user.role === "super admin" && (
              <div>
                <li>
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      `flex items-center p-2 rounded-lg group ${
                        isActive ? 'text-white bg-blue-600' : 'text-gray-900 dark:text-white hover:bg-blue-600 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    <FaUsers className={({ isActive }) =>
                      `w-5 h-5 transition duration-75 group-hover:text-white ${
                        isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 dark:group-hover:text-white'
                      }`}
                    />
                    <span className="ml-3 group-hover:text-white">Users</span>
                  </NavLink>
                </li>
              </div>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
