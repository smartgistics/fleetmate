import { Trip } from "@/types/truckmate";

interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onUpdate: (trip: Trip) => void;
}

export function TripDetailsModal({
  isOpen,
  onClose,
  trip,
}: TripDetailsModalProps) {
  if (!isOpen || !trip) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <h3 className='text-lg font-medium text-gray-900'>
              Trip #{trip.tripId}
            </h3>
            <div className='mt-4 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Status
                </label>
                <p className='mt-1'>{trip.status}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Carrier
                </label>
                <p className='mt-1'>
                  {trip.carriers?.[0]?.name || "Unassigned"}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Customer
                </label>
                <p className='mt-1'>{trip.customer}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Revenue
                </label>
                <p className='mt-1'>${trip.revenue?.toLocaleString()}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Equipment
                </label>
                <p className='mt-1'>{trip.equipmentType}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Schedule
                </label>
                <p className='mt-1'>
                  {trip.scheduledStartDate} {trip.scheduledStartTime} -{" "}
                  {trip.scheduledEndDate} {trip.scheduledEndTime}
                </p>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              onClick={onClose}
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
