import { cn } from "@olis/ui/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ProjectFinancialsColumn({ children, className, ...props }: Props) {
  return (
    <div className={cn("h-full flex flex-col", className)} {...props}>
      <div className="overflow-y-auto space-y-2 h-full">
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
