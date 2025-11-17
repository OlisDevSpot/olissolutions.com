'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../dialog'

interface Props {
  close: () => void
  isOpen: boolean
  title: string
  description: string
  children: React.ReactNode
}

export function Modal({
  close,
  isOpen,
  title,
  description,
  children,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent
        className="sm:max-w-[425px] space-y-2"
        onInteractOutside={(event) => {
          // Prevent closing when clicking Google Places dropdown
          if (
            event.target instanceof HTMLElement
            && event.target.closest('.pac-container')
          ) {
            event.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
