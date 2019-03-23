import { Log as LogData, State } from './reducer'

import React from 'react'
import { WHITE } from './consts'
import { connect } from 'react-redux'
import cx from 'classnames'
import styled from '@emotion/styled'

const LogContainer = styled.div({
  height: '600px',
  overflow: 'auto',
  padding: '0 10px'
})

interface Props {
  log: LogData[]
}

const Log = ({ log }: Props) => (
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
)

export default connect((state: State) => ({ log: state.log }))(Log)
