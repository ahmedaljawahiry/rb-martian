import { useState } from "react";
import { moveMartians } from "../mars";

const INITIAL_INPUT =
  "5 3\n1 1 E \nRFRFRFRF\n\n3 2 N\nFRRFLLFFRRFLL\n\n0 3 W \nLLFFFLFLFL";

export default function App() {
  const [input, setInput] = useState(INITIAL_INPUT);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  function onClickGo() {
    setError(undefined);
    try {
      setResult(moveMartians(input));
    } catch (e) {
      console.error(e);
      setError(e.toString());
      setResult([]);
    }
  }

  return (
    <>
      <h1>RB Martian</h1>
      <div style={{ display: "flex", gap: 24 }}>
        <div>
          <textarea
            cols={30}
            rows={20}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="card">
            <button onClick={onClickGo} disabled={!input}>
              Go
            </button>
          </div>
        </div>
        <div style={{ width: "150px" }}>
          {error ? <p style={{ color: "red" }}>{error}</p> : null}
          {result.map(({ coordinates: [x, y], orientation, isLost }, index) => (
            <p key={index}>
              {x} {y} {orientation} {isLost ? "LOST" : ""}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
