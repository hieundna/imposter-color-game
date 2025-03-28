import { GameState } from './types'
import { calculateGridSize, calculateTimeLimit } from './utils'

export const initialState: GameState = {
  level: 1,
  score: 0,
  timeLeft: calculateTimeLimit(1),
  isGameOver: false,
  isPlaying: true,
  passedLevel: false,
  gridSize: calculateGridSize(1),
  isColorHidden: false
}

export const hiddenColor = '#1a1a1a'
