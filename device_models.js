/**
 * device_models.js - 3D Models & Working Physical Simulations for Electrostatics
 * Provides 3 interactive devices with PBR textures, internal cutaway/X-Ray,
 * dynamic field lines, particle flow, molecular dipole polarization, and component inspection.
 */

class DeviceLab {
  constructor(containerElement, onPartSelectCallback, onMetricsUpdateCallback) {
    this.container = containerElement;
    this.onPartSelect = onPartSelectCallback;
    this.onMetricsUpdate = onMetricsUpdateCallback;

    // Simulation Parameters
    this.state = {
      activeDevice: 'parallel_plate', // 'parallel_plate', 'rolled_capacitor', 'electroscope'
      voltage: 1500, // Volts (0 to 5000)
      plateDistance: 30, // mm (10 to 60)
      dielectricInsert: 1.0, // 0.0 (none) to 1.0 (fully inserted)
      dielectricType: 'ceramic', // 'air', 'paper', 'glass', 'ceramic'
      viewMode: 'normal', // 'normal', 'xray', 'cutaway', 'exploded'
      explodedProgress: 0.0,
      xrayOpacity: 0.35,
      isPowered: true,
      polarity: 1, // 1 or -1
      autoRotate: false,
      sparkActive: false
    };

    // Dielectric constants (relative permittivity epsilon_r) and breakdown strengths (kV/mm)
    this.dielectricProps = {
      air: { er: 1.0006, breakdown: 3.0, color: 0x93c5fd, name: 'Dry Air', opacity: 0.15 },
      paper: { er: 3.8, breakdown: 16.0, color: 0xfde047, name: 'Kraft Dielectric Paper', opacity: 0.75 },
      glass: { er: 7.0, breakdown: 14.0, color: 0x38bdf8, name: 'Borosilicate Glass', opacity: 0.45 },
      ceramic: { er: 85.0, breakdown: 20.0, color: 0x0284c7, name: 'Barium Titanate Ceramic', opacity: 0.85 }
    };

    this.hotspots = [];
    this.selectedPartId = null;

    this.initThree();
    this.buildCurrentDevice();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060e);

