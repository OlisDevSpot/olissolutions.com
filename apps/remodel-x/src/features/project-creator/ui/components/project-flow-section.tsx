import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@olis/ui/components/card";
import { cn } from "@olis/ui/lib/utils"; 

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ProjectFlowSection({ children, className, ...props }: SectionProps) {
  return (
    <Card className={cn("", className)} {...props}>
      {children}
    </Card>
  );
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

function Header({ title, description, children, className, ...props }: HeaderProps) {
  return (
    <CardHeader className="">
      <CardTitle className={cn("flex items-center gap-4", className)} {...props}>
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-medium">{title}</h3>
            {description && (
              <CardDescription>
                {description}
              </CardDescription>
            )}
          </div>
          {children}
        </div>
      </CardTitle>
    </CardHeader>
  );
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <CardContent className={cn("grow overflow-y-auto", className)} {...props}>
      {children}
    </CardContent>
  );
}

ProjectFlowSection.displayName = "ProjectFlowSection";
ProjectFlowSection.Header = Header;
ProjectFlowSection.Content = Content;
