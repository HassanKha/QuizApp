import React from 'react';
import { FaTimes, FaCheck, FaSpinner } from 'react-icons/fa';

interface DeleteModalProps {
  show: boolean; 
  onClose: () => void; 
  onDeleteConfirm: () => void; 
  title: string; 
 
  loading: boolean; 
}

export default function DeleteModal({ show, onClose, onDeleteConfirm, title, loading }: DeleteModalProps) {
  if (!show) {
    return null; 
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-black">
            {title} 
          </h3>
          <div className="flex items-center gap-4">
            <button
              type='button'
              onClick={onDeleteConfirm} 
              disabled={loading}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              {loading ? <FaSpinner className="animate-spin" /> : <FaCheck className="text-xl" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        
        <div className="p-6 h-[300px] text-center text-gray-700">
          
        </div>
      </div>
    </div>
  );
}