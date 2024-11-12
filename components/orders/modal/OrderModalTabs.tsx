interface Tab {
  id: string;
  name: string;
  icon: string;
}

interface OrderModalTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export function OrderModalTabs({
  activeTab,
  setActiveTab,
}: OrderModalTabsProps) {
  const tabs: Tab[] = [
    {
      id: "customer",
      name: "Customer",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      id: "orderDetails",
      name: "Order Details",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      id: "financials",
      name: "Financials",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <nav className='flex -mb-px px-6 overflow-x-auto' aria-label='Tabs'>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center
            ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }
          `}
        >
          <svg
            className='w-5 h-5 mr-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={tab.icon}
            />
          </svg>
          {tab.name}
        </button>
      ))}
    </nav>
  );
}
