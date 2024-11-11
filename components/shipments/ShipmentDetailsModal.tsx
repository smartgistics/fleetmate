import React, { useState } from "react";
import { Shipment } from "@/types";

interface ShipmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
  onUpdate: (shipment: Shipment) => void;
}

const DISPATCH_STATUSES = [
  'Available',
  'Planned',
  'PU TRACKING',
  'LOADING',
  'DEL TRACKING',
  'DELIVERING'
] as const;

export function ShipmentDetailsModal({
  isOpen,
  onClose,
  shipment,
  onUpdate,
}: ShipmentDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState<typeof DISPATCH_STATUSES[number]>(
    (shipment?.dispatchStatus as typeof DISPATCH_STATUSES[number]) || DISPATCH_STATUSES[0]
  );
  const [activeTab, setActiveTab] = useState<"customer" | "details" | "capacity" | "pricing">("details");

  React.useEffect(() => {
    if (shipment) {
      setEditedStatus(shipment.dispatchStatus as typeof DISPATCH_STATUSES[number]);
    }
    setIsEditing(false);
  }, [shipment]);

  if (!isOpen || !shipment) return null;

  const handleSave = () => {
    if (!shipment) return;

    const updatedShipment = {
      ...shipment,
      dispatchStatus: editedStatus,
    };
    
    onUpdate(updatedShipment);
    setIsEditing(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedStatus(e.target.value as typeof DISPATCH_STATUSES[number]);
  };

  const renderProgressBar = () => {
    if (!shipment) return null;

    const currentStatusIndex = DISPATCH_STATUSES.indexOf(isEditing ? editedStatus : shipment.dispatchStatus as typeof DISPATCH_STATUSES[number]);
    
    return (
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <div className='space-y-1'>
            <h3 className='text-lg font-medium text-gray-900'>Dispatch Progress</h3>
            <p className='text-sm font-medium text-blue-600'>
              {isEditing ? editedStatus : shipment.dispatchStatus}
            </p>
          </div>
          {isEditing ? (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedStatus(shipment.dispatchStatus as typeof DISPATCH_STATUSES[number]);
              }}
              className='text-sm text-gray-500 hover:text-gray-700'
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className='text-sm text-blue-600 hover:text-blue-700'
            >
              Change Status
            </button>
          )}
        </div>
        
        {isEditing ? (
          <div className='bg-blue-50 p-4 rounded-lg border-2 border-blue-200'>
            <select
              value={editedStatus}
              onChange={handleStatusChange}
              className='block w-full border-blue-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            >
              {DISPATCH_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className='mt-3 flex justify-end'>
              <button
                onClick={handleSave}
                className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className='relative mt-4'>
            {/* Progress bar background */}
            <div className='h-2 bg-gray-200 rounded-full'>
              {/* Progress bar fill - adjusted calculation */}
              <div
                className='h-full bg-blue-600 rounded-full transition-all duration-500'
                style={{
                  width: currentStatusIndex === 0 
                    ? '0%' 
                    : `${(currentStatusIndex / (DISPATCH_STATUSES.length - 1)) * 100}%`,
                }}
              />
            </div>
            
            {/* Checkpoints */}
            <div className='absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[2px]'>
              {DISPATCH_STATUSES.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full border-2 ${
                    index <= currentStatusIndex
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCustomerDetails = () => {
    if (!shipment) return null;

    return (
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Customer Details</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Customer Name</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.customer}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Contact Info</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.contactInfo || "Not Provided"}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Address</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.customerAddress || "Not Provided"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (!shipment) return null;

    return (
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Shipment Details</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Pickup Location</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.pickupLocation}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Delivery Location</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.deliveryLocation}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Pickup Date</label>
            <p className='mt-1 text-sm text-gray-900'>
              {shipment.pickupDate ? new Date(shipment.pickupDate).toLocaleDateString() : "Not Specified"}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Delivery Date</label>
            <p className='mt-1 text-sm text-gray-900'>
              {new Date(shipment.deliveryDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Rate</label>
            <p className='mt-1 text-sm text-gray-900'>
              {shipment.rate ? `$${shipment.rate.toLocaleString()}` : "Not Specified"}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Equipment Type</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.equipmentType || "Not Specified"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderCapacity = () => {
    if (!shipment) return null;

    return (
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Carrier Capacity</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Carrier Name</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.carrierName || "Not Provided"}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Max Weight</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.maxWeight ? `${shipment.maxWeight} lbs` : "Not Specified"}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Max Volume</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.maxVolume ? `${shipment.maxVolume} cubic ft` : "Not Specified"}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Available Capacity</label>
            <p className='mt-1 text-sm text-gray-900'>{shipment.availableCapacity ? `${shipment.availableCapacity} lbs` : "Not Specified"}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderPricing = () => {
    if (!shipment) return null;

    return (
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Pricing Information</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Customer Rate</label>
            <p className='mt-1 text-sm text-gray-900'>
              {shipment.customerRate ? `$${shipment.customerRate.toLocaleString()}` : "Not Specified"}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Suggested Rate</label>
            <p className='mt-1 text-sm text-gray-900'>
              {shipment.suggestedRate ? `$${shipment.suggestedRate.toLocaleString()}` : "Not Specified"}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>Total Carrier Rate</label>
            <p className='mt-1 text-sm text-gray-900'>
              {shipment.totalCarrierRate ? `$${shipment.totalCarrierRate.toLocaleString()}` : "Not Specified"}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "customer":
        return renderCustomerDetails();
      case "details":
        return renderDetails();
      case "capacity":
        return renderCapacity();
      case "pricing":
        return renderPricing();
      default:
        return renderDetails();
    }
  };

  const renderTabs = () => (
    <div className='border-b border-gray-200 mb-6'>
      <nav className='-mb-px flex space-x-8'>
        <button
          onClick={() => setActiveTab("details")}
          className={`${
            activeTab === "details"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("customer")}
          className={`${
            activeTab === "customer"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Customer
        </button>
        <button
          onClick={() => setActiveTab("capacity")}
          className={`${
            activeTab === "capacity"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Capacity
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`${
            activeTab === "pricing"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Pricing
        </button>
      </nav>
    </div>
  );

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={onClose}
        ></div>

        <section className='absolute inset-y-0 right-0 pl-10 max-w-full flex'>
          <div className='relative w-screen max-w-md'>
            <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
              {/* Header */}
              <div className='px-4 py-6 bg-gray-50 sm:px-6'>
                <div className='flex items-start justify-between space-x-3'>
                  <div className='space-y-1'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Shipment #{shipment?.id}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      View and manage shipment details
                    </p>
                  </div>
                  <div className='h-7 flex items-center'>
                    <button
                      onClick={onClose}
                      className='text-gray-400 hover:text-gray-500'
                    >
                      <span className='sr-only'>Close panel</span>
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
                </div>
              </div>

              {/* Content */}
              <div className='flex-1'>
                <div className='px-4 sm:px-6'>
                  {renderProgressBar()}
                  {renderTabs()}
                  <div className='py-4'>
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
