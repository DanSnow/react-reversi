import type { Player, Point, Score, Users } from '~/types'
import { createBrowserInspector } from '@statelyai/inspect'
import { useMachine, useSelector } from '@xstate/react'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import { useLatest } from 'react-use'
import { createAIActor } from '~/actor/ai'
import { aiVersionAtom } from '~/atoms/game'
import { placeAndFlip } from '~/lib/board'
import { isValidPosForPlacingChess } from '~/lib/chess-utils'
import { computeScore } from '~/lib/compute-score'
import { gameMachine } from '~/machines/game'
import { getUserType, UserType } from '~/types'

const inspector =
  typeof window !== 'undefined' && import.meta.env.DEV
    ? createBrowserInspector({})
    : {
        inspect: undefined,
      }

interface UseGameMachineInput {
  onBeforePlaceChess: () => void
  onGameStart: () => void
  onGameSettled: (input: { users: Users; score: Score }) => void
  onPlaced: (input: { player: Player.Player; point: Point }) => void
  onNoValidMove: (input: { player: Player.Player }) => void
  onUndoOccurred: () => void
}

export function useGameMachine({
  onBeforePlaceChess: onBeforePlaceChess_,
  onGameStart: onGameStart_,

  onGameSettled: onGameSettled_,
  onNoValidMove: onNoValidMove_,
  onPlaced: onPlaced_,
  onUndoOccurred: onUndoOccurred_,
}: UseGameMachineInput) {
  const onBeforePlaceChess = useLatest(onBeforePlaceChess_)
  const onGameStart = useLatest(onGameStart_)
  const onGameSettled = useLatest(onGameSettled_)
  const onNoValidMove = useLatest(onNoValidMove_)
  const onPlaced = useLatest(onPlaced_)
  const onUndoOccurred = useLatest(onUndoOccurred_)

  const aiVersion = useAtomValue(aiVersionAtom)
  const aiActor = useMemo(() => createAIActor(aiVersion), [aiVersion])
  const [machine, send, actorRef] = useMachine(gameMachine.provide({ actors: { aiPlaceChess: aiActor } }), {
    inspect: inspector.inspect,
  })

  const users = useSelector(actorRef, ({ context }) => context.users)
  const score = useSelector(actorRef, ({ context }) => computeScore(context.board))

  const placeChess = useCallback(
    ({ col, row }: Point) => {
      if (getUserType(machine.context.users, machine.context.currentPlayer) !== UserType.Human) {
        return
      }

      if (!isValidPosForPlacingChess(machine.context.board, machine.context.currentPlayer, { row, col })) {
        return
      }

      onBeforePlaceChess.current()
      const board = placeAndFlip({
        board: machine.context.board,
        col,
        row,
        player: machine.context.currentPlayer,
      })
      send({ type: 'placed', point: { row, col }, nextBoard: board })
    },
    [machine.context.board, machine.context.currentPlayer, machine.context.users, onBeforePlaceChess, send],
  )

  const isEnded = machine.matches('ENDED')

  useEffect(() => {
    if (!isEnded) {
      onGameStart.current()
      return
    }
    onGameSettled.current({ users, score })
  }, [isEnded, onGameSettled, onGameStart])

  useEffect(() => {
    const { unsubscribe: unsubscribeNoValidMove } = actorRef.on('noValidMove', (input) => onNoValidMove.current(input))

    const { unsubscribe: unsubscribePlaced } = actorRef.on('placed', (input) => onPlaced.current(input))

    // Add subscription for undoOccurred event
    const { unsubscribe: unsubscribeUndoOccurred } = actorRef.on('undoOccurred', () => onUndoOccurred.current())

    return () => {
      unsubscribeNoValidMove()
      unsubscribePlaced()
      unsubscribeUndoOccurred() // Add unsubscribe for undoOccurred
    }
  }, [actorRef, onNoValidMove, onPlaced, onUndoOccurred]) // Added dependencies

  return {
    machine,
    send,
    score,
    users,
    placeChess,
  }
}
