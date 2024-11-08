interface ShipmentsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCarrier: string;
  setSelectedCarrier: (carrier: string) => void;
  uniqueCarriers: string[];
}

export function ShipmentsFilters({
  searchTerm,
  setSearchTerm,
  selectedCarrier,
  setSelectedCarrier,
  uniqueCarriers,
}: ShipmentsFiltersProps) {
  return (
    <div className='mb-4 flex gap-4'>
      <input
        type='text'
        placeholder='Search shipments...'
        className='flex-1 px-4 py-2 border rounded'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className='border rounded px-4 py-2'
        value={selectedCarrier}
        onChange={(e) => setSelectedCarrier(e.target.value)}
      >
        <option value='all'>All Carriers</option>
        {uniqueCarriers.map((carrier: string) => (
          <option key={carrier} value={carrier}>
            {carrier}
          </option>
        ))}
      </select>
    </div>
  );
}
