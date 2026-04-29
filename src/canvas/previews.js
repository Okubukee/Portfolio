export function makeWebPreview(ctx, W, H) {
  return function (t) {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#050f07'; ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = 'rgba(46,160,67,0.18)'; ctx.fillRect(0, 0, W, 18)
    ;[['#ff5f57', 7], ['#ffbd2e', 18], ['#28c840', 29]].forEach(([c, x]) => {
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, 9, 4, 0, Math.PI * 2); ctx.fill()
    })
    ctx.fillStyle = 'rgba(46,160,67,0.08)'; ctx.fillRect(44, 5, W - 60, 8)
    ctx.fillStyle = 'rgba(46,160,67,0.35)'; ctx.fillRect(48, 7, 55, 4)
    const p = (t % 5000) / 5000
    ctx.fillStyle = 'rgba(46,160,67,0.12)'; ctx.fillRect(10, 26, W - 20, 10)
    ctx.fillStyle = 'rgba(46,160,67,0.5)';  ctx.fillRect(10, 26, (W - 20) * p, 10)
    ctx.fillStyle = 'rgba(46,160,67,0.25)'
    ctx.fillRect(10, 42, W * 0.55, 5); ctx.fillRect(10, 51, W * 0.35, 4)
    const cw = (W - 26) / 3
    for (let i = 0; i < 3; i++) {
      const pulse = 0.5 + 0.5 * Math.sin(t / 1800 + i * 1.3)
      ctx.fillStyle = `rgba(46,160,67,${0.04 + pulse * 0.04})`; ctx.fillRect(10 + i * (cw + 3), 63, cw, H - 71)
      ctx.strokeStyle = `rgba(46,160,67,${0.12 + pulse * 0.12})`; ctx.lineWidth = 0.5; ctx.strokeRect(10 + i * (cw + 3), 63, cw, H - 71)
      ctx.fillStyle = `rgba(46,160,67,${0.2 + pulse * 0.15})`; ctx.fillRect(14 + i * (cw + 3), 68, cw - 8, 4)
      ctx.fillStyle = 'rgba(46,160,67,0.1)'; ctx.fillRect(14 + i * (cw + 3), 76, cw - 14, 3)
    }
    ctx.fillStyle = 'rgba(46,160,67,0.04)'; ctx.fillRect(0, (t / 25) % H, W, 2)
  }
}

export function makeDefaultPreview(ctx, W, H) {
  return function (t) {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#050f07'; ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = 'rgba(46,160,67,0.1)'; ctx.lineWidth = 0.5
    for (let x = 0; x < W; x += 16) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    const p = (Math.sin(t / 1500) + 1) / 2
    ctx.fillStyle = `rgba(46,160,67,${0.06 + p * 0.1})`; ctx.fillRect(0, H * p, W, 1.5)
  }
}
