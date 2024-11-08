"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchResult } from "@/types";

export function GlobalSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    // In a real app, this would be an API call
    const searchResults = await fetch(`/api/search?q=${value}`).then((res) =>
      res.json()
    );

    setResults(searchResults);
    setIsOpen(true);
  };

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case "shipment":
        router.push(`/shipments/${result.id}`);
        break;
      case "carrier":
        router.push(`/carriers/${result.id}`);
        break;
      case "customer":
        router.push(`/customers/${result.id}`);
        break;
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className='relative flex-1 max-w-lg'>
      {/* Search input */}
      <div className='relative'>
        <input
          type='text'
          className='w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Search shipments, carriers, customers...'
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
        />
        {/* Search icon */}
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className='absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg'>
          <ul className='py-1'>
            {results.map((result) => (
              <li
                key={`${result.type}-${result.id}`}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                onClick={() => handleResultClick(result)}
              >
                <div className='text-sm font-medium text-gray-900'>
                  {result.title}
                </div>
                <div className='text-xs text-gray-500'>{result.subtitle}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
