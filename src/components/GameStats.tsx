import React from 'react'

interface GameStatsProps {
  level: number
  score: number
  timeLeft: number
}

export const GameStats: React.FC<GameStatsProps> = ({ level, score, timeLeft }) => {
  return (
    <div className='flex justify-between items-center w-full max-w-md mb-8 px-4'>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>Level</p>
        <p className='text-2xl font-bold'>{level}</p>
      </div>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>Score</p>
        <p className='text-2xl font-bold'>{score}</p>
      </div>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>Time</p>
        <p className='text-2xl font-bold'>{timeLeft}s</p>
      </div>
    </div>
  )
}
