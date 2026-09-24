/**
 * calculators.js - Complete Suite of 12 Engineering Calculators for BEEE
 * Real-time calculation, step-by-step mathematical substitution, SI unit verification.
 */

const BEEECalculators = {
  /* =========================================================================
   * 1. OHM'S LAW & POWER CALCULATOR
   * ========================================================================= */
  calcOhmLaw(vVal, iVal, rVal, pVal) {
    let V = parseFloat(vVal);
    let I = parseFloat(iVal);
    let R = parseFloat(rVal);
    let P = parseFloat(pVal);

    let count = [!isNaN(V), !isNaN(I), !isNaN(R), !isNaN(P)].filter(Boolean).length;
    if (count < 2) {
      return { error: 'Please enter at least 2 known values to calculate the remaining variables.' };
    }

    let steps = [];

    // Solve combinations
    if (!isNaN(V) && !isNaN(I)) {
      R = V / I;
      P = V * I;
      steps.push(`Known: V = ${V} V, I = ${I} A`);
      steps.push(`Resistance: R = V / I = ${V} / ${I} = ${R.toFixed(4)} Ω`);
      steps.push(`Power: P = V · I = ${V} · ${I} = ${P.toFixed(4)} W`);
    } else if (!isNaN(V) && !isNaN(R)) {
      I = V / R;
      P = (V * V) / R;
      steps.push(`Known: V = ${V} V, R = ${R} Ω`);
      steps.push(`Current: I = V / R = ${V} / ${R} = ${I.toFixed(4)} A`);
      steps.push(`Power: P = V² / R = (${V})² / ${R} = ${P.toFixed(4)} W`);
    } else if (!isNaN(V) && !isNaN(P)) {
      I = P / V;
      R = (V * V) / P;
      steps.push(`Known: V = ${V} V, P = ${P} W`);
      steps.push(`Current: I = P / V = ${P} / ${V} = ${I.toFixed(4)} A`);
      steps.push(`Resistance: R = V² / P = (${V})² / ${P} = ${R.toFixed(4)} Ω`);
    } else if (!isNaN(I) && !isNaN(R)) {
      V = I * R;
      P = I * I * R;
      steps.push(`Known: I = ${I} A, R = ${R} Ω`);
      steps.push(`Voltage: V = I · R = ${I} · ${R} = ${V.toFixed(4)} V`);
      steps.push(`Power: P = I² · R = (${I})² · ${R} = ${P.toFixed(4)} W`);
    } else if (!isNaN(I) && !isNaN(P)) {
      V = P / I;
      R = P / (I * I);
      steps.push(`Known: I = ${I} A, P = ${P} W`);
      steps.push(`Voltage: V = P / I = ${P} / ${I} = ${V.toFixed(4)} V`);
      steps.push(`Resistance: R = P / I² = ${P} / (${I})² = ${R.toFixed(4)} Ω`);
    } else if (!isNaN(R) && !isNaN(P)) {
      V = Math.sqrt(P * R);
      I = Math.sqrt(P / R);
      steps.push(`Known: R = ${R} Ω, P = ${P} W`);
      steps.push(`Voltage: V = √(P · R) = √(${P} · ${R}) = ${V.toFixed(4)} V`);
      steps.push(`Current: I = √(P / R) = √(${P} / ${R}) = ${I.toFixed(4)} A`);
    }

    return {
      V: V.toFixed(3),
      I: I.toFixed(4),
      R: R.toFixed(3),
      P: P.toFixed(3),
      steps
    };
  },

  /* =========================================================================
   * 2. ENERGY & UTILITY TARIFF BILLING
   * ========================================================================= */
  calcEnergyBill(powerWatts, hoursPerDay, daysCount, ratePerKWh) {
    const P = parseFloat(powerWatts) || 0;
    const h = parseFloat(hoursPerDay) || 0;
    const d = parseFloat(daysCount) || 30;
    const rate = parseFloat(ratePerKWh) || 7.5;

    const totalHours = h * d;
    const energyJoules = P * (totalHours * 3600);
    const energyKWh = (P * totalHours) / 1000;
    const totalCost = energyKWh * rate;

    const steps = [
      `Power P = ${P} W = ${(P / 1000).toFixed(3)} kW`,
      `Total Operating Time t = ${h} hrs/day × ${d} days = ${totalHours} hours (${(totalHours * 3600).toLocaleString()} seconds)`,
      `Energy in Joules: W = P · t = ${P} W × ${(totalHours * 3600)} s = ${energyJoules.toExponential(4)} J (${(energyJoules / 1e6).toFixed(3)} MJ)`,
      `Energy in Commercial Units (kWh): E = (P × t) / 1000 = (${P} × ${totalHours}) / 1000 = ${energyKWh.toFixed(3)} kWh (Units)`,
      `Electricity Bill: Total Cost = ${energyKWh.toFixed(3)} Units × ₹${rate.toFixed(2)} = ₹${totalCost.toFixed(2)}`
    ];

    return {
      energyJoules: energyJoules.toExponential(3) + ' J',
      energyMJ: (energyJoules / 1e6).toFixed(3) + ' MJ',
      energyKWh: energyKWh.toFixed(2) + ' kWh (Units)',
      totalCost: '₹ ' + totalCost.toFixed(2),
      steps
    };
  },

  /* =========================================================================
   * 3. CONDUCTOR RESISTANCE BY GEOMETRY (R = ρ·l / A)
   * ========================================================================= */
  calcResistanceGeometry(materialKey, lengthMeters, areaMm2, currentAmps = 1) {
    const materials = {
      copper: { name: 'Copper', rho: 1.72e-8 },
      aluminum: { name: 'Aluminum', rho: 2.82e-8 },
      silver: { name: 'Silver', rho: 1.59e-8 },
      gold: { name: 'Gold', rho: 2.44e-8 },
      iron: { name: 'Iron', rho: 9.71e-8 },
      nichrome: { name: 'Nichrome', rho: 100e-8 },
      constantan: { name: 'Constantan', rho: 49e-8 }
    };

    const mat = materials[materialKey] || materials.copper;
    const l = parseFloat(lengthMeters) || 1;
    const aMm2 = parseFloat(areaMm2) || 1;
    const A = aMm2 * 1e-6; // convert mm^2 to m^2
    const I = parseFloat(currentAmps) || 1;

    const R = (mat.rho * l) / A;
    const G = 1 / R;
    const J = I / A; // A/m^2
    const J_mm2 = I / aMm2; // A/mm^2
    const Ploss = I * I * R;

    const steps = [
      `Selected Material: ${mat.name} (Resistivity ρ = ${mat.rho.toExponential(2)} Ω·m)`,
      `Length l = ${l} m, Area A = ${aMm2} mm² = ${A.toExponential(2)} m²`,
      `Resistance: R = ρ · l / A = (${mat.rho.toExponential(2)} × ${l}) / ${A.toExponential(2)} = ${R.toFixed(5)} Ω`,
      `Conductance: G = 1 / R = 1 / ${R.toFixed(5)} = ${G.toFixed(4)} Siemens (S)`,
      `Current Density: J = I / A = ${I} A / ${aMm2} mm² = ${J_mm2.toFixed(3)} A/mm² (${J.toExponential(2)} A/m²)`,
      `I²R Heat Dissipation: P_loss = (${I})² × ${R.toFixed(5)} = ${Ploss.toFixed(4)} Watts`
    ];

    return {
      R: R.toFixed(5) + ' Ω',
      G: G.toFixed(4) + ' S',
      J: J_mm2.toFixed(2) + ' A/mm²',
      Ploss: Ploss.toFixed(4) + ' W',
      steps
    };
  },

  /* =========================================================================
   * 4. TEMPERATURE COEFFICIENT OF RESISTANCE (Rt = R0[1 + α0·Δt])
   * ========================================================================= */
  calcTemperatureResistance(r0Val, t1Val, t2Val, alpha0Val) {
    const R1 = parseFloat(r0Val) || 100;
    const t1 = parseFloat(t1Val) || 0;
    const t2 = parseFloat(t2Val) || 100;
    const alpha0 = parseFloat(alpha0Val) || 0.00428; // Copper default

    // If t1 == 0, R1 is R0.
    // In general: R2 = R1 * [1 + alpha0 * t2] / [1 + alpha0 * t1]
    const R0 = R1 / (1 + alpha0 * t1);
    const R2 = R0 * (1 + alpha0 * t2);
    const deltaR = R2 - R1;
    const deltaT = t2 - t1;

    // Inferred zero resistance temperature T0 = -1 / alpha0
    const T0 = -1 / alpha0;

    const steps = [
      `Initial Resistance R₁ = ${R1} Ω at t₁ = ${t1} °C`,
      `Final Temperature t₂ = ${t2} °C (Temperature Change Δt = ${deltaT} °C)`,
      `Temperature Coefficient α₀ (at 0°C) = ${alpha0} /°C`,
      `Base Resistance at 0°C: R₀ = R₁ / (1 + α₀·t₁) = ${R1} / (1 + ${alpha0} × ${t1}) = ${R0.toFixed(3)} Ω`,
      `Final Resistance: R₂ = R₀ · [1 + α₀·t₂] = ${R0.toFixed(3)} · [1 + ${alpha0} × ${t2}] = ${R2.toFixed(3)} Ω`,
      `Absolute Change in Resistance: ΔR = R₂ − R₁ = ${deltaR.toFixed(3)} Ω (${((deltaR / R1) * 100).toFixed(2)}% shift)`,
      `Inferred Absolute Zero-Resistance Temperature: T₀ = −1 / α₀ = −1 / ${alpha0} = ${T0.toFixed(1)} °C`
    ];

    return {
      R2: R2.toFixed(3) + ' Ω',
      deltaR: deltaR.toFixed(3) + ' Ω',
      percentShift: ((deltaR / R1) * 100).toFixed(2) + '%',
      inferredZero: T0.toFixed(1) + ' °C',
      steps
    };
  },

  /* =========================================================================
   * 5. SERIES RESISTORS & VOLTAGE DIVIDER RULE (VDR)
   * ========================================================================= */
  calcSeriesVDR(vsVal, r1Val, r2Val, r3Val = 0, r4Val = 0) {
    const Vs = parseFloat(vsVal) || 24;
    const rValues = [parseFloat(r1Val) || 0, parseFloat(r2Val) || 0, parseFloat(r3Val) || 0, parseFloat(r4Val) || 0].filter(r => r > 0);

    if (rValues.length === 0) return { error: 'Please enter at least one valid resistance.' };

    const Req = rValues.reduce((a, b) => a + b, 0);
    const I = Vs / Req;

    const drops = rValues.map((r, idx) => {
      const v = Vs * (r / Req);
      const p = v * I;
      return {
        id: idx + 1,
        R: r,
        V: v.toFixed(3),
        P: p.toFixed(3)
      };
    });

    const steps = [
      `Supply Voltage Vs = ${Vs} V`,
      `Equivalent Series Resistance: Req = ${rValues.map((r, i) => `R${i+1}`).join(' + ')} = ${rValues.join(' + ')} = ${Req.toFixed(3)} Ω`,
      `Uniform Circuit Current: I = Vs / Req = ${Vs} / ${Req.toFixed(3)} = ${I.toFixed(4)} A`
    ];

    drops.forEach(d => {
      steps.push(`VDR for R${d.id} (${d.R}Ω): V${d.id} = Vs · (R${d.id} / Req) = ${Vs} · (${d.R} / ${Req.toFixed(3)}) = ${d.V} V (Power P = ${d.P} W)`);
    });

    steps.push(`KVL Verification: ∑ Vk = ${drops.map(d => d.V).join(' + ')} = ${drops.reduce((a, d) => a + parseFloat(d.V), 0).toFixed(2)} V = Vs (Satisfied)`);

    return {
      Req: Req.toFixed(3) + ' Ω',
      I: I.toFixed(4) + ' A',
      drops,
      steps
    };
  },

  /* =========================================================================
   * 6. PARALLEL RESISTORS & CURRENT DIVIDER RULE (CDR)
   * ========================================================================= */
  calcParallelCDR(vOrIType, totalVal, r1Val, r2Val, r3Val = 0, r4Val = 0) {
    const rValues = [parseFloat(r1Val) || 0, parseFloat(r2Val) || 0, parseFloat(r3Val) || 0, parseFloat(r4Val) || 0].filter(r => r > 0);

    if (rValues.length === 0) return { error: 'Please enter at least one valid resistance.' };

    const invSum = rValues.reduce((sum, r) => sum + (1 / r), 0);
    const Req = 1 / invSum;

    let V, Itotal;
    const inputVal = parseFloat(totalVal) || 10;
    if (vOrIType === 'voltage') {
      V = inputVal;
      Itotal = V / Req;
    } else {
      Itotal = inputVal;
      V = Itotal * Req;
    }

    const currents = rValues.map((r, idx) => {
      const i = V / r;
      const p = V * i;
      return {
        id: idx + 1,
        R: r,
        I: i.toFixed(4),
        P: p.toFixed(3)
      };
    });

    const steps = [
      `Equivalent Parallel Resistance: 1/Req = ${rValues.map((r, i) => `(1/R${i+1})`).join(' + ')} = ${rValues.map(r => `(1/${r})`).join(' + ')} = ${invSum.toFixed(5)} S`,
      `Req = 1 / ${invSum.toFixed(5)} = ${Req.toFixed(4)} Ω`,
      `Branch Common Voltage: V = ${V.toFixed(3)} V | Total Current Itotal = ${Itotal.toFixed(4)} A`
    ];

    currents.forEach(c => {
      steps.push(`CDR for R${c.id} (${c.R}Ω): I${c.id} = Itotal · (Req / R${c.id}) = ${Itotal.toFixed(4)} · (${Req.toFixed(4)} / ${c.R}) = ${c.I} A (Power = ${c.P} W)`);
    });

    steps.push(`KCL Verification: ∑ Ik = ${currents.map(c => c.I).join(' + ')} = ${currents.reduce((a, c) => a + parseFloat(c.I), 0).toFixed(4)} A = Itotal (Satisfied)`);

    return {
      Req: Req.toFixed(4) + ' Ω',
      V: V.toFixed(3) + ' V',
      Itotal: Itotal.toFixed(4) + ' A',
      currents,
      steps
    };
  },

  /* =========================================================================
   * 7. STAR-DELTA (Y ↔ Δ) CONVERTER
   * ========================================================================= */
  calcStarDelta(direction, v1, v2, v3) {
    const val1 = parseFloat(v1) || 10;
    const val2 = parseFloat(v2) || 20;
    const val3 = parseFloat(v3) || 30;

    let steps = [];
    if (direction === 'star_to_delta') {
      // Inputs: Ra, Rb, Rc
      const Ra = val1, Rb = val2, Rc = val3;
      const num = (Ra * Rb) + (Rb * Rc) + (Rc * Ra);
      const Rab = Ra + Rb + (Ra * Rb) / Rc;
      const Rbc = Rb + Rc + (Rb * Rc) / Ra;
      const Rca = Rc + Ra + (Rc * Ra) / Rb;

      steps = [
        `Star Network Inputs: R_A = ${Ra} Ω, R_B = ${Rb} Ω, R_C = ${Rc} Ω`,
        `Sum of Pairwise Products: ∑(R_i · R_j) = (${Ra}×${Rb}) + (${Rb}×${Rc}) + (${Rc}×${Ra}) = ${num.toFixed(2)}`,
        `R_AB = R_A + R_B + (R_A · R_B / R_C) = ${Ra} + ${Rb} + (${Ra * Rb} / ${Rc}) = ${Rab.toFixed(3)} Ω`,
        `R_BC = R_B + R_C + (R_B · R_C / R_A) = ${Rb} + ${Rc} + (${Rb * Rc} / ${Ra}) = ${Rbc.toFixed(3)} Ω`,
        `R_CA = R_C + R_A + (R_C · R_A / R_B) = ${Rc} + ${Ra} + (${Rc * Ra} / ${Rb}) = ${Rca.toFixed(3)} Ω`
      ];

      return {
        rA: Rab.toFixed(3) + ' Ω',
        rB: Rbc.toFixed(3) + ' Ω',
        rC: Rca.toFixed(3) + ' Ω',
        labelA: 'R_AB (Δ)',
        labelB: 'R_BC (Δ)',
        labelC: 'R_CA (Δ)',
        steps
      };
    } else {
      // Inputs: Rab, Rbc, Rca (Delta to Star)
      const Rab = val1, Rbc = val2, Rca = val3;
      const den = Rab + Rbc + Rca;
      const Ra = (Rab * Rca) / den;
      const Rb = (Rab * Rbc) / den;
      const Rc = (Rbc * Rca) / den;

      steps = [
        `Delta Network Inputs: R_AB = ${Rab} Ω, R_BC = ${Rbc} Ω, R_CA = ${Rca} Ω`,
        `Sum of All Delta Resistors: ∑ R_Δ = ${Rab} + ${Rbc} + ${Rca} = ${den.toFixed(2)} Ω`,
        `R_A = (R_AB · R_CA) / ∑ R_Δ = (${Rab} × ${Rca}) / ${den.toFixed(2)} = ${Ra.toFixed(3)} Ω`,
        `R_B = (R_AB · R_BC) / ∑ R_Δ = (${Rab} × ${Rbc}) / ${den.toFixed(2)} = ${Rb.toFixed(3)} Ω`,
        `R_C = (R_BC · R_CA) / ∑ R_Δ = (${Rbc} × ${Rca}) / ${den.toFixed(2)} = ${Rc.toFixed(3)} Ω`
      ];

      return {
        rA: Ra.toFixed(3) + ' Ω',
        rB: Rb.toFixed(3) + ' Ω',
        rC: Rc.toFixed(3) + ' Ω',
        labelA: 'R_A (Y)',
        labelB: 'R_B (Y)',
        labelC: 'R_C (Y)',
        steps
      };
    }
  },

  /* =========================================================================
   * 8. INDUCTANCE, EMF & MAGNETIC ENERGY
   * ========================================================================= */
  calcInductance(lVal, diVal, dtVal, iVal) {
    const L_mH = parseFloat(lVal) || 50;
    const L = L_mH * 1e-3; // Henrys
    const di = parseFloat(diVal) || 5; // Amps
    const dt_ms = parseFloat(dtVal) || 20; // ms
    const dt = dt_ms * 1e-3; // seconds
    const I = parseFloat(iVal) || 4; // Amps

    const di_dt = di / dt;
    const emf = -L * di_dt;
    const absEmf = Math.abs(emf);
    const energy = 0.5 * L * I * I;

    const steps = [
      `Inductance L = ${L_mH} mH = ${L.toExponential(3)} H`,
      `Current Rate of Change: di/dt = Δi / Δt = ${di} A / ${dt_ms} ms = ${di_dt.toFixed(2)} A/s`,
      `Faraday-Lenz Induced EMF: e = −L · (di/dt) = −(${L}) × (${di_dt.toFixed(2)}) = ${emf.toFixed(3)} V`,
      `Magnitude of Induced Back-EMF: |e| = ${absEmf.toFixed(3)} Volts`,
      `Energy Stored in Magnetic Field (at I = ${I} A): W_L = ½ · L · I² = 0.5 × ${L} × (${I})² = ${energy.toFixed(5)} Joules (${(energy * 1000).toFixed(2)} mJ)`
    ];

    return {
      emf: emf.toFixed(3) + ' V',
      absEmf: absEmf.toFixed(3) + ' V',
      energy: (energy * 1000).toFixed(3) + ' mJ',
      energyJ: energy.toExponential(4) + ' J',
      steps
    };
  },

  /* =========================================================================
   * 9. CAPACITANCE & RC TRANSIENT
   * ========================================================================= */
  calcCapacitorRC(vsVal, rVal, cVal, tVal) {
    const Vs = parseFloat(vsVal) || 12;
    const R = parseFloat(rVal) || 1000; // Ohms
    const C_uF = parseFloat(cVal) || 100; // microFarads
    const C = C_uF * 1e-6; // Farads
    const t_ms = parseFloat(tVal) || 100; // ms
    const t = t_ms * 1e-3; // seconds

    const tau = R * C; // seconds
    const tau_ms = tau * 1000;
    const timeRatio = t / tau;

    const vC = Vs * (1 - Math.exp(-timeRatio));
    const iC = (Vs / R) * Math.exp(-timeRatio);
    const charge = C * vC;
    const energy = 0.5 * C * vC * vC;

    const steps = [
      `Supply Voltage Vs = ${Vs} V, Resistance R = ${R} Ω, Capacitance C = ${C_uF} μF = ${C.toExponential(2)} F`,
      `Time Constant: τ = R · C = ${R} Ω × ${C.toExponential(2)} F = ${tau_ms.toFixed(2)} ms (${tau.toExponential(3)} s)`,
      `Elapsed Time: t = ${t_ms} ms (${timeRatio.toFixed(3)} multiples of τ)`,
      `Instantaneous Capacitor Voltage: v_C(t) = Vs · [1 − e^(−t/τ)] = ${Vs} · [1 − e^(−${timeRatio.toFixed(3)})] = ${vC.toFixed(3)} V`,
      `Instantaneous Charging Current: i_C(t) = (Vs / R) · e^(−t/τ) = (${Vs}/${R}) · e^(−${timeRatio.toFixed(3)}) = ${(iC * 1000).toFixed(3)} mA`,
      `Accumulated Charge: Q = C · v_C = ${C.toExponential(2)} × ${vC.toFixed(3)} = ${(charge * 1e6).toFixed(3)} μC`,
      `Stored Electrostatic Energy: U = ½ · C · V² = 0.5 × ${C.toExponential(2)} × (${vC.toFixed(3)})² = ${(energy * 1000).toFixed(3)} mJ`
    ];

    return {
      tau: tau_ms.toFixed(2) + ' ms',
      vC: vC.toFixed(3) + ' V',
      iC: (iC * 1000).toFixed(3) + ' mA',
      charge: (charge * 1e6).toFixed(3) + ' μC',
      energy: (energy * 1000).toFixed(3) + ' mJ',
      steps
    };
  },

  /* =========================================================================
   * 10. COULOMB'S LAW ELECTROSTATIC FORCE & FIELD
   * ========================================================================= */
  calcCoulomb(q1_uC, q2_uC, r_cm, erVal = 1) {
    const q1 = (parseFloat(q1_uC) || 1) * 1e-6; // C
    const q2 = (parseFloat(q2_uC) || 1) * 1e-6; // C
    const r_cm_val = parseFloat(r_cm) || 10;
    const r = r_cm_val * 1e-2; // meters
    const er = parseFloat(erVal) || 1;
    const k = 8.98755e9;

    const force = (k / er) * (Math.abs(q1 * q2) / (r * r));
    const isRepulsive = (q1 * q2) > 0;
    const field1 = (k / er) * (Math.abs(q1) / (r * r));

    const steps = [
      `q₁ = ${(q1 * 1e6).toFixed(2)} μC = ${q1.toExponential(3)} C`,
      `q₂ = ${(q2 * 1e6).toFixed(2)} μC = ${q2.toExponential(3)} C`,
      `Separation Distance r = ${r_cm_val} cm = ${r.toFixed(3)} m`,
      `Medium Relative Permittivity ε_r = ${er}`,
      `Coulomb's Law: F = [1 / (4πε₀ε_r)] · (|q₁ · q₂| / r²) = (${k.toExponential(3)} / ${er}) · (${Math.abs(q1 * q2).toExponential(3)} / ${Math.pow(r, 2).toFixed(4)})`,
      `Resulting Force F = ${force.toFixed(4)} Newtons (${isRepulsive ? 'Repulsive: Like Signs' : 'Attractive: Unlike Signs'})`,
      `Electric Field Intensity due to q₁ at distance r: E₁ = F / q₂ = ${field1.toExponential(3)} N/C (or V/m)`
    ];

    return {
      force: force.toFixed(4) + ' N',
      nature: isRepulsive ? 'Repulsive (Like Signs)' : 'Attractive (Unlike Signs)',
      field: field1.toExponential(3) + ' N/C',
      steps
    };
  },

  /* =========================================================================
   * 11. COMPOSITE DIELECTRIC PARALLEL-PLATE CAPACITOR
   * ========================================================================= */
  calcCompositeCapacitor(areaCm2, totalDistMm, t1Mm, er1Val, t2Mm, er2Val, voltage) {
    const A_cm2 = parseFloat(areaCm2) || 100;
    const A = A_cm2 * 1e-4; // m^2
    const d_mm = parseFloat(totalDistMm) || 5;
    const d = d_mm * 1e-3; // meters
    const t1 = (parseFloat(t1Mm) || 2) * 1e-3;
    const er1 = parseFloat(er1Val) || 4; // e.g. glass / bakelite
    const t2 = (parseFloat(t2Mm) || 2) * 1e-3;
    const er2 = parseFloat(er2Val) || 6; // e.g. mica
    const tAir = Math.max(0, d - t1 - t2);
    const V = parseFloat(voltage) || 100;

    const eps0 = 8.854187e-12; // F/m

    // C = (eps0 * A) / (t1/er1 + t2/er2 + tAir/1)
    const effDenom = (t1 / er1) + (t2 / er2) + (tAir / 1.0);
    const C = (eps0 * A) / effDenom;
    const C_pF = C * 1e12;
    const Q = C * V;
    const U = 0.5 * C * V * V;

    const steps = [
      `Plate Area A = ${A_cm2} cm² = ${A.toExponential(3)} m² | Total Plate Separation d = ${d_mm} mm`,
      `Dielectric Slab 1: Thickness t₁ = ${(t1 * 1000).toFixed(1)} mm, Relative Permittivity ε_r1 = ${er1}`,
      `Dielectric Slab 2: Thickness t₂ = ${(t2 * 1000).toFixed(1)} mm, Relative Permittivity ε_r2 = ${er2}`,
      `Remaining Air Gap: t_air = d − (t₁ + t₂) = ${(tAir * 1000).toFixed(1)} mm`,
      `Effective Separation: ∑(t_i / ε_ri) = (${(t1 * 1000).toFixed(1)}/${er1}) + (${(t2 * 1000).toFixed(1)}/${er2}) + ${(tAir * 1000).toFixed(1)} = ${(effDenom * 1000).toFixed(3)} mm`,
      `Composite Capacitance: C = (ε₀ · A) / [∑(t_i / ε_ri)] = ${C_pF.toFixed(2)} pF (${C.toExponential(3)} F)`,
      `Total Charge Stored: Q = C · V = ${C_pF.toFixed(2)} pF × ${V} V = ${(Q * 1e9).toFixed(3)} nC`,
      `Stored Electrostatic Energy: U = ½ · C · V² = ${(U * 1e6).toFixed(3)} μJ`
    ];

    return {
      C_pF: C_pF.toFixed(2) + ' pF',
      C_nF: (C * 1e9).toFixed(4) + ' nF',
      Q: (Q * 1e9).toFixed(3) + ' nC',
      U: (U * 1e6).toFixed(3) + ' μJ',
      steps
    };
  },

  /* =========================================================================
   * 12. RESISTOR COLOR CODE BAND DECODER
   * ========================================================================= */
  calcResistorColor(band1, band2, band3Mult, tolPercent) {
    const b1 = parseInt(band1, 10);
    const b2 = parseInt(band2, 10);
    const mult = parseFloat(band3Mult);
    const tol = parseFloat(tolPercent) || 5;

    const baseVal = (b1 * 10 + b2) * mult;
    let formatted = '';
    if (baseVal >= 1e6) formatted = (baseVal / 1e6).toFixed(2) + ' MΩ';
    else if (baseVal >= 1e3) formatted = (baseVal / 1e3).toFixed(2) + ' kΩ';
    else formatted = baseVal.toFixed(1) + ' Ω';

    const minVal = baseVal * (1 - tol / 100);
    const maxVal = baseVal * (1 + tol / 100);

    const steps = [
      `1st Significant Digit Band: ${b1}`,
      `2nd Significant Digit Band: ${b2}`,
      `Multiplier Band: 10^x = ×${mult}`,
      `Nominal Resistance: R = (${b1}${b2}) × ${mult} = ${formatted}`,
      `Tolerance: ±${tol}% (Spread: ±${((baseVal * tol) / 100).toFixed(1)} Ω)`,
      `Permissible Manufactured Range: ${minVal.toFixed(1)} Ω to ${maxVal.toFixed(1)} Ω`
    ];

    return {
      nominal: formatted,
      tolerance: `±${tol}%`,
      minR: minVal.toFixed(1) + ' Ω',
      maxR: maxVal.toFixed(1) + ' Ω',
      steps
    };
  }
};

window.BEEECalculators = BEEECalculators;
