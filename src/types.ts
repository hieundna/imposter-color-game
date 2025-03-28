export interface GameState {
  level: number
  score: number
  timeLeft: number
  isGameOver: boolean
  isPlaying: boolean
  passedLevel: boolean
  gridSize: number
  isColorHidden: boolean
}

export interface ColorTile {
  color: string
  isImposter: boolean
  id: string
}
