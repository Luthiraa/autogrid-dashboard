import EnergyChart from '@/components/EnergyChart'
import StatusCards from '@/components/StatusCards'
import WeatherForecast from '@/components/WeatherForecast'

export default function Dashboard() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Microgrid Dashboard</h1>
        
        {/* Status Overview Cards */}
        <div className="mb-8">
          <StatusCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Energy Charts */}
          <div className="lg:col-span-2 space-y-8">            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Energy Production & Consumption</h2>
              <EnergyChart />
            </div>
          </div>

          {/* Right Column - Weather and Alerts */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
              <WeatherForecast />
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">System Alerts</h2>
              <div className="text-gray-600">
                <p>No active alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 