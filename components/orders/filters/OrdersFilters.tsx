interface OrdersFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function OrdersFilters({
  searchTerm,
  setSearchTerm,
}: OrdersFiltersProps) {
  return (
    <div className="mb-4 flex gap-4">
      <input
        className="flex-1 px-4 py-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search orders..."
        type="text"
        value={searchTerm}
      />
    </div>
  )
}
