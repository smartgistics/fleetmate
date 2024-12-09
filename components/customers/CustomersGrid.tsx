import { useEffect, useMemo, useState } from 'react'
import { v4 } from 'uuid'
import { debounce } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { Client } from '@/types/truckmate'
import { useCustomers } from '@/hooks/useTruckMate'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { PageError } from '@/components/PageError'

const DEFAULT_LIMIT = 20

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

interface CustomersGridProps {
  onRowClick: ({ row }: { row: Client }) => void
  searchTerm: string
}

export const CustomersGrid = ({
  onRowClick,
  searchTerm,
}: CustomersGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([{ field: 'name', sort: 'asc' }])

  const { customers, isLoading, error, total, updateParams } = useCustomers({
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortModel[0]?.field || 'name'} ${sortModel[0]?.sort || 'asc'}`,
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

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.clear()
    }
  }, [debouncedSearch])

  if (error) {
    return <PageError message={error} />
  }

  return (
    <ServerSideDataGrid
      columns={columns}
      data={customers}
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
