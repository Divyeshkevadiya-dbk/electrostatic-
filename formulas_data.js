/**
 * formulas_data.js - Complete Electrostatics Formula Database, Revision Notes & Interactive Calculators
 * All formulas formatted with proper visual math (fractions, subscripts, superscripts, Greek letters)
 * and line-by-line notes with clear vertical spacing.
 */

const ElectrostaticsData = {
  // 1. Master Formulas Catalog (All 15 Foundational Laws)
  formulas: [
    {
      id: 'charge_quant',
      topicId: '01',
      title: 'Quantization of Electric Charge',
      mathHtml: `<div class="math-eq">
        <span>Q = n · e = I · t</span>
      </div>`,
      unit: 'Coulomb (C) = Ampere · second (A·s)',
      lines: [
        '<b>Core Principle:</b> Electric charge is not continuous; it exists in discrete, indivisible packets called quanta.',
        '<b>Electron Charge (e):</b> The elementary charge magnitude is exactly 1.602176634 × 10⁻¹⁹ Coulombs.',
        '<b>Quantization Rule:</b> Any observable charge Q must equal ± n · e, where n is a positive integer (n = 1, 2, 3...).',
        '<b>1 Coulomb Equivalency:</b> 1 Coulomb equals the combined charge of 6.25 × 10¹⁸ electrons (1 / e).',
        '<b>Current Relationship:</b> Current I is the rate of charge flow: I = Q / t, meaning Q = I · t.'
      ],
      variables: [
        { sym: 'Q', name: 'Total Electric Charge', unit: 'Coulombs (C)' },
        { sym: 'n', name: 'Number of transferred electrons', unit: 'Integer (1, 2, 3...)' },
        { sym: 'e', name: 'Elementary charge (1.602 × 10⁻¹⁹ C)', unit: 'Coulombs (C)' },
        { sym: 'I', name: 'Electric current', unit: 'Amperes (A)' },
        { sym: 't', name: 'Time duration of flow', unit: 'Seconds (s)' }
      ]
    },
    {
      id: 'coulomb_law',
      topicId: '02',
      title: "Coulomb's Law of Electrostatic Force",
      mathHtml: `<div class="math-eq">
        <span>F = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">4π ε₀ εᵣ</span></div>
        <span> · </span>
        <div class="math-frac"><span class="num">q₁ · q₂</span><span class="den">r²</span></div>
        <span> = k · </span>
        <div class="math-frac"><span class="num">q₁ · q₂</span><span class="den">r²</span></div>
      </div>`,
      unit: 'Newton (N)',
      lines: [
        "<b>1st Law (Direction):</b> Like charges repel each other; unlike charges attract each other.",
        "<b>2nd Law (Magnitude):</b> Force varies directly with charge product (q₁ · q₂) and inversely with distance squared (1 / r²).",
        "<b>Coulomb Constant (k):</b> In vacuum/air, k = 1 / (4πε₀) ≈ 8.98755 × 10⁹ N·m²/C² (or 9 × 10⁹ N·m²/C²).",
        "<b>Dielectric Shielding:</b> Inside an insulating medium, force is reduced by relative permittivity: F_medium = F_vacuum / εᵣ.",
        "<b>Newton's 3rd Law:</b> The force exerted by q₁ on q₂ is equal in magnitude and opposite in direction to the force by q₂ on q₁."
      ],
      variables: [
        { sym: 'F', name: 'Electrostatic force (attractive or repulsive)', unit: 'Newtons (N)' },
        { sym: 'q₁, q₂', name: 'Point charge magnitudes', unit: 'Coulombs (C)' },
        { sym: 'r', name: 'Separation distance between charge centers', unit: 'Meters (m)' },
        { sym: 'ε₀', name: 'Permittivity of vacuum (8.854 × 10⁻¹² F/m)', unit: 'F/m' },
        { sym: 'εᵣ', name: 'Relative permittivity (Dielectric constant)', unit: 'Dimensionless' }
      ]
    },
    {
      id: 'permittivity',
      topicId: '02',
      title: 'Absolute & Relative Permittivity',
      mathHtml: `<div class="math-eq">
        <span>ε = ε₀ · εᵣ = </span>
        <div class="math-frac"><span class="num">D</span><span class="den">E</span></div>
        <span> &nbsp;|&nbsp; εᵣ = </span>
        <div class="math-frac"><span class="num">ε</span><span class="den">ε₀</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">C</span><span class="den">C₀</span></div>
      </div>`,
      unit: 'Farad per meter (F/m)',
      lines: [
        '<b>Definition:</b> Permittivity measures the resistance of a medium to the formation of electric fields, determining how much flux is set up.',
        '<b>Vacuum Permittivity (ε₀):</b> The baseline physical constant in free space: ε₀ = 8.8541878 × 10⁻¹² F/m.',
        '<b>Relative Permittivity (εᵣ):</b> Ratio of medium permittivity to vacuum: εᵣ = ε / ε₀ (also known as Dielectric Constant).',
        '<b>Standard εᵣ Values:</b> Vacuum = 1.000, Dry Air ≈ 1.0006, Kraft Paper = 3.8, Mica = 6.0, Borosilicate Glass = 7.0, Ceramic = 85 to 1200.',
        '<b>Capacitance Multiplier:</b> Filling a capacitor with a dielectric multiplies its capacitance: C = εᵣ · C₀.'
      ],
      variables: [
        { sym: 'ε', name: 'Absolute permittivity of the medium', unit: 'Farads/meter (F/m)' },
        { sym: 'ε₀', name: 'Permittivity of vacuum (8.854 × 10⁻¹²)', unit: 'F/m' },
        { sym: 'εᵣ', name: 'Relative permittivity / Dielectric constant', unit: 'Dimensionless ratio' },
        { sym: 'D', name: 'Electric flux density', unit: 'C/m²' },
        { sym: 'E', name: 'Electric field strength', unit: 'V/m' }
      ]
    },
    {
      id: 'field_intensity',
      topicId: '03',
      title: 'Electric Field Intensity (Strength)',
      mathHtml: `<div class="math-eq">
        <span>E = </span>
        <div class="math-frac"><span class="num">F</span><span class="den">Q</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">Q</span><span class="den">4π ε₀ εᵣ r²</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">V</span><span class="den">d</span></div>
      </div>`,
      unit: 'Volt per meter (V/m) = Newton per Coulomb (N/C)',
      lines: [
        '<b>Physical Definition:</b> The electrostatic force experienced per unit positive test charge placed at a point in space.',
        '<b>Uniform Field:</b> Between two parallel conductor plates of gap d and potential V, field E is constant everywhere: E = V / d.',
        '<b>Point Charge Field:</b> Originates radially outward from positive charges and radially inward toward negative charges.',
        '<b>Properties of Lines of Force:</b>\n• Always perpendicular to charged conducting surfaces.\n• Never intersect or form closed loops.\n• Crowded lines denote strong fields; widely spaced lines denote weak fields.',
        '<b>Inside Conductors:</b> In static equilibrium, the electric field inside a hollow or solid conductor is strictly ZERO.'
      ],
      variables: [
        { sym: 'E', name: 'Electric field intensity vector', unit: 'V/m or N/C' },
        { sym: 'F', name: 'Mechanical force on charge', unit: 'Newtons (N)' },
        { sym: 'Q', name: 'Charge magnitude', unit: 'Coulombs (C)' },
        { sym: 'V', name: 'Potential difference', unit: 'Volts (V)' },
        { sym: 'd', name: 'Plate separation distance', unit: 'Meters (m)' }
      ]
    },
    {
      id: 'work_potential',
      topicId: '03',
      title: 'Electric Potential & Potential Gradient',
      mathHtml: `<div class="math-eq">
        <span>V = </span>
        <div class="math-frac"><span class="num">W</span><span class="den">Q</span></div>
        <span> &nbsp;|&nbsp; E = -</span>
        <div class="math-frac"><span class="num">dV</span><span class="den">dr</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">V</span><span class="den">d</span></div>
      </div>`,
      unit: 'Volt (V) = Joule / Coulomb (J/C)',
      lines: [
        '<b>Potential Definition:</b> Work done W by an external agent to bring a unit positive test charge from infinity to a point in the electric field.',
        '<b>Potential Gradient:</b> Rate of change of potential with respect to distance (-dV/dr). The negative sign shows that E points in the direction of decreasing potential.',
        '<b>Work Done Formula:</b> Work required to move charge Q through potential difference V is W = Q · V.'
      ],
      variables: [
        { sym: 'V', name: 'Electric potential', unit: 'Volts (V)' },
        { sym: 'W', name: 'Work done', unit: 'Joules (J)' },
        { sym: 'Q', name: 'Charge moved', unit: 'Coulombs (C)' }
      ]
    },
    {
      id: 'flux_density',
      topicId: '04',
      title: 'Electric Flux & Flux Density',
      mathHtml: `<div class="math-eq">
        <span>Ψ = Q (Coulombs) &nbsp;|&nbsp; D = </span>
        <div class="math-frac"><span class="num">Ψ</span><span class="den">A</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">Q</span><span class="den">A</span></div>
        <span> = ε₀ εᵣ E</span>
      </div>`,
      unit: 'Coulomb per meter squared (C/m²)',
      lines: [
        "<b>Faraday's Flux Concept:</b> One Coulomb of electric charge produces exactly one Coulomb of electric flux (Ψ = Q).",
        "<b>Flux Density (D):</b> Total flux passing perpendicularly through a unit cross-sectional area: D = Q / A.",
        "<b>Medium Independence:</b> Flux density D depends ONLY on charge Q and area A, completely independent of the medium.",
        "<b>Constitutive Relation:</b> Connects flux density D and field strength E via permittivity: D = ε · E = ε₀ · εᵣ · E.",
        "<b>Gauss's Theorem:</b> Total outward flux through any closed Gaussian envelope equals enclosed charge: ∮ D̄ · dĀ = Q_enclosed."
      ],
      variables: [
        { sym: 'Ψ', name: 'Total electrostatic flux', unit: 'Coulombs (C)' },
        { sym: 'D', name: 'Electric flux density', unit: 'Coulombs/m² (C/m²)' },
        { sym: 'A', name: 'Surface area perpendicular to field', unit: 'm²' },
        { sym: 'E', name: 'Electric field intensity', unit: 'V/m' }
      ]
    },
    {
      id: 'capacitance_basic',
      topicId: '05',
      title: 'Fundamental Capacitance Definition',
      mathHtml: `<div class="math-eq">
        <span>C = </span>
        <div class="math-frac"><span class="num">Q</span><span class="den">V</span></div>
        <span> &nbsp;|&nbsp; 1 Farad (F) = </span>
        <div class="math-frac"><span class="num">1 Coulomb</span><span class="den">1 Volt</span></div>
      </div>`,
      unit: 'Farad (F) = Coulomb / Volt (C/V)',
      lines: [
        '<b>Definition:</b> The ability of an electrical component to store electric charge per unit potential difference across its terminals.',
        '<b>1 Farad Definition:</b> A capacitor has 1 Farad capacitance if storing 1 Coulomb of charge causes a potential change of 1 Volt.',
        '<b>Scale of Units:</b> 1 Farad is exceptionally large. Practical electronic circuits use:\n• Microfarad: 1 μF = 10⁻⁶ F\n• Nanofarad: 1 nF = 10⁻⁹ F\n• Picofarad: 1 pF = 10⁻¹² F.',
        '<b>Linear Property:</b> For an ideal capacitor, stored charge Q is directly proportional to applied voltage V (Q = C · V).'
      ],
      variables: [
        { sym: 'C', name: 'Capacitance', unit: 'Farads (F)' },
        { sym: 'Q', name: 'Stored electric charge', unit: 'Coulombs (C)' },
        { sym: 'V', name: 'Terminal potential difference', unit: 'Volts (V)' }
      ]
    },
    {
      id: 'energy_stored',
      topicId: '05',
      title: 'Electrostatic Stored Energy',
      mathHtml: `<div class="math-eq">
        <span>U = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">2</span></div>
        <span> C V² = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">2</span></div>
        <span> Q V = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">2</span></div>
        <div class="math-frac"><span class="num">Q²</span><span class="den">C</span></div>
      </div>`,
      unit: 'Joule (J)',
      lines: [
        '<b>Origin of Energy:</b> Work done by the power supply to transport electrons against the opposing electrostatic field of the accumulating charge.',
        '<b>Formula Forms:</b>\n• U = ½ C V² (best when voltage is constant or known).\n• U = ½ Q V (average voltage during charging is V/2).\n• U = ½ Q² / C (best for series circuits where charge Q is constant).',
        '<b>Location:</b> Energy is stored physically in the electrostatic field distortion throughout the volume of the dielectric.'
      ],
      variables: [
        { sym: 'U', name: 'Stored electrostatic potential energy', unit: 'Joules (J)' },
        { sym: 'C', name: 'Capacitance', unit: 'Farads (F)' },
        { sym: 'V', name: 'Terminal voltage across plates', unit: 'Volts (V)' },
        { sym: 'Q', name: 'Stored charge magnitude', unit: 'Coulombs (C)' }
      ]
    },
    {
      id: 'energy_density',
      topicId: '05',
      title: 'Electrostatic Field Energy Density',
      mathHtml: `<div class="math-eq">
        <span>u = </span>
        <div class="math-frac"><span class="num">U</span><span class="den">Volume</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">2</span></div>
        <span> ε₀ εᵣ E² = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">2</span></div>
        <span> D · E</span>
      </div>`,
      unit: 'Joule per cubic meter (J/m³)',
      lines: [
        '<b>Definition:</b> Stored electrostatic energy per unit volume (A · d) of the dielectric medium.',
        '<b>Field Intensity Scaling:</b> Energy density varies with the square of electric field intensity (u ∝ E²).',
        '<b>Electrostatic Pressure:</b> Also represents the attractive mechanical tension / pressure pulling capacitor plates toward each other.'
      ],
      variables: [
        { sym: 'u', name: 'Energy density of electric field', unit: 'J/m³' },
        { sym: 'E', name: 'Electric field intensity', unit: 'V/m' },
        { sym: 'D', name: 'Electric flux density', unit: 'C/m²' }
      ]
    },
    {
      id: 'cap_parallel_plate',
      topicId: '06',
      title: 'Parallel-Plate Capacitor (Uniform Medium)',
      mathHtml: `<div class="math-eq">
        <span>C = </span>
        <div class="math-frac"><span class="num">ε₀ · εᵣ · A</span><span class="den">d</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">ε · A</span><span class="den">d</span></div>
      </div>`,
      unit: 'Farad (F)',
      lines: [
        '<b>Area Factor:</b> Capacitance varies directly with plate surface area A (C ∝ A) because larger area accommodates more charges.',
        '<b>Distance Factor:</b> Capacitance varies inversely with gap distance d (C ∝ 1/d) because closer plates exert stronger attraction.',
        '<b>Dielectric Factor:</b> Capacitance varies directly with relative permittivity εᵣ (C ∝ εᵣ) due to internal molecular polarization.',
        '<b>Uniform Air Gap:</b> When dry air (εᵣ = 1.0) fills the gap, C₀ = (ε₀ · A) / d = (8.854 × 10⁻¹² · A) / d.'
      ],
      variables: [
        { sym: 'A', name: 'Plate surface area', unit: 'Square meters (m²)' },
        { sym: 'd', name: 'Separation distance between plates', unit: 'Meters (m)' },
        { sym: 'ε₀', name: 'Permittivity of vacuum (8.854 × 10⁻¹²)', unit: 'F/m' },
        { sym: 'εᵣ', name: 'Relative permittivity of medium', unit: 'Dimensionless' }
      ]
    },
    {
      id: 'cap_composite',
      topicId: '06',
      title: 'Parallel-Plate Capacitor with Composite Medium',
      mathHtml: `<div class="math-eq">
        <span>C = </span>
        <div class="math-frac"><span class="num">ε₀ · A</span><span class="den">(d - t) + <div class="math-frac"><span class="num">t</span><span class="den">εᵣ</span></div></span></div>
      </div>`,
      unit: 'Farad (F)',
      lines: [
        '<b>Arrangement:</b> A dielectric slab of thickness t and constant εᵣ is placed between plates separated by total distance d (t < d).',
        '<b>Effective Gap Reduction:</b> The term t / εᵣ represents the equivalent air-gap thickness of the dielectric slab.',
        '<b>Air Thickness:</b> The remaining air gap thickness is (d - t).',
        '<b>Equivalent Series Analogy:</b> This arrangement is mathematically equivalent to two capacitors in series: air capacitor C_air and dielectric capacitor C_slab.',
        '<b>Capacitance Increase:</b> Because εᵣ > 1, the denominator is smaller than d, so introducing the slab ALWAYS increases capacitance.'
      ],
      variables: [
        { sym: 'A', name: 'Plate area', unit: 'm²' },
        { sym: 'd', name: 'Total distance between conductive plates', unit: 'Meters (m)' },
        { sym: 't', name: 'Thickness of inserted dielectric slab', unit: 'Meters (m)' },
        { sym: 'εᵣ', name: 'Relative permittivity of inserted slab', unit: 'Dimensionless' }
      ]
    },
    {
      id: 'cap_multiplate',
      topicId: '06',
      title: 'Multi-Plate Interleaved Capacitor',
      mathHtml: `<div class="math-eq">
        <span>C = (n - 1) · </span>
        <div class="math-frac"><span class="num">ε₀ · εᵣ · A</span><span class="den">d</span></div>
      </div>`,
      unit: 'Farad (F)',
      lines: [
        '<b>Construction:</b> Consists of n parallel metallic plates interleaved together, with alternate plates tied to common terminals.',
        '<b>Parallel Pairs:</b> n parallel plates form exactly (n - 1) individual capacitor gaps in parallel.',
        '<b>Capacitance Multiplication:</b> The total capacitance is (n - 1) times the capacitance of a single two-plate unit.',
        '<b>Common Applications:</b> Used in variable air tuning capacitors, radio transmitters, and compact multilayer ceramic capacitors (MLCCs).'
      ],
      variables: [
        { sym: 'n', name: 'Total number of interleaved metal plates', unit: 'Integer (e.g. 5, 9, 21)' },
        { sym: 'A', name: 'Surface overlap area of each plate', unit: 'm²' },
        { sym: 'd', name: 'Spacing between adjacent parallel plates', unit: 'Meters (m)' }
      ]
    },
    {
      id: 'dielectric_breakdown',
      topicId: '06',
      title: 'Dielectric Breakdown & Voltage Rating',
      mathHtml: `<div class="math-eq">
        <span>V_max = E_breakdown · d</span>
      </div>`,
      unit: 'Volt (V)',
      lines: [
        '<b>Breakdown Mechanism:</b> If electric field E exceeds dielectric strength, valence electrons are torn from atoms, causing ion avalanche and electric arc.',
        '<b>Dielectric Strengths:</b>\n• Dry Air: ~ 3 kV/mm\n• Kraft Paper: ~ 16 kV/mm\n• Borosilicate Glass: ~ 14 kV/mm\n• Mica: ~ 60 kV/mm\n• Ceramic: ~ 20 to 40 kV/mm.',
        '<b>Safety Factor:</b> Industrial capacitors are rated for operating voltages with at least a 2× to 3× safety margin below V_max.'
      ],
      variables: [
        { sym: 'V_max', name: 'Dielectric breakdown voltage', unit: 'Volts (V)' },
        { sym: 'E_breakdown', name: 'Dielectric strength of material', unit: 'kV/mm or V/m' },
        { sym: 'd', name: 'Dielectric thickness / plate spacing', unit: 'Millimeters (mm)' }
      ]
    },
    {
      id: 'series_cap',
      topicId: '07',
      title: 'Capacitors Connected in Series',
      mathHtml: `<div class="math-eq">
        <div class="math-frac"><span class="num">1</span><span class="den">C_eq</span></div>
        <span> = </span>
        <div class="math-frac"><span class="num">1</span><span class="den">C₁</span></div>
        <span> + </span>
        <div class="math-frac"><span class="num">1</span><span class="den">C₂</span></div>
        <span> + </span>
        <div class="math-frac"><span class="num">1</span><span class="den">C₃</span></div>
        <span> + …</span>
      </div>`,
      unit: 'Farad (F)',
      lines: [
        '<b>Charge Rule (Identical):</b> Stored charge is identical on every capacitor in series: Q₁ = Q₂ = Q₃ = Q_total.',
        '<b>Voltage Rule (Division):</b> Total applied voltage divides across units: V_total = V₁ + V₂ + V₃ + …',
        '<b>Reciprocal Sum:</b> 1 / C_eq = 1 / C₁ + 1 / C₂ + 1 / C₃.',
        '<b>Two-Capacitor Shortcut:</b> C_eq = (C₁ · C₂) / (C₁ + C₂).',
        '<b>Key Exam Fact:</b> Equivalent capacitance C_eq is ALWAYS LESS than the smallest individual capacitor in the string.',
        '<b>Voltage Breakdown Trap:</b> The SMALLEST capacitor experiences the LARGEST voltage (V = Q/C), so it is most vulnerable to breakdown!'
      ],
      variables: [
        { sym: 'C_eq', name: 'Equivalent series capacitance', unit: 'Farads (F)' },
        { sym: 'C₁, C₂...', name: 'Individual capacitance ratings', unit: 'Farads (F)' }
      ]
    },
    {
      id: 'parallel_cap',
      topicId: '07',
      title: 'Capacitors Connected in Parallel',
      mathHtml: `<div class="math-eq">
        <span>C_eq = C₁ + C₂ + C₃ + …</span>
      </div>`,
      unit: 'Farad (F)',
      lines: [
        '<b>Voltage Rule (Identical):</b> Every capacitor experiences identical terminal voltage: V₁ = V₂ = V₃ = V_supply.',
        '<b>Charge Rule (Addition):</b> Total charge is the sum of individual charges: Q_total = Q₁ + Q₂ + Q₃ + …',
        '<b>Direct Addition:</b> Equivalent capacitance is the simple algebraic sum: C_eq = C₁ + C₂ + C₃.',
        '<b>Key Exam Fact:</b> Parallel grouping is used when you need a LARGER total capacitance at a given operating voltage.'
      ],
      variables: [
        { sym: 'C_eq', name: 'Equivalent parallel capacitance', unit: 'Farads (F)' },
        { sym: 'C₁, C₂...', name: 'Individual capacitances', unit: 'Farads (F)' }
      ]
    }
  ],

  // 2. High-Yield Revision Notes Formatted Line-by-Line with Mathematical Derivations
  revisionNotes: [
    {
      topicId: '01',
      title: 'Electric Charge & Atomic Transfer',
      summary: [
        'Charge is an intrinsic physical property of subatomic particles that causes electrostatic forces.',
        'Proton charge is exactly +1.602 × 10⁻¹⁹ C; electron charge is -1.602 × 10⁻¹⁹ C.',
        'Quantization Principle: All observable charge Q in nature is an integral multiple of elementary charge: Q = ± n · e.',
        'Conservation of Charge: The net algebraic electric charge in an electrically isolated system remains constant in all interactions.',
        '1 Coulomb of charge equals 6.25 × 10¹⁸ elementary electron charges (1 C = 1 A · 1 s).'
      ],
      definitions: [
        { term: '1 Coulomb (1 C)', def: 'The quantity of electric charge transported by a steady current of 1 Ampere flowing for 1 second (1 C = 1 A · s).' },
        { term: 'Electric Current (I)', def: 'The instantaneous rate of flow of electric charge across a conducting cross-section: I = dQ / dt.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Quantization Hypothesis', math: 'Q = \\pm n \\cdot e \\quad (n = 1, 2, 3...)', text: 'Millikan’s oil drop experiment established that electric charge exists only in discrete packets of elementary charge e = 1.602 × 10⁻¹⁹ C.' },
        { step: 2, title: 'Relation to Macroscopic Current', math: 'I = \\frac{dQ}{dt} \\implies Q = \\int I \\, dt = I \\cdot t', text: 'For a constant steady electric current I flowing for time duration t, the total charge transported is directly proportional to time.' },
        { step: 3, title: 'Electron Count Calculation', math: 'n = \\frac{Q}{e} = \\frac{1.0\\text{ C}}{1.6021766 \\times 10^{-19}\\text{ C}} \\approx 6.2415 \\times 10^{18}\\text{ electrons}', text: '1 Coulomb requires transferring over six billion billion electrons, showing that 1 Coulomb is a massive unit in electrostatic terms.' }
      ],
      examTips: [
        'Deficit (loss) of electrons leaves an atom or conductor POSITIVELY charged (+Q).',
        'Excess (gain) of electrons leaves an atom or conductor NEGATIVELY charged (−Q).',
        'Standard unit scale: 1 μC = 10⁻⁶ C, 1 nC = 10⁻⁹ C, 1 pC = 10⁻¹² C.'
      ],
      example: {
        problem: 'How many electrons must be removed from a neutral copper sphere to give it a net positive charge of +4.8 μC?',
        solution: `Given Data:
  • Net Positive Charge Q = +4.8 μC = 4.8 × 10⁻⁶ C
  • Elementary Electron Charge e = 1.602 × 10⁻¹⁹ C

Governing Formula:
  Q = n · e  ⟹  n = Q / e

Step-by-Step Calculation:
  n = (4.8 × 10⁻⁶ C) / (1.602 × 10⁻¹⁹ C)
  n = 2.996 × 10¹³ electrons

Final Answer:
  Approximately 3.0 × 10¹³ electrons must be removed from the sphere.`
      }
    },
    {
      topicId: '02',
      title: "Coulomb's Laws of Electrostatics",
      summary: [
        "Coulomb's 1st Law (Direction): Like charges repel each other; unlike charges attract each other.",
        "Coulomb's 2nd Law (Magnitude): Force F between two charges is directly proportional to (q₁ · q₂) and inversely proportional to r².",
        'Permittivity of Free Space: ε₀ = 8.854 × 10⁻¹² F/m, establishing Coulomb constant k = 1/(4πε₀) ≈ 9.0 × 10⁹ N·m²/C².',
        'Dielectric Shielding Effect: In a dielectric medium with constant εᵣ, force is attenuated: F_med = F_vac / εᵣ.',
        'Vector Superposition: The total electrostatic force on a charge equals the vector sum of individual forces.'
      ],
      definitions: [
        { term: 'Permittivity of Free Space (ε₀)', def: 'Absolute permittivity of free space / vacuum = 8.8541878 × 10⁻¹² F/m.' },
        { term: 'Relative Permittivity (εᵣ)', def: 'Ratio of electrostatic force in vacuum to force in medium: εᵣ = F_vacuum / F_medium.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Experimental Proportionality', math: 'F \\propto (q_1 \\cdot q_2) \\quad \\text{and} \\quad F \\propto \\frac{1}{r^2}', text: 'Using a torsion balance, Charles-Augustin de Coulomb proved that force scales with the product of charges and follows the inverse-square law with distance.' },
        { step: 2, title: 'Introduction of Medium Constant', math: 'F = k \\cdot \\frac{q_1 q_2}{r^2} = \\frac{1}{4\\pi \\varepsilon_0} \\frac{q_1 q_2}{r^2}', text: 'In SI units, the constant k is defined as 1 / (4π ε₀) = 8.98755 × 10⁹ N·m²/C² for vacuum or dry air.' },
        { step: 3, title: 'Force inside Dielectric Medium', math: 'F_{\\text{medium}} = \\frac{1}{4\\pi \\varepsilon_0 \\varepsilon_r} \\frac{q_1 q_2}{r^2} = \\frac{F_{\\text{vacuum}}}{\\varepsilon_r}', text: 'Bound atomic dipoles in the insulator polarize, creating a counter-field that reduces the net electrostatic attraction or repulsion by factor εᵣ.' }
      ],
      examTips: [
        'Coulomb force is strictly a vector along the line connecting charge centers. Always resolve into X and Y components.',
        'Inverse-square dependence: Doubling distance reduces force to 1/4 (25%); tripling distance reduces force to 1/9 (11.1%).'
      ],
      example: {
        problem: 'Two point charges +4 μC and +9 μC are separated by 30 cm in air. Calculate the magnitude and nature of the electrostatic force.',
        solution: `Given Data:
  • Charge q₁ = +4 μC = 4 × 10⁻⁶ C
  • Charge q₂ = +9 μC = 9 × 10⁻⁶ C
  • Separation Distance r = 30 cm = 0.30 m
  • Medium = Dry Air (εᵣ = 1.0, k = 9.0 × 10⁹ N·m²/C²)

Governing Formula:
  F = k · (|q₁ · q₂|) / r²

Step-by-Step Calculation:
  F = (9.0 × 10⁹) × (4 × 10⁻⁶ × 9 × 10⁻⁶) / (0.30)²
  F = (9.0 × 10⁹) × (36 × 10⁻¹²) / 0.09
  F = 324 / 0.09 = 3.60 Newtons

Final Answer:
  Electrostatic Force F = 3.60 N (Repulsive, since both charges are positive).`
      }
    },
    {
      topicId: '03',
      title: 'Electric Field Intensity & Lines of Force',
      summary: [
        'Electric field intensity (E) is the force experienced per unit positive test charge: E = F / Q (Units: V/m or N/C).',
        'Point Charge Field: E = Q / (4πε₀ εᵣ r²), directed radially outward from positive charge and inward toward negative charge.',
        'Uniform Field: Between parallel conductor plates with potential difference V and spacing d: E = V / d.',
        'Field Lines Properties:\n• Emerge perpendicularly from positive surfaces and terminate perpendicularly on negative surfaces.\n• Lines never cross each other (a single point cannot have two distinct field vectors).\n• Density of lines indicates field intensity (crowded = strong field; spaced = weak field).',
        'Electrostatic Shielding: The electrostatic field inside a closed cavity of a charged metallic conductor is strictly zero.'
      ],
      definitions: [
        { term: 'Electric Field Intensity (E)', def: 'Mechanical force exerted per unit positive test charge placed at a point in the electric field: E = F / Q.' },
        { term: 'Potential Gradient', def: 'Rate of change of electric potential with respect to distance: E = -dV/dr.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Field Definition as Force Ratio', math: 'E = \\lim_{q_0 \\to 0} \\frac{F}{q_0} = \\frac{1}{4\\pi \\varepsilon_0 \\varepsilon_r} \\frac{Q}{r^2}', text: 'By dividing Coulomb force on a test charge q₀ by q₀, the field becomes an intrinsic spatial property of source charge Q.' },
        { step: 2, title: 'Work Done in Field & Potential Gradient', math: 'dW = -F \\, dr = -Q E \\, dr \\implies dV = \\frac{dW}{Q} = -E \\, dr', text: 'Moving a charge dr against field E requires mechanical work. The electric potential gradient is therefore E = -dV / dr.' },
        { step: 3, title: 'Uniform Parallel-Plate Solution', math: 'E = -\\frac{\\Delta V}{\\Delta r} = \\frac{V}{d}', text: 'Integrating across uniform gap distance d from 0 to V yields constant field E = V / d everywhere between parallel plates.' }
      ],
      examTips: [
        'Inside any conductor at electrostatic equilibrium: E = 0.',
        'Tangent drawn at any point on a curved field line gives the instantaneous vector direction of force on a positive test charge.'
      ],
      example: {
        problem: 'Two flat parallel plates are separated by 5 mm and connected across a 250 V DC power supply. Find the electric field intensity.',
        solution: `Given Data:
  • Potential Difference V = 250 Volts
  • Plate Spacing d = 5 mm = 5 × 10⁻³ m

Governing Formula:
  E = V / d

Step-by-Step Calculation:
  E = 250 V / (5 × 10⁻³ m)
  E = 50,000 V/m = 50 kV/m (or 50 kN/C)

Final Answer:
  Electric Field Intensity E = 50 kV/m directed perpendicularly from the positive to negative plate.`
      }
    },
    {
      topicId: '04',
      title: 'Electric Flux & Gauss’s Theorem',
      summary: [
        'Electric flux (Ψ) represents the total number of lines of force emanating from a charge. Faraday proved Ψ = Q Coulombs.',
        'Flux Density (D): Flux passing perpendicularly through unit area: D = Ψ / A = Q / A (Units: C/m²).',
        'Constitutive Relationship: D = ε · E = ε₀ · εᵣ · E, directly linking flux density and field intensity.',
        'Flux density D depends solely on charge distribution and geometry; it is independent of the dielectric medium.',
        'Gauss’s Law: Total outward electric flux passing through any closed Gaussian envelope equals the enclosed charge: ∮ D̄ · dĀ = Q_enc.'
      ],
      definitions: [
        { term: 'Electric Flux (Ψ)', def: 'Total lines of electrostatic induction emanating from a charge; numerically equal to Q in Coulombs.' },
        { term: 'Electric Flux Density (D)', def: 'Electrostatic flux per unit cross-sectional area perpendicular to the direction of lines: D = Q / A.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Faraday’s Concentric Sphere Observation', math: '\\Psi = Q \\quad (\\text{Total Flux} = \\text{Total Enclosed Charge})', text: 'Michael Faraday proved with ice-pail experiments that charging an inner sphere induces an identical total charge and flux on the outer enclosure.' },
        { step: 2, title: 'Flux Density Definition', math: 'D = \\frac{\\Psi}{A} = \\frac{Q}{4\\pi r^2}', text: 'Dividing total flux Q over the surface area of a concentric sphere of radius r gives flux density D = Q / (4π r²).' },
        { step: 3, title: 'Constitutive Link to Field Intensity', math: 'D = \\varepsilon \\cdot E = \\varepsilon_0 \\varepsilon_r E \\implies E = \\frac{D}{\\varepsilon_0 \\varepsilon_r}', text: 'Because E = Q / (4π ε r²), substituting Q / (4π r²) = D establishes the fundamental relation D = ε E.' },
        { step: 4, title: 'Gauss’s Divergence Theorem', math: '\\oint_S \\vec{D} \\cdot d\\vec{A} = Q_{\\text{enclosed}}', text: 'The surface integral of flux density over any arbitrary closed 3D manifold depends strictly on the total enclosed algebraic charge.' }
      ],
      examTips: [
        'Flux density D does NOT change when a dielectric is inserted into the capacitor gap.',
        'Field intensity E DOES decrease when a dielectric is inserted: E = D / (ε₀ εᵣ).'
      ],
      example: {
        problem: 'A point charge of +8.854 μC is at the center of a sphere of radius 0.2 m in air. Find the electric flux density on the sphere surface.',
        solution: `Given Data:
  • Charge Q = +8.854 μC = 8.854 × 10⁻⁶ C
  • Sphere Radius r = 0.20 m

Governing Formulas:
  • Surface Area A = 4πr²
  • Electric Flux Density D = Q / A

Step-by-Step Calculation:
  A = 4 × 3.14159 × (0.20)² = 4 × 3.14159 × 0.04 = 0.50265 m²
  D = (8.854 × 10⁻⁶ C) / (0.50265 m²)
  D = 1.7615 × 10⁻⁵ C/m² = 17.62 μC/m²

Final Answer:
  Surface Electric Flux Density D = 17.62 μC/m² (uniform radially outward).`
      }
    },
    {
      topicId: '05',
      title: 'The Working Capacitor & Energy Storage',
      summary: [
        'A capacitor consists of two conductive plates separated by an insulating dielectric.',
        'When connected to voltage V, electrons move from positive to negative plate until plate voltage equals supply voltage.',
        'Stored Charge: Q = C · V. Capacitance C is measured in Farads (F = C / V).',
        'Stored energy resides in the electrostatic strain field established within the dielectric volume.',
        'Three equivalent energy formulas:\n• U = ½ C V² (best when voltage is constant)\n• U = ½ Q V (average voltage during charging is V/2)\n• U = ½ Q² / C (best when charge Q is constant).'
      ],
      definitions: [
        { term: '1 Farad (1 F)', def: 'Capacitance of a conductor system that stores 1 Coulomb of charge when a potential difference of 1 Volt is applied.' },
        { term: 'Displacement Current (Id)', def: 'Rate of change of electric displacement flux through the dielectric: Id = dΨ/dt = C (dV/dt).' }
      ],
      derivationSteps: [
        { step: 1, title: 'Incremental Work Done in Charging', math: 'dW = v \\cdot dq = \\frac{q}{C} \\, dq', text: 'At any intermediate state with charge q, the plate voltage is v = q / C. Transferring additional charge dq against this voltage requires work dW = v dq.' },
        { step: 2, title: 'Definite Integration for Total Energy', math: 'U = \\int_0^Q \\frac{q}{C} \\, dq = \\left[ \\frac{q^2}{2C} \\right]_0^Q = \\frac{1}{2} \\frac{Q^2}{C}', text: 'Integrating from uncharged state (q = 0) to full charge (q = Q) yields the total potential energy stored in the electric field.' },
        { step: 3, title: 'Alternative Voltage & Charge Forms', math: 'U = \\frac{1}{2} \\frac{(CV)^2}{C} = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V', text: 'Substituting Q = C · V yields the standard engineering energy equations used in power electronics and pulse circuits.' },
        { step: 4, title: 'Field Energy Density per Unit Volume', math: 'u = \\frac{U}{\\text{Volume}} = \\frac{\\frac{1}{2} C V^2}{A \\cdot d} = \\frac{1}{2} \\varepsilon E^2 = \\frac{1}{2} D \\cdot E', text: 'Dividing total energy by dielectric volume (A · d) proves that energy is stored locally within the electric field with density u ∝ E².' }
      ],
      examTips: [
        'Disconnected from battery: Charge Q remains constant; pulling plates apart increases voltage and increases stored energy.',
        'Connected to battery: Voltage V remains constant; pulling plates apart decreases capacitance and decreases stored energy.'
      ],
      example: {
        problem: 'A 50 μF capacitor is charged across a 400 V DC source. Calculate the stored charge and total electrostatic energy.',
        solution: `Given Data:
  • Capacitance C = 50 μF = 50 × 10⁻⁶ F
  • Terminal Voltage V = 400 Volts

Governing Formulas:
  • Stored Charge Q = C · V
  • Stored Energy U = ½ C V²

Step-by-Step Calculation:
  Q = (50 × 10⁻⁶ F) × (400 V) = 0.020 Coulombs = 20 mC
  U = 0.5 × (50 × 10⁻⁶ F) × (400 V)²
  U = 0.5 × (50 × 10⁻⁶) × 160,000
  U = 4.00 Joules

Final Answer:
  Stored Charge Q = 20 mC.
  Stored Electrostatic Energy U = 4.00 Joules.`
      }
    },
    {
      topicId: '06',
      title: 'Dielectrics & Composite Mediums',
      summary: [
        'Dielectrics are electrical insulators with bound atomic charges that polarize under applied electric fields.',
        'Polarization: Applied field aligns molecular dipoles, creating opposing internal field: E_net = E₀ / εᵣ.',
        'Capacitance with Dielectric: C = εᵣ · C₀ = (ε₀ εᵣ A) / d.',
        'Composite Dielectric Slab Formula: C = ε₀ A / [ (d - t) + t / εᵣ ], where t is slab thickness.',
        'Multi-Plate Interleaved Capacitor: C = (n - 1) · (ε₀ εᵣ A / d), where n is total plate count.'
      ],
      definitions: [
        { term: 'Dielectric Strength', def: 'The maximum electric field intensity an insulating material can withstand without electrical breakdown / arcing (kV/mm).' },
        { term: 'Polarization Vector (P)', def: 'Net electric dipole moment induced per unit volume of dielectric material: P = ε₀ χₑ E.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Field Reduction via Dipole Alignment', math: 'E_{\\text{net}} = E_0 - E_{\\text{induced}} = \\frac{E_0}{\\varepsilon_r}', text: 'Applied voltage aligns molecular dipoles. Bound surface charges generate an internal counter-field, attenuating the net electric field by factor εᵣ.' },
        { step: 2, title: 'Capacitance Multiplication', math: 'V = E_{\\text{net}} \\cdot d = \\frac{V_0}{\\varepsilon_r} \\implies C = \\frac{Q}{V} = \\varepsilon_r \\frac{Q}{V_0} = \\varepsilon_r C_0', text: 'Because potential difference V drops for the same charge Q, the capacitance increases directly by factor εᵣ.' },
        { step: 3, title: 'Composite Medium with Slab of Thickness t', math: 'V_{\\text{total}} = E_0 (d - t) + \\frac{E_0}{\\varepsilon_r} t = \\frac{Q}{\\varepsilon_0 A} \\left[ (d - t) + \\frac{t}{\\varepsilon_r} \\right]', text: 'The voltage drops across the air gap (d - t) and dielectric slab t sum up. Defining effective gap d_eff = (d - t) + t/εᵣ yields C = ε₀ A / d_eff.' },
        { step: 4, title: 'Multi-Plate Interleaved Multiplier', math: 'C_{\\text{multi}} = (n - 1) \\cdot \\frac{\\varepsilon_0 \\varepsilon_r A}{d}', text: 'Interleaving n alternating polarity plates creates exactly (n - 1) parallel-connected capacitor gaps in a compact physical volume.' }
      ],
      examTips: [
        'Effective gap distance for a composite slab: d_eff = (d - t) + t / εᵣ.',
        'Because εᵣ > 1, introducing any dielectric slab into an air capacitor ALWAYS increases capacitance.'
      ],
      example: {
        problem: 'A capacitor with plate area 0.02 m² and gap 6 mm has a 4 mm thick dielectric slab (εᵣ = 6.0) inserted. Find capacitance C.',
        solution: `Given Data:
  • Plate Area A = 0.02 m²
  • Total Plate Gap d = 6 mm = 6 × 10⁻³ m
  • Slab Thickness t = 4 mm = 4 × 10⁻³ m
  • Relative Permittivity εᵣ = 6.0
  • Vacuum Permittivity ε₀ = 8.854 × 10⁻¹² F/m

Governing Formulas:
  • Effective Air Distance d_eff = (d - t) + t / εᵣ
  • Capacitance C = (ε₀ · A) / d_eff

Step-by-Step Calculation:
  d_eff = (6 - 4) + (4 / 6) = 2 + 0.6667 = 2.6667 mm = 2.6667 × 10⁻³ m
  C = (8.854 × 10⁻¹² × 0.02) / (2.6667 × 10⁻³)
  C = 1.7708 × 10⁻¹³ / 2.6667 × 10⁻³ = 6.640 × 10⁻¹¹ Farads = 66.40 pF

Final Answer:
  Capacitance with composite slab C = 66.40 pF (compared to 29.51 pF with air alone).`
      }
    },
    {
      topicId: '07',
      title: 'Series & Parallel Capacitor Networks',
      summary: [
        'Series Connection: 1 / C_eq = 1 / C₁ + 1 / C₂ + 1 / C₃ + …',
        'In series, charge Q is identical across all capacitors: Q₁ = Q₂ = Q₃ = Q_total.',
        'In series, voltages divide: V_total = V₁ + V₂ + V₃ + …',
        'Parallel Connection: C_eq = C₁ + C₂ + C₃ + …',
        'In parallel, voltage V is identical across all capacitors: V₁ = V₂ = V₃ = V_supply.',
        'In parallel, charges add directly: Q_total = Q₁ + Q₂ + Q₃ + …'
      ],
      definitions: [
        { term: 'Equivalent Capacitance (C_eq)', def: 'The capacitance of a single hypothetical capacitor that stores identical charge at the same terminal voltage as the network.' }
      ],
      derivationSteps: [
        { step: 1, title: 'Series Network Charge Invariance', math: 'Q_1 = Q_2 = Q_3 = Q_{\\text{total}}', text: 'By electrostatic charge induction, electron displacement on plate 1 induces identical opposite charge on plate 2, trapping charge in series loops.' },
        { step: 2, title: 'Series Voltage Summation', math: 'V = V_1 + V_2 + V_3 = \\frac{Q}{C_1} + \\frac{Q}{C_2} + \\frac{Q}{C_3} = Q \\left(\\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3}\\right)', text: 'Dividing total voltage V by charge Q proves: 1 / C_eq = 1 / C₁ + 1 / C₂ + 1 / C₃.' },
        { step: 3, title: 'Parallel Network Voltage Invariance', math: 'V_1 = V_2 = V_3 = V_{\\text{supply}}', text: 'Both plates of every capacitor are connected directly to common source rails, maintaining identical potential difference V across all units.' },
        { step: 4, title: 'Parallel Charge Summation', math: 'Q = Q_1 + Q_2 + Q_3 = C_1 V + C_2 V + C_3 V = (C_1 + C_2 + C_3) V', text: 'Dividing total charge Q by voltage V proves: C_eq = C₁ + C₂ + C₃.' }
      ],
      examTips: [
        'For 2 capacitors in series: C_eq = (C₁ · C₂) / (C₁ + C₂).',
        'In series, the SMALLEST capacitor experiences the LARGEST voltage (V = Q/C), making it most prone to breakdown.',
        'In parallel, equivalent capacitance is always strictly GREATER than the largest individual capacitor.'
      ],
      example: {
        problem: 'Three capacitors of 6 μF, 3 μF, and 2 μF are connected in series across 120 V DC. Find equivalent capacitance C_eq, total charge Q, and voltage across each capacitor.',
        solution: `Given Data:
  • Capacitors C₁ = 6 μF, C₂ = 3 μF, C₃ = 2 μF
  • Applied Voltage V = 120 Volts

Governing Formulas:
  • 1 / C_eq = 1/C₁ + 1/C₂ + 1/C₃
  • Q = C_eq · V
  • V_i = Q / C_i

Step-by-Step Calculation:
  1 / C_eq = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1.0 μF⁻¹
  C_eq = 1.00 μF
  Total Stored Charge Q = (1.00 × 10⁻⁶ F) × 120 V = 120 μC

Voltage Drops across Individual Units:
  • V₁ = 120 μC / 6 μF = 20 Volts
  • V₂ = 120 μC / 3 μF = 40 Volts
  • V₃ = 120 μC / 2 μF = 60 Volts
  (Check: 20V + 40V + 60V = 120V ✓)

Final Answer:
  Equivalent Capacitance C_eq = 1.00 μF.
  Charge Q = 120 μC on every unit.
  Voltage distribution: V₁ = 20V, V₂ = 40V, V₃ = 60V (Smallest capacitor holds highest voltage!).`
      }
    }
  ]
};
