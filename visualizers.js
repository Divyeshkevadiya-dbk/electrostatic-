/**
 * visualizers.js - High-Fidelity Animated Physics Visualizers
 * Renders smooth 60fps interactive animated diagrams for each section of the Electrostatics Guide.
 */

const PhysicsVisualizers = {
  activeLoops: {},

  initAll() {
    this.initChargeViz('canvas-viz-charge');
    this.initCoulombViz('canvas-viz-coulomb');
    this.initFieldViz('canvas-viz-field');
    this.initFluxViz('canvas-viz-flux');
    this.initCapacitorViz('canvas-viz-capacitor');
    this.initDielectricViz('canvas-viz-dielectric');
    this.initNetworkViz('canvas-viz-network');
  },

  stop(id) {
    if (this.activeLoops[id]) {
      cancelAnimationFrame(this.activeLoops[id]);
      delete this.activeLoops[id];
    }
  },

  renderForTopic(topicId, targetCanvasId = 'canvas-modal-viz') {
    this.stop(targetCanvasId);
    const map = {
      '01': this.initChargeViz.bind(this),
      '02': this.initCoulombViz.bind(this),
      '03': this.initFieldViz.bind(this),
      '04': this.initFluxViz.bind(this),
      '05': this.initCapacitorViz.bind(this),
      '06': this.initDielectricViz.bind(this),
      '07': this.initNetworkViz.bind(this)
    };
    const fn = map[topicId];
    if (fn) {
      setTimeout(() => fn(targetCanvasId), 50);
    }
  },

  // Helper for responsive canvas setup with high-DPI
  setupCanvas(id) {
    const canvas = document.getElementById(id);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width > 50 ? rect.width : (canvas.parentElement ? canvas.parentElement.clientWidth : 500) || 500;
    const h = rect.height > 50 ? rect.height : 360;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    return { canvas, ctx, width: w, height: h };
  },

  /* --- 01. Electric Charge: Atomic Ionization & Electron Orbital Flow --- */
  initChargeViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;
    const centerX = width / 2;
    const centerY = height / 2;

    let angle1 = 0, angle2 = 1.2, angle3 = 2.4;
    const electrons = [
      { rX: 75, rY: 30, rot: 0.3, speed: 0.04, color: '#72e6ff' },
      { rX: 85, rY: 35, rot: -0.8, speed: -0.035, color: '#72e6ff' },
      { rX: 95, rY: 40, rot: 1.2, speed: 0.045, color: '#72e6ff' }
    ];

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Background ambient glow
      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 120);
      grad.addColorStop(0, 'rgba(114, 230, 255, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Orbit tracks
      electrons.forEach(el => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(el.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, el.rX, el.rY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      });

      // Nucleus (+ Protons & Neutrons)
      const nucleusGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 22);
      nucleusGrad.addColorStop(0, '#ff7892');
      nucleusGrad.addColorStop(0.7, '#e11d48');
      nucleusGrad.addColorStop(1, '#881337');
      ctx.fillStyle = nucleusGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowColor = '#ff7892';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+3e', centerX, centerY);
      ctx.shadowBlur = 0;

      // Orbiting Electrons (-e)
      angle1 += electrons[0].speed;
      angle2 += electrons[1].speed;
      angle3 += electrons[2].speed;
      const angles = [angle1, angle2, angle3];

      electrons.forEach((el, idx) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(el.rot);
        const a = angles[idx];
        const ex = Math.cos(a) * el.rX;
        const ey = Math.sin(a) * el.rY;

        // Electron trail glow
        ctx.shadowColor = el.color;
        ctx.shadowBlur = 14;
        ctx.fillStyle = el.color;
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#05070d';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('-', ex, ey);
        ctx.restore();
      });

      // Overlay status tag
      ctx.fillStyle = 'rgba(114, 230, 255, 0.8)';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NEUTRAL LITHIUM ATOM (Z=3) ⇄ ELECTRON TRANSFER', centerX, height - 18);

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };
    loop();
  },

  /* --- 02. Coulomb's Law: Interactive Draggable Point Charges & Force Vectors --- */
  initCoulombViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { canvas, ctx, width, height } = data;

    let q1 = { x: width * 0.3, y: height * 0.5, sign: 1, val: 2.0, r: 24, dragging: false };
    let q2 = { x: width * 0.7, y: height * 0.5, sign: -1, val: 2.0, r: 24, dragging: false };

    canvas.addEventListener('pointerdown', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (Math.hypot(mx - q1.x, my - q1.y) < q1.r + 10) q1.dragging = true;
      else if (Math.hypot(mx - q2.x, my - q2.y) < q2.r + 10) q2.dragging = true;
    });

    window.addEventListener('pointermove', (e) => {
      if (!q1.dragging && !q2.dragging) return;
      const rect = canvas.getBoundingClientRect();
      const mx = Math.max(30, Math.min(width - 30, e.clientX - rect.left));
      const my = Math.max(30, Math.min(height - 30, e.clientY - rect.top));
      if (q1.dragging) { q1.x = mx; q1.y = my; }
      if (q2.dragging) { q2.x = mx; q2.y = my; }
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      q1.dragging = false;
      q2.dragging = false;
    });

    // Toggle charge sign on double-click
    canvas.addEventListener('dblclick', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (Math.hypot(mx - q1.x, my - q1.y) < q1.r + 10) q1.sign *= -1;
      else if (Math.hypot(mx - q2.x, my - q2.y) < q2.r + 10) q2.sign *= -1;
    });

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const dx = q2.x - q1.x;
      const dy = q2.y - q1.y;
      const dist = Math.max(50, Math.hypot(dx, dy));
      const angle = Math.atan2(dy, dx);

      // Force magnitude according to inverse square law
      const isRepel = (q1.sign * q2.sign) > 0;
      const forceMag = Math.min(80, (9000 / (dist * dist)) * 40 + 15);

      // Distance line
      ctx.beginPath();
      ctx.moveTo(q1.x, q1.y);
      ctx.lineTo(q2.x, q2.y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Distance label
      const midX = (q1.x + q2.x) / 2;
      const midY = (q1.y + q2.y) / 2;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`r = ${(dist * 0.1).toFixed(1)} cm`, midX, midY - 12);

      // Draw Force Vector on Q1
      const f1Angle = isRepel ? angle + Math.PI : angle;
      const f1EndX = q1.x + Math.cos(f1Angle) * forceMag;
      const f1EndY = q1.y + Math.sin(f1Angle) * forceMag;
      drawVector(ctx, q1.x, q1.y, f1EndX, f1EndY, isRepel ? '#ef4444' : '#10b981', 'F₁₂');

      // Draw Force Vector on Q2
      const f2Angle = isRepel ? angle : angle + Math.PI;
      const f2EndX = q2.x + Math.cos(f2Angle) * forceMag;
      const f2EndY = q2.y + Math.sin(f2Angle) * forceMag;
      drawVector(ctx, q2.x, q2.y, f2EndX, f2EndY, isRepel ? '#ef4444' : '#10b981', 'F₂₁');

      // Draw Charge Q1
      drawChargeBody(ctx, q1, 'q₁ = ' + (q1.sign > 0 ? '+2μC' : '-2μC'));
      // Draw Charge Q2
      drawChargeBody(ctx, q2, 'q₂ = ' + (q2.sign > 0 ? '+2μC' : '-2μC'));

      // Status HUD
      ctx.fillStyle = isRepel ? '#f87171' : '#34d399';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isRepel ? '⚡ LIKE CHARGES REPEL (Double-click to toggle sign)' : '🧲 UNLIKE CHARGES ATTRACT (Double-click to toggle sign)',
        width / 2,
        height - 18
      );

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };

    function drawChargeBody(ctx, q, label) {
      const isPos = q.sign > 0;
      const grad = ctx.createRadialGradient(q.x, q.y, 2, q.x, q.y, q.r);
      grad.addColorStop(0, isPos ? '#ff7892' : '#72e6ff');
      grad.addColorStop(1, isPos ? '#be123c' : '#0369a1');

      ctx.save();
      ctx.shadowColor = isPos ? '#ff7892' : '#72e6ff';
      ctx.shadowBlur = q.dragging ? 25 : 15;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isPos ? '+' : '−', q.x, q.y);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px monospace';
      ctx.fillText(label, q.x, q.y + q.r + 16);
    }

    function drawVector(ctx, fromX, fromY, toX, toY, color, label) {
      const headlen = 10;
      const angle = Math.atan2(toY - fromY, toX - fromX);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.fill();

      ctx.fillStyle = color;
      ctx.font = 'bold 12px monospace';
      ctx.fillText(label, toX + Math.cos(angle) * 12, toY + Math.sin(angle) * 12);
    }

    loop();
  },

  /* --- 03. Electric Field Lines: Vector Streamlines & Dipole Field Flow --- */
  initFieldViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;

    const qPos = { x: width * 0.32, y: height * 0.5 };
    const qNeg = { x: width * 0.68, y: height * 0.5 };

    // Fluid particles flowing along field streamlines
    const particleCount = 80;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      particles.push({
        angle,
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.005
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stationary dipole field line curves
      const numLines = 16;
      ctx.strokeStyle = 'rgba(114, 230, 255, 0.25)';
      ctx.lineWidth = 1.5;

      for (let i = 0; i < numLines; i++) {
        const theta = (Math.PI * 2 * i) / numLines;
        ctx.beginPath();
        let curX = qPos.x + Math.cos(theta) * 18;
        let curY = qPos.y + Math.sin(theta) * 18;
        ctx.moveTo(curX, curY);

        for (let step = 0; step < 70; step++) {
          // Electric field vectors from both charges: E = k q / r^2
          const d1x = curX - qPos.x, d1y = curY - qPos.y;
          const r1sq = d1x * d1x + d1y * d1y;
          const r1 = Math.sqrt(r1sq);

          const d2x = curX - qNeg.x, d2y = curY - qNeg.y;
          const r2sq = d2x * d2x + d2y * d2y;
          const r2 = Math.sqrt(r2sq);

          if (r2 < 18 || r1 > 500) break;

          const ex = (d1x / (r1sq * r1)) - (d2x / (r2sq * r2));
          const ey = (d1y / (r1sq * r1)) - (d2y / (r2sq * r2));
          const emag = Math.hypot(ex, ey);

          curX += (ex / emag) * 6;
          curY += (ey / emag) * 6;
          ctx.lineTo(curX, curY);
        }
        ctx.stroke();
      }

      // Draw flowing particles along the field
      particles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1.0) p.t = 0.0;

        // Approximate dipole curve position
        const u = p.t;
        const theta = p.angle;
        // Hermite-like arc interpolation
        const midYOffset = Math.sin(theta) * 90;
        const px = (1 - u) * qPos.x + u * qNeg.x;
        const py = (1 - u) * qPos.y + u * qNeg.y + Math.sin(u * Math.PI) * midYOffset;

        ctx.fillStyle = '#72e6ff';
        ctx.shadowColor = '#72e6ff';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Positive pole
      ctx.fillStyle = '#ff7892';
      ctx.shadowColor = '#ff7892';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(qPos.x, qPos.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('+', qPos.x, qPos.y);

      // Negative pole
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(qNeg.x, qNeg.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.fillText('−', qNeg.x, qNeg.y);

      // Caption
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FARADAY LINES OF FORCE (DIPOLE ELECTRIC STREAM)', width / 2, height - 16);

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };
    loop();
  },

  /* --- 04. Electric Flux & Flux Density: Gaussian Surface Piercing --- */
  initFluxViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;
    let offset = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      offset += 1.2;
      if (offset > 40) offset = 0;

      const cx = width / 2;
      const cy = height / 2;

      // Draw uniform flux lines passing from left to right
      ctx.strokeStyle = 'rgba(114, 230, 255, 0.4)';
      ctx.lineWidth = 1.8;
      const lineSpacing = 30;
      for (let y = 40; y < height - 40; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(width - 30, y);
        ctx.stroke();

        // Moving arrowheads
        const ax = ((offset + y * 2) % (width - 80)) + 40;
        ctx.fillStyle = '#72e6ff';
        ctx.beginPath();
        ctx.moveTo(ax, y);
        ctx.lineTo(ax - 8, y - 4);
        ctx.lineTo(ax - 8, y + 4);
        ctx.fill();
      }

      // 3D Gaussian Cylindrical Pillbox or Area Plane
      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      // Slanted area plate A
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy - 70);
      ctx.lineTo(cx + 40, cy - 50);
      ctx.lineTo(cx + 40, cy + 70);
      ctx.lineTo(cx - 40, cy + 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Normal vector dA perpendicular to area
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + 60, cy - 10);
      ctx.stroke();
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx + 60, cy - 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 14px monospace';
      ctx.fillText('dĀ', cx + 68, cy - 10);

      // Area label
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Area A', cx - 10, cy + 10);
      ctx.restore();

      // HUD readout
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FLUX: Ψ = ∫ D̄ · dĀ = Q (Coulombs) | D = Ψ / A', cx, height - 16);

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };
    loop();
  },

  /* --- 05. The Working Capacitor: Plate Charge Accumulation & Circuit Flow --- */
  initCapacitorViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;
    let cycle = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      cycle += 0.03;
      const chargeLevel = Math.min(1.0, (Math.sin(cycle) + 1) / 2);

      const cx = width / 2;
      const cy = height / 2;
      const plateW = 18;
      const plateH = 130;
      const gap = 90;

      // 1. External circuit wires
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - gap / 2, cy);
      ctx.lineTo(cx - gap / 2 - 60, cy);
      ctx.lineTo(cx - gap / 2 - 60, cy + 70);
      ctx.lineTo(cx - 30, cy + 70);
      // Battery symbol
      ctx.moveTo(cx + 30, cy + 70);
      ctx.lineTo(cx + gap / 2 + 60, cy + 70);
      ctx.lineTo(cx + gap / 2 + 60, cy);
      ctx.lineTo(cx + gap / 2, cy);
      ctx.stroke();

      // Battery plates
      ctx.strokeStyle = '#ff7892';
      ctx.beginPath();
      ctx.moveTo(cx - 15, cy + 55);
      ctx.lineTo(cx - 15, cy + 85);
      ctx.stroke();
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(cx + 15, cy + 62);
      ctx.lineTo(cx + 15, cy + 78);
      ctx.stroke();
      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 12px Inter';
      ctx.fillText('+', cx - 25, cy + 75);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('−', cx + 25, cy + 75);

      // Positive Anode Plate
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#ff7892';
      ctx.lineWidth = 2;
      ctx.fillRect(cx - gap / 2 - plateW, cy - plateH / 2, plateW, plateH);
      ctx.strokeRect(cx - gap / 2 - plateW, cy - plateH / 2, plateW, plateH);

      // Negative Cathode Plate
      ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(cx + gap / 2, cy - plateH / 2, plateW, plateH);
      ctx.strokeRect(cx + gap / 2, cy - plateH / 2, plateW, plateH);

      // Charge symbols accumulating on plates based on chargeLevel
      const numCharges = Math.floor(chargeLevel * 8);
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      for (let i = 0; i < numCharges; i++) {
        const y = cy - plateH / 2 + 16 + i * 15;
        ctx.fillStyle = '#ff7892';
        ctx.fillText('+', cx - gap / 2 - 8, y);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('−', cx + gap / 2 + 8, y);

        // Electric field arrow between plates
        ctx.strokeStyle = `rgba(114, 230, 255, ${chargeLevel * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - gap / 2, y);
        ctx.lineTo(cx + gap / 2, y);
        ctx.stroke();
      }

      // Status readout
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Q(t) = ${(chargeLevel * 100).toFixed(0)}% CHARGED | E = ${(chargeLevel * 50).toFixed(1)} kV/m`, cx, 24);

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };
    loop();
  },

  /* --- 06. Dielectric Polarization: Molecular Dipoles Under E-Field --- */
  initDielectricViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;
    let t = 0;

    const dipoles = [];
    const rows = 4, cols = 6;
    const sx = 40, sy = 30;
    const startX = width / 2 - (cols - 1) * sx / 2;
    const startY = height / 2 - (rows - 1) * sy / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dipoles.push({
          x: startX + c * sx,
          y: startY + r * sy,
          randomAngle: (Math.random() - 0.5) * Math.PI
        });
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.025;
      const fieldStrength = (Math.sin(t) + 1) / 2; // 0 to 1

      // External E-field arrows in background
      ctx.strokeStyle = `rgba(114, 230, 255, ${0.15 + fieldStrength * 0.35})`;
      ctx.lineWidth = 1.5;
      for (let y = 30; y < height - 30; y += 40) {
        ctx.beginPath();
        ctx.moveTo(20, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }

      // Draw each polarizing molecular dipole
      dipoles.forEach((d) => {
        // Dipole aligns with horizontal external field as fieldStrength increases
        const angle = d.randomAngle * (1 - fieldStrength);
        const len = 14;
        const px = Math.cos(angle) * len;
        const py = Math.sin(angle) * len;

        // Connecting bond
        ctx.strokeStyle = '#ffffff55';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(d.x - px, d.y - py);
        ctx.lineTo(d.x + px, d.y + py);
        ctx.stroke();

        // Positive atom lobe
        ctx.fillStyle = '#ff7892';
        ctx.beginPath();
        ctx.arc(d.x + px, d.y + py, 5.5, 0, Math.PI * 2);
        ctx.fill();

        // Negative atom lobe
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(d.x - px, d.y - py, 5.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Readout
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        `POLARIZATION: P = ε₀ χₑ E | ALIGNMENT: ${(fieldStrength * 100).toFixed(0)}%`,
        width / 2,
        height - 16
      );

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };
    loop();
  },

  /* --- 07. Series & Parallel Networks: Current & Charge Split Simulator --- */
  initNetworkViz(id) {
    const data = this.setupCanvas(id);
    if (!data) return;
    const { ctx, width, height } = data;
    let tick = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.04;

      const midX = width / 2;
      const topY = height * 0.28;
      const botY = height * 0.72;

      // 1. Series Network Diagram (Top Half)
      ctx.fillStyle = '#72e6ff';
      ctx.font = 'bold 13px Inter';
      ctx.textAlign = 'left';
      ctx.fillText('SERIES: 1/Ceq = 1/C₁ + 1/C₂ (Same Charge Q)', 24, 26);

      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, topY);
      ctx.lineTo(midX - 50, topY);
      // C1
      ctx.moveTo(midX - 30, topY);
      ctx.lineTo(midX + 30, topY);
      // C2
      ctx.moveTo(midX + 50, topY);
      ctx.lineTo(width - 40, topY);
      ctx.stroke();

      // C1 plates
      drawCapacitorSymbol(ctx, midX - 40, topY, 'C₁ = 10μF');
      drawCapacitorSymbol(ctx, midX + 40, topY, 'C₂ = 10μF');

      // 2. Parallel Network Diagram (Bottom Half)
      ctx.fillStyle = '#a855f7';
      ctx.fillText('PARALLEL: Ceq = C₁ + C₂ (Same Voltage V)', 24, botY - 55);

      ctx.strokeStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(40, botY);
      ctx.lineTo(midX - 50, botY);
      ctx.lineTo(midX - 50, botY - 30);
      ctx.lineTo(midX - 20, botY - 30);

      ctx.moveTo(midX - 50, botY);
      ctx.lineTo(midX - 50, botY + 30);
      ctx.lineTo(midX - 20, botY + 30);

      ctx.moveTo(midX + 20, botY - 30);
      ctx.lineTo(midX + 50, botY - 30);
      ctx.lineTo(midX + 50, botY);
      ctx.lineTo(width - 40, botY);

      ctx.moveTo(midX + 20, botY + 30);
      ctx.lineTo(midX + 50, botY + 30);
      ctx.stroke();

      drawCapacitorSymbol(ctx, midX, botY - 30, 'C₁ = 10μF');
      drawCapacitorSymbol(ctx, midX, botY + 30, 'C₂ = 10μF');

      // Animated charge packets
      const p1 = (tick % 2) / 2;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(40 + p1 * (width - 80), topY, 4, 0, Math.PI * 2);
      ctx.fill();

      PhysicsVisualizers.activeLoops[id] = requestAnimationFrame(loop);
    };

    function drawCapacitorSymbol(ctx, x, y, label) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 16);
      ctx.lineTo(x - 5, y + 16);
      ctx.moveTo(x + 5, y - 16);
      ctx.lineTo(x + 5, y + 16);
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, y - 22);
    }

    loop();
  }
};
