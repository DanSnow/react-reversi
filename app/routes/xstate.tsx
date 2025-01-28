import type { Point, Score, Users } from '~/store'
import { createBrowserInspector } from '@statelyai/inspect'
import { createFileRoute, invariant } from '@tanstack/react-router'
import { useMachine, useSelector } from '@xstate/react'
import { Option, pipe } from 'effect'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createAIActor } from '~/actor/ai'
import { aiVersionAtom } from '~/atoms/game'
import { Board } from '~/components/Board'
import { Game } from '~/components/Game/Game'
import { gameMachine } from '~/machines/game'
import { computeScore, DEFAULT_USER, getUserType, Player, UserType } from '~/store'
import { placeAndFlip } from '~/store/lib/board'

export const Route = createFileRoute('/xstate')({
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

  const onRestart = useCallback(() => {
    send({ type: 'restart' })
  }, [send])

  const isEnded = machine.matches('ENDED')

  useEffect(() => {
    if (!isEnded) {
      setOverlay('')
      return
    }
    setOverlay(getOverlay(score, machine.context.users))
  }, [isEnded])

  return (
    <Game message="" users={users} score={score} setVersion={setAIVersion} onRestart={onRestart}>
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
