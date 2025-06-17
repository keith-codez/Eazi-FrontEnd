import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const Step1UploadID = ({ onNext, onChange, formData, customerId }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState(formData.drivers_license || '');

  useEffect(() => {
    // Pre-fill the filename if already exists
    setFileName(formData.drivers_license || '');
  }, [formData.drivers_license]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("drivers_license", file);

    setUploading(true);
    setError(null);

    try {
      await axiosInstance.patch("customers/me/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onChange("drivers_license", file.name); // or file URL if returned from backend
      setFileName(file.name);
      onNext();
    } catch (err) {
      console.error(err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleReplaceClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Upload Driver's License</h2>
        <p className="text-sm text-gray-500 mb-4">Please upload a clear image or PDF of your valid driver's license.</p>
      </div>

      {fileName ? (
        <div className="space-y-3">
          <p className="text-sm text-green-700">
            ✅ Driver's license already uploaded: <strong>{fileName}</strong>
          </p>
          <button
            onClick={handleReplaceClick}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition"
          >
            <UploadCloud className="w-4 h-4 mr-2" />
            Replace License
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition">
            <UploadCloud className="w-4 h-4 mr-2" />
            Upload File
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}

      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Step1UploadID;
