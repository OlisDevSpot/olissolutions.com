import { AlertCircleIcon } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export function ErrorState({ title, description }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-fit px-8 py-8 flex items-center justify-center border rounded-lg gap-2">
        <AlertCircleIcon className="mr-2 size-5 text-red-500" />
        <div className="flex flex-col">
          <p>{title}</p>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  );
}
