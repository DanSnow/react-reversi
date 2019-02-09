import PropTypes from 'prop-types'
import React from 'react'
import { WHITE } from './consts'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import cx from 'classnames'
import setPropTypes from 'recompose/setPropTypes'
import styled from '@emotion/styled'

const LogContainer = styled.div({
  height: '600px',
  overflow: 'auto',
  padding: '0 10px'
})

const Log = compose(
  connect(state => ({ log: state.log })),
  setPropTypes({
    log: PropTypes.array.isRequired
  })
)(({ log }) => (
  <div className='card'>
    <div className='card-header'>
      <div className='card-header-title'>
        <p className='title is-6'>Log</p>
      </div>
    </div>
    <div className='card-content'>
      <LogContainer>
        {log.map(({ player, pos }, idx) => (
          <div key={idx} className='is-flex'>
            <span className='icon'>
              <i className={cx(player === WHITE ? 'far' : 'fas', 'fa-circle')} />
            </span>
            <span>{pos}</span>
          </div>
        ))}
      </LogContainer>
    </div>
  </div>
))

export default Log
