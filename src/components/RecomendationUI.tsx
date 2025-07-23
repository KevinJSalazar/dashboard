interface RecomendationProps {
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  apparent_temperature: number;
}

const getWeatherTips = (data: RecomendationProps): string[] => {
  const tips: string[] = [];

  // Temperatura
  if (data.temperature_2m > 30) {
    tips.push("Hace mucho calor, mantente hidratado y evita el sol directo.");
  } else if (data.temperature_2m < 15) {
    tips.push("La temperatura es baja, usa ropa abrigada si sales.");
  } else {
    tips.push("La temperatura es agradable, disfruta actividades al aire libre.");
  }

  // Humedad
  if (data.relative_humidity_2m > 80) {
    tips.push("La humedad es alta, ventila los ambientes y cuida la piel.");
  } else if (data.relative_humidity_2m < 40) {
    tips.push("La humedad es baja, usa crema hidratante y bebe suficiente agua.");
  } else {
    tips.push("La humedad es moderada, el ambiente es confortable.");
  }

  // Viento / Temperatura aparente
  if (data.wind_speed_10m > 20) {
    tips.push("Hay viento fuerte, ten precaución y asegura objetos sueltos.");
  } else if (Math.abs(data.apparent_temperature - data.temperature_2m) > 3) {
    tips.push("La temperatura aparente es diferente a la real, considera cómo te sientes al salir.");
  } else {
    tips.push("El clima es estable, disfruta tu día.");
  }

  return tips.slice(0, 3);
};

const RecomendationUI = (props: RecomendationProps) => {
  const consejos = getWeatherTips(props);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.15)",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        marginBottom: "16px",
      }}
    >
      <h3>Consejos del día</h3>
      <ul>
        {consejos.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecomendationUI;