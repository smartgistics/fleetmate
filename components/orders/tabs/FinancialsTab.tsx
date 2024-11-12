import React, { useState } from "react";
import { FormData, Charge } from "@/types";

interface FinancialsTabProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface NewCharge {
  type: string;
  code: string;
  description: string;
  quantity: string;
  rate: string;
}

interface ChargeTableProps {
  charges: Charge[];
  onDeleteCharge: (index: number) => void;
  currencyCode?: string;
}

function ChargeTable({
  charges,
  onDeleteCharge,
  currencyCode = "USD",
}: ChargeTableProps) {
  const total = charges.reduce((sum, charge) => sum + charge.amount, 0);
  const totalQuantity = charges.reduce(
    (sum, charge) => sum + charge.quantity,
    0
  );

  return (
    <div className='mt-4'>
      <div className='grid grid-cols-4 gap-4 font-medium text-gray-700 p-2 border-b'>
        <div>Type</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div>Amount</div>
      </div>

      {charges.map((charge, index) => (
        <div
          key={index}
          className='grid grid-cols-4 gap-4 p-2 border-b hover:bg-gray-50'
        >
          <div>{charge.description}</div>
          <div>{charge.quantity}</div>
          <div>${charge.rate.toFixed(2)}</div>
          <div className='flex justify-between'>
            ${charge.amount.toFixed(2)}
            <button
              onClick={() => onDeleteCharge(index)}
              className='text-red-500 hover:text-red-700'
            >
              <svg
                className='w-4 h-4'
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
      ))}

      <div className='grid grid-cols-4 gap-4 p-2 font-bold text-gray-800 bg-gray-50'>
        <div>Total</div>
        <div>{totalQuantity}</div>
        <div></div>
        <div>
          ${total.toFixed(2)} {currencyCode}
        </div>
      </div>
    </div>
  );
}

export function FinancialsTab({ formData, setFormData }: FinancialsTabProps) {
  const [activeChargeType, setActiveChargeType] = useState<
    "customer" | "carrier" | "misc"
  >("customer");
  const [newCharge, setNewCharge] = useState<NewCharge>({
    type: "lineHaul",
    code: "LH",
    description: "Line Haul",
    quantity: "",
    rate: "",
  });

  const handleAddCharge = () => {
    if (!newCharge.quantity || !newCharge.rate) return;

    const amount = parseFloat(newCharge.rate) * parseFloat(newCharge.quantity);
    const charge: Charge = {
      type: newCharge.type,
      code: newCharge.code,
      description: newCharge.description,
      quantity: parseFloat(newCharge.quantity),
      rate: parseFloat(newCharge.rate),
      amount,
      currencyCode: "USD",
    };

    const chargeArrayKey = `${activeChargeType}Charges` as keyof Pick<
      FormData,
      "customerCharges" | "carrierCharges" | "miscCharges"
    >;
    setFormData({
      ...formData,
      [chargeArrayKey]: [...formData[chargeArrayKey], charge],
    });

    setNewCharge({
      type: "lineHaul",
      code: "LH",
      description: "Line Haul",
      quantity: "",
      rate: "",
    });
  };

  const handleDeleteCharge = (index: number) => {
    const chargeArrayKey = `${activeChargeType}Charges` as keyof Pick<
      FormData,
      "customerCharges" | "carrierCharges" | "miscCharges"
    >;
    const updatedCharges = formData[chargeArrayKey].filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      [chargeArrayKey]: updatedCharges,
    });
  };

  return (
    <div className='space-y-6'>
      {/* Charge Type Tabs */}
      <div className='border-b border-gray-200'>
        <nav className='-mb-px flex space-x-8'>
          {["Customer", "Carrier", "Misc."].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveChargeType(
                  tab.toLowerCase() as "customer" | "carrier" | "misc"
                )
              }
              className={`
                py-2 px-1 border-b-2 font-medium text-sm
                ${
                  activeChargeType === tab.toLowerCase()
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Add Charge Form */}
      <div className='bg-gray-50 p-4 rounded-md'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-2'>
            <select
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              value={newCharge.type}
              onChange={(e) =>
                setNewCharge({ ...newCharge, type: e.target.value })
              }
            >
              <option value='lineHaul'>Line Haul</option>
              <option value='fuelSurcharge'>Fuel Surcharge</option>
              <option value='detention'>Detention</option>
              <option value='stopCharge'>Stop Charge</option>
            </select>
          </div>
          <div>
            <input
              type='number'
              placeholder='Quantity'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              value={newCharge.quantity}
              onChange={(e) =>
                setNewCharge({ ...newCharge, quantity: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='Rate'
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              value={newCharge.rate}
              onChange={(e) =>
                setNewCharge({ ...newCharge, rate: e.target.value })
              }
            />
          </div>
          <div>
            <button
              type='button'
              onClick={handleAddCharge}
              disabled={!newCharge.quantity || !newCharge.rate}
              className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400'
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Charges Table */}
      <ChargeTable
        charges={formData[`${activeChargeType}Charges`]}
        onDeleteCharge={handleDeleteCharge}
      />
    </div>
  );
}
