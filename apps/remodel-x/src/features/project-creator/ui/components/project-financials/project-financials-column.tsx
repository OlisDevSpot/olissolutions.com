import { Separator } from "@olis/ui/components/separator";
import { cn } from "@olis/ui/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export function ProjectFinancialsColumn({ title, children, className, ...props }: Props) {
  return (
    <div className={cn("h-full flex flex-col", className)} {...props}>
      <div className="overflow-y-auto space-y-2 h-full">
        <div>
          <h2 className="font-semibold text-2xl">{title}</h2>
        </div>
        <Separator className="mb-4" />
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
