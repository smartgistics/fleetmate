import React, { useState } from "react";
import { FormData } from "@/types";

interface OrderDetailsTabProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface Commodity {
  code: string;
  description: string;
  weight: string;
  pieces: string;
  pallets: string;
  cube: string;
  volume: string;
}

export function OrderDetailsTab({
  formData,
  setFormData,
}: OrderDetailsTabProps) {
  const [commodityForm, setCommodityForm] = useState<Commodity>({
    code: "",
    description: "",
    weight: "",
    pieces: "",
    pallets: "",
    cube: "",
    volume: "",
  });

  // Function to handle adding a commodity
  const handleAddCommodity = () => {
    // Validate required fields
    if (!commodityForm.code) {
      return; // Don't add if no commodity code selected
    }
    // Get the description from the code
    const description =
      {
        code1: "Food Products",
        code2: "Electronics",
        code3: "Machinery",
      }[commodityForm.code] || "Unknown";
    // Create new commodity object
    const newCommodity = {
      code: commodityForm.code,
      description,
      weight: Number(commodityForm.weight) || 0,
      pieces: Number(commodityForm.pieces) || 0,
      pallets: Number(commodityForm.pallets) || 0,
      cube: Number(commodityForm.cube) || 0,
      volume: Number(commodityForm.volume) || 0,
    };
    // Update form data with new commodity
    setFormData({
      ...formData,
      commodities: [...(formData.commodities || []), newCommodity],
    });
    // Reset current commodity fields
    setCommodityForm({
      code: "",
      description: "",
      weight: "",
      pieces: "",
      pallets: "",
      cube: "",
      volume: "",
    });
  };
  // Update the commodity code select to use currentCommodity
  const handleCommodityCodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCommodityForm({
      ...commodityForm,
      code: e.target.value,
    });
  };

  return (
    <div className='space-y-6'>
      {/* First Row: Contract Type and Equipment Type */}
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Contract Type
          </label>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            value={formData.contractType}
            onChange={(e) =>
              setFormData({ ...formData, contractType: e.target.value })
            }
          >
            <option value=''>Select contract type</option>
            <option value='Contract Primary'>Contract Primary</option>
            <option value='Contract Secondary'>Contract Secondary</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Equipment Type
          </label>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            value={formData.equipmentType}
            onChange={(e) =>
              setFormData({ ...formData, equipmentType: e.target.value })
            }
          >
            <option value=''>Select equipment type</option>
            <option value='Truckload'>Truckload</option>
            <option value='LTL'>LTL</option>
            <option value='Reefer'>Reefer</option>
          </select>
        </div>
      </div>

      {/* Second Row: Service Level and Temperature Control */}
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Service Level
          </label>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            value={formData.serviceLevel}
            onChange={(e) =>
              setFormData({ ...formData, serviceLevel: e.target.value })
            }
          >
            <option value=''>Select service level</option>
            <option value='Standard'>Standard</option>
            <option value='Expedited'>Expedited</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Temperature Control
          </label>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
            value={formData.temperatureControlled ? "true" : "false"}
            onChange={(e) => {
              const isTemp = e.target.value === "true";
              setFormData({
                ...formData,
                temperatureControlled: isTemp,
                tempMin: isTemp ? formData.tempMin : "",
                tempMax: isTemp ? formData.tempMax : "",
              });
            }}
          >
            <option value='false'>No Temperature Control</option>
            <option value='true'>Temperature Controlled</option>
          </select>
        </div>
      </div>

      {/* Temperature Range (shows only when Temperature Controlled is selected) */}
      {formData.temperatureControlled && (
        <div className='grid grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Temperature Range (°F)
            </label>
            <div className='flex items-center space-x-2'>
              <input
                type='number'
                className='w-24 px-2 py-1 border border-gray-300 rounded-md'
                placeholder='Min'
                value={formData.tempMin}
                onChange={(e) =>
                  setFormData({ ...formData, tempMin: e.target.value })
                }
              />
              <span>-</span>
              <input
                type='number'
                className='w-24 px-2 py-1 border border-gray-300 rounded-md'
                placeholder='Max'
                value={formData.tempMax}
                onChange={(e) =>
                  setFormData({ ...formData, tempMax: e.target.value })
                }
              />
              <span>°F</span>
            </div>
          </div>
        </div>
      )}

      {/* Commodities Section */}
      <div className='border-t pt-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Add the commodities attached to this order
        </h3>
        <div className='space-y-4'>
          <div>
            <select
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500'
              value={commodityForm.code}
              onChange={handleCommodityCodeChange}
            >
              <option value=''>Commodity Code and Description</option>
              <option value='code1'>Food Products</option>
              <option value='code2'>Electronics</option>
              <option value='code3'>Machinery</option>
            </select>
          </div>

          <div className='grid grid-cols-5 gap-4'>
            <div>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Weight'
                value={commodityForm.weight}
                onChange={(e) =>
                  setCommodityForm({ ...commodityForm, weight: e.target.value })
                }
              />
              <span className='text-xs text-gray-500'>lbs</span>
            </div>
            <div>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Pieces'
                value={commodityForm.pieces}
                onChange={(e) =>
                  setCommodityForm({ ...commodityForm, pieces: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Pallets'
                value={commodityForm.pallets}
                onChange={(e) =>
                  setCommodityForm({
                    ...commodityForm,
                    pallets: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Cube'
                value={commodityForm.cube}
                onChange={(e) =>
                  setCommodityForm({ ...commodityForm, cube: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type='number'
                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                placeholder='Volume'
                value={commodityForm.volume}
                onChange={(e) =>
                  setCommodityForm({ ...commodityForm, volume: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type='button'
            onClick={handleAddCommodity}
            disabled={!commodityForm.code}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md 
              ${
                commodityForm.code
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Add
          </button>
        </div>

        {/* Added Commodities List */}
        {formData.commodities && formData.commodities.length > 0 && (
          <div className='mt-4 border rounded-md overflow-hidden'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                    Description
                  </th>
                  <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                    Weight
                  </th>
                  <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                    Pieces
                  </th>
                  <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                    Pallets
                  </th>
                  <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {formData.commodities.map((commodity, index) => (
                  <tr key={index}>
                    <td className='px-4 py-2 text-sm text-gray-900'>
                      {commodity.description}
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-900'>
                      {commodity.weight} lbs
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-900'>
                      {commodity.pieces}
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-900'>
                      {commodity.pallets}
                    </td>
                    <td className='px-4 py-2'>
                      <button
                        type='button'
                        onClick={() => {
                          const newCommodities = formData.commodities.filter(
                            (_, i) => i !== index
                          );
                          setFormData({
                            ...formData,
                            commodities: newCommodities,
                          });
                        }}
                        className='text-red-500 hover:text-red-700'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsTab;
