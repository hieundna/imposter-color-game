import React from 'react'
import { ColorTile } from '../types'
import { motion } from 'framer-motion'
import { hiddenColor } from '../constant'

interface GameBoardProps {
  tiles: ColorTile[]
  gridSize: number
  onTileClick: (tile: ColorTile) => void
  isColorHidden: boolean
  isGameOver: boolean
  isPassedLevel: boolean
}

export const GameBoard: React.FC<GameBoardProps> = ({
  tiles,
  gridSize,
  onTileClick,
  isColorHidden,
  isGameOver,
  isPassedLevel
}) => {
  return (
    <div
      className='grid gap-2 p-4'
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
      }}
    >
      {tiles.map((tile) => (
        <motion.button
          key={tile.id}
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            backgroundColor: isColorHidden ? hiddenColor : tile.color
          }}
          transition={{
            backgroundColor: { duration: 0.3 }
          }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          onClick={() => onTileClick(tile)}
          className={`aspect-square rounded-lg shadow-lg
            ${(isGameOver || isPassedLevel) && tile.isImposter ? 'ring-4 ring-yellow-400' : ''}`}
        />
      ))}
    </div>
  )
}
