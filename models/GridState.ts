export interface CTGridStateParams<T = any> {
  defaultSort?: string
  page?: number
  pageSize?: number
  rowCount?: number
  selectedRows?: T[]
  sort?: string
  toggleComparator?: (savedFilter, toggleFilter) => boolean
}

type SortModel = {
  field: string
  sort?: string
}

export class CTGridState<T = any> implements CTGridStateParams {
  constructor(params?: CTGridStateParams) {
    this._sort = params?.sort || ''
    this.defaultSort = params?.defaultSort || ''

    this.selectedRows = params?.selectedRows
    this.page = params?.page || 1
    this.pageSize = params?.pageSize || 10
    this.toggleComparator = params?.toggleComparator || defaultToggleComparator
    this.rowCount = params?.rowCount || 0
    this.selectedRows = params?.selectedRows || []
  }

  private _sort: string
  defaultSort = ''

  page: number
  pageSize: number
  toggleComparator: (savedFilter: any, toggleFilter: any) => boolean
  rowCount: number
  selectedRows: T[]

  get sort() {
    return this._sort
  }

  set sort(val: string) {
    if (!val) {
      this._sort = this.defaultSort
      return
    }

    this._sort = val
  }

  get defaultSortField() {
    const [field] = this.defaultSort?.split('-') || []
    return field
  }

  get sortModel() {
    if (!this.sort) return []

    const [field, sort] = this.sort.split('-')
    return [{ field, sort }]
  }

  set sortModel([val]: SortModel[]) {
    this.sort = val && `${val.field}-${val.sort}`
  }
}

export type CTGridKey = Exclude<
  keyof CTGridState,
  'toggleComparator' | 'defaultSortModel'
>

export type CTGridUpdate = <T extends CTGridKey>(
  val: CTGridState[T],
  propName: T
) => void

const defaultToggleComparator = (savedFilter, toggleFilter) => {
  return savedFilter.includes(toggleFilter)
}

export function generateGridStateSelector<T = any>(gridState: CTGridState<T>) {
  return {
    defaultSort: gridState.defaultSort,
    defaultSortField: gridState.defaultSortField,
    page: gridState.page,
    pageSize: gridState.pageSize,
    rowCount: gridState.rowCount,
    selectedRows: gridState.selectedRows,
    sort: gridState.sort,
    sortModel: gridState.sortModel,
    toggleComparator: gridState.toggleComparator,
  }
}
