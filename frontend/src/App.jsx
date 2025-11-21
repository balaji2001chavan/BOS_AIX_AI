import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function sendPrompt() {
    const res = await fetch("/boss/ask", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>BOSS AiX Control Center</h1>

      <textarea
        rows="3"
        placeholder="Type command..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <br/>
      <button onClick={sendPrompt}>Run</button>

      <pre style={{background:"#111", color:"#0f0", padding:"20px", marginTop:"20px"}}>
        {output}
      </pre>
    </div>
  );
}
