import React, { useState } from 'react';

const LocationDetails = ({ location, isOpen, onToggle }) => {
  return (
    <div className="border rounded-md mb-4">
      <button
        type="button"
        className="w-full flex justify-between items-center p-3 hover:bg-gray-50"
        onClick={onToggle}
      >
        <span className="font-medium">Location Details</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t bg-gray-50">
          <div className="space-y-4">
            <div>
              <p className="font-medium">123 This Road</p>
              <p>City, State, 55555</p>
            </div>
            <div>
              <p className="text-gray-600">904-555-5555</p>
              <p className="text-gray-600">email@address.com</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Requirements/Notes:</p>
              <p className="text-sm text-blue-600">
                This is an example of the requirements and notes. It would be read-only and pulled in from the "Locations" meta (need to capture info).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PickupLocation = ({ location, index, onDelete }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="border rounded-md p-4 mb-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        </div>
        <span className="text-lg font-medium">{index + 1}</span>
        <select
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={location.address}
          onChange={() => {}}
        >
          <option value="">[Location #{index + 1}]</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <input
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={location.date}
          onChange={() => {}}
        />
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={location.startTime}
            onChange={() => {}}
          >
            <option value="09:00 PM">09:00 PM</option>
          </select>
          <span>-</span>
          <select
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={location.endTime}
            onChange={() => {}}
          >
            <option value="12:00 AM">12:00 AM</option>
          </select>
        </div>
      </div>

      <LocationDetails
        location={location}
        isOpen={isDetailsOpen}
        onToggle={() => setIsDetailsOpen(!isDetailsOpen)}
      />

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-2">
          <div className={`w-4 h-4 rounded-full ${location.confirmed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          <span className="font-medium">Confirmed</span>
        </div>
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="#########"
          value={location.confirmationNumber}
          onChange={() => {}}
        />
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
          onClick={() => onDelete(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const PickupTab = ({ formData, setFormData }) => {
  const [locations, setLocations] = useState([
    {
      address: '',
      date: '',
      startTime: '',
      endTime: '',
      confirmed: false,
      confirmationNumber: '',
    }
  ]);

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        address: '',
        date: '',
        startTime: '',
        endTime: '',
        confirmed: false,
        confirmationNumber: '',
      }
    ]);
  };

  const deleteLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {locations.map((location, index) => (
        <PickupLocation
          key={index}
          location={location}
          index={index}
          onDelete={deleteLocation}
        />
      ))}
      
      <button
        type="button"
        onClick={addLocation}
        className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 flex items-center justify-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Another Location
      </button>
    </div>
  );
};

export default PickupTab; 