import { useState, useEffect, useCallback, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GameBoard } from './components/GameBoard'
import { GameStats } from './components/GameStats'
import { GameState, ColorTile } from './types'
import { generateRandomColor, generateImposterColor, calculateGridSize, calculateTimeLimit } from './utils'
import { initialState } from './constant'
import { HomeScreen } from './components/HomeScreen'
import GameHeader from './components/GameHeader'

function App() {
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    timeLeft: 30,
    isGameOver: false,
    isPlaying: false,
    passedLevel: false,
    gridSize: calculateGridSize(1),
    isColorHidden: false
  })

  const [tiles, setTiles] = useState<ColorTile[]>([])
  const [highScore, setHighScore] = useState(0)

  const timerRef = useRef<ReturnType<typeof setInterval>>()

  const generateTiles = useCallback((level: number) => {
    const gridSize = calculateGridSize(level)
    const baseColor = generateRandomColor()
    const imposterColor = generateImposterColor(baseColor, level)
    const imposterIndex = Math.floor(Math.random() * (gridSize * gridSize))

    return Array.from({ length: gridSize * gridSize }, (_, index) => ({
      color: index === imposterIndex ? imposterColor : baseColor,
      isImposter: index === imposterIndex,
      id: uuidv4()
    }))
  }, [])

  const startNewGame = useCallback(() => {
    setGameState(initialState)
    setTiles(generateTiles(1))
    // Hide colors after 1 second
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        isColorHidden: true
      }))
    }, 1000)
  }, [generateTiles])

  const startNewLevel = useCallback(
    (level: number) => {
      setGameState((prev) => ({
        ...prev,
        isColorHidden: false
      }))
      setTiles(generateTiles(level))

      // Hide colors after 1 second
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          isColorHidden: true
        }))
      }, 1000)
    },
    [generateTiles]
  )

  const goHomePage = () => {
    setGameState(() => ({
      level: 1,
      score: 0,
      timeLeft: 30,
      isGameOver: false,
      isPlaying: false,
      passedLevel: false,
      gridSize: calculateGridSize(1),
      isColorHidden: false
    }))
  }

  const handleTileClick = (tile: ColorTile) => {
    if (gameState.isGameOver || !gameState.isPlaying) return

    if (tile.isImposter) {
      setGameState((prev) => ({
        ...prev,
        passedLevel: true,
        score: prev.score + Math.floor(prev.timeLeft * 10)
      }))
      const newScore = gameState.score + Math.floor(gameState.timeLeft * 10)
      if (newScore > highScore) {
        setHighScore(newScore)
      }
    } else {
      // Wrong tile clicked
      setGameState((prev) => ({ ...prev, isGameOver: true }))
    }
  }

  const nextLevel = () => {
    // Correct tile clicked
    const newLevel = gameState.level + 1
    setGameState((prev) => ({
      ...prev,
      level: newLevel,
      passedLevel: false,
      timeLeft: calculateTimeLimit(newLevel),
      gridSize: calculateGridSize(newLevel),
      isColorHidden: false
    }))
    startNewLevel(newLevel)
  }

  useEffect(() => {
    if (!gameState.isPlaying || gameState.isGameOver || gameState.passedLevel) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      return
    }

    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          return { ...prev, isGameOver: true, timeLeft: 0 }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [gameState.isPlaying, gameState.isGameOver, gameState.passedLevel])

  if (!gameState.isPlaying) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <HomeScreen onStart={startNewGame} highScore={highScore} />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-bold text-gray-800 mb-8'>Imposter Color</h1>
      <GameStats level={gameState.level} score={gameState.score} timeLeft={gameState.timeLeft} />
      <GameHeader
        isGameOver={gameState.isGameOver}
        passedLevel={gameState.passedLevel}
        timeout={gameState.timeLeft <= 0}
        onGoHome={goHomePage}
        onNewGame={startNewGame}
        onNextLevel={nextLevel}
      />
      <div className='w-full max-w-xl'>
        <GameBoard
          tiles={tiles}
          gridSize={gameState.gridSize}
          onTileClick={handleTileClick}
          isColorHidden={gameState.isColorHidden && !gameState.isGameOver && !gameState.passedLevel}
          isGameOver={gameState.isGameOver}
          isPassedLevel={gameState.passedLevel}
        />
      </div>
    </div>
  )
}

export default App
