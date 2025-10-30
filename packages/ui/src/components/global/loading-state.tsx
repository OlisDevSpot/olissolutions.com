import { Loader2 } from 'lucide-react'

interface Props {
  title: string
  description?: string
}

export function LoadingState({ title, description }: Props) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full h-full px-8 py-8 flex items-center justify-center border rounded-lg gap-2">
        <Loader2 className="mr-2 size-5 animate-spin" />
        <div className="flex flex-col">
          <p>{title}</p>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
    </div>
  )
}
