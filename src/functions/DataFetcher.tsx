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

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos en milisegundos

const DataFetcher = (selectedCity: string) => {
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

    const cacheKey = `weather_${selectedCity}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const { timestamp, data: cachedData } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setData(cachedData);
        setLoading(false);
        setError(null);
        return;
      }
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ timestamp: Date.now(), data: result })
        );
      } catch (err: any) {
        setError(err.message);
        // Si hay datos cacheados, usarlos como fallback
        if (cached) {
          const { data: cachedData } = JSON.parse(cached);
          setData(cachedData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity]);

  // Prefetch de todas las ciudades al cargar la app
  useEffect(() => {
    Object.entries(cityCoordinates).forEach(async ([city, coords]) => {
      const cacheKey = `weather_${city}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          // Cache vigente, no hace falta pedirlo
          return;
        }
      }

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const result: OpenMeteoResponse = await response.json();
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ timestamp: Date.now(), data: result })
          );
        }
      } catch {
        // Silenciar errores de prefetch
      }
    });
  }, []);

  return { data, loading, error };
};

export default DataFetcher;