    const w = (this.container && this.container.clientWidth > 0) ? this.container.clientWidth : (this.container && this.container.parentElement ? this.container.parentElement.clientWidth : 800) || 800;
    const h = (this.container && this.container.clientHeight > 0) ? this.container.clientHeight : 580;
    const aspect = w / h;

    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 45, 120);

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('Falling back to basic WebGL renderer:', e);
      this.renderer = new THREE.WebGLRenderer({ antialias: false });
    }

    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.ACESFilmicToneMapping) this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxDistance = 350;
      this.controls.minDistance = 20;
      this.controls.target.set(0, 15, 0);
    } else {
      this.setupBuiltinControls();
    }

    // Multi-Point Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    this.scene.add(ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    this.keyLight.position.set(80, 120, 90);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x00f5ff, 0.95);
    this.fillLight.position.set(-90, 60, -70);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0xff2e93, 0.7);
    this.rimLight.position.set(0, -60, -80);
    this.scene.add(this.rimLight);

    // Subtle reflective grid floor
    const grid = new THREE.GridHelper(320, 40, 0x1e293b, 0x0a101f);
    grid.position.y = -20;
    this.scene.add(grid);

    // Raycaster for 3D clicking and Hotspots
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    window.addEventListener('resize', () => this.onWindowResize());

    if (window.ResizeObserver && this.container) {
      this.resizeObserver = new ResizeObserver(() => this.onWindowResize());
      this.resizeObserver.observe(this.container);
    }
  }

  setupBuiltinControls() {
    this.controls = {
      update: () => {},
      target: new THREE.Vector3(0, 15, 0)
    };
    let isDragging = false;
    let prevX = 0, prevY = 0;
    const dom = this.renderer.domElement;

    dom.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      if (this.deviceGroup) {
        this.deviceGroup.rotation.y += dx * 0.008;
      }
    }, { passive: true });

    window.addEventListener('pointerup', () => { isDragging = false; });

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY > 0 ? 1.08 : 0.92;
      this.camera.position.multiplyScalar(zoomFactor);
      this.camera.position.clampLength(25, 350);
    }, { passive: false });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth || (this.container.parentElement ? this.container.parentElement.clientWidth : 800) || 800;
    const h = this.container.clientHeight || 580;
    if (w > 0 && h > 0) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  clearDevice() {
    if (this.deviceGroup) {
      this.scene.remove(this.deviceGroup);
      // Clean up geometries and materials
      this.deviceGroup.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
    }
    this.hotspots = [];
    this.deviceParts = {};
    this.anodeGroup = null;
    this.cathodeGroup = null;
    this.dielectricGroup = null;
    this.dielectricMesh = null;
    this.matPlatePos = null;
    this.matPlateNeg = null;
    this.matDielectric = null;
    this.rollLayers = null;
    this.leaf1Group = null;
    this.leaf2Group = null;
    this.particleMesh = null;
    this.sparkLine = null;
    this.sparkLight = null;
    this.sparkGroup = null;
    this.fieldLinesGroup = null;
    this.dipoles = [];
    this.animatedParticles = null;
  }

  buildCurrentDevice() {
    this.clearDevice();
    this.deviceGroup = new THREE.Group();
    this.scene.add(this.deviceGroup);

    if (this.state.activeDevice === 'parallel_plate') {
      this.buildParallelPlateApparatus();
    } else if (this.state.activeDevice === 'rolled_capacitor') {
      this.buildRolledCapacitor();
    } else if (this.state.activeDevice === 'electroscope') {
      this.buildElectroscope();
    }

    this.updateMetrics();
    this.updateViewModeMaterials();
  }

  /* =========================================================================
   * DEVICE 1: PRECISION PARALLEL-PLATE CAPACITOR APPARATUS
   * ========================================================================= */
  buildParallelPlateApparatus() {
    this.deviceParts = {};
    const group = this.deviceGroup;

    // Materials
    const brushedTex = ProceduralTextures.createBrushedMetal('#d1d5db', 0.18);
    const brushedBump = ProceduralTextures.createBrushedBump();
    const brassTex = ProceduralTextures.createBrassTexture();
    const scaleTex = ProceduralTextures.createMetricScaleTexture();
    const decalTex = ProceduralTextures.createCautionDecal();

    this.matPlatePos = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      map: brushedTex,
      bumpMap: brushedBump,
      bumpScale: 0.08,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.0
    });

    this.matPlateNeg = new THREE.MeshStandardMaterial({
      color: 0xd8e0eb,
      map: brushedTex,
      bumpMap: brushedBump,
      bumpScale: 0.08,
      metalness: 0.88,
      roughness: 0.22,
      envMapIntensity: 1.0
    });

    this.matBrass = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      map: brassTex,
      metalness: 0.92,
      roughness: 0.25
    });

    this.matCopper = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.95,
      roughness: 0.18
    });

    this.matBase = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.3,
      roughness: 0.7
    });

    // 1. Heavy Laboratory Base Stand
    const baseGeo = new THREE.BoxGeometry(110, 6, 60);
    const baseMesh = new THREE.Mesh(baseGeo, this.matBase);
    baseMesh.position.set(0, -3, 0);
    group.add(baseMesh);
    this.deviceParts.base = {
      mesh: baseMesh,
      name: 'Insulated Instrument Base',
      category: 'Mechanical Support & Grounding',
      material: 'Hard Ebonite / Phenolic Resin with vibration isolation feet',
      desc: 'Provides a rigid, non-conductive foundation to isolate high-voltage charges and maintain micro-scale plate alignment.',
      formula: 'Dielectric Isolation: ρ > 10¹⁴ Ω·m'
    };

    // Metric Scale strip on the front edge of base
    const scaleGeo = new THREE.PlaneGeometry(80, 4);
    const scaleMat = new THREE.MeshBasicMaterial({ map: scaleTex, transparent: true });
    const scaleMesh = new THREE.Mesh(scaleGeo, scaleMat);
    scaleMesh.position.set(0, -1, 30.1);
    group.add(scaleMesh);

    // Caution spec plate
    const decalGeo = new THREE.PlaneGeometry(24, 12);
    const decalMat = new THREE.MeshBasicMaterial({ map: decalTex, transparent: true });
    const decalMesh = new THREE.Mesh(decalGeo, decalMat);
    decalMesh.position.set(-36, -2.8, 30.15);
    group.add(decalMesh);

    // 2. High-precision Guide Rails / Optical Support Rods
    const railGeo = new THREE.CylinderGeometry(1.4, 1.4, 90, 24);
    railGeo.rotateZ(Math.PI / 2);
    const railMesh1 = new THREE.Mesh(railGeo, this.matPlatePos);
    railMesh1.position.set(0, 5, -15);
    const railMesh2 = new THREE.Mesh(railGeo, this.matPlatePos);
    railMesh2.position.set(0, 5, 15);
    group.add(railMesh1, railMesh2);

    // 3. Positive Anode Plate (Fixed Mount)
    this.anodeGroup = new THREE.Group();
    const plateGeo = new THREE.BoxGeometry(2.5, 48, 48);
    const plateMeshPos = new THREE.Mesh(plateGeo, this.matPlatePos);
    this.anodeGroup.add(plateMeshPos);

    // Terminal Binding Post (+)
    const postGeo = new THREE.CylinderGeometry(2, 2, 10, 16);
    const postMeshPos = new THREE.Mesh(postGeo, this.matBrass);
    postMeshPos.position.set(-3, 26, 0);
    const capGeo = new THREE.CylinderGeometry(3, 3, 4, 16);
    const capMatPos = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const capMeshPos = new THREE.Mesh(capGeo, capMatPos);
    capMeshPos.position.set(-3, 32, 0);
    this.anodeGroup.add(postMeshPos, capMeshPos);

    // Positive Lead Wire
    const wireGeo = new THREE.CylinderGeometry(0.8, 0.8, 40, 12);
    wireGeo.rotateZ(Math.PI / 4);
    const wireMeshPos = new THREE.Mesh(wireGeo, this.matCopper);
    wireMeshPos.position.set(-18, 35, 0);
    this.anodeGroup.add(wireMeshPos);

    this.anodeGroup.position.set(-this.state.plateDistance / 2, 24, 0);
    group.add(this.anodeGroup);
    this.deviceParts.anode = {
      mesh: plateMeshPos,
      group: this.anodeGroup,
      name: 'Positive Conductor Plate (Anode)',
      category: 'Charge Accumulator (+Q)',
      material: 'Aircraft-grade brushed aluminum (99.7% Al, polished surface finish)',
      desc: 'Connected to positive terminal. Deficit of electrons creates positive surface charge density (+σ).',
      formula: 'σ = +Q / A = +ε₀ · εᵣ · E'
    };

    // 4. Negative Cathode Plate (Movable Carriage Mount)
    this.cathodeGroup = new THREE.Group();
    const plateMeshNeg = new THREE.Mesh(plateGeo, this.matPlateNeg);
    this.cathodeGroup.add(plateMeshNeg);

    // Terminal Binding Post (-)
    const postMeshNeg = new THREE.Mesh(postGeo, this.matBrass);
    postMeshNeg.position.set(3, 26, 0);
    const capMatNeg = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
    const capMeshNeg = new THREE.Mesh(capGeo, capMatNeg);
    capMeshNeg.position.set(3, 32, 0);
    this.cathodeGroup.add(postMeshNeg, capMeshNeg);

    // Negative Lead Wire
    const wireMeshNeg = new THREE.Mesh(wireGeo, this.matCopper);
    wireMeshNeg.position.set(18, 35, 0);
    wireMeshNeg.rotation.z = -Math.PI / 4;
    this.cathodeGroup.add(wireMeshNeg);

    // Micrometer Adjustment Screw on the cathode side
    const screwGeo = new THREE.CylinderGeometry(2.5, 2.5, 24, 24);
    screwGeo.rotateZ(Math.PI / 2);
    const screwMesh = new THREE.Mesh(screwGeo, this.matBrass);
    screwMesh.position.set(15, 0, 0);
    const thimbleGeo = new THREE.CylinderGeometry(5, 5, 10, 32);
    thimbleGeo.rotateZ(Math.PI / 2);
    const thimbleMesh = new THREE.Mesh(thimbleGeo, this.matPlatePos);
    thimbleMesh.position.set(26, 0, 0);
    this.cathodeGroup.add(screwMesh, thimbleMesh);

    this.cathodeGroup.position.set(this.state.plateDistance / 2, 24, 0);
    group.add(this.cathodeGroup);
    this.deviceParts.cathode = {
      mesh: plateMeshNeg,
      group: this.cathodeGroup,
      name: 'Negative Conductor Plate (Cathode)',
      category: 'Electron Reservoir (-Q)',
      material: 'Precision-ground mirror aluminum plate mounted on low-friction vernier carriage',
      desc: 'Accumulates excess electrons, inducing uniform negative surface charge (-σ).',
      formula: 'σ = −Q / A'
    };

    this.deviceParts.micrometer = {
      mesh: thimbleMesh,
      name: 'Micrometer Distance Spacing Adjuster',
      category: 'Precision Mechanical Calibrator',
      material: 'Knurled hardened brass with laser-engraved vernier gradations',
      desc: 'Permits continuous sub-millimeter adjustment of the inter-plate gap distance (d). Capacitance varies inversely with this distance (C ∝ 1/d).',
      formula: 'd = gap spacing (mm) | C = (ε · A) / d'
    };

    // 5. Slide-In Dielectric Slab
    this.dielectricGroup = new THREE.Group();
    const curDielectric = this.dielectricProps[this.state.dielectricType];
    const dielecTex = ProceduralTextures.createDielectricTexture('#0284c7', this.state.dielectricType);

    this.matDielectric = new THREE.MeshPhysicalMaterial({
      color: curDielectric.color,
      map: dielecTex,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: curDielectric.opacity,
      ior: 1.55,
      reflectivity: 0.5
    });

    const dielecGeo = new THREE.BoxGeometry(14, 46, 46);
    this.dielectricMesh = new THREE.Mesh(dielecGeo, this.matDielectric);
    this.dielectricGroup.add(this.dielectricMesh);

    // Dielectric Handle / Bracket
    const handleGeo = new THREE.CylinderGeometry(1.5, 1.5, 18, 16);
    const handleMesh = new THREE.Mesh(handleGeo, this.matBrass);
    handleMesh.position.set(0, 31, 0);
    this.dielectricGroup.add(handleMesh);

    // Calculate Y position based on insertion slider: 0.0 = fully raised outside, 1.0 = fully inside
    const insY = 24 + (1.0 - this.state.dielectricInsert) * 55;
    this.dielectricGroup.position.set(0, insY, 0);
    group.add(this.dielectricGroup);

    this.deviceParts.dielectric = {
      mesh: this.dielectricMesh,
      group: this.dielectricGroup,
      name: 'Dielectric Insulation Slab',
      category: 'Polarization Medium',
      material: `${curDielectric.name} (εᵣ = ${curDielectric.er}, Breakdown = ${curDielectric.breakdown} kV/mm)`,
      desc: 'Insulating material inserted between conductive plates. When an electric field penetrates, bound atomic charges polarize to establish an internal counter-field, lowering potential and greatly increasing capacitance.',
      formula: 'C = εᵣ · C₀ | D = ε₀ · εᵣ · E = ε₀ E + P'
    };

    // 6. Dynamic Internal Molecular Dipole Lattice (Inside Dielectric)
    this.buildDipoleMatrix();

    // 7. Volumetric 3D Electric Field Streamlines
    this.buildElectricFieldLines();

    // 8. Streaming Charge / Electron Flow Particle System
    this.buildParticleSystem();

    // 9. Spark Discharge Arc Mesh (Hidden until triggered)
    this.buildSparkArc();

    // 10. 3D Interactive Hotspot Markers
    this.addHotspot('anode', -this.state.plateDistance / 2 - 2, 40, 0, 'Anode (+ Plate)');
    this.addHotspot('cathode', this.state.plateDistance / 2 + 2, 40, 0, 'Cathode (- Plate)');
    this.addHotspot('dielectric', 0, 48, 0, 'Dielectric Slab');
    this.addHotspot('field_lines', 0, 24, 20, 'E-Field Vectors');
    this.addHotspot('dipoles', 0, 24, 0, 'Polarized Dipoles');
    this.addHotspot('micrometer', this.state.plateDistance / 2 + 25, 24, 0, 'Micrometer Screw');
  }

  /* --- Internal Molecular Dipoles --- */
  buildDipoleMatrix() {
    this.dipoles = [];
    const dipoleGroup = new THREE.Group();
    const numX = 3, numY = 4, numZ = 4;
    const spacingX = 4, spacingY = 9, spacingZ = 9;

    const posGeo = new THREE.SphereGeometry(0.9, 12, 12);
    const negGeo = new THREE.SphereGeometry(0.9, 12, 12);
    const linkGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.8, 8);
    linkGeo.rotateZ(Math.PI / 2);

    const posMat = new THREE.MeshBasicMaterial({ color: 0xff3b5c });
    const negMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    const linkMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });

    for (let x = 0; x < numX; x++) {
      for (let y = 0; y < numY; y++) {
        for (let z = 0; z < numZ; z++) {
          const dip = new THREE.Group();
          const posSphere = new THREE.Mesh(posGeo, posMat);
          posSphere.position.set(-1.4, 0, 0);
          const negSphere = new THREE.Mesh(negGeo, negMat);
          negSphere.position.set(1.4, 0, 0);
          const link = new THREE.Mesh(linkGeo, linkMat);

          dip.add(posSphere, negSphere, link);
          dip.position.set(
            (x - (numX - 1) / 2) * spacingX,
            (y - (numY - 1) / 2) * spacingY,
            (z - (numZ - 1) / 2) * spacingZ
          );

          // Random resting thermal orientation
          dip.userData.restRot = new THREE.Euler(
            (Math.random() - 0.5) * Math.PI,
            (Math.random() - 0.5) * Math.PI,
            (Math.random() - 0.5) * Math.PI
          );
          dip.rotation.copy(dip.userData.restRot);

          dipoleGroup.add(dip);
          this.dipoles.push(dip);
        }
      }
    }

    this.dielectricGroup.add(dipoleGroup);
    this.deviceParts.dipoles = {
      group: dipoleGroup,
      name: 'Dielectric Molecular Dipoles',
      category: 'Atomic Polarization Phenomenon',
      material: 'Bound electric dipole moments (p̄ = q·d̄) inside insulating molecules',
      desc: 'At zero voltage, thermal agitation keeps molecular dipoles randomly oriented. When voltage is applied, electrostatic torque aligns dipoles with field lines, reducing net internal E-field and storing potential energy.',
      formula: 'P = N · ⟨p⟩ = ε₀ · χₑ · E'
    };
  }

  /* --- Volumetric Electric Field Streamlines & Fringing Lines --- */
  buildElectricFieldLines() {
    this.fieldLinesGroup = new THREE.Group();
    const d = this.state.plateDistance;
    const halfD = d / 2;
    const numRows = 7;
    const numCols = 7;
    const spanY = 40;
    const spanZ = 40;

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x72e6ff,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const lines = [];
    for (let r = 0; r < numRows; r++) {
      const y = -spanY / 2 + (r / (numRows - 1)) * spanY;
      for (let c = 0; c < numCols; c++) {
        const z = -spanZ / 2 + (c / (numCols - 1)) * spanZ;

        // Fringing factor increases toward outer edges
        const distFromCenter = Math.sqrt(y * y + z * z) / (spanY * 0.7);
        const isEdge = distFromCenter > 0.65;

        const points = [];
        const segments = 12;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments; // 0 to 1
          const posX = -halfD + t * d;

          // Parabolic bulge for edge fringing
          const bulge = isEdge ? Math.sin(t * Math.PI) * distFromCenter * 5.5 : 0;
          const posY = y + (y === 0 ? 0 : (y / Math.abs(y)) * bulge);
          const posZ = z + (z === 0 ? 0 : (z / Math.abs(z)) * bulge);

          points.push(new THREE.Vector3(posX, posY, posZ));
        }

        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geo, lineMat.clone());
        line.userData = { points, isEdge, r, c };
        this.fieldLinesGroup.add(line);
        lines.push(line);
      }
    }

    this.fieldLinesGroup.position.set(0, 24, 0);
    this.deviceGroup.add(this.fieldLinesGroup);

    this.deviceParts.field_lines = {
      group: this.fieldLinesGroup,
      name: 'Electric Field Vectors & Flux Lines',
      category: 'Electrostatic Vector Field',
      material: 'Virtual flux lines of force (Faraday tubes of induction)',
      desc: 'Uniform electric field vectors point perpendicular from positive to negative plate (E = V/d). Notice the curved fringing field lines at plate edges bulging outward due to boundary effects.',
      formula: 'E = V / d | Ψ = ∫ E · dA = Q / ε'
    };
  }

  /* --- Electron Particle Flow System --- */
  buildParticleSystem() {
    const particleCount = 200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Start near wire/cathode
      positions[i * 3] = (Math.random() - 0.5) * this.state.plateDistance;
      positions[i * 3 + 1] = 24 + (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      velocities[i * 3] = 0.4 + Math.random() * 0.8;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      // Cyan-blue glowing electron color
      colors[i * 3] = 0.2;
      colors[i * 3 + 1] = 0.85;
      colors[i * 3 + 2] = 1.0;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.particleMesh = new THREE.Points(geo, mat);
    this.particleMesh.userData = { velocities };
    this.deviceGroup.add(this.particleMesh);
  }

  /* --- High-Voltage Spark Discharge Arc --- */
  buildSparkArc() {
    this.sparkGroup = new THREE.Group();
    const sparkMat = new THREE.LineBasicMaterial({
      color: 0x93c5fd,
      linewidth: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.0
    });

    const pts = [];
    for (let i = 0; i <= 15; i++) {
      pts.push(new THREE.Vector3(-this.state.plateDistance / 2, 24, 0));
    }
    const sparkGeo = new THREE.BufferGeometry().setFromPoints(pts);
    this.sparkLine = new THREE.Line(sparkGeo, sparkMat);
    this.sparkGroup.add(this.sparkLine);

    // Glow point light
    this.sparkLight = new THREE.PointLight(0x72e6ff, 0, 50);
    this.sparkLight.position.set(0, 24, 0);
    this.sparkGroup.add(this.sparkLight);

    this.deviceGroup.add(this.sparkGroup);
  }

  triggerSpark() {
    this.state.sparkActive = true;
    this.sparkDuration = 22; // frames
    if (window.AudioEngine) window.AudioEngine.playSpark();
  }

  /* =========================================================================
   * DEVICE 2: INDUSTRIAL CUTAWAY ROLLED CAPACITOR (CYLINDRICAL JELLYROLL)
   * ========================================================================= */
  buildRolledCapacitor() {
    this.deviceParts = {};
    const group = this.deviceGroup;

    const brushedTex = ProceduralTextures.createBrushedMetal('#cbd5e1', 0.25);
    const rollTex = ProceduralTextures.createElectrolyteRollTexture();
    const brassTex = ProceduralTextures.createBrassTexture();

    const matCan = new THREE.MeshStandardMaterial({
      color: 0xd1d5db,
      map: brushedTex,
      metalness: 0.85,
      roughness: 0.25,
      side: THREE.DoubleSide
    });

    const matRoll = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: rollTex,
      metalness: 0.4,
      roughness: 0.5,
      side: THREE.DoubleSide
    });

    const matRubber = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.9,
      metalness: 0.1
    });

    // 1. Cutaway Canister (Partial cylinder 270 degrees, 90 degrees open cutaway)
    const canGeo = new THREE.CylinderGeometry(20, 20, 60, 48, 1, true, Math.PI * 0.25, Math.PI * 1.5);
    const canMesh = new THREE.Mesh(canGeo, matCan);
    canMesh.position.set(0, 25, 0);
    group.add(canMesh);

    // Can Top Cap with safety explosion vent score
    const topCapGeo = new THREE.CircleGeometry(20, 32);
    topCapGeo.rotateX(-Math.PI / 2);
    const topCapMesh = new THREE.Mesh(topCapGeo, matCan);
    topCapMesh.position.set(0, 55, 0);
    group.add(topCapMesh);

    this.deviceParts.can = {
      mesh: canMesh,
      name: 'Hermetic Aluminum Canister (Cutaway)',
      category: 'Protective Enclosure & Heat Sink',
      material: 'Impact-extruded aluminum cylinder (99.5% Al) with top cross-shaped pressure relief vent',
      desc: 'Encloses and seals the sensitive electrolyte winding from atmospheric moisture and oxygen, preventing electrolyte dry-out and venting safely in case of overpressure.',
      formula: 'P_vent ≈ 0.8 to 1.2 MPa (Pressure Relief Trigger)'
    };

    // 2. Rubber Bung Seal Base
    const bungGeo = new THREE.CylinderGeometry(19.5, 19.5, 8, 32);
    const bungMesh = new THREE.Mesh(bungGeo, matRubber);
    bungMesh.position.set(0, -1, 0);
    group.add(bungMesh);
    this.deviceParts.bung = {
      mesh: bungMesh,
      name: 'Elastomer Rubber Bung & Terminal Header',
      category: 'Environmental Hermetic Seal',
      material: 'High-temperature vulcanized ethylene propylene diene monomer (EPDM)',
      desc: 'Creates a liquid-tight hermetic seal around the cathode and anode terminal leads, isolating the conductive liquid electrolyte inside the roll.',
      formula: 'T_rating = -40°C to +105°C | Hermetic Sealing'
    };

    // 3. Internal Concentric Spiral Jellyroll Layers
    this.rollLayers = [];
    const layerRadii = [17, 13.5, 10, 6.5];
    const layerNames = [
      { id: 'anode_foil', name: 'Etched Anode Aluminum Foil (+)', desc: 'High-purity aluminum foil electrochemically etched with microscopic tunnels to increase effective surface area by 100×.', formula: 'A_eff ≈ (80 to 120) × A_geom (Etch Factor)' },
      { id: 'oxide_layer', name: 'Dielectric Oxide Barrier (Al2O3)', desc: 'Anodized nanometer-thin aluminum oxide barrier layer grown directly onto the anode foil. Extremely high dielectric breakdown strength (800 kV/mm).', formula: 'd ≈ 1.2 to 1.4 nm/V | εᵣ = 9.2 (Al₂O₃ Barrier)' },
      { id: 'paper_separator', name: 'Electrolyte & Porous Kraft Paper', desc: 'Porous cellulose paper soaked with conductive organic ammonium salt liquid electrolyte that acts as the true cathode contact.', formula: 'σ_ion = 2 to 10 mS/cm | Liquid Electrolyte Carrier' },
      { id: 'cathode_foil', name: 'Cathode Collector Aluminum Foil (-)', desc: 'Unformed aluminum foil serving as the electrical contact tab to the liquid electrolyte.', formula: '1 / C_total = 1 / C_anode + 1 / C_cathode' }
    ];

    layerRadii.forEach((r, idx) => {
      const rollGeo = new THREE.CylinderGeometry(r, r, 52, 36, 1, true, Math.PI * 0.25, Math.PI * 1.5);
      const rollMesh = new THREE.Mesh(rollGeo, matRoll.clone());
      rollMesh.position.set(0, 25, 0);
      group.add(rollMesh);
      this.rollLayers.push({ mesh: rollMesh, radius: r });

      this.deviceParts[layerNames[idx].id] = {
        mesh: rollMesh,
        name: layerNames[idx].name,
        category: 'Internal Wound Jellyroll',
        material: 'Wound spiral cylindrical composite layers',
        desc: layerNames[idx].desc,
        formula: layerNames[idx].formula
      };
    });

    // 4. Terminals / Leads
    const leadGeo = new THREE.CylinderGeometry(1, 1, 30, 16);
    const leadPos = new THREE.Mesh(leadGeo, matCan);
    leadPos.position.set(-6, -16, 0);
    const leadNeg = new THREE.Mesh(leadGeo, matCan);
    leadNeg.position.set(6, -20, 0); // Shorter for negative pin indicator
    group.add(leadPos, leadNeg);

    this.deviceParts.leads = {
      mesh: leadPos,
      name: 'Tinned Copper-Clad Steel Leads (Pins)',
      category: 'Terminal Interface',
      material: 'Tin-plated copper with internal aluminum welded tabs',
      desc: 'The longer lead represents the Positive Anode terminal (+); the shorter lead is the Negative Cathode terminal (-).',
      formula: 'I_ripple = C · (dV / dt) | P_loss = I_rms² · ESR'
    };

    // Hotspots
    this.addHotspot('can', 0, 48, 21, 'Canister (Cutaway)');
    this.addHotspot('anode_foil', -10, 32, 12, 'Etched Anode Foil');
    this.addHotspot('oxide_layer', -7, 28, 9, 'Al2O3 Dielectric Oxide');
    this.addHotspot('paper_separator', -4, 22, 6, 'Electrolyte Paper');
    this.addHotspot('bung', 0, -2, 18, 'Rubber Bung Seal');
    this.addHotspot('leads', -6, -24, 0, 'Anode / Cathode Leads');
  }

  /* =========================================================================
   * DEVICE 3: CLASSIC GOLD-LEAF ELECTROSCOPE
   * ========================================================================= */
  buildElectroscope() {
    this.deviceParts = {};
    const group = this.deviceGroup;

    const brassTex = ProceduralTextures.createBrassTexture();
    const brushedTex = ProceduralTextures.createBrushedMetal('#e2e8f0', 0.2);

    const matBrass = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      map: brassTex,
      metalness: 0.92,
      roughness: 0.25
    });

    const matGlass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 0.35,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 2.0
    });

    const matGold = new THREE.MeshStandardMaterial({
      color: 0xffc72c,
      metalness: 0.98,
      roughness: 0.15,
      side: THREE.DoubleSide
    });

    const matStopper = new THREE.MeshStandardMaterial({
      color: 0x1e1b18,
      roughness: 0.85
    });

    // 1. Metal Base
    const baseGeo = new THREE.CylinderGeometry(26, 28, 6, 36);
    const baseMesh = new THREE.Mesh(baseGeo, matBrass);
    baseMesh.position.set(0, -3, 0);
    group.add(baseMesh);

    // 2. Borosilicate Glass Bell Jar Enclosure
    const jarGeo = new THREE.CylinderGeometry(22, 22, 50, 36, 1, true);
    const jarMesh = new THREE.Mesh(jarGeo, matGlass);
    jarMesh.position.set(0, 25, 0);
    group.add(jarMesh);
    this.deviceParts.glass_jar = {
      mesh: jarMesh,
      name: 'Borosilicate Glass Bell Jar',
      category: 'Shielded Observation Chamber',
      material: 'Optical borosilicate glass (SiO2-B2O3)',
      desc: 'Shields the delicate gold leaves from air currents and drafts while allowing visual observation and measuring leaf repulsion angle on scale markings.',
      formula: 'εᵣ = 4.6 | Draft-free electrostatic isolation chamber'
    };

    // 3. Ebonite / Sulfur Insulating Stopper
    const stopperGeo = new THREE.CylinderGeometry(8, 7, 10, 24);
    const stopperMesh = new THREE.Mesh(stopperGeo, matStopper);
    stopperMesh.position.set(0, 52, 0);
    group.add(stopperMesh);
    this.deviceParts.stopper = {
      mesh: stopperMesh,
      name: 'Insulating Ebonite Stopper',
      category: 'High-Resistance Barrier',
      material: 'Vulcanized hard rubber (Ebonite) or pure paraffin',
      desc: 'Prevents leakage of accumulated charge from the brass rod to the glass jar and metal frame.',
      formula: 'R_insulation > 10¹⁵ Ω (Sulfur/Amber High Isolation)'
    };

    // 4. Brass Rod & Top Collector Plate
    const diskGeo = new THREE.CylinderGeometry(14, 14, 2, 32);
    const diskMesh = new THREE.Mesh(diskGeo, matBrass);
    diskMesh.position.set(0, 62, 0);
    const rodGeo = new THREE.CylinderGeometry(1.2, 1.2, 50, 16);
    const rodMesh = new THREE.Mesh(rodGeo, matBrass);
    rodMesh.position.set(0, 32, 0);
    group.add(diskMesh, rodMesh);

    this.deviceParts.brass_rod = {
      mesh: diskMesh,
      name: 'Brass Terminal Disk & Central Rod',
      category: 'Charge Conductor',
      material: 'High-conductivity extruded brass alloy (60% Cu, 40% Zn)',
      desc: 'Collects charge through contact or electrostatic induction. The charge immediately conducts along the low-resistance central rod down to the gold leaves.',
      formula: 'V_rod = Q / C_electroscope'
    };

    // 5. Twin Ultra-Thin Gold Leaves (Movable)
    this.leaf1Group = new THREE.Group();
    this.leaf2Group = new THREE.Group();

    const leafGeo = new THREE.BoxGeometry(0.08, 22, 6);
    leafGeo.translate(0, -11, 0); // Pivot at top

    this.leaf1Mesh = new THREE.Mesh(leafGeo, matGold);
    this.leaf2Mesh = new THREE.Mesh(leafGeo, matGold);

    this.leaf1Group.add(this.leaf1Mesh);
    this.leaf2Group.add(this.leaf2Mesh);

    this.leaf1Group.position.set(-0.2, 18, 0);
    this.leaf2Group.position.set(0.2, 18, 0);

    group.add(this.leaf1Group, this.leaf2Group);

    this.deviceParts.gold_leaves = {
      mesh: this.leaf1Mesh,
      name: 'Twin Ultra-Thin Gold Leaves',
      category: 'Charge Indicator Sensor',
      material: 'Beaten gold leaf foil (99.9% pure Au, thickness ≈ 0.1 µm)',
      desc: 'Extremely lightweight gold foils. When like charges conduct down to both leaves, electrostatic repulsion pushes them apart against gravitational force, with deflection angle θ signaling charge magnitude.',
      formula: 'F_e = [1 / (4πε₀)] · (q² / r²) = m · g · tan(θ)'
    };

    // 6. Charging Test Induction Rod (Demonstrates electrostatic induction)
    const indRodGeo = new THREE.CylinderGeometry(2, 2, 45, 16);
    indRodGeo.rotateZ(Math.PI / 3);
    const indRodMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      transmission: 0.8,
      transparent: true,
      opacity: 0.8
    });
    this.inductionRod = new THREE.Mesh(indRodGeo, indRodMat);
    this.inductionRod.position.set(28, 70, 0);
    group.add(this.inductionRod);

    this.deviceParts.induction_rod = {
      mesh: this.inductionRod,
      name: 'Electrostatic Test Rod (Acrylic / Amber)',
      category: 'Charge Exciter & Induction Source',
      material: 'Triboelectrically charged acrylic polymer rod',
      desc: 'When brought near the brass disk without touching, it polarizes the electroscope by electrostatic induction, attracting opposite charges to the disk and repelling like charges to the leaves.',
      formula: 'Q_induced = -Q_rod · (1 - 1 / εᵣ)'
    };

    // Hotspots
    this.addHotspot('brass_rod', 0, 66, 0, 'Brass Collector Disk');
    this.addHotspot('stopper', 0, 52, 9, 'Insulating Stopper');
    this.addHotspot('glass_jar', 0, 32, 23, 'Glass Bell Jar');
    this.addHotspot('gold_leaves', 0, 10, 0, 'Repelling Gold Leaves');
    this.addHotspot('induction_rod', 26, 74, 0, 'Induction Charging Rod');
  }

  /* --- 3D Hotspots System --- */
  addHotspot(partId, x, y, z, label) {
    const canvas = document.createElement('canvas');
    canvas.width = 160;
    canvas.height = 48;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(11, 20, 36, 0.85)';
    ctx.strokeStyle = '#72e6ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(4, 4, 152, 40, 8);
    } else {
      ctx.rect(4, 4, 152, 40);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#72e6ff';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 80, 24);

    const tex = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(16, 4.8, 1);
    sprite.position.set(x, y, z);
    sprite.userData = { partId, isHotspot: true, label, baseY: y };

    // Small glowing anchor dot
    const dotGeo = new THREE.SphereGeometry(0.8, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x72e6ff });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(x, y - 3, z);
    sprite.add(dot);

    this.deviceGroup.add(sprite);
    this.hotspots.push(sprite);
  }

  onPointerDown(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.deviceGroup.children, true);

    if (intersects.length > 0) {
      // Prioritize hotspots
      const hotspotHit = intersects.find(hit => hit.object.userData && hit.object.userData.isHotspot);
      if (hotspotHit) {
        this.selectPart(hotspotHit.object.userData.partId);
        return;
      }

      // Check if clicked an identifiable device part
      for (const hit of intersects) {
        for (const [key, part] of Object.entries(this.deviceParts)) {
          if (part.mesh === hit.object || (part.group && part.group.children.includes(hit.object))) {
            this.selectPart(key);
            return;
          }
        }
      }
    }
  }

  selectPart(partId) {
    this.selectedPartId = partId;
    const part = this.deviceParts[partId];
    if (!part) return;

    if (this.onPartSelect) {
      this.onPartSelect({
        id: partId,
        name: part.name,
        category: part.category,
        material: part.material,
        desc: part.desc,
        formula: part.formula
      });
    }
  }

  /* --- Physics Metrics Calculation --- */
  calculatePhysics() {
    const V = this.state.isPowered ? this.state.voltage : 0;
    const d_mm = this.state.plateDistance;
    const d_m = d_mm * 1e-3;
    const area_m2 = 0.15 * 0.15; // 150mm x 150mm
    const eps0 = 8.854187817e-12; // F/m

    // Effective relative permittivity combining air and inserted dielectric slab
    const curDielectric = this.dielectricProps[this.state.dielectricType];
    const k = curDielectric.er;
    const ins = this.state.dielectricInsert;
    // Fractional slab area
    const effectiveEr = 1.0 + ins * (k - 1.0);

    const capacitance_F = (eps0 * effectiveEr * area_m2) / d_m;
    const charge_C = capacitance_F * V;
    const electricField_Vm = d_m > 0 ? V / d_m : 0;
    const energy_J = 0.5 * capacitance_F * V * V;
    const fluxDensity_Cm2 = effectiveEr * eps0 * electricField_Vm;
    const breakdownV = curDielectric.breakdown * 1000 * d_mm;
    const breakdownPercent = Math.min(100, (V / breakdownV) * 100);

    return {
      voltage: V,
      capacitance_pF: capacitance_F * 1e12,
      charge_nC: charge_C * 1e9,
      field_kVm: electricField_Vm / 1000,
      energy_uJ: energy_J * 1e6,
      fluxDensity_uC: fluxDensity_Cm2 * 1e6,
      effectiveEr,
      breakdownPercent: breakdownPercent.toFixed(1)
    };
  }

  updateMetrics() {
    const metrics = this.calculatePhysics();
    if (this.onMetricsUpdate) {
      this.onMetricsUpdate(metrics);
    }
  }

  /* --- View Mode & Cutaway Materials --- */
  updateViewModeMaterials() {
    const mode = this.state.viewMode;
    const xray = mode === 'xray';
    const cutaway = mode === 'cutaway';
    const exploded = mode === 'exploded';

    if (this.state.activeDevice === 'parallel_plate') {
      if (this.matPlatePos) {
        this.matPlatePos.transparent = xray;
        this.matPlatePos.opacity = xray ? this.state.xrayOpacity : 1.0;
      }
      if (this.matPlateNeg) {
        this.matPlateNeg.transparent = xray;
        this.matPlateNeg.opacity = xray ? this.state.xrayOpacity : 1.0;
      }
      if (this.matDielectric) {
        this.matDielectric.opacity = xray ? 0.25 : this.dielectricProps[this.state.dielectricType].opacity;
      }
    }
  }

  /* --- Interactive Controls Setters --- */
  setVoltage(val) {
    this.state.voltage = parseFloat(val);
    this.updateMetrics();
  }

  setPlateDistance(val) {
    this.state.plateDistance = parseFloat(val);
    if (this.anodeGroup && this.cathodeGroup) {
      this.anodeGroup.position.x = -this.state.plateDistance / 2;
      this.cathodeGroup.position.x = this.state.plateDistance / 2;
    }
    // Update field lines geometry to match new distance
    if (this.fieldLinesGroup) {
      const halfD = this.state.plateDistance / 2;
      const d = this.state.plateDistance;
      const spanY = 40, spanZ = 40;
      this.fieldLinesGroup.children.forEach((line) => {
        if (line.userData && line.userData.points) {
          const { isEdge, r, c } = line.userData;
          const y = -spanY / 2 + (r / 6) * spanY;
          const z = -spanZ / 2 + (c / 6) * spanZ;
          const distFromCenter = Math.sqrt(y * y + z * z) / (spanY * 0.7);
          const pos = line.geometry.attributes.position.array;
          const segments = 12;
          for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const posX = -halfD + t * d;
            const bulge = isEdge ? Math.sin(t * Math.PI) * distFromCenter * 5.5 : 0;
            const posY = y + (y === 0 ? 0 : (y / Math.abs(y)) * bulge);
            const posZ = z + (z === 0 ? 0 : (z / Math.abs(z)) * bulge);
            pos[i * 3] = posX;
            pos[i * 3 + 1] = posY;
            pos[i * 3 + 2] = posZ;
          }
          line.geometry.attributes.position.needsUpdate = true;
        }
      });
    }
    this.updateMetrics();
  }

  setDielectricInsert(val) {
    this.state.dielectricInsert = parseFloat(val);
    if (this.dielectricGroup) {
      const insY = 24 + (1.0 - this.state.dielectricInsert) * 55;
      this.dielectricGroup.position.y = insY;
    }
    this.updateMetrics();
  }

  setDielectricType(type) {
    if (this.dielectricProps[type]) {
      this.state.dielectricType = type;
      this.buildCurrentDevice();
    }
  }

  setViewMode(mode) {
    this.state.viewMode = mode;
    this.updateViewModeMaterials();
  }

  setDevice(deviceKey) {
    this.state.activeDevice = deviceKey;
    this.buildCurrentDevice();
  }

  togglePower() {
    this.state.isPowered = !this.state.isPowered;
    this.updateMetrics();
  }

  /* --- Animation Loop --- */
  animate() {
    requestAnimationFrame(this.animate);
    this.controls.update();

    if (this.state.autoRotate) {
      this.deviceGroup.rotation.y += 0.005;
    }

    const V = this.state.isPowered ? this.state.voltage : 0;
    const normV = Math.min(1.0, V / 5000);

    // 1. Animate Molecular Dipoles (smooth rotation toward E-field)
    if (this.dipoles && this.dipoles.length > 0) {
      const alignWeight = Math.pow(normV, 0.7); // Non-linear dipole saturation
      this.dipoles.forEach((dip) => {
        // Interplate E-field points along X axis
        const targetRotX = dip.userData.restRot.x * (1.0 - alignWeight);
        const targetRotY = dip.userData.restRot.y * (1.0 - alignWeight);
        const targetRotZ = dip.userData.restRot.z * (1.0 - alignWeight);
        dip.rotation.x += (targetRotX - dip.rotation.x) * 0.1;
        dip.rotation.y += (targetRotY - dip.rotation.y) * 0.1;
        dip.rotation.z += (targetRotZ - dip.rotation.z) * 0.1;
      });
    }

    // 2. Animate Electric Field Lines Glow
    if (this.fieldLinesGroup) {
      const targetOpacity = (0.2 + normV * 0.75);
      this.fieldLinesGroup.children.forEach((line) => {
        if (line.material) {
          line.material.opacity = targetOpacity;
          // Color shift with high field: cyan -> white-blue
          if (normV > 0.7) {
            line.material.color.setRGB(0.7 + (normV - 0.7), 0.9, 1.0);
          } else {
            line.material.color.setRGB(0.44, 0.9, 1.0);
          }
        }
      });
    }

    // 3. Animate Streaming Electron Particles
    if (this.particleMesh) {
      const pos = this.particleMesh.geometry.attributes.position.array;
      const vels = this.particleMesh.userData.velocities;
      const count = pos.length / 3;
      const halfD = this.state.plateDistance / 2;
      const speedMult = normV * 2.5;

      for (let i = 0; i < count; i++) {
        pos[i * 3] += vels[i * 3] * speedMult;
        if (pos[i * 3] > halfD) {
          pos[i * 3] = -halfD;
          pos[i * 3 + 1] = 24 + (Math.random() - 0.5) * 40;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
      }
      this.particleMesh.geometry.attributes.position.needsUpdate = true;
      this.particleMesh.material.opacity = normV > 0.05 ? 0.85 : 0.05;
    }

    // 4. Animate Gold-Leaf Electroscope Deflection
    if (this.leaf1Group && this.leaf2Group) {
      // Repulsion angle theta scales with V^2 (Coulomb law balance against gravity)
      const maxAngle = 0.75; // radians (~43 degrees)
      const targetTheta = Math.min(maxAngle, Math.pow(normV, 1.5) * maxAngle);
      this.leaf1Group.rotation.z += (-targetTheta - this.leaf1Group.rotation.z) * 0.08;
      this.leaf2Group.rotation.z += (targetTheta - this.leaf2Group.rotation.z) * 0.08;
    }

    // 5. Animate Spark Arc
    if (this.state.sparkActive && this.sparkLine) {
      this.sparkDuration--;
      if (this.sparkDuration > 0) {
        const halfD = this.state.plateDistance / 2;
        const pts = this.sparkLine.geometry.attributes.position.array;
        const segs = pts.length / 3;
        for (let i = 0; i < segs; i++) {
          const t = i / (segs - 1);
          pts[i * 3] = -halfD + t * this.state.plateDistance;
          // Chaotic jagged electric bolt
          pts[i * 3 + 1] = 24 + (Math.random() - 0.5) * 6.0;
          pts[i * 3 + 2] = (Math.random() - 0.5) * 6.0;
        }
        this.sparkLine.geometry.attributes.position.needsUpdate = true;
        this.sparkLine.material.opacity = 0.95;
        this.sparkLight.intensity = 8.0;
      } else {
        this.state.sparkActive = false;
        this.sparkLine.material.opacity = 0.0;
        this.sparkLight.intensity = 0.0;
      }
    }

    // 6. Exploded View Interpolation
    if (this.state.viewMode === 'exploded') {
      this.state.explodedProgress = Math.min(1.0, this.state.explodedProgress + 0.04);
    } else {
      this.state.explodedProgress = Math.max(0.0, this.state.explodedProgress - 0.04);
    }

    if (this.state.activeDevice === 'parallel_plate') {
      const exp = this.state.explodedProgress;
      if (this.anodeGroup) this.anodeGroup.position.x = -this.state.plateDistance / 2 - exp * 35;
      if (this.cathodeGroup) this.cathodeGroup.position.x = this.state.plateDistance / 2 + exp * 35;
      if (this.dielectricGroup) {
        const baseInsY = 24 + (1.0 - this.state.dielectricInsert) * 55;
        this.dielectricGroup.position.y = baseInsY + exp * 25;
      }
    } else if (this.state.activeDevice === 'rolled_capacitor') {
      const exp = this.state.explodedProgress;
      if (this.rollLayers) {
        this.rollLayers.forEach((layer, idx) => {
          layer.mesh.position.y = 25 + exp * (idx + 1) * 16;
        });
      }
    }

    // 7. Make 3D Hotspot Sprites always face the camera with subtle float
    if (this.hotspots) {
      const time = Date.now() * 0.003;
      this.hotspots.forEach((h, idx) => {
        const baseY = (h.userData && h.userData.baseY !== undefined) ? h.userData.baseY : (h.position ? h.position.y : 0);
        h.position.y = baseY + Math.sin(time + idx) * 0.4;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}
