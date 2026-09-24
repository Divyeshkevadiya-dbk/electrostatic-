/**
 * beee_course_data.js - Comprehensive BEEE Course Catalog, Master Formulas, Revision Notes & Quizzes
 * Covers 100% of syllabus extracted from curriculum PDFs:
 * - Unit 1: Electrical Terms, Basic Concepts, Sources & Materials
 * - Unit 2: Electrical Circuit Analysis & Network Theorems
 * - Unit 3: Electrostatics, Capacitance & Dielectrics
 */

const BEEE_DATA = {
  // Course Metadata
  course: {
    title: 'Basic Electrical and Electronics Engineering (BEEE)',
    code: 'BEEE-101 / 26EC054',
    university: 'Charotar University of Science and Technology (CHARUSAT)',
    units: [
      { id: 'u1', num: 1, title: 'Electrical Terms, Concepts & Components', shortTitle: 'Electrical Concepts', color: '#00f5ff', count: 14 },
      { id: 'u2', num: 2, title: 'Electrical Circuit Analysis & Network Theorems', shortTitle: 'Circuit Analysis', color: '#a855f7', count: 11 },
      { id: 'u3', num: 3, title: 'Electrostatics, Capacitance & Dielectrics', shortTitle: 'Electrostatics', color: '#10b981', count: 7 }
    ]
  },

  // Units & Topics Database
  topics: [
    /* =========================================================================
     * UNIT 1: ELECTRICAL TERMS, BASIC CONCEPTS & COMPONENTS
     * ========================================================================= */
    {
      id: 'u1_t01',
      unitId: 'u1',
      topicNum: '1.1',
      title: 'Electrical vs. Electronics Engineering',
      badge: 'Core Distinction',
      concept: 'Electrical engineering focuses on high-voltage power generation, transmission, and heavy machinery (transformers, motors, generators, grids using mainly AC). Electronics deals with low-voltage DC signals, semiconductors (diodes, transistors, ICs, microcontrollers), and information processing.',
      whyItMatters: 'Forms the foundational boundary of modern engineering: electrical powers our cities and industrial plants, while electronics controls the signals, automation, and computing systems within them.',
      mathHtml: `<div class="math-eq"><span>\\text{Electrical: High Voltage, High Power (AC)} \\quad \\Longleftrightarrow \\quad \\text{Electronics: Low Voltage, Signal Processing (DC)}</span></div>`,
      lines: [
        '<b>Voltage Level:</b> Electrical systems operate at high voltages (110V to 765kV); electronics operates at low voltages (1.2V to 24V).',
        '<b>Current Type:</b> Electrical primarily utilizes Alternating Current (AC); electronics primarily utilizes Direct Current (DC).',
        '<b>Key Components:</b> Electrical uses passive/heavy components (generators, transformers, circuit breakers); electronics uses semiconductors (diodes, MOSFETs, microchips).',
        '<b>Primary Objective:</b> Electrical transfers power and energy; electronics processes data, signals, and control logic.',
        '<b>Example Systems:</b> Electrical = Hydro power station, 3-phase grid; Electronics = Smartphone, DSP processor, pacemaker.'
      ],
      variables: [
        { sym: 'AC', name: 'Alternating Current', unit: 'Amperes (A)' },
        { sym: 'DC', name: 'Direct Current', unit: 'Amperes (A)' },
        { sym: 'V_high', name: 'Grid Transmission Voltage', unit: 'kV (Kilovolts)' },
        { sym: 'V_low', name: 'Digital Logic Voltage', unit: 'Volts (e.g. 3.3V, 5V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Power Flow Analysis', math: 'P = V \\cdot I', text: 'Electrical power transmission relies on stepping voltage up to several hundred kilovolts to minimize I²R line losses across long distances.' },
        { step: 2, title: 'Semiconductor Signal Control', math: 'I_D = I_S \\left( e^{\\frac{V_D}{\\eta V_T}} - 1 \\right)', text: 'Electronics uses non-linear semiconductor switching at sub-volt levels to represent binary states (0 and 1) and amplify weak sensor signals.' }
      ],
      example: {
        problem: 'A domestic substation transformer delivers 100 kW power at 230 V AC to an electrical distribution board, while an electronic laptop charger consumes 65 W at 20 V DC. Compare current requirements.',
        solution: `Given Data:
  • Electrical Load: P₁ = 100 kW = 100,000 W, V₁ = 230 V AC
  • Electronic Load: P₂ = 65 W, V₂ = 20 V DC

Formula:
  I = P / V

Calculation:
  • Electrical Substation Current: I₁ = 100,000 W / 230 V = 434.78 A
  • Electronic Device Current: I₂ = 65 W / 20 V = 3.25 A

Final Answer:
  Substation supplies 434.78 A (heavy power conductor requirement), whereas the electronic charger requires only 3.25 A.`
      },
      commonMistakes: [
        'Assuming electronics does not use power. Power electronics (IGBTs, Thyristors) handles high power using electronic switching.',
        'Confusing DC generators with electronics. Generators without semiconductors are purely electrical machines.'
      ],
      realWorldApp: 'Hybrid and Electric Vehicles (EVs) unite both: high-voltage battery and traction motor (electrical) controlled by microprocessors and gate drivers (electronics).',
      simType: 'electrical_vs_electronics',
      quiz: [
        { q: 'Which characteristic primarily defines the electronics domain?', opts: ['Generation of gigawatt-level AC power', 'Control of electrical signals using semiconductor devices', 'High-voltage switchgear design', 'Transmission line towers'], ans: 1, exp: 'Electronics deals with signal control and data processing using semiconductors like diodes, transistors, and ICs.' },
        { q: 'What is the main advantage of transmitting electrical power at very high voltages?', opts: ['It eliminates AC frequency', 'It minimizes I²R transmission line losses by lowering current', 'It converts AC into pure DC', 'It reduces transformer size to zero'], ans: 1, exp: 'Because P = V · I, increasing V reduces current I, which drastically cuts heat loss (P_loss = I²R) in transmission cables.' }
      ]
    },

    {
      id: 'u1_t02',
      unitId: 'u1',
      topicNum: '1.2',
      title: 'Physical Quantities, Dimensions & SI Units',
      badge: 'Scientific Foundations',
      concept: 'A physical quantity is any property of a system that can be quantified by measurement (expressed as a numerical value × standard unit). The International System of Units (SI) defines 7 fundamental base units from which all electrical units (Volt, Ampere, Ohm, Farad, Henry, Watt, Joule) are derived.',
      whyItMatters: 'Precise units and dimensions prevent catastrophic engineering failures, ensuring seamless interoperability between electrical circuits, sensors, and computer systems globally.',
      mathHtml: `<div class="math-eq"><span>Q = \\text{Numerical Magnitude} \\times \\text{Standard Unit} \\quad | \\quad [\\text{Joule}] = [\\text{kg} \\cdot \\text{m}^2 \\cdot \\text{s}^{-2}]</span></div>`,
      lines: [
        '<b>Measurability:</b> A physical quantity must be capable of comparison against a calibrated international standard.',
        '<b>Base Quantities:</b> Length (m), Mass (kg), Time (s), Electric Current (A), Temperature (K), Amount of substance (mol), Luminous intensity (cd).',
        '<b>Derived Electrical Units:</b> Charge (Coulomb = A·s), Potential (Volt = J/C = kg·m²·s⁻³·A⁻¹), Resistance (Ohm = V/A).',
        '<b>Scalars vs. Vectors:</b> Scalars have magnitude only (Voltage, Charge, Energy, Power); Vectors have magnitude and spatial direction (Electric field E, Current density J, Magnetic flux density B).',
        '<b>Dimensional Homogeneity:</b> Both sides of every physical equation must have identical fundamental dimensions.'
      ],
      variables: [
        { sym: 'A', name: 'Ampere (Base Current Unit)', unit: 'Base SI unit' },
        { sym: 'V', name: 'Volt (Potential difference)', unit: 'W / A = kg·m²/(s³·A)' },
        { sym: 'Ω', name: 'Ohm (Resistance)', unit: 'V / A' },
        { sym: 'J', name: 'Joule (Energy)', unit: 'N·m = kg·m²/s²' },
        { sym: 'W', name: 'Watt (Power)', unit: 'J / s' }
      ],
      derivationSteps: [
        { step: 1, title: 'Derivation of the Volt', math: 'V = \\frac{W}{Q} = \\frac{\\text{Force} \\times \\text{distance}}{\\text{Current} \\times \\text{time}}', text: 'Work is Force × Distance [kg·m/s² × m = kg·m²/s²]. Charge is Current × Time [A·s].' },
        { step: 2, title: 'Final Dimensional Formula of Voltage', math: '[V] = \\frac{[M L^2 T^{-2}]}{[I T]} = [M L^2 T^{-3} I^{-1}]', text: 'Thus 1 Volt = 1 kg·m²·s⁻³·A⁻¹.' }
      ],
      example: {
        problem: 'Verify dimensionally whether the equation for electrical energy E = P · t is dimensionally homogeneous.',
        solution: `Analysis:
  • Left-Hand Side (Energy E):
    Dimension of Energy = [M L² T⁻²] (Joules)
  • Right-Hand Side (Power P × Time t):
    Power P = Work / Time = [M L² T⁻³]
    Time t = [T]
    [P · t] = [M L² T⁻³] × [T] = [M L² T⁻²]

Conclusion:
  LHS = RHS = [M L² T⁻²]. The equation is dimensionally correct and homogeneous.`
      },
      commonMistakes: [
        'Treating electric current as a derived quantity. In SI, the Ampere is one of the 7 fundamental base quantities; Charge (Coulomb = A·s) is derived!',
        'Forgetting that electric potential is a scalar, whereas electric field intensity is a vector.'
      ],
      realWorldApp: 'Calibration laboratories (like NIST and NPL) maintain quantum standards (Josephson effect for Volts, Quantum Hall effect for Ohms) to calibrate industrial test equipment.',
      simType: 'units_converter',
      quiz: [
        { q: 'Which of the following is an SI fundamental base unit?', opts: ['Volt', 'Coulomb', 'Ampere', 'Ohm'], ans: 2, exp: 'The Ampere is one of the seven SI base units; Coulomb, Volt, and Ohm are derived.' },
        { q: 'What is the base SI dimensional formula for the Ohm (resistance)?', opts: ['[M L² T⁻³ I⁻²]', '[M L T⁻² I⁻¹]', '[M L² T⁻¹ I⁻¹]', '[M L³ T⁻³ I⁻²]'], ans: 0, exp: 'R = V / I = [M L² T⁻³ I⁻¹] / [I] = [M L² T⁻³ I⁻²].' }
      ]
    },

    {
      id: 'u1_t03',
      unitId: 'u1',
      topicNum: '1.3',
      title: 'Scientific Notation & Engineering Prefixes',
      badge: 'Mathematical Tools',
      concept: 'Scientific notation expresses quantities as a number between 1 and 10 multiplied by a power of 10 ($A \\times 10^B$). Engineering notation restricts the exponent to multiples of 3 ($10^3, 10^6, 10^{-3}, 10^{-6}, 10^{-12}$), aligning directly with standard metric prefixes (kilo, mega, milli, micro, nano, pico).',
      whyItMatters: 'Electrical engineering spans vast scales: from picofarad capacitors ($10^{-12}\\text{ F}$) and gigahertz frequencies ($10^9\\text{ Hz}$) to megawatt power plants ($10^6\\text{ W}$). Engineering notation makes values instantly readable.',
      mathHtml: `<div class="math-eq"><span>N = M \\times 10^{3k} \\quad (k \\in \\mathbb{Z}, \\quad 1 \\le M < 1000)</span></div>`,
      lines: [
        '<b>Standard Scientific Form:</b> Single non-zero digit before decimal point: $300,000,000\\text{ m/s} = 3.0 \\times 10^8\\text{ m/s}$.',
        '<b>Engineering Form:</b> Exponents in steps of 3: $5000\\text{ V} = 5.0 \\times 10^3\\text{ V} = 5\\text{ kV}$.',
        '<b>Large Prefixes:</b> Kilo (k = $10^3$), Mega (M = $10^6$), Giga (G = $10^9$), Tera (T = $10^{12}$).',
        '<b>Small Prefixes:</b> Milli (m = $10^{-3}$), Micro (μ = $10^{-6}$), Nano (n = $10^{-9}$), Pico (p = $10^{-12}$), Femto (f = $10^{-15}$).',
        '<b>Calculation Rule:</b> When multiplying, add powers: $(3\\text{ mA}) \\times (4\\text{ k}\\Omega) = (3 \\times 10^{-3}) \\times (4 \\times 10^3) = 12\\text{ V}$.'
      ],
      variables: [
        { sym: 'k', name: 'Kilo (multiplier 10³)', unit: '1,000' },
        { sym: 'M', name: 'Mega (multiplier 10⁶)', unit: '1,000,000' },
        { sym: 'm', name: 'Milli (multiplier 10⁻³)', unit: '0.001' },
        { sym: 'μ', name: 'Micro (multiplier 10⁻⁶)', unit: '0.000001' },
        { sym: 'p', name: 'Pico (multiplier 10⁻¹²)', unit: '10⁻¹²' }
      ],
      derivationSteps: [
        { step: 1, title: 'Power Multiplication', math: 'V = I \\cdot R = (I_0 \\times 10^a) \\cdot (R_0 \\times 10^b) = (I_0 R_0) \\times 10^{a+b}', text: 'Multiplying milliampere (10⁻³) by kilo-ohm (10³) yields 10⁰ = 1 Volt.' }
      ],
      example: {
        problem: 'A high-frequency oscillator operates at 450,000,000 Hz with a tuning capacitor of 0.000000000022 F. Convert both values into engineering notation with appropriate SI prefixes.',
        solution: `Conversions:
  1. Frequency:
     450,000,000 Hz = 450 × 10⁶ Hz = 450 MHz (Megahertz)
  2. Capacitance:
     0.000000000022 F = 22 × 10⁻¹² F = 22 pF (Picofarads)

Final Answer:
  Frequency = 450 MHz, Capacitance = 22 pF.`
      },
      commonMistakes: [
        'Confusing milli (m = 10⁻³) with micro (μ = 10⁻⁶) or Mega (M = 10⁶).',
        'Entering raw exponents into calculators incorrectly, leading to errors of a million times.'
      ],
      realWorldApp: 'All oscilloscope timebases (μs, ms), multimeter ranges (mA, kΩ), and component values (μF, nH) use engineering notation.',
      simType: 'prefix_calculator',
      quiz: [
        { q: 'What is 0.000047 Farads expressed in engineering notation with proper prefix?', opts: ['47 mF', '47 μF', '4.7 nF', '470 pF'], ans: 1, exp: '0.000047 F = 47 × 10⁻⁶ F = 47 μF.' },
        { q: 'A current of 50 μA passes through a 200 kΩ resistor. What is the voltage drop across it?', opts: ['10 mV', '10 V', '100 V', '1 V'], ans: 1, exp: 'V = I · R = (50 × 10⁻⁶ A) × (200 × 10³ Ω) = 10,000 × 10⁻³ = 10 V.' }
      ]
    },

    {
      id: 'u1_t04',
      unitId: 'u1',
      topicNum: '1.4',
      title: 'Atomic Structure, Bohr Model & Charge Quantization',
      badge: 'Atomic Physics',
      concept: 'All matter is composed of atoms containing a dense central nucleus (positively charged protons + neutral neutrons) surrounded by negatively charged electrons orbiting in discrete quantized energy shells ($2n^2$ rule). Conduction is governed by valence electrons in the outermost shell.',
      whyItMatters: 'Explains the microscopic origin of electrical conductivity. Materials with loosely bound valence electrons readily conduct current, while tightly bound valence electrons create insulators.',
      mathHtml: `<div class="math-eq"><span>N_{\\text{max}} = 2n^2 \\quad | \\quad Q = \\pm n \\cdot e \\quad (e = 1.602 \\times 10^{-19}\\text{ C})</span></div>`,
      lines: [
        '<b>Bohr Shell Capacity ($2n^2$):</b> K-shell (n=1) holds 2, L-shell (n=2) holds 8, M-shell (n=3) holds 18, N-shell (n=4) holds 32 electrons.',
        '<b>Stationary Energy Levels:</b> Electrons in allowed orbits do not radiate energy. Outer shells hold higher potential energy.',
        '<b>Elementary Charge (e):</b> $e = 1.602176634 \\times 10^{-19}\\text{ C}$. Protons carry $+e$, electrons carry $-e$.',
        '<b>Mass Difference:</b> A proton is approximately 1836 times more massive than an electron, meaning heavy nuclei remain stationary while light electrons drift.',
        '<b>Quantization Law:</b> Any net charge $Q$ on a body must be an exact integer multiple of electron charge: $Q = \\pm n \\cdot e$.'
      ],
      variables: [
        { sym: 'n', name: 'Principal quantum / shell number', unit: 'Integer (1, 2, 3...)' },
        { sym: 'e', name: 'Elementary charge magnitude', unit: '1.602 × 10⁻¹⁹ C' },
        { sym: 'Q', name: 'Total net electric charge', unit: 'Coulombs (C)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Quantization Formulation', math: 'Q = n \\cdot e \\implies n = \\frac{Q}{e}', text: 'Since electrons cannot be subdivided in chemical or electrical processes, charge is transferred in discrete packets.' },
        { step: 2, title: '1 Coulomb Count', math: 'n = \\frac{1.0\\text{ C}}{1.602 \\times 10^{-19}\\text{ C}} = 6.2415 \\times 10^{18}\\text{ electrons}', text: '1 Coulomb equals the collective charge of approximately 6.25 × 10¹⁸ electrons.' }
      ],
      example: {
        problem: 'Copper has atomic number Z = 29. Write down its electron configuration per shell, determine its valence electrons, and calculate the total electronic charge inside one neutral copper atom.',
        solution: `Analysis:
  • Atomic Number Z = 29 (29 protons, 29 electrons)
  • Shell Capacity (2n²):
    - K shell (n=1): 2 electrons
    - L shell (n=2): 8 electrons
    - M shell (n=3): 18 electrons
    - N shell (n=4): 1 electron (Valence electron!)
  • Valence Electrons = 1 (loosely bound, explaining why Copper is an excellent conductor).
  • Total Electronic Charge:
    Q_electrons = 29 × (-1.602 × 10⁻¹⁹ C) = -4.646 × 10⁻¹⁸ C
    Since the nucleus has +29 protons, the net atomic charge is strictly ZERO (electrically neutral).`
      },
      commonMistakes: [
        'Believing protons move during current flow in copper wires. Only valence electrons drift; positive ions remain locked in the crystalline lattice.',
        'Assuming charge can take any continuous arbitrary value (e.g. 2.5 × 10⁻¹⁹ C is impossible).'
      ],
      realWorldApp: 'Copper (1 valence electron) and Gold (1 valence electron) are the standard metals for PCB traces and chip bond wires due to free valence electron mobility.',
      simType: 'atomic_bohr_model',
      quiz: [
        { q: 'What is the maximum number of electrons that can occupy the M-shell (n=3)?', opts: ['8', '16', '18', '32'], ans: 2, exp: 'Maximum capacity = 2n² = 2 × (3)² = 2 × 9 = 18 electrons.' },
        { q: 'If a body has a net positive charge of +3.2 μC, how many electrons were removed?', opts: ['2.0 × 10¹³', '3.2 × 10¹⁹', '6.25 × 10¹⁸', '1.6 × 10¹³'], ans: 0, exp: 'n = Q / e = (3.2 × 10⁻⁶ C) / (1.602 × 10⁻¹⁹ C) = 2.0 × 10¹³ electrons.' }
      ]
    },

    {
      id: 'u1_t05',
      unitId: 'u1',
      topicNum: '1.5',
      title: 'Classification of Materials: Conductors, Semiconductors & Insulators',
      badge: 'Material Science',
      concept: 'Based on electrical conductivity and energy band gap ($E_g$), materials are classified into conductors (overlapping valence and conduction bands, abundant free electrons, low resistance), semiconductors (moderate band gap $\\approx 1.1\\text{ eV}$, conductivity controllable by doping/temperature), and insulators (large band gap $> 5\\text{ eV}$, bound valence electrons, very high resistance).',
      whyItMatters: 'Every circuit requires all three: conductors to guide current, insulators to isolate and prevent short circuits, and semiconductors to switch, amplify, and compute.',
      mathHtml: `<div class="math-eq"><span>\\text{Conductors } (E_g = 0\\text{ eV}) \\quad | \\quad \\text{Semiconductors } (E_g \\approx 1\\text{ eV}) \\quad | \\quad \\text{Insulators } (E_g > 5\\text{ eV})</span></div>`,
      lines: [
        '<b>Conductors:</b> Overlapping bands, free electron density $\\approx 10^{28}/\\text{m}^3$, low resistivity ($10^{-8}\\ \\Omega\\cdot\\text{m}$). Examples: Copper, Aluminum, Silver, Brass.',
        '<b>Semiconductors:</b> Narrow bandgap (Silicon $1.1\\text{ eV}$, Germanium $0.67\\text{ eV}$), resistivity ($10^{-3}$ to $10^5\\ \\Omega\\cdot\\text{m}$). Negative temperature coefficient (NTC).',
        '<b>Insulators:</b> Forbidden energy gap $> 5\\text{ eV}$, extremely high resistivity ($10^{10}$ to $10^{16}\\ \\Omega\\cdot\\text{m}$). Examples: Rubber, Glass, Mica, Porcelain, Bakelite.',
        '<b>Valence Electrons Rule:</b> Conductors typically have 1 to 3 valence electrons; semiconductors have 4 valence electrons; insulators have 5 to 8 tightly bound valence electrons.'
      ],
      variables: [
        { sym: 'E_g', name: 'Forbidden Energy Band Gap', unit: 'Electron-Volts (eV)' },
        { sym: 'ρ', name: 'Electrical Resistivity', unit: 'Ohm-meter (Ω·m)' },
        { sym: 'σ', name: 'Electrical Conductivity', unit: 'Siemens/meter (S/m)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Energy Gap Relation', math: '1\\text{ eV} = 1.602 \\times 10^{-19}\\text{ Joules}', text: 'At absolute zero (0 K), pure semiconductors behave as perfect insulators because thermal energy kT is insufficient to bridge Eg.' }
      ],
      example: {
        problem: 'Classify the following elements based on their valence electrons: Copper (29), Silicon (14), Argon (18), and Aluminum (13).',
        solution: `Analysis:
  • Copper: Outer shell has 1 electron ⟹ Conductor (Metal)
  • Silicon: Outer shell has 4 electrons ⟹ Semiconductor (Group IV)
  • Argon: Outer shell has 8 electrons (Full octet) ⟹ Insulator (Inert gas)
  • Aluminum: Outer shell has 3 electrons ⟹ Conductor (Metal)`
      },
      commonMistakes: [
        'Assuming pure silicon at room temperature is a good conductor. Pure (intrinsic) silicon has very low conductivity until doped with boron or phosphorus.',
        'Thinking insulators have zero electrons. They have billions of electrons, but they are tightly bound to atoms and cannot move freely.'
      ],
      realWorldApp: 'Overhead power cables use aluminum conductors surrounded by ceramic/porcelain disc insulators, and substation control systems use silicon microcontrollers.',
      simType: 'material_bandgap',
      quiz: [
        { q: 'What is the approximate energy band gap of Silicon at room temperature?', opts: ['0 eV', '1.1 eV', '5.5 eV', '10 eV'], ans: 1, exp: 'Silicon has an energy band gap Eg of approximately 1.1 eV.' },
        { q: 'Which material exhibits a negative temperature coefficient of resistance?', opts: ['Copper', 'Aluminum', 'Pure Silicon (Semiconductor)', 'Silver'], ans: 2, exp: 'Semiconductors and insulators exhibit NTC: as temperature rises, more covalent bonds break, releasing free carriers and lowering resistance.' }
      ]
    },

    {
      id: 'u1_t06',
      unitId: 'u1',
      topicNum: '1.6',
      title: 'Electric Current & Ampere Definition',
      badge: 'Circuit Dynamics',
      concept: 'Electric current ($I$) is the rate of net flow of electric charge across a cross-section of a conductor ($I = \\frac{dQ}{dt}$). One Ampere (1 A) is defined as one Coulomb of charge passing through a cross-section in one second ($1\\text{ A} = 1\\text{ C/s}$). By convention, current flows from positive to negative, opposite to actual electron drift.',
      whyItMatters: 'Current is the lifeblood of electrical circuits. It dictates conductor sizing, fuse ratings, heating effect ($I^2 R$), and magnetic field strength in motors.',
      mathHtml: `<div class="math-eq"><span>I = \\frac{dQ}{dt} \\quad \\Longleftrightarrow \\quad Q = \\int I \\, dt = I \\cdot t \\quad (1\\text{ Ampere} = 1\\text{ Coulomb/second})</span></div>`,
      lines: [
        '<b>Physical Meaning:</b> The collective ordered drift of free electrons under the influence of an applied electric field.',
        '<b>Conventional vs. Electron Flow:</b> Conventional current flows from High Potential (+) to Low Potential (−); electrons actually drift from (−) to (+).',
        '<b>Current Density (J):</b> Current per unit cross-sectional area: $J = \\frac{I}{A} = n \\cdot e \\cdot v_d$ ($A/m^2$).',
        '<b>Drift Velocity ($v_d$):</b> Electron drift speed is surprisingly slow (fractions of a millimeter per second), but the electromagnetic field propagates at near the speed of light.'
      ],
      variables: [
        { sym: 'I', name: 'Electric Current', unit: 'Amperes (A)' },
        { sym: 'Q', name: 'Electric Charge', unit: 'Coulombs (C)' },
        { sym: 't', name: 'Time duration', unit: 'Seconds (s)' },
        { sym: 'v_d', name: 'Electron drift velocity', unit: 'm/s' }
      ],
      derivationSteps: [
        { step: 1, title: 'Current from Charge Drift', math: 'I = \\frac{\\Delta Q}{\\Delta t} = \\frac{n \\cdot A \\cdot L \\cdot e}{L / v_d} = n A e v_d', text: 'In volume A·L with carrier density n, total charge is n·A·L·e. Passage time is L/vd, yielding I = n·A·e·vd.' }
      ],
      example: {
        problem: 'A steady current of 2.5 A flows through an automotive headlight filament for 4 minutes. Calculate the total charge transferred and the number of electrons passing through the filament.',
        solution: `Given Data:
  • Current I = 2.5 A
  • Time t = 4 minutes = 4 × 60 = 240 seconds

Governing Formulas:
  • Q = I · t
  • n = Q / e

Step-by-Step Calculation:
  Q = 2.5 A × 240 s = 600 Coulombs
  n = 600 C / (1.602 × 10⁻¹⁹ C) = 3.745 × 10²¹ electrons

Final Answer:
  Total Charge Q = 600 C.
  Number of electrons = 3.75 × 10²¹ electrons.`
      },
      commonMistakes: [
        'Confusing current with speed of electricity. Electrons drift very slowly (~1 mm/s), but electric signal propagation occurs at ~300,000 km/s.',
        'Thinking current gets consumed in a resistor. Current entering a resistor equals current leaving it; energy is what gets dissipated!'
      ],
      realWorldApp: 'Circuit breakers (MCBs) in household distribution panels are rated in Amperes (e.g. 6A, 16A, 32A) to prevent wires from overheating.',
      simType: 'current_flow_anim',
      quiz: [
        { q: 'If 15 Coulombs of charge passes through a wire in 3 seconds, what is the electric current?', opts: ['45 A', '5 A', '0.2 A', '15 A'], ans: 1, exp: 'I = Q / t = 15 C / 3 s = 5 A.' },
        { q: 'What is the direction of conventional current compared to electron drift?', opts: ['In the same direction as electron drift', 'Opposite to the direction of electron drift', 'Perpendicular to the wire', 'Random in all directions'], ans: 1, exp: 'Conventional current flows from positive to negative, which is directly opposite to electron drift.' }
      ]
    },

    {
      id: 'u1_t07',
      unitId: 'u1',
      topicNum: '1.7',
      title: 'Electromotive Force (EMF) vs. Potential Difference (PD)',
      badge: 'Voltage Dynamics',
      concept: 'Electromotive Force (EMF, $E$) is the total energy supplied by an active source (battery, generator) to each Coulomb of charge to circulate it around the entire circuit. Potential Difference (PD, $V$) is the energy transferred or consumed by one Coulomb of charge between two points in a circuit. EMF is the CAUSE; Potential Difference is the EFFECT.',
      whyItMatters: 'Explains terminal voltage drop in real batteries under load ($V = E - I r_{\\text{int}}$) and why car headlights dim slightly when the high-current starter motor cranks.',
      mathHtml: `<div class="math-eq"><span>\\text{EMF } (E) = \\frac{W_{\\text{source}}}{Q} \\quad | \\quad \\text{PD } (V) = \\frac{W_{\\text{load}}}{Q} \\quad | \\quad V_{\\text{terminal}} = E - I \\cdot r_{\\text{int}}</span></div>`,
      lines: [
        '<b>EMF ($E$):</b> Maximum open-circuit potential difference when zero current flows ($I = 0$). Converts non-electrical energy into electrical energy.',
        '<b>Potential Difference ($V$):</b> Measured across circuit elements during current flow. Converts electrical energy into heat, light, or mechanical motion.',
        '<b>Hydraulic Analogy:</b> EMF is like a water pump generating pressure difference; PD is the pressure drop across pipes and turbines.',
        '<b>Cause vs Effect:</b> EMF maintains the potential difference; current cannot flow without an EMF source.',
        '<b>Internal Resistance ($r_{\\text{int}}$):</b> In real batteries, internal resistance causes an internal drop: $V = E - I \\cdot r_{\\text{int}}$.'
      ],
      variables: [
        { sym: 'E', name: 'Electromotive Force (EMF)', unit: 'Volts (V)' },
        { sym: 'V', name: 'Terminal Potential Difference', unit: 'Volts (V)' },
        { sym: 'r_int', name: 'Internal Resistance of source', unit: 'Ohms (Ω)' },
        { sym: 'I', name: 'Load current', unit: 'Amperes (A)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Energy Balance Around Complete Loop', math: 'E = I \\cdot R_{\\text{load}} + I \\cdot r_{\\text{int}} = V_{\\text{terminal}} + I \\cdot r_{\\text{int}}', text: 'The energy provided by the source equals the sum of energy delivered to the external load plus internal battery dissipation.' },
        { step: 2, title: 'Terminal Voltage Relation', math: 'V_{\\text{terminal}} = E - I \\cdot r_{\\text{int}}', text: 'When open-circuit (I = 0), V = E. As load current increases, terminal voltage drops.' }
      ],
      example: {
        problem: 'A 12 V automotive battery has an internal resistance of 0.05 Ω. Calculate its terminal voltage when supplying a starter motor current of 80 A.',
        solution: `Given Data:
  • Battery EMF E = 12.0 V
  • Internal Resistance r_int = 0.05 Ω
  • Starter Current I = 80 A

Formula:
  V = E - I · r_int

Calculation:
  Internal Voltage Drop = I · r_int = 80 A × 0.05 Ω = 4.0 V
  Terminal Voltage V = 12.0 V - 4.0 V = 8.0 V

Final Answer:
  The terminal voltage drops to 8.0 V during engine cranking.`
      },
      commonMistakes: [
        'Assuming EMF is a mechanical force (in Newtons). Despite the name, EMF is an energy per unit charge (measured in Volts).',
        'Believing terminal voltage is always equal to battery rated EMF.'
      ],
      realWorldApp: 'Battery health monitors check internal resistance: as batteries age, $r_{\\text{int}}$ increases, causing terminal voltage to sag prematurely under load.',
      simType: 'emf_internal_resistor',
      quiz: [
        { q: 'What is the main difference between EMF and Potential Difference?', opts: ['EMF is measured in Amperes; PD in Volts', 'EMF is the cause (energy supplied); PD is the effect (energy consumed)', 'EMF only exists in AC circuits', 'PD is always greater than EMF'], ans: 1, exp: 'EMF is the driving cause supplied by a source; PD is the voltage drop across load components.' },
        { q: 'A 9V battery with 0.5 Ω internal resistance is connected to a 4 Ω resistor. What is the terminal voltage?', opts: ['9.0 V', '8.0 V', '4.5 V', '1.0 V'], ans: 1, exp: 'Total R = 4.5 Ω. Current I = 9 / 4.5 = 2 A. V_terminal = E - I·r = 9 - (2 × 0.5) = 8.0 V.' }
      ]
    },

    {
      id: 'u1_t08',
      unitId: 'u1',
      topicNum: '1.8',
      title: 'Electrical Power, Energy & Joule’s Law',
      badge: 'Power & Heat',
      concept: 'Electric Power ($P$) is the rate at which electrical energy is delivered or converted into another form ($P = \\frac{dw}{dt} = V \\cdot I$). Electric Energy ($W$) is the total work done over time ($W = P \\cdot t = V I t$). In resistive components, power dissipates as heat according to Joule’s Law: $P = I^2 R = \\frac{V^2}{R}$. Commercial electricity is billed in kilowatt-hours ($1\\text{ kWh} = 3.6 \\times 10^6\\text{ J}$).',
      whyItMatters: 'Determines electricity bills, thermal management of electronics, ratings of electrical heaters, and heatsink dimensions for computer processors.',
      mathHtml: `<div class="math-eq"><span>P = V \\cdot I = I^2 R = \\frac{V^2}{R} \\quad | \\quad W = P \\cdot t \\quad (1\\text{ kWh} = 3.6\\text{ MJ})</span></div>`,
      lines: [
        '<b>Power Definition:</b> Rate of energy transfer ($1\\text{ Watt} = 1\\text{ Joule/second}$).',
        '<b>Three Pure Resistor Expressions:</b> $P = V \\cdot I$, $P = I^2 R$ (best when current is known), $P = V^2 / R$ (best when voltage is fixed).',
        '<b>Commercial Unit of Energy:</b> 1 Unit = 1 Kilowatt-Hour (kWh) = Energy consumed by 1000 W appliance operating for 1 hour.',
        '<b>Joule’s Heating Law:</b> Heat generated $H = I^2 R t$ Joules = $\\frac{I^2 R t}{4.184}$ calories.'
      ],
      variables: [
        { sym: 'P', name: 'Electrical Power', unit: 'Watts (W)' },
        { sym: 'W', name: 'Electrical Energy', unit: 'Joules (J) or kWh' },
        { sym: 'V', name: 'Voltage across component', unit: 'Volts (V)' },
        { sym: 'I', name: 'Current through component', unit: 'Amperes (A)' },
        { sym: 'R', name: 'Resistance', unit: 'Ohms (Ω)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Power from Work and Charge', math: 'P = \\frac{dw}{dt} = \\frac{dw}{dq} \\cdot \\frac{dq}{dt} = V \\cdot I', text: 'dw/dq is definition of potential V; dq/dt is definition of current I. Hence P = V · I.' },
        { step: 2, title: 'Substitution of Ohm’s Law', math: 'P = V \\cdot I = (I \\cdot R) \\cdot I = I^2 R = V \\cdot \\left(\\frac{V}{R}\\right) = \\frac{V^2}{R}', text: 'Shows that doubling current quadruples power dissipation!' }
      ],
      example: {
        problem: 'An electric water geyser rated at 2000 W, 230 V operates for 3 hours daily. Calculate: (a) resistance of heating element, (b) current drawn, and (c) monthly cost of operation at ₹8.00 per unit (kWh) for 30 days.',
        solution: `Analysis:
  (a) Resistance:
      P = V² / R  ⟹  R = V² / P = (230)² / 2000 = 52,900 / 2000 = 26.45 Ω
  (b) Current Drawn:
      I = P / V = 2000 W / 230 V = 8.70 A
  (c) Energy Consumed:
      Daily Energy = P × t = 2 kW × 3 h = 6.0 kWh (Units)
      Monthly Energy (30 days) = 6.0 × 30 = 180 kWh
      Monthly Electricity Bill = 180 Units × ₹8.00 = ₹1,440.00`
      },
      commonMistakes: [
        'Confusing Power (Watts) with Energy (Watt-hours or Joules). Power is instantaneous capacity; Energy is total consumed over time.',
        'Assuming a 100W bulb has more resistance than a 40W bulb. At fixed 230V, $R = V^2/P$, so lower power means HIGHER resistance!'
      ],
      realWorldApp: 'CPU coolers and heat pipes are engineered directly based on Thermal Design Power (TDP in Watts) to prevent silicon thermal throttling.',
      simType: 'power_energy_calc',
      quiz: [
        { q: 'If current flowing through a fixed resistor is doubled, the power dissipated will:', opts: ['Double', 'Halve', 'Quadruple (4×)', 'Remain unchanged'], ans: 2, exp: 'Because P = I²R, power varies with the square of current. Doubling I increases P by 2² = 4 times.' },
        { q: 'How many Joules are in 1 kilowatt-hour (1 kWh)?', opts: ['1,000 J', '360,000 J', '3,600,000 J (3.6 MJ)', '3,600 J'], ans: 2, exp: '1 kWh = 1000 W × 3600 s = 3,600,000 Joules = 3.6 MJ.' }
      ]
    },

    {
      id: 'u1_t09',
      unitId: 'u1',
      topicNum: '1.9',
      title: 'Electrical Energy Sources: Independent & Dependent',
      badge: 'Network Theory',
      concept: 'Electrical sources inject power into circuits. Independent sources maintain their specified voltage or current regardless of other circuit variables (Constant DC batteries or Time-variant AC generators). Dependent (controlled) sources produce a voltage or current governed by a controlling voltage or current elsewhere in the circuit (VCVS, VCCS, CCVS, CCCS, symbolized by diamonds).',
      whyItMatters: 'Dependent sources are the universal mathematical models for active electronic devices: BJT transistors are modeled as CCCS, FETs as VCCS, and Op-Amps as VCVS.',
      mathHtml: `<div class="math-eq"><span>\\text{VCVS: } V = \\mu V_{\\text{in}} \\quad | \\quad \\text{VCCS: } I = g_m V_{\\text{in}} \\quad | \\quad \\text{CCVS: } V = r I_{\\text{in}} \\quad | \\quad \\text{CCCS: } I = \\beta I_{\\text{in}}</span></div>`,
      lines: [
        '<b>Ideal vs. Practical Voltage Source:</b> Ideal voltage source has ZERO internal resistance ($R_s = 0$). Practical voltage source has small series internal resistance ($R_s > 0$).',
        '<b>Ideal vs. Practical Current Source:</b> Ideal current source has INFINITE internal resistance ($R_s = \\infty$). Practical current source has high parallel shunt resistance ($R_s < \\infty$).',
        '<b>Voltage-Controlled Voltage Source (VCVS):</b> $V_{\\text{out}} = \\mu \\cdot V_{\\text{in}}$ (gain $\\mu$ is dimensionless; model for Op-Amps).',
        '<b>Voltage-Controlled Current Source (VCCS):</b> $I_{\\text{out}} = g_m \\cdot V_{\\text{in}}$ ($g_m$ is transconductance in Siemens; model for MOSFETs).',
        '<b>Current-Controlled Voltage Source (CCVS):</b> $V_{\\text{out}} = r \\cdot I_{\\text{in}}$ ($r$ is transresistance in Ohms).',
        '<b>Current-Controlled Current Source (CCCS):</b> $I_{\\text{out}} = \\beta \\cdot I_{\\text{in}}$ (gain $\\beta$ is current gain; model for BJTs).'
      ],
      variables: [
        { sym: 'μ', name: 'Voltage Gain (VCVS)', unit: 'Dimensionless' },
        { sym: 'g_m', name: 'Transconductance (VCCS)', unit: 'Siemens (A/V)' },
        { sym: 'r', name: 'Transresistance (CCVS)', unit: 'Ohms (V/A)' },
        { sym: 'β', name: 'Current Gain (CCCS)', unit: 'Dimensionless' }
      ],
      derivationSteps: [
        { step: 1, title: 'Source Transformation Principle', math: 'V_s = I_s \\cdot R_s \\quad \\Longleftrightarrow \\quad I_s = \\frac{V_s}{R_s}', text: 'A practical voltage source (Vs in series with Rs) is electrically equivalent to a practical current source (Is in parallel with Rs).' }
      ],
      example: {
        problem: 'A dependent VCVS has gain μ = 25. If the input controlling voltage is measured as 120 mV, what is the output voltage?',
        solution: `Given Data:
  • Controlling Voltage Vin = 120 mV = 0.120 V
  • Voltage Gain μ = 25

Formula:
  Vout = μ · Vin

Calculation:
  Vout = 25 × 0.120 V = 3.00 Volts

Final Answer:
  Output voltage of the VCVS = 3.00 V.`
      },
      commonMistakes: [
        'Treating dependent sources as independent when applying superposition theorem. Dependent sources must NOT be turned off (shorted or opened) during superposition!',
        'Assuming ideal current source voltage is fixed. An ideal current source forces a fixed current; its terminal voltage adjusts to whatever the load requires.'
      ],
      realWorldApp: 'Small-signal equivalent models of bipolar junction transistors (h-parameters) and operational amplifier circuits rely exclusively on dependent sources.',
      simType: 'sources_sim',
      quiz: [
        { q: 'What is the internal resistance of an ideal voltage source and an ideal current source?', opts: ['Zero for both', 'Infinite for both', 'Zero for voltage source; Infinite for current source', 'Infinite for voltage source; Zero for current source'], ans: 2, exp: 'An ideal voltage source maintains voltage regardless of current (R_int = 0); an ideal current source maintains current regardless of load (R_int = ∞).' },
        { q: 'What parameter relates output current to input voltage in a VCCS?', opts: ['Current gain β', 'Transconductance gm (Siemens)', 'Transresistance r (Ohms)', 'Voltage gain μ'], ans: 1, exp: 'In a VCCS, I_out = gm · V_in, where gm is transconductance (A/V or Siemens).' }
      ]
    },

    {
      id: 'u1_t10',
      unitId: 'u1',
      topicNum: '1.10',
      title: 'Inductance, Faraday’s Law & Lenz’s Law',
      badge: 'Electromagnetics',
      concept: 'Inductance ($L$) is the property of an electrical conductor or coil to oppose any change in current flowing through it. According to Faraday’s Law of Electromagnetic Induction and Lenz’s Law, a changing current produces a changing magnetic flux, inducing a counter-electromotive force (back EMF: $e = -L \\frac{di}{dt}$). Energy is stored in the magnetic field: $E = \\frac{1}{2} L I^2$.',
      whyItMatters: 'Inductors are crucial for filtering power supplies, switch-mode converters (buck/boost), wireless power chargers, transformers, and fluorescent lamp chokes.',
      mathHtml: `<div class="math-eq"><span>e = -L \\frac{di}{dt} \\quad | \\quad L = \\frac{\\mu N^2 A}{l} \\quad | \\quad E = \\frac{1}{2} L I^2</span></div>`,
      lines: [
        '<b>Back EMF ($e$):</b> Self-induced voltage opposes the causative change in current (Lenz’s Law negative sign).',
        '<b>Coil Inductance Formula:</b> $L = \\frac{\\mu_0 \\mu_r N^2 A}{l}$ (varies with square of turns $N^2$ and core relative permeability $\\mu_r$).',
        '<b>Unit of Inductance:</b> 1 Henry (H) = 1 Volt-second per Ampere ($1\\text{ H} = 1\\text{ V}\\cdot\\text{s/A}$).',
        '<b>Energy Storage in Magnetic Field:</b> $E = \\frac{1}{2} L I^2$ Joules.',
        '<b>DC Behavior:</b> In steady-state DC, current is constant ($di/dt = 0$), so an ideal inductor acts as a perfect short circuit ($V_L = 0$).'
      ],
      variables: [
        { sym: 'L', name: 'Self-Inductance', unit: 'Henries (H)' },
        { sym: 'N', name: 'Number of wire turns', unit: 'Turns' },
        { sym: 'A', name: 'Core cross-sectional area', unit: 'm²' },
        { sym: 'l', name: 'Magnetic path length', unit: 'Meters (m)' },
        { sym: 'μ_r', name: 'Relative permeability of core', unit: 'Dimensionless' }
      ],
      derivationSteps: [
        { step: 1, title: 'Self-Induced EMF Formulation', math: 'e = -N \\frac{d\\Phi}{dt} = -N \\frac{d(B A)}{dt} = -\\frac{N A \\mu N}{l} \\frac{di}{dt} = -L \\frac{di}{dt}', text: 'Equating Faraday’s flux linkage formulation yields L = (N·Φ)/i = (μ N² A)/l.' },
        { step: 2, title: 'Magnetic Energy Integration', math: 'E = \\int P \\, dt = \\int (L \\frac{di}{dt}) i \\, dt = L \\int_0^I i \\, di = \\frac{1}{2} L I^2', text: 'Integrating instantaneous power delivered during current ramp-up.' }
      ],
      example: {
        problem: 'A solenoid coil of inductance 0.5 H carries a steady DC current of 4.0 A. If a circuit switch is opened and the current drops to zero in 10 ms, calculate: (a) the average self-induced back EMF, and (b) initial stored magnetic energy.',
        solution: `Given Data:
  • Inductance L = 0.5 H
  • Initial Current I₁ = 4.0 A, Final Current I₂ = 0 A ⟹ ΔI = 0 - 4.0 = -4.0 A
  • Time duration Δt = 10 ms = 10 × 10⁻³ s = 0.010 s

Calculations:
  (a) Self-Induced EMF:
      e = -L (ΔI / Δt) = -0.5 × (-4.0 A / 0.010 s) = +200 Volts
  (b) Stored Magnetic Energy:
      E = ½ L I² = 0.5 × 0.5 H × (4.0 A)² = 0.25 × 16 = 4.0 Joules

Final Answer:
  Back EMF induced = 200 V (causes arc across opening switch contacts!).
  Stored Magnetic Energy = 4.0 Joules.`
      },
      commonMistakes: [
        'Forgetting that inductors resist instantaneous change in CURRENT, not voltage. Current through an inductor cannot change instantaneously.',
        'Ignoring inductive kickback voltage when turning off relays or solenoids without a freewheeling flyback diode.'
      ],
      realWorldApp: 'Flyback diodes are placed across relay coils to safely recirculate inductive current when switched off, preventing transistor burnout.',
      simType: 'inductor_transient',
      quiz: [
        { q: 'In steady-state DC operation, an ideal inductor behaves as a:', opts: ['Open circuit', 'Short circuit', 'Pure resistor', 'Capacitor'], ans: 1, exp: 'In steady-state DC, current is constant (di/dt = 0), so voltage drop e = L(di/dt) = 0, behaving as a short circuit.' },
        { q: 'If the number of turns in an inductor coil is doubled while geometry remains constant, inductance will:', opts: ['Double', 'Halve', 'Quadruple (4×)', 'Remain unchanged'], ans: 2, exp: 'Inductance varies with the square of turns: L ∝ N². Doubling N results in 2² = 4 times the inductance.' }
      ]
    },

    {
      id: 'u1_t11',
      unitId: 'u1',
      topicNum: '1.11',
      title: 'Capacitance & Energy Stored in Dielectric',
      badge: 'Electric Fields',
      concept: 'Capacitance ($C$) is the capacity of two conducting plates separated by an insulator (dielectric) to store electric charge per unit potential difference across them ($C = \\frac{Q}{V}$). Charging current is proportional to the rate of voltage change ($i = C \\frac{dv}{dt}$). Energy resides in the electrostatic strain field within the dielectric: $E = \\frac{1}{2} C V^2$.',
      whyItMatters: 'Capacitors smooth rectified AC ripples in DC power supplies, provide power supply decoupling for high-speed processors, and block DC while passing AC signals in audio amplifiers.',
      mathHtml: `<div class="math-eq"><span>C = \\frac{Q}{V} \\quad | \\quad i = C \\frac{dv}{dt} \\quad | \\quad E = \\frac{1}{2} C V^2 = \\frac{1}{2} Q V = \\frac{1}{2} \\frac{Q^2}{C}</span></div>`,
      lines: [
        '<b>Definition of 1 Farad:</b> A capacitor has 1 Farad capacitance if storing 1 Coulomb creates a potential difference of 1 Volt.',
        '<b>Current Proportionality:</b> $i = C \\frac{dv}{dt}$. When voltage is constant DC, $dv/dt = 0$, so capacitor blocks DC (acts as open circuit).',
        '<b>Voltage Continuity:</b> Voltage across a capacitor CANNOT change instantaneously ($dv/dt = \\infty$ would require infinite current).',
        '<b>Stored Energy Location:</b> Stored in the dielectric’s polarized electrostatic field, not on the metal plates themselves.'
      ],
      variables: [
        { sym: 'C', name: 'Capacitance', unit: 'Farads (F)' },
        { sym: 'Q', name: 'Stored Charge', unit: 'Coulombs (C)' },
        { sym: 'V', name: 'Plate Voltage', unit: 'Volts (V)' },
        { sym: 'E', name: 'Stored Energy', unit: 'Joules (J)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Charging Current Derivation', math: 'i = \\frac{dQ}{dt} = \\frac{d(C \\cdot v)}{dt} = C \\frac{dv}{dt}', text: 'Differentiating charge relation Q = C·V with respect to time.' },
        { step: 2, title: 'Energy Integral', math: 'E = \\int v \\, dq = \\int_0^V v (C \\, dv) = C \\left[ \\frac{v^2}{2} \\right]_0^V = \\frac{1}{2} C V^2', text: 'Work done by source to charge capacitor plates from 0 to V volts.' }
      ],
      example: {
        problem: 'A 220 μF electrolytic capacitor in a power supply filter charges to 50 V. Calculate: (a) stored charge, and (b) stored electrostatic energy.',
        solution: `Given Data:
  • Capacitance C = 220 μF = 220 × 10⁻⁶ F
  • Terminal Voltage V = 50 V

Calculations:
  (a) Stored Charge:
      Q = C · V = (220 × 10⁻⁶ F) × 50 V = 0.011 Coulombs = 11 mC
  (b) Stored Energy:
      E = ½ C V² = 0.5 × (220 × 10⁻⁶) × (50)² = 0.5 × (220 × 10⁻⁶) × 2500 = 0.275 Joules

Final Answer:
  Stored Charge Q = 11 mC.
  Stored Energy E = 0.275 J.`
      },
      commonMistakes: [
        'Assuming DC current flows through the dielectric insulator. Only a displacement/charging current flows in external wires until plates reach supply EMF.',
        'Connecting polarized electrolytic capacitors backwards, causing dielectric breakdown and venting/explosion.'
      ],
      realWorldApp: 'Defibrillators in ambulances use large high-voltage capacitors charged to ~2000V (~360 Joules) discharged across the patient’s chest in milliseconds to restore cardiac rhythm.',
      simType: 'capacitor_transient',
      quiz: [
        { q: 'In a steady-state DC circuit, an ideal capacitor acts as an:', opts: ['Short circuit', 'Open circuit', 'Inductor', 'Oscillator'], ans: 1, exp: 'In steady-state DC, dv/dt = 0, so i = C(dv/dt) = 0, meaning zero current flows (open circuit).' },
        { q: 'If the voltage across a capacitor is doubled, its stored electrostatic energy will:', opts: ['Double', 'Halve', 'Quadruple (4×)', 'Remain unchanged'], ans: 2, exp: 'Stored energy E = ½ C V² depends on the square of voltage. Doubling V increases energy by 2² = 4 times.' }
      ]
    },

    {
      id: 'u1_t12',
      unitId: 'u1',
      topicNum: '1.12',
      title: 'Resistance, Resistivity & Ohm’s Law',
      badge: 'Foundational Law',
      concept: 'Resistance ($R$) is the property of a substance to oppose the flow of electric current, converting electrical energy into heat through free electron collisions with lattice ions. For a uniform conductor: $R = \\rho \\frac{l}{A}$. Ohm’s Law states that at constant temperature and physical conditions, the potential difference across a conductor is directly proportional to the current flowing through it ($V = I R$). Conductance is the reciprocal of resistance ($G = 1/R$, Siemens).',
      whyItMatters: 'The single most widely used equation in electrical engineering ($V = IR$). Dictates resistor selection, voltage drops, power dissipation, and wire sizing.',
      mathHtml: `<div class="math-eq"><span>V = I \\cdot R \\quad | \\quad R = \\rho \\frac{l}{A} \\quad | \\quad G = \\frac{1}{R} = \\sigma \\frac{A}{l}</span></div>`,
      lines: [
        '<b>Factors Affecting Resistance:</b> Directly proportional to length $l$ ($R \\propto l$), inversely proportional to cross-sectional area $A$ ($R \\propto 1/A$), depends on material resistivity $\\rho$ and temperature.',
        '<b>Resistivity (Specific Resistance $\\rho$):</b> Resistance of a unit cube ($1\\text{ m} \\times 1\\text{ m} \\times 1\\text{ m}$) of material: $\\rho = \\frac{R A}{l}$ (Unit: $\\Omega\\cdot\\text{m}$).',
        '<b>Conductance ($G$):</b> Ease with which current flows: $G = 1/R$ (Unit: Siemens, S).',
        '<b>Ohm’s Law Conditions:</b> Applies strictly to metallic (Ohmic) conductors at CONSTANT temperature.',
        '<b>Limitations:</b> Does NOT apply to non-linear devices (diodes, transistors, vacuum tubes, thyristors, arc lamps) or non-metallic conductors under high electric fields.'
      ],
      variables: [
        { sym: 'R', name: 'Resistance', unit: 'Ohms (Ω)' },
        { sym: 'ρ', name: 'Electrical Resistivity', unit: 'Ohm-meters (Ω·m)' },
        { sym: 'l', name: 'Length of conductor', unit: 'Meters (m)' },
        { sym: 'A', name: 'Cross-sectional area', unit: 'Square meters (m²)' },
        { sym: 'G', name: 'Conductance (1/R)', unit: 'Siemens (S)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Wire Drawing / Volume Conservation', math: '\\text{Volume } V = A_1 \\cdot l_1 = A_2 \\cdot l_2 \\implies A_2 = A_1 \\left(\\frac{l_1}{l_2}\\right)', text: 'When a wire is stretched to n times original length, area decreases to A/n.' },
        { step: 2, title: 'Stretched Resistance Factor', math: 'R_2 = \\rho \\frac{l_2}{A_2} = \\rho \\frac{n l_1}{A_1 / n} = n^2 \\left(\\rho \\frac{l_1}{A_1}\\right) = n^2 R_1', text: 'Drawing a wire to 3× length increases its resistance by 3² = 9 times!' }
      ],
      example: {
        problem: 'A copper wire 100 m long has a cross-sectional area of 2.0 mm² and resistivity ρ = 1.72 × 10⁻⁸ Ω·m. (a) Find its resistance. (b) If the wire is drawn out without loss of mass to 3 times its original length, determine its new resistance.',
        solution: `Given Data:
  • Length l₁ = 100 m
  • Area A₁ = 2.0 mm² = 2.0 × 10⁻⁶ m²
  • Resistivity ρ = 1.72 × 10⁻⁸ Ω·m

Calculations:
  (a) Original Resistance R₁:
      R₁ = ρ (l₁ / A₁) = (1.72 × 10⁻⁸ × 100) / (2.0 × 10⁻⁶) = 1.72 × 10⁻⁶ / 2.0 × 10⁻⁶ = 0.86 Ω
  (b) Drawn Wire Resistance R₂:
      Since volume is conserved: A₁ l₁ = A₂ l₂
      Given l₂ = 3 l₁, then A₂ = A₁ / 3
      R₂ = ρ (l₂ / A₂) = ρ (3 l₁ / [A₁ / 3]) = 9 × [ρ (l₁ / A₁)] = 9 × R₁
      R₂ = 9 × 0.86 Ω = 7.74 Ω

Final Answer:
  Original Resistance = 0.86 Ω.
  New Stretched Resistance = 7.74 Ω (increases by factor of 3² = 9).`
      },
      commonMistakes: [
        'Assuming drawing a wire to double length only doubles resistance. Because cross-sectional area shrinks to half, resistance quadruples ($n^2 = 4$)!',
        'Applying Ohm’s Law directly to semiconductor diodes or Zener regulators (they have non-linear dynamic resistance $r_d = \\Delta V / \\Delta I$).'
      ],
      realWorldApp: 'Strain gauges in aerospace and bridge monitoring measure microscopic structural stretching by detecting minuscule changes in wire resistance ($R \\propto l/A$).',
      simType: 'ohms_law_vi_curve',
      quiz: [
        { q: 'If a wire of resistance R is stretched uniformly to twice its original length, its new resistance will be:', opts: ['2 R', '4 R', 'R / 2', 'R / 4'], ans: 1, exp: 'Volume is constant. If length doubles (2l), area halves (A/2). New resistance R_new = ρ(2l)/(A/2) = 4 [ρ l / A] = 4 R.' },
        { q: 'Which of the following is a non-Ohmic device?', opts: ['Copper wire', 'Manganin coil resistor', 'Semiconductor Diode', 'Carbon composition resistor'], ans: 2, exp: 'A semiconductor diode has a non-linear exponential V-I curve and does not obey Ohm’s law.' }
      ]
    },

    {
      id: 'u1_t13',
      unitId: 'u1',
      topicNum: '1.13',
      title: 'Effect of Temperature on Resistance & Temp Coefficient (α)',
      badge: 'Thermal Physics',
      concept: 'The electrical resistance of conductors changes with temperature. Pure metals have a Positive Temperature Coefficient (PTC), where increased thermal lattice vibration increases electron scattering. Semiconductors and insulators have a Negative Temperature Coefficient (NTC), where heat liberates additional valence electrons. The temperature coefficient of resistance ($\\alpha$) is the fractional increase in resistance per degree Celsius rise.',
      whyItMatters: 'Critical for motor winding temperature estimation, electric furnace heating elements, and temperature sensors (RTDs like PT100 and thermistors).',
      mathHtml: `<div class="math-eq"><span>R_t = R_0 (1 + \\alpha_0 t) \\quad | \\quad \\frac{R_2}{R_1} = \\frac{1 + \\alpha_0 t_2}{1 + \\alpha_0 t_1} = \\frac{t_2 - t_0}{t_1 - t_0} \\quad | \\quad \\alpha_t = \\frac{\\alpha_0}{1 + \\alpha_0 t}</span></div>`,
      lines: [
        '<b>Pure Metals (PTC):</b> Resistance increases linearly with temperature over normal ranges: Copper $\\alpha_0 \\approx 0.00427\\text{ /^\\circ C}$, Aluminum $\\alpha_0 \\approx 0.0039\\text{ /^\\circ C}$.',
        '<b>Alloys (Manganin, Constantan):</b> Almost ZERO temperature coefficient ($\\\\alpha \\approx 0$). Used for precision laboratory standard resistors.',
        '<b>Semiconductors & Insulators (NTC):</b> Resistance drops exponentially with temperature ($\\\\alpha < 0$).',
        '<b>Inferred Zero Resistance Temperature ($t_0$):</b> Extrapolating the resistance-temperature line backwards to zero resistance: for Copper, $t_0 = -234.5^\\circ\\text{C}$.',
        '<b>Temperature Coefficient Variation:</b> $\\alpha$ decreases as initial temperature increases: $\\alpha_t = \\frac{\\alpha_0}{1 + \\alpha_0 t} = \\frac{1}{|t_0| + t}$.'
      ],
      variables: [
        { sym: 'R_0', name: 'Resistance at 0°C', unit: 'Ohms (Ω)' },
        { sym: 'R_t', name: 'Resistance at temperature t°C', unit: 'Ohms (Ω)' },
        { sym: 'α_0', name: 'Temperature coefficient at 0°C', unit: 'per °C (/°C)' },
        { sym: 'α_t', name: 'Temperature coefficient at t°C', unit: 'per °C (/°C)' },
        { sym: 't_0', name: 'Inferred absolute zero resistance temp', unit: '-234.5°C for Copper' }
      ],
      derivationSteps: [
        { step: 1, title: 'Resistance Ratio Formula', math: '\\frac{R_2}{R_1} = \\frac{R_0 (1 + \\alpha_0 t_2)}{R_0 (1 + \\alpha_0 t_1)} = \\frac{1 + \\alpha_0 t_2}{1 + \\alpha_0 t_1}', text: 'Eliminates R₀, allowing calculation between any two arbitrary operating temperatures t₁ and t₂.' },
        { step: 2, title: 'Inferred Zero Equivalence', math: '\\frac{R_2}{R_1} = \\frac{t_2 + 234.5}{t_1 + 234.5} \\quad (\\text{for annealed copper})', text: 'Geometric similar triangles from the inferred zero resistance intercept.' }
      ],
      example: {
        problem: 'The field coil of an electric motor has a resistance of 12.0 Ω at room temperature 20°C. After running on full load for 4 hours, its resistance rises to 14.2 Ω. Find the average temperature rise of the coil. Take α₀ = 0.00427 /°C.',
        solution: `Given Data:
  • R₁ = 12.0 Ω at t₁ = 20°C
  • R₂ = 14.2 Ω at t₂ = ?
  • α₀ = 0.00427 /°C

Method 1 (Using Inferred Zero t₀ = -1/α₀ = -1/0.00427 = -234.2°C):
  (R₂ / R₁) = (t₂ + 234.2) / (t₁ + 234.2)
  (14.2 / 12.0) = (t₂ + 234.2) / (20 + 234.2)
  1.1833 = (t₂ + 234.2) / 254.2
  t₂ + 234.2 = 1.1833 × 254.2 = 300.8°C
  t₂ = 300.8 - 234.2 = 66.6°C

Temperature Rise:
  Δt = t₂ - t₁ = 66.6°C - 20.0°C = 46.6°C

Final Answer:
  Final coil temperature = 66.6°C.
  Temperature rise Δt = 46.6°C.`
      },
      commonMistakes: [
        'Using α at 20°C in the formula for 0°C without conversion. Remember: $\\alpha_{20} = \\alpha_0 / (1 + 20\\alpha_0)$.',
        'Assuming resistance increases forever; at extreme temperatures, materials melt or undergo phase transformations.'
      ],
      realWorldApp: 'Motor and transformer temperature rise tests (Class B: 80°C rise, Class F: 105°C rise) measure winding resistance changes directly to prevent insulation thermal breakdown.',
      simType: 'temp_resistance_curve',
      quiz: [
        { q: 'What type of temperature coefficient does an alloy like Manganin possess?', opts: ['Large positive coefficient', 'Large negative coefficient', 'Nearly zero temperature coefficient', 'Exponential coefficient'], ans: 2, exp: 'High-resistance alloys like Manganin and Constantan have nearly zero temperature coefficients, making them ideal for laboratory standard resistors.' },
        { q: 'For annealed copper with inferred zero temperature t₀ = -234.5°C, what is the ratio of resistance at 100°C to resistance at 0°C?', opts: ['1.00', '1.426', '2.00', '0.50'], ans: 1, exp: 'R_100 / R_0 = (100 + 234.5) / (0 + 234.5) = 334.5 / 234.5 = 1.426.' }
      ]
    },

    {
      id: 'u1_t14',
      unitId: 'u1',
      topicNum: '1.14',
      title: 'Resistor Color Coding (4-Band & 5-Band System)',
      badge: 'Practical Electronics',
      concept: 'Fixed carbon film and metal film resistors use international standard colored bands marked on their cylindrical bodies to represent their nominal resistance and tolerance. The mnemonic BBROYGBVGW helps memorize digit values (0 through 9): Black(0), Brown(1), Red(2), Orange(3), Yellow(4), Green(5), Blue(6), Violet(7), Gray(8), White(9).',
      whyItMatters: 'Allows instant identification of component values on circuit boards without needing a multimeter.',
      mathHtml: `<div class="math-eq"><span>R = (\\text{Digit}_1 \\cdot 10 + \\text{Digit}_2) \\times 10^{\\text{Multiplier}} \\pm \\text{Tolerance}\\%</span></div>`,
      lines: [
        '<b>4-Band Resistors:</b> Band 1 = 1st digit, Band 2 = 2nd digit, Band 3 = Decimal Multiplier, Band 4 = Tolerance.',
        '<b>5-Band Precision Resistors:</b> Band 1 = 1st digit, Band 2 = 2nd digit, Band 3 = 3rd digit, Band 4 = Multiplier, Band 5 = Tolerance.',
        '<b>Standard Tolerances:</b> Gold = ±5%, Silver = ±10%, Brown = ±1%, Red = ±2%, None = ±20%.',
        '<b>Gold & Silver Multipliers:</b> Gold = ×0.1 ($10^{-1}$), Silver = ×0.01 ($10^{-2}$).',
        '<b>Mnemonic:</b> "B B R O Y of Great Britain had a Very Good Wife".'
      ],
      variables: [
        { sym: 'Band 1-3', name: 'Significant Value Digits', unit: '0 to 9' },
        { sym: 'Multiplier', name: 'Power of 10 multiplier', unit: '10^x' },
        { sym: 'Tolerance', name: 'Manufacture margin of error', unit: '±%' }
      ],
      derivationSteps: [
        { step: 1, title: 'Value Decoding Formula', math: 'R = [D_1 D_2] \\times 10^M \\pm \\text{Tol}\\%', text: 'Example: Yellow(4), Violet(7), Red(2), Gold(±5%) = 47 × 10² = 4700 Ω = 4.7 kΩ ± 5%.' }
      ],
      example: {
        problem: 'Identify the resistance and acceptable manufacturing range of a 4-band resistor with color sequence: Brown - Black - Orange - Gold.',
        solution: `Color Code Breakdown:
  • Band 1 (Brown): 1st digit = 1
  • Band 2 (Black): 2nd digit = 0
  • Band 3 (Orange): Multiplier = 10³ = 1,000
  • Band 4 (Gold): Tolerance = ±5%

Calculation:
  Nominal Resistance R = 10 × 10³ Ω = 10,000 Ω = 10 kΩ
  Tolerance Range (±5% of 10,000 Ω):
  Tolerance = ± (0.05 × 10,000) = ± 500 Ω
  Minimum Acceptable Value = 10,000 - 500 = 9,500 Ω (9.5 kΩ)
  Maximum Acceptable Value = 10,000 + 500 = 10,500 Ω (10.5 kΩ)

Final Answer:
  Resistance = 10 kΩ ± 5% (Acceptable range: 9.5 kΩ to 10.5 kΩ).`
      },
      commonMistakes: [
        'Reading the bands backwards (reading from tolerance band first). The tolerance band (gold/silver) is spaced noticeably further from the other bands.',
        'Confusing Brown (1) and Red (2) under poor fluorescent workshop lighting.'
      ],
      realWorldApp: 'PCB assembly and electronics prototyping on breadboards require instant visual color-code reading to troubleshoot circuits.',
      simType: 'resistor_color_tool',
      quiz: [
        { q: 'What is the nominal value of a resistor with bands: Red - Red - Brown - Gold?', opts: ['220 Ω ± 5%', '22 Ω ± 5%', '2.2 kΩ ± 5%', '2200 Ω ± 10%'], ans: 0, exp: 'Red(2), Red(2), Brown(×10¹), Gold(±5%) = 22 × 10 = 220 Ω ± 5%.' },
        { q: 'What tolerance is indicated by a Gold band on a 4-band resistor?', opts: ['±1%', '±2%', '±5%', '±10%'], ans: 2, exp: 'Gold represents ±5% tolerance; Silver represents ±10%.' }
      ]
    },

    /* =========================================================================
     * UNIT 2: ELECTRICAL CIRCUIT ANALYSIS & NETWORK THEOREMS
     * ========================================================================= */
    {
      id: 'u2_t01',
      unitId: 'u2',
      topicNum: '2.1',
      title: 'Resistors in Series & Voltage Division Rule (VDR)',
      badge: 'Series Circuits',
      concept: 'In a series circuit, resistors are connected end-to-end along a single path. The identical current ($I$) passes sequentially through every resistor, while total supply voltage divides across each component ($V = V_1 + V_2 + V_3$). Equivalent resistance is the simple sum: $R_{\\text{eq}} = R_1 + R_2 + R_3$. The Voltage Division Rule states that the voltage drop across any series resistor is proportional to its resistance fraction: $V_1 = V \\frac{R_1}{R_{\\text{eq}}}$.',
      whyItMatters: 'Voltage dividers provide bias voltages in transistor amplifiers, create potentiometer volume controls, and scale high voltages for ADC microcontroller inputs.',
      mathHtml: `<div class="math-eq"><span>R_{\\text{eq}} = \\sum_{i=1}^n R_i \\quad | \\quad V_1 = V_{\\text{total}} \\left( \\frac{R_1}{R_1 + R_2} \\right) \\quad | \\quad P_{\\text{total}} = \\sum P_i</span></div>`,
      lines: [
        '<b>Current Invariance:</b> The current is strictly identical through all components in a series loop: $I_{\\text{total}} = I_1 = I_2 = I_3$.',
        '<b>Voltage Addition (KVL):</b> Total applied EMF equals the algebraic sum of individual voltage drops: $V = I R_1 + I R_2 + I R_3$.',
        '<b>Equivalent Resistance:</b> $R_{\\text{eq}} = R_1 + R_2 + \\dots + R_n$. Equivalent resistance is ALWAYS greater than the largest resistor.',
        '<b>Voltage Division Shortcut:</b> For 2 series resistors: $V_1 = V \\frac{R_1}{R_1 + R_2}$ and $V_2 = V \\frac{R_2}{R_1 + R_2}$.',
        '<b>Disadvantage of Series:</b> If any single component opens or fails, current drops to zero across the entire circuit.'
      ],
      variables: [
        { sym: 'R_eq', name: 'Equivalent Series Resistance', unit: 'Ohms (Ω)' },
        { sym: 'V_total', name: 'Supply Voltage', unit: 'Volts (V)' },
        { sym: 'V_1, V_2', name: 'Individual voltage drops', unit: 'Volts (V)' },
        { sym: 'I', name: 'Loop current', unit: 'Amperes (A)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Applying KVL', math: 'V = V_1 + V_2 = I R_1 + I R_2 = I (R_1 + R_2)', text: 'Dividing total voltage V by common current I gives Req = R₁ + R₂.' },
        { step: 2, title: 'Voltage Division Proof', math: 'V_1 = I R_1 = \\left( \\frac{V}{R_1 + R_2} \\right) R_1 = V \\cdot \\frac{R_1}{R_1 + R_2}', text: 'Voltage across any resistor is its proportional share of total resistance.' }
      ],
      example: {
        problem: 'Two resistors R₁ = 60 Ω and R₂ = 40 Ω are connected in series across a 120 V DC supply. Calculate: (a) equivalent resistance, (b) circuit current, (c) voltage drop across each resistor using VDR, and (d) power dissipated in each.',
        solution: `Given Data:
  • R₁ = 60 Ω, R₂ = 40 Ω
  • V = 120 V

Step-by-Step Calculation:
  (a) Equivalent Resistance:
      R_eq = R₁ + R₂ = 60 + 40 = 100 Ω
  (b) Circuit Current:
      I = V / R_eq = 120 V / 100 Ω = 1.2 A
  (c) Voltage Drops using VDR:
      V₁ = V × (R₁ / R_eq) = 120 × (60 / 100) = 72 Volts
      V₂ = V × (R₂ / R_eq) = 120 × (40 / 100) = 48 Volts
      (Check: 72V + 48V = 120V ✓)
  (d) Power Dissipated:
      P₁ = I² R₁ = (1.2)² × 60 = 1.44 × 60 = 86.4 W
      P₂ = I² R₂ = (1.2)² × 40 = 1.44 × 40 = 57.6 W
      Total Power = 86.4 + 57.6 = 144 W (Check: V × I = 120 × 1.2 = 144 W ✓)`
      },
      commonMistakes: [
        'Attempting to connect household appliances in series. If one bulb blows out, all lights turn off, and each gets insufficient voltage!',
        'Inverting the VDR formula (putting R₂ in the numerator for V₁). In VDR, the resistor whose voltage you want is in the numerator.'
      ],
      realWorldApp: 'Potentiometer dials on guitar volume knobs and analog audio consoles are variable voltage dividers.',
      simType: 'series_circuit_sim',
      quiz: [
        { q: 'Three resistors of 10 Ω, 20 Ω, and 30 Ω are connected in series. What is the equivalent resistance?', opts: ['60 Ω', '5.45 Ω', '30 Ω', '10 Ω'], ans: 0, exp: 'R_eq = R₁ + R₂ + R₃ = 10 + 20 + 30 = 60 Ω.' },
        { q: 'In a series circuit with 24V applied across R₁ = 8 Ω and R₂ = 16 Ω, what is the voltage across R₁?', opts: ['16 V', '8 V', '12 V', '24 V'], ans: 1, exp: 'Using VDR: V₁ = 24 × (8 / [8 + 16]) = 24 × (8 / 24) = 8 V.' }
      ]
    },

    {
      id: 'u2_t02',
      unitId: 'u2',
      topicNum: '2.2',
      title: 'Resistors in Parallel & Current Division Rule (CDR)',
      badge: 'Parallel Circuits',
      concept: 'In a parallel circuit, all resistors are connected directly across the same two common nodes, so every branch experiences the IDENTICAL supply voltage ($V = V_1 = V_2$). Total current divides among branches ($I_{\\text{total}} = I_1 + I_2 + I_3$). The equivalent resistance is smaller than the smallest branch resistor: $\\frac{1}{R_{\\text{eq}}} = \\sum \\frac{1}{R_i}$. The Current Division Rule (CDR) states that current in any branch is inversely proportional to its resistance.',
      whyItMatters: 'All residential and commercial electrical wiring is connected in parallel so every appliance receives full 230V mains voltage independently.',
      mathHtml: `<div class="math-eq"><span>\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad \\Longleftrightarrow \\quad R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2} \\quad | \\quad I_1 = I_{\\text{total}} \\left( \\frac{R_2}{R_1 + R_2} \\right)</span></div>`,
      lines: [
        '<b>Voltage Invariance:</b> The terminal voltage across every parallel branch is strictly identical: $V = V_1 = V_2 = V_3$.',
        '<b>Current Addition (KCL):</b> Total current entering the junction equals the sum of branch currents: $I_{\\text{total}} = I_1 + I_2 + \\dots + I_n$.',
        '<b>Two-Resistor Product-over-Sum:</b> $R_{\\text{eq}} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$.',
        '<b>Current Division Rule (Notice OPPOSITE resistor in numerator!):</b> $I_1 = I \\frac{R_2}{R_1 + R_2}$ and $I_2 = I \\frac{R_1}{R_1 + R_2}$.',
        '<b>Path of Least Resistance:</b> Smaller resistance branches carry larger currents ($I \\propto 1/R$).'
      ],
      variables: [
        { sym: 'R_eq', name: 'Equivalent Parallel Resistance', unit: 'Ohms (Ω)' },
        { sym: 'I_total', name: 'Total Supply Current', unit: 'Amperes (A)' },
        { sym: 'I_1, I_2', name: 'Branch currents', unit: 'Amperes (A)' },
        { sym: 'V', name: 'Common branch voltage', unit: 'Volts (V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Applying KCL', math: 'I = I_1 + I_2 = \\frac{V}{R_1} + \\frac{V}{R_2} = V \\left( \\frac{1}{R_1} + \\frac{1}{R_2} \\right) = \\frac{V}{R_{\\text{eq}}}', text: 'Shows that reciprocal of Req equals sum of branch conductances G = G₁ + G₂.' },
        { step: 2, title: 'CDR Proof', math: 'I_1 = \\frac{V}{R_1} = \\frac{I \\cdot R_{\\text{eq}}}{R_1} = \\frac{I \\left(\\frac{R_1 R_2}{R_1 + R_2}\\right)}{R_1} = I \\left( \\frac{R_2}{R_1 + R_2} \\right)', text: 'The current in branch 1 has R₂ in the numerator because higher R₂ forces more current into R₁!' }
      ],
      example: {
        problem: 'Two parallel resistors R₁ = 30 Ω and R₂ = 20 Ω carry a combined total current of 10 A. Calculate: (a) equivalent resistance, (b) branch currents using CDR, (c) common voltage across the network, and (d) power dissipated in each.',
        solution: `Given Data:
  • R₁ = 30 Ω, R₂ = 20 Ω
  • Total Current I = 10 A

Step-by-Step Calculation:
  (a) Equivalent Resistance (Product / Sum):
      R_eq = (R₁ × R₂) / (R₁ + R₂) = (30 × 20) / (30 + 20) = 600 / 50 = 12.0 Ω
  (b) Branch Currents using CDR:
      I₁ = I × [R₂ / (R₁ + R₂)] = 10 A × [20 / (30 + 20)] = 10 × (20 / 50) = 4.0 A
      I₂ = I × [R₁ / (R₁ + R₂)] = 10 A × [30 / (30 + 20)] = 10 × (30 / 50) = 6.0 A
      (Check: 4A + 6A = 10A ✓)
  (c) Common Voltage:
      V = I × R_eq = 10 A × 12.0 Ω = 120 Volts
      (Check: I₁ R₁ = 4 × 30 = 120V, I₂ R₂ = 6 × 20 = 120V ✓)
  (d) Power Dissipated:
      P₁ = I₁² R₁ = (4)² × 30 = 16 × 30 = 480 W
      P₂ = I₂² R₂ = (6)² × 20 = 36 × 20 = 720 W
      Total Power = 480 + 720 = 1200 W (Check: V × I = 120 × 10 = 1200 W ✓)`
      },
      commonMistakes: [
        'Putting R₁ in the numerator for I₁ in CDR. That is the formula for VDR! For CDR, use the OPPOSITE branch resistor in the numerator.',
        'Adding parallel resistances directly ($R_1 + R_2$). In parallel, equivalent resistance is ALWAYS LESS than the smallest resistor!'
      ],
      realWorldApp: 'Home electrical outlets: all appliances connect in parallel across 230V mains so turning off a lamp doesn’t turn off the refrigerator.',
      simType: 'parallel_circuit_sim',
      quiz: [
        { q: 'What is the equivalent resistance of two 100 Ω resistors connected in parallel?', opts: ['200 Ω', '100 Ω', '50 Ω', '25 Ω'], ans: 2, exp: 'For identical parallel resistors: R_eq = R / n = 100 / 2 = 50 Ω.' },
        { q: 'A total current of 12 A enters a parallel pair of R₁ = 4 Ω and R₂ = 8 Ω. What is the current in R₁?', opts: ['4 A', '8 A', '6 A', '12 A'], ans: 1, exp: 'Using CDR: I₁ = 12 × (8 / [4 + 8]) = 12 × (8 / 12) = 8 A.' }
      ]
    },

    {
      id: 'u2_t03',
      unitId: 'u2',
      topicNum: '2.3',
      title: 'Series-Parallel Combination Circuits & Household Wiring',
      badge: 'Complex Networks',
      concept: 'Practical circuits combine series and parallel subnetworks. Analysis proceeds by identifying localized series strings (where identical current flows) and parallel pairs (where both ends share common nodes), replacing them with equivalent resistances step-by-step from inside out. Household wiring uses parallel distribution with series safety fuses and switches.',
      whyItMatters: 'Equips engineers to analyze complex schematics on motherboard power delivery networks, sensor interfaces, and power distribution grids.',
      mathHtml: `<div class="math-eq"><span>R_{\\text{total}} = R_1 + (R_2 \\parallel R_3) = R_1 + \\frac{R_2 R_3}{R_2 + R_3}</span></div>`,
      lines: [
        '<b>Reduction Strategy:</b> Start at the point furthest from the source; identify purely series or purely parallel groups; simplify iteratively.',
        '<b>Household Wiring Standards:</b> Appliances are in parallel across Phase and Neutral wires; Switches, Fuses, and MCBs are strictly in SERIES with the live Phase wire.',
        '<b>Safety Ground (Earth Wire):</b> Low-resistance path directly connected to appliance metal chassis to safely trip breakers during insulation faults.'
      ],
      variables: [
        { sym: 'R_total', name: 'Total network input resistance', unit: 'Ohms (Ω)' },
        { sym: 'I_main', name: 'Main battery / supply current', unit: 'Amperes (A)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Step-by-Step Subnetwork Reduction', math: 'R_p = \\frac{R_2 R_3}{R_2 + R_3} \\implies R_{\\text{total}} = R_1 + R_p', text: 'Solve parallel pair first, then add series element.' }
      ],
      example: {
        problem: 'In a bridge circuit, a 10 Ω resistor R₁ is in series with a parallel pair R₂ = 30 Ω and R₃ = 60 Ω across a 60 V DC supply. Find total current and power dissipated in R₂.',
        solution: `Reduction Steps:
  1. Parallel Subnetwork (R₂ ∥ R₃):
     R_p = (30 × 60) / (30 + 60) = 1800 / 90 = 20 Ω
  2. Total Resistance:
     R_total = R₁ + R_p = 10 Ω + 20 Ω = 30 Ω
  3. Total Source Current:
     I_main = V / R_total = 60 V / 30 Ω = 2.0 A
  4. Voltage across Parallel Pair:
     V_p = I_main × R_p = 2.0 A × 20 Ω = 40 Volts
  5. Power in R₂:
     P₂ = V_p² / R₂ = (40)² / 30 = 1600 / 30 = 53.33 Watts`
      },
      commonMistakes: [
        'Connecting a light switch across Phase and Neutral (parallel) instead of in series with Phase. Flipping the switch causes a dead short circuit and trips the main breaker!',
        'Misidentifying resistors as series when an intermediate junction tees off to another branch.'
      ],
      realWorldApp: 'Electric vehicles battery packs connect individual lithium-ion cells in series strings (to achieve 400V or 800V) and parallel blocks (to achieve 100 kWh capacity).',
      simType: 'series_parallel_workbench',
      quiz: [
        { q: 'In household wiring, why are safety switches placed in series with the Phase wire?', opts: ['To save copper wire', 'To disconnect the high-voltage live supply when switched off', 'To decrease electrical current', 'To make appliances run faster'], ans: 1, exp: 'Placing switches in series with the live Phase wire ensures no lethal voltage remains on the appliance socket when turned off.' }
      ]
    },

    {
      id: 'u2_t04',
      unitId: 'u2',
      topicNum: '2.4',
      title: 'Star-Delta (Y-Δ) & Delta-Star (Δ-Y) Transformations',
      badge: 'Network Equivalence',
      concept: 'Three-terminal resistive networks commonly appear as a Star (Y or Wye, 3 resistors meeting at central neutral node) or Delta (Δ or Pi, 3 resistors forming a closed triangle). When resistors are neither in simple series nor parallel (such as in Wheatstone bridges), Star-to-Delta and Delta-to-Star equivalence transformations allow network simplification without altering terminal terminal behavior.',
      whyItMatters: 'Crucial for analyzing unbalanced 3-phase power transmission, motor starters (Star-Delta starting reduces starting current to 1/3), and solving complex bridge circuits.',
      mathHtml: `<div class="math-eq"><span>\\Delta \\to \\text{Y: } R_1 = \\frac{R_b R_c}{R_a + R_b + R_c} \\quad | \\quad \\text{Y} \\to \\Delta: R_A = R_1 + R_2 + \\frac{R_1 R_2}{R_3} = \\frac{\\sum R_1 R_2}{R_3}</span></div>`,
      lines: [
        '<b>Delta to Star (Δ → Y) Rule:</b> Star resistor connected to a node equals the PRODUCT of the two adjacent Delta resistors divided by the SUM of all three Delta resistors.',
        '<b>Star to Delta (Y → Δ) Rule:</b> Delta resistor across two terminals equals the SUM of the two Star resistors plus their PRODUCT divided by the OPPOSITE Star resistor.',
        '<b>Symmetrical Shortcut:</b> If all three resistors are identical ($R$):\n• $R_{\\text{star}} = R_{\\text{delta}} / 3$\n• $R_{\\text{delta}} = 3 \\cdot R_{\\text{star}}$.',
        '<b>Star Connection Advantage:</b> Provides a central neutral point for single-phase loads and grounding.',
        '<b>Delta Connection Advantage:</b> No neutral required; suppresses 3rd harmonic currents in transformers; ideal for heavy industrial power transmission.'
      ],
      variables: [
        { sym: 'R_a, R_b, R_c', name: 'Delta network branch resistors', unit: 'Ohms (Ω)' },
        { sym: 'R_1, R_2, R_3', name: 'Star network branch resistors', unit: 'Ohms (Ω)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Equating Terminal Resistances', math: 'R_{12} = R_1 + R_2 = \\frac{R_c (R_a + R_b)}{R_a + R_b + R_c}', text: 'Equating terminal resistances between terminals 1-2, 2-3, and 3-1 creates 3 simultaneous equations.' },
        { step: 2, title: 'Solving for Star Resistor R₁', math: 'R_1 = \\frac{R_b R_c}{R_a + R_b + R_c}', text: 'Adding two equations and subtracting the third yields the classic product-over-sum formula.' }
      ],
      example: {
        problem: 'Convert a symmetrical Delta resistive network with three identical 30 Ω resistors into an equivalent Star network.',
        solution: `Given Data:
  • R_a = R_b = R_c = 30 Ω

Formula (Δ → Y):
  R_star = (R_b × R_c) / (R_a + R_b + R_c) = (30 × 30) / (30 + 30 + 30) = 900 / 90 = 10 Ω

Shortcut:
  R_star = R_delta / 3 = 30 / 3 = 10 Ω

Final Answer:
  Each equivalent Star branch resistor R₁ = R₂ = R₃ = 10.0 Ω.`
      },
      commonMistakes: [
        'Confusing the divisor in Star to Delta conversion. In Star-to-Delta, you divide by the OPPOSITE resistor (the one not touching the terminals of the delta resistor).',
        'Applying formulas without drawing the node diagram, leading to crossed terminal assignments.'
      ],
      realWorldApp: '3-Phase induction motor starters switch windings into Star at startup (drawing 1/3 current) and transition to Delta once up to speed for full torque.',
      simType: 'star_delta_interactive',
      quiz: [
        { q: 'If three identical 60 Ω resistors connected in Delta are converted to Star, what is each Star resistor value?', opts: ['180 Ω', '60 Ω', '20 Ω', '30 Ω'], ans: 2, exp: 'R_star = R_delta / 3 = 60 / 3 = 20 Ω.' },
        { q: 'In Star-to-Delta transformation, the numerator for all three delta resistors is:', opts: ['Sum of star resistors (R₁ + R₂ + R₃)', 'Sum of all two-product pairs (R₁R₂ + R₂R₃ + R₃R₁)', 'Product of all three resistors (R₁R₂R₃)', 'Difference of star resistors'], ans: 1, exp: 'Every delta branch resistor shares the common numerator (R₁R₂ + R₂R₃ + R₃R₁) divided by the opposite star resistor.' }
      ]
    },

    {
      id: 'u2_t05',
      unitId: 'u2',
      topicNum: '2.5',
      title: 'Circuit Topologies & Terminology: Node, Branch, Loop & Mesh',
      badge: 'Graph Theory',
      concept: 'Before writing circuit equations, electrical networks must be rigorously classified using topological graph definitions: a Node is any junction where 2 or more elements meet (Essential Node = 3 or more branches); a Branch is a single two-terminal element (resistor, source) connecting two nodes; a Loop is any closed conducting path traversing nodes at most once; and a Mesh is a fundamental loop that contains no other loops inside it (a window pane).',
      whyItMatters: 'Topological definitions determine the exact number of independent equations needed to solve any electrical network ($B = M + N - 1$).',
      mathHtml: `<div class="math-eq"><span>M = B - (N - 1) = B - N + 1 \\quad (\\text{Euler’s Network Formula})</span></div>`,
      lines: [
        '<b>Node:</b> Point where two or more circuit elements join together.',
        '<b>Essential Node:</b> Junction where THREE or more branches connect. Denoted by a heavy dot.',
        '<b>Branch:</b> Single path connecting two essential nodes containing one circuit element.',
        '<b>Loop:</b> Any closed loop traversing circuit elements without passing through any node twice.',
        '<b>Mesh:</b> A minimal closed loop containing NO inner paths. (Every mesh is a loop, but not every loop is a mesh!).',
        '<b>Euler’s Independent Meshes Formula:</b> Number of independent mesh equations $M = B - N + 1$ (where $B$ is branches, $N$ is nodes).'
      ],
      variables: [
        { sym: 'N', name: 'Number of network nodes', unit: 'Integer' },
        { sym: 'B', name: 'Number of network branches', unit: 'Integer' },
        { sym: 'M', name: 'Number of independent meshes', unit: 'Integer' }
      ],
      derivationSteps: [
        { step: 1, title: 'Network Independence Proof', math: 'M = B - N + 1', text: 'According to graph theory, choosing a tree leaves exactly (B - N + 1) co-tree links, each defining one independent fundamental mesh.' }
      ],
      example: {
        problem: 'A planar bridge circuit has 6 branches and 4 essential nodes. Calculate: (a) number of independent KCL nodal equations required, and (b) number of independent KVL mesh equations required.',
        solution: `Given Data:
  • Branches B = 6
  • Nodes N = 4

Calculations:
  (a) Independent Nodal Equations = N - 1 = 4 - 1 = 3 equations (one node acts as 0V reference ground).
  (b) Independent Mesh Equations M = B - N + 1 = 6 - 4 + 1 = 3 meshes.

Conclusion:
  The circuit can be solved using either 3 nodal equations or 3 mesh equations.`
      },
      commonMistakes: [
        'Counting every corner of a wire as a separate node. A continuous ideal wire with zero resistance is a SINGLE electrical node regardless of how many corners it turns!',
        'Treating the outer perimeter of a multi-loop circuit as a mesh. The outer boundary is a loop, but NOT a mesh because it contains inner loops.'
      ],
      realWorldApp: 'SPICE circuit simulators (like LTspice and PSpice) parse netlists into node matrices using these exact topological rules.',
      simType: 'circuit_graph_explorer',
      quiz: [
        { q: 'What is the distinction between a loop and a mesh?', opts: ['A loop is open; a mesh is closed', 'A mesh is a loop that contains no other inner loops inside it', 'A mesh only contains voltage sources', 'There is no difference'], ans: 1, exp: 'A mesh is a fundamental loop without any interior branches (like a single window pane).' }
      ]
    },

    {
      id: 'u2_t06',
      unitId: 'u2',
      topicNum: '2.6',
      title: 'Kirchhoff’s Current Law (KCL)',
      badge: 'Fundamental Law',
      concept: 'Kirchhoff’s Current Law (KCL), formulated by Gustav Kirchhoff in 1845, is the physical statement of Conservation of Electric Charge at any junction: the algebraic sum of currents entering and exiting any node in an electrical circuit is strictly zero ($\\sum I = 0$). Alternatively: Total Current Entering a Node = Total Current Leaving the Node ($\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$). Charge cannot accumulate or be created at a dimensionless node.',
      whyItMatters: 'KCL is the core law used to derive Nodal Voltage Analysis, analyze parallel distribution, and solve transistor active bias networks.',
      mathHtml: `<div class="math-eq"><span>\\sum_{k=1}^n I_k = 0 \\quad \\Longleftrightarrow \\quad \\sum I_{\\text{entering}} = \\sum I_{\\text{leaving}} \\quad (\\text{Conservation of Charge})</span></div>`,
      lines: [
        '<b>Conservation of Charge:</b> Since charge cannot be stored at a zero-volume point, the rate of charge entering must equal the rate leaving ($dQ/dt = 0$).',
        '<b>Sign Convention:</b> Standard convention treats currents ENTERING a node as POSITIVE (+), and currents LEAVING as NEGATIVE (−).',
        '<b>Generalized Supernode KCL:</b> KCL applies not only to a single point node, but to ANY closed boundary (supernode) enclosing multiple components.',
        '<b>High-Frequency Note:</b> KCL is valid as long as circuit physical dimensions are significantly smaller than signal wavelength (lumped circuit model).'
      ],
      variables: [
        { sym: 'I_k', name: 'Currents connected to node', unit: 'Amperes (A)' },
        { sym: 'N', name: 'Node junction', unit: 'Point / Boundary' }
      ],
      derivationSteps: [
        { step: 1, title: 'Continuity Equation', math: '\\nabla \\cdot \\vec{J} + \\frac{\\partial \\rho}{\\partial t} = 0', text: 'In steady state electrodynamics, charge density accumulation ∂ρ/∂t = 0, so surface integral ∮ J · dA = 0, proving KCL.' }
      ],
      example: {
        problem: 'At an essential junction node A, four branches meet. Current I₁ = 5 A enters, I₂ = 3 A leaves, and I₃ = 8 A enters. Find the magnitude and direction of current I₄ in the fourth branch.',
        solution: `Applying KCL:
  Sum of Entering Currents = Sum of Leaving Currents
  I₁ + I₃ = I₂ + I₄
  5 A + 8 A = 3 A + I₄
  13 A = 3 A + I₄
  I₄ = 13 A - 3 A = 10 A

Direction:
  Since I₄ was placed on the "leaving" side of the equation and evaluated positive, I₄ = 10 A LEAVING node A.`
      },
      commonMistakes: [
        'Mixing up entering and leaving signs in multi-branch equations.',
        'Assuming KCL fails when capacitors are charging. The displacement current inside capacitors preserves continuity across the dielectric.'
      ],
      realWorldApp: 'Residual Current Devices (RCD / GFCI outlets) monitor KCL between Phase and Neutral wires: if $I_{\\text{phase}} \\ne I_{\\text{neutral}}$ by even 30 mA (due to current leaking through a person to ground), it trips in 25 ms to save lives.',
      simType: 'kcl_junction_anim',
      quiz: [
        { q: 'Kirchhoff’s Current Law (KCL) is a direct consequence of the conservation of:', opts: ['Energy', 'Electric Charge', 'Momentum', 'Power'], ans: 1, exp: 'KCL is based directly on the law of conservation of electric charge.' },
        { q: 'Three currents meet at a node: 4A enters and 9A enters. What must the third current be?', opts: ['13 A entering', '13 A leaving', '5 A leaving', '5 A entering'], ans: 1, exp: 'Total entering = 4 + 9 = 13 A. By KCL, exactly 13 A must leave the node.' }
      ]
    },

    {
      id: 'u2_t07',
      unitId: 'u2',
      topicNum: '2.7',
      title: 'Kirchhoff’s Voltage Law (KVL)',
      badge: 'Fundamental Law',
      concept: 'Kirchhoff’s Voltage Law (KVL) is the physical statement of Conservation of Energy around any closed path in an electrical circuit: the algebraic sum of all potential differences (EMFs and IR voltage drops) around any closed loop is strictly zero ($\\sum V = 0$). A charge starting at any node and traversing around the loop returns to the same initial electric potential, so net work done per Coulomb is zero.',
      whyItMatters: 'KVL forms the foundation of Mesh Current Analysis, loop equations, and circuit voltage balance verification.',
      mathHtml: `<div class="math-eq"><span>\\sum_{k=1}^n V_k = 0 \\quad \\Longleftrightarrow \\quad \\sum \\text{EMF Sources} = \\sum \\text{IR Voltage Drops} \\quad (\\text{Conservation of Energy})</span></div>`,
      lines: [
        '<b>Conservation of Energy:</b> Electrostatic fields are conservative ($\\oint \\vec{E} \\cdot d\\vec{l} = 0$), meaning moving a test charge around any closed loop consumes zero net energy.',
        '<b>Sign Convention:</b> As you trace around a loop in a chosen direction (e.g. clockwise):\n• Traversing from (−) to (+) terminal of a source is a POTENTIAL RISE (+V).\n• Traversing from (+) to (−) terminal of a source is a POTENTIAL DROP (−V).\n• Moving in the direction of current through a resistor is a VOLTAGE DROP (−IR).\n• Moving opposite to current through a resistor is a VOLTAGE RISE (+IR).',
        '<b>Loop Independence:</b> KVL holds true regardless of whether the loop contains linear, non-linear, time-varying, or active elements.'
      ],
      variables: [
        { sym: 'V_k', name: 'Potential difference across branch k', unit: 'Volts (V)' },
        { sym: 'E', name: 'Source EMF', unit: 'Volts (V)' },
        { sym: 'I · R', name: 'Ohmic voltage drop', unit: 'Volts (V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Conservative Field Integral', math: '\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt} = 0 \\quad (\\text{for static/lumped circuits})', text: 'In lumped parameter circuits without changing magnetic flux piercing the loop, conservative line integral vanishes, yielding KVL.' }
      ],
      example: {
        problem: 'A single closed loop contains a 30 V DC source, a 10 V opposing DC source, and two series resistors R₁ = 6 Ω and R₂ = 4 Ω. Apply KVL to find circuit current I and verify that sum of voltages is zero.',
        solution: `Trace clockwise in the direction of current:
  Starting at bottom left:
  • Rise across 30V source: +30 V
  • Drop across R₁: -I · (6)
  • Drop across opposing 10V source (enters + exits -): -10 V
  • Drop across R₂: -I · (4)

KVL Equation:
  +30 - 6I - 10 - 4I = 0
  20 - 10I = 0  ⟹  10I = 20  ⟹  I = 2.0 Amperes

Voltage Verification:
  • Drop across R₁ = 2 A × 6 Ω = 12 V
  • Drop across R₂ = 2 A × 4 Ω = 8 V
  • Sum of drops = 10V + 12V + 8V = 30 V = Applied EMF ✓`
      },
      commonMistakes: [
        'Forgetting that opposing voltage sources act as voltage DROPS when current enters their positive terminal.',
        'Switching traversal direction midway through a loop equation.'
      ],
      realWorldApp: 'Automotive wiring and solar inverter strings apply KVL to ensure voltage drops across long battery cables don’t cause excessive system brownouts.',
      simType: 'kvl_loop_tracer',
      quiz: [
        { q: 'Kirchhoff’s Voltage Law (KVL) is based on the principle of conservation of:', opts: ['Charge', 'Energy', 'Electric Current', 'Magnetic Flux'], ans: 1, exp: 'KVL represents conservation of energy: net work done taking a unit charge around a closed loop is zero.' },
        { q: 'In a single closed loop with a 50V source, voltage drops across two resistors are 20V and 18V. What is the voltage drop across the third resistor?', opts: ['50 V', '38 V', '12 V', '88 V'], ans: 2, exp: 'By KVL: 50 - 20 - 18 - V₃ = 0 ⟹ V₃ = 50 - 38 = 12 V.' }
      ]
    },

    {
      id: 'u2_t08',
      unitId: 'u2',
      topicNum: '2.8',
      title: 'Mesh Current Analysis & Matrix Formulation',
      badge: 'Systematic Analysis',
      concept: 'Mesh Current Analysis is a systematic matrix method based on KVL that solves planar circuits using circulating mesh currents ($I_1, I_2, \\dots, I_m$) rather than individual branch currents. For an $M$-mesh network, equations are formulated directly in matrix form $[R][I] = [V]$: diagonal entries $R_{ii}$ are the total self-resistance around mesh $i$, off-diagonal entries $R_{ij}$ are the shared mutual resistance with mesh $j$ (negative sign), and $V_i$ is the net clockwise EMF driving mesh $i$.',
      whyItMatters: 'Enables algorithmic computer and handheld calculator solution of complex multi-loop circuits using standard Cramer’s rule or Gaussian elimination.',
      mathHtml: `<div class="math-eq"><span>\\begin{bmatrix} R_{11} & -R_{12} \\\\ -R_{21} & R_{22} \\end{bmatrix} \\begin{bmatrix} I_1 \\\\ I_2 \\end{bmatrix} = \\begin{bmatrix} V_1 \\\\ V_2 \\end{bmatrix} \\quad | \\quad R_{11} = \\sum R_{\\text{mesh 1}}, \\quad R_{12} = R_{\\text{shared}}</span></div>`,
      lines: [
        '<b>Step 1:</b> Identify all $M$ fundamental meshes and assign clockwise circulating mesh currents $I_1, I_2, \\dots, I_m$.',
        '<b>Step 2:</b> Principal Diagonal ($R_{ii}$): Sum of ALL resistors in mesh $i$ (ALWAYS positive).',
        '<b>Step 3:</b> Off-Diagonal ($R_{ij}$): Common resistor shared between mesh $i$ and mesh $j$ (ALWAYS negative for same clockwise convention).',
        '<b>Step 4:</b> Voltage Vector ($V_i$): Sum of all voltage sources driving clockwise current in mesh $i$.',
        '<b>Branch Currents:</b> A branch shared between meshes 1 and 2 carries net current $I_{\\text{branch}} = I_1 - I_2$.'
      ],
      variables: [
        { sym: 'R_ii', name: 'Self-resistance of mesh i', unit: 'Ohms (Ω)' },
        { sym: 'R_ij', name: 'Mutual shared resistance', unit: 'Ohms (Ω)' },
        { sym: 'I_i', name: 'Circulating mesh current', unit: 'Amperes (A)' },
        { sym: 'V_i', name: 'Net source EMF in mesh i', unit: 'Volts (V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Mesh 1 KVL', math: 'V_1 - I_1 R_1 - (I_1 - I_2) R_3 = 0 \\implies (R_1 + R_3) I_1 - R_3 I_2 = V_1', text: 'Notice R₁₁ = R₁ + R₃ and mutual term is -R₃.' },
        { step: 2, title: 'Mesh 2 KVL', math: '-V_2 - (I_2 - I_1) R_3 - I_2 R_2 = 0 \\implies -R_3 I_1 + (R_2 + R_3) I_2 = -V_2', text: 'Matrix is always symmetric: R₁₂ = R₂₁.' }
      ],
      example: {
        problem: 'In a 2-mesh circuit: Mesh 1 has 10V source, R₁ = 10 Ω, and shared resistor R₃ = 40 Ω. Mesh 2 has 20V source opposing, R₂ = 20 Ω, and shared R₃ = 40 Ω. Write the matrix equation and solve for mesh currents I₁ and I₂.',
        solution: `Matrix Coefficients:
  • R₁₁ = R₁ + R₃ = 10 + 40 = 50 Ω
  • R₂₂ = R₂ + R₃ = 20 + 40 = 60 Ω
  • R₁₂ = R₂₁ = -R₃ = -40 Ω
  • V₁ = 10 V
  • V₂ = 20 V

Matrix System:
  [ 50   -40 ] [ I₁ ] = [ 10 ]
  [ -40   60 ] [ I₂ ] = [ 20 ]

Determinant Δ:
  Δ = (50 × 60) - (-40 × -40) = 3000 - 1600 = 1400

Cramer’s Rule:
  Δ₁ = (10 × 60) - (20 × -40) = 600 - (-800) = 1400
  I₁ = Δ₁ / Δ = 1400 / 1400 = 1.00 A

  Δ₂ = (50 × 20) - (-40 × 10) = 1000 - (-400) = 1400
  I₂ = Δ₂ / Δ = 1400 / 1400 = 1.00 A

Branch Current in shared R₃:
  I₃ = I₁ + I₂ (if defined in matching directions) or I₁ - I₂ = 0 A!`
      },
      commonMistakes: [
        'Attempting mesh analysis on non-planar circuits (circuits with crossing wires that cannot be drawn flat on a plane). For non-planar circuits, Nodal Analysis must be used!',
        'Forgetting the negative sign on mutual off-diagonal resistances.'
      ],
      realWorldApp: 'Mesh analysis matrices are directly imported into MATLAB and Python NumPy scripts (`np.linalg.solve(R, V)`) to automate electrical network solutions.',
      simType: 'mesh_analysis_solver',
      quiz: [
        { q: 'In standard mesh current matrix formulation [R][I] = [V], the diagonal terms R_ii are always:', opts: ['Negative', 'Positive', 'Zero', 'Alternating'], ans: 1, exp: 'Diagonal terms R_ii represent the sum of all resistances around mesh i and are always strictly positive.' }
      ]
    },

    {
      id: 'u2_t09',
      unitId: 'u2',
      topicNum: '2.9',
      title: 'Supermesh Analysis',
      badge: 'Advanced Technique',
      concept: 'A Supermesh occurs when a branch containing an ideal or practical current source is shared between two adjacent meshes. Because the voltage drop across an ideal current source is an unknown variable ($V_x$), standard KVL cannot be written for each individual mesh. The problem is elegantly solved by mentally removing the branch with the current source, creating a larger combined supermesh loop, and using the current source’s branch equation as the auxiliary constraint.',
      whyItMatters: 'Essential for analyzing transistor amplifier models that feature dependent current sources shared between input and output loops.',
      mathHtml: `<div class="math-eq"><span>\\text{Auxiliary Equation: } I_2 - I_1 = I_{\\text{source}} \\quad | \\quad \\text{Supermesh KVL: } \\sum V_{\\text{outer loop}} = 0</span></div>`,
      lines: [
        '<b>Why Supermesh is Needed:</b> The internal resistance of an ideal current source is infinite; its voltage drop $V_x$ is unknown.',
        '<b>Procedure Step 1:</b> Identify the current source between Mesh 1 and Mesh 2.',
        '<b>Procedure Step 2:</b> Write the auxiliary constraint equation linking mesh currents to the source: $I_2 - I_1 = I_s$.',
        '<b>Procedure Step 3:</b> Open-circuit (temporarily remove) the current source branch and write one combined KVL equation around the outer boundary of Mesh 1 + Mesh 2.',
        '<b>Procedure Step 4:</b> Solve the two resulting simultaneous equations.'
      ],
      variables: [
        { sym: 'I_s', name: 'Current of the shared current source', unit: 'Amperes (A)' },
        { sym: 'V_x', name: 'Unknown voltage across current source', unit: 'Volts (V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Supermesh KVL Formation', math: 'V_{\\text{in}} - I_1 R_1 - I_2 R_2 = 0', text: 'Traverse the entire outer perimeter encompassing both meshes.' },
        { step: 2, title: 'Auxiliary Constraint', math: 'I_2 - I_1 = I_{\\text{source}} \\implies I_2 = I_1 + I_{\\text{source}}', text: 'Substitute I₂ directly into the supermesh KVL equation to obtain a single unknown equation.' }
      ],
      example: {
        problem: 'A circuit has Mesh 1 with a 21 V source and 6 Ω resistor, Mesh 2 with a 3 Ω resistor, and a shared 1 A current source pointing into Mesh 2. Use supermesh analysis to find mesh currents I₁ and I₂.',
        solution: `Analysis:
  • Auxiliary Constraint Equation:
    The 1 A current source flows in the direction of I₂ and against I₁:
    I₂ - I₁ = 1.0 A  ⟹  I₂ = I₁ + 1.0   ---- (Eq 1)

  • Supermesh KVL (outer loop traversing Mesh 1 and Mesh 2):
    +21 - 6 I₁ - 3 I₂ = 0
    6 I₁ + 3 I₂ = 21   ---- (Eq 2)

  • Substitute Eq 1 into Eq 2:
    6 I₁ + 3 (I₁ + 1.0) = 21
    6 I₁ + 3 I₁ + 3 = 21
    9 I₁ = 18  ⟹  I₁ = 2.0 A

  • Calculate I₂:
    I₂ = I₁ + 1.0 = 2.0 + 1.0 = 3.0 A

Final Answer:
  Mesh current I₁ = 2.0 A, Mesh current I₂ = 3.0 A.`
      },
      commonMistakes: [
        'Trying to apply Ohm’s law $V = I R$ to an ideal current source ($R$ is not zero, it is infinite!).',
        'Forgetting the auxiliary equation, leaving a system of equations that cannot be solved.'
      ],
      realWorldApp: 'Bipolar junction transistor small-signal circuits contain controlled current sources $g_m v_{\\pi}$ between collector and emitter meshes, requiring supermesh equations.',
      simType: 'supermesh_workbench',
      quiz: [
        { q: 'When is a supermesh required in circuit analysis?', opts: ['When two voltage sources are in series', 'When an ideal current source is shared between two meshes', 'When all resistors are equal', 'When a circuit has more than 5 nodes'], ans: 1, exp: 'A supermesh is required when an ideal current source is shared between two adjacent meshes.' }
      ]
    },

    {
      id: 'u2_t10',
      unitId: 'u2',
      topicNum: '2.10',
      title: 'Nodal Voltage Analysis & Reference Ground',
      badge: 'Systematic Analysis',
      concept: 'Nodal Voltage Analysis is a systematic matrix method based on KCL that solves electrical networks for unknown node voltages ($V_1, V_2, \\dots, V_{n-1}$) relative to a selected reference ground node ($0\\text{ V}$). For a circuit with $N$ essential nodes, $N-1$ independent KCL equations are formulated: currents leaving each node through conductances are equated to currents injected by sources: $[G][V] = [I]$.',
      whyItMatters: 'The universal core algorithm inside SPICE simulators (nodal admittance matrix formulation $[Y][V] = [I]$). It works on any circuit (both planar and non-planar).',
      mathHtml: `<div class="math-eq"><span>\\begin{bmatrix} G_{11} & -G_{12} \\\\ -G_{21} & G_{22} \\end{bmatrix} \\begin{bmatrix} V_1 \\\\ V_2 \\end{bmatrix} = \\begin{bmatrix} I_1 \\\\ I_2 \\end{bmatrix} \\quad | \\quad G_{11} = \\sum \\frac{1}{R_{\\text{connected}}}, \\quad G_{12} = \\frac{1}{R_{\\text{shared}}}</span></div>`,
      lines: [
        '<b>Step 1:</b> Select a reference ground node (usually the junction connecting the greatest number of branches, defined as $V_{\\text{ref}} = 0\\text{ V}$).',
        '<b>Step 2:</b> Assign node voltages $V_1, V_2, \\dots, V_{n-1}$ to all non-reference nodes.',
        '<b>Step 3:</b> Write KCL at each node expressing branch currents in terms of node voltages: $I = \\frac{V_{\\text{from}} - V_{\\text{to}}}{R}$.',
        '<b>Step 4:</b> Formulate into matrix $[G][V] = [I]$ where diagonal terms $G_{ii}$ are sum of conductances attached to node $i$, and $G_{ij}$ are mutual conductances.',
        '<b>Branch Current Recovery:</b> Once node voltages are solved, current in any branch between nodes A and B is simply $I_{AB} = \\frac{V_A - V_B}{R}$.'
      ],
      variables: [
        { sym: 'V_1, V_2', name: 'Unknown node voltages', unit: 'Volts (V)' },
        { sym: 'G_ii', name: 'Self-conductance at node i', unit: 'Siemens (S)' },
        { sym: 'I_i', name: 'Net injected current at node i', unit: 'Amperes (A)' }
      ],
      derivationSteps: [
        { step: 1, title: 'KCL at Node 1', math: '\\frac{V_1 - V_A}{R_1} + \\frac{V_1}{R_2} + \\frac{V_1 - V_2}{R_3} = 0', text: 'Sum of all currents leaving node 1 equals zero.' },
        { step: 2, title: 'Grouping into Conductances', math: 'V_1 \\left(\\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}\\right) - V_2 \\left(\\frac{1}{R_3}\\right) = \\frac{V_A}{R_1}', text: 'G₁₁ is sum of connected conductances; G₁₂ is mutual conductance.' }
      ],
      example: {
        problem: 'A junction node 1 connects to ground through 20 Ω, to a 10 V source through 10 Ω, and to node 2 through 40 Ω. Node 2 connects to a 20 V source through 40 Ω. Find node voltage V₁.',
        solution: `KCL at Node 1:
  (V₁ - 10) / 10 + V₁ / 20 + (V₁ - V₂) / 40 = 0
  Multiply entire equation by 40:
  4 (V₁ - 10) + 2 V₁ + (V₁ - V₂) = 0
  4V₁ - 40 + 2V₁ + V₁ - V₂ = 0
  7 V₁ - V₂ = 40   ---- (Eq 1)

  If V₂ is fixed by the 20V branch to 20V:
  7 V₁ - 20 = 40  ⟹  7 V₁ = 60  ⟹  V₁ = 60 / 7 = 8.57 Volts.`
      },
      commonMistakes: [
        'Forgetting to assign a 0V ground reference node.',
        'Subtracting node voltages in the wrong order ($V_{\\text{to}} - V_{\\text{from}}$ instead of $V_{\\text{from}} - V_{\\text{to}}$).'
      ],
      realWorldApp: 'Every commercial power grid load-flow software (like ETAP and PSS/E) solves power transmission voltages using modified nodal analysis.',
      simType: 'nodal_analysis_solver',
      quiz: [
        { q: 'For a circuit containing 5 essential nodes, how many independent nodal voltage equations are required?', opts: ['5', '4', '3', '6'], ans: 1, exp: 'Independent equations required = N - 1 = 5 - 1 = 4 (since one node is designated as 0V reference ground).' }
      ]
    },

    {
      id: 'u2_t11',
      unitId: 'u2',
      topicNum: '2.11',
      title: 'Supernode Analysis',
      badge: 'Advanced Technique',
      concept: 'A Supernode is formed when an ideal voltage source is connected between two non-reference nodes. Because the current flowing through an ideal voltage source cannot be expressed using Ohm’s law ($I = V/R$ where $R=0$ causes division by zero), the two nodes are collapsed into a single generalized boundary (supernode), and KCL is written for all currents leaving the enclosed boundary.',
      whyItMatters: 'Allows instant solution of active Op-Amp and voltage-regulator networks containing floating sources.',
      mathHtml: `<div class="math-eq"><span>\\text{Constraint: } V_2 - V_1 = V_{\\text{source}} \\quad | \\quad \\text{Supernode KCL: } \\sum I_{\\text{leaving boundary}} = 0</span></div>`,
      lines: [
        '<b>Definition:</b> Enclosure containing an ideal voltage source and its two terminal non-reference nodes.',
        '<b>Auxiliary Voltage Constraint:</b> $V_{\\text{pos}} - V_{\\text{neg}} = V_s$.',
        '<b>KCL on Supernode:</b> Treat the entire supernode boundary as a single giant node and sum all leaving currents to zero.',
        '<b>Advantage:</b> Eliminates the unknown branch current through the voltage source from the equations.'
      ],
      variables: [
        { sym: 'V_s', name: 'Floating voltage source magnitude', unit: 'Volts (V)' },
        { sym: 'V_1, V_2', name: 'Terminal non-reference node voltages', unit: 'Volts (V)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Constraint Equation', math: 'V_2 - V_1 = 5\\text{ V} \\implies V_2 = V_1 + 5', text: 'Direct relationship established by ideal source.' },
        { step: 2, title: 'Supernode KCL', math: '\\frac{V_1 - 10}{R_1} + \\frac{V_1}{R_2} + \\frac{V_2}{R_3} + \\frac{V_2 - 20}{R_4} = 0', text: 'Sum currents leaving both node 1 and node 2 simultaneously.' }
      ],
      example: {
        problem: 'A 2 V ideal voltage source is connected between Node 1 and Node 2 (+ terminal at Node 2). Node 1 connects to ground through 2 Ω. Node 2 connects to ground through 4 Ω. A 5 A current source injects current into Node 1. Find V₁ and V₂.',
        solution: `Analysis:
  • Constraint Equation:
    V₂ - V₁ = 2.0 V  ⟹  V₂ = V₁ + 2.0   ---- (Eq 1)

  • Supernode KCL (Nodes 1 + 2):
    Currents leaving boundary = 0:
    -5 A + (V₁ / 2) + (V₂ / 4) = 0
    (V₁ / 2) + (V₂ / 4) = 5
    Multiply by 4:
    2 V₁ + V₂ = 20   ---- (Eq 2)

  • Substitute Eq 1 into Eq 2:
    2 V₁ + (V₁ + 2.0) = 20
    3 V₁ + 2 = 20  ⟹  3 V₁ = 18  ⟹  V₁ = 6.0 Volts

  • Calculate V₂:
    V₂ = V₁ + 2.0 = 6.0 + 2.0 = 8.0 Volts

Final Answer:
  Node voltage V₁ = 6.0 V, Node voltage V₂ = 8.0 V.`
      },
      commonMistakes: [
        'Trying to apply KCL separately at Node 1 or Node 2 with an unknown current variable $I_x$ through the voltage source.',
        'Forgetting the auxiliary voltage constraint equation.'
      ],
      realWorldApp: 'Operational amplifier voltage follower circuits create natural supernodes between inputs and outputs.',
      simType: 'supernode_workbench',
      quiz: [
        { q: 'What is a supernode in electrical circuit analysis?', opts: ['A node connected to more than 10 resistors', 'Two non-reference nodes connected by an ideal voltage source', 'A node at 1000 Volts', 'A ground node with zero resistance'], ans: 1, exp: 'A supernode is created by enclosing two non-reference nodes connected by an ideal voltage source.' }
      ]
    },

    /* =========================================================================
     * UNIT 3: ELECTROSTATICS, CAPACITANCE & DIELECTRICS
     * ========================================================================= */
    {
      id: 'u3_t01',
      unitId: 'u3',
      topicNum: '3.1',
      title: 'Electric Charge & Atomic Flow',
      badge: 'Electrostatics',
      concept: 'Electrostatics deals with stationary electric charges and their static electric fields. Charge is an intrinsic property of subatomic particles ($+e$ for protons, $-e$ for electrons). Charge is quantized ($Q = \\pm n e$) and conserved in all interactions. 1 Coulomb of charge equals $6.25 \\times 10^{18}$ electrons.',
      whyItMatters: 'Fundamental basis for electrostatic precipitators in power plants, xerography (photocopiers and laser printers), and capacitive touchscreens.',
      mathHtml: `<div class="math-eq"><span>Q = n \\cdot e = I \\cdot t \\quad | \\quad 1\\text{ C} = 6.25 \\times 10^{18}\\text{ electrons}</span></div>`,
      lines: [
        '<b>Quantization:</b> Charge exists only in integer packets of $e = 1.602 \\times 10^{-19}\\text{ C}$.',
        '<b>Conservation:</b> Net charge in an isolated physical system remains strictly constant.',
        '<b>Electrification by Friction / Induction:</b> Rubbing glass with silk transfers electrons, leaving glass positively charged.',
        '<b>Gold-Leaf Electroscope:</b> Detects presence and polarity of static electric charge by repulsive leaf divergence.'
      ],
      variables: [
        { sym: 'Q', name: 'Electrostatic Charge', unit: 'Coulombs (C)' },
        { sym: 'e', name: 'Elementary charge (1.602 × 10⁻¹⁹ C)', unit: 'Coulombs (C)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Quantization Formulation', math: 'Q = n \\cdot e \\implies n = \\frac{Q}{e}', text: 'Charge count derived from Millikan’s oil drop experiment.' }
      ],
      example: {
        problem: 'How many electrons must be transferred from a neutral sphere to give it a net positive charge of +4.8 μC?',
        solution: `Given Data:
  • Q = +4.8 μC = 4.8 × 10⁻⁶ C
  • e = 1.602 × 10⁻¹⁹ C

Calculation:
  n = Q / e = (4.8 × 10⁻⁶ C) / (1.602 × 10⁻¹⁹ C) = 2.996 × 10¹³ electrons

Final Answer:
  Approximately 3.0 × 10¹³ electrons must be removed.`
      },
      commonMistakes: [
        'Thinking a neutral body has no charge. Neutral bodies have equal numbers of positive and negative charges.'
      ],
      realWorldApp: 'Laser printers deposit positive charge on a photoreceptor drum using a corona wire, attracting negatively charged toner particles.',
      simType: 'electroscope_3d',
      quiz: [
        { q: 'What is the elementary charge on a single electron?', opts: ['1.602 × 10⁻¹⁹ C', '9.1 × 10⁻³¹ C', '6.25 × 10¹⁸ C', '1.0 C'], ans: 0, exp: 'The elementary charge e is exactly 1.602176634 × 10⁻¹⁹ Coulombs.' }
      ]
    },

    {
      id: 'u3_t02',
      unitId: 'u3',
      topicNum: '3.2',
      title: 'Coulomb’s Laws of Electrostatic Force',
      badge: 'Electrostatics',
      concept: 'Coulomb’s 1st Law states that like charges repel while unlike charges attract. Coulomb’s 2nd Law states that the electrostatic force between two point charges is directly proportional to the product of charge magnitudes and inversely proportional to the square of distance: $F = k \\frac{q_1 q_2}{r^2} = \\frac{1}{4\\pi \\varepsilon_0 \\varepsilon_r} \\frac{q_1 q_2}{r^2}$.',
      whyItMatters: 'Governs the atomic bond forces holding solids together and dictates sparkover distances in high-voltage switchgear.',
      mathHtml: `<div class="math-eq"><span>F = \\frac{1}{4\\pi \\varepsilon_0 \\varepsilon_r} \\frac{q_1 q_2}{r^2} = k \\frac{q_1 q_2}{r^2} \\quad (k \\approx 9.0 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2)</span></div>`,
      lines: [
        '<b>Inverse Square Law:</b> Doubling separation distance reduces force to 1/4 (25%).',
        '<b>Medium Shielding:</b> In a dielectric medium with constant $\\varepsilon_r$, electrostatic force is reduced: $F_{\\text{medium}} = F_{\\text{vac}} / \\varepsilon_r$.',
        '<b>Newton’s Third Law:</b> Force exerted by $q_1$ on $q_2$ is equal and opposite to force exerted by $q_2$ on $q_1$.'
      ],
      variables: [
        { sym: 'F', name: 'Electrostatic force', unit: 'Newtons (N)' },
        { sym: 'q_1, q_2', name: 'Point charges', unit: 'Coulombs (C)' },
        { sym: 'r', name: 'Distance between charges', unit: 'Meters (m)' },
        { sym: 'ε_0', name: 'Vacuum permittivity (8.854 × 10⁻¹²)', unit: 'F/m' },
        { sym: 'ε_r', name: 'Relative permittivity', unit: 'Dimensionless' }
      ],
      derivationSteps: [
        { step: 1, title: 'Coulomb Constant Derivation', math: 'k = \\frac{1}{4\\pi \\varepsilon_0} = \\frac{1}{4 \\times 3.14159 \\times 8.854 \\times 10^{-12}} = 8.98755 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2', text: 'Baseline constant for electrostatic calculations in free space.' }
      ],
      example: {
        problem: 'Two point charges +4 μC and +9 μC are separated by 30 cm in air. Calculate the electrostatic repulsive force.',
        solution: `Given:
  q₁ = 4 × 10⁻⁶ C, q₂ = 9 × 10⁻⁶ C, r = 0.30 m, k = 9.0 × 10⁹ N·m²/C²

Calculation:
  F = k · (q₁ · q₂) / r² = (9.0 × 10⁹) × (36 × 10⁻¹²) / (0.30)²
  F = 324 / 0.09 = 3.60 Newtons (Repulsive)`
      },
      commonMistakes: [
        'Forgetting to square the distance $r^2$ in the denominator.'
      ],
      realWorldApp: 'Electrostatic painting: car bodies are positively charged while paint droplets are negatively charged, ensuring 100% uniform attraction with zero overspray waste.',
      simType: 'coulomb_force_sim',
      quiz: [
        { q: 'If the distance between two charges is tripled, the electrostatic force between them becomes:', opts: ['3 times greater', '1/3 of original', '1/9 of original', '9 times greater'], ans: 2, exp: 'Force varies with 1/r². Tripling distance reduces force to 1/(3)² = 1/9 of original.' }
      ]
    },

    {
      id: 'u3_t03',
      unitId: 'u3',
      topicNum: '3.3',
      title: 'Permittivity: Absolute & Relative',
      badge: 'Material Physics',
      concept: 'Permittivity ($\\varepsilon$) measures the ability of a medium to permit the establishment of electric flux within it. Absolute permittivity of free space is $\\varepsilon_0 = 8.854 \\times 10^{-12}\\text{ F/m}$. Relative permittivity (dielectric constant $\\varepsilon_r$) is the dimensionless ratio $\\varepsilon_r = \\varepsilon / \\varepsilon_0 = C / C_0$, indicating how many times a dielectric increases capacitance compared to vacuum.',
      whyItMatters: 'Dictates the energy storage density of capacitor dielectrics and signal transmission speed on printed circuit board traces.',
      mathHtml: `<div class="math-eq"><span>\\varepsilon = \\varepsilon_0 \\cdot \\varepsilon_r = \\frac{D}{E} \\quad | \\quad \\varepsilon_r = \\frac{\\varepsilon}{\\varepsilon_0} = \\frac{C}{C_0} = \\frac{F_{\\text{vac}}}{F_{\\text{med}}}</span></div>`,
      lines: [
        '<b>Vacuum Permittivity ($\\varepsilon_0$):</b> Physical baseline constant: $\\varepsilon_0 = 8.8541878 \\times 10^{-12}\\text{ F/m}$.',
        '<b>Relative Permittivity ($\\varepsilon_r$):</b> Vacuum = 1.0, Dry Air = 1.0006, Kraft Paper = 3.8, Mica = 6.0, Glass = 7.0, Ceramic = 85 to 1200.',
        '<b>Capacitance Multiplier:</b> Filling an air capacitor with dielectric multiplies its capacitance: $C = \\varepsilon_r \\cdot C_0$.'
      ],
      variables: [
        { sym: 'ε', name: 'Absolute Permittivity', unit: 'Farad/meter (F/m)' },
        { sym: 'ε_0', name: 'Permittivity of Free Space (8.854 × 10⁻¹²)', unit: 'F/m' },
        { sym: 'ε_r', name: 'Relative Permittivity / Dielectric Constant', unit: 'Dimensionless' }
      ],
      derivationSteps: [
        { step: 1, title: 'Constitutive Relation', math: 'D = \\varepsilon E = \\varepsilon_0 \\varepsilon_r E \\implies \\varepsilon = \\frac{D}{E}', text: 'Connects flux density D to field intensity E.' }
      ],
      example: {
        problem: 'An air capacitor has capacitance 50 pF. When immersed in transformer oil, its capacitance increases to 110 pF. Find the relative permittivity of the transformer oil.',
        solution: `Calculation:
  ε_r = C_medium / C_air = 110 pF / 50 pF = 2.20

Final Answer:
  Relative permittivity of transformer oil ε_r = 2.20.`
      },
      commonMistakes: [
        'Attaching units to relative permittivity. Relative permittivity is a pure dimensionless ratio.'
      ],
      realWorldApp: 'High-K dielectric gate oxides (Hafnium Oxide $\\text{HfO}_2, \\varepsilon_r \\approx 25$) in computer processors enable sub-3nm transistors without quantum tunneling leakage.',
      simType: 'permittivity_explorer',
      quiz: [
        { q: 'What is the unit of absolute permittivity ε₀?', opts: ['Newton / meter', 'Farad / meter (F/m)', 'Coulomb / Volt', 'Dimensionless'], ans: 1, exp: 'Absolute permittivity is measured in Farads per meter (F/m) or C²/(N·m²).' }
      ]
    },

    {
      id: 'u3_t04',
      unitId: 'u3',
      topicNum: '3.4',
      title: 'Electric Field Intensity & Lines of Force',
      badge: 'Field Theory',
      concept: 'Electric Field Intensity ($E$) is the mechanical electrostatic force experienced per unit positive test charge ($E = F / Q$, measured in V/m or N/C). Between uniform parallel plates separated by distance $d$ with voltage $V$: $E = V / d$. Electric lines of force originate perpendicularly from positive charges and terminate perpendicularly on negative charges.',
      whyItMatters: 'Determines dielectric breakdown in insulators, high-voltage sparkover clearances, and electron beam acceleration in X-ray tubes.',
      mathHtml: `<div class="math-eq"><span>E = \\frac{F}{Q} = \\frac{Q}{4\\pi \\varepsilon_0 \\varepsilon_r r^2} = \\frac{V}{d} \\quad | \\quad E = -\\frac{dV}{dr}</span></div>`,
      lines: [
        '<b>Uniform Field:</b> Between parallel conductor plates: $E = V / d$ is constant everywhere.',
        '<b>Field Line Properties:</b> Never intersect (a point cannot have two field directions); crowded lines denote intense fields; perpendicular to conductor surfaces.',
        '<b>Electrostatic Shielding (Faraday Cage):</b> The electric field inside any hollow charged conducting cavity is strictly ZERO.'
      ],
      variables: [
        { sym: 'E', name: 'Electric Field Intensity', unit: 'V/m or N/C' },
        { sym: 'V', name: 'Potential Difference', unit: 'Volts (V)' },
        { sym: 'd', name: 'Plate separation gap', unit: 'Meters (m)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Potential Gradient', math: 'E = -\\frac{dV}{dr} \\implies E = \\frac{V}{d} \\quad (\\text{uniform field})', text: 'Negative gradient of potential with respect to distance.' }
      ],
      example: {
        problem: 'Two flat plates are separated by 5 mm and connected across a 250 V DC power supply. Find the electric field intensity.',
        solution: `Calculation:
  d = 5 mm = 5 × 10⁻³ m
  E = V / d = 250 V / (5 × 10⁻³ m) = 50,000 V/m = 50 kV/m`
      },
      commonMistakes: [
        'Assuming electric field lines can form closed loops. Electrostatic lines ALWAYS begin on positive charge and end on negative charge (unlike magnetic field lines which form continuous closed loops).'
      ],
      realWorldApp: 'Microwave ovens and passenger airplanes act as Faraday cages: metal enclosures shield the interior from external lightning and electromagnetic interference.',
      simType: 'field_streamlines_sim',
      quiz: [
        { q: 'What is the electric field inside a hollow charged metal sphere in electrostatic equilibrium?', opts: ['Infinite', 'Proportional to radius', 'Strictly zero', 'Equal to surface field'], ans: 2, exp: 'By Gauss’s Law, since no charge resides inside a hollow conductor cavity, internal electric field E = 0.' }
      ]
    },

    {
      id: 'u3_t05',
      unitId: 'u3',
      topicNum: '3.5',
      title: 'Electric Flux (Ψ), Flux Density (D) & Gauss’s Law',
      badge: 'Electromagnetics',
      concept: 'Electric Flux ($\\Psi$) represents the total lines of electrostatic induction emanating from a charge (Faraday proved $\\Psi = Q$ Coulombs). Electric Flux Density ($D$) is the flux per unit cross-sectional area: $D = \\Psi / A = Q / A$ (C/m²). Gauss’s Law states that total outward electric flux through any closed 3D surface equals the net enclosed charge: $\\oint \\vec{D} \\cdot d\\vec{A} = Q_{\\text{enc}}$.',
      whyItMatters: 'Allows calculating electric fields around complex charge geometries (cables, coaxial lines, high-voltage bushings) without difficult vector integrals.',
      mathHtml: `<div class="math-eq"><span>\\Psi = Q \\quad | \\quad D = \\frac{\\Psi}{A} = \\varepsilon_0 \\varepsilon_r E \\quad | \\quad \\oint_S \\vec{D} \\cdot d\\vec{A} = Q_{\\text{enclosed}}</span></div>`,
      lines: [
        '<b>Faraday’s Flux Discovery:</b> Exactly 1 Coulomb of charge emits 1 Coulomb of electrostatic flux ($\\Psi = Q$).',
        '<b>Flux Density Independence:</b> $D = Q/A$ depends ONLY on charge and geometry; it is independent of the dielectric medium.',
        '<b>Constitutive Link:</b> $D = \\varepsilon E = \\varepsilon_0 \\varepsilon_r E$. Inserting a dielectric leaves $D$ unchanged while reducing $E$.'
      ],
      variables: [
        { sym: 'Ψ', name: 'Electric Flux', unit: 'Coulombs (C)' },
        { sym: 'D', name: 'Electric Flux Density', unit: 'Coulombs/m² (C/m²)' },
        { sym: 'Q_enc', name: 'Enclosed Charge', unit: 'Coulombs (C)' }
      ],
      derivationSteps: [
        { step: 1, title: 'Gauss Law for Sphere', math: '\\oint D \\cdot dA = D (4\\pi r^2) = Q \\implies D = \\frac{Q}{4\\pi r^2} \\implies E = \\frac{Q}{4\\pi \\varepsilon r^2}', text: 'Proves Coulomb’s law directly from Gauss’s theorem.' }
      ],
      example: {
        problem: 'A charge of +8.854 μC is located at the center of a sphere of radius 0.20 m in air. Find the electric flux density on the sphere surface.',
        solution: `Calculation:
  A = 4πr² = 4 × 3.14159 × (0.20)² = 0.50265 m²
  D = Q / A = (8.854 × 10⁻⁶ C) / 0.50265 m² = 17.62 μC/m²`
      },
      commonMistakes: [
        'Believing flux density D changes when dielectric medium changes. D is independent of permittivity; only field intensity E changes.'
      ],
      realWorldApp: 'Coaxial cable insulation design calculates maximum flux density at the inner conductor surface to prevent insulation corona breakdown.',
      simType: 'gaussian_surface_sim',
      quiz: [
        { q: 'What is the electric flux emanating from a charge of 5 Coulombs?', opts: ['5 / ε₀', '5 Coulombs', '5 × 10⁻¹⁹', 'Zero'], ans: 1, exp: 'By Faraday’s definition, total electrostatic flux Ψ is numerically equal to the charge Q in Coulombs (Ψ = 5 C).' }
      ]
    },

    {
      id: 'u3_t06',
      unitId: 'u3',
      topicNum: '3.6',
      title: 'The Working Capacitor, Composite Slabs & Multi-Plate Units',
      badge: 'Capacitor Engineering',
      concept: 'Parallel-plate capacitance is $C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}$. When a composite dielectric slab of thickness $t$ and constant $\\varepsilon_r$ is inserted into gap $d$: $C = \\frac{\\varepsilon_0 A}{(d - t) + t / \\varepsilon_r}$. In multi-plate interleaved capacitors with $n$ alternating polarity metal plates, $n-1$ parallel gaps are formed: $C = (n - 1) \\frac{\\varepsilon_0 \\varepsilon_r A}{d}$. Dielectric breakdown occurs if electric field exceeds dielectric strength ($V_{\\text{max}} = E_{\\text{breakdown}} \\cdot d$).',
      whyItMatters: 'Underpins all commercial capacitor construction: electrolytic capacitors with etched foil, multilayer ceramic chip capacitors (MLCCs) with hundreds of interleaved layers, and variable tuning capacitors.',
      mathHtml: `<div class="math-eq"><span>C_{\\text{composite}} = \\frac{\\varepsilon_0 A}{(d - t) + \\frac{t}{\\varepsilon_r}} \\quad | \\quad C_{\\text{multi}} = (n - 1) \\frac{\\varepsilon_0 \\varepsilon_r A}{d} \\quad | \\quad V_{\\text{max}} = E_{\\text{breakdown}} \\cdot d</span></div>`,
      lines: [
        '<b>Composite Dielectric:</b> Equivalent air gap is $d_{\\text{eff}} = (d - t) + t / \\varepsilon_r$. Since $\\varepsilon_r > 1$, introducing any slab ALWAYS increases capacitance.',
        '<b>Multi-Plate Multiplication:</b> $n$ interleaved plates create $(n - 1)$ parallel gaps.',
        '<b>Dielectric Breakdown Strengths:</b> Dry Air ~ 3 kV/mm, Kraft Paper ~ 16 kV/mm, Glass ~ 14 kV/mm, Mica ~ 60 kV/mm, Ceramic ~ 30 kV/mm.'
      ],
      variables: [
        { sym: 't', name: 'Slab thickness', unit: 'Meters (m)' },
        { sym: 'n', name: 'Number of interleaved plates', unit: 'Integer' },
        { sym: 'E_breakdown', name: 'Dielectric strength', unit: 'kV/mm or V/m' }
      ],
      derivationSteps: [
        { step: 1, title: 'Composite Voltage Sum', math: 'V = E_{\\text{air}}(d - t) + E_{\\text{slab}}(t) = \\frac{\\sigma}{\\varepsilon_0}(d - t) + \\frac{\\sigma}{\\varepsilon_0 \\varepsilon_r}t = \\frac{Q}{\\varepsilon_0 A}\\left[(d - t) + \\frac{t}{\\varepsilon_r}\\right]', text: 'Dividing Q by V yields the composite capacitance formula.' }
      ],
      example: {
        problem: 'A capacitor has plate area 0.02 m² and gap 6 mm. A 4 mm thick dielectric slab (ε_r = 6.0) is inserted. Find capacitance C.',
        solution: `Calculation:
  d_eff = (d - t) + t / ε_r = (6 - 4) + (4 / 6) = 2 + 0.6667 = 2.6667 mm = 2.6667 × 10⁻³ m
  C = (8.854 × 10⁻¹² × 0.02) / (2.6667 × 10⁻³) = 66.40 pF`
      },
      commonMistakes: [
        'Subtracting 1 from plate count incorrectly in multi-plate capacitors: 5 plates create $(5 - 1) = 4$ capacitor gaps, NOT 5!'
      ],
      realWorldApp: 'Multilayer ceramic capacitors (MLCCs) stack up to 1000 layers of 1 μm thin ceramic dielectric to pack 100 μF into tiny 0402 smartphone components.',
      simType: 'device_3d_lab',
      quiz: [
        { q: 'How many parallel capacitor gaps are formed by an interleaved capacitor having 9 metal plates?', opts: ['9', '8', '10', '18'], ans: 1, exp: 'A multi-plate capacitor with n plates forms exactly (n - 1) parallel gaps: 9 - 1 = 8 gaps.' }
      ]
    },

    {
      id: 'u3_t07',
      unitId: 'u3',
      topicNum: '3.7',
      title: 'Series & Parallel Capacitor Networks & Energy Storage',
      badge: 'Capacitor Networks',
      concept: 'Capacitor networks combine in series or parallel. In series: charge $Q$ is identical on all units, voltages add ($V = \\sum V_i$), and $\\frac{1}{C_{\\text{eq}}} = \\sum \\frac{1}{C_i}$ (equivalent capacitance is LESS than the smallest capacitor). In parallel: voltage $V$ is identical across all units, charges add ($Q = \\sum Q_i$), and $C_{\\text{eq}} = \\sum C_i$. Total stored energy is $U = \\frac{1}{2} C_{\\text{eq}} V^2$ with energy density $u = \\frac{1}{2} \\varepsilon E^2$.',
      whyItMatters: 'High-voltage capacitor banks in power factor correction and electric vehicle inverters connect capacitors in series-parallel configurations to meet voltage ratings and energy requirements.',
      mathHtml: `<div class="math-eq"><span>\\text{Series: } \\frac{1}{C_{\\text{eq}}} = \\sum \\frac{1}{C_i} \\quad | \\quad \\text{Parallel: } C_{\\text{eq}} = \\sum C_i \\quad | \\quad u = \\frac{1}{2} \\varepsilon_0 \\varepsilon_r E^2</span></div>`,
      lines: [
        '<b>Series Voltage Stress:</b> The SMALLEST capacitor experiences the LARGEST voltage ($V = Q/C$), making it most vulnerable to breakdown!',
        '<b>Parallel Addition:</b> Used when larger capacitance is needed at a given working voltage.',
        '<b>Energy Density:</b> Stored energy per unit volume: $u = \\frac{1}{2} \\varepsilon E^2 = \\frac{1}{2} D E$ (J/m³).'
      ],
      variables: [
        { sym: 'C_eq', name: 'Equivalent Capacitance', unit: 'Farads (F)' },
        { sym: 'u', name: 'Electrostatic Energy Density', unit: 'J/m³' }
      ],
      derivationSteps: [
        { step: 1, title: 'Series Charge Proof', math: 'V = V_1 + V_2 = \\frac{Q}{C_1} + \\frac{Q}{C_2} = Q \\left(\\frac{1}{C_1} + \\frac{1}{C_2}\\right) = \\frac{Q}{C_{\\text{eq}}}', text: 'Shows that reciprocal of C_eq equals sum of reciprocals.' }
      ],
      example: {
        problem: 'Three capacitors of 6 μF, 3 μF, and 2 μF are connected in series across 120 V DC. Find equivalent capacitance, total charge, and voltage across each.',
        solution: `Calculation:
  1 / C_eq = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1.0  ⟹  C_eq = 1.0 μF
  Total Charge Q = C_eq × V = 1.0 μF × 120 V = 120 μC
  Voltages:
  • V₁ = Q / C₁ = 120 μC / 6 μF = 20 V
  • V₂ = Q / C₂ = 120 μC / 3 μF = 40 V
  • V₃ = Q / C₃ = 120 μC / 2 μF = 60 V (Smallest capacitor holds highest voltage!)`
      },
      commonMistakes: [
        'Thinking the largest capacitor in a series string gets the most voltage. V = Q/C, so the SMALLEST capacitor takes the highest voltage drop!'
      ],
      realWorldApp: 'Electric vehicle supercapacitor banks use balancing resistors across series cells to prevent any single cell from exceeding its 2.7V breakdown rating.',
      simType: 'circuit_sim_network',
      quiz: [
        { q: 'Two capacitors of 10 μF and 10 μF connected in parallel have equivalent capacitance of:', opts: ['5 μF', '10 μF', '20 μF', '100 μF'], ans: 2, exp: 'In parallel, capacitances add directly: C_eq = C₁ + C₂ = 10 + 10 = 20 μF.' }
      ]
    }
  ],

  // 3. Complete Master Formula Vault (All Units)
  masterFormulas: [
    { id: 'f01', unit: 'u1', title: 'Ohm’s Law', math: 'V = I \\cdot R', desc: 'Voltage drop across a conductor is proportional to current at constant temperature.', unitStr: 'Volt (V)' },
    { id: 'f02', unit: 'u1', title: 'Resistance from Dimensions', math: 'R = \\rho \\frac{l}{A}', desc: 'Resistance varies directly with length and inversely with cross-sectional area.', unitStr: 'Ohm (Ω)' },
    { id: 'f03', unit: 'u1', title: 'Electrical Power', math: 'P = V \\cdot I = I^2 R = \\frac{V^2}{R}', desc: 'Rate of electrical energy dissipation in a circuit.', unitStr: 'Watt (W)' },
    { id: 'f04', unit: 'u1', title: 'Electrical Energy', math: 'W = P \\cdot t = V I t', desc: 'Total energy consumed over time (1 kWh = 3.6 MJ).', unitStr: 'Joule (J) / kWh' },
    { id: 'f05', unit: 'u1', title: 'Temperature Effect on Resistance', math: 'R_t = R_0 (1 + \\alpha_0 t)', desc: 'Resistance increase in pure metals with temperature rise.', unitStr: 'Ohm (Ω)' },
    { id: 'f06', unit: 'u1', title: 'Temperature Coefficient Conversion', math: '\\alpha_t = \\frac{\\alpha_0}{1 + \\alpha_0 t}', desc: 'Temperature coefficient at any operating temperature.', unitStr: 'per °C (/°C)' },
    { id: 'f07', unit: 'u1', title: 'Inductor Back EMF', math: 'e = -L \\frac{di}{dt}', desc: 'Self-induced counter electromotive force opposing current changes.', unitStr: 'Volt (V)' },
    { id: 'f08', unit: 'u1', title: 'Inductor Stored Energy', math: 'E = \\frac{1}{2} L I^2', desc: 'Energy stored in the coil’s magnetic field.', unitStr: 'Joule (J)' },
    { id: 'f09', unit: 'u1', title: 'Capacitor Charge & Current', math: 'Q = C V \\quad | \\quad i = C \\frac{dv}{dt}', desc: 'Charge storage and charging current in dielectric.', unitStr: 'Coulomb (C)' },
    { id: 'f10', unit: 'u1', title: 'Capacitor Stored Energy', math: 'E = \\frac{1}{2} C V^2', desc: 'Energy stored in the electrostatic strain field.', unitStr: 'Joule (J)' },
    { id: 'f11', unit: 'u2', title: 'Series Resistors', math: 'R_{\\text{eq}} = R_1 + R_2 + \\dots + R_n', desc: 'Equivalent resistance of end-to-end series resistors.', unitStr: 'Ohm (Ω)' },
    { id: 'f12', unit: 'u2', title: 'Voltage Division Rule (VDR)', math: 'V_1 = V \\left(\\frac{R_1}{R_1 + R_2}\\right)', desc: 'Fractional voltage drop across a series resistor.', unitStr: 'Volt (V)' },
    { id: 'f13', unit: 'u2', title: 'Parallel Resistors', math: 'R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2}', desc: 'Two-resistor parallel equivalent resistance shortcut.', unitStr: 'Ohm (Ω)' },
    { id: 'f14', unit: 'u2', title: 'Current Division Rule (CDR)', math: 'I_1 = I \\left(\\frac{R_2}{R_1 + R_2}\\right)', desc: 'Branch current division between two parallel resistors.', unitStr: 'Ampere (A)' },
    { id: 'f15', unit: 'u2', title: 'Delta to Star (Δ → Y)', math: 'R_1 = \\frac{R_b R_c}{R_a + R_b + R_c}', desc: 'Product of adjacent delta resistors over sum of all three.', unitStr: 'Ohm (Ω)' },
    { id: 'f16', unit: 'u2', title: 'Star to Delta (Y → Δ)', math: 'R_A = R_1 + R_2 + \\frac{R_1 R_2}{R_3}', desc: 'Sum of star resistors plus product over opposite resistor.', unitStr: 'Ohm (Ω)' },
    { id: 'f17', unit: 'u2', title: 'Kirchhoff’s Current Law (KCL)', math: '\\sum I_{\\text{in}} = \\sum I_{\\text{out}}', desc: 'Conservation of electric charge at any circuit node.', unitStr: 'Ampere (A)' },
    { id: 'f18', unit: 'u2', title: 'Kirchhoff’s Voltage Law (KVL)', math: '\\sum V_{\\text{loop}} = 0', desc: 'Conservation of electric energy around any closed loop.', unitStr: 'Volt (V)' },
    { id: 'f19', unit: 'u3', title: 'Coulomb’s Force Law', math: 'F = \\frac{1}{4\\pi\\varepsilon_0\\varepsilon_r} \\frac{q_1 q_2}{r^2}', desc: 'Electrostatic mechanical force between two point charges.', unitStr: 'Newton (N)' },
    { id: 'f20', unit: 'u3', title: 'Electric Field Intensity', math: 'E = \\frac{F}{Q} = \\frac{V}{d}', desc: 'Force per unit positive charge or voltage gradient.', unitStr: 'V/m or N/C' },
    { id: 'f21', unit: 'u3', title: 'Electric Flux Density', math: 'D = \\frac{\\Psi}{A} = \\varepsilon_0 \\varepsilon_r E', desc: 'Electrostatic flux per unit cross-sectional area.', unitStr: 'C/m²' },
    { id: 'f22', unit: 'u3', title: 'Parallel-Plate Capacitance', math: 'C = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}', desc: 'Capacitance of two parallel plates with uniform dielectric.', unitStr: 'Farad (F)' },
    { id: 'f23', unit: 'u3', title: 'Composite Slab Capacitance', math: 'C = \\frac{\\varepsilon_0 A}{(d - t) + \\frac{t}{\\varepsilon_r}}', desc: 'Capacitance with inserted dielectric slab of thickness t.', unitStr: 'Farad (F)' },
    { id: 'f24', unit: 'u3', title: 'Multi-Plate Capacitance', math: 'C = (n - 1) \\frac{\\varepsilon_0 \\varepsilon_r A}{d}', desc: 'Capacitance of n interleaved parallel plates.', unitStr: 'Farad (F)' },
    { id: 'f25', unit: 'u3', title: 'Series Capacitors', math: '\\frac{1}{C_{\\text{eq}}} = \\sum \\frac{1}{C_i}', desc: 'Reciprocal addition for series capacitor strings.', unitStr: 'Farad (F)' },
    { id: 'f26', unit: 'u3', title: 'Parallel Capacitors', math: 'C_{\\text{eq}} = \\sum C_i', desc: 'Direct summation for parallel-connected capacitors.', unitStr: 'Farad (F)' }
  ]
};

if (typeof window !== 'undefined' && window.MathRenderer) {
  window.MathRenderer.enrichCourseData(BEEE_DATA);
}
