import type { Dispatch, SetStateAction } from 'react'

import { CommandDialog, CommandInput, CommandItem, CommandList } from '@olis/ui/components/command'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function DashboardCommand({ open, setOpen }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandItem>
          Test
        </CommandItem>
      </CommandList>
    </CommandDialog>
  )
}
