import React, { useState } from 'react'
import { Client } from '@/types/truckmate'
import { formatPhoneNumber } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface CustomerDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  customer: Client | null
}

export default function CustomerDetailsModal({
  isOpen,
  onClose,
  customer,
}: CustomerDetailsModalProps) {
  const [activeTab, setActiveTab] = useState('details')

  if (!isOpen || !customer) return null

  const renderTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          className={`${
            activeTab === 'details'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`${
            activeTab === 'contact'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Info
        </button>
        <button
          className={`${
            activeTab === 'preferences'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </nav>
    </div>
  )

  const renderDetailsContent = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Account Number
            </label>
            <p className="mt-1 text-sm text-gray-900">{customer.clientId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Customer Since
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(customer.customerSince || '').toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Status
            </label>
            <Badge
              className="mt-1"
              variant={customer.status === 'active' ? 'default' : 'secondary'}
            >
              {customer.status}
            </Badge>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Type
            </label>
            <p className="mt-1 text-sm text-gray-900">{customer.type}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {customer.comments && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Comments</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">
            {customer.comments}
          </p>
        </div>
      )}
    </div>
  )

  const renderContactContent = () => (
    <div className="space-y-6">
      {/* Address Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Address Information
        </h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-900">
            {customer.address1}
            {customer.address2 && (
              <span>
                <br />
                {customer.address2}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-900">
            {customer.city}, {customer.province} {customer.postalCode}
          </p>
          <p className="text-sm text-gray-900">{customer.country}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Business Phone
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {formatPhoneNumber(customer.businessPhone)}
              {customer.businessPhoneExt &&
                ` ext. ${customer.businessPhoneExt}`}
            </p>
          </div>
          {customer.faxPhone && (
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Fax
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {formatPhoneNumber(customer.faxPhone)}
              </p>
            </div>
          )}
          {customer.altContact && (
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Alternate Contact
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {customer.altContact}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderPreferencesContent = () => (
    <div className="space-y-6">
      {/* Business Hours */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Business Hours
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Open Time
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {customer.openTime || 'Not specified'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Close Time
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {customer.closeTime || 'Not specified'}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Preferences */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Additional Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Web Access
            </label>
            <Badge
              className="mt-1"
              variant={customer.webEnabled ? 'default' : 'secondary'}
            >
              {customer.webEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          {customer.preferredDriver && (
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Preferred Driver
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {customer.preferredDriver}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <h2 className="text-lg font-medium text-gray-900">
                      {customer.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Account #{customer.clientId}
                    </p>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M6 18L18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="px-4 sm:px-6">
                  {renderTabs()}
                  <div className="py-4">
                    {activeTab === 'details' && renderDetailsContent()}
                    {activeTab === 'contact' && renderContactContent()}
                    {activeTab === 'preferences' && renderPreferencesContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
