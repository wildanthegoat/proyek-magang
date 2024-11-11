import React, { useEffect } from 'react';
import { FaBox, FaUsers } from 'react-icons/fa';
import Layout from './Layout';
import { FaLocationDot, FaCubes } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <div className="container -mx-2 py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
          {/* Card for Data Barang */}
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaBox className="text-5xl text-blue-600" />
                <h1 className="mt-2 mb-2 ml-3 text-2xl font-bold text-gray-800 dark:text-white">Data Barang</h1>
              </div>
              <p className="text-meta-3 text-2xl font-bold">3</p>
            </div>
          </div>

          {/* Card for Lokasi */}
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaLocationDot className="text-5xl text-green-600" />
                <h3 className="mt-2 mb-2 ml-3 text-2xl font-bold text-gray-800 dark:text-white">Lokasi</h3>
              </div>
              <p className="text-meta-1 text-2xl font-bold">3</p>
            </div>
          </div>

          {/* Card for Kategori */}
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaCubes className="text-5xl text-red-600" />
                <h3 className="mt-2 mb-2 ml-3 text-2xl font-bold text-gray-800 dark:text-white">Kategori</h3>
              </div>
              <p className="text-meta-1 text-2xl font-bold">3</p>
            </div>
          </div>

          {/* Card for Data User */}
          <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaUsers className="text-5xl text-yellow-600" />
                <h3 className="mt-2 mb-2 ml-3 text-2xl font-bold text-gray-800 dark:text-white">Data User</h3>
              </div>
              <p className="text-meta-1 text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
