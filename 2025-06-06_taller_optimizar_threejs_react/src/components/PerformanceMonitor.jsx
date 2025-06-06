import { useEffect, useRef } from 'react'
import Stats from 'stats.js'

export function PerformanceMonitor() {
  const statsRef = useRef()

  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0) // 0: FPS, 1: MS, 2: MB
    statsRef.current.appendChild(stats.dom)

    const animate = () => {
      stats.begin()
      stats.end()
      requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      statsRef.current?.removeChild(stats.dom)
    }
  }, [])

  return <div ref={statsRef} style={{
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 100
  }} />
}