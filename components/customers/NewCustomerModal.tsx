import React, { useState } from "react";
import { Client } from "@/types/truckmate";

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customer: Partial<Client>) => Promise<void>;
}

type ContactField = keyof NonNullable<Client["contact"]>;
type AddressField = keyof NonNullable<Client["address"]>;

const DEFAULT_CUSTOMER: Partial<Client> = {
  status: "Active",
  type: "Regular",
  creditStatus: "Good",
  defaultServiceLevel: "STD",
  webEnabled: true,
  isActive: true,
  contact: {
    name: "",
    phone: "",
    email: "",
    fax: "",
  },
  address: {
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",
  },
};

export function NewCustomerModal({
  isOpen,
  onClose,
  onSubmit,
}: NewCustomerModalProps) {
  const [formData, setFormData] = useState<Partial<Client>>(DEFAULT_CUSTOMER);
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  const renderTabs = () => (
    <div className='border-b border-gray-200 mb-6'>
      <nav className='-mb-px flex space-x-8'>
        <button
          type='button'
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
          type='button'
          onClick={() => setActiveTab("contact")}
          className={`${
            activeTab === "contact"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Contact
        </button>
        <button
          type='button'
          onClick={() => setActiveTab("preferences")}
          className={`${
            activeTab === "preferences"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Preferences
        </button>
      </nav>
    </div>
  );

  const updateContact = (field: ContactField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        name: prev.contact?.name ?? "",
        phone: prev.contact?.phone ?? "",
        email: prev.contact?.email ?? "",
        fax: prev.contact?.fax ?? "",
        [field]: value,
      },
    }));
  };

  const updateAddress = (field: AddressField, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        street1: prev.address?.street1 ?? "",
        street2: prev.address?.street2 ?? "",
        city: prev.address?.city ?? "",
        state: prev.address?.state ?? "",
        zip: prev.address?.zip ?? "",
        country: prev.address?.country ?? "USA",
        [field]: value,
      },
    }));
  };

  const renderDetailsForm = () => (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Name *
        </label>
        <input
          type='text'
          required
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Account Number
        </label>
        <input
          type='text'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.accountNumber || ""}
          onChange={(e) =>
            setFormData({ ...formData, accountNumber: e.target.value })
          }
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Type</label>
        <select
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.type || "Regular"}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value='Regular'>Regular</option>
          <option value='VIP'>VIP</option>
          <option value='Contract'>Contract</option>
        </select>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Tax ID
        </label>
        <input
          type='text'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.taxId || ""}
          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
        />
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Contact Name
        </label>
        <input
          type='text'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.contact?.name || ""}
          onChange={(e) => updateContact("name", e.target.value)}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Phone</label>
        <input
          type='tel'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.contact?.phone || ""}
          onChange={(e) => updateContact("phone", e.target.value)}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>Email</label>
        <input
          type='email'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.contact?.email || ""}
          onChange={(e) => updateContact("email", e.target.value)}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Address
        </label>
        <input
          type='text'
          placeholder='Street'
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.address?.street1 || ""}
          onChange={(e) => updateAddress("street1", e.target.value)}
        />
        <input
          type='text'
          placeholder='City'
          className='mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.address?.city || ""}
          onChange={(e) => updateAddress("city", e.target.value)}
        />
        <div className='grid grid-cols-2 gap-2 mt-2'>
          <input
            type='text'
            placeholder='State'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            value={formData.address?.state || ""}
            onChange={(e) => updateAddress("state", e.target.value)}
          />
          <input
            type='text'
            placeholder='ZIP'
            className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
            value={formData.address?.zip || ""}
            onChange={(e) => updateAddress("zip", e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderPreferencesForm = () => (
    <div className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Default Service Level
        </label>
        <select
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.defaultServiceLevel || "STD"}
          onChange={(e) =>
            setFormData({ ...formData, defaultServiceLevel: e.target.value })
          }
        >
          <option value='STD'>Standard</option>
          <option value='EXP'>Expedited</option>
          <option value='ECO'>Economy</option>
        </select>
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Default Equipment Type
        </label>
        <select
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
          value={formData.defaultEquipmentType || ""}
          onChange={(e) =>
            setFormData({ ...formData, defaultEquipmentType: e.target.value })
          }
        >
          <option value=''>Select Equipment Type</option>
          <option value='VAN'>Van</option>
          <option value='REEFER'>Reefer</option>
          <option value='FLATBED'>Flatbed</option>
        </select>
      </div>
      <div className='flex items-center space-x-2'>
        <input
          type='checkbox'
          id='webEnabled'
          className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
          checked={formData.webEnabled}
          onChange={(e) =>
            setFormData({ ...formData, webEnabled: e.target.checked })
          }
        />
        <label
          htmlFor='webEnabled'
          className='text-sm font-medium text-gray-700'
        >
          Web Portal Access Enabled
        </label>
      </div>
    </div>
  );

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <form onSubmit={handleSubmit}>
            <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Add New Customer
                </h3>
              </div>

              {renderTabs()}

              <div className='mt-4'>
                {activeTab === "details" && renderDetailsForm()}
                {activeTab === "contact" && renderContactForm()}
                {activeTab === "preferences" && renderPreferencesForm()}
              </div>
            </div>

            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='submit'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Create Customer
              </button>
              <button
                type='button'
                onClick={onClose}
                className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
