import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { debounce } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { Vendor } from '@/types/truckmate/masterdata'
import { useVendors } from '@/hooks/useVendors'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { PageError } from '@/components/PageError'
import { formatDate } from '@/utils'

const DEFAULT_LIMIT = 20

interface CarriersGridProps {
  onRowClick: ({ row }: { row: Vendor }) => void
  searchTerm: string
}

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
    renderCell: ({ row }) => formatDate(row.vendorSince),
  },
]

export const CarriersGrid = ({ onRowClick, searchTerm }: CarriersGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }])
  const {
    vendors: carriers,
    error,
    isLoading,
    total,
    updateParams,
  } = useVendors('interliner', {
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortModel[0]?.field || 'name'} ${sortModel[0]?.sort || 'asc'}`,
    filter: "isInactive eq 'True'",
  })

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

  useEffect(() => {
    if (!sortModel.length) {
      updateParams({ orderBy: 'name asc' })
      return
    }
    updateParams({ orderBy: `${sortModel[0].field} ${sortModel[0].sort}` })
  }, [sortModel])

  useEffect(() => {
    updateParams({ offset: paginationModel.page * paginationModel.pageSize })
  }, [paginationModel])

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm])

  if (error) {
    return <PageError message={error.message} />
  }

  return (
    <ServerSideDataGrid
      columns={columns}
      data={carriers}
      disableRowSelectionOnClick
      getRowId={v4}
      isLoading={isLoading}
      onRowClick={onRowClick}
      paginationModel={paginationModel}
      rowCount={total}
      setPaginationModel={setPaginationModel}
      setSortModel={setSortModel}
      sortModel={sortModel}
    />
  )
}
