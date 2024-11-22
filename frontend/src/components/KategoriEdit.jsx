import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KategoriEdit = ({ isOpen, onClose, kategori, refreshKategori }) => {
  const [namaKategori, setNamaKategori] = useState('');

  useEffect(() => {
    if (kategori) {
      setNamaKategori(kategori.nama_kategori);
    }
  }, [kategori]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/kategori/${kategori.uuid}`, {
        nama_kategori: namaKategori
      });
      refreshKategori();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Edit Kategori
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
        <div className="p-6 space-y-6">
          <form onSubmit={handleSave}>
            <div className='mb-4'>
          <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                  htmlFor="namaKategori"
                >
                  Nama Kategori
                  </label>
              <input
                type="text"
                value={namaKategori}
                onChange={(e) => setNamaKategori(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              />
            
            </div>
            <div className="flex justify-between space-x-2">
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
    </div>
  );
};

export default KategoriEdit;
