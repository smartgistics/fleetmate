import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-6">FleetMate TMS</div>
        <nav className="space-y-2">
          <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          <Link to="/shipments" className="block py-2 px-4 rounded hover:bg-gray-700">Shipments</Link>
          <Link to="/carriers" className="block py-2 px-4 rounded hover:bg-gray-700">Carriers</Link>
          <Link to="/customers" className="block py-2 px-4 rounded hover:bg-gray-700">Customers</Link>
          <Link to="/reports" className="block py-2 px-4 rounded hover:bg-gray-700">Reports</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Active Shipments</h2>
            <p className="text-3xl font-bold">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Revenue (MTD)</h2>
            <p className="text-3xl font-bold">$45,678</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Pending Deliveries</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        {/* Recent Shipments Table */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Shipments</h2>
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left">Shipment ID</th>
                  <th className="px-6 py-3 text-left">Customer</th>
                  <th className="px-6 py-3 text-left">Origin</th>
                  <th className="px-6 py-3 text-left">Destination</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4">#12345</td>
                  <td className="px-6 py-4">ABC Company</td>
                  <td className="px-6 py-4">Los Angeles, CA</td>
                  <td className="px-6 py-4">Chicago, IL</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded">In Transit</span>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
