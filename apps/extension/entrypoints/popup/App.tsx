import "./App.css";
import { Button } from "@olis/ui/components/button";
import { toast } from "sonner";

function App() {
  async function handleClick() {
    const data = await fetch("http://localhost:8787/api").then<{
      msg: string;
      cookie: string;
    }>((res) => res.json());
    toast.success(`message: ${data.msg}, cookie: ${data.cookie}`);
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
