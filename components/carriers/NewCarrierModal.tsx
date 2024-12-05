import React, { useState } from 'react'
import { v4 } from 'uuid'

import { Input, Label, Select, Switch, Textarea } from '@/components/ui'
import { Button } from '@/components/Button'
import { FormFooter } from '@/components/FormFooter'
import { USA_STATES, CAN_PROVINCES } from '@/constants'
import { Vendor, VendorType, VENDOR_TYPES } from '@/types/truckmate'

interface NewCarrierModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (carrier: Partial<Vendor>) => Promise<void>
}

const DEFAULT_CARRIER: Partial<Vendor> = {
  address1: '',
  address2: '',
  businessPhone: '',
  businessPhoneExt: '',
  city: '',
  comment: '',
  country: 'US',
  faxPhone: '',
  insurance: '',
  liability: '',
  name: '',
  postalCode: '',
  province: '',
  status: 'active',
  vendorId: '',
  vendorType: 'agentCarrier',
  webEnabled: 'True',
}

const provinces = {
  CA: CAN_PROVINCES,
  US: USA_STATES,
}

export function NewCarrierModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCarrierModalProps) {
  const [formData, setFormData] = useState<Partial<Vendor>>(DEFAULT_CARRIER)
  const [activeTab, setActiveTab] = useState('details')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsSubmitting(true)
      await onSubmit(formData)
      onClose()
    } catch (error) {
      console.error('Error creating carrier:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderTabs = () => (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {[
          { id: 'details', label: 'Basic Info' },
          { id: 'contact', label: 'Contact Details' },
          { id: 'preferences', label: 'Preferences' },
        ].map((tab) => (
          <button
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )

  const renderDetailsForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vendorType">Type *</Label>
          <Select
            onChange={(vendorType: VendorType) =>
              setFormData({ ...formData, vendorType })
            }
            value={formData.vendorType ?? 'agentCarrier'}
          >
            {Object.entries(VENDOR_TYPES).map(([name, label]) => (
              <option key={v4()} value={name}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendorId">Vendor ID *</Label>
          <Input
            id="vendorId"
            maxLength={10}
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, vendorId: value })
            }
            required
            value={formData.vendorId}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <Label htmlFor="name">Vendor Name *</Label>
        <Input
          id="name"
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, name: value })
          }
          required
          value={formData.name}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="insurance">Insurance</Label>
          <Input
            id="insurance"
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, insurance: value })
            }
            value={formData.insurance}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="liability">Liability</Label>
          <Input
            id="liability"
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, liability: value })
            }
            value={formData.liability}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comments</Label>
        <Textarea
          id="comment"
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, comment: value })
          }
          rows={3}
          value={formData.comment}
        />
      </div>
    </div>
  )

  const renderContactForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label id="address1">Primary Address</Label>
        <Input
          id="address1"
          onChange={(e) =>
            setFormData({ ...formData, address1: e.target.value })
          }
          placeholder="Street Address"
          value={formData.address1}
        />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, address2: e.target.value })
          }
          placeholder="Suite, Floor, etc. (optional)"
          value={formData.address2}
        />

        <div className="flex gap-4">
          <Input
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, businessPhone: value })
            }
            placeholder="Phone"
            value={formData.businessPhone}
          />
          <Input
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, businessPhoneExt: value })
            }
            placeholder="Ext."
            style={{ width: '80px' }}
            value={formData.businessPhoneExt}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
            value={formData.city}
          />
          <Select
            onChange={(province) => setFormData({ ...formData, province })}
            value={formData.province ?? ''}
          >
            <>
              {provinces[formData.country as keyof typeof provinces].map(
                ({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                )
              )}
            </>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            placeholder="Postal Code"
            value={formData.postalCode}
          />
          <Select
            onChange={(value) => setFormData({ ...formData, country: value })}
            value={formData.country ?? 'US'}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderPreferencesForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Web Portal Access</Label>
          <Switch
            checked={formData.webEnabled === 'True'}
            onCheckedChange={(checked) =>
              setFormData({
                ...formData,
                webEnabled: checked ? 'True' : 'False',
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2"></div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Add New Carrier
                </h3>
              </div>

              {renderTabs()}

              <div className="mt-4">
                {activeTab === 'details' && renderDetailsForm()}
                {activeTab === 'contact' && renderContactForm()}
                {activeTab === 'preferences' && renderPreferencesForm()}
              </div>
            </div>

            <FormFooter>
              <Button color="success" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Creating...' : 'Create Carrier'}
              </Button>
              <Button color="neutral" onClick={onClose} variant="text">
                Cancel
              </Button>
            </FormFooter>
          </form>
        </div>
      </div>
    </div>
  )
}
