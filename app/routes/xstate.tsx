import { createBrowserInspector } from '@statelyai/inspect'
import { createFileRoute } from '@tanstack/react-router'
import { useMachine } from '@xstate/react'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'
import { createAIActor } from '~/actor/ai'
import { aiVersionAtom } from '~/atoms/game'
import { Board } from '~/components/Board/Board'
import { createGameMachine } from '~/machines/game'
import { DEFAULT_USER, getUserType, Player, UserType } from '~/store'
import { placeAndFlip } from '~/store/lib/board'

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
  const aiVersion = useAtomValue(aiVersionAtom)
  const aiActor = useMemo(() => createAIActor(aiVersion), [aiVersion])
  const [machine, send] = useMachine(gameMachine.provide({ actors: { aiPlaceChess: aiActor } }), {
    inspect: inspector.inspect,
  })

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
