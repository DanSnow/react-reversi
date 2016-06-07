import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'
import setPropTypes from 'recompose/setPropTypes'
import compose from 'recompose/compose'

const Log = compose(
  connect((state) => ({ log: state.log })),
  setPropTypes({
    log: PropTypes.array.isRequired
  })
)(({ log }) => (
  <Row>
    <Col>
      {
        log.map((content, idx) => (
          <Row key={ idx }>
            <Col> { content } </Col>
          </Row>
        ))
      }
    </Col>
  </Row>
))

export default Log
