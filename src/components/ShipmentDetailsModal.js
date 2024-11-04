import React from 'react';

const ShipmentDetailsModal = ({ isOpen, onClose, shipment }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
             onClick={onClose}></div>

        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shipment #{shipment.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      View and manage shipment details
                    </p>
                  </div>
                  <div className="h-7 flex items-center">
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 py-6 sm:px-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Customer</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.customer}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Carrier</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.carrier}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Rate</label>
                        <p className="mt-1 text-sm text-gray-900">${shipment.rate.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Locations</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Pickup Location</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.pickupLocation}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Delivery Location</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.deliveryLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Pickup Date</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.pickupDate}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Delivery Date</label>
                        <p className="mt-1 text-sm text-gray-900">{shipment.deliveryDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Edit Shipment
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50"
                    >
                      Cancel Shipment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShipmentDetailsModal; 