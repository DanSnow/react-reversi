import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { gameMachineAtom } from '~/atoms/game'
import { Board } from '~/components/Board/Board'
import { getUserType, UserType } from '~/store'
import { placeAndFlip } from '~/store/lib/board'

function XStateGame() {
  const [machine, send] = useAtom(gameMachineAtom)
  const startGame = useCallback(() => {
    send({ type: 'start' })
  }, [send])

  const placeChess = useCallback((row: number, col: number) => {
    if (getUserType(machine.context.users, machine.context.currentPlayer) !== UserType.Human) {
      return
    }
    const board = placeAndFlip({
      board: machine.context.board,
      col,
      row,
      player: machine.context.currentPlayer,
    })
    send({ type: 'placed', nextBoard: board })
  }, [])

  return (
    <Board
      hint
      board={machine.context.board}
      reset={startGame}
      showChooseColor={machine.matches('IDLE')}
      overlay=""
      placeChess={placeChess}
    />
  )
}
export const Route = createFileRoute('/xstate')({
  component: XStateGame,
})
