import { connect } from 'react-redux'

import { reset, setOverlay, startedSelector, State, userPlaceChess } from '../../store'
import { Board as BoardComponent } from './Board'

export const Board = connect(
  (state: State) => ({
    board: state.board,
    started: startedSelector(state),
    overlay: state.overlay,
  }),
  {
    reset,
    userPlaceChess,
    setOverlay,
  },
  (state, actions, props) => {
    return {
      ...state,
      ...actions,
      ...props,
      showChooseColor: state.started,
      placeChess(row: number, col: number) {
        if (state.overlay) {
          actions.setOverlay('')
        }
        if (!state.started) {
          return
        }
        actions.userPlaceChess(row, col)
      },
    }
  }
)(BoardComponent)
