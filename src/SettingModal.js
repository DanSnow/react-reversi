import React from 'react'
import PropTypes from 'prop-types'
import Portal from 'react-portal'
import cx from 'classnames'

function SettingModal ({isOpen, onClose, onHintChange, onRetractChange}) {
  return (
    <Portal isOpened>
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
  onRetractChange: PropTypes.func.isRequired
}

export default SettingModal
