import { GridColDef, GridRowParams, GridValidRowModel } from '@mui/x-data-grid'
import cs from 'clsx'
import { useMemo } from 'react'

import { DataGrid } from './DataGrid'

import styles from './ServerSideDataGrid.module.sass'

/**
 * This is a workaround to require both rowSelectionModel and onRowSelectionModelChange to be present
 * if isCheckboxSelection is true and neither to be present if isCheckboxSelection is false
 *
 * These props are required for server side pagination to work with row selection
 */
export type XorSelectionModel =
  | {
      rowSelectionModel: string[]
      isCheckboxSelection: boolean
      onRowSelectionModelChange: (selectionModel: string[]) => void
    }
  | {
      rowSelectionModel?: never
      onRowSelectionModelChange?: never
      isCheckboxSelection?: false
    }

export type ServerSideDataGridProps = XorSelectionModel & {
  className?: string
  classes?: { cell?: string }
  columns: GridColDef[]
  data: any[]
  defaultSortColumn?: string
  disableColumnMenu?: boolean
  disableRowSelectionOnClick?: boolean
  getRowClassName?: ({ row }) => string
  initialState?: unknown
  isLoading?: boolean
  isRowSelectable?: (params: GridRowParams<GridValidRowModel>) => boolean
  onRowClick?: (o: any) => void
  paginationModel: {
    page: number
    pageSize: number
  }
  rowCount?: number
  setPaginationModel: (model: { page: number; pageSize: number }) => void
  setSortModel: (s) => void
  sortModel: any
}

export const ServerSideDataGrid = (props: ServerSideDataGridProps) => {
  const {
    classes,
    columns,
    data = [],
    defaultSortColumn,
    disableColumnMenu = true,
    disableRowSelectionOnClick,
    getRowClassName,
    initialState = {},
    isCheckboxSelection = false,
    isLoading,
    isRowSelectable,
    onRowClick,
    onRowSelectionModelChange,
    paginationModel,
    rowCount = 0,
    rowSelectionModel,
    setPaginationModel,
    setSortModel,
    sortModel,
  } = props

  const rows = data || []

  const columnsWithSort = useMemo<GridColDef[]>(() => {
    if (!defaultSortColumn) return columns

    return columns.map((column) =>
      column.field === defaultSortColumn
        ? {
            ...column,
            sortingOrder: ['asc', 'desc'], // default sortingOrder is ['asc', 'desc', null]
          }
        : column
    )
  }, [columns, defaultSortColumn])

  return (
    <DataGrid
      checkboxSelection={isCheckboxSelection}
      className={cs(styles.root, props.className)}
      classes={classes}
      columns={columnsWithSort}
      disableColumnMenu={disableColumnMenu}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      getRowClassName={getRowClassName}
      getRowHeight={() => 'auto'}
      initialState={initialState}
      isRowSelectable={isRowSelectable}
      keepNonExistentRowsSelected={true}
      loading={isLoading}
      onPaginationModelChange={setPaginationModel}
      onRowClick={onRowClick}
      onRowSelectionModelChange={onRowSelectionModelChange}
      onSortModelChange={setSortModel}
      paginationMode="server"
      paginationModel={paginationModel}
      rowCount={rowCount}
      rowSelectionModel={rowSelectionModel}
      rows={rows}
      sortModel={sortModel}
      sortingMode="server"
    />
  )
}
