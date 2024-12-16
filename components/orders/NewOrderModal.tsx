'use client'

import { useState } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'

import { FormWizard, FormWizardStep } from '@/components/FormWizard'
import {
  CapacityStep,
  CustomersStep,
  DeliveryLocationStep,
  FinancialsStep,
  OrderDetailsStep,
  SummaryStep,
  capacityStepValidator,
  customersStepValidator,
  deliveryLocationStepValidator,
  financialsStepValidator,
  orderDetailsStepValidator,
} from './NewOrder'

interface NewOrderModalProps {
  onClose: () => void
}

export const NewOrderModal = (props: NewOrderModalProps) => {
  const [error, setError] = useState('')
  const { onClose } = props
  const [fields, setFields] = useState({
    customerName: '',
    parentCompany: '',
    customerId: '',
    status: '',
    revenue: '',
    creditStatus: '',
    email: '',
    phone: '',
    accountManager: '',
    orderPlanner: '',
    orderType: '',
    serviceType: '',
    equipmentType: '',
    serviceLevel: '',
    temperatureControlled: false,
    temperatureMin: undefined,
    temperatureMax: undefined,
    commodities: [],
    pickup: [],
    dropoff: [],
    aCharges: [],
  })

  const handleSubmit = () => {
    onClose()
    return true
  }

  const formSteps: FormWizardStep[] = [
    {
      name: 'Customer',
      component: (
        <CustomersStep error={error} fields={fields} setFields={setFields} />
      ),
      submitText: 'Next: Order Details',
      validateComplete: async () => {
        const isValid = await customersStepValidator(fields, setError)
        return isValid
      },
    },
    {
      name: 'Order Details',
      component: <OrderDetailsStep fields={fields} setFields={setFields} />,
      submitText: 'Next: Pickup',
      validateComplete: orderDetailsStepValidator,
    },
    {
      name: 'Pickup',
      component: (
        <DeliveryLocationStep
          deliveryField="pickup"
          fields={fields}
          setFields={setFields}
          type="Pickup"
        />
      ),
      submitText: 'Next: Dropoff',
      validateComplete: deliveryLocationStepValidator,
    },
    {
      name: 'Dropoff',
      component: (
        <DeliveryLocationStep
          deliveryField="dropoff"
          fields={fields}
          setFields={setFields}
          type="Delivery"
        />
      ),
      submitText: 'Next: Financials',
      validateComplete: deliveryLocationStepValidator,
    },
    {
      name: 'Financials',
      component: <FinancialsStep fields={fields} setFields={setFields} />,
      submitText: 'Next: Capacity',
      validateComplete: financialsStepValidator,
    },
    {
      name: 'Capacity',
      component: <CapacityStep />,
      submitText: 'Assign & Save',
      validateComplete: capacityStepValidator,
    },
    {
      name: 'Summary',
      component: <SummaryStep fields={fields} />,
      submitText: 'Create Order',
      validateComplete: () => true,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div className="bg-white">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 border-b">
              <Typography className="text-2xl font-semibold text-gray-900">
                Create New Order
              </Typography>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <CloseIcon />
              </button>
            </header>
          </div>
          <FormWizard
            onCancel={onClose}
            onSubmit={handleSubmit}
            steps={formSteps}
          />
        </div>
      </div>
    </div>
  )
}
