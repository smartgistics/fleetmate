import React, { useState, useEffect } from 'react';

interface AddCarrierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddCarrierModal: React.FC<AddCarrierModalProps> = ({ isOpen, onClose, onSubmit }) => {
  useEffect(() => {
    console.log('Modal isOpen:', isOpen); // Debug log
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: '',
    mcNumber: '',
    dotNumber: '',
    equipmentTypes: [] as string[],
    safetyRating: '',
    contactName: '',
    phone: '',
    email: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form...', formData); // Debug log
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Carrier</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Carrier Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="mcNumber" className="block text-sm font-medium text-gray-700">
                MC Number
              </label>
              <input
                type="text"
                id="mcNumber"
                name="mcNumber"
                value={formData.mcNumber}
                onChange={(e) => setFormData({...formData, mcNumber: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="dotNumber" className="block text-sm font-medium text-gray-700">
                DOT Number
              </label>
              <input
                type="text"
                id="dotNumber"
                name="dotNumber"
                value={formData.dotNumber}
                onChange={(e) => setFormData({...formData, dotNumber: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="safetyRating" className="block text-sm font-medium text-gray-700">
                Safety Rating
              </label>
              <select
                id="safetyRating"
                name="safetyRating"
                value={formData.safetyRating}
                onChange={(e) => setFormData({...formData, safetyRating: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="">Select Rating</option>
                <option value="Satisfactory">Satisfactory</option>
                <option value="Conditional">Conditional</option>
                <option value="Unsatisfactory">Unsatisfactory</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Carrier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarrierModal; 