import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiXCircle } from 'react-icons/fi';

const ReceiptScanner = ({ onScanComplete, onCancel }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png'] } });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      const response = await axios.post('http://localhost:5000/api/expenses/scan-receipt', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Scan successful:', response.data);
      onScanComplete(response.data.expense); // Pass the new expense to a parent component
    } catch (err) {
      console.error('Scan failed:', err);
      setError('Failed to process receipt. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setExtractedData(null);
    onCancel();
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Scan Receipt</h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
          <FiXCircle size={24} />
        </button>
      </div>

      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-400 bg-gray-700' : 'border-gray-600 hover:border-blue-400'}`}>
        <input {...getInputProps()} />
        {file ? (
          <div>
            <p className="font-semibold">File selected: {file.name}</p>
            <p className="text-sm text-gray-400">Click or drag another file to replace.</p>
          </div>
        ) : (
          <div>
            <FiUpload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="font-semibold">Drag & drop a receipt image here, or click to select one.</p>
            <p className="text-xs text-gray-400 mt-1">Accepted formats: .jpg, .png</p>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`bg-blue-500 text-white px-6 py-2 rounded-full font-semibold transition-transform duration-200 ${!file || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          {loading ? 'Scanning...' : 'Upload & Scan'}
        </button>
      </div>
    </div>
  );
};

export default ReceiptScanner;