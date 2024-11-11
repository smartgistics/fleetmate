import React, { useState } from "react";
import { CustomerData } from "@/types";

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerData | null;
}

export default function CustomerDetailsModal({
  isOpen,
  onClose,
  customer,
}: CustomerDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details"); // ['details', 'requirements', 'rates']

  if (!isOpen || !customer) return null;

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
          onClick={() => setActiveTab("requirements")}
          className={`${
            activeTab === "requirements"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Carrier Requirements
        </button>
        <button
          onClick={() => setActiveTab("rates")}
          className={`${
            activeTab === "rates"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Contract Rates
        </button>
      </nav>
    </div>
  );
  const renderDetailsContent = () => (
    <div className='space-y-6'>
      {/* Business Metrics */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Business Metrics
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Total Shipments
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.totalShipments}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Total Spent
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              ${customer.totalSpent.toLocaleString()}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Average Cost per Shipment
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              ${customer.avgShipmentCost.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Common Locations */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Common Locations
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Most Common Pickup
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.commonLocations.pickup}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Most Common Delivery
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.commonLocations.delivery}
            </p>
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Recent Activity
        </h3>
        <div>
          <label className='block text-sm font-medium text-gray-500'>
            Last Shipment Date
          </label>
          <p className='mt-1 text-sm text-gray-900'>
            {customer.lastShipmentDate}
          </p>
        </div>
      </div>
    </div>
  );
  const renderRequirementsContent = () => (
    <div className='space-y-6'>
      {/* Insurance Requirements */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Insurance Requirements
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Auto Liability
            </label>
            <p className='mt-1 text-sm text-gray-900'>$1,000,000</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Cargo Insurance
            </label>
            <p className='mt-1 text-sm text-gray-900'>$100,000</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              General Liability
            </label>
            <p className='mt-1 text-sm text-gray-900'>$1,000,000</p>
          </div>
        </div>
      </div>
      {/* Equipment Requirements */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Equipment Requirements
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
    </div>
  );
  const renderRatesContent = () => (
    <div className='space-y-6'>
      {/* Contract Rates Table */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Contract Rates
        </h3>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Lane
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Equipment
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Rate
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  FSC
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  Chicago, IL → Detroit, MI
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  53&apos; Dry Van
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  $850
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  25%
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  Detroit, MI → Cleveland, OH
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  53&apos; Reefer
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  $950
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  28%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Rate Notes */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Rate Notes</h3>
        <div className='bg-gray-50 p-4 rounded-md'>
          <ul className='list-disc list-inside text-sm text-gray-700 space-y-2'>
            <li>All rates subject to fuel surcharge based on DOE index</li>
            <li>Detention charged after 2 hours at $75/hour</li>
            <li>Contract rates valid through 12/31/2024</li>
          </ul>
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
                      {customer.name}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      View and manage customer details
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
                    {activeTab === "requirements" &&
                      renderRequirementsContent()}
                    {activeTab === "rates" && renderRatesContent()}
                  </div>
                </div>

                {/* Actions */}
                <div className='px-4 py-6 sm:px-6 border-t border-gray-200 mt-6'>
                  <div className='flex space-x-3'>
                    <button
                      type='button'
                      className='flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
                    >
                      Edit Customer
                    </button>
                    <button
                      type='button'
                      className='flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-50'
                    >
                      Deactivate Customer
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
