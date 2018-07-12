import PropTypes from 'prop-types'
import React from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import setPropTypes from 'recompose/setPropTypes'
import styled from 'react-emotion'

const LogContainer = styled.div({
  width: '25%',
  height: '600px',
  overflow: 'auto',
  padding: '0 10px'
})

const Log = compose(
  connect(state => ({log: state.log})),
  setPropTypes({
    log: PropTypes.array.isRequired
  })
)(({log}) => (
  <LogContainer>
    {log.map((content, idx) => <div key={idx}>{content}</div>)}
  </LogContainer>
))

export default Log
