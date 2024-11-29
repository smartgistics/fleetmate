import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import cs from 'clsx'
import { ComponentProps, useMemo } from 'react'

import { CellSkeleton } from './CellSkeleton'
import styles from './DataGrid.module.sass'

type DataGridProps<T = any> = ComponentProps<typeof MuiDataGrid<T>>

const skeletonRows = Array.from({ length: 10 }).map((_, id) => ({ id }))

export function DataGrid<T = any>({
  className,
  rows,
  columns,
  loading,
  page,
  pageSize,
  ...rest
}: DataGridProps<T>) {
  const displayCols = useMemo(() => {
    if (!loading) return columns

    return columns.map((column) => ({
      ...column,
      renderCell: () => <CellSkeleton />,
      valueGetter: () => null,
    }))
  }, [columns, loading])

  const displayRows = loading ? skeletonRows : rows

  return (
    <div className={cs(styles.root, className)}>
      <MuiDataGrid
        columns={displayCols}
        experimentalFeatures={{ columnGrouping: true }}
        pageSize={pageSize}
        pageSizeOptions={[pageSize]}
        paginationModel={{ page, pageSize }}
        rows={displayRows as T[]}
        {...rest}
      />
    </div>
  )
}
