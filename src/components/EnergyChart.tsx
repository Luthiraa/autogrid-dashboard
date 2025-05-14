'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'
import { useEffect, useState } from 'react'
import { fetchMicrogridState } from '@/services/dataService'
import { hourlyTimer } from '@/utils/hourlyTimer'

interface EnergyData {
  time: string;
  solar: number;
  wind: number;
  criticalLoad: number;
  essentialLoad: number;  
  nonEssentialLoad: number;  
  isForecast?: boolean;
}

const MAX_BATTERY_CHARGE = 80; 

export default function EnergyChart() {
  const [data, setData] = useState<EnergyData[]>([]);
  const [nextPrediction, setNextPrediction] = useState<string>('');

  useEffect(() => {
    const fetchAndUpdateData = async () => {
      try {
        const microgridState = await fetchMicrogridState();
        
        const predictionTime = new Date(microgridState.predictionPeriod);
        setNextPrediction(predictionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        
        const currentTime = new Date(microgridState.currentTimestamp);
        
        const newData = Array.from({ length: 169 }, (_, i) => {
          const isLastPoint = i === 168; 
          const hoursAgo = 168 - i;
          const date = new Date(currentTime);
          date.setHours(date.getHours() - hoursAgo);
          const timeStr = `${date.toLocaleDateString()} ${date.getHours().toString().padStart(2, '0')}:00`;

          if (isLastPoint) {

            return {
              time: timeStr,
              solar: -0.3946498900651932,
              wind: 11.134248910476476,
              criticalLoad: 60.313917316993326,
              essentialLoad: 231.63178826036452,
              nonEssentialLoad: 85.05053586227545,
              isForecast: true
            };
          }
          
          const hour = date.getHours();
          const dayProgress = hour / 24;
          const weekdayFactor = date.getDay() === 0 || date.getDay() === 6 ? 0.7 : 1.0;
          const solarFactor = Math.sin(Math.PI * (dayProgress - 0.2)) * 0.8 + 0.2;
          const windFactor = (Math.cos(Math.PI * dayProgress) * 0.3 + 0.2) * (0.8 + Math.random() * 0.4);
          const variation = 0.85 + Math.random() * 0.3;
          
          return {
            time: timeStr,
            solar: Math.max(0, 26.7 * solarFactor * weekdayFactor * variation),
            wind: Math.max(0, 69.2 * windFactor * variation),
            criticalLoad: 81.7 * (0.8 + Math.random() * 0.4) * variation,
            essentialLoad: 231.6 * (0.7 + Math.random() * 0.6) * variation,
            nonEssentialLoad: 113.3 * (0.6 + Math.random() * 0.8) * variation,
            isForecast: false
          };
        });

        setData(newData);
      } catch (error) {
        console.error('Error fetching energy data:', error);
      }
    };

    fetchAndUpdateData();
    const unsubscribe = hourlyTimer.subscribe(fetchAndUpdateData);
    return () => {
      unsubscribe();
    };
  }, []);

  if (data.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading energy data...</div>
      </div>
    );
  }

  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isForecast) {
      return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          stroke="#000"
          strokeWidth={2}
          fill={props.fill}
        />
      );
    }
    return null; 
  };

  return (
    <div className="h-[400px]">
      <div className="mb-2 text-sm text-gray-500">
        Next prediction at: {nextPrediction}
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />          <XAxis 
            dataKey="time" 
            interval={23}
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 10 }}
          />
          <YAxis 
            domain={[0, 250]}
            tickCount={6}
            tick={false}
            axisLine={true}
          />
          <Tooltip />
          <Legend />
          <ReferenceLine
            x={data[data.length - 2]?.time}
            stroke="#EF4444"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="solar"
            stackId="1"
            stroke="#FDB813"
            fill="#FDB813"
            fillOpacity={0.3}
            name="Solar"
            dot={<CustomDot />}
          />
          <Area
            type="monotone"
            dataKey="wind"
            stackId="1"
            stroke="#00A0DC"
            fill="#00A0DC"
            fillOpacity={0.3}
            name="Wind"
            dot={<CustomDot />}
          />          <Area
            type="monotone"
            dataKey="criticalLoad"
            stackId="2"
            stroke="#FF6B6B"
            fill="#FF6B6B"
            fillOpacity={0.3}
            name="Critical Load"
            dot={<CustomDot />}
          />          <Area
            type="monotone"
            dataKey="nonEssentialLoad"
            stackId="2"
            stroke="#9B59B6"
            fill="#9B59B6"
            fillOpacity={0.3}
            name="Non-Critical Load"
            dot={<CustomDot />}
          />
          <Area
            type="monotone"
            dataKey="essentialLoad"
            stackId="2"
            stroke="#4ECDC4"
            fill="#4ECDC4"
            fillOpacity={0.3}
            name="Essential Load"
            dot={<CustomDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
