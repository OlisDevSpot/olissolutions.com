"use client";

import { useRouter } from "next/navigation";

import { signOut } from "@olis/auth/client";
import { Button } from "@olis/ui/components/button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push("/");
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Log-out
    </Button>
  );
}
