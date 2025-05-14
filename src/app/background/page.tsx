'use client';

import { LightBulbIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'

const backgroundInfo = [
  {
    title: 'The Challenge',
    description: 'Traditional power grids face increasing challenges with reliability, efficiency, and integration of renewable energy sources. Microgrids offer a solution but require sophisticated management systems.',
    icon: LightBulbIcon
  },
  {
    title: 'Our Solution',
    description: 'AutoGrid AI provides an intelligent platform for microgrid management, combining real-time monitoring, predictive analytics, and automated control systems.',
    icon: ChartBarIcon
  },
  {
    title: 'Global Impact',
    description: 'By enabling efficient microgrid management, we contribute to the global transition towards sustainable energy systems and reduced carbon emissions.',
    icon: GlobeAltIcon
  }
];

const timeline = [
  {
    year: '2020',
    event: 'Project Inception',
    description: 'Initial research and development of microgrid management concepts'
  },
  {
    year: '2021',
    event: 'Prototype Development',
    description: 'First working prototype with basic monitoring capabilities'
  },
  {
    year: '2022',
    event: 'AI Integration',
    description: 'Implementation of machine learning algorithms for predictive analytics'
  },
  {
    year: '2023',
    event: 'Platform Launch',
    description: 'Public release of AutoGrid AI with full feature set'
  }
];

export default function BackgroundPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Project Background</h1>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Problem Statement</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-4">
              As the world transitions towards renewable energy, managing microgrids becomes increasingly complex. 
              Traditional energy management systems struggle with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Unpredictable renewable energy generation patterns</li>
              <li>Complex load balancing between multiple energy sources</li>
              <li>Optimal energy storage management</li>
              <li>Real-time decision making for energy distribution</li>
              <li>Integration of various energy sources and storage systems</li>
            </ul>
          </div>
        </section>

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 mb-6">
              AutoGrid AI is an intelligent microgrid management system that leverages artificial intelligence 
              to optimize energy distribution, storage, and consumption. The system provides:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Real-time monitoring and analytics</li>
                  <li>AI-powered load prediction</li>
                  <li>Automated energy source optimization</li>
                  <li>Smart storage management</li>
                  <li>Predictive maintenance</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Next.js for the frontend</li>
                  <li>Python for AI/ML models</li>
                  <li>TensorFlow for deep learning</li>
                  <li>Real-time data processing</li>
                  <li>Cloud-based architecture</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                <h3 className="text-lg font-semibold text-gray-900">Phase 1: Research and Planning</h3>
                <p className="text-gray-600 mt-2">
                  Initial research, problem analysis, and system architecture design.
                  Identification of key technologies and methodologies.
                </p>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>
              <div className="relative pl-8 border-l-2 border-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                <h3 className="text-lg font-semibold text-gray-900">Phase 2: Development</h3>
                <p className="text-gray-600 mt-2">
                  Implementation of core features, AI model development, and integration
                  of various system components.
                </p>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>
              <div className="relative pl-8 border-l-2 border-blue-500">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                <h3 className="text-lg font-semibold text-gray-900">Phase 3: Testing and Optimization</h3>
                <p className="text-gray-600 mt-2">
                  System testing, performance optimization, and real-world pilot deployments.
                </p>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0" />
                <h3 className="text-lg font-semibold text-gray-900">Phase 4: Deployment</h3>
                <p className="text-gray-600 mt-2">
                  Full system deployment, user training, and continuous monitoring and improvements.
                </p>
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>
            </div>
          </div>
        </section>

        {/* Expected Impact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expected Impact</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">30%</div>
                <p className="text-gray-600">Reduction in energy costs</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">25%</div>
                <p className="text-gray-600">Increase in renewable energy utilization</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-blue-500 mb-2">40%</div>
                <p className="text-gray-600">Improvement in system efficiency</p>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              These improvements will contribute to more sustainable energy usage, reduced carbon emissions,
              and significant cost savings for microgrid operators.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
} 