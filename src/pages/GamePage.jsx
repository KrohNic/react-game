import React from 'react'
import { useSelector } from 'react-redux'
import Board from '../components/Board'
import EndGameWindow from '../components/EndGameWindow'
import GameInfo from '../components/GameInfo/GameInfo'
import LoadSavePrompt from '../components/LoadSavePrompt/LoadSavePrompt'

export const GamePage = () => {
  const isEndWindow = useSelector((state) => state.app.isGameEnded)
  const isLoadPrompt = useSelector((state) => state.app.isLoadPrompt)

  return (
    <>
      <GameInfo />
      <Board />
      {isEndWindow && <EndGameWindow />}
      {isLoadPrompt && <LoadSavePrompt />}
    </>
  )
}
