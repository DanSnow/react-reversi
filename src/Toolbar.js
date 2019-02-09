import { reboot, reset, restoreStep } from './actions'

import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'

function Toolbar ({ setHuman, reboot, allowRetract, restoreStep, onOpenSetting }) {
  const { t } = useTranslation()

  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <div className='navbar-item'>
          <p className='title is-3'>{t('Reversi')}</p>
        </div>
      </div>
      <div className='navbar-item navbar-end'>
        <div className='field is-grouped'>
          <p className='control'>
            <button className='button is-rounded' onClick={setHuman}>
              <span className='icon'>
                <i className='fas fa-user-friends' />
              </span>
              <span>{t('Play with friend')}</span>
            </button>
            <button className='button is-rounded' onClick={reboot}>
              <span className='icon'>
                <i className='fas fa-power-off' />
              </span>
              <span>{t('Restart')}</span>
            </button>
            <button className='button is-rounded' disabled={!allowRetract} onClick={restoreStep}>
              <span className='icon'>
                <i className='fas fa-undo' />
              </span>
            </button>
            <button className='button is-rounded' onClick={onOpenSetting}>
              <span className='icon'>
                <i className='fas fa-cog' />
              </span>
            </button>
          </p>
        </div>
      </div>
    </nav>
  )
}

Toolbar.propTypes = {
  allowRetract: PropTypes.any.isRequired,
  onOpenSetting: PropTypes.func.isRequired,
  setHuman: PropTypes.func.isRequired,
  reboot: PropTypes.func.isRequired,
  restoreStep: PropTypes.func.isRequired
}

export default compose(
  connect(
    state => ({
      allowRetract: state.allowRetractStep && state.pastStep.length
    }),
    { reboot, setHuman: () => reset(null), restoreStep }
  )
)(Toolbar)
