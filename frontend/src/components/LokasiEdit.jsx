import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LokasiEdit = ({ isOpen, onClose, lokasi, refreshLokasi }) => {
  const [kampus, setKampus] = useState('');
  const [gedung, setGedung] = useState('');
  const [ruangan, setRuangan] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (lokasi) {
      setKampus(lokasi.kampus);
      setGedung(lokasi.gedung);
      setRuangan(lokasi.ruangan);
    }
  }, [lokasi]);

  const navigate = useNavigate();

  const updateLokasi = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/lokasi/${lokasi.id}`, {
        kampus: kampus,
        gedung: gedung,
        ruangan: ruangan
      });
      refreshLokasi();
      onClose();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={onClose}></div>
      <div className="flex items-center min-h-screen">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-between items-center p-5 text-center ">
            <h3 className="text-lg font-medium text-gray-800">Edit Lokasi</h3>
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
            <form onSubmit={updateLokasi}>
              <p className=''>{msg}</p>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="kampus">
                  Nama Kampus
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="kampus"
                  type="text"
                  value={kampus}
                  onChange={(e) => setKampus(e.target.value)}
                  placeholder="Masukkan nama Kampus"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="gedung">
                  Nama Gedung
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="gedung"
                  type="text"
                  value={gedung}
                  onChange={(e) => setGedung(e.target.value)}
                  placeholder="Masukkan nama Gedung"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="ruangan">
                  Nama Ruangan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="ruangan"
                  type="text"
                  value={ruangan}
                  onChange={(e) => setRuangan(e.target.value)}
                  placeholder="Masukkan nama Ruangan"
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
                  Simpan
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                  onClick={onClose}
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

export default LokasiEdit;
