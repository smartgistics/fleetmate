import React from "react";

interface RateBoxProps {
  title: string;
  rate: string;
}

export function RateBox({ title, rate }: RateBoxProps) {
  return (
    <div className='border rounded p-3 mb-2'>
      <div className='text-lg'>{title}</div>
      <div className='text-xl font-bold text-right italic'>${rate}</div>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({ label, isActive, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium ${
        isActive
          ? "bg-gray-200 text-gray-800"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

export function CapacityTab() {
  const [activeSection, setActiveSection] = React.useState<
    "laneHistory" | "highway" | "ttQuotes"
  >("laneHistory");

  return (
    <div className='space-y-6'>
      {/* Rate Information */}
      <div className='grid grid-cols-1 gap-2'>
        <RateBox title='Last 30 days' rate='1200' />
        <RateBox title='DAT 7 Day' rate='1060' />
        <RateBox title='Greenscreens Network' rate='1000' />
      </div>

      {/* Tabs Section */}
      <div className='border rounded'>
        <div className='flex border-b'>
          <TabButton
            label='Lane history'
            isActive={activeSection === "laneHistory"}
            onClick={() => setActiveSection("laneHistory")}
          />
          <TabButton
            label='Highway'
            isActive={activeSection === "highway"}
            onClick={() => setActiveSection("highway")}
          />
          <TabButton
            label='TT quotes'
            isActive={activeSection === "ttQuotes"}
            onClick={() => setActiveSection("ttQuotes")}
          />
        </div>

        {/* Content Area */}
        <div className='p-4 min-h-[300px]'>
          <div className='text-center text-gray-600'>List of Carriers</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='grid grid-cols-3 gap-4'>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50'
        >
          Post To DAT
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50'
        >
          Post To TT
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50'
        >
          Email Carriers
        </button>
      </div>
    </div>
  );
}

export default CapacityTab;
