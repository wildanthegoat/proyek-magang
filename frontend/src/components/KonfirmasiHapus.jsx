import React from 'react'

const KonfirmasiHapus = ({ show, onClose, onDelete, message, itemName }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
        <div className="relative w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Konfirmasi Hapus
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
            <p className="text-gray-700 dark:text-gray-200">
              {message} "{itemName}"?
            </p>
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="button"
                className="ml-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-800"
                onClick={onDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default KonfirmasiHapus