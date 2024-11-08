import React, { useState } from "react";
import { FormData } from "@/types";
import { ShipmentModalTabs } from "./modal/ShipmentModalTabs";
import { ShipmentModalFooter } from "./modal/ShipmentModalFooter";
import { CustomerTab } from "./tabs/CustomerTab";
import { OrderDetailsTab } from "./tabs/OrderDetailsTab";
import { PickupTab } from "./tabs/PickupTab";
import { DeliveryTab } from "./tabs/DeliveryTab";
import { FinancialsTab } from "./tabs/FinancialsTab";
import { SummaryTab } from "./tabs/SummaryTab";
import { CapacityTab } from "./tabs/CapacityTab";

export interface NewShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewShipmentModal({ isOpen, onClose }: NewShipmentModalProps) {
  const [activeTab, setActiveTab] = useState<string>("customer");
  const [formData, setFormData] = useState<FormData>({
    // Customer Tab
    customer: "",
    customerReference: "",
    customerContact: "",
    contactPhone: "",
    contactEmail: "",
    billingAddress: "",

    // Order Details Tab
    contractType: "",
    equipmentType: "",
    serviceLevel: "",
    temperatureControlled: false,
    tempMin: "",
    tempMax: "",
    commodityCode: "",
    commodities: [],

    // Pickup Tab
    pickupLocations: [
      {
        address: "",
        date: "",
        startTime: "",
        endTime: "",
        confirmed: false,
        confirmationNumber: "",
        notes: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
      },
    ],

    // Delivery Tab
    deliveryLocations: [
      {
        address: "",
        date: "",
        startTime: "",
        endTime: "",
        confirmed: false,
        confirmationNumber: "",
        notes: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
      },
    ],

    // Financials Tab
    customerCharges: [],
    carrierCharges: [],
    miscCharges: [],

    // Additional Fields
    notes: "",
    accountManager: "Jim Smith", // Default value
    orderPlanner: "Sherie Connor", // Default value
    status: "New",
    parentAccount: "[PARENT ACCOUNT]",
    customerId: "[Customer ID]",
    creditStatus: "[STATUS]",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose();
  };

  // Add function to handle next tab
  const handleNext = () => {
    const tabs = [
      "customer",
      "orderDetails",
      "pickup",
      "delivery",
      "financials",
      "summary",
      "capacity",
    ];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // Function to determine if we're on the last tab
  const isLastTab = () => {
    return activeTab === "capacity";
  };

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full'>
          <div className='bg-white'>
            {/* Header */}
            <div className='flex justify-between items-center px-6 py-4 border-b'>
              <h3 className='text-2xl font-semibold text-gray-900'>
                Create New Shipment
              </h3>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-500'
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className='border-b border-gray-200'>
              <ShipmentModalTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Form Content */}
            <div className='px-6 py-4'>
              <form onSubmit={handleSubmit}>
                {activeTab === "customer" && (
                  <CustomerTab initialFormData={formData} />
                )}
                {activeTab === "orderDetails" && (
                  <OrderDetailsTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === "pickup" && <PickupTab />}
                {activeTab === "delivery" && <DeliveryTab />}
                {activeTab === "financials" && (
                  <FinancialsTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === "summary" && <SummaryTab formData={formData} />}
                {activeTab === "capacity" && <CapacityTab />}

                <ShipmentModalFooter
                  onClose={onClose}
                  onNext={handleNext}
                  isLastTab={isLastTab()}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewShipmentModal;
