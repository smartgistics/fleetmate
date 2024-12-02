'use client'

import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'

import { Vendor } from '@/types/truckmate'
import { useVendors } from '@/hooks/useVendors'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { Button } from '@/components/Button'

const DEFAULT_LIMIT = 20

type SortableFields = keyof Pick<
  Vendor,
  'vendorId' | 'name' | 'isActive' | 'insurance' | 'liability' | 'vendorSince'
>

const columns: GridColDef[] = [
  {
    field: 'vendorId',
    headerName: 'ID',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) => row.vendorId,
  },
  {
    field: 'name',
    headerName: 'Carrier Name',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) => row.name,
  },
  {
    field: 'isInactive',
    headerName: 'Status',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) =>
      /^True$/.test(row.isInactive) ? 'Active' : 'Inactive',
  },
  {
    field: 'insurance',
    headerName: 'Insurance',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) => row.insurance,
  },
  {
    field: 'liability',
    headerName: 'Liability',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) => row.liability,
  },
  {
    field: 'vendorSince',
    headerName: 'Vendor Since',
    align: 'left',
    flex: 1,
    renderCell: ({ row }) => row.vendorSince,
  },
]

export default function Carriers() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortableFields>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null)

  const {
    vendors: carriers,
    isLoading,
    error,
    total,
    updateParams,
  } = useVendors('interliner', {
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortField} ${sortDirection}`,
    filter: "isInactive eq 'True'",
  })

  const handleSort = ({ field, sort }) => {
    setSortField(field)
    setSortDirection(sort)
    updateParams({ orderBy: `${field} ${sort}` })
  }

  useEffect(() => {
    if (!sortModel.length) {
      handleSort({ field: 'name', sort: 'asc' })
      return
    }
    handleSort(sortModel[0])
  }, [sortModel])

  useEffect(() => {
    updateParams({ offset: paginationModel.page * paginationModel.pageSize })
  }, [paginationModel])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filter = term
      ? `isActive eq 'True' and (contains(name,'${term}') or contains(vendorId,'${term}') or contains(city,'${term}') or contains(province,'${term}'))`
      : "isActive eq 'True'"
    updateParams({ filter, offset: 0 })
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load carriers'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carriers</h1>
        <Button>Add Carrier</Button>
      </div>

      <div className="mb-6">
        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search carriers..."
          type="text"
          value={searchTerm}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <ServerSideDataGrid
          columns={columns}
          data={carriers}
          disableRowSelectionOnClick
          isLoading={isLoading}
          onRowClick={({ row }) => setSelectedCarrier(row)}
          paginationModel={paginationModel}
          rowCount={total}
          setPaginationModel={setPaginationModel}
          setSortModel={setSortModel}
          sortModel={sortModel}
        />
      </div>

      {selectedCarrier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Carrier Details
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedCarrier(null)}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedCarrier.name}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Status</label>
                <p className="text-gray-900">
                  {selectedCarrier.isActive === 'True' ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Insurance</label>
                <p className="text-gray-900">{selectedCarrier.insurance}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Liability</label>
                <p className="text-gray-900">{selectedCarrier.liability}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Contact</label>
                <p className="text-gray-900">{selectedCarrier.contact}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">
                  Business Phone
                </label>
                <p className="text-gray-900">
                  {selectedCarrier.businessPhone}
                  {selectedCarrier.businessPhoneExt &&
                    ` ext. ${selectedCarrier.businessPhoneExt}`}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Fax</label>
                <p className="text-gray-900">{selectedCarrier.faxPhone}</p>
              </div>
              <div>
                <label className="font-medium text-gray-700">Address</label>
                <p className="text-gray-900">
                  {selectedCarrier.address1}
                  {selectedCarrier.address2 && <br />}
                  {selectedCarrier.address2}
                  <br />
                  {selectedCarrier.city}, {selectedCarrier.province}{' '}
                  {selectedCarrier.postalCode}
                  <br />
                  {selectedCarrier.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
