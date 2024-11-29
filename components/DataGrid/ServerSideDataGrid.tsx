import { GridColumns, GridRowParams, GridValidRowModel } from '@mui/x-data-grid'
import cs from 'clsx'
import { useMemo } from 'react'

import { DataGrid } from './DataGrid'
import { CTGridUpdate } from '@/models'

import styles from './ServerSideDataGrid.module.sass'

/**
 * This is a workaround to require both selectionModel and onSelectionModelChange to be present
 * if isCheckboxSelection is true and neither to be present if isCheckboxSelection is false
 *
 * These props are required for server side pagination to work with row selection
 */
export type XorSelectionModel =
  | {
      selectionModel: string[]
      isCheckboxSelection: boolean
      onSelectionModelChange: (selectionModel: string[]) => void
    }
  | {
      selectionModel?: never
      onSelectionModelChange?: never
      isCheckboxSelection?: false
    }

export type ServerSideDataGridProps = XorSelectionModel & {
  className: string
  classes?: { cell?: string }
  columns: GridColumns
  data: any[]
  defaultSortColumn?: string
  disableColumnMenu?: boolean
  disableSelectionOnClick?: boolean
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
    disableSelectionOnClick,
    getRowClassName,
    initialState = {},
    isCheckboxSelection = false,
    isLoading,
    isRowSelectable,
    onRowClick,
    onSelectionModelChange,
    paginationModel,
    rowCount = 0,
    selectionModel,
    setPaginationModel,
    setSortModel,
    sortModel,
  } = props

  const rows = data || []

  const columnsWithSort = useMemo<GridColumns>(() => {
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
      disableSelectionOnClick={disableSelectionOnClick}
      getRowClassName={getRowClassName}
      getRowHeight={() => 'auto'}
      initialState={initialState}
      isRowSelectable={isRowSelectable}
      keepNonExistentRowsSelected={true}
      loading={isLoading}
      onPaginationModelChange={setPaginationModel}
      onRowClick={onRowClick}
      onSelectionModelChange={onSelectionModelChange}
      onSortModelChange={setSortModel}
      page={paginationModel.page}
      pageSize={paginationModel.pageSize}
      paginationMode="server"
      rowBuffer={rows.length}
      rowCount={rowCount}
      rows={rows}
      selectionModel={selectionModel}
      sortModel={sortModel}
      sortingMode="server"
    />
  )
}
