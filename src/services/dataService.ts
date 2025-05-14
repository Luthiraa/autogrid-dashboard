// API configuration
const API_BASE_URL = 'http://localhost:8000';

const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  HEALTH: `${API_BASE_URL}/health`
};

const MAX_BATTERY_CHARGE = 0; // Maximum battery charge to maintain battery health

interface PredictionData {
  currentTimestamp: string;
  predictionPeriod: string;
  solarOutput: number;
  windOutput: number;
  batteryCharge: number;
  houseConsumption: number;
  gridConnection: number;
}

let cachedPrediction: PredictionData | null = null;
let lastFetchTime: Date | null = null;

export const fetchMicrogridState = async () => {
  const now = new Date();
  
  // If we have cached data and it's from the current hour, return it
  if (cachedPrediction && lastFetchTime) {
    const currentHour = now.getHours();
    const lastFetchHour = lastFetchTime.getHours();
    
    if (currentHour === lastFetchHour) {
      return cachedPrediction;
    }
  }

  try {
    const response = await fetch(API_ENDPOINTS.PREDICT);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    
    // Ensure battery charge never exceeds maximum
    data.batteryCharge = Math.min(data.batteryCharge, MAX_BATTERY_CHARGE);
    
    // Cache the new prediction
    cachedPrediction = data;
    lastFetchTime = now;
    
    return data;
  } catch (error) {
    console.error('Error fetching microgrid state:', error);
    // Return cached data if available, otherwise fallback to dummy data
    if (cachedPrediction) {
      return cachedPrediction;
    }
    return {
      currentTimestamp: new Date().toISOString(),
      predictionPeriod: new Date(Date.now() + 3600000).toISOString(),
      solarOutput: 5.2,
      windOutput: 3.8,
      batteryCharge: 65, // More realistic initial battery level
      houseConsumption: 4.2,
      gridConnection: 1.4
    };
  }
};

// Update existing data fetching functions to use the new API
export const fetchGridStatus = async () => {
  const data = await fetchMicrogridState();
  return {
    status: data.gridConnection > 0 ? 'Connected' : 'Disconnected',
    load: data.gridConnection
  };
};

export const fetchCurrentPower = async () => {
  const data = await fetchMicrogridState();
  return {
    solar: data.solarOutput,
    wind: data.windOutput,
    grid: data.gridConnection,
    consumption: data.houseConsumption
  };
};

export const fetchSolarGeneration = async () => {
  const data = await fetchMicrogridState();
  return {
    current: data.solarOutput,
    trend: '+8%'  // This should be calculated based on historical data
  };
};

export const fetchBatteryLevel = async () => {
  const data = await fetchMicrogridState();
  return {
    level: data.batteryCharge,
    trend: data.batteryCharge > 80 ? '+5%' : '-5%'
  };
};

export const fetchGridImport = async () => {
  const data = await fetchMicrogridState();
  return {
    import: data.gridConnection,
    trend: data.gridConnection > 0 ? '+15%' : '-15%'
  };
};

const temporaryData = {
  energySources: [
    {
      name: 'Solar',
      current: 75,
      capacity: 100,
      trend: '+5%',
      status: 'optimal'
    },
    {
      name: 'Wind',
      current: 45,
      capacity: 80,
      trend: '-2%',
      status: 'normal'
    },
    {
      name: 'Battery',
      current: 90,
      capacity: 100,
      trend: '+10%',
      status: 'charging'
    },
    {
      name: 'Grid',
      current: 20,
      capacity: 100,
      trend: '-15%',
      status: 'backup'
    }
  ]
};

export const fetchEnergySources = async () => {
  // TODO: Implement actual API call
  return temporaryData.energySources;
};