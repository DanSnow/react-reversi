import {Portal} from 'react-portal'
import PropTypes from 'prop-types'
import React from 'react'
import cx from 'classnames'

function SettingModal ({
  isOpen,
  onClose,
  onHintChange,
  onRetractChange,
  onVersionChange
}) {
  return (
    <Portal isOpen>
      <div className={cx('modal', {'is-active': isOpen})}>
        <div className='modal-background' />
        <div className='modal-content'>
          <div className='box'>
            <div className='field'>
              <p className='control'>
                <label className='checkbox' htmlFor='hint'>
                  <input type='checkbox' name='hint' onChange={onHintChange} />
                  Hint
                </label>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <label className='checkbox' htmlFor='retract'>
                  <input
                    type='checkbox'
                    name='retract'
                    onChange={onRetractChange}
                  />
                  Allow Retract
                </label>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <label className='checkbox' htmlFor='retract'>
                  <select
                    name='version'
                    className='select'
                    onChange={onVersionChange}
                  >
                    <option value='v1'>V1</option>
                    <option selected value='v2'>
                      V2
                    </option>
                  </select>
                </label>
              </p>
            </div>
            <div className='field'>
              <p className='control'>
                <button className='button is-primary' onClick={onClose}>
                  OK
                </button>
              </p>
            </div>
          </div>
        </div>
        <button className='modal-close' onClick={onClose} />
      </div>
    </Portal>
  )
}

SettingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onHintChange: PropTypes.func.isRequired,
  onRetractChange: PropTypes.func.isRequired,
  onVersionChange: PropTypes.func.isRequired
}

export default SettingModal
