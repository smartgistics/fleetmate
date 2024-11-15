import { Dashboard } from "@/components/dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <main className='p-6 bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
          <p className='text-gray-600'>
            Overview of your transportation operations
          </p>
        </div>
        <Dashboard />
      </div>
    </main>
  );
}
