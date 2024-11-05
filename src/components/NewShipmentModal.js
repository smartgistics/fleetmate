import React, { useState } from 'react';
import CustomerTab from './CustomerTab';
import OrderDetailsTab from './OrderDetailsTab';
import PickupTab from './PickupTab';
import DeliveryTab from './DeliveryTab';
import FinancialsTab from './FinancialsTab';
import SummaryTab from './SummaryTab';
import CapacityTab from './CapacityTab';

const NewShipmentModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('customer');
  const [formData, setFormData] = useState({
    // Customer Tab
    customer: '',
    customerReference: '',
    customerContact: '',
    contactPhone: '',
    contactEmail: '',
    billingAddress: '',
    
    // Order Details Tab
    contractType: '',
    equipmentType: '',
    serviceLevel: '',
    temperatureControlled: false,
    tempMin: '',
    tempMax: '',
    commodityCode: '',
    commodities: [],
    
    // Pickup Tab
    pickupLocations: [{
      address: '',
      date: '',
      startTime: '',
      endTime: '',
      confirmed: false,
      confirmationNumber: '',
      notes: '',
      contactName: '',
      contactPhone: '',
      contactEmail: ''
    }],
    
    // Delivery Tab
    deliveryLocations: [{
      address: '',
      date: '',
      startTime: '',
      endTime: '',
      confirmed: false,
      confirmationNumber: '',
      notes: '',
      contactName: '',
      contactPhone: '',
      contactEmail: ''
    }],
    
    // Financials Tab
    customerCharges: [],
    carrierCharges: [],
    miscCharges: [],
    
    // Additional Fields
    notes: '',
    accountManager: 'Jim Smith',  // Default value
    orderPlanner: 'Sherie Connor',  // Default value
    status: 'New',
    parentAccount: '[PARENT ACCOUNT]',
    customerId: '[Customer ID]',
    creditStatus: '[STATUS]'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    onClose();
  };

  const tabs = [
    { 
      id: 'customer', 
      name: 'Customer', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    },
    { 
      id: 'orderDetails', 
      name: 'Order Details', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    },
    { 
      id: 'pickup', 
      name: 'Pickup', 
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
    },
    { 
      id: 'delivery', 
      name: 'Delivery', 
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
    },
    { 
      id: 'financials', 
      name: 'Financials', 
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    { 
      id: 'summary', 
      name: 'Summary', 
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    { 
      id: 'capacity', 
      name: 'Capacity', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-2xl font-semibold text-gray-900">Create New Shipment</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px px-6 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center
                      ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                    </svg>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Form Content */}
            <div className="px-6 py-4">
              <form onSubmit={handleSubmit}>
                {activeTab === 'customer' && (
                  <CustomerTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'orderDetails' && (
                  <OrderDetailsTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'pickup' && (
                  <PickupTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'delivery' && (
                  <DeliveryTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'financials' && (
                  <FinancialsTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'summary' && (
                  <SummaryTab formData={formData} />
                )}
                {activeTab === 'capacity' && (
                  <CapacityTab formData={formData} setFormData={setFormData} />
                )}
                
                {/* Add other tab contents here */}

                {/* Footer */}
                <div className="mt-8 flex justify-end border-t pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Create Shipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewShipmentModal; 