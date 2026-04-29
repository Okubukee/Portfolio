import { useRef } from 'react'
import { useMatrix } from '../hooks/useMatrix'

export default function MatrixCanvas() {
  const ref = useRef(null)
  useMatrix(ref)
  return <canvas id="matrix-canvas" ref={ref} />
}
