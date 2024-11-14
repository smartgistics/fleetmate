import React, { useState } from "react";
import { Vendor } from "@/types/truckmate";

interface CarrierDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  carrier: Vendor | null;
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
      {/* Contact Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Contact Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Business Phone
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {carrier.businessPhone}
              {carrier.businessPhoneExt && ` ext. ${carrier.businessPhoneExt}`}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Fax
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.faxPhone}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Primary Contact
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.contact}</p>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Address Information
        </h3>
        <div className='space-y-2'>
          <p className='text-sm text-gray-900'>
            {carrier.address1}
            {carrier.address2 && <br />}
            {carrier.address2}
            <br />
            {carrier.city}, {carrier.province} {carrier.postalCode}
            <br />
            {carrier.country}
          </p>
        </div>
      </div>

      {/* Business Details */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Business Details
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Vendor Since
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.vendorSince}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Default Terminal
            </label>
            <p className='mt-1 text-sm text-gray-900'>Term 1</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Rate Mode
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Default Zone
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.defaultZone}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceContent = () => (
    <div className='space-y-6'>
      {/* Compliance Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Compliance Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              DOT Number
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              ICC Number
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Federal ID
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              W9 Status
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
        </div>
      </div>

      {/* Insurance Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Insurance Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Insurance Status
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.insurance}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Liability Coverage
            </label>
            <p className='mt-1 text-sm text-gray-900'>{carrier.liability}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Cargo Coverage
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Workers Comp
            </label>
            <p className='mt-1 text-sm text-gray-900'>TBD</p>
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
                      {carrier.vendorType} -{" "}
                      {carrier.isActive ? "Active" : "Inactive"}
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
