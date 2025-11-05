import { usePathname } from "next/navigation";

export function useCurrentProjectId() {
  const pathname = usePathname();
  const segments = pathname.split("/").slice(1);
  const projectIdIndex = segments.indexOf("projects") + 1;

  return segments[projectIdIndex] || "";
}
