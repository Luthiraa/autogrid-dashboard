interface WeatherForecast {
  day: string;
  temp: string;
  condition: string;
  wind: string;
  icon: string;
}

export async function fetchNorwayWeather(lat = 59.9139, lon = 10.7522): Promise<WeatherForecast[]> {
  try {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'AutoGridAI/1.0 (https://autogrid.ai)'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    const timeseries = data.properties.timeseries;
    
    // Get one forecast per day for the next 3 days
    const forecasts: WeatherForecast[] = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Find forecast for 12:00 (noon) each day
      const forecast = timeseries.find((ts: any) => {
        const forecastDate = new Date(ts.time);
        return forecastDate.getDate() === date.getDate() && forecastDate.getHours() === 12;
      });

      if (forecast) {
        const temp = forecast.data.instant.details.air_temperature;
        const wind = forecast.data.instant.details.wind_speed;
        const symbol = forecast.data.next_1_hours?.summary?.symbol_code || 
                      forecast.data.next_6_hours?.summary?.symbol_code ||
                      'cloudy';
                      
        forecasts.push({
          day: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : getDayName(date),
          temp: `${Math.round(temp)}°C`,
          condition: getConditionFromSymbol(symbol),
          wind: `${Math.round(wind)} m/s`,
          icon: getIconFromSymbol(symbol)
        });
      }
    }
    
    return forecasts;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return [];
  }
}

function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

function getConditionFromSymbol(symbol: string): string {
  // Map Met.no symbol codes to readable conditions
  const conditions: { [key: string]: string } = {
    clearsky: 'Clear Sky',
    fair: 'Fair',
    partlycloudy: 'Partly Cloudy',
    cloudy: 'Cloudy',
    rain: 'Rain',
    snow: 'Snow',
    sleet: 'Sleet',
    fog: 'Fog',
    thunder: 'Thunder'
  };
  
  const baseSymbol = symbol.split('_')[0];
  return conditions[baseSymbol] || 'Unknown';
}

function getIconFromSymbol(symbol: string): string {
  // Map Met.no symbol codes to icon names
  const icons: { [key: string]: string } = {
    clearsky: 'sun',
    fair: 'sun',
    partlycloudy: 'cloud-sun',
    cloudy: 'cloud',
    rain: 'cloud-rain',
    snow: 'snowflake',
    sleet: 'cloud-sleet',
    fog: 'fog',
    thunder: 'cloud-lightning'
  };
  
  const baseSymbol = symbol.split('_')[0];
  return icons[baseSymbol] || 'cloud';
}