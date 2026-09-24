/**
 * audio.js - Web Audio Laboratory Sound Synthesizer
 * Generates procedural electrical sound effects (capacitive hum, relay switch, high-voltage spark)
 * with zero external asset dependencies.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.humGain = null;
    this.humOsc = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    // Constant subtle capacitor AC hum
    this.humOsc = this.ctx.createOscillator();
    this.humOsc.type = 'sawtooth';
    this.humOsc.frequency.setValueAtTime(60, this.ctx.currentTime); // 60Hz hum

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, this.ctx.currentTime);

    this.humGain = this.ctx.createGain();
    this.humGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    this.humOsc.connect(filter);
    filter.connect(this.humGain);
    this.humGain.connect(this.ctx.destination);
    this.humOsc.start();
  }

  updateHum(voltage, isPowered) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isMuted || !isPowered || voltage <= 10) {
      this.humGain.gain.setTargetAtTime(0.0, this.ctx.currentTime, 0.05);
      return;
    }
    // Volume & harmonic frequency scale with voltage
    const normV = Math.min(1.0, voltage / 5000);
    const targetGain = normV * 0.04;
    const targetFreq = 60 + normV * 60; // 60Hz to 120Hz
    this.humGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.08);
    this.humOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
  }

  playSwitch() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playSpark() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;

    // White noise burst for spark crackle
    const bufferSize = this.ctx.sampleRate * 0.12; // 120ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(2.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  playHover() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.03);
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  playChime() {
    this.init();
    if (this.isMuted || !this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      gain.gain.setValueAtTime(0.035, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.25);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.humGain) {
      this.humGain.gain.setValueAtTime(0.0, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

window.AudioEngine = new SoundSynthesizer();
