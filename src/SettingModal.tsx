import cx from 'clsx'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Portal from './Portal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onHintChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRetractChange: (event: ChangeEvent<HTMLInputElement>) => void
  onVersionChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

function SettingModal({ isOpen, onClose, onHintChange, onRetractChange, onVersionChange }: Props) {
  const { t } = useTranslation()

  return (
    <Portal target="dialog-root">
      <div className={cx('modal', { 'is-active': isOpen })}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="box">
            <div className="field">
              <p className="control">
                <label className="checkbox" htmlFor="hint">
                  <input type="checkbox" name="hint" onChange={onHintChange} />
                  {t('Hint')}
                </label>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="checkbox" htmlFor="retract">
                  <input type="checkbox" name="retract" onChange={onRetractChange} />
                  {t('Allow Retract')}
                </label>
              </p>
            </div>
            <div className="field">
              <div className="control">
                <label className="label" htmlFor="version">
                  {t('AI Version')}
                </label>
                <div className="select">
                  <select name="version" defaultValue="v2" onChange={onVersionChange}>
                    <option value="v1">V1</option>
                    <option value="v2">V2</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-primary" onClick={onClose}>
                  OK
                </button>
              </p>
            </div>
          </div>
        </div>
        <button className="modal-close" onClick={onClose} />
      </div>
    </Portal>
  )
}

export default SettingModal
