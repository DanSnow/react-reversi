import { createFileRoute } from '@tanstack/react-router'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { aiVersionAtom } from '~/atoms/game'
import { Board } from '~/components/Board/Board'
import { DEFAULT_USER, getUserType, Player, UserType } from '~/store'
import { computeScores } from '~/store/ai'
import { Function, Effect, pipe } from 'effect'
import { placeAndFlip, countCandidate } from '~/store/lib/board'
import { getBestPoint } from '~/store/lib/chess-utils'
import { useMachine } from '@xstate/react'
import { createGameMachine } from '~/machines/game'
import { createBrowserInspector } from '@statelyai/inspect'

export const Route = createFileRoute('/xstate')({
  component: XStateGame,
})

const gameMachine = createGameMachine()

const inspector = typeof window !== 'undefined' ? createBrowserInspector({}) : { inspect: Function.constVoid }

function XStateGame() {
  const [machine, send] = useMachine(gameMachine, { inspect: inspector.inspect })

  const aiVersion = useAtomValue(aiVersionAtom)
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

  // No valid moves
  useEffect(() => {
    if (!machine.matches('PLACE_CHESS')) {
      return
    }
    const { board } = machine.context

    if (countCandidate(board) === 0) {
      send({ type: 'turn' })
    }
  }, [machine])

  // AI loop
  useEffect(() => {
    const player = machine.context.currentPlayer
    if (getUserType(machine.context.users, player) !== UserType.AI) {
      return
    }

    const { board } = machine.context
    pipe(
      Effect.sync(() => {
        const scores = computeScores({ board, ai: player, version: aiVersion })
        return getBestPoint(scores)
      }),
      Effect.delay(300),
      Effect.map(({ row, col }) =>
        placeAndFlip({
          board,
          col,
          row,
          player,
        }),
      ),
      Effect.map((nextBoard) => send({ type: 'placed', nextBoard })),
      Effect.runPromise,
    )
  }, [machine])

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
