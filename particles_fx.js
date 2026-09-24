/**
 * particles_fx.js - Lightweight, High-Performance Visual Effects
 * Optimized for 60fps scrolling and clicking without layout thrashing or audio locking.
 */

const VisualFX = {
  glowElement: null,
  rafId: null,

  init() {
    this.createCursorGlow();
  },

  createCursorGlow() {
    // Subtle ambient cursor glow, throttled via requestAnimationFrame
    if (document.querySelector('.cursor-ambient-glow')) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-ambient-glow';
    glow.style.cssText = `
      position: fixed;
      width: 320px; height: 320px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 245, 255, 0.05), transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 1;
      opacity: 0.6;
      transition: opacity 0.3s;
      will-change: transform;
    `;
    document.body.appendChild(glow);
    this.glowElement = glow;

    let mouseX = -500, mouseY = -500;
    let scheduled = false;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          if (this.glowElement) {
            this.glowElement.style.left = mouseX + 'px';
            this.glowElement.style.top = mouseY + 'px';
          }
          scheduled = false;
        });
      }
    }, { passive: true });
  }
};

window.VisualFX = VisualFX;
