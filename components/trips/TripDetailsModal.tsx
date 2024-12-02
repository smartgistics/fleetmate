import { Button } from '@/components/Button'
import { FormFooter } from '@/components/FormFooter'
import { Trip } from '@/types/truckmate'

interface TripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  trip: Trip | null
  onUpdate: (trip: Trip) => void
}

export function TripDetailsModal({
  isOpen,
  onClose,
  trip,
}: TripDetailsModalProps) {
  if (!isOpen || !trip) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Trip #{trip.tripNumber}
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <p className="mt-1">{trip.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Carrier
                </label>
                <p className="mt-1">
                  {trip.carriers?.[0]?.vendor?.name || 'Unassigned'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer
                </label>
                <p className="mt-1">Customer Name</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Revenue
                </label>
                <p className="mt-1">$0</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Equipment
                </label>
                <p className="mt-1">Equipment Type</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <p className="mt-1">
                  {trip.eTD} - {trip.eTA}
                </p>
              </div>
            </div>
          </div>
          <FormFooter>
            <Button onClick={onClose} variant="text">
              Close
            </Button>
          </FormFooter>
        </div>
      </div>
    </div>
  )
}
