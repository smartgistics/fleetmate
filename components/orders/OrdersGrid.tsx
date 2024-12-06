import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { GridColDef } from '@mui/x-data-grid'

import { Order } from '@/types/truckmate'
import { useOrders } from '@/hooks/useTruckMate'
import { ServerSideDataGrid } from '@/components/DataGrid'
import { PageError } from '@/components/PageError'
import { formatDate } from '@/utils'

const DEFAULT_LIMIT = 20

const columns: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'Order ID',
    flex: 0.5,
    align: 'left',
    renderCell: ({ row }) => row.orderId,
  },
  {
    field: 'billToCode',
    headerName: 'Bill To',
    flex: 0.5,
    align: 'left',
    renderCell: ({ row }) => row.billToCode,
  },
  {
    field: 'billType',
    headerName: 'Bill Type',
    flex: 0.6,
    align: 'left',
    renderCell: ({ row }) => row.billType,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.6,
    align: 'left',
    renderCell: ({ row }) => row.status,
  },
  {
    field: 'serviceLevel',
    headerName: 'Service Level',
    flex: 0.7,
    align: 'left',
    renderCell: ({ row }) => row.serviceLevel,
  },
  {
    field: 'createdTime',
    headerName: 'Created Time',
    flex: 1,
    align: 'left',
    renderCell: ({ row }) => formatDate(row.createdTime),
  },
  {
    field: 'totalCharges',
    headerName: 'Total Charges',
    flex: 0.7,
    align: 'left',
    renderCell: ({ row }) => `${row.totalCharges?.toLocaleString() ?? '0'}`,
  },
  {
    field: 'currentStatusBehaviour',
    headerName: 'Status Behavior',
    flex: 0.3,
    align: 'left',
    renderCell: ({ row }) => row.currentStatusBehaviour,
  },
]

interface OrdersGridProps {
  onRowClick: ({ row }: { row: Order }) => void
  searchTerm: string
}

export const OrdersGrid = ({ onRowClick, searchTerm }: OrdersGridProps) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: DEFAULT_LIMIT,
  })
  const [sortModel, setSortModel] = useState([
    { field: 'orderId', sort: 'asc' },
  ])
  const { orders, isLoading, error, total, updateParams } = useOrders({
    limit: DEFAULT_LIMIT,
    offset: 0,
    orderBy: `${sortModel[0]?.field || 'orderId'} ${sortModel[0]?.sort || 'asc'}`,
  })

  useEffect(() => {
    if (!sortModel.length) {
      updateParams({ orderBy: 'orderId asc' })
      return
    }
    updateParams({ orderBy: `${sortModel[0].field} ${sortModel[0].sort}` })
  }, [sortModel])

  useEffect(() => {
    updateParams({ offset: paginationModel.page * paginationModel.pageSize })
  }, [paginationModel])

  useEffect(() => {
    updateParams({ filter: searchTerm, offset: 0 }) // Reset to first page on new search
  }, [searchTerm])

  if (error) {
    return <PageError message={error} />
  }

  return (
    <ServerSideDataGrid
      columns={columns}
      data={orders}
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
