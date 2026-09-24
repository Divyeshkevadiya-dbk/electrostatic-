/**
 * speech_narrator.js - Human-Like Voice Audio Narrator for BEEE
 * Features Male/Female voice switching, adjustable playback speed, pitch,
 * and comprehensive electrical/physics phoneme expansion for natural audio delivery.
 */

class BEEENarrator {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.gender = localStorage.getItem('beee_voice_gender') || 'female'; // 'female' or 'male'
    this.rate = parseFloat(localStorage.getItem('beee_voice_rate')) || 1.0;
    this.pitch = 1.0;
    this.onStateChange = null;

    if (this.synth) {
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.getBestVoice();
      }
    }
  }

  setGender(gender) {
    this.gender = gender;
    localStorage.setItem('beee_voice_gender', gender);
  }

  setRate(rate) {
    this.rate = parseFloat(rate);
    localStorage.setItem('beee_voice_rate', this.rate);
  }

  getBestVoice() {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    const pool = enVoices.length > 0 ? enVoices : voices;

    if (this.gender === 'female') {
      const female = pool.find(v =>
        v.name.includes('Zira') ||
        v.name.includes('Samantha') ||
        v.name.includes('Victoria') ||
        v.name.includes('Google US English') ||
        v.name.includes('Jenny') ||
        v.name.includes('Female')
      );
      if (female) return female;
    } else {
      const male = pool.find(v =>
        v.name.includes('David') ||
        v.name.includes('Daniel') ||
        v.name.includes('George') ||
        v.name.includes('Google UK English Male') ||
        v.name.includes('Guy') ||
        v.name.includes('Male')
      );
      if (male) return male;
    }

    return pool[0];
  }

  cleanText(text) {
    if (!text) return '';
    return text
      // HTML strip
      .replace(/<[^>]*>/g, ' ')
      // Engineering Acronyms
      .replace(/\bBEEE\b/g, 'B E E E')
      .replace(/\bKCL\b/g, "Kirchhoff's Current Law")
      .replace(/\bKVL\b/g, "Kirchhoff's Voltage Law")
      .replace(/\bVDR\b/g, 'Voltage Divider Rule')
      .replace(/\bCDR\b/g, 'Current Divider Rule')
      .replace(/\bMCB\b/g, 'Miniature Circuit Breaker')
      .replace(/\bEMF\b/g, 'Electromotive Force')
      .replace(/\bPD\b/g, 'Potential Difference')
      .replace(/\bAC\b/g, 'Alternating Current')
      .replace(/\bDC\b/g, 'Direct Current')
      .replace(/\bVCVS\b/g, 'Voltage-Controlled Voltage Source')
      .replace(/\bVCCS\b/g, 'Voltage-Controlled Current Source')
      .replace(/\bCCVS\b/g, 'Current-Controlled Voltage Source')
      .replace(/\bCCCS\b/g, 'Current-Controlled Current Source')
      // Greek Symbols & Mathematical notations
      .replace(/\\cdot/g, ' times ')
      .replace(/\\times/g, ' times ')
      .replace(/\\varepsilon_0/g, ' epsilon naught ')
      .replace(/\\varepsilon_r/g, ' relative permittivity epsilon r ')
      .replace(/\\varepsilon/g, ' permittivity ')
      .replace(/\\alpha_0/g, ' alpha naught ')
      .replace(/\\alpha_t/g, ' alpha t ')
      .replace(/\\rho/g, ' rho ')
      .replace(/\\tau/g, ' time constant tau ')
      .replace(/\\Phi/g, ' magnetic flux phi ')
      .replace(/\\pi/g, ' pi ')
      .replace(/\\sum/g, ' algebraic sum of ')
      .replace(/\\Delta/g, ' Delta ')
      .replace(/\\Omega/g, ' Ohms ')
      .replace(/kΩ/g, ' kilo Ohms ')
      .replace(/MΩ/g, ' mega Ohms ')
      .replace(/Ω/g, ' Ohms ')
      .replace(/μF/g, ' micro Farads ')
      .replace(/pF/g, ' pico Farads ')
      .replace(/nF/g, ' nano Farads ')
      .replace(/μC/g, ' micro Coulombs ')
      .replace(/mH/g, ' milli Henrys ')
      .replace(/μ/g, ' micro ')
      .replace(/²/g, ' squared ')
      .replace(/³/g, ' cubed ')
      .replace(/°C/g, ' degrees Celsius ')
      .replace(/±/g, ' plus or minus ')
      .replace(/½/g, ' one half ')
      .replace(/¼/g, ' one fourth ')
      .replace(/\\frac{([^}]+)}{([^}]+)}/g, ' $1 divided by $2 ')
      .replace(/[\^\\_{}\[\]]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  speak(text, onEndCallback) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this environment.');
      return;
    }

    this.stop();

    const spokenText = this.cleanText(text);
    if (!spokenText) return;

    this.currentUtterance = new SpeechSynthesisUtterance(spokenText);
    this.currentUtterance.rate = this.rate;
    this.currentUtterance.pitch = this.gender === 'female' ? 1.05 : 0.95;

    const voice = this.getBestVoice();
    if (voice) this.currentUtterance.voice = voice;

    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onStateChange) this.onStateChange(true);
    };

    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEndCallback) onEndCallback();
    };

    this.currentUtterance.onerror = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    };

    this.synth.speak(this.currentUtterance);
  }

  stop() {
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  toggle(text, onEndCallback) {
    if (this.isSpeaking) {
      this.stop();
    } else {
      this.speak(text, onEndCallback);
    }
  }
}

window.Narrator = new BEEENarrator();
