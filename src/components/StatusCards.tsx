'use client'

import { BoltIcon, Battery100Icon, BoltSlashIcon, FireIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { fetchMicrogridState } from '@/services/dataService'
import { hourlyTimer } from '@/utils/hourlyTimer'

interface StatusData {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendColor: string;
}

export default function StatusCards() {
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [nextUpdate, setNextUpdate] = useState<string>('');

  useEffect(() => {
    const updateData = () => {
      // Using specific power values
      setStatusData([
        {
          title: 'Battery Control',
          value: '100%',
          icon: Battery100Icon,
          trend: 'Charging',
          trendColor: 'text-green-500'
        },
        {
          title: 'Fuel Cell',
          value: '100%',
          icon: FireIcon,
          trend: 'Max Power',
          trendColor: 'text-yellow-500'
        },
        {
          title: 'Generator',
          value: '80%',
          icon: Cog6ToothIcon,
          trend: 'Power Output',
          trendColor: 'text-blue-500'
        },
        {
          title: 'Grid Mode',
          value: 'Island',
          icon: BoltSlashIcon,
          trend: 'Independent',
          trendColor: 'text-orange-500'
        },
      ]);
    };

    // Initial update
    updateData();
    
    // Subscribe to hourly updates
    const unsubscribe = hourlyTimer.subscribe(updateData);
    return unsubscribe;
  }, [nextUpdate]);

  if (statusData.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statusData.map((item) => (
        <div
          key={item.title}
          className="bg-gray-800 rounded-lg shadow p-6 text-gray-100"
        >
          <div className="flex items-center">
            <item.icon className="h-8 w-8 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-400">{item.title}</p>
              <p className="text-2xl font-semibold text-white">
                {item.value}
              </p>
              <p className={`text-sm ${item.trendColor}`}>
                {item.trend}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}