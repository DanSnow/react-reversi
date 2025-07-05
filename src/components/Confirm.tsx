import { type ReactElement, useCallback } from 'react'

import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

interface Props {
  open: boolean
  children?: string | ReactElement
  onConfirm: () => void
  onCancel: () => void
}

export function Confirm({ open, children, onConfirm, onCancel }: Props): ReactElement {
  const onOpenChange = useCallback(
    (val: boolean) => {
      if (!val) onCancel()
    },
    [onCancel],
  )
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-4xl">{children}</DialogTitle>
        <div className="flex gap-4">
          <Button className="bg-teal-400 button" onClick={onConfirm}>
            Yes
          </Button>
          <Button className="button" onClick={onCancel}>
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
