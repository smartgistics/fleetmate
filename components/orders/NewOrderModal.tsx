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
  customersSchema,
  dropoffSchema,
  financialsStepValidator,
  orderDetailsSchema,
  pickupSchema,
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

  const validateStep = (schema) => {
    return async () => {
      try {
        await schema.validate(fields, { abortEarly: false })
        setError('')
        return true
      } catch (error) {
        setError(`• ${error.errors.join('\r\n• ')}`)
        return false
      }
    }
  }

  const formSteps: FormWizardStep[] = [
    {
      name: 'Customer',
      component: (
        <CustomersStep error={error} fields={fields} setFields={setFields} />
      ),
      submitText: 'Next: Order Details',
      validateComplete: validateStep(customersSchema),
    },
    {
      name: 'Order Details',
      component: (
        <OrderDetailsStep error={error} fields={fields} setFields={setFields} />
      ),
      submitText: 'Next: Pickup',
      validateComplete: validateStep(orderDetailsSchema),
    },
    {
      name: 'Pickup',
      component: (
        <DeliveryLocationStep
          deliveryField="pickup"
          error={error}
          fields={fields}
          setFields={setFields}
          type="Pickup"
        />
      ),
      submitText: 'Next: Dropoff',
      validateComplete: validateStep(pickupSchema),
    },
    {
      name: 'Dropoff',
      component: (
        <DeliveryLocationStep
          deliveryField="dropoff"
          error={error}
          fields={fields}
          setFields={setFields}
          type="Delivery"
        />
      ),
      submitText: 'Next: Financials',
      validateComplete: validateStep(dropoffSchema),
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
      validateComplete: async () => true,
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
