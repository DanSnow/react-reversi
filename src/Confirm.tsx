import cx from 'clsx'
import { ReactChild } from 'react'

import Portal from './Portal'

interface Props {
  open: boolean
  children?: ReactChild
  onConfirm: () => void
  onCancel: () => void
}

export function Confirm({ open, children, onConfirm, onCancel }: Props) {
  return (
    <Portal target="dialog-root">
      <div className={cx('modal', { 'is-active': open })}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <p className="title is-2">{children}</p>
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-primary" onClick={onConfirm}>
                  Yes
                </button>
              </p>
              <p className="control">
                <button className="button" onClick={onCancel}>
                  No
                </button>
              </p>
            </div>
          </div>
        </div>
        <button className="modal-close" onClick={onCancel} />
      </div>
    </Portal>
  )
}
