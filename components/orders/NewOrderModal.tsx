'use client'

import React, { useState } from 'react'
import { FormData } from '@/types/truckmate'
import { OrderModalTabs } from './modal/OrderModalTabs'
import { OrderModalFooter } from './modal/OrderModalFooter'
import { CustomerTab } from './tabs/CustomerTab'
import { OrderDetailsTab } from './tabs/OrderDetailsTab'
import { FinancialsTab } from './tabs/FinancialsTab'

interface NewOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const [activeTab, setActiveTab] = useState<string>('customer')
  const [formData, setFormData] = useState<FormData>({
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

    // Financials Tab
    customerCharges: [],
    carrierCharges: [],
    miscCharges: [],

    // Additional Fields
    notes: '',
    accountManager: '',
    orderPlanner: '',
    status: 'New',
    parentAccount: '',
    customerId: '',
    creditStatus: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    onClose()
  }

  const handleNext = () => {
    const tabs = ['customer', 'orderDetails', 'financials']
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  const isLastTab = () => {
    return activeTab === 'financials'
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-2xl font-semibold text-gray-900">
                Create New Order
              </h3>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
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

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <OrderModalTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit}>
              <div className="px-6 py-4">
                {activeTab === 'customer' && (
                  <CustomerTab formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 'orderDetails' && (
                  <OrderDetailsTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === 'financials' && (
                  <FinancialsTab
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
              </div>
              <OrderModalFooter
                isLastTab={isLastTab()}
                onClose={onClose}
                onNext={handleNext}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
