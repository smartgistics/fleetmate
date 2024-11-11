import React, { useState } from "react";
import { CustomerData, FormData } from "@/types";
import { mockCustomers } from "@/mocks/Customers";

interface CustomerTabProps {
  initialFormData: FormData;
}

export function CustomerTab({ initialFormData }: CustomerTabProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Function to handle customer selection
  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer: CustomerData | undefined = mockCustomers.find(
      (c) => c.name === e.target.value
    );

    if (selectedCustomer) {
      setFormData({
        ...formData,
        customer: selectedCustomer.name,
        customerContact: selectedCustomer.primaryContact || "",
        contactPhone: selectedCustomer.contactPhone || "",
        contactEmail: selectedCustomer.contactEmail || "",
        billingAddress: selectedCustomer.billingAddress || "",
        equipmentType: selectedCustomer.defaultEquipment || "",
        temperatureControlled:
          selectedCustomer.requiresTemperatureControl || false,
        tempMin: selectedCustomer.defaultTempMin || "",
        tempMax: selectedCustomer.defaultTempMax || "",
      });
    } else {
      // Reset fields if no customer is selected
      setFormData({
        ...formData,
        customer: "",
        customerContact: "",
        contactPhone: "",
        contactEmail: "",
        billingAddress: "",
      });
    }
  };

  return (
    <div className='grid grid-cols-2 gap-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Customer Name *
        </label>
        <select
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.customer}
          onChange={handleCustomerChange}
          required
        >
          <option value=''>Select a customer</option>
          {mockCustomers.map((customer) => (
            <option key={customer.id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Customer Reference
        </label>
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.customerReference}
          onChange={(e) =>
            setFormData({ ...formData, customerReference: e.target.value })
          }
          placeholder='Enter customer reference number'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Customer Contact
        </label>
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'
          value={formData.customerContact}
          readOnly
          placeholder='Auto-populated from customer selection'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Contact Phone
        </label>
        <input
          type='tel'
          className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'
          value={formData.contactPhone}
          readOnly
          placeholder='Auto-populated from customer selection'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Contact Email
        </label>
        <input
          type='email'
          className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'
          value={formData.contactEmail}
          readOnly
          placeholder='Auto-populated from customer selection'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Billing Address
        </label>
        <textarea
          className='w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50'
          value={formData.billingAddress}
          readOnly
          placeholder='Auto-populated from customer selection'
          rows={3}
        />
      </div>
      {formData.customer && (
        <div className='col-span-2 bg-blue-50 p-3 rounded-md'>
          <div className='flex items-center'>
            <svg
              className='h-5 w-5 text-blue-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span className='ml-2 text-sm text-blue-700'>
              Contact information auto-populated from customer profile
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
