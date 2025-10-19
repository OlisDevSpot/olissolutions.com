"use client";

import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { useSession } from "@workspace/auth/client";

export default function Page() {
  async function handleClick() {
    const data = await fetch("http://localhost:8787/api").then<{
      msg: string;
      cookie: string;
    }>((res) => res.json());
    toast.success(`msg: ${data.msg}, cookie: ${data.cookie}`);
  }

  const { data: session } = useSession()

  console.log({session})

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
