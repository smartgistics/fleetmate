import React, { useState } from "react";
import { CarrierData } from "@/types";

interface CarrierDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  carrier: CarrierData | null;
}

export function CarrierDetailsModal({
  isOpen,
  onClose,
  carrier,
}: CarrierDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen || !carrier) return null;

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
          onClick={() => setActiveTab("compliance")}
          className={`${
            activeTab === "compliance"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Compliance
        </button>
      </nav>
    </div>
  );
  const renderDetailsContent = () => (
    <div className='space-y-6'>
      {/* Performance Metrics */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Performance Metrics
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Total Shipments
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {carrier.totalShipments}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Active Routes
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.activeRoutes}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Total Revenue
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              ${carrier.totalRevenue.toLocaleString()}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Average Rate
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              ${carrier.avgShipmentRate.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Recent Activity
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Last Shipment Date
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {carrier.lastShipmentDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  const renderComplianceContent = () => (
    <div className='space-y-6'>
      {/* Insurance Status */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Insurance Status
        </h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Auto Liability
              </label>
              <p className='mt-1 text-sm text-gray-900'>$1,000,000</p>
              <div className='flex items-center mt-1'>
                <div className='h-2 w-2 rounded-full bg-green-500 mr-2'></div>
                <span className='text-xs text-green-600'>
                  Active until Dec 31, 2024
                </span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Cargo Insurance
              </label>
              <p className='mt-1 text-sm text-gray-900'>$100,000</p>
              <div className='flex items-center mt-1'>
                <div className='h-2 w-2 rounded-full bg-green-500 mr-2'></div>
                <span className='text-xs text-green-600'>
                  Active until Dec 31, 2024
                </span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                General Liability
              </label>
              <p className='mt-1 text-sm text-gray-900'>$1,000,000</p>
              <div className='flex items-center mt-1'>
                <div className='h-2 w-2 rounded-full bg-green-500 mr-2'></div>
                <span className='text-xs text-green-600'>
                  Active until Dec 31, 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Equipment Compliance */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Equipment Compliance
        </h3>
        <div className='space-y-2'>
          <div className='flex items-center'>
            <svg
              className='h-5 w-5 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
            <span className='ml-2 text-sm text-gray-900'>
              Air-Ride Suspension
            </span>
          </div>
          <div className='flex items-center'>
            <svg
              className='h-5 w-5 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
            <span className='ml-2 text-sm text-gray-900'>Lift Gate</span>
          </div>
        </div>
      </div>
      {/* Additional Requirements */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Additional Requirements
        </h3>
        <div className='bg-yellow-50 p-4 rounded-md'>
          <p className='text-sm text-yellow-700'>
            Driver must have minimum 2 years experience. Temperature monitoring
            required.
          </p>
        </div>
      </div>
      {/* Documents */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Required Documents
        </h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between p-3 bg-gray-50 rounded-md'>
            <span className='text-sm text-gray-900'>Insurance Certificate</span>
            <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
              View
            </button>
          </div>
          <div className='flex items-center justify-between p-3 bg-gray-50 rounded-md'>
            <span className='text-sm text-gray-900'>Operating Authority</span>
            <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
              View
            </button>
          </div>
          <div className='flex items-center justify-between p-3 bg-gray-50 rounded-md'>
            <span className='text-sm text-gray-900'>W9</span>
            <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
              View
            </button>
          </div>
        </div>
      </div>
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
                      {carrier.name}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      View and manage carrier details
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
                  {renderTabs()}
                  <div className='py-4'>
                    {activeTab === "details" && renderDetailsContent()}
                    {activeTab === "compliance" && renderComplianceContent()}
                  </div>
                </div>

                {/* Actions */}
                <div className='px-4 py-6 sm:px-6 border-t border-gray-200 mt-6'>
                  <div className='flex space-x-3'>
                    <button
                      type='button'
                      className='flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
                    >
                      Edit Carrier
                    </button>
                    <button
                      type='button'
                      className='flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50'
                    >
                      Deactivate Carrier
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
}

export default CarrierDetailsModal;
