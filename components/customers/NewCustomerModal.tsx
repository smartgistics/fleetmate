import React, { useState } from 'react'
import { Client } from '@/types/truckmate'
import { Input, Label, Select, Switch, Textarea } from '@/components/ui'
import { Button } from '@/components/Button'
import { FormFooter } from '@/components/FormFooter'
import { USA_STATES, CAN_PROVINCES } from '@/constants'

interface NewCustomerModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (customer: Partial<Client>) => Promise<void>
}

const DEFAULT_CUSTOMER: Partial<Client> = {
  clientId: '',
  name: '',
  status: 'active',
  type: 'Regular',
  address1: '',
  address2: '',
  city: '',
  province: '',
  country: 'US',
  postalCode: '',
  businessPhone: '',
  businessPhoneExt: '',
  faxPhone: '',
  businessCell: '',
  openTime: '',
  closeTime: '',
  comments: '',
  preferredDriver: '',
  customerSince: new Date().toISOString().split('T')[0],
  altContact: '',
  altBusinessPhone: '',
  altBusinessPhoneExt: '',
  altFaxPhone: '',
  altBusinessCell: '',
  taxId: '',
  webEnabled: true,
}

const provinces = {
  CA: CAN_PROVINCES,
  US: USA_STATES,
}

export function NewCustomerModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCustomerModalProps) {
  const [formData, setFormData] = useState<Partial<Client>>(DEFAULT_CUSTOMER)
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
      console.error('Error creating customer:', error)
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
          <Label htmlFor="clientId">Account Number *</Label>
          <Input
            id="clientId"
            onChange={(e) =>
              setFormData({ ...formData, clientId: e.target.value })
            }
            required
            value={formData.clientId}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            value={formData.name}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Customer Type</Label>
          <Select
            onChange={(value) => setFormData({ ...formData, type: value })}
            value={formData.type ?? 'Regular'}
          >
            <option value="Regular">Regular</option>
            <option value="VIP">VIP</option>
            <option value="Contract">Contract</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="taxId">Tax ID</Label>
          <Input
            id="taxId"
            onChange={(e) =>
              setFormData({ ...formData, taxId: e.target.value })
            }
            value={formData.taxId}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          onChange={(e) =>
            setFormData({ ...formData, comments: e.target.value })
          }
          rows={3}
          value={formData.comments}
        />
      </div>
    </div>
  )

  const renderContactForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Primary Address</Label>
        <Input
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Phone</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, businessPhone: e.target.value })
            }
            type="tel"
            value={formData.businessPhone}
          />
        </div>
        <div className="space-y-2">
          <Label>Extension</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, businessPhoneExt: e.target.value })
            }
            value={formData.businessPhoneExt}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cell Phone</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, businessCell: e.target.value })
            }
            type="tel"
            value={formData.businessCell}
          />
        </div>
        <div className="space-y-2">
          <Label>Fax</Label>
          <Input
            onChange={(e) =>
              setFormData({ ...formData, faxPhone: e.target.value })
            }
            type="tel"
            value={formData.faxPhone}
          />
        </div>
      </div>
    </div>
  )

  const renderPreferencesForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Business Hours</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Open Time</Label>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, openTime: e.target.value })
              }
              type="time"
              value={formData.openTime}
            />
          </div>
          <div className="space-y-2">
            <Label>Close Time</Label>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, closeTime: e.target.value })
              }
              type="time"
              value={formData.closeTime}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Web Portal Access</Label>
          <Switch
            checked={formData.webEnabled}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, webEnabled: checked })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Preferred Driver</Label>
        <Input
          onChange={(e) =>
            setFormData({ ...formData, preferredDriver: e.target.value })
          }
          value={formData.preferredDriver}
        />
      </div>
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
                  Add New Customer
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
                {isSubmitting ? 'Creating...' : 'Create Customer'}
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
