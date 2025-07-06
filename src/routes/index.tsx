import type { History, Log, Score, Users } from '~/types'
import { createFileRoute, invariant } from '@tanstack/react-router'
import { Option, pipe } from 'effect'
import { useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { useMutative } from 'use-mutative'
import { allowRetractAtom, showHintAtom } from '~/atoms/game'
import { historyAtom } from '~/atoms/ui'
import { Board } from '~/components/Board'
import { Game } from '~/components/Game/Game'
import { useGameMachine } from '~/hooks/useGameMachine'
import { m } from '~/paraglide/messages'
import { DEFAULT_USER, Player, UserType } from '~/types'
import { HUMAN_GAME } from '~/types/user'

export const Route = createFileRoute('/')({
  component: XStateGame,
})

function XStateGame() {
  const [overlay, setOverlay] = useState('')
  const [message, setMessage] = useState('')
  const [log, updateLog] = useMutative<Log[]>([])
  const [showReplay, setShowReplay] = useState(false)
  const updateHistory = useSetAtom(historyAtom)

  const { users, score, send, placeChess, machine } = useGameMachine({
    onGameStart: () => {
      setOverlay('')
    },
    onGameSettled: ({ users, score }) => {
      setMessage('')
      setOverlay(getOverlay(score, users))
      setShowReplay(true)
      const gameResult = getGameResult(score, users)
      if (Option.isSome(gameResult)) {
        updateHistory((history) => {
          history[gameResult.value] += 1
        })
      }
    },
    onNoValidMove: ({ player }) => {
      const playerName = player === Player.WHITE ? m.white() : m.black()

      setMessage(m.no_valid_move({ player: playerName }))
    },
    onBeforePlaceChess: () => {
      setMessage('')
    },
    onPlaced: ({ player, point: { row, col } }) => {
      updateLog((currentLog) => {
        currentLog.push({
          type: 'move', // Added type
          pos: `(${row}, ${col})`,
          player,
        })
      })
    },
    onUndoOccurred: () => {
      updateLog((currentLog) => {
        // Remove the last two entries (human move + AI move)
        currentLog.pop()
        currentLog.pop()
        // Add an undo entry
        currentLog.push({
          type: 'undo',
          message: 'Undo last turn',
        })
      })
    },
  })

  const allowRetract = useAtomValue(allowRetractAtom)
  const hint = useAtomValue(showHintAtom)

  // Handlers for Game component props
  const setHuman = useCallback(() => {
    send({
      type: 'start',
      users: HUMAN_GAME,
    })
  }, [send])

  const reboot = useCallback(() => {
    send({ type: 'restart' })
    updateLog([])
  }, [send, updateLog])

  const onUndo = useCallback(() => {
    send({ type: 'undo' }) // Send the undo event to the state machine
  }, [send])

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

  const onRestart = useCallback(() => {
    send({ type: 'restart' })
  }, [send])

  const onCancelConfirm = useCallback(() => {
    setShowReplay(false)
  }, [])

  return (
    <Game
      message={message}
      users={users}
      log={log}
      score={score}
      onRestart={onRestart}
      showReplay={showReplay}
      allowRetract={allowRetract}
      setHuman={setHuman}
      reboot={reboot}
      onUndo={onUndo}
      onCloseConfirm={onCancelConfirm}
    >
      <Board.Root>
        <Board.Background />
        <Board.Chesses hint={hint} board={machine.context.board} onPlaceChess={placeChess} />
        {machine.matches('IDLE') && <Board.ChooseColor onStart={startGame} />}
        {overlay && <Board.Overlay>{overlay}</Board.Overlay>}
      </Board.Root>
    </Game>
  )
}

function getGameResult(score: Score, users: Users): Option.Option<keyof History> {
  const winner = getWinner(score)
  // Either black or white is computer, and another is human
  const humamVsComputer = users.B !== users.W

  return pipe(
    winner,
    Option.flatMap((winner): Option.Option<keyof History> => {
      const isWinnerHuman = users[Player.unbrand(winner)] === UserType.Human
      if (!humamVsComputer) {
        return Option.none()
      }
      return Option.some(isWinnerHuman ? 'win' : 'lose')
    }),
    Option.orElse((): Option.Option<keyof History> => (humamVsComputer ? Option.some('draw') : Option.none())),
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
        return m.user_win()
      } else if (!isWinnerHuman && humamVsComputer) {
        return m.user_lose()
      } else if (winner === Player.BLACK) {
        return m.black_win()
      } else if (winner === Player.WHITE) {
        return m.white_win()
      }
      invariant(false, 'Unknown winner')
    }),
    Option.getOrElse(() => m.draw()),
  )
}

function getWinner(score: Score): Option.Option<Player.Player> {
  if (score.black > score.white) return Option.some(Player.BLACK)

  if (score.black < score.white) return Option.some(Player.WHITE)

  return Option.none()
}
