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
        <div className="modal-content">
          <div className="box">
            <p className="font-medium text-4xl leading-tight pb-8">{children}</p>
            <div className="flex gap-4">
              <Button className="button bg-teal-400" onClick={onConfirm}>
                Yes
              </Button>
              <Button className="button" onClick={onCancel}>
                No
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
