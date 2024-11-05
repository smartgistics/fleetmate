import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Shipments, { mockShipments } from './components/Shipments';
import Carriers from './components/Carriers';
import Customers from './components/Customers';
import Dashboard from './components/Dashboard';
import NewShipmentModal from './components/NewShipmentModal';
import Dispatch from './pages/Dispatch';

// Global Search Component
const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchResults = mockShipments
      .filter(shipment => 
        Object.values(shipment)
          .join(' ')
          .toLowerCase()
          .includes(value.toLowerCase())
      )
      .slice(0, 5)
      .map(shipment => ({
        type: 'shipment',
        id: shipment.id,
        title: `Shipment #${shipment.id}`,
        subtitle: `${shipment.customer} - ${shipment.pickupLocation} to ${shipment.deliveryLocation}`
      }));

    setResults(searchResults);
    setIsOpen(true);
  };

  const handleResultClick = (result) => {
    switch (result.type) {
      case 'shipment':
        navigate('/shipments');
        break;
      case 'carrier':
        navigate('/carriers');
        break;
      case 'customer':
        navigate('/customers');
        break;
      default:
        break;
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative flex-1 max-w-lg">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search shipments, carriers, customers..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg"
          onMouseDown={(e) => e.preventDefault()}
        >
          <ul className="py-1">
            {results.map((result) => (
              <li 
                key={`${result.type}-${result.id}`}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <div className="text-sm font-medium text-gray-900">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500">
                  {result.subtitle}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Add Button Component
const AddButton = ({ onNewShipment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add
      </button>
      {/* ... rest of the component ... */}
    </div>
  );
};

function App() {
  const [isNewShipmentModalOpen, setIsNewShipmentModalOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-gray-800">
            <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <svg 
                  className="h-8 w-8 text-blue-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
                  />
                </svg>
                <span className="ml-2 text-xl font-semibold text-white">FleetMate TMS</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <SidebarLink to="/" icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }>
                  Dashboard
                </SidebarLink>
                <SidebarLink to="/dispatch" icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                }>
                  Dispatch
                </SidebarLink>
                <SidebarLink to="/shipments" icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                  </svg>
                }>
                  Shipments
                </SidebarLink>
                <SidebarLink to="/carriers" icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                }>
                  Carriers
                </SidebarLink>
                <SidebarLink to="/customers" icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }>
                  Customers
                </SidebarLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Updated Top Navigation */}
          <header className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center h-16">
                {/* Left section */}
                <div className="flex-shrink-0 w-48">
                  <PageTitle />
                </div>

                {/* Center section with search */}
                <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-lg">
                    <GlobalSearch />
                  </div>
                </div>

                {/* Right section with Add button */}
                <div className="flex-shrink-0 flex items-center justify-end w-48">
                  <AddButton onNewShipment={() => setIsNewShipmentModalOpen(true)} />
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dispatch" element={<Dispatch />} />
                  <Route 
                    path="/shipments" 
                    element={
                      <Shipments 
                        isNewShipmentModalOpen={isNewShipmentModalOpen}
                        setIsNewShipmentModalOpen={setIsNewShipmentModalOpen}
                      />
                    } 
                  />
                  <Route path="/carriers" element={<Carriers />} />
                  <Route path="/customers" element={<Customers />} />
                </Routes>
              </div>
            </div>
          </main>

          {/* Global New Shipment Modal */}
          <NewShipmentModal 
            isOpen={isNewShipmentModalOpen}
            onClose={() => setIsNewShipmentModalOpen(false)}
          />
        </div>
      </div>
    </Router>
  );
}

// Helper Components
function SidebarLink({ to, children, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`${
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
    >
      <div className={`${
        isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
      } mr-3 flex-shrink-0`}>
        {icon}
      </div>
      {children}
    </Link>
  );
}

function PageTitle() {
  const location = useLocation();
  const titles = {
    '/': 'Dashboard',
    '/shipments': 'Shipments',
    '/carriers': 'Carriers',
    '/customers': 'Customers'
  };
  
  return (
    <h1 className="text-2xl font-semibold text-gray-900">
      {titles[location.pathname]}
    </h1>
  );
}

export default App;
