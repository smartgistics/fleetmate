import React from 'react';

const SummaryTab = ({ formData }) => {
  // Calculate totals for load details
  const totalWeight = formData.commodities?.reduce((sum, item) => sum + Number(item.weight || 0), 0) || 0;
  const totalPieces = formData.commodities?.reduce((sum, item) => sum + Number(item.pieces || 0), 0) || 0;
  const totalPallets = formData.commodities?.reduce((sum, item) => sum + Number(item.pallets || 0), 0) || 0;

  // Calculate financial totals
  const totalCustomerRate = formData.customerCharges?.reduce((sum, charge) => sum + Number(charge.amount || 0), 0) || 0;
  const totalCarrierRate = formData.carrierCharges?.reduce((sum, charge) => sum + Number(charge.amount || 0), 0) || 0;

  return (
    <div className="space-y-6">
      {/* Account and Contact Section */}
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-blue-600 text-lg mb-2">Account</h3>
          <div className="space-y-1">
            <p className="font-medium text-lg">{formData.customer}</p>
            <p className="text-gray-600">Parent: [PARENT ACCOUNT]</p>
            <p className="text-gray-600">[Customer ID]</p>
            <p className="text-gray-600">Status: [Status]</p>
            <p className="text-gray-600">Owner: {formData.customerContact}</p>
            <p className="text-gray-600">Status: [Status]</p>
            <p className="text-gray-600">Revenue: ${totalCustomerRate.toLocaleString()}</p>
            <p className="text-gray-600">Credit Status: [STATUS]</p>
          </div>
        </div>

        <div>
          <h3 className="text-blue-600 text-lg mb-2">Contact</h3>
          <div className="space-y-1">
            <p className="font-medium text-lg">{formData.customerContact}</p>
            <p className="text-gray-600">{formData.contactEmail}</p>
            <p className="text-gray-600">{formData.contactPhone}</p>
          </div>

          <h3 className="text-blue-600 text-lg mt-4 mb-2">Order Owners</h3>
          <div className="space-y-1">
            <p className="text-gray-600">Account Manager: Jim Smith</p>
            <p className="text-gray-600">Order Planner: Sherie Connor</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-gray-700 mb-2">Total Customer Rate: ${totalCustomerRate.toLocaleString()}</p>
          <p className="text-gray-700">Total Carrier Rate: ${totalCarrierRate.toLocaleString()}</p>
        </div>
      </div>

      {/* Requirements/Notes Section */}
      <div>
        <h3 className="font-medium mb-2">Requirements/Notes:</h3>
        <p className="text-gray-600">{formData.notes}</p>
      </div>

      {/* Load Details Section */}
      <div>
        <h3 className="text-blue-600 text-lg mb-2">Load Details</h3>
        <div className="flex justify-between items-center text-gray-600 mb-2">
          <span>Total: {totalWeight} lb, {totalPieces} pieces, {totalPallets} Pallets</span>
        </div>
        {formData.commodities?.map((commodity, index) => (
          <div key={index} className="flex justify-between py-2 border-t border-gray-200">
            <span>Commodity Description [Code #{index + 1}]</span>
            <span className="text-gray-600">
              {commodity.weight} lbs, {commodity.pieces} pieces, {commodity.pallets} pallets
            </span>
          </div>
        ))}
      </div>

      {/* Pickup Section */}
      <div>
        <h3 className="text-blue-600 text-lg mb-2">Pickup</h3>
        {formData.pickupLocations?.map((location, index) => (
          <div key={index} className="flex justify-between py-2 border-t border-gray-200">
            <span>Location #{index + 1}</span>
            <span className="text-gray-600">
              {new Date(location.date).toLocaleDateString()} @ {location.startTime} - {location.endTime}
            </span>
          </div>
        ))}
      </div>

      {/* Dropoffs Section */}
      <div>
        <h3 className="text-blue-600 text-lg mb-2">Dropoffs</h3>
        {formData.deliveryLocations?.map((location, index) => (
          <div key={index} className="flex justify-between py-2 border-t border-gray-200">
            <span>Location #{index + 1}</span>
            <span className="text-gray-600">
              {new Date(location.date).toLocaleDateString()} @ {location.startTime} - {location.endTime}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryTab; 