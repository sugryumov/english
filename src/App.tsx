import { useMemo } from "react";
import { VERBS } from "./constants/verbs";
import { Test } from "./Test";
import "./App.css";

function App() {
  const array = useMemo(() => VERBS.sort(() => Math.random() - 0.5), []);

  return (
    <div className="App">
      <Test array={array} />
    </div>
  );
}

export default App;
