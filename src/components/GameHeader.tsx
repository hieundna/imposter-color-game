import { FC } from 'react'

interface IGameHeaderProps {
  passedLevel: boolean
  isGameOver: boolean
  timeout: boolean
  onNewGame: () => void
  onNextLevel: () => void
  onGoHome: () => void
}
const GameHeader: FC<IGameHeaderProps> = ({ passedLevel, isGameOver, timeout, onNewGame, onNextLevel, onGoHome }) => {
  return (
    <div className={`w-full max-w-2xl flex flex-col justify-center items-center mb-8`}>
      <div className='mb-4'>
        {!passedLevel && !isGameOver && 'Select the imposter color'}
        {!passedLevel && !timeout && isGameOver && 'You has selected wrong imposter color'}
        {!isGameOver && passedLevel && 'You found imposter color!'}
        {timeout && isGameOver && 'Time has been run out'}
      </div>
      <div className={`w-full max-w-2xl flex justify-center gap-2 items-center mb-8`}>
        {isGameOver && (
          <button
            onClick={onNewGame}
            className={`flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg
             hover:bg-indigo-700 transition-colors`}
          >
            Play Again
          </button>
        )}
        {passedLevel && (
          <button
            onClick={onNextLevel}
            className={`flex items-center gap-2 bg-[#8EB922] text-white px-4 py-2 rounded-lg
             hover:bg-[#8EB922] transition-colors`}
          >
            Next Level
          </button>
        )}
        <button
          onClick={onGoHome}
          className='flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg
             hover:bg-indigo-700 transition-colors'
        >
          Home Page
        </button>
      </div>
    </div>
  )
}

export default GameHeader
