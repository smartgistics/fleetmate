'use client'

import { useState, useMemo, useEffect } from 'react'
import { v4 } from 'uuid'
import { debounce } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import CustomerDetailsModal from '@/components/customers/CustomerDetailsModal'
import { NewCustomerModal } from '@/components/customers/NewCustomerModal'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/Button'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { useCustomers } from '@/hooks/useTruckMate'
import { Client } from '@/types/truckmate'

const DEFAULT_LIMIT = 20

type SortableFields = keyof Pick<
  Client,
  'clientId' | 'name' | 'status' | 'type' | 'altContact' | 'businessPhone'
>

const columns: GridColDef[] = [
  {
    field: 'clientId',
    headerName: 'Account #',
    align: 'left',
    flex: 0.4,
    renderCell: ({ row }) => row.clientId,
  },
  {
    field: 'name',
    headerName: 'Name',
    align: 'left',
    flex: 1,
    renderCell: ({ row }) => row.name,
  },
  {
    field: 'status',
    headerName: 'Status',
    align: 'left',
    flex: 0.5,
    renderCell: ({ row }) => row.status,
  },
  {
    field: 'type',
    headerName: 'Type',
    align: 'left',
    flex: 0.5,
    renderCell: ({ row }) => row.type,
  },
  {
    field: 'altContact',
    headerName: 'Contact',
    align: 'left',
    flex: 0.5,
    renderCell: ({ row }) => row.altContact,
  },
  {
    field: 'businessPhone',
    headerName: 'Phone',
    align: 'left',
    flex: 0.7,
    renderCell: ({ row }) => row.businessPhone,
  },
]

export default function Customers() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortableFields>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedCustomer, setSelectedCustomer] = useState<Client | null>(null)
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false)

  const { customers, isLoading, error, total, updateParams, createCustomer } =
    useCustomers({
      limit: DEFAULT_LIMIT,
      offset: 0,
      orderBy: `${sortField} ${sortDirection}`,
      filter: "name ne null and name ne ''",
    })

  // Debounced search function only handles the API call
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        updateParams({
          filter: term
            ? `(contains(tolower(name), '${term.toLowerCase()}') or contains(tolower(clientId), '${term.toLowerCase()}'))`
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

  // Handle sorting
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

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.clear()
    }
  }, [debouncedSearch])

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
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 text-gray-900">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => setIsNewCustomerModalOpen(true)}>
          Add Customer
        </Button>
      </div>

      {/* Search Section with controlled input */}
      <div className="mb-6">
        <input
          autoFocus
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSearch}
          placeholder="Search customers..."
          type="text"
          value={searchTerm}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto shadow">
        <ServerSideDataGrid
          columns={columns}
          data={customers}
          disableRowSelectionOnClick
          getRowId={({ clientId }) => clientId || v4()}
          isLoading={isLoading}
          onRowClick={({ row }) => setSelectedCustomer(row)}
          paginationModel={paginationModel}
          rowCount={total}
          setPaginationModel={setPaginationModel}
          setSortModel={setSortModel}
          sortModel={sortModel}
        />
      </div>

      {/* Modals */}
      {selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      <NewCustomerModal
        isOpen={isNewCustomerModalOpen}
        onClose={() => setIsNewCustomerModalOpen(false)}
        onSubmit={createCustomer}
      />
    </div>
  )
}
