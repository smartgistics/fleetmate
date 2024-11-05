import React, { useState } from 'react';

const ChargeTable = ({ charges, onDeleteCharge }) => {
  const total = charges.reduce((sum, charge) => sum + (charge.amount || 0), 0);
  const totalQuantity = charges.reduce((sum, charge) => sum + (charge.quantity || 0), 0);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-3 gap-4 font-medium text-gray-700 p-2 border-b">
        <div>Type</div>
        <div>Quantity</div>
        <div>Amount</div>
      </div>
      
      {charges.map((charge, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-2 border-b hover:bg-gray-50">
          <div>{charge.type}</div>
          <div>{charge.quantity}</div>
          <div className="flex justify-between">
            ${charge.amount.toFixed(2)}
            <button
              onClick={() => onDeleteCharge(index)}
              className="text-red-500 hover:text-red-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      
      <div className="grid grid-cols-3 gap-4 p-2 font-bold text-gray-800 bg-gray-50">
        <div>Total</div>
        <div>{totalQuantity}</div>
        <div>${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

const FinancialsTab = ({ formData, setFormData }) => {
  const [activeChargeType, setActiveChargeType] = useState('customer');
  const [newCharge, setNewCharge] = useState({
    type: 'Line Haul (all-in)',
    quantity: '',
    amount: ''
  });

  const handleAddCharge = () => {
    if (!newCharge.type || !newCharge.quantity || !newCharge.amount) return;

    const updatedCharges = [...(formData[`${activeChargeType}Charges`] || []), {
      ...newCharge,
      amount: parseFloat(newCharge.amount),
      quantity: parseFloat(newCharge.quantity)
    }];

    setFormData({
      ...formData,
      [`${activeChargeType}Charges`]: updatedCharges
    });

    setNewCharge({
      type: 'Line Haul (all-in)',
      quantity: '',
      amount: ''
    });
  };

  const handleDeleteCharge = (index) => {
    const updatedCharges = formData[`${activeChargeType}Charges`].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [`${activeChargeType}Charges`]: updatedCharges
    });
  };

  return (
    <div className="space-y-6">
      {/* Charge Type Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['Customer', 'Carrier', 'Misc.'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveChargeType(tab.toLowerCase())}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${activeChargeType === tab.toLowerCase()
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Add Charge Form */}
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="grid grid-cols-4 gap-4 items-end">
          <div className="col-span-2">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newCharge.type}
              onChange={(e) => setNewCharge({...newCharge, type: e.target.value})}
            >
              <option>Line Haul (all-in)</option>
              <option>Fuel Surcharge</option>
              <option>Detention</option>
              <option>Stop Fee</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newCharge.quantity}
              onChange={(e) => setNewCharge({...newCharge, quantity: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={newCharge.amount}
              onChange={(e) => setNewCharge({...newCharge, amount: e.target.value})}
              placeholder="$0.00"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleAddCharge}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Charges Table */}
      <ChargeTable
        charges={formData[`${activeChargeType}Charges`] || []}
        onDeleteCharge={handleDeleteCharge}
      />
    </div>
  );
};

export default FinancialsTab; 