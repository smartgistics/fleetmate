'use client'

import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { debounce } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { Vendor } from '@/types/truckmate'
import { useVendors } from '@/hooks/useVendors'
import { Button } from '@/components/Button'
import { CarrierDetailsModal } from '@/components/carriers/CarrierDetailsModal'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { PageError } from '@/components/PageError'
import { NewCarrierModal } from '@/components/carriers/NewCarrierModal'

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

export default function CarriersPage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortableFields>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedCarrier, setSelectedCarrier] = useState<Vendor | null>(null)
  const [newModalOpen, setNewModalOpen] = useState(false)

  const {
    vendors: carriers,
    createVendor,
    error,
    isLoading,
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

  // Debounced search function only handles the API call
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        updateParams({
          filter: term
            ? `(contains(tolower(name), '${term.toLowerCase()}') or contains(tolower(vendorId), '${term.toLowerCase()}'))`
            : "name ne null and name ne ''",
          offset: 0,
        })
      }, 500),
    [updateParams]
  )

  // Handle search - immediately update UI state, debounce API call
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    debouncedSearch(term)
  }

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return <PageError message={error.message} />
  }

  return (
    <div className="p-4 sm:p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carriers</h1>
        <Button onClick={() => setNewModalOpen(true)}>Add Carrier</Button>
      </div>

      <div className="mb-6">
        <input
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSearch}
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
          getRowId={({ vendorId }) => vendorId || v4()}
          isLoading={isLoading}
          onRowClick={({ row }) => setSelectedCarrier(row)}
          paginationModel={paginationModel}
          rowCount={total}
          setPaginationModel={setPaginationModel}
          setSortModel={setSortModel}
          sortModel={sortModel}
        />
      </div>

      <CarrierDetailsModal
        carrier={selectedCarrier}
        onClose={() => setSelectedCarrier(null)}
      />

      <NewCarrierModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onSubmit={createVendor}
      />
    </div>
  )
}
