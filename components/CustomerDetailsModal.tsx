import React, { useState } from "react";
import { Client } from "@/types";

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Client | null;
}

export default function CustomerDetailsModal({
  isOpen,
  onClose,
  customer,
}: CustomerDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details");

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
          onClick={() => setActiveTab("credit")}
          className={`${
            activeTab === "credit"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Credit Info
        </button>
        <button
          onClick={() => setActiveTab("terms")}
          className={`${
            activeTab === "terms"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Payment Terms
        </button>
      </nav>
    </div>
  );

  const renderDetailsContent = () => (
    <div className='space-y-6'>
      {/* Basic Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Basic Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Account Number
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.accountNumber}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Type
            </label>
            <p className='mt-1 text-sm text-gray-900'>{customer.type}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Status
            </label>
            <p className='mt-1 text-sm text-gray-900'>{customer.status}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Tax ID
            </label>
            <p className='mt-1 text-sm text-gray-900'>{customer.taxId}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreditContent = () => (
    <div className='space-y-6'>
      {/* Credit Information */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Credit Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Credit Status
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.creditStatus}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Credit Limit
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              ${customer.creditLimit?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTermsContent = () => (
    <div className='space-y-6'>
      {/* Payment Terms */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Payment Terms
        </h3>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Payment Terms
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {customer.paymentTerms}
            </p>
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
                      {customer.name}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      {customer.type} - {customer.status}
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
                    {activeTab === "credit" && renderCreditContent()}
                    {activeTab === "terms" && renderTermsContent()}
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
