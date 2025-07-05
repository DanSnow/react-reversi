import { type ReactElement, useCallback } from 'react'

import { Button } from './ui/button'
import { Dialog, DialogContent } from './ui/dialog'

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
        <p className="pb-8 text-4xl font-medium leading-tight">{children}</p>
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
