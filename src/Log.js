import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

const Log = compose(
  connect(state => ({log: state.log})),
  setPropTypes({
    log: PropTypes.array.isRequired
  })
)(({log}) => (
  <div style={styles.scroll}>
    {log.map((content, idx) => (
      <div key={idx}>
        {content}
      </div>
    ))}
  </div>
))

const styles = {
  scroll: {
    width: '25%',
    height: '600px',
    overflow: 'auto',
    padding: '0 10px'
  }
}

export default Log
