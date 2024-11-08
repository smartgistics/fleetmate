import React, { useState } from "react";
import { FormData } from "@/types";

interface CustomerTabProps {
  initialFormData: FormData;
}

export function CustomerTab({ initialFormData }: CustomerTabProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  return (
    <div className='grid grid-cols-2 gap-6'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Customer Name
        </label>
        <select
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.customer}
          onChange={(e) =>
            setFormData({ ...formData, customer: e.target.value })
          }
        >
          <option value=''>Select a customer</option>
          <option value='Acme Corp'>Acme Corp</option>
          <option value='Global Inc'>Global Inc</option>
          <option value='Solar Solutions'>Solar Solutions</option>
          <option value='Alpha Industries'>Alpha Industries</option>
          <option value='Beta Logistics'>Beta Logistics</option>
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
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.customerContact}
          onChange={(e) =>
            setFormData({ ...formData, customerContact: e.target.value })
          }
          placeholder='Enter contact name'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Contact Phone
        </label>
        <input
          type='tel'
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.contactPhone}
          onChange={(e) =>
            setFormData({ ...formData, contactPhone: e.target.value })
          }
          placeholder='Enter contact phone'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Contact Email
        </label>
        <input
          type='email'
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.contactEmail}
          onChange={(e) =>
            setFormData({ ...formData, contactEmail: e.target.value })
          }
          placeholder='Enter contact email'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Billing Address
        </label>
        <textarea
          className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
          value={formData.billingAddress}
          onChange={(e) =>
            setFormData({ ...formData, billingAddress: e.target.value })
          }
          placeholder='Enter billing address'
          rows={3}
        />
      </div>
    </div>
  );
}
