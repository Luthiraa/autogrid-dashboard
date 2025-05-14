import dynamic from 'next/dynamic'
import Link from 'next/link'

const MicrogridVisualization = dynamic(() => import('@/components/MicrogridVisualization'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-blue-200 to-blue-100" />
  ),
})

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background Visualization */}
      <div className="absolute inset-0">
        <MicrogridVisualization />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              AutoGrid AI
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Experience the future of energy management with our intelligent microgrid system.
              Monitor, control, and optimize your energy consumption in real-time.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/dashboard" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                View Dashboard
              </Link>
              <a 
                href="#learn-more"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="learn-more" className="mt-32 bg-white/80 backdrop-blur-sm py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Smart Energy Management
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Our comprehensive solution for modern microgrid systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Real-time Monitoring</h3>
                <p className="text-gray-600">
                  Track energy production and consumption with detailed analytics and insights.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">Smart Integration</h3>
                <p className="text-gray-600">
                  Seamlessly integrate solar, wind, and battery storage systems.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-4">AI Optimization</h3>
                <p className="text-gray-600">
                  Optimize energy flow and reduce costs with advanced AI algorithms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
