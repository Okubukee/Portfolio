import { useRef } from 'react'
import { useCursor } from '../hooks/useCursor'

export default function CursorTrail() {
  const canvasRef = useRef(null)
  const dotRef    = useRef(null)
  useCursor(canvasRef, dotRef)
  return (
    <>
      <canvas id="cursor-canvas" ref={canvasRef} />
      <div    id="cursor-dot"    ref={dotRef} />
    </>
  )
}
