import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BarangDetail = ({ show, onClose, barang }) => {
  if (!show) {
    return null;
  }
  
  console.log('Barang:', barang);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
    <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
      <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Detail Barang
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
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Nama Barang</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              value={barang.nama_barang}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Jumlah</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="number"
              value={barang.jumlah}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Deskripsi</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              value={barang.deskripsi}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Kondisi</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="text"
              value={barang.kondisi}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Tanggal Masuk</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="date"
              value={barang.tanggal_masuk}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">Tanggal Keluar</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="date"
              value={barang.tanggal_keluar}
              readOnly
            />
          </div>
        </div>
        <div className="flex justify-end items-center p-4 dark:border-gray-600">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
      </div>
  );
};

export default BarangDetail;
