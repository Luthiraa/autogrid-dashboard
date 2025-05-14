'use client'

import { useState } from 'react'

interface PowerFlowData {
  solarOutput: number
  windOutput: number
  batteryCharge: number
  houseConsumption: number
  gridConnection: number
}

// Example data - in a real app, this would come from your API
const initialData: PowerFlowData = {
  solarOutput: 5.2,
  windOutput: 3.8,
  batteryCharge: 85,
  houseConsumption: 4.2,
  gridConnection: 1.4,
}

export default function MicrogridVisualization() {
  const [data, setData] = useState<PowerFlowData>(initialData)
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  const getStatusColor = (value: number) => {
    if (value > 4) return '#22c55e' // green-500
    if (value > 2) return '#eab308' // yellow-500
    return '#ef4444' // red-500
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ maxHeight: '70vh' }}
      >
        {/* Grid Background Pattern */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />

        {/* Solar Panel */}
        <g
          transform="translate(150,50)"
          onMouseEnter={() => setHoveredElement('solar')}
          onMouseLeave={() => setHoveredElement(null)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect
            x="-40"
            y="-20"
            width="80"
            height="40"
            fill="#60a5fa"
            stroke="#3b82f6"
            strokeWidth="2"
            transform="skewY(-15)"
          />
          <text
            x="0"
            y="50"
            textAnchor="middle"
            className="text-sm fill-gray-700"
          >
            Solar Panel
          </text>
          {hoveredElement === 'solar' && (
            <text
              x="0"
              y="70"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {data.solarOutput.toFixed(1)} kW
            </text>
          )}
        </g>

        {/* Wind Turbine */}
        <g
          transform="translate(650,100)"
          onMouseEnter={() => setHoveredElement('wind')}
          onMouseLeave={() => setHoveredElement(null)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke="#475569"
            strokeWidth="8"
          />
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="#475569"
          />
          <g className="animate-spin origin-center" style={{ transformBox: 'fill-box' }}>
            <path
              d="M 0 0 L -40 -20 L -35 -25 L 5 -5 Z"
              fill="#475569"
            />
            <path
              d="M 0 0 L 20 -40 L 25 -35 L 5 5 Z"
              fill="#475569"
              transform="rotate(120)"
            />
            <path
              d="M 0 0 L 20 40 L 25 35 L 5 -5 Z"
              fill="#475569"
              transform="rotate(240)"
            />
          </g>
          <text
            x="0"
            y="120"
            textAnchor="middle"
            className="text-sm fill-gray-700"
          >
            Wind Turbine
          </text>
          {hoveredElement === 'wind' && (
            <text
              x="0"
              y="140"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {data.windOutput.toFixed(1)} kW
            </text>
          )}
        </g>

        {/* Battery */}
        <g
          transform="translate(400,300)"
          onMouseEnter={() => setHoveredElement('battery')}
          onMouseLeave={() => setHoveredElement(null)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <rect
            x="-30"
            y="-50"
            width="60"
            height="100"
            fill="white"
            stroke="#475569"
            strokeWidth="2"
            rx="5"
          />
          <rect
            x="-20"
            y="-40"
            width="40"
            height={80 * (data.batteryCharge / 100)}
            fill={getStatusColor(data.batteryCharge / 20)}
            transform={`translate(0,${40 - (40 * data.batteryCharge / 100)})`}
          />
          <rect
            x="-10"
            y="-55"
            width="20"
            height="10"
            fill="#475569"
          />
          <text
            x="0"
            y="70"
            textAnchor="middle"
            className="text-sm fill-gray-700"
          >
            Battery
          </text>
          {hoveredElement === 'battery' && (
            <text
              x="0"
              y="90"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {data.batteryCharge}%
            </text>
          )}
        </g>

        {/* House */}
        <g
          transform="translate(400,500)"
          onMouseEnter={() => setHoveredElement('house')}
          onMouseLeave={() => setHoveredElement(null)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <path
            d="M -50 0 L -50 -50 L 0 -90 L 50 -50 L 50 0 Z"
            fill="white"
            stroke="#475569"
            strokeWidth="2"
          />
          <rect
            x="-15"
            y="-35"
            width="30"
            height="35"
            fill={getStatusColor(data.houseConsumption)}
          />
          <text
            x="0"
            y="20"
            textAnchor="middle"
            className="text-sm fill-gray-700"
          >
            House
          </text>
          {hoveredElement === 'house' && (
            <text
              x="0"
              y="40"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {data.houseConsumption.toFixed(1)} kW
            </text>
          )}
        </g>

        {/* Grid Connection */}
        <g
          transform="translate(150,500)"
          onMouseEnter={() => setHoveredElement('grid')}
          onMouseLeave={() => setHoveredElement(null)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <circle
            cx="0"
            cy="0"
            r="30"
            fill="white"
            stroke="#475569"
            strokeWidth="2"
          />
          <path
            d="M -15 -15 L 15 15 M -15 15 L 15 -15"
            stroke={getStatusColor(data.gridConnection)}
            strokeWidth="3"
          />
          <text
            x="0"
            y="50"
            textAnchor="middle"
            className="text-sm fill-gray-700"
          >
            Grid
          </text>
          {hoveredElement === 'grid' && (
            <text
              x="0"
              y="70"
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {data.gridConnection > 0 ? '+' : ''}{data.gridConnection.toFixed(1)} kW
            </text>
          )}
        </g>

        {/* Power Flow Lines */}
        <g className="power-lines">
          {/* Solar to Battery */}
          <line
            x1="150"
            y1="100"
            x2="400"
            y2="300"
            stroke="#93c5fd"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          {/* Wind to Battery */}
          <line
            x1="650"
            y1="200"
            x2="400"
            y2="300"
            stroke="#93c5fd"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          {/* Battery to House */}
          <line
            x1="400"
            y1="350"
            x2="400"
            y2="450"
            stroke="#93c5fd"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
          {/* Grid to House */}
          <line
            x1="180"
            y1="500"
            x2="350"
            y2="500"
            stroke="#93c5fd"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
          />
        </g>

        {/* Arrow Marker */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#93c5fd"
            />
          </marker>
        </defs>
      </svg>
    </div>
  )
} 