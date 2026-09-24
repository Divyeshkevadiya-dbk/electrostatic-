/**
 * circuit_simulators.js - High-Fidelity 2D Interactive Physics & Circuit Visualizers
 * Covers Unit 1 (Electrical Concepts & Components) and Unit 2 (Circuit Analysis & Theorems)
 * Full 60fps canvas rendering, real-time interactive parameters, dynamic meters, and high-DPI support.
 */

const CircuitSimulators = {
  activeLoops: {},
  activeStates: {},

  stop(canvasId) {
    if (this.activeLoops[canvasId]) {
      cancelAnimationFrame(this.activeLoops[canvasId]);
      delete this.activeLoops[canvasId];
    }
  },

  setupCanvas(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width > 50 ? rect.width : (canvas.parentElement ? canvas.parentElement.clientWidth : 600) || 600;
    const h = rect.height > 50 ? rect.height : 360;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);
    return { canvas, ctx, width: w, height: h };
  },

  /* =========================================================================
   * 1. OHM'S LAW & CURRENT FLOW (V-I Dynamic Curve + Electron Drift)
   * ========================================================================= */
  initOhmLawSim(canvasId, initialV = 12, initialR = 10) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      V: initialV,
      R: initialR,
      electrons: []
    };
    this.activeStates[canvasId] = state;

    for (let i = 0; i < 35; i++) {
      state.electrons.push({
        x: Math.random() * 260 + 50,
        y: Math.random() * 50 + 135,
        speed: 1
      });
    }

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const I = state.V / state.R;
      const P = state.V * I;
      const driftSpeed = Math.min(6, Math.max(0.2, I * 0.8));

      // Left Panel: Dynamic Circuit Schematic
      // Circuit loop wires
      const loopX = 50, loopY = 60, loopW = 260, loopH = 200;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
      ctx.shadowBlur = 8;
      ctx.strokeRect(loopX, loopY, loopW, loopH);
      ctx.shadowBlur = 0;

      // Battery (Left branch)
      const batY = loopY + loopH / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(loopX - 8, batY - 25, 16, 50);
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(loopX - 18, batY - 14);
      ctx.lineTo(loopX + 18, batY - 14); // + Long plate
      ctx.stroke();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(loopX - 10, batY + 14);
      ctx.lineTo(loopX + 10, batY + 14); // - Short thick plate
      ctx.stroke();

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('+', loopX + 24, batY - 10);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('−', loopX + 24, batY + 18);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Vs = ${state.V.toFixed(1)}V`, loopX - 45, batY + 4);

      // Resistor (Right branch)
      const resY = loopY + loopH / 2;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(loopX + loopW - 22, resY - 45, 44, 90);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.strokeRect(loopX + loopW - 22, resY - 45, 44, 90);

      // Zigzag resistor symbol inside
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(loopX + loopW, resY - 45);
      const zigzagSteps = 6;
      const stepH = 90 / zigzagSteps;
      for (let i = 1; i < zigzagSteps; i++) {
        const offset = (i % 2 === 1) ? 14 : -14;
        ctx.lineTo(loopX + loopW + offset, resY - 45 + i * stepH);
      }
      ctx.lineTo(loopX + loopW, resY + 45);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`R = ${state.R.toFixed(1)} Ω`, loopX + loopW + 28, resY + 4);

      // Moving Electrons (Flowing from - to + terminal through loop)
      ctx.fillStyle = '#00f5ff';
      const perimeter = 2 * (loopW + loopH);
      const electronCount = 28;
      for (let i = 0; i < electronCount; i++) {
        const pos = (i * (perimeter / electronCount) + tick * driftSpeed * 2) % perimeter;
        let ex = loopX, ey = loopY;
        if (pos < loopW) {
          // Top wire: left to right
          ex = loopX + pos;
          ey = loopY;
        } else if (pos < loopW + loopH) {
          // Right wire: top to bottom
          ex = loopX + loopW;
          ey = loopY + (pos - loopW);
        } else if (pos < 2 * loopW + loopH) {
          // Bottom wire: right to left
          ex = loopX + loopW - (pos - (loopW + loopH));
          ey = loopY + loopH;
        } else {
          // Left wire: bottom to top
          ex = loopX;
          ey = loopY + loopH - (pos - (2 * loopW + loopH));
        }

        ctx.beginPath();
        ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Conventional Current Direction Arrow (Top wire: Left to Right)
      ctx.fillStyle = '#10b981';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      const arrowX = loopX + loopW / 2;
      ctx.beginPath();
      ctx.moveTo(arrowX - 20, loopY - 12);
      ctx.lineTo(arrowX + 20, loopY - 12);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(arrowX + 20, loopY - 12);
      ctx.lineTo(arrowX + 12, loopY - 16);
      ctx.lineTo(arrowX + 12, loopY - 8);
      ctx.fill();
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`I = ${I.toFixed(3)} A`, arrowX - 25, loopY - 20);

      // Right Panel: V-I Curve Graph
      const graphX = 370;
      const graphY = 60;
      const graphW = width - graphX - 40;
      const graphH = 190;

      // Graph Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(graphX, graphY, graphW, graphH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(graphX, graphY, graphW, graphH);

      // Grid lines
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      for (let gv = 1; gv <= 4; gv++) {
        const gy = graphY + graphH - (gv / 4) * graphH;
        ctx.beginPath();
        ctx.moveTo(graphX, gy);
        ctx.lineTo(graphX + graphW, gy);
        ctx.stroke();

        const gx = graphX + (gv / 4) * graphW;
        ctx.beginPath();
        ctx.moveTo(gx, graphY);
        ctx.lineTo(gx, graphY + graphH);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Axes
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(graphX, graphY);
      ctx.lineTo(graphX, graphY + graphH);
      ctx.lineTo(graphX + graphW, graphY + graphH);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('0', graphX - 12, graphY + graphH + 12);
      ctx.fillText('Voltage V (Volts) →', graphX + graphW / 2 - 40, graphY + graphH + 24);
      ctx.save();
      ctx.translate(graphX - 25, graphY + graphH / 2 + 30);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Current I (A) →', 0, 0);
      ctx.restore();

      // V-I Characteristic Line (I = V / R)
      // Max V on axis = 50V, Max I on axis = 5A
      const maxV = 50;
      const maxI = 5;
      const endV = maxV;
      const endI = endV / state.R;
      const pxEnd = graphX + (endV / maxV) * graphW;
      const pyEnd = graphY + graphH - Math.min(graphH, (endI / maxI) * graphH);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(graphX, graphY + graphH);
      ctx.lineTo(pxEnd, pyEnd);
      ctx.stroke();

      // Operating Point on V-I line
      const currPx = graphX + (state.V / maxV) * graphW;
      const currPy = graphY + graphH - (I / maxI) * graphH;
      ctx.fillStyle = '#ff2e93';
      ctx.beginPath();
      ctx.arc(currPx, currPy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ff2e93';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`(${state.V.toFixed(1)}V, ${I.toFixed(2)}A)`, currPx + 8, currPy - 6);

      // Bottom Metrics Strip
      const botY = height - 55;
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.fillRect(20, botY, width - 40, 42);
      ctx.strokeRect(20, botY, width - 40, 42);

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`VOLTAGE: ${state.V.toFixed(1)} V`, 35, botY + 26);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`RESISTANCE: ${state.R.toFixed(1)} Ω`, 190, botY + 26);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`CURRENT: ${I.toFixed(3)} A`, 370, botY + 26);
      ctx.fillStyle = '#ff2e93';
      ctx.fillText(`POWER: ${P.toFixed(2)} W`, 540, botY + 26);

      this.activeLoops[canvasId] = requestAnimationFrame(loop);
    };

    loop();
  },

  updateOhmLaw(canvasId, v, r) {
    if (this.activeStates[canvasId]) {
      if (v !== undefined) this.activeStates[canvasId].V = parseFloat(v);
      if (r !== undefined) this.activeStates[canvasId].R = parseFloat(r);
    }
  },

  /* =========================================================================
   * 2. SERIES RESISTORS & VOLTAGE DIVIDER RULE (VDR)
   * ========================================================================= */
  initSeriesVDRSim(canvasId, initialVs = 24, initialR1 = 10, initialR2 = 20, initialR3 = 30) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      Vs: initialVs,
      R1: initialR1,
      R2: initialR2,
      R3: initialR3
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const Req = state.R1 + state.R2 + state.R3;
      const I = state.Vs / Req;
      const V1 = state.Vs * (state.R1 / Req);
      const V2 = state.Vs * (state.R2 / Req);
      const V3 = state.Vs * (state.R3 / Req);

      // Title & Law Equation
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('SERIES CIRCUIT & VOLTAGE DIVIDER RULE (VDR)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('Vk = Vs · (Rk / Req)  |  Req = R₁ + R₂ + R₃  |  Same Current I Throughout', 25, 44);

      // Circuit geometry
      const cX = 50, cY = 70, cW = width - 100, cH = 150;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(cX, cY, cW, cH);

      // Battery on Left Branch
      const batY = cY + cH / 2;
      ctx.fillStyle = '#030712';
      ctx.fillRect(cX - 12, batY - 25, 24, 50);
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cX - 16, batY - 12);
      ctx.lineTo(cX + 16, batY - 12);
      ctx.stroke();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cX - 10, batY + 12);
      ctx.lineTo(cX + 10, batY + 12);
      ctx.stroke();
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`+`, cX + 22, batY - 8);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`−`, cX + 22, batY + 16);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`Vs = ${state.Vs.toFixed(0)}V`, cX - 40, batY + 36);

      // 3 Resistors along top wire
      const rSpacing = cW / 4;
      const resistors = [
        { name: 'R₁', r: state.R1, v: V1, x: cX + rSpacing * 1, color: '#38bdf8' },
        { name: 'R₂', r: state.R2, v: V2, x: cX + rSpacing * 2, color: '#a855f7' },
        { name: 'R₃', r: state.R3, v: V3, x: cX + rSpacing * 3, color: '#f59e0b' }
      ];

      resistors.forEach(res => {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(res.x - 30, cY - 16, 60, 32);
        ctx.strokeStyle = res.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(res.x - 30, cY - 16, 60, 32);

        ctx.fillStyle = res.color;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${res.name} = ${res.r}Ω`, res.x, cY + 4);

        // Voltage Drop Label
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`V = ${res.v.toFixed(2)} V`, res.x, cY - 24);
      });
      ctx.textAlign = 'left';

      // Moving electrons in single loop
      const perim = 2 * (cW + cH);
      const eCount = 30;
      ctx.fillStyle = '#00f5ff';
      for (let i = 0; i < eCount; i++) {
        const p = (i * (perim / eCount) + tick * (I * 2 + 0.5)) % perim;
        let ex = cX, ey = cY;
        if (p < cW) { ex = cX + p; ey = cY; }
        else if (p < cW + cH) { ex = cX + cW; ey = cY + (p - cW); }
        else if (p < 2 * cW + cH) { ex = cX + cW - (p - (cW + cH)); ey = cY + cH; }
        else { ex = cX; ey = cY + cH - (p - (2 * cW + cH)); }
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Live Voltage Stack Bar (Bottom)
      const barY = height - 90;
      const barW = width - 80;
      const barH = 22;
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(40, barY, barW, barH);
      ctx.strokeRect(40, barY, barW, barH);

      const w1 = (V1 / state.Vs) * barW;
      const w2 = (V2 / state.Vs) * barW;
      const w3 = (V3 / state.Vs) * barW;

      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(40, barY, w1, barH);
      ctx.fillStyle = '#a855f7';
      ctx.fillRect(40 + w1, barY, w2, barH);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(40 + w1 + w2, barY, w3, barH);

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      if (w1 > 40) ctx.fillText(`V₁: ${V1.toFixed(1)}V`, 45, barY + 15);
      if (w2 > 40) ctx.fillText(`V₂: ${V2.toFixed(1)}V`, 45 + w1, barY + 15);
      if (w3 > 40) ctx.fillText(`V₃: ${V3.toFixed(1)}V`, 45 + w1 + w2, barY + 15);

      // Metrics Summary Footer
      const footY = height - 35;
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Req = ${Req.toFixed(1)} Ω`, 40, footY);
      ctx.fillText(`Loop Current I = ${I.toFixed(3)} A`, 190, footY);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`KVL Check: V₁ + V₂ + V₃ = ${(V1 + V2 + V3).toFixed(1)} V = Vs (100% Verified)`, 380, footY);

      this.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateSeriesVDR(canvasId, vs, r1, r2, r3) {
    if (this.activeStates[canvasId]) {
      if (vs !== undefined) this.activeStates[canvasId].Vs = parseFloat(vs);
      if (r1 !== undefined) this.activeStates[canvasId].R1 = parseFloat(r1);
      if (r2 !== undefined) this.activeStates[canvasId].R2 = parseFloat(r2);
      if (r3 !== undefined) this.activeStates[canvasId].R3 = parseFloat(r3);
    }
  },

  /* =========================================================================
   * 3. PARALLEL RESISTORS & CURRENT DIVIDER RULE (CDR)
   * ========================================================================= */
  initParallelCDRSim(canvasId, initialV = 24, initialR1 = 12, initialR2 = 24, initialR3 = 48) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      V: initialV,
      R1: initialR1,
      R2: initialR2,
      R3: initialR3
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const I1 = state.V / state.R1;
      const I2 = state.V / state.R2;
      const I3 = state.V / state.R3;
      const Itotal = I1 + I2 + I3;
      const Req = 1 / (1 / state.R1 + 1 / state.R2 + 1 / state.R3);

      // Header
      ctx.fillStyle = '#a855f7';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('PARALLEL RESISTIVE NETWORK & CURRENT DIVIDER RULE (CDR)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('Ik = Itotal · (Req / Rk)  |  1/Req = 1/R₁ + 1/R₂ + 1/R₃  |  Same Voltage V Across Branches', 25, 44);

      // Circuit geometry
      const srcX = 60, topY = 80, botY = 240;
      const bX1 = 200, bX2 = 330, bX3 = 460;
      const rightX = bX3 + 50;

      // Main rails
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Top rail
      ctx.moveTo(srcX, topY);
      ctx.lineTo(rightX, topY);
      // Bottom rail
      ctx.moveTo(srcX, botY);
      ctx.lineTo(rightX, botY);
      // Left DC Supply branch
      ctx.moveTo(srcX, topY);
      ctx.lineTo(srcX, botY);
      // 3 Parallel branches
      ctx.moveTo(bX1, topY); ctx.lineTo(bX1, botY);
      ctx.moveTo(bX2, topY); ctx.lineTo(bX2, botY);
      ctx.moveTo(bX3, topY); ctx.lineTo(bX3, botY);
      ctx.stroke();

      // Battery on Left
      const midY = (topY + botY) / 2;
      ctx.fillStyle = '#030712';
      ctx.fillRect(srcX - 10, midY - 25, 20, 50);
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(srcX - 14, midY - 12); ctx.lineTo(srcX + 14, midY - 12);
      ctx.stroke();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(srcX - 8, midY + 12); ctx.lineTo(srcX + 8, midY + 12);
      ctx.stroke();
      ctx.fillStyle = '#00f5ff'; ctx.font = 'bold 12px monospace'; ctx.fillText('+', srcX + 18, midY - 8);
      ctx.fillStyle = '#ef4444'; ctx.fillText('−', srcX + 18, midY + 16);
      ctx.fillStyle = '#f8fafc'; ctx.fillText(`V = ${state.V.toFixed(0)}V`, srcX - 45, midY + 36);

      // 3 Resistors in branches
      const branches = [
        { name: 'R₁', r: state.R1, i: I1, x: bX1, color: '#38bdf8' },
        { name: 'R₂', r: state.R2, i: I2, x: bX2, color: '#a855f7' },
        { name: 'R₃', r: state.R3, i: I3, x: bX3, color: '#f59e0b' }
      ];

      branches.forEach(b => {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(b.x - 20, midY - 26, 40, 52);
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(b.x - 20, midY - 26, 40, 52);

        ctx.fillStyle = b.color;
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, b.x, midY - 8);
        ctx.fillText(`${b.r}Ω`, b.x, midY + 8);

        // Branch Current Display
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`I = ${b.i.toFixed(2)}A`, b.x, midY + 44);

        // Moving electrons in this branch
        const numE = Math.max(3, Math.min(12, Math.round(b.i * 3)));
        ctx.fillStyle = '#00f5ff';
        for (let j = 0; j < numE; j++) {
          const ey = topY + ((j * 25 + tick * (b.i * 1.5 + 0.4)) % (botY - topY));
          ctx.beginPath();
          ctx.arc(b.x, ey, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.textAlign = 'left';

      // Total Current indicator
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Itotal = ${Itotal.toFixed(2)} A →`, srcX + 25, topY - 12);

      // Footer Metrics
      const footY = height - 40;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.06)';
      ctx.fillRect(20, footY - 20, width - 40, 46);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)';
      ctx.strokeRect(20, footY - 20, width - 40, 46);

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Req = ${Req.toFixed(2)} Ω`, 35, footY + 8);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Itotal = ${Itotal.toFixed(3)} A`, 170, footY + 8);
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`KCL Check: I₁ + I₂ + I₃ = ${(I1 + I2 + I3).toFixed(3)} A = Itotal (Verified)`, 330, footY + 8);

      this.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateParallelCDR(canvasId, v, r1, r2, r3) {
    if (this.activeStates[canvasId]) {
      if (v !== undefined) this.activeStates[canvasId].V = parseFloat(v);
      if (r1 !== undefined) this.activeStates[canvasId].R1 = parseFloat(r1);
      if (r2 !== undefined) this.activeStates[canvasId].R2 = parseFloat(r2);
      if (r3 !== undefined) this.activeStates[canvasId].R3 = parseFloat(r3);
    }
  },

  /* =========================================================================
   * 4. KIRCHHOFF'S CURRENT LAW (KCL) JUNCTION PULSER
   * ========================================================================= */
  initKCLJunctionSim(canvasId, initialI1 = 4, initialI2 = 3, initialI3 = 5, initialI4 = 7) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      I1: initialI1, // in
      I2: initialI2, // in
      I3: initialI3, // in
      I4: initialI4, // out
      // I5 is auto-calculated: I5 = (I1 + I2 + I3) - I4
    };
    this.activeStates[canvasId] = state;

    const jX = width / 2;
    const jY = height / 2 + 10;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const Iin = state.I1 + state.I2 + state.I3;
      const I5 = Iin - state.I4;

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText("KIRCHHOFF'S CURRENT LAW (KCL) - CONSERVATION OF CHARGE", 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('∑ I_in = ∑ I_out  ⟺  I₁ + I₂ + I₃ = I₄ + I₅  ⟺  ∑ I_node = 0', 25, 44);

      // Define 5 branches around junction node
      const branches = [
        { id: '1', i: state.I1, angle: Math.PI * 1.0, type: 'in', color: '#00f5ff', label: `I₁ = ${state.I1}A (IN)` },
        { id: '2', i: state.I2, angle: Math.PI * 1.35, type: 'in', color: '#38bdf8', label: `I₂ = ${state.I2}A (IN)` },
        { id: '3', i: state.I3, angle: Math.PI * 0.65, type: 'in', color: '#818cf8', label: `I₃ = ${state.I3}A (IN)` },
        { id: '4', i: state.I4, angle: Math.PI * 1.85, type: 'out', color: '#f59e0b', label: `I₄ = ${state.I4}A (OUT)` },
        { id: '5', i: I5, angle: Math.PI * 0.15, type: 'out', color: '#ff2e93', label: `I₅ = ${I5.toFixed(1)}A (OUT)` }
      ];

      const radius = Math.min(width, height) * 0.38;

      branches.forEach(b => {
        const bx = jX + Math.cos(b.angle) * radius;
        const by = jY + Math.sin(b.angle) * radius;

        // Conductor Wire
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(jX, jY);
        ctx.lineTo(bx, by);
        ctx.stroke();

        // Arrow showing direction
        const arrowDist = radius * 0.55;
        const ax = jX + Math.cos(b.angle) * arrowDist;
        const ay = jY + Math.sin(b.angle) * arrowDist;
        const arrowDir = b.type === 'in' ? b.angle + Math.PI : b.angle;

        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        ctx.fill();

        // Animated particles along wire
        const particleCount = Math.max(2, Math.round(b.i * 2));
        ctx.fillStyle = '#ffffff';
        for (let p = 0; p < particleCount; p++) {
          let progress = ((p / particleCount) + tick * 0.02 * (b.i * 0.5 + 0.5)) % 1;
          if (b.type === 'in') progress = 1 - progress; // moves towards junction
          const px = jX + Math.cos(b.angle) * (progress * radius);
          const py = jY + Math.sin(b.angle) * (progress * radius);
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Branch Labels
        ctx.fillStyle = b.color;
        ctx.font = 'bold 12px monospace';
        const lx = jX + Math.cos(b.angle) * (radius + 20);
        const ly = jY + Math.sin(b.angle) * (radius + 20);
        ctx.textAlign = Math.cos(b.angle) > 0 ? 'left' : 'right';
        ctx.fillText(b.label, lx, ly);
      });
      ctx.textAlign = 'left';

      // Central Node Dot
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f5ff';
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(jX, jY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(jX, jY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Verification Badge (Bottom Center)
      const badgeY = height - 42;
      ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.fillRect(width / 2 - 220, badgeY - 14, 440, 36);
      ctx.strokeRect(width / 2 - 220, badgeY - 14, 440, 36);

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`∑ I_in = ${Iin.toFixed(1)} A   =   ∑ I_out = ${(state.I4 + I5).toFixed(1)} A   (ΔI = 0.000 A)`, width / 2, badgeY + 8);
      ctx.textAlign = 'left';

      this.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateKCLJunction(canvasId, i1, i2, i3, i4) {
    if (this.activeStates[canvasId]) {
      if (i1 !== undefined) this.activeStates[canvasId].I1 = parseFloat(i1);
      if (i2 !== undefined) this.activeStates[canvasId].I2 = parseFloat(i2);
      if (i3 !== undefined) this.activeStates[canvasId].I3 = parseFloat(i3);
      if (i4 !== undefined) this.activeStates[canvasId].I4 = parseFloat(i4);
    }
  },

  /* =========================================================================
   * 5. KIRCHHOFF'S VOLTAGE LAW (KVL) CLOSED LOOP TRACER
   * ========================================================================= */
  initKVLLoopSim(canvasId, initialE1 = 30, initialE2 = 10, initialR1 = 5, initialR2 = 10, initialR3 = 15) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      E1: initialE1,
      E2: initialE2,
      R1: initialR1,
      R2: initialR2,
      R3: initialR3
    };
    this.activeStates[canvasId] = state;

    let probeProgress = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      probeProgress = (probeProgress + 0.004) % 1;

      const Req = state.R1 + state.R2 + state.R3;
      const netE = state.E1 - state.E2;
      const I = netE / Req;
      const VR1 = I * state.R1;
      const VR2 = I * state.R2;
      const VR3 = I * state.R3;

      // Header
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px monospace';
      ctx.fillText("KIRCHHOFF'S VOLTAGE LAW (KVL) - CONSERVATION OF ENERGY", 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('∑ V_loop = 0  ⟺  +E₁ − I·R₁ − I·R₂ − E₂ − I·R₃ = 0', 25, 44);

      // Loop Dimensions
      const cX = 70, cY = 75, cW = width - 140, cH = 170;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(cX, cY, cW, cH);

      // Source E1 on Left (Battery)
      const bat1Y = cY + cH / 2;
      ctx.fillStyle = '#030712'; ctx.fillRect(cX - 12, bat1Y - 24, 24, 48);
      ctx.strokeStyle = '#00f5ff'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cX - 14, bat1Y - 10); ctx.lineTo(cX + 14, bat1Y - 10); ctx.stroke();
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(cX - 8, bat1Y + 10); ctx.lineTo(cX + 8, bat1Y + 10); ctx.stroke();
      ctx.fillStyle = '#00f5ff'; ctx.font = 'bold 11px monospace'; ctx.fillText('+', cX + 18, bat1Y - 8);
      ctx.fillStyle = '#ef4444'; ctx.fillText('−', cX + 18, bat1Y + 14);
      ctx.fillStyle = '#00f5ff'; ctx.fillText(`E₁ = ${state.E1}V`, cX - 60, bat1Y + 4);

      // R1 & R2 along top wire
      const r1X = cX + cW * 0.33;
      const r2X = cX + cW * 0.67;
      [
        { name: 'R₁', r: state.R1, v: VR1, x: r1X, color: '#38bdf8' },
        { name: 'R₂', r: state.R2, v: VR2, x: r2X, color: '#a855f7' }
      ].forEach(r => {
        ctx.fillStyle = '#0f172a'; ctx.fillRect(r.x - 24, cY - 14, 48, 28);
        ctx.strokeStyle = r.color; ctx.lineWidth = 2; ctx.strokeRect(r.x - 24, cY - 14, 48, 28);
        ctx.fillStyle = r.color; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
        ctx.fillText(`${r.name}=${r.r}Ω`, r.x, cY + 4);
        ctx.fillStyle = '#ef4444'; ctx.fillText(`−${r.v.toFixed(1)}V`, r.x, cY - 20);
      });

      // Opposing Source E2 on Right wire
      const bat2Y = cY + cH / 2;
      ctx.fillStyle = '#030712'; ctx.fillRect(cX + cW - 12, bat2Y - 24, 24, 48);
      // Notice polarity: + on bottom, - on top (opposing)
      ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(cX + cW - 8, bat2Y - 10); ctx.lineTo(cX + cW + 8, bat2Y - 10); ctx.stroke();
      ctx.strokeStyle = '#00f5ff'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cX + cW - 14, bat2Y + 10); ctx.lineTo(cX + cW + 14, bat2Y + 10); ctx.stroke();
      ctx.fillStyle = '#ef4444'; ctx.font = 'bold 11px monospace'; ctx.fillText('−', cX + cW - 22, bat2Y - 8);
      ctx.fillStyle = '#00f5ff'; ctx.fillText('+', cX + cW - 22, bat2Y + 14);
      ctx.fillStyle = '#f59e0b'; ctx.fillText(`E₂ = ${state.E2}V`, cX + cW + 20, bat2Y + 4);

      // R3 along bottom wire
      const r3X = cX + cW * 0.5;
      ctx.fillStyle = '#0f172a'; ctx.fillRect(r3X - 24, cY + cH - 14, 48, 28);
      ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2; ctx.strokeRect(r3X - 24, cY + cH - 14, 48, 28);
      ctx.fillStyle = '#10b981'; ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      ctx.fillText(`R₃=${state.R3}Ω`, r3X, cY + cH + 4);
      ctx.fillStyle = '#ef4444'; ctx.fillText(`−${VR3.toFixed(1)}V`, r3X, cY + cH + 26);
      ctx.textAlign = 'left';

      // Tracing Probe moving clockwise around the closed loop
      const perim = 2 * (cW + cH);
      const probeDist = probeProgress * perim;
      let px = cX, py = cY;
      if (probeDist < cW) { px = cX + probeDist; py = cY; }
      else if (probeDist < cW + cH) { px = cX + cW; py = cY + (probeDist - cW); }
      else if (probeDist < 2 * cW + cH) { px = cX + cW - (probeDist - (cW + cH)); py = cY + cH; }
      else { px = cX; py = cY + cH - (probeDist - (2 * cW + cH)); }

      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // KVL Loop Tally Footer
      const footY = height - 40;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.fillRect(20, footY - 20, width - 40, 44);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.strokeRect(20, footY - 20, width - 40, 44);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Net EMF: ${(state.E1 - state.E2).toFixed(1)}V`, 35, footY + 7);
      ctx.fillText(`Loop Current: ${I.toFixed(2)}A`, 190, footY + 7);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`KVL Sum: +${state.E1} − ${VR1.toFixed(1)} − ${VR2.toFixed(1)} − ${state.E2} − ${VR3.toFixed(1)} = 0.00 V (Balanced)`, 350, footY + 7);

      this.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateKVLLoop(canvasId, e1, e2, r1, r2, r3) {
    if (this.activeStates[canvasId]) {
      if (e1 !== undefined) this.activeStates[canvasId].E1 = parseFloat(e1);
      if (e2 !== undefined) this.activeStates[canvasId].E2 = parseFloat(e2);
      if (r1 !== undefined) this.activeStates[canvasId].R1 = parseFloat(r1);
      if (r2 !== undefined) this.activeStates[canvasId].R2 = parseFloat(r2);
      if (r3 !== undefined) this.activeStates[canvasId].R3 = parseFloat(r3);
    }
  },

  /* =========================================================================
   * 6. STAR-DELTA (Y-Δ) CONVERSION SIMULATOR
   * ========================================================================= */
  initStarDeltaSim(canvasId, mode = 'star', rA = 10, rB = 20, rC = 30) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      mode: mode, // 'star' or 'delta'
      rA: rA,
      rB: rB,
      rC: rC
    };
    this.activeStates[canvasId] = state;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Star-to-Delta and Delta-to-Star Formulas
      // If Star inputs: Ra, Rb, Rc
      // Rab = Ra + Rb + (Ra*Rb)/Rc
      // Rbc = Rb + Rc + (Rb*Rc)/Ra
      // Rca = Rc + Ra + (Rc*Ra)/Rb
      const Ra = state.rA, Rb = state.rB, Rc = state.rC;
      const Rab = Ra + Rb + (Ra * Rb) / Rc;
      const Rbc = Rb + Rc + (Rb * Rc) / Ra;
      const Rca = Rc + Ra + (Rc * Ra) / Rb;

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('STAR-DELTA (Y ↔ Δ) TRANSFORMATION WORKBENCH', 25, 26);

      // Node coordinates for 3 terminals (Equilateral triangle)
      const midX = width / 2;
      const topY = 70;
      const nodeA = { x: midX, y: topY, label: 'Terminal A' };
      const nodeB = { x: midX - 160, y: topY + 160, label: 'Terminal B' };
      const nodeC = { x: midX + 160, y: topY + 160, label: 'Terminal C' };
      const centerN = { x: midX, y: topY + 110, label: 'Neutral N' };

      // Draw Delta Circuit (Outer Triangle)
      ctx.strokeStyle = state.mode === 'delta' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = state.mode === 'delta' ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.lineTo(nodeC.x, nodeC.y);
      ctx.closePath();
      ctx.stroke();

      // Draw Star Circuit (Inner Spokes to Neutral)
      ctx.strokeStyle = state.mode === 'star' ? '#00f5ff' : 'rgba(0, 245, 255, 0.3)';
      ctx.lineWidth = state.mode === 'star' ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(centerN.x, centerN.y); ctx.lineTo(nodeA.x, nodeA.y);
      ctx.moveTo(centerN.x, centerN.y); ctx.lineTo(nodeB.x, nodeB.y);
      ctx.moveTo(centerN.x, centerN.y); ctx.lineTo(nodeC.x, nodeC.y);
      ctx.stroke();

      // Delta Labels (AB, BC, CA)
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`R_AB = ${Rab.toFixed(1)} Ω`, (nodeA.x + nodeB.x) / 2 - 80, (nodeA.y + nodeB.y) / 2);
      ctx.fillText(`R_BC = ${Rbc.toFixed(1)} Ω`, midX - 45, nodeB.y + 24);
      ctx.fillText(`R_CA = ${Rca.toFixed(1)} Ω`, (nodeA.x + nodeC.x) / 2 + 15, (nodeA.y + nodeC.y) / 2);

      // Star Labels (RA, RB, RC)
      ctx.fillStyle = '#00f5ff';
      ctx.fillText(`R_A = ${Ra.toFixed(1)} Ω`, centerN.x + 12, (nodeA.y + centerN.y) / 2);
      ctx.fillText(`R_B = ${Rb.toFixed(1)} Ω`, (centerN.x + nodeB.x) / 2 - 35, (centerN.y + nodeB.y) / 2 + 15);
      ctx.fillText(`R_C = ${Rc.toFixed(1)} Ω`, (centerN.x + nodeC.x) / 2 - 10, (centerN.y + nodeC.y) / 2 + 15);

      // Terminals A, B, C dots
      [nodeA, nodeB, nodeC].forEach(n => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(n.label, n.x - 30, n.y - 12);
      });

      // Neutral Dot
      ctx.fillStyle = '#00f5ff';
      ctx.beginPath();
      ctx.arc(centerN.x, centerN.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Step-by-Step Conversion Summary (Bottom)
      const footY = height - 55;
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.fillRect(20, footY - 14, width - 40, 45);
      ctx.strokeRect(20, footY - 14, width - 40, 45);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px monospace';
      ctx.fillText(`Star Input: R_A=${Ra}Ω, R_B=${Rb}Ω, R_C=${Rc}Ω`, 35, footY + 4);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`→ Equivalent Delta: R_AB=${Rab.toFixed(1)}Ω, R_BC=${Rbc.toFixed(1)}Ω, R_CA=${Rca.toFixed(1)}Ω`, 35, footY + 22);

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateStarDelta(canvasId, mode, rA, rB, rC) {
    if (this.activeStates[canvasId]) {
      if (mode !== undefined) this.activeStates[canvasId].mode = mode;
      if (rA !== undefined) this.activeStates[canvasId].rA = parseFloat(rA);
      if (rB !== undefined) this.activeStates[canvasId].rB = parseFloat(rB);
      if (rC !== undefined) this.activeStates[canvasId].rC = parseFloat(rC);
    }
  },

  /* =========================================================================
   * 7. TEMPERATURE COEFFICIENT OF RESISTANCE (Rt = R0[1 + α0·Δt])
   * ========================================================================= */
  initTempCoefficientSim(canvasId, initialTemp = 20, initialR0 = 100, material = 'copper') {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const materials = {
      copper: { name: 'Copper (PTC Metal)', alpha: 0.00428, color: '#f59e0b' },
      platinum: { name: 'Platinum RTD Sensor', alpha: 0.00392, color: '#e2e8f0' },
      semiconductor: { name: 'Silicon (NTC Thermistor)', alpha: -0.040, color: '#38bdf8' }
    };

    const state = {
      temp: initialTemp, // in °C
      R0: initialR0,     // in Ω at 0°C
      material: material
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const mat = materials[state.material] || materials.copper;
      const alpha = mat.alpha;
      const Rt = Math.max(0.1, state.R0 * (1 + alpha * state.temp));

      // Header
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('TEMPERATURE EFFECT ON RESISTANCE (THERMAL SCATTERING)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`Formula: R_t = R₀ · [1 + α₀ · t]  |  ${mat.name}  |  α₀ = ${alpha > 0 ? '+' : ''}${alpha} /°C`, 25, 44);

      // Left Panel: Atomic Lattice Vibration Animation
      const latX = 40, latY = 70, latW = 250, latH = 175;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(latX, latY, latW, latH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(latX, latY, latW, latH);

      // Vibrating Copper Ions (thermal jitter amplitude proportional to temp)
      const jitterAmp = Math.max(1, (state.temp + 50) * 0.06);
      ctx.fillStyle = mat.color;
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
          const baseIonX = latX + 35 + col * 45;
          const baseIonY = latY + 30 + row * 40;
          const jx = Math.sin(tick * 0.2 + row + col) * jitterAmp;
          const jy = Math.cos(tick * 0.25 + row * 2 + col) * jitterAmp;

          ctx.beginPath();
          ctx.arc(baseIonX + jx, baseIonY + jy, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('+', baseIonX + jx - 3, baseIonY + jy + 3);
          ctx.fillStyle = mat.color;
        }
      }

      // Drifting Conduction Electrons
      ctx.fillStyle = '#00f5ff';
      const electronSpeed = Math.max(0.2, 50 / Rt);
      for (let e = 0; e < 15; e++) {
        const ex = latX + ((e * 35 + tick * electronSpeed) % (latW - 10));
        const ey = latY + 25 + (e * 23) % (latH - 45);
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '10px monospace';
      ctx.fillText(alpha > 0 ? 'Vibrations scatter electrons → R increases' : 'Thermal energy frees carriers → R decreases', latX + 8, latY + latH - 8);

      // Right Panel: Dynamic R vs T Curve
      const gX = 330, gY = 70, gW = width - gX - 40, gH = 175;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(gX, gY, gW, gH);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(gX, gY, gW, gH);

      // Graph Axes: T from -50°C to +200°C
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(gX, gY + gH);
      ctx.lineTo(gX + gW, gY + gH);
      ctx.moveTo(gX, gY);
      ctx.lineTo(gX, gY + gH);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('-50°C', gX, gY + gH + 14);
      ctx.fillText('0°C', gX + (50 / 250) * gW - 8, gY + gH + 14);
      ctx.fillText('200°C', gX + gW - 25, gY + gH + 14);
      ctx.fillText('Resistance (Ω) →', gX + 8, gY + 16);

      // Plot curve
      ctx.strokeStyle = mat.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const maxRGraph = state.R0 * 2.5;
      for (let t = -50; t <= 200; t += 10) {
        const valR = Math.max(0, state.R0 * (1 + alpha * t));
        const px = gX + ((t + 50) / 250) * gW;
        const py = gY + gH - Math.min(gH, (valR / maxRGraph) * gH);
        if (t === -50) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Operating point marker
      const opX = gX + ((state.temp + 50) / 250) * gW;
      const opY = gY + gH - Math.min(gH, (Rt / maxRGraph) * gH);
      ctx.fillStyle = '#ff2e93';
      ctx.beginPath();
      ctx.arc(opX, opY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(`(${state.temp}°C, ${Rt.toFixed(1)}Ω)`, opX + 8, opY - 6);

      // Bottom Metrics Footer
      const footY = height - 42;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.fillRect(20, footY - 14, width - 40, 42);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.strokeRect(20, footY - 14, width - 40, 42);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Base R₀ (at 0°C) = ${state.R0} Ω`, 35, footY + 12);
      ctx.fillText(`Temperature t = ${state.temp} °C`, 220, footY + 12);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Computed Resistance R_t = ${Rt.toFixed(2)} Ω`, 410, footY + 12);

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateTempCoefficient(canvasId, temp, r0, mat) {
    if (this.activeStates[canvasId]) {
      if (temp !== undefined) this.activeStates[canvasId].temp = parseFloat(temp);
      if (r0 !== undefined) this.activeStates[canvasId].R0 = parseFloat(r0);
      if (mat !== undefined) this.activeStates[canvasId].material = mat;
    }
  },

  /* =========================================================================
   * 8. RESISTOR COLOR CODE INTERACTIVE STUDIO (4 & 5 BAND)
   * ========================================================================= */
  initResistorColorCodeSim(canvasId, band1 = 4, band2 = 7, band3 = 2, tol = 5) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const colorTable = [
      { val: 0, name: 'Black', hex: '#111827', mult: 1 },
      { val: 1, name: 'Brown', hex: '#854d0e', mult: 10, tol: 1 },
      { val: 2, name: 'Red', hex: '#ef4444', mult: 100, tol: 2 },
      { val: 3, name: 'Orange', hex: '#f97316', mult: 1000 },
      { val: 4, name: 'Yellow', hex: '#eab308', mult: 10000 },
      { val: 5, name: 'Green', hex: '#22c55e', mult: 100000, tol: 0.5 },
      { val: 6, name: 'Blue', hex: '#3b82f6', mult: 1000000, tol: 0.25 },
      { val: 7, name: 'Violet', hex: '#a855f7', mult: 10000000, tol: 0.1 },
      { val: 8, name: 'Gray', hex: '#64748b', mult: 100000000 },
      { val: 9, name: 'White', hex: '#f8fafc', mult: 1000000000 },
      { val: -1, name: 'Gold', hex: '#d97706', mult: 0.1, tol: 5 },
      { val: -2, name: 'Silver', hex: '#94a3b8', mult: 0.01, tol: 10 }
    ];

    const state = {
      b1: band1, // digit 1 (Yellow = 4)
      b2: band2, // digit 2 (Violet = 7)
      b3: band3, // multiplier index (Red = 2 -> 10^2 = 100)
      tol: tol   // tolerance % (Gold = 5)
    };
    this.activeStates[canvasId] = state;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      const d1 = state.b1;
      const d2 = state.b2;
      const multObj = colorTable[state.b3];
      const multVal = multObj ? multObj.mult : 1;
      const rawOhms = (d1 * 10 + d2) * multVal;

      let formattedR = '';
      if (rawOhms >= 1e6) formattedR = (rawOhms / 1e6).toFixed(2) + ' MΩ';
      else if (rawOhms >= 1e3) formattedR = (rawOhms / 1e3).toFixed(2) + ' kΩ';
      else formattedR = rawOhms.toFixed(1) + ' Ω';

      const minR = rawOhms * (1 - state.tol / 100);
      const maxR = rawOhms * (1 + state.tol / 100);

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('4-BAND RESISTOR COLOR CODE DECODER & SYNTHESIZER', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('Mnemonic: "B. B. ROY of Great Britain had a Very Good Wife" (0 to 9)', 25, 44);

      // Realistic Axial Resistor Graphic
      const rx = width / 2 - 140;
      const ry = 110;
      const rw = 280;
      const rh = 70;

      // Metal Leads (Left and Right)
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(rx - 80, ry + rh / 2 - 4, 80, 8);
      ctx.fillRect(rx + rw, ry + rh / 2 - 4, 80, 8);

      // Ceramic Resistor Body (Beige / Carbon Body with Bulbous Ends)
      ctx.fillStyle = '#e2d3b5';
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, 18);
      ctx.fill();
      ctx.strokeStyle = '#b8a688';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Top shading for 3D metallic curvature
      const grad = ctx.createLinearGradient(rx, ry, rx, ry + rh);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, 18);
      ctx.fill();

      // Color Bands on Resistor Body
      const bands = [
        { x: rx + 45, color: colorTable[state.b1]?.hex || '#111827', name: `1st: ${colorTable[state.b1]?.name} (${state.b1})` },
        { x: rx + 95, color: colorTable[state.b2]?.hex || '#111827', name: `2nd: ${colorTable[state.b2]?.name} (${state.b2})` },
        { x: rx + 145, color: colorTable[state.b3]?.hex || '#111827', name: `Mult: 10^${state.b3}` },
        { x: rx + 220, color: state.tol === 5 ? '#d97706' : '#94a3b8', name: `Tol: ±${state.tol}%` }
      ];

      bands.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, ry, 16, rh);
        // Highlight shine on band
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(b.x, ry, 16, 12);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, b.x + 8, ry + rh + 22);
      });
      ctx.textAlign = 'left';

      // Decoded Value Hero Box (Bottom)
      const footY = height - 60;
      ctx.fillStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 1.5;
      ctx.fillRect(width / 2 - 240, footY - 10, 480, 52);
      ctx.strokeRect(width / 2 - 240, footY - 10, 480, 52);

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${formattedR} ± ${state.tol}%`, width / 2, footY + 18);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`Guaranteed Tolerance Span: ${minR < 1000 ? minR.toFixed(1) + 'Ω' : (minR / 1000).toFixed(2) + 'kΩ'} to ${maxR < 1000 ? maxR.toFixed(1) + 'Ω' : (maxR / 1000).toFixed(2) + 'kΩ'}`, width / 2, footY + 34);
      ctx.textAlign = 'left';

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateResistorColorCode(canvasId, b1, b2, b3, tol) {
    if (this.activeStates[canvasId]) {
      if (b1 !== undefined) this.activeStates[canvasId].b1 = parseInt(b1, 10);
      if (b2 !== undefined) this.activeStates[canvasId].b2 = parseInt(b2, 10);
      if (b3 !== undefined) this.activeStates[canvasId].b3 = parseInt(b3, 10);
      if (tol !== undefined) this.activeStates[canvasId].tol = parseFloat(tol);
    }
  },

  /* =========================================================================
   * 9. RC TRANSIENT CHARGING & DISCHARGING OSCILLOSCOPE
   * ========================================================================= */
  initRCTransientSim(canvasId, initialVs = 10, initialR = 1000, initialC = 100) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      Vs: initialVs, // Volts
      R: initialR,   // Ohms
      C: initialC,   // microFarads
      time: 0,
      mode: 'charging' // 'charging' or 'discharging'
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const tau = (state.R * (state.C * 1e-6)); // seconds
      // Map canvas time
      state.time = (tick * 0.005) % (5 * tau + 0.1);
      const tNorm = state.time / tau; // in multiples of tau

      const vC = state.mode === 'charging'
        ? state.Vs * (1 - Math.exp(-tNorm))
        : state.Vs * Math.exp(-tNorm);
      const iC = state.mode === 'charging'
        ? (state.Vs / state.R) * Math.exp(-tNorm)
        : -(state.Vs / state.R) * Math.exp(-tNorm);

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('RC CIRCUIT TRANSIENT ANALYSIS & TIME CONSTANT (τ = R·C)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`τ = ${state.R}Ω × ${state.C}μF = ${(tau * 1000).toFixed(1)} ms  |  Vc(1τ) = 63.2% Vs  |  Steady-State at 5τ (99.3%)`, 25, 44);

      // Oscilloscope Screen Display
      const oX = 40, oY = 65, oW = width - 80, oH = 190;
      ctx.fillStyle = '#030a16';
      ctx.fillRect(oX, oY, oW, oH);
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(oX, oY, oW, oH);

      // Oscilloscope Grid Lines
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.12)';
      ctx.setLineDash([2, 4]);
      for (let gy = 1; gy <= 5; gy++) {
        const yPos = oY + (gy / 5) * oH;
        ctx.beginPath(); ctx.moveTo(oX, yPos); ctx.lineTo(oX + oW, yPos); ctx.stroke();
      }
      for (let gx = 1; gx <= 5; gx++) {
        const xPos = oX + (gx / 5) * oW;
        ctx.beginPath(); ctx.moveTo(xPos, oY); ctx.lineTo(xPos, oY + oH); ctx.stroke();
        ctx.fillStyle = 'rgba(0, 245, 255, 0.5)';
        ctx.font = '9px monospace';
        ctx.fillText(`${gx}τ`, xPos - 8, oY + oH - 6);
      }
      ctx.setLineDash([]);

      // Voltage Curve v_c(t)
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let px = 0; px <= oW; px += 2) {
        const tPoint = (px / oW) * 5; // 0 to 5 tau
        const vPoint = state.mode === 'charging'
          ? state.Vs * (1 - Math.exp(-tPoint))
          : state.Vs * Math.exp(-tPoint);
        const py = oY + oH - (vPoint / state.Vs) * (oH - 20) - 10;
        if (px === 0) ctx.moveTo(oX, py);
        else ctx.lineTo(oX + px, py);
      }
      ctx.stroke();

      // Current Curve i_c(t) (Dotted Green)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let px = 0; px <= oW; px += 2) {
        const tPoint = (px / oW) * 5;
        const iNorm = Math.exp(-tPoint);
        const py = oY + oH - iNorm * (oH - 20) - 10;
        if (px === 0) ctx.moveTo(oX, py);
        else ctx.lineTo(oX + px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Live Sweep Dot
      const sweepX = oX + (tNorm / 5) * oW;
      const sweepY = oY + oH - (vC / state.Vs) * (oH - 20) - 10;
      ctx.fillStyle = '#ff2e93';
      ctx.shadowColor = '#ff2e93';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(sweepX, sweepY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bottom Digital Readings
      const footY = height - 40;
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.fillRect(20, footY - 14, width - 40, 42);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.strokeRect(20, footY - 14, width - 40, 42);

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`Current V_C(t) = ${vC.toFixed(2)} V`, 35, footY + 12);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Current i_C(t) = ${(iC * 1000).toFixed(2)} mA`, 230, footY + 12);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Elapsed Time = ${(state.time * 1000).toFixed(1)} ms (${tNorm.toFixed(2)} τ)`, 440, footY + 12);

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateRCTransient(canvasId, vs, r, c, mode) {
    if (this.activeStates[canvasId]) {
      if (vs !== undefined) this.activeStates[canvasId].Vs = parseFloat(vs);
      if (r !== undefined) this.activeStates[canvasId].R = parseFloat(r);
      if (c !== undefined) this.activeStates[canvasId].C = parseFloat(c);
      if (mode !== undefined) this.activeStates[canvasId].mode = mode;
    }
  },

  /* =========================================================================
   * 10. RESISTANCE & GEOMETRY (R = ρ·l / A) WIRE MORPHING
   * ========================================================================= */
  initResistanceGeometrySim(canvasId, length = 10, area = 2, material = 'copper') {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const resistivities = {
      copper: { name: 'Copper', rho: 1.72e-8, color: '#f59e0b' },
      aluminum: { name: 'Aluminum', rho: 2.82e-8, color: '#cbd5e1' },
      nichrome: { name: 'Nichrome (Heater)', rho: 100e-8, color: '#ef4444' },
      silver: { name: 'Silver (Best Conductor)', rho: 1.59e-8, color: '#e0e7ff' }
    };

    const state = {
      l: length, // meters
      A: area,   // mm^2
      matKey: material
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      const mat = resistivities[state.matKey] || resistivities.copper;
      const AreaM2 = state.A * 1e-6;
      const R = (mat.rho * state.l) / AreaM2;
      const G = 1 / R;

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('ELECTRICAL RESISTANCE & GEOMETRY LAWS (R = ρ · l / A)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`R ∝ length (l)  |  R ∝ 1 / Area (A)  |  ${mat.name} ρ = ${(mat.rho * 1e8).toFixed(2)} × 10⁻⁸ Ω·m`, 25, 44);

      // Render 3D-styled Cylindrical Wire that physically expands/stretches
      const wireX = 80;
      const wireY = height / 2 - 10;
      // Wire pixel length proportional to l (e.g. 5 to 50 meters -> 120 to 360 px)
      const wirePxLength = 100 + (state.l / 50) * (width - 240);
      // Wire pixel radius proportional to Area (e.g. 0.5 to 10 mm^2 -> 10 to 45 px)
      const wireRadius = 8 + (state.A / 10) * 36;

      // Cylinder Body
      const cGrad = ctx.createLinearGradient(wireX, wireY - wireRadius, wireX, wireY + wireRadius);
      cGrad.addColorStop(0, mat.color);
      cGrad.addColorStop(0.3, '#ffffff');
      cGrad.addColorStop(0.7, mat.color);
      cGrad.addColorStop(1, '#000000');

      ctx.fillStyle = cGrad;
      ctx.beginPath();
      ctx.roundRect(wireX, wireY - wireRadius, wirePxLength, wireRadius * 2, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Right End Ellipse
      ctx.fillStyle = mat.color;
      ctx.beginPath();
      ctx.ellipse(wireX + wirePxLength, wireY, 12, wireRadius, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Dimension Markers
      // Length Arrow
      ctx.strokeStyle = '#00f5ff';
      ctx.lineWidth = 1.5;
      const dimY = wireY + wireRadius + 24;
      ctx.beginPath();
      ctx.moveTo(wireX, dimY);
      ctx.lineTo(wireX + wirePxLength, dimY);
      ctx.stroke();
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`Length l = ${state.l.toFixed(1)} m`, wireX + wirePxLength / 2, dimY + 16);

      // Area Indicator
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'left';
      ctx.fillText(`Area A = ${state.A.toFixed(2)} mm²`, wireX + wirePxLength + 20, wireY + 4);
      ctx.fillText(`(Radius r = ${(Math.sqrt(state.A / Math.PI)).toFixed(2)} mm)`, wireX + wirePxLength + 20, wireY + 20);

      // Bottom Calculations Box
      const footY = height - 42;
      ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.fillRect(20, footY - 14, width - 40, 42);
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.2)';
      ctx.strokeRect(20, footY - 14, width - 40, 42);

      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`Resistance R = ${R.toFixed(4)} Ω`, 35, footY + 12);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Conductance G = ${G.toFixed(2)} Siemens (S)`, 260, footY + 12);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Material: ${mat.name}`, 490, footY + 12);

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateResistanceGeometry(canvasId, l, A, mat) {
    if (this.activeStates[canvasId]) {
      if (l !== undefined) this.activeStates[canvasId].l = parseFloat(l);
      if (A !== undefined) this.activeStates[canvasId].A = parseFloat(A);
      if (mat !== undefined) this.activeStates[canvasId].matKey = mat;
    }
  },

  /* =========================================================================
   * 11. HOUSEHOLD WIRING & SAFETY MCB BREAKER SIMULATOR
   * ========================================================================= */
  initHouseholdWiringSim(canvasId, isFault = false, hasEarth = true) {
    this.stop(canvasId);
    const data = this.setupCanvas(canvasId);
    if (!data) return;
    const { ctx, width, height } = data;

    const state = {
      isFault: isFault,
      hasEarth: hasEarth,
      mcbTripped: false
    };
    this.activeStates[canvasId] = state;

    let tick = 0;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      // If fault occurred with earth wire, MCB trips!
      if (state.isFault && state.hasEarth) {
        state.mcbTripped = true;
      } else if (!state.isFault) {
        state.mcbTripped = false;
      }

      // Header
      ctx.fillStyle = '#00f5ff';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('HOUSEHOLD ELECTRICAL WIRING & APPLIANCE SAFETY (EARTHING & MCB)', 25, 26);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText('Phase Wire (Red/Brown 230V) | Neutral Wire (Black/Blue 0V) | Protective Earth (Green/Yellow 0V)', 25, 44);

      // Distribution Board (Left)
      const dbX = 40, dbY = 70, dbW = 110, dbH = 170;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(dbX, dbY, dbW, dbH);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(dbX, dbY, dbW, dbH);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('MAIN DB', dbX + 25, dbY + 24);

      // MCB Switch in DB
      const mcbY = dbY + 60;
      ctx.fillStyle = state.mcbTripped ? '#ef4444' : '#10b981';
      ctx.fillRect(dbX + 20, mcbY, 70, 32);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(state.mcbTripped ? 'MCB: TRIPPED' : 'MCB: ON', dbX + 24, mcbY + 20);

      // Appliance (Right)
      const appX = width - 180, appY = 70, appW = 140, appH = 170;
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(appX, appY, appW, appH);
      ctx.strokeStyle = (state.isFault && !state.hasEarth) ? '#ef4444' : '#64748b';
      ctx.lineWidth = (state.isFault && !state.hasEarth) ? 3 : 2;
      ctx.strokeRect(appX, appY, appW, appH);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('METAL APPLIANCE', appX + 15, appY + 25);
      ctx.fillText('(Electric Geyser)', appX + 15, appY + 40);

      // Heating Element inside appliance
      ctx.strokeStyle = (!state.mcbTripped) ? '#f59e0b' : '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(appX + 30, appY + 80);
      ctx.lineTo(appX + 110, appY + 80);
      ctx.lineTo(appX + 30, appY + 110);
      ctx.lineTo(appX + 110, appY + 110);
      ctx.stroke();

      // Wires: Phase (Red), Neutral (Black/Blue), Earth (Green)
      // 1. Phase Wire (Top)
      const pY = dbY + 70;
      ctx.strokeStyle = state.mcbTripped ? '#475569' : '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(dbX + dbW, pY);
      ctx.lineTo(appX, pY);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px monospace';
      ctx.fillText('Phase (230V AC)', dbX + dbW + 20, pY - 6);

      // 2. Neutral Wire (Middle)
      const nY = dbY + 115;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(dbX + dbW, nY);
      ctx.lineTo(appX, nY);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Neutral (0V Return)', dbX + dbW + 20, nY - 6);

      // 3. Earth Wire (Bottom)
      const eY = dbY + 155;
      if (state.hasEarth) {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(dbX + dbW, eY);
        ctx.lineTo(appX + appW / 2, eY);
        ctx.lineTo(appX + appW / 2, appY + appH);
        ctx.stroke();
        ctx.fillStyle = '#10b981';
        ctx.fillText('Protective Earth Wire (0V Low Impedance Path)', dbX + dbW + 20, eY - 6);
      }

      // Fault indicator
      if (state.isFault && !state.hasEarth) {
        // High voltage on chassis, human shock risk!
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('⚠️ DANGER: 230V LEAKAGE ON BODY!', appX - 80, appY + appH + 25);
      } else if (state.mcbTripped) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('✓ SAFE: FAULT CURRENT SHUNTED TO GROUND! MCB TRIPPED IN 15ms', dbX + 20, height - 35);
      }

      CircuitSimulators.activeLoops[canvasId] = requestAnimationFrame(loop);
    };
    loop();
  },

  updateHouseholdWiring(canvasId, isFault, hasEarth) {
    if (this.activeStates[canvasId]) {
      if (isFault !== undefined) this.activeStates[canvasId].isFault = Boolean(isFault);
      if (hasEarth !== undefined) this.activeStates[canvasId].hasEarth = Boolean(hasEarth);
    }
  },

  /* =========================================================================
   * 12. GENERAL TOPIC RENDER DISPATCHER
   * Renders the designated simulation for ANY topic across all 3 units!
   * ========================================================================= */
  renderForTopic(topicId, targetCanvasId = 'canvas-modal-viz') {
    this.stop(targetCanvasId);

    // Map topicId to dedicated simulation function
    const map = {
      // Unit 1 Topics
      'u1_t01': () => this.initOhmLawSim(targetCanvasId, 12, 10),
      'u1_t02': () => this.initResistanceGeometrySim(targetCanvasId, 10, 2, 'copper'),
      'u1_t03': () => this.initResistanceGeometrySim(targetCanvasId, 25, 4, 'aluminum'),
      'u1_t04': () => this.initOhmLawSim(targetCanvasId, 10, 5),
      'u1_t05': () => this.initTempCoefficientSim(targetCanvasId, 25, 100, 'semiconductor'),
      'u1_t06': () => this.initOhmLawSim(targetCanvasId, 12, 6),
      'u1_t07': () => this.initKVLLoopSim(targetCanvasId, 24, 6, 4, 8, 12),
      'u1_t08': () => this.initOhmLawSim(targetCanvasId, 24, 12),
      'u1_t09': () => this.initKVLLoopSim(targetCanvasId, 30, 10, 5, 10, 15),
      'u1_t10': () => this.initRCTransientSim(targetCanvasId, 12, 1000, 220),
      'u1_t11': () => this.initRCTransientSim(targetCanvasId, 10, 1000, 100),
      'u1_t12': () => this.initResistanceGeometrySim(targetCanvasId, 15, 2.5, 'copper'),
      'u1_t13': () => this.initTempCoefficientSim(targetCanvasId, 20, 100, 'copper'),
      'u1_t14': () => this.initResistorColorCodeSim(targetCanvasId, 4, 7, 2, 5),

      // Unit 2 Topics
      'u2_t01': () => this.initSeriesVDRSim(targetCanvasId, 24, 10, 20, 30),
      'u2_t02': () => this.initParallelCDRSim(targetCanvasId, 24, 12, 24, 48),
      'u2_t03': () => this.initHouseholdWiringSim(targetCanvasId, false, true),
      'u2_t04': () => this.initStarDeltaSim(targetCanvasId, 'star', 10, 20, 30),
      'u2_t05': () => this.initKCLJunctionSim(targetCanvasId, 5, 3, 4, 6),
      'u2_t06': () => this.initKCLJunctionSim(targetCanvasId, 4, 3, 5, 7),
      'u2_t07': () => this.initKVLLoopSim(targetCanvasId, 30, 10, 5, 10, 15),
      'u2_t08': () => this.initKVLLoopSim(targetCanvasId, 36, 12, 6, 12, 18),
      'u2_t09': () => this.initKVLLoopSim(targetCanvasId, 28, 8, 4, 8, 16),
      'u2_t10': () => this.initParallelCDRSim(targetCanvasId, 36, 18, 36, 72),
      'u2_t11': () => this.initParallelCDRSim(targetCanvasId, 48, 12, 24, 48),

      // Unit 3 Topics (Physics visualizers bridge)
      'u3_t01': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initChargeViz(targetCanvasId),
      'u3_t02': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initCoulombViz(targetCanvasId),
      'u3_t03': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initFieldViz(targetCanvasId),
      'u3_t04': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initFieldViz(targetCanvasId),
      'u3_t05': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initFluxViz(targetCanvasId),
      'u3_t06': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initCapacitorViz(targetCanvasId),
      'u3_t07': () => window.PhysicsVisualizers && window.PhysicsVisualizers.initNetworkViz(targetCanvasId),
    };

    const fn = map[topicId];
    if (fn) {
      setTimeout(() => fn(), 60);
    } else {
      // Default fallback
      setTimeout(() => this.initOhmLawSim(targetCanvasId), 60);
    }
  }
};

window.CircuitSimulators = CircuitSimulators;
