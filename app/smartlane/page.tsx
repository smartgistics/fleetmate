import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis } from 'recharts'

export default function SmartlanePage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card className="p-6">
        <div className="space-y-2">
          <h6 className="text-sm text-gray-500">Search Parameters</h6>
          <h1 className="text-2xl font-bold">SmartPricing</h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Origin</p>
              <p className="text-xl font-semibold">Atlanta, GA</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-xl font-semibold">457 Miles</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-xl font-semibold">Tampa, FL</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* SMARTGISTICS Rate Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">SMARTGISTICS Rate (Primary)</h2>
          <div className="space-y-4">
            <div>
              <span className="text-4xl font-bold">$1,637</span>
              <p className="text-sm text-gray-500">Average Buy Rate</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 bg-green-500 rounded"></div>
              <span className="text-sm">80% Confidence</span>
            </div>
            <div className="text-right">
              <p className="text-sm">Low: $1,500</p>
              <p className="text-sm">High: $1,800</p>
            </div>
          </div>
        </Card>

        {/* Rate Trend Card */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Rate Trend (Last 30 Days)</h2>
          <div className="h-[200px] w-full">
            {/* Add your chart component here */}
          </div>
        </Card>
      </div>

      {/* DAT/Greenscreen Section */}
      <div>
        <Tabs defaultValue="dat">
          <TabsList>
            <TabsTrigger value="dat">DAT</TabsTrigger>
            <TabsTrigger value="greenscreen">Greenscreen</TabsTrigger>
          </TabsList>
        </Tabs>
        <Card className="p-6 mt-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-3xl font-bold">$1,486</span>
              <p className="text-sm text-gray-500">Broker to Carrier Spot</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Low: $1,354</p>
              <p className="text-sm">High: $1,600</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Carrier Details Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Carrier Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Last Shipment</th>
                <th className="pb-4">Carrier</th>
                <th className="pb-4">Loads</th>
                <th className="pb-4">Last Rate</th>
                <th className="pb-4">Min - Max</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-4">10/15/2024</td>
                <td>STELLE CORPORATION</td>
                <td>1</td>
                <td>$1,500.00</td>
                <td>$1,500 - $1,500</td>
              </tr>
              <tr className="border-t">
                <td className="py-4">10/15/2024</td>
                <td>GULF RELAY, LLC</td>
                <td>1</td>
                <td>$1,800.00</td>
                <td>$1,800 - $1,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 