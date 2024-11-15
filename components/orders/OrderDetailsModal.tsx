import { Order } from "@/types/truckmate";
import { formatPhoneNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdate: (order: Order) => void;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
}: OrderDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("details");

  if (!isOpen || !order) return null;

  const renderTabs = () => (
    <div className='border-b border-gray-200 mb-6'>
      <nav className='-mb-px flex space-x-8'>
        <button
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
          onClick={() => setActiveTab("customer")}
          className={`${
            activeTab === "customer"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Customer
        </button>
        <button
          onClick={() => setActiveTab("financials")}
          className={`${
            activeTab === "financials"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
        >
          Financials
        </button>
      </nav>
    </div>
  );

  const renderDetailsContent = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Order Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Order ID
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.orderId}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Status
            </label>
            <Badge variant='default' className='mt-1'>
              {order.status}
            </Badge>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Service Level
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.serviceLevel}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Created By
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.createdBy}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Created Time
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {new Date(order.createdTime).toLocaleString()}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Commodity
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.commodity}</p>
          </div>
        </div>
      </div>

      {/* Measurements Section */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Shipment Details
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Weight
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {order.weight} {order.weightUnits}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Pieces
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {order.pieces} {order.piecesUnits}
            </p>
          </div>
          {order.pallets > 0 && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Pallets
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {order.pallets} {order.palletUnits}
              </p>
            </div>
          )}
          {order.temperature && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Temperature
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {order.temperature} {order.temperatureUnits}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCustomerContent = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Customer Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Bill To
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.billTo}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Bill Type
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.billType}</p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Bill To Code
            </label>
            <p className='mt-1 text-sm text-gray-900'>{order.billToCode}</p>
          </div>
          {order.billToCustomer && (
            <>
              <div>
                <label className='block text-sm font-medium text-gray-500'>
                  Customer Name
                </label>
                <p className='mt-1 text-sm text-gray-900'>
                  {order.billToCustomer.name}
                </p>
              </div>
              {order.billToCustomer.businessPhone && (
                <div>
                  <label className='block text-sm font-medium text-gray-500'>
                    Phone
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {formatPhoneNumber(order.billToCustomer.businessPhone)}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderFinancialsContent = () => (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Financial Information
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Total Charges
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {order.currencyCode} $
              {order.totalCharges?.toLocaleString() ?? "0"}
            </p>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-500'>
              Base Charges
            </label>
            <p className='mt-1 text-sm text-gray-900'>
              {order.currencyCode} ${order.charges?.toLocaleString() ?? "0"}
            </p>
          </div>
          {order.tax1 > 0 && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Tax 1
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {order.currencyCode} ${order.tax1.toLocaleString()}
              </p>
            </div>
          )}
          {order.tax2 > 0 && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Tax 2
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {order.currencyCode} ${order.tax2.toLocaleString()}
              </p>
            </div>
          )}
          {order.codAmount && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                COD Amount
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {order.currencyCode} ${order.codAmount.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dates Section */}
      <div>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Important Dates
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          {order.actualPickup && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Actual Pickup
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {new Date(order.actualPickup).toLocaleString()}
              </p>
            </div>
          )}
          {order.actualDelivery && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Actual Delivery
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {new Date(order.actualDelivery).toLocaleString()}
              </p>
            </div>
          )}
          {order.billDate && (
            <div>
              <label className='block text-sm font-medium text-gray-500'>
                Bill Date
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {new Date(order.billDate).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className='fixed inset-0 z-50 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          onClick={onClose}
        />

        <section className='absolute inset-y-0 right-0 pl-10 max-w-full flex'>
          <div className='relative w-screen max-w-md'>
            <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
              {/* Header */}
              <div className='px-4 py-6 bg-gray-50 sm:px-6'>
                <div className='flex items-start justify-between space-x-3'>
                  <div className='space-y-1'>
                    <h2 className='text-lg font-medium text-gray-900'>
                      Order #{order.orderId}
                    </h2>
                    <p className='text-sm text-gray-500'>{order.billToCode}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className='text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>Close panel</span>
                    <svg
                      className='h-6 w-6'
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

              {/* Content */}
              <div className='flex-1'>
                <div className='px-4 sm:px-6'>
                  {renderTabs()}
                  <div className='py-4'>
                    {activeTab === "details" && renderDetailsContent()}
                    {activeTab === "customer" && renderCustomerContent()}
                    {activeTab === "financials" && renderFinancialsContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
