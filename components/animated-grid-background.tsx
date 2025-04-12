"use client"

import { useEffect, useRef } from "react"

// Export colors for consistent use throughout the app
export const backgroundColors = {
  darkTeal: "#002a35",
  lightTeal: "#00c896",
  mediumTeal: "#00a67f",
}

interface GridSquare {
  x: number
  y: number
  size: number
  opacity: number
  targetOpacity: number
  color: string
  transitionSpeed: number
}

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid configuration
    const gridSize = 20 // Size of each grid cell
    const cols = Math.ceil(canvas.width / gridSize) + 1
    const rows = Math.ceil(canvas.height / gridSize) + 1

    // Create grid squares
    const squares: GridSquare[] = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // More squares on the right side (like in the reference image)
        const distanceFromRight = cols - x
        const probability = Math.min(0.8, 0.05 + (1 - distanceFromRight / cols) * 0.7)

        if (Math.random() < probability) {
          // Different shades of green
          const greenIntensity = 100 + Math.floor(Math.random() * 156)
          const color = `rgba(0, ${greenIntensity}, ${Math.floor(greenIntensity * 0.7)}, 1)`

          squares.push({
            x: x * gridSize,
            y: y * gridSize,
            size: gridSize - 1, // Small gap between squares
            opacity: 0,
            targetOpacity: 0.3 + Math.random() * 0.7, // Random target opacity
            color,
            transitionSpeed: 0.01 + Math.random() * 0.03, // Random transition speed
          })
        }
      }
    }

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = backgroundColors.darkTeal // Dark teal background
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update squares
      squares.forEach((square) => {
        // Randomly change target opacity
        if (Math.random() < 0.005) {
          square.targetOpacity = Math.random() < 0.7 ? 0.3 + Math.random() * 0.7 : 0 // 70% chance to appear, 30% to disappear
        }

        // Transition current opacity toward target
        if (square.opacity < square.targetOpacity) {
          square.opacity += square.transitionSpeed
          if (square.opacity > square.targetOpacity) square.opacity = square.targetOpacity
        } else if (square.opacity > square.targetOpacity) {
          square.opacity -= square.transitionSpeed
          if (square.opacity < square.targetOpacity) square.opacity = square.targetOpacity
        }

        // Draw square with current opacity
        const alpha = square.opacity
        ctx.fillStyle = square.color.replace(/[^,]+(?=\))/, alpha.toString())
        ctx.fillRect(square.x, square.y, square.size, square.size)
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: backgroundColors.darkTeal }} // Fallback color
    />
  )
}
