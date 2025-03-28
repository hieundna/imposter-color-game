export const generateRandomColor = (): string => {
  const hue = Math.floor(Math.random() * 360) // 0-359 degrees
  const saturation = 50 + Math.floor(Math.random() * 50) // 50-100%, ensuring vibrant colors
  const lightness = 48 + Math.floor(Math.random() * 50) // 40-90%, avoiding very dark colors like 10%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

// More noticeable difference in lower levels
// Level 1: ±25
// Level 2: ±20
// Level 3: ±15
// Level 4: ±12
// Level 5: 10
// Level 6+: decreases by 1 until minimum of 5
const difficultMeasure: Record<number, number> = {
  1: 25,
  2: 20,
  3: 15,
  4: 12,
  5: 10
}

export const generateImposterColor = (baseColor: string, level: number): string => {
  const [h, s, l] = baseColor.match(/\d+/g)!.map(Number)
  const baseDifference = Math.max(2, level <= 5 ? difficultMeasure[level] : Math.max(5, 12 - (level - 5)))

  const adjustment = Math.random() < 0.5 ? baseDifference : -baseDifference
  return `hsl(${h}, ${s}%, ${Math.max(0, Math.min(100, l + adjustment))}%)`
}

export const calculateGridSize = (level: number): number => {
  return Math.min(8, Math.floor(2 + level / 2)) // Increases grid size every 2 levels, max 8x8
}

export const calculateTimeLimit = (level: number): number => {
  return Math.max(5, 30 - level * 2) // Decreases time limit as level increases, min 5 seconds
}
