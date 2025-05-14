'use client'

import { useEffect, useState } from 'react'
import { fetchNorwayWeather } from '@/services/weatherService'
import { hourlyTimer } from '@/utils/hourlyTimer'
import { CloudIcon } from '@heroicons/react/24/outline'
import { SunIcon } from '@heroicons/react/24/outline'
import { CloudArrowDownIcon } from '@heroicons/react/24/outline'  // Using CloudArrowDownIcon to represent rain
import { EyeIcon } from '@heroicons/react/24/outline'
import { BoltIcon as CloudLightningIcon } from '@heroicons/react/24/outline'
import { CloudIcon as CloudSunIcon } from '@heroicons/react/24/outline'
import { CloudIcon as SnowflakeIcon } from '@heroicons/react/24/outline'

interface WeatherData {
  day: string;
  temp: string;
  condition: string;
  wind: string;
  icon: string;
}

const iconMap = {
  'sun': SunIcon,
  'cloud': CloudIcon,
  'cloud-sun': CloudSunIcon,
  'snowflake': SnowflakeIcon,
  'cloud-lightning': CloudLightningIcon,
  'cloud-sleet': CloudArrowDownIcon,
  'fog': EyeIcon
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'rain':
      return CloudArrowDownIcon;  // Using CloudArrowDownIcon for rain
    case 'sunny':
      return SunIcon;
    case 'cloudy':
      return CloudIcon;
    case 'storm':
      return CloudLightningIcon;
    default:
      return CloudIcon;
  }
};

export default function WeatherForecast() {
  const [forecast, setForecast] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchNorwayWeather();
        setForecast(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchWeather();
    
    // Subscribe to hourly updates
    const unsubscribe = hourlyTimer.subscribe(fetchWeather);
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full mr-4" />
              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="text-right">
              <div className="h-4 w-12 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {forecast.map((day) => {
        const Icon = getWeatherIcon(day.condition) || CloudIcon;
        return (
          <div key={day.day} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Icon className="h-8 w-8 text-gray-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900">{day.day}</p>
                <p className="text-sm text-gray-500">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{day.temp}</p>
              <p className="text-sm text-gray-500">Wind: {day.wind}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}