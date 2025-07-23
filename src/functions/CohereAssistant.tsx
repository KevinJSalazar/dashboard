import { useState, useEffect } from "react";
import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: "i4dgNTi5po1KAtTqcDWZXWf94EymKcbbZDFQwYxw",
});

interface WeatherParams {
  dataFetcher?: any;
  prompt?: string;
}

const CohereAssistant = (params: WeatherParams) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstQueryDone, setFirstQueryDone] = useState(false);

  useEffect(() => {
    // Construir el contexto meteorológico si existe
    let weatherInfo = "";
    if (params.dataFetcher?.data?.current != null) {
      const current = params.dataFetcher.data.current;
      weatherInfo = `
        Fecha: ${current.time}
        Temperatura: ${current.temperature_2m}°C
        Humedad: ${current.relative_humidity_2m}%
        Temperatura aparente: ${current.apparent_temperature}°C
        Viento: ${current.wind_speed_10m} km/h
      `;
    }

    // Si es la primera carga, usar el mensaje de bienvenida
    let query = `Usa específicamentelos siguientes datos acerca del clima ${weatherInfo} para generar un mensaje de bienvenida e indica al usuario los datos acerca del clima para consultar`;

    // Si ya se hizo la primera consulta y hay prompt, usar el prompt del usuario
    if (firstQueryDone && params.prompt) {
      query = `Siempre usa los siguientes datos meteorológicos: ${weatherInfo} para responder la consulta: ${params.prompt}`;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await cohere.chat({
          model: "command-a-03-2025",
          messages: [{
            role: "user",
            content: [
              {
                type: "text",
                text: query,
              },
            ],
          }],
        });

        setData(response);
        setFirstQueryDone(true);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.dataFetcher, params.prompt]);

  return { data, loading, error };
};

export default CohereAssistant;