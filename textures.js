/**
 * textures.js - Procedural PBR Texture Generator for Electrostatic Devices
 * Creates high-detail procedural textures using HTML5 2D canvas for Three.js materials.
 */

const ProceduralTextures = {
  // Cache textures so we don't recreate them needlessly
  _cache: {},

  // Helper to create or get cached texture
  getTexture(key, generatorFn) {
    if (!this._cache[key]) {
      this._cache[key] = generatorFn();
    }
    return this._cache[key];
  },

  // Brushed Aluminum Metal Texture
  createBrushedMetal(baseHex = '#c8d1db', grainIntensity = 0.22, isAnodized = false) {
    return this.getTexture(`brushed_${baseHex}_${grainIntensity}`, () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Base tone
      ctx.fillStyle = baseHex;
      ctx.fillRect(0, 0, 512, 512);

      // Fine horizontal brushed grain
      const imgData = ctx.getImageData(0, 0, 512, 512);
      const data = imgData.data;

      // Seedable pseudo-random noise with long horizontal correlation
      const noise = new Float32Array(512);
      for (let y = 0; y < 512; y++) {
        noise[y] = (Math.random() - 0.5) * grainIntensity * 255;
      }

      for (let y = 0; y < 512; y++) {
        const rowNoise = noise[y];
        for (let x = 0; x < 512; x++) {
          const idx = (y * 512 + x) * 4;
          const localVar = rowNoise + (Math.random() - 0.5) * 12;
          data[idx] = Math.min(255, Math.max(0, data[idx] + localVar));
          data[idx + 1] = Math.min(255, Math.max(0, data[idx + 1] + localVar));
          data[idx + 2] = Math.min(255, Math.max(0, data[idx + 2] + localVar));
        }
      }
      ctx.putImageData(imgData, 0, 0);

      // Soft directional sheen gradient
      const grad = ctx.createLinearGradient(0, 0, 512, 512);
      grad.addColorStop(0.0, 'rgba(255,255,255,0.12)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.0)');
      grad.addColorStop(0.7, 'rgba(0,0,0,0.1)');
      grad.addColorStop(1.0, 'rgba(255,255,255,0.08)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 512);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  },

  // Brushed Metal Bump / Normal Map
  createBrushedBump() {
    return this.getTexture('brushed_bump', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 256, 256);

      const imgData = ctx.getImageData(0, 0, 256, 256);
      const data = imgData.data;
      for (let y = 0; y < 256; y++) {
        const line = (Math.random() - 0.5) * 60;
        for (let x = 0; x < 256; x++) {
          const idx = (y * 256 + x) * 4;
          const val = Math.min(255, Math.max(0, 128 + line + (Math.random() - 0.5) * 8));
          data[idx] = val;
          data[idx + 1] = val;
          data[idx + 2] = val;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  },

  // Polished Brass / Copper Metal Texture
  createBrassTexture() {
    return this.getTexture('brass_tex', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createLinearGradient(0, 0, 256, 256);
      grad.addColorStop(0.0, '#e5b35c');
      grad.addColorStop(0.3, '#ffd685');
      grad.addColorStop(0.7, '#b27f2c');
      grad.addColorStop(1.0, '#d9a244');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      // Fine micro grain
      const imgData = ctx.getImageData(0, 0, 256, 256);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const noise = (Math.random() - 0.5) * 15;
        d[i] = Math.min(255, Math.max(0, d[i] + noise));
        d[i+1] = Math.min(255, Math.max(0, d[i+1] + noise));
        d[i+2] = Math.min(255, Math.max(0, d[i+2] + noise));
      }
      ctx.putImageData(imgData, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  },

  // Dielectric Crystal / Ceramic Molecular Lattice Texture
  createDielectricTexture(colorHex = '#275270', type = 'ceramic') {
    return this.getTexture(`dielectric_${colorHex}_${type}`, () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = colorHex;
      ctx.fillRect(0, 0, 512, 512);

      // Molecular lattice grid lines
      ctx.strokeStyle = 'rgba(114, 230, 255, 0.15)';
      ctx.lineWidth = 1.5;
      const step = 32;
      for (let x = 0; x < 512; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      }
      for (let y = 0; y < 512; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }

      // Molecular dipole node dots (+ and - charges inside dielectric)
      for (let x = step / 2; x < 512; x += step) {
        for (let y = step / 2; y < 512; y += step) {
          // Positive dipole center
          ctx.fillStyle = 'rgba(255, 120, 146, 0.35)';
          ctx.beginPath();
          ctx.arc(x - 4, y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Negative dipole center
          ctx.fillStyle = 'rgba(114, 230, 255, 0.35)';
          ctx.beginPath();
          ctx.arc(x + 4, y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Dipole link
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x - 4, y);
          ctx.lineTo(x + 4, y);
          ctx.stroke();
        }
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  },

  // Metric Millimeter Scale for Micrometer Rod / Instrument Base
  createMetricScaleTexture() {
    return this.getTexture('metric_scale', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#1e2430';
      ctx.fillRect(0, 0, 1024, 128);

      // Silver bevel lines
      ctx.strokeStyle = '#3e4a5d';
      ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, 1016, 120);

      // Millimeter markings
      ctx.fillStyle = '#72e6ff';
      ctx.strokeStyle = '#a4b8d4';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';

      const totalMarks = 100;
      const dx = 1000 / totalMarks;
      for (let i = 0; i <= totalMarks; i++) {
        const x = 12 + i * dx;
        ctx.beginPath();
        ctx.moveTo(x, 120);
        if (i % 10 === 0) {
          ctx.lineWidth = 2.5;
          ctx.lineTo(x, 70);
          ctx.stroke();
          ctx.fillText((i * 0.5).toFixed(0), x, 55);
        } else if (i % 5 === 0) {
          ctx.lineWidth = 1.8;
          ctx.lineTo(x, 85);
          ctx.stroke();
        } else {
          ctx.lineWidth = 1.0;
          ctx.lineTo(x, 98);
          ctx.stroke();
        }
      }

      // Label
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = '#8e9eaf';
      ctx.fillText('GAP DISTANCE (mm)', 512, 28);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    });
  },

  // High Voltage Caution & Specification Decal
  createCautionDecal() {
    return this.getTexture('caution_decal', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#0f141c';
      ctx.fillRect(0, 0, 512, 256);

      // Warning border with diagonal hazard stripes
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#eab308';
      ctx.strokeRect(8, 8, 496, 240);

      // Caution header
      ctx.fillStyle = '#eab308';
      ctx.fillRect(16, 16, 480, 48);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ HIGH VOLTAGE ELECTROSTATICS', 256, 50);

      // Specs
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('MODEL: EP-3000 DIELECTRIC LAB', 32, 105);
      ctx.fillStyle = '#72e6ff';
      ctx.font = '17px monospace';
      ctx.fillText('MAX RATED VOLTAGE: 5000 V DC', 32, 138);
      ctx.fillText('PLATE APERTURE: 150 mm × 150 mm', 32, 168);
      ctx.fillText('DIELECTRIC TEST: MICA / AIR / CERAMIC', 32, 198);
      ctx.fillStyle = '#ff7892';
      ctx.fillText('⚡ CAUTION: DISCHARGE BEFORE TOUCHING', 32, 228);

      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    });
  },

  // Electrolyte Paper & Aluminum Foil Texture for Rolled Capacitor
  createElectrolyteRollTexture() {
    return this.getTexture('electrolyte_roll', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Four distinct layer bands along the spiral:
      // 1: Anode foil (etched metallic grey)
      // 2: Oxide dielectric (thin dark blue barrier)
      // 3: Kraft paper soaked in electrolyte (yellowish porous)
      // 4: Cathode foil (bright aluminum)
      const bandH = 128;

      // Band 1: Anode
      ctx.fillStyle = '#8f9ba8';
      ctx.fillRect(0, 0, 512, bandH);
      ctx.fillStyle = '#222';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('ANODE ALUMINUM FOIL (+)', 20, 70);

      // Band 2: Dielectric Oxide
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(0, bandH, 512, bandH);
      ctx.fillStyle = '#93c5fd';
      ctx.fillText('ALUMINUM OXIDE BARRIER (Al2O3 DIELECTRIC)', 20, bandH + 70);

      // Band 3: Electrolyte Paper
      ctx.fillStyle = '#d97706';
      ctx.fillRect(0, bandH * 2, 512, bandH);
      ctx.fillStyle = '#fffbeb';
      ctx.fillText('POROUS PAPER + LIQUID ELECTROLYTE', 20, bandH * 2 + 70);

      // Band 4: Cathode Foil
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, bandH * 3, 512, bandH);
      ctx.fillStyle = '#0f172a';
      ctx.fillText('CATHODE ALUMINUM FOIL (-)', 20, bandH * 3 + 70);

      // Micro fibrous texture across everything
      const imgData = ctx.getImageData(0, 0, 512, 512);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = (Math.random() - 0.5) * 18;
        d[i] = Math.min(255, Math.max(0, d[i] + n));
        d[i+1] = Math.min(255, Math.max(0, d[i+1] + n));
        d[i+2] = Math.min(255, Math.max(0, d[i+2] + n));
      }
      ctx.putImageData(imgData, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    });
  }
};
