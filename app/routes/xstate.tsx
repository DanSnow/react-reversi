import { createFileRoute } from '@tanstack/react-router'
import { useCallback } from 'react'
import { Board } from '~/components/Board/Board'
import { DEFAULT_USER, getUserType, Player, UserType } from '~/store'
import { placeAndFlip } from '~/store/lib/board'
import { useMachine } from '@xstate/react'
import { createGameMachine } from '~/machines/game'
import { createBrowserInspector } from '@statelyai/inspect'

export const Route = createFileRoute('/xstate')({
  component: XStateGame,
})

const gameMachine = createGameMachine()

const inspector =
  typeof window !== 'undefined'
    ? createBrowserInspector({})
    : {
        inspect: undefined,
      }

function XStateGame() {
  const [machine, send] = useMachine(gameMachine, { inspect: inspector.inspect })

  const startGame = useCallback(
    (color: string) => {
      send({
        type: 'start',
        users: {
          ...DEFAULT_USER,
          [Player.parse(color)]: UserType.AI,
        },
      })
    },
    [send],
  )

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
