"use client";

import { Button } from "@workspace/ui/components/button";
import { db } from "@workspace/db";

export default function Page() {
  async function handleClick() {
    const data = await fetch("http://localhost:8787/api").then((res) =>
      res.json()
    );
    alert(data);
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button
          size="sm"
          onClick={handleClick}
        >
          Button
        </Button>
      </div>
    </div>
  );
}
