import styled from '@emotion/styled'
import cx from 'clsx'
import { ReactElement } from 'react'

import { Log as LogData, WHITE } from '../../store'

const LogContainer = styled.div({
  height: '600px',
  overflow: 'auto',
  padding: '0 10px',
})

interface Props {
  log: LogData[]
}

export const Log = ({ log }: Props): ReactElement => (
  <div className="card">
    <div className="card-header">
      <div className="card-header-title">
        <p className="title is-6">Log</p>
      </div>
    </div>
    <div className="card-content">
      <LogContainer>
        {log.map(({ player, pos }, idx) => (
          <div key={idx} className="is-flex">
            <span className="icon">
              <i className={cx(player === WHITE ? 'far' : 'fas', 'fa-circle')} />
            </span>
            <span>{pos}</span>
          </div>
        ))}
      </LogContainer>
    </div>
  </div>
)
