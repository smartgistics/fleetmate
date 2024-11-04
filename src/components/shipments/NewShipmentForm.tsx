import { useState } from 'react';

export function NewShipmentForm() {
  const [formData, setFormData] = useState({
    customer: '',
    loadType: '',
    pickupDate: '',
    deliveryDate: '',
    origin: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    destination: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    weight: '',
    pieces: '',
    palletCount: '',
    commodity: '',
    specialInstructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Customer</label>
            <select 
              className="w-full px-3 py-2 border rounded"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
            >
              <option value="">Select Customer</option>
              <option value="1">ABC Manufacturing</option>
              <option value="2">XYZ Distribution</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Load Type</label>
            <select 
              className="w-full px-3 py-2 border rounded"
              value={formData.loadType}
              onChange={(e) => setFormData({...formData, loadType: e.target.value})}
            >
              <option value="">Select Load Type</option>
              <option value="FTL">Full Truckload</option>
              <option value="LTL">Less Than Truckload</option>
              <option value="PARTIAL">Partial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pickup Date</label>
            <input 
              type="datetime-local" 
              className="w-full px-3 py-2 border rounded"
              value={formData.pickupDate}
              onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Delivery Date</label>
            <input 
              type="datetime-local" 
              className="w-full px-3 py-2 border rounded"
              value={formData.deliveryDate}
              onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Origin Address */}
          <div className="space-y-4">
            <h3 className="font-medium">Origin</h3>
            <input 
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border rounded"
              value={formData.origin.address}
              onChange={(e) => setFormData({
                ...formData, 
                origin: {...formData.origin, address: e.target.value}
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="City"
                className="w-full px-3 py-2 border rounded"
                value={formData.origin.city}
                onChange={(e) => setFormData({
                  ...formData, 
                  origin: {...formData.origin, city: e.target.value}
                })}
              />
              <input 
                type="text"
                placeholder="State"
                className="w-full px-3 py-2 border rounded"
                value={formData.origin.state}
                onChange={(e) => setFormData({
                  ...formData, 
                  origin: {...formData.origin, state: e.target.value}
                })}
              />
            </div>
          </div>

          {/* Destination Address */}
          <div className="space-y-4">
            <h3 className="font-medium">Destination</h3>
            <input 
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border rounded"
              value={formData.destination.address}
              onChange={(e) => setFormData({
                ...formData, 
                destination: {...formData.destination, address: e.target.value}
              })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text"
                placeholder="City"
                className="w-full px-3 py-2 border rounded"
                value={formData.destination.city}
                onChange={(e) => setFormData({
                  ...formData, 
                  destination: {...formData.destination, city: e.target.value}
                })}
              />
              <input 
                type="text"
                placeholder="State"
                className="w-full px-3 py-2 border rounded"
                value={formData.destination.state}
                onChange={(e) => setFormData({
                  ...formData, 
                  destination: {...formData.destination, state: e.target.value}
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Cargo Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight (lbs)</label>
            <input 
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pieces</label>
            <input 
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={formData.pieces}
              onChange={(e) => setFormData({...formData, pieces: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pallet Count</label>
            <input 
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={formData.palletCount}
              onChange={(e) => setFormData({...formData, palletCount: e.target.value})}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Commodity</label>
          <input 
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.commodity}
            onChange={(e) => setFormData({...formData, commodity: e.target.value})}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Special Instructions</label>
          <textarea 
            className="w-full px-3 py-2 border rounded"
            rows={3}
            value={formData.specialInstructions}
            onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button 
          type="button"
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Shipment
        </button>
      </div>
    </form>
  );
} 