import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/DashboardTypes";

interface CityCoordinates {
  [key: string]: { latitude: number; longitude: number };
}

const cityCoordinates: CityCoordinates = {
  guayaquil: { latitude: -2.1894, longitude: -79.8891 },
  quito: { latitude: -0.1807, longitude: -78.4678 },
  manta: { latitude: -0.9677, longitude: -80.7089 },
  cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

const DataFetcher = (selectedCity: string) => { // Accept selectedCity as a prop
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const coords = cityCoordinates[selectedCity];
    if (!coords) {
      setError("City not found.");
      setLoading(false);
      setData(null);
      return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;
      
    const fetchData = async () => {
      setLoading(true); // Set loading to true on each new fetch
      setError(null);   // Clear previous errors
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]); // Re-run effect when selectedCity changes

  return { data, loading, error };
};

export default DataFetcher;