import { useState } from "react";
import "./App.css";
import { Button } from "@workspace/ui/components/button";

function App() {
  const [count, setCount] = useState(0);

  const [msg, sendMsg] = useState();

  async function handleClick() {
    const data = await fetch("http://localhost:8787/api").then((res) =>
      res.json()
    );
    alert(data);
  }

  return (
    <>
      <div>
        <Button onClick={handleClick}>My Button</Button>
      </div>
    </>
  );
}

export default App;
