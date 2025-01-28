import type { Board as BoardType, Point } from '../../store'
import { Chess as ChessType } from '../../store'
import { Chess } from './Chess'

export interface BoardChessesProps {
  board: BoardType.Board
  hint: boolean
  onPlaceChess: (point: Point) => void
}

export function Chesses({ board, hint, onPlaceChess }: BoardChessesProps) {
  return (
    <>
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
              onClick={onPlaceChess}
            />
          ) : null,
        ),
      )}
    </>
  )
}
