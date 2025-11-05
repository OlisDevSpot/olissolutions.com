import { cn } from "@olis/ui/lib/utils";

export function Logo() {
  return (
    <div className="w-full h-full">
      <img
        src="/logo.avif"
        alt="Logo"
        className={cn("h-full object-cover", "md:h-full")}
      />
    </div>
  );
}
