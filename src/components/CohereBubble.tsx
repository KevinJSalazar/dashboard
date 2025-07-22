import { useState } from "react";
import CohereAssistant from "../functions/CohereAssistant";

interface CohereBubbleProps {
  dataFetcher: any; // Datos meteorológicos de DataFetcher
}

const CohereBubble = (props: CohereBubbleProps) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState<string>("");

  // Se usa el texto del usuario como prompt y los datos de dataFetcher como contexto
  const { data, loading, error } = CohereAssistant({
    dataFetcher: props.dataFetcher?.data || null,
    prompt: prompt,
  });

  const handleSend = () => {
    if (input.trim()) {
      setPrompt(input);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {!open && (
        <button
          style={{
            borderRadius: "50%",
            width: 56,
            height: 56,
            background: "#4F46E5",
            color: "#fff",
            fontSize: 24,
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}
      {open && (
        <div
          style={{
            width: 320,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            padding: 16,
          }}
        >
          <div style={{ marginBottom: 8, fontWeight: "bold" }}>Cohere Chatbot</div>
          <div
            style={{
              minHeight: 60,
              maxHeight: 200,
              marginBottom: 8,
              overflowY: "auto", // Barra de desplazamiento vertical
            }}
          >
            {loading && <span>Cargando...</span>}
            {error && <span style={{ color: "red" }}>{error}</span>}
            {data && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {data.message?.content?.[0]?.text || JSON.stringify(data)}
              </div>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribe tu consulta..."
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ddd",
              marginBottom: 8,
            }}
            onKeyDown={e => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleSend}
              style={{
                background: "#4F46E5",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "#ddd",
                color: "#333",
                border: "none",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohereBubble;