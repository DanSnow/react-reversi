import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from 'jotai'
import { RESTART } from 'jotai-xstate'
import { useCallback, useEffect } from 'react'
import { gameMachineAtom } from '~/atoms/game'
import { store } from '~/atoms/store'
import { Board } from '~/components/Board/Board'
import { getUserType, UserType } from '~/store'
import { placeAndFlip } from '~/store/lib/board'

export const Route = createFileRoute('/xstate')({
  component: XStateGame,
  loader: () => store.get(gameMachineAtom),
})

function XStateGame() {
  const [machine, send] = useAtom(gameMachineAtom)
  const startGame = useCallback(() => {
    send({ type: 'start' })
  }, [send])

  const placeChess = useCallback(
    (row: number, col: number) => {
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
    },
    [machine, send],
  )

  useEffect(() => {
    send(RESTART)
    send({ type: 'start' })
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
