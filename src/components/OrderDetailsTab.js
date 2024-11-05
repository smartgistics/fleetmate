import React from 'react';

const OrderDetailsTab = ({ formData, setFormData }) => {
  return (
    <div className="space-y-6">
      {/* First Row: Contract Type and Equipment Type */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contract Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.contractType}
            onChange={(e) => setFormData({...formData, contractType: e.target.value})}
          >
            <option value="">Select contract type</option>
            <option value="Contract Primary">Contract Primary</option>
            <option value="Contract Secondary">Contract Secondary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Equipment Type
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.equipmentType}
            onChange={(e) => setFormData({...formData, equipmentType: e.target.value})}
          >
            <option value="">Select equipment type</option>
            <option value="Truckload">Truckload</option>
            <option value="LTL">LTL</option>
            <option value="Reefer">Reefer</option>
          </select>
        </div>
      </div>

      {/* Second Row: Service Level and Temperature Control */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Level
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.serviceLevel}
            onChange={(e) => setFormData({...formData, serviceLevel: e.target.value})}
          >
            <option value="">Select service level</option>
            <option value="Standard">Standard</option>
            <option value="Expedited">Expedited</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature Control
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.temperatureControlled}
            onChange={(e) => {
              const isTemp = e.target.value === 'true';
              setFormData({
                ...formData, 
                temperatureControlled: isTemp,
                tempMin: isTemp ? formData.tempMin : '',
                tempMax: isTemp ? formData.tempMax : ''
              });
            }}
          >
            <option value="false">No Temperature Control</option>
            <option value="true">Temperature Controlled</option>
          </select>
        </div>
      </div>

      {/* Temperature Range (shows only when Temperature Controlled is selected) */}
      {formData.temperatureControlled && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Temperature Range (°F)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                placeholder="Min"
                value={formData.tempMin}
                onChange={(e) => setFormData({...formData, tempMin: e.target.value})}
              />
              <span>-</span>
              <input
                type="number"
                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                placeholder="Max"
                value={formData.tempMax}
                onChange={(e) => setFormData({...formData, tempMax: e.target.value})}
              />
              <span>°F</span>
            </div>
          </div>
        </div>
      )}

      {/* Commodities Section */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add the commodities attached to this order</h3>
        <div className="space-y-4">
          <div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={formData.commodityCode}
              onChange={(e) => setFormData({...formData, commodityCode: e.target.value})}
            >
              <option value="">Commodity Code and Description</option>
              <option value="code1">Food Products</option>
              <option value="code2">Electronics</option>
              <option value="code3">Machinery</option>
            </select>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Weight"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
              <span className="text-xs text-gray-500">lbs</span>
            </div>
            <div>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Pieces"
                value={formData.pieces}
                onChange={(e) => setFormData({...formData, pieces: e.target.value})}
              />
            </div>
            <div>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Pallets"
                value={formData.pallets}
                onChange={(e) => setFormData({...formData, pallets: e.target.value})}
              />
            </div>
            <div>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Cube"
                value={formData.cube}
                onChange={(e) => setFormData({...formData, cube: e.target.value})}
              />
            </div>
            <div>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Volume"
                value={formData.volume}
                onChange={(e) => setFormData({...formData, volume: e.target.value})}
              />
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Added Commodities List */}
        {formData.commodities && formData.commodities.length > 0 && (
          <div className="mt-4">
            {formData.commodities.map((commodity, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span>{commodity.description}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newCommodities = formData.commodities.filter((_, i) => i !== index);
                    setFormData({...formData, commodities: newCommodities});
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsTab; 