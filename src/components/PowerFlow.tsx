'use client'

import { ArrowPathIcon, BoltIcon, SunIcon, Battery100Icon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { fetchMicrogridState } from '@/services/dataService'
import { hourlyTimer } from '@/utils/hourlyTimer'

interface PowerFlowState {
  solar: number;
  battery: number;
  grid: number;
  load: number;
  nextUpdate: string;
}

export default function PowerFlow() {
  const [powerData, setPowerData] = useState<PowerFlowState>({
    solar: 0,
    battery: 0,
    grid: 0,
    load: 0,
    nextUpdate: ''
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        const data = await fetchMicrogridState();
        const predictionTime = new Date(data.predictionPeriod);
        const hour = new Date(data.currentTimestamp).getHours();
        
        // Adjust power flow based on time of day and conditions
        const solarFactor = Math.sin(Math.PI * ((hour / 24) - 0.2)) * 0.8 + 0.2;
        const windFactor = Math.cos(Math.PI * (hour / 24)) * 0.05 + 0.02; // Minimal wind, only 2-7% of rated
        
        const solarOutput = data.solarOutput * Math.max(0, solarFactor);
        const windOutput = data.windOutput * windFactor * 0.1; // Further reduce wind by 90%
        const renewablePower = solarOutput + windOutput;
        
        // Calculate battery and grid usage - mutually exclusive
        let batteryContribution = 0;
        let gridContribution = 0;

        if (hour >= 10 && hour <= 15) {
          // During peak solar:
          if (renewablePower > data.houseConsumption * 1.2) {
            // Excess power - charge battery
            batteryContribution = -Math.min(2, (renewablePower - data.houseConsumption) * 0.4);
            // If still excess after battery, sell to grid
            if (renewablePower + batteryContribution > data.houseConsumption) {
              gridContribution = -Math.min(1, (renewablePower + batteryContribution - data.houseConsumption) * 0.3);
            }
          }
        } else if (hour >= 18 || hour <= 6) {
          // Evening/night: prefer battery if above 30%
          if (data.batteryCharge > 30) {
            batteryContribution = Math.min(2, data.houseConsumption * 0.8);
            // Only use grid if battery can't meet demand
            if (renewablePower + batteryContribution < data.houseConsumption) {
              gridContribution = data.houseConsumption - (renewablePower + batteryContribution);
            }
          } else {
            // Battery too low, use grid
            gridContribution = data.houseConsumption - renewablePower;
          }
        } else {
          // Other times: use renewables first, then grid
          if (renewablePower < data.houseConsumption) {
            gridContribution = data.houseConsumption - renewablePower;
          }
        }
        
        setPowerData({
          solar: solarOutput,
          battery: data.batteryCharge,
          grid: gridContribution,
          load: data.houseConsumption,
          nextUpdate: predictionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setError(null);
      } catch (error) {
        setError('Error fetching power flow data. Please try again later.');
        console.error('Error fetching power flow data:', error);
      }
    };

    // Initial fetch
    fetchAndUpdateData();
    
    // Subscribe to hourly updates
    const unsubscribe = hourlyTimer.subscribe(fetchAndUpdateData);
    return unsubscribe;
  }, []);

  if (!powerData.nextUpdate) {
    return (
      <div className="relative h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading power flow data...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[300px]">
      <div className="absolute top-0 left-0 text-sm text-gray-500">
        Next prediction at: {powerData.nextUpdate}
      </div>

      {/* Grid Connection */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
        <div className={`bg-gray-200 p-4 rounded-lg flex items-center ${powerData.grid > 0 ? 'ring-2 ring-green-500' : ''}`}>
          <BoltIcon className="h-6 w-6 text-gray-600 mr-2" />
          <span className="font-medium">Grid {powerData.grid.toFixed(1)} kW</span>
        </div>
      </div>

      {/* Solar Panels */}
      <div className="absolute top-1/4 left-1/4">
        <div className={`bg-yellow-100 p-4 rounded-lg flex items-center ${powerData.solar > 0 ? 'ring-2 ring-yellow-500' : ''}`}>
          <SunIcon className="h-6 w-6 text-yellow-600 mr-2" />
          <span className="font-medium">Solar {powerData.solar.toFixed(1)} kW</span>
        </div>
      </div>

      {/* Battery Storage */}
      <div className="absolute top-1/4 right-1/4">
        <div className={`bg-blue-100 p-4 rounded-lg flex items-center ${Math.abs(powerData.battery - 50) > 10 ? 'ring-2 ring-blue-500' : ''}`}>
          <Battery100Icon className="h-6 w-6 text-blue-600 mr-2" />
          <span className="font-medium">Battery {powerData.battery}%</span>
        </div>
      </div>

      {/* Load Center */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className={`bg-gray-200 p-4 rounded-lg flex items-center ${powerData.load > 0 ? 'ring-2 ring-purple-500' : ''}`}>
          <ArrowPathIcon className="h-6 w-6 text-gray-600 mr-2" />
          <span className="font-medium">Load {powerData.load.toFixed(1)} kW</span>
        </div>
      </div>

      {/* Power Flow Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        {/* Grid to Load */}
        <line
          x1="50%"
          y1="72"
          x2="50%"
          y2="240"
          stroke={powerData.grid > 0 ? "#22C55E" : "#6B7280"}
          strokeWidth="2"
          strokeDasharray={powerData.grid > 0 ? "none" : "5,5"}
        />
        
        {/* Solar to Load */}
        <line
          x1="25%"
          y1="120"
          x2="50%"
          y2="240"
          stroke={powerData.solar > 0 ? "#F59E0B" : "#6B7280"}
          strokeWidth="2"
          strokeDasharray={powerData.solar > 0 ? "none" : "5,5"}
        />
        
        {/* Battery to Load */}
        <line
          x1="75%"
          y1="120"
          x2="50%"
          y2="240"
          stroke={Math.abs(powerData.battery - 50) > 10 ? "#3B82F6" : "#6B7280"}
          strokeWidth="2"
          strokeDasharray={Math.abs(powerData.battery - 50) > 10 ? "none" : "5,5"}
        />
      </svg>
    </div>
  );
}