/**
 * math_renderer.js - Universal Offline Mathematical Formula Renderer
 * Uses 100% resilient HTML entities to prevent any Windows/browser encoding or mojibake issues.
 * Renders fractions (.math-frac), superscripts, subscripts, matrices, and Greek entities.
 * Zero external CDN or network dependencies.
 */

const MathRenderer = {
  /**
   * Convert a LaTeX string or math markup into clean HTML visual math
   */
  render(latex) {
    if (!latex) return '';
    let s = String(latex).trim();

    // Reliably strip outer wrapper <div ...> and <span ...>
    while (/^<div[^>]*>[\s\S]*<\/div>$/i.test(s)) {
      s = s.replace(/^<div[^>]*>/i, '').replace(/<\/div>$/i, '').trim();
    }
    while (/^<span[^>]*>[\s\S]*<\/span>$/i.test(s)) {
      s = s.replace(/^<span[^>]*>/i, '').replace(/<\/span>$/i, '').trim();
    }

    // 1. Matrix handling: \begin{bmatrix} a & b \\ c & d \end{bmatrix}
    s = s.replace(/\\begin\{bmatrix\}([\s\S]*?)\\end\{bmatrix\}/gi, (match, body) => {
      const rows = body.trim().split(/\\\\|\n/).filter(r => r.trim());
      const rowsHtml = rows.map(r => {
        const cells = r.split('&').map(c => `<td style="padding:2px 8px; text-align:center; font-style:italic;">${this.renderTokens(c.trim())}</td>`).join('');
        return `<tr>${cells}</tr>`;
      }).join('');
      return `<span style="display:inline-flex; align-items:center; vertical-align:middle; margin:0 4px; border-left:2px solid currentColor; border-right:2px solid currentColor; padding:0 2px;"><table style="border-collapse:collapse; font-size:0.9em;">${rowsHtml}</table></span>`;
    });

    return `<div class="math-eq">${this.renderTokens(s)}</div>`;
  },

  /**
   * Recursive token renderer for math components using standard HTML entities
   */
  renderTokens(str) {
    if (!str) return '';
    let s = String(str);

    // Fix common text artifacts
    s = s.replace(/Euler\?Ts/gi, "Euler's");

    // Remove \left and \right prefixes
    s = s.replace(/\\left\s*([(\[{|])/g, '$1')
         .replace(/\\right\s*([)\]}|])/g, '$1');

    // Replace \text{...}
    s = s.replace(/\\text\{([^}]*)\}/g, '<span style="font-style:normal; font-family:sans-serif; font-size:0.92em;">$1</span>');

    // Nested Fractions: repeat until all \frac{A}{B} are converted
    let fracRegex = /\\frac\{([^{}]+)\}\{([^{}]+)\}/;
    while (fracRegex.test(s)) {
      s = s.replace(fracRegex, (match, num, den) => {
        return `<span class="math-frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
      });
    }

    // Square roots: \sqrt{...}
    s = s.replace(/\\sqrt\{([^}]+)\}/g, '<span style="white-space:nowrap;">&radic;<span style="border-top:1.5px solid currentColor; padding-top:1px; margin-left:1px;">$1</span></span>');

    // Standard Math Operators & Symbols (HTML Entities) - ORDER IS CAREFULLY PRESERVED
    s = s.replace(/\\Longleftrightarrow/g, ' &hArr; ')
         .replace(/\\Leftrightarrow/g, ' &hArr; ')
         .replace(/\\Longrightarrow/g, ' &rArr; ')
         .replace(/\\implies/g, ' &rArr; ')
         .replace(/\\rightarrow/g, ' &rarr; ')
         .replace(/\\to(?![a-zA-Z])/g, ' &rarr; ')
         .replace(/\\leftarrow/g, ' &larr; ')
         .replace(/\\times/g, ' &times; ')
         .replace(/\\cdot/g, ' &middot; ')
         .replace(/\\pm/g, ' &plusmn; ')
         .replace(/\\approx/g, ' &asymp; ')
         .replace(/\\le(?![a-zA-Z])/g, ' &le; ')
         .replace(/\\ge(?![a-zA-Z])/g, ' &ge; ')
         .replace(/\\parallel/g, ' || ')
         .replace(/\\oint_S/g, '&#8750;<sub>S</sub>')
         .replace(/\\oint/g, '&#8750;')
         .replace(/\\int(?![a-zA-Z])/g, '&#8747;')
         .replace(/\\in(?![a-zA-Z])/g, ' &isin; ')
         .replace(/\\sum_\{([^}]*)\}\^\{([^}]*)\}/g, '&sum;<sub>$1</sub><sup>$2</sup>')
         .replace(/\\sum_\{([^}]*)\}/g, '&sum;<sub>$1</sub>')
         .replace(/\\sum/g, '&sum;')
         .replace(/\\mathbb\{Z\}/g, '&#8484;')
         .replace(/\\mathbb\{R\}/g, '&#8477;')
         .replace(/\\qquad/g, '&emsp;&emsp;')
         .replace(/\\quad/g, '&emsp;')
         .replace(/\\,/g, '&thinsp;')
         .replace(/\\dots/g, '...')
         .replace(/\\vec\{([^}]+)\}/g, '<b>$1</b>');

    // Greek Alphabet (Standard HTML Entities)
    s = s.replace(/\\varepsilon_0/g, '&epsilon;<sub>0</sub>')
         .replace(/\\varepsilon_r/g, '&epsilon;<sub>r</sub>')
         .replace(/\\varepsilon/g, '&epsilon;')
         .replace(/\\epsilon/g, '&epsilon;')
         .replace(/\\alpha_0/g, '&alpha;<sub>0</sub>')
         .replace(/\\alpha_t/g, '&alpha;<sub>t</sub>')
         .replace(/\\alpha/g, '&alpha;')
         .replace(/\\beta/g, '&beta;')
         .replace(/\\gamma/g, '&gamma;')
         .replace(/\\Delta/g, '&Delta;')
         .replace(/\\delta/g, '&delta;')
         .replace(/\\theta/g, '&theta;')
         .replace(/\\lambda/g, '&lambda;')
         .replace(/\\mu/g, '&mu;')
         .replace(/\\pi/g, '&pi;')
         .replace(/\\rho/g, '&rho;')
         .replace(/\\sigma/g, '&sigma;')
         .replace(/\\tau/g, '&tau;')
         .replace(/\\Phi/g, '&Phi;')
         .replace(/\\phi/g, '&phi;')
         .replace(/\\Psi/g, '&Psi;')
         .replace(/\\psi/g, '&psi;')
         .replace(/\\Omega/g, '&Omega;')
         .replace(/\\omega/g, '&omega;')
         .replace(/\\eta/g, '&eta;');

    // Superscripts: ^{...} or ^(\d+)
    s = s.replace(/\^\{([^}]+)\}/g, '<sup>$1</sup>');
    s = s.replace(/\^([0-9a-zA-Z+-]+)/g, '<sup>$1</sup>');

    // Subscripts: _{...} or _(\d+)
    s = s.replace(/_\{([^}]+)\}/g, '<sub>$1</sub>');
    s = s.replace(/_([0-9a-zA-Z]+)/g, '<sub>$1</sub>');

    // Clean remaining backslashes
    s = s.replace(/\\%/g, '%')
         .replace(/\\([a-zA-Z]+)/g, '$1');

    return s;
  },

  /**
   * Formats regular body text that might contain inline LaTeX expressions like $E_g$ or $(I = \frac{dQ}{dt})$
   */
  formatText(text) {
    if (!text) return '';
    let s = String(text);

    // Replace $ ... $ inline math
    s = s.replace(/\$([^\$]+)\$/g, (match, mathContent) => {
      return `<span class="inline-math" style="font-family:'Cambria Math','Times New Roman',serif; font-style:italic;">${this.renderTokens(mathContent)}</span>`;
    });

    return s;
  },

  /**
   * Enrich and normalize course data at startup so all formulas and topics are pre-rendered
   */
  enrichCourseData(beeeData) {
    if (!beeeData || beeeData.__enriched) return;
    beeeData.__enriched = true;

    // 1. Process Master Formula Vault
    if (Array.isArray(beeeData.masterFormulas)) {
      beeeData.masterFormulas.forEach(f => {
        f.formula = f.formula || f.math || '';
        f.math = f.math || f.formula || '';

        // Standardize unitId for unit filtering ('u1', 'u2', 'u3')
        if (!f.unitId) {
          f.unitId = (f.unit && f.unit.startsWith('u')) ? f.unit : 'u1';
        }

        // Standardize human-readable SI unit string
        if (!f.unitStr) {
          f.unitStr = (f.unit && !f.unit.startsWith('u')) ? f.unit : 'Derived SI';
        }
        f.unit = f.unitStr;

        // Render mathHtml cleanly
        f.mathHtml = this.render(f.mathHtml || f.formula);
      });
    }

    // 2. Process Topics
    if (Array.isArray(beeeData.topics)) {
      beeeData.topics.forEach(t => {
        if (t.concept) {
          t.conceptFormatted = this.formatText(t.concept);
        }
        if (t.mathHtml || t.math) {
          t.mathHtml = this.render(t.mathHtml || t.math);
        }
        if (Array.isArray(t.lines)) {
          t.linesFormatted = t.lines.map(l => this.formatText(l));
        }
        if (Array.isArray(t.derivationSteps)) {
          t.derivationSteps.forEach(s => {
            if (s.math) s.mathHtml = this.render(s.math);
            if (s.text) s.textFormatted = this.formatText(s.text);
          });
        }
        if (t.example) {
          if (t.example.problem) t.example.problemFormatted = this.formatText(t.example.problem);
          if (t.example.solution) t.example.solutionFormatted = this.formatText(t.example.solution);
        }
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.MathRenderer = MathRenderer;
  if (window.BEEE_DATA) {
    MathRenderer.enrichCourseData(window.BEEE_DATA);
  }
}
