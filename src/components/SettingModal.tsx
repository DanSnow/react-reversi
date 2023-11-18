import cx from 'clsx'
import type { ChangeEvent, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

import Portal from './Portal'

interface Props {
  isOpen: boolean
  onClose: () => void
  onHintChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRetractChange: (event: ChangeEvent<HTMLInputElement>) => void
  onVersionChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const AI: [key: string, display: string][] = [
  ['v1', 'V1'],
  ['v2', 'V2'],
  ['v3', 'V3 (V2 + min-max)'],
  ['v3Overview', 'V4 (V2 + min-max + overview)'],
  ['v2Overview', 'V2 + overview'],
  ['v1MinMax', 'V1 + min-max'],
  ['v1Overview', 'V1 + min-max + overview'],
]

export function SettingModal({ isOpen, onClose, onHintChange, onRetractChange, onVersionChange }: Props): ReactElement {
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
                  <select name="version" defaultValue="v3Overview" onChange={onVersionChange}>
                    {AI.map(([value, display]) => (
                      <option key={value} value={value}>
                        {display}
                      </option>
                    ))}
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
