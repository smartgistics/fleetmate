interface PaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const maxVisiblePages = 5

  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const end = Math.min(totalPages - 1, start + maxVisiblePages - 3)

    // Adjust start if we're near the end
    if (end === totalPages - 1) {
      start = Math.max(2, end - (maxVisiblePages - 3))
    }

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="flex w-0 flex-1">
        <button
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {getPageNumbers().map((page, index) =>
          typeof page === 'number' ? (
            <button
              className={`
                inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium
                ${
                  currentPage === page
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
              key={index}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span
              className="inline-flex items-center border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
              key={index}
            >
              {page}
            </span>
          )
        )}
      </div>
      <div className="flex w-0 flex-1 justify-end">
        <button
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
