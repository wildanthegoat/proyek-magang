import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KategoriTambah = () => {
  const [TambahOpen, setTambahOpen] = useState(false);
  const [kategori, setKategori] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const toggleModal = () => {
    setTambahOpen(!TambahOpen);
  };

  const saveKategori = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/kategori', {
        nama_kategori: kategori,
      });
      toggleModal();
      window.location.reload();
      navigate("/kategori");

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={toggleModal}
      >
        Tambahkan Lokasi
      </button>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 transition-opacity duration-300 ${
          TambahOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 transition-transform duration-300 transform ${
            TambahOpen ? 'scale-100' : 'scale-95'
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Tambah Kategori
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
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
            <form onSubmit={saveKategori}>
              <p className="flex items-center justify-center font-bold text-red-600 bg-neutral-50">{msg}</p>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
                  htmlFor="namaKategori"
                >
                  Nama Kategori
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="namaKategori"
                  type="text"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  placeholder="Masukkan nama Kategori"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="flex items-center justify-between focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                  </svg>
                  Tambahkan
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                  onClick={toggleModal}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KategoriTambah;
