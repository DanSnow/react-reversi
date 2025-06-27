import type { Log, Point, Score, Users } from '~/types'
import { createBrowserInspector } from '@statelyai/inspect'
import { createFileRoute, invariant } from '@tanstack/react-router'
import { useMachine, useSelector } from '@xstate/react'
import { Option, pipe } from 'effect'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutative } from 'use-mutative'
import { createAIActor } from '~/actor/ai'
import { aiVersionAtom } from '~/atoms/game'
import { Board } from '~/components/Board'
import { Game } from '~/components/Game/Game'
import { placeAndFlip } from '~/lib/board'
import { computeScore } from '~/lib/compute-score'
import { gameMachine } from '~/machines/game'
import { DEFAULT_USER, getUserType, Player, UserType } from '~/types'

export const Route = createFileRoute('/')({
  component: XStateGame,
})

const inspector =
  typeof window !== 'undefined'
    ? createBrowserInspector({})
    : {
        inspect: undefined,
      }

function XStateGame() {
  const [aiVersion, setAIVersion] = useAtom(aiVersionAtom)
  const aiActor = useMemo(() => createAIActor(aiVersion), [aiVersion])
  const [machine, send, actorRef] = useMachine(gameMachine.provide({ actors: { aiPlaceChess: aiActor } }), {
    inspect: inspector.inspect,
  })
  const [overlay, setOverlay] = useState('')
  const [message, setMessage] = useState('')
  const [log, updateLog] = useMutative<Log[]>([])

  const users = useSelector(actorRef, ({ context }) => context.users)
  const score = useSelector(actorRef, ({ context }) => computeScore(context.board))

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
    ({ col, row }: Point) => {
      if (getUserType(machine.context.users, machine.context.currentPlayer) !== UserType.Human) {
        return
      }
      setMessage('')
      const board = placeAndFlip({
        board: machine.context.board,
        col,
        row,
        player: machine.context.currentPlayer,
      })
      send({ type: 'placed', point: { row, col }, nextBoard: board })
    },
    [machine, send],
  )

  const onRestart = useCallback(() => {
    send({ type: 'restart' })
  }, [send])

  const isEnded = machine.matches('ENDED')

  useEffect(() => {
    if (!isEnded) {
      setOverlay('')
      return
    }
    setMessage('')
    setOverlay(getOverlay(score, machine.context.users))
  }, [isEnded])

  useEffect(() => {
    const { unsubscribe: unsubscribeNoValidMove } = actorRef.on('noValidMove', ({ player }) => {
      const playerName = player === Player.WHITE ? 'white' : 'black'
      setMessage(`No valid move for ${playerName}!`)
    })

    const { unsubscribe: unsubscribePlaced } = actorRef.on('placed', ({ point: { row, col }, player }) => {
      updateLog((currentLog) => {
        currentLog.push({
          pos: `(${row}, ${col})`,
          player,
        })
      })
    })

    return () => {
      unsubscribeNoValidMove()
      unsubscribePlaced()
    }
  }, [machine])

  return (
    <Game message={message} users={users} log={log} score={score} setVersion={setAIVersion} onRestart={onRestart}>
      <Board.Root>
        <Board.Background />
        <Board.Chesses hint board={machine.context.board} onPlaceChess={placeChess} />
        {machine.matches('IDLE') && <Board.ChooseColor onStart={startGame} />}
        {overlay && <Board.Overlay>{overlay}</Board.Overlay>}
      </Board.Root>
    </Game>
  )
}

function getOverlay(score: Score, users: Users): string {
  const winner = getWinner(score)
  // Either black or white is computer, and another is human
  const humamVsComputer = users.B !== users.W

  return pipe(
    winner,
    // eslint-disable-next-line array-callback-return
    Option.map((winner) => {
      const isWinnerHuman = users[Player.unbrand(winner)] === UserType.Human
      if (isWinnerHuman && humamVsComputer) {
        return 'You win!'
      } else if (!isWinnerHuman && humamVsComputer) {
        return 'You lose!'
      } else if (winner === Player.BLACK) {
        return 'Black wins!'
      } else if (winner === Player.WHITE) {
        return 'White wins!'
      }
      invariant(false, 'Unknown winner')
    }),
    Option.getOrElse(() => "It's a tie!"),
  )
}

function getWinner(score: Score): Option.Option<Player.Player> {
  if (score.black > score.white) return Option.some(Player.BLACK)

  if (score.black < score.white) return Option.some(Player.WHITE)

  return Option.none()
}
