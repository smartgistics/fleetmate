"use client";

import { MainNav } from "@/components/MainNav";
import { useSidebar } from "./SidebarContext";

export function Sidebar() {
  const { isOpen, isPinned, toggle, togglePin } = useSidebar();

  return (
    <>
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-800 
          transition-all duration-300 ease-in-out
          ${isPinned || isOpen ? "w-48" : "w-12"} 
          overflow-hidden z-30
        `}
        onMouseEnter={() => toggle(true)}
        onMouseLeave={() => toggle(false)}
      >
        <div className='h-full flex flex-col pt-5 pb-4'>
          <div className='flex items-center justify-between px-3 mb-6'>
            <div className='flex items-center gap-2'>
              <h1
                className={`text-white font-bold whitespace-nowrap transition-opacity duration-300 text-sm
                  ${isPinned || isOpen ? "opacity-100" : "opacity-0"}
                `}
              >
                Navigation
              </h1>
            </div>
            <button
              onClick={togglePin}
              className={`text-gray-400 hover:text-white transition-colors
                ${isPinned || isOpen ? "opacity-100" : "opacity-0"}
              `}
              title={isPinned ? "Collapse Sidebar" : "Pin Sidebar"}
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isPinned ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 5l7 7-7 7M5 5l7 7-7 7'
                  />
                )}
              </svg>
            </button>
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MainNav collapsed={!isPinned && !isOpen} />
          </div>
        </div>
      </div>

      {/* Add margin to main content to account for fixed sidebar */}
      <div
        className={`${isPinned || isOpen ? "w-48" : "w-12"} flex-shrink-0`}
      />
    </>
  );
}
