import type { ReactElement } from 'react'

import type { Board as BoardType } from '../../store'
import { Chess as ChessType } from '../../store'
import { Background } from './Background'
import Chess from './Chess'
import { ChooseColor } from './ChooseColor'
import { Overlay } from './Overlay'

interface Props {
  board: BoardType.Board
  showChooseColor: boolean
  overlay: string
  hint: boolean
  reset: (color: string) => void
  placeChess: (row: number, col: number) => void
}

export function Board({ reset, placeChess, board, hint, showChooseColor, overlay }: Props): ReactElement {
  return (
    <svg height="640px" width="640px">
      <Background />
      {board.flatMap((r, row) =>
        r.map((c, col) =>
          c ? (
            <Chess
              key={row * 8 + col}
              row={row}
              col={col}
              showHint={hint}
              color={c === ChessType.WHITE || c === ChessType.WHITE_CANDIDATE ? 'white' : 'black'}
              isCandidate={ChessType.isCandidateChess(c)}
              onClick={placeChess}
            />
          ) : null,
        ),
      )}
      {showChooseColor || <ChooseColor onClick={reset} />}
      {!!overlay && (
        <Overlay x="50%" y="50%">
          {overlay}
        </Overlay>
      )}
    </svg>
  )
}
