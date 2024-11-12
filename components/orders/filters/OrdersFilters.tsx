interface OrdersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function OrdersFilters({
  searchTerm,
  setSearchTerm,
}: OrdersFiltersProps) {
  return (
    <div className='mb-4 flex gap-4'>
      <input
        type='text'
        placeholder='Search orders...'
        className='flex-1 px-4 py-2 border rounded'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
