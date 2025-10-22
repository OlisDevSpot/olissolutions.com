import type { JSX } from 'react'

import { Button } from '@olis/ui/components/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@olis/ui/components/dialog'
import { useState } from 'react'

interface Props {
  title: string
  message: string
}

export function useConfirm({ title, message }: Props): [() => JSX.Element, () => Promise<boolean>] {
  const [promise, setPromise] = useState<{ canDelete: (value: boolean) => void } | null>(null)

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ canDelete: resolve })
    })
  }

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.canDelete(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.canDelete(false)
    handleClose()
  }

  const ConfirmationDialogMethod = () =>
    (
      <Dialog open={promise !== null} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button onClick={handleCancel} variant="outline">Cancel</Button>
            <Button onClick={handleConfirm} variant="destructive">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

  return [ConfirmationDialogMethod, confirm]
}
