/**
 * Minimalist 3D Interactive WebGL Engine
 * Harsh Kushwaha - Senior Software Developer Portfolio
 */

// ===================================================================
// 1. HERO 3D SCENE: QUANTUM TORUS CENTERPIECE + CYBER WAVE BACKGROUND
// ===================================================================
class HeroMinimalScene {
  constructor() {
    this.container = document.getElementById('hero-minimal-canvas');
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();

    this.currentPos = { x: 0, y: 0.2, z: 0 };
    this.currentScale = 1.0;
    this.lastScrollY = window.scrollY || 0;
    this.scrollVelocity = 0;

    this.init();
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.top = '0';
    this.renderer.domElement.style.left = '0';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.pointerEvents = 'none';
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 6.8;

    this.createBackgroundWaveGrid();
    this.createAmbientDust();
    this.createNewHeroCenterpiece();

    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onMouseMove(e) {
    this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    this.mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }

  createPointTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(249, 115, 22, 0.8)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  createRingGeometry(radius, segments = 64) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  // -------------------------------------------------------------
  // Dynamic 3D Cyber Wave Grid Floor (Background 3D Model)
  // -------------------------------------------------------------
  createBackgroundWaveGrid() {
    this.gridWidth = 36;
    this.gridDepth = 36;
    this.gridSegmentsX = 32;
    this.gridSegmentsY = 32;

    this.gridGeometry = new THREE.PlaneGeometry(this.gridWidth, this.gridDepth, this.gridSegmentsX, this.gridSegmentsY);
    this.initialGridPositions = this.gridGeometry.attributes.position.clone();

    const wireframeGeo = new THREE.WireframeGeometry(this.gridGeometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.35,
    });
    this.gridWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    this.gridWireframe.rotation.x = -Math.PI / 2.3;
    this.gridWireframe.position.y = -3.2;
    this.gridWireframe.position.z = -2;

    this.scene.add(this.gridWireframe);
  }

  createAmbientDust() {
    const count = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const dustMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    this.dust = new THREE.Points(geometry, dustMat);
    this.scene.add(this.dust);
  }

  // -------------------------------------------------------------
  // New Centerpiece Model: Kinetic Quantum Torus Knot & Satellite Rings
  // -------------------------------------------------------------
  createNewHeroCenterpiece() {
    this.heroGroup = new THREE.Group();

    // Add dedicated dynamic light attached to centerpiece
    const pointLight = new THREE.PointLight(0xf97316, 3.5, 35);
    pointLight.position.set(0, 0, 3);
    this.heroGroup.add(pointLight);

    const ambientGlow = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(ambientGlow);

    // 1. Quantum Torus Knot Outer Neon Wireframe (100% Solid Orange Accent)
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32, 2, 3);
    const wireGeo = new THREE.WireframeGeometry(torusGeo);
    const orangeWireMat = new THREE.LineBasicMaterial({
      color: 0xf97316,
    });
    this.torusWire = new THREE.LineSegments(wireGeo, orangeWireMat);
    this.heroGroup.add(this.torusWire);

    // Secondary White Structural Accent Wireframe (100% Solid)
    const whiteWireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    this.torusWhiteWire = new THREE.LineSegments(wireGeo, whiteWireMat);
    this.torusWhiteWire.scale.setScalar(0.98);
    this.heroGroup.add(this.torusWhiteWire);

    // Inner Luminous Core
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x200c00,
      emissive: 0xf97316,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    this.torusInner = new THREE.Mesh(torusGeo, innerMat);
    this.heroGroup.add(this.torusInner);

    // Glowing Node Points along Knot
    const pointMap = this.createPointTexture();
    const pointsMat = new THREE.PointsMaterial({
      size: 0.25,
      map: pointMap || undefined,
      color: 0xffedd5,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.knotPoints = new THREE.Points(torusGeo, pointsMat);
    this.heroGroup.add(this.knotPoints);

    // 2. Central Energy Crystal Core (Octahedron Dual Core)
    const coreGeo = new THREE.OctahedronGeometry(0.55, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    this.crystalCore = new THREE.Mesh(coreGeo, coreMat);
    this.heroGroup.add(this.crystalCore);

    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      wireframe: true,
    });
    this.innerCrystalCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.35, 0), innerCoreMat);
    this.heroGroup.add(this.innerCrystalCore);

    // 3. Concentric Vector Orbital Rings (100% Solid Lines)
    const ringMat1 = new THREE.LineBasicMaterial({ color: 0xf97316 });
    const ringMat2 = new THREE.LineBasicMaterial({ color: 0xffffff });
    const ringMat3 = new THREE.LineBasicMaterial({ color: 0xfbbf24 });

    this.orbitRing1 = new THREE.LineLoop(this.createRingGeometry(2.7, 64), ringMat1);
    this.orbitRing1.rotation.x = Math.PI / 3;
    this.heroGroup.add(this.orbitRing1);

    this.orbitRing2 = new THREE.LineLoop(this.createRingGeometry(3.2, 64), ringMat2);
    this.orbitRing2.rotation.y = Math.PI / 4;
    this.heroGroup.add(this.orbitRing2);

    this.orbitRing3 = new THREE.LineLoop(this.createRingGeometry(3.6, 64), ringMat3);
    this.orbitRing3.rotation.z = Math.PI / 6;
    this.heroGroup.add(this.orbitRing3);

    // 4. Orbiting Satellite Nodes
    const satGeo1 = new THREE.OctahedronGeometry(0.18, 0);
    const satMat1 = new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true });
    this.satellite = new THREE.Mesh(satGeo1, satMat1);
    this.heroGroup.add(this.satellite);

    const satGeo2 = new THREE.OctahedronGeometry(0.14, 0);
    const satMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    this.satellite2 = new THREE.Mesh(satGeo2, satMat2);
    this.heroGroup.add(this.satellite2);

    // Center in the screen
    this.heroGroup.position.set(0, 0.2, 0);

    this.scene.add(this.heroGroup);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);

    // Kinetic scroll momentum tracking
    const deltaScroll = scrollY - this.lastScrollY;
    this.lastScrollY = scrollY;
    this.scrollVelocity += (deltaScroll - this.scrollVelocity) * 0.15;

    // Smooth mouse inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Full-page dynamic 3D spline trajectory:
    // As the user scrolls from top (progress 0) to bottom (progress 1), the model travels across the screen
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const xSpread = isMobile ? 0.6 : (isTablet ? 1.4 : 2.2);
    
    // Harmonic S-curve wave path
    const t = scrollProgress * Math.PI * 4;
    const baseOffset = isMobile ? 0 : 0.4;
    const pathX = baseOffset * (1 - scrollProgress) + Math.sin(t) * xSpread;
    const pathY = (0.2 - scrollProgress * 1.6) + Math.sin(t * 0.5) * 0.35;
    const pathZ = Math.cos(t * 0.7) * 0.6;
    const pathScale = (isMobile ? 0.8 : 1.1) * (1.0 + Math.sin(scrollProgress * Math.PI) * 0.15);

    // Smooth lerp to target trajectory
    this.currentPos.x += (pathX + this.mouse.x * 0.3 - this.currentPos.x) * 0.08;
    this.currentPos.y += (pathY + Math.sin(elapsedTime * 0.8) * 0.12 + this.mouse.y * 0.2 - this.currentPos.y) * 0.08;
    this.currentPos.z += (pathZ - this.currentPos.z) * 0.08;
    this.currentScale += (pathScale - this.currentScale) * 0.08;

    if (this.heroGroup) {
      this.heroGroup.position.set(this.currentPos.x, this.currentPos.y, this.currentPos.z);
      this.heroGroup.scale.setScalar(this.currentScale);

      // Kinetic rotation driven by elapsed time + scroll travel + scroll velocity
      const kineticSpin = scrollProgress * Math.PI * 6 + this.scrollVelocity * 0.003;
      this.heroGroup.rotation.y = elapsedTime * 0.2 + kineticSpin + this.mouse.x * 0.35;
      this.heroGroup.rotation.x = elapsedTime * 0.12 + Math.sin(scrollProgress * Math.PI * 3) * 0.5 + this.mouse.y * 0.25;
      this.heroGroup.rotation.z = Math.cos(scrollProgress * Math.PI * 2) * 0.35 + (this.scrollVelocity * 0.001);
    }

    if (this.crystalCore) {
      this.crystalCore.rotation.y = -elapsedTime * 0.8 - (scrollProgress * Math.PI * 8);
      this.crystalCore.rotation.z = elapsedTime * 0.4 + (this.scrollVelocity * 0.005);
    }
    if (this.innerCrystalCore) {
      this.innerCrystalCore.rotation.x = elapsedTime * 0.9;
      this.innerCrystalCore.rotation.y = elapsedTime * 0.6;
    }

    if (this.orbitRing1) {
      this.orbitRing1.rotation.z = elapsedTime * 0.35 + (scrollProgress * Math.PI * 4);
    }
    if (this.orbitRing2) {
      this.orbitRing2.rotation.x = elapsedTime * 0.25 + (scrollProgress * Math.PI * 4);
    }
    if (this.orbitRing3) {
      this.orbitRing3.rotation.y = elapsedTime * 0.2 + (scrollProgress * Math.PI * 3);
    }

    if (this.satellite) {
      const angle = elapsedTime * 0.9 + scrollProgress * Math.PI * 4;
      const radius = 2.7;
      this.satellite.position.x = Math.cos(angle) * radius;
      this.satellite.position.y = Math.sin(angle) * radius * Math.sin(Math.PI / 3);
      this.satellite.position.z = Math.sin(angle) * radius * Math.cos(Math.PI / 3);
      this.satellite.rotation.y += 0.04;
    }

    if (this.satellite2) {
      const angle2 = -elapsedTime * 0.7 - scrollProgress * Math.PI * 3;
      const radius2 = 3.2;
      this.satellite2.position.x = Math.cos(angle2) * radius2;
      this.satellite2.position.y = Math.sin(angle2) * radius2 * Math.cos(Math.PI / 4);
      this.satellite2.position.z = Math.sin(angle2) * radius2 * Math.sin(Math.PI / 4);
      this.satellite2.rotation.x += 0.05;
    }

    // Dynamic 3D Cyber Wave Grid Floor also drifts gracefully with full-page scroll
    if (this.gridWireframe) {
      this.gridWireframe.position.y = -3.2 + Math.sin(elapsedTime * 0.5) * 0.1 - (scrollProgress * 1.8);
      this.gridWireframe.rotation.z = Math.sin(elapsedTime * 0.2) * 0.03 + this.mouse.x * 0.05 + (scrollProgress * 0.2);
      this.gridWireframe.rotation.x = -Math.PI / 2.3 + Math.sin(scrollProgress * Math.PI) * 0.15;
    }

    if (this.dust) {
      this.dust.rotation.y = elapsedTime * 0.02 + scrollProgress * 0.5;
      this.dust.position.y = Math.sin(scrollProgress * Math.PI) * 0.5;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ===================================================================
// 2. MINIMAL ABOUT SECTION 3D MODEL WIDGET (Interactive)
// ===================================================================
class MinimalModelWidget {
  constructor() {
    this.container = document.getElementById('3d-widget-container');
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.clock = new THREE.Clock();

    this.currentPreset = 'quantum_reactor'; // 'quantum_reactor', 'cyber_satellite', 'neural_matrix', 'tesseract_chronos'
    this.isWireframe = true;
    this.isAutoRotate = true;

    this.init();
  }

  init() {
    this.updateSize();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 5.4;

    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    this.setupLighting();
    this.buildPresetModel(this.currentPreset);

    this.setupEventListeners();
    this.setupUIControls();

    window.addEventListener('themeChanged', () => {
      this.setupLighting();
      this.buildPresetModel(this.currentPreset);
    });

    this.animate();
  }

  updateSize() {
    if (!this.container) return;
    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 400;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setupLighting() {
    const isDark = document.documentElement.classList.contains('dark');
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.2);
    this.scene.add(ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xf97316, isDark ? 3.0 : 2.0);
    this.keyLight.position.set(4, 5, 4);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0xfbbf24, isDark ? 2.2 : 1.5);
    this.fillLight.position.set(-4, -4, 2);
    this.scene.add(this.fillLight);
  }

  createPointTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(249, 115, 22, 0.85)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }

  createRingGeometry(radius, segments = 64) {
    const points = [];
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }

  disposeGroup(group) {
    while (group.children.length > 0) {
      const obj = group.children[0];
      if (obj.isGroup) {
        this.disposeGroup(obj);
      }
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
      group.remove(obj);
    }
  }

  buildPresetModel(presetName) {
    this.disposeGroup(this.mainGroup);
    this.currentPreset = presetName;

    const isDark = document.documentElement.classList.contains('dark');
    const orangeColor = isDark ? 0xf97316 : 0xea580c;
    const secondaryColor = isDark ? 0xffffff : 0x18181b;
    const amberColor = isDark ? 0xfbbf24 : 0xd97706;
    const pointMap = this.createPointTexture();

    // Map legacy names if any
    let targetPreset = presetName;
    if (presetName === 'geodesic') targetPreset = 'quantum_reactor';
    if (presetName === 'orbital') targetPreset = 'cyber_satellite';
    if (presetName === 'helix') targetPreset = 'neural_matrix';
    if (presetName === 'hypercube') targetPreset = 'tesseract_chronos';

    if (targetPreset === 'quantum_reactor') {
      // ===================================================================
      // 1. QUANTUM FUSION REACTOR CORE (High-Detail Architectural Engine)
      // ===================================================================
      this.reactorGroup = new THREE.Group();

      // Outer Stator Magnet Torus Cage
      const torusOuterGeo = new THREE.TorusGeometry(1.65, 0.14, 16, 48);
      const torusOuterWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(torusOuterGeo),
        new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: this.isWireframe ? 0.95 : 0.2 })
      );
      this.reactorGroup.add(torusOuterWire);

      // Orthogonal Stator Ring
      const torusInnerGeo = new THREE.TorusGeometry(1.4, 0.1, 16, 48);
      const torusInnerWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(torusInnerGeo),
        new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.65 })
      );
      torusInnerWire.rotation.x = Math.PI / 2;
      this.reactorGroup.add(torusInnerWire);

      // 8 Perimeter Electromagnetic Stator Coils
      this.statorCoils = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const coilGeo = new THREE.BoxGeometry(0.22, 0.35, 0.22);
        const coilMat = new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? amberColor : orangeColor, wireframe: true });
        const coil = new THREE.Mesh(coilGeo, coilMat);
        coil.position.set(Math.cos(angle) * 1.65, Math.sin(angle) * 1.65, 0);
        coil.rotation.z = angle;
        this.reactorGroup.add(coil);
        this.statorCoils.push(coil);
      }

      // Magnetic Plasma Torus Knot Conduit
      const plasmaGeo = new THREE.TorusKnotGeometry(0.85, 0.24, 96, 24, 2, 3);
      const plasmaWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(plasmaGeo),
        new THREE.LineBasicMaterial({ color: orangeColor })
      );
      this.plasmaConduit = plasmaWire;
      this.reactorGroup.add(this.plasmaConduit);

      // Inner Glowing Holographic Plasma Mass
      const plasmaMat = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x200c00 : 0x27272a,
        emissive: orangeColor,
        emissiveIntensity: 0.4,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.55,
      });
      const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
      this.reactorGroup.add(plasmaMesh);

      // Triple Concentric Gimbal Stabilization Rings
      this.gimbalRing1 = new THREE.LineLoop(this.createRingGeometry(1.88, 64), new THREE.LineBasicMaterial({ color: orangeColor }));
      this.gimbalRing1.rotation.x = Math.PI / 3;
      this.reactorGroup.add(this.gimbalRing1);

      this.gimbalRing2 = new THREE.LineLoop(this.createRingGeometry(2.05, 64), new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.7 }));
      this.gimbalRing2.rotation.y = Math.PI / 4;
      this.reactorGroup.add(this.gimbalRing2);

      this.gimbalRing3 = new THREE.LineLoop(this.createRingGeometry(2.22, 64), new THREE.LineBasicMaterial({ color: amberColor, transparent: true, opacity: 0.8 }));
      this.gimbalRing3.rotation.z = Math.PI / 6;
      this.reactorGroup.add(this.gimbalRing3);

      // Central Singularity Energy Crystal
      const crystalGeo = new THREE.OctahedronGeometry(0.42, 0);
      const crystalMat = new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true });
      this.centerOrb = new THREE.Mesh(crystalGeo, crystalMat);
      this.reactorGroup.add(this.centerOrb);

      const innerSingularity = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.24, 0),
        new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true })
      );
      this.centerOrb.add(innerSingularity);

      // Energy Particle Flux Cloud
      const fluxCount = 90;
      const fluxGeo = new THREE.BufferGeometry();
      const fluxPos = new Float32Array(fluxCount * 3);
      for (let i = 0; i < fluxCount; i++) {
        const u = (i / fluxCount) * Math.PI * 4;
        fluxPos[i * 3] = Math.sin(u * 2) * 1.1 + (Math.random() - 0.5) * 0.2;
        fluxPos[i * 3 + 1] = Math.cos(u * 3) * 0.9 + (Math.random() - 0.5) * 0.2;
        fluxPos[i * 3 + 2] = Math.sin(u) * 1.1 + (Math.random() - 0.5) * 0.2;
      }
      fluxGeo.setAttribute('position', new THREE.BufferAttribute(fluxPos, 3));
      this.fluxPoints = new THREE.Points(fluxGeo, new THREE.PointsMaterial({
        size: 0.18,
        map: pointMap || undefined,
        color: isDark ? 0xffedd5 : 0xea580c,
        transparent: true,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      }));
      this.reactorGroup.add(this.fluxPoints);

      this.mainGroup.add(this.reactorGroup);

    } else if (targetPreset === 'cyber_satellite') {
      // ===================================================================
      // 2. DEEP-SPACE TACTICAL SATELLITE (Multi-Segment Detailed Spacecraft)
      // ===================================================================
      this.satelliteGroup = new THREE.Group();

      // Main Satellite Bus (Octagonal Wireframe Body + Core Avionics)
      const bodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.25, 8);
      const bodyWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(bodyGeo),
        new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: this.isWireframe ? 0.95 : 0.2 })
      );
      this.satelliteGroup.add(bodyWire);

      const innerBus = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.9, 0.5),
        new THREE.MeshPhysicalMaterial({
          color: isDark ? 0x200c00 : 0x27272a,
          emissive: orangeColor,
          emissiveIntensity: 0.3,
          roughness: 0.15,
          metalness: 0.85,
          transparent: true,
          opacity: 0.5,
        })
      );
      this.satelliteGroup.add(innerBus);

      // Upper Communications Deck & Avionics Cap
      const deckGeo = new THREE.CylinderGeometry(0.65, 0.55, 0.2, 8);
      const deckWire = new THREE.LineSegments(new THREE.WireframeGeometry(deckGeo), new THREE.LineBasicMaterial({ color: secondaryColor }));
      deckWire.position.y = 0.7;
      this.satelliteGroup.add(deckWire);

      // High-Gain Parabolic Telemetry Dish
      const dishGeo = new THREE.ConeGeometry(0.75, 0.4, 24, 5, true);
      this.dishWire = new THREE.LineSegments(new THREE.WireframeGeometry(dishGeo), new THREE.LineBasicMaterial({ color: orangeColor }));
      this.dishWire.position.y = 1.1;
      this.dishWire.rotation.x = Math.PI;

      // Sub-reflector feed horn & tripod struts
      const feedGeo = new THREE.OctahedronGeometry(0.12, 0);
      const feedMesh = new THREE.Mesh(feedGeo, new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true }));
      feedMesh.position.y = -0.38;
      this.dishWire.add(feedMesh);
      this.satelliteGroup.add(this.dishWire);

      // Symmetrical Articulated Solar Array Wings (Left & Right)
      this.solarWings = [];
      [-1, 1].forEach((side) => {
        const wingGroup = new THREE.Group();
        wingGroup.position.set(side * 0.65, 0, 0);

        // Boom support truss
        const boomGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 6);
        const boom = new THREE.Mesh(boomGeo, new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true }));
        boom.rotation.z = side * Math.PI / 2;
        boom.position.x = side * 0.22;
        wingGroup.add(boom);

        // Solar Grid Panel
        const panelGeo = new THREE.PlaneGeometry(1.6, 0.85, 5, 2);
        const panelWire = new THREE.LineSegments(
          new THREE.WireframeGeometry(panelGeo),
          new THREE.LineBasicMaterial({ color: orangeColor })
        );
        panelWire.position.x = side * 1.1;
        panelWire.rotation.y = side * 0.15;
        wingGroup.add(panelWire);

        // Inner Solar Cell Wafer Surface
        const panelMesh = new THREE.Mesh(
          panelGeo,
          new THREE.MeshBasicMaterial({ color: isDark ? 0x180a00 : 0x27272a, transparent: true, opacity: 0.4 })
        );
        panelMesh.position.x = side * 1.1;
        panelMesh.rotation.y = side * 0.15;
        wingGroup.add(panelMesh);

        this.satelliteGroup.add(wingGroup);
        this.solarWings.push(wingGroup);
      });

      // 4 RCS Thruster Quad Nozzles
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const nozzleGeo = new THREE.ConeGeometry(0.08, 0.2, 8);
        const nozzle = new THREE.Mesh(nozzleGeo, new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true }));
        nozzle.position.set(Math.cos(angle) * 0.45, -0.7, Math.sin(angle) * 0.45);
        nozzle.rotation.x = Math.PI;
        this.satelliteGroup.add(nozzle);
      }

      // Orbiting Telemetry Relay Escort Probes
      this.escortProbes = [];
      for (let i = 0; i < 2; i++) {
        const probeGroup = new THREE.Group();
        const probeGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
        const probeMesh = new THREE.Mesh(probeGeo, new THREE.MeshBasicMaterial({ color: i === 0 ? orangeColor : secondaryColor, wireframe: true }));
        probeGroup.add(probeMesh);

        const miniWing = new THREE.LineSegments(
          new THREE.WireframeGeometry(new THREE.PlaneGeometry(0.4, 0.14, 2, 1)),
          new THREE.LineBasicMaterial({ color: amberColor })
        );
        probeGroup.add(miniWing);

        this.satelliteGroup.add(probeGroup);
        this.escortProbes.push(probeGroup);
      }

      // Orbital Trajectory Telemetry Ring
      this.orbitTrackRing = new THREE.LineLoop(this.createRingGeometry(2.35, 64), new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: 0.65 }));
      this.orbitTrackRing.rotation.x = Math.PI / 3;
      this.satelliteGroup.add(this.orbitTrackRing);

      this.mainGroup.add(this.satelliteGroup);

    } else if (targetPreset === 'neural_matrix') {
      // ===================================================================
      // 3. HYPER-COMPLEX NEURAL CORTEX MATRIX (Interconnected Synapses)
      // ===================================================================
      this.neuralGroup = new THREE.Group();

      // Outer Geodesic Cortex Shell
      const cortexGeo = new THREE.IcosahedronGeometry(1.7, 2);
      this.cortexWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(cortexGeo),
        new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: this.isWireframe ? 0.75 : 0.15 })
      );
      this.neuralGroup.add(this.cortexWire);

      // Inner Sub-Cortical Lattice Shell
      const subCortexGeo = new THREE.IcosahedronGeometry(1.35, 1);
      this.subCortexWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(subCortexGeo),
        new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.55 })
      );
      this.neuralGroup.add(this.subCortexWire);

      // 36 Fibonacci-Distributed Synaptic Nodes + Interconnecting Axon Lattice
      const nodeCount = 36;
      const radius = 1.7;
      const nodePositions = [];

      for (let i = 0; i < nodeCount; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        nodePositions.push(new THREE.Vector3(x, y, z));

        // Synaptic Node Marker
        const marker = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.09, 0),
          new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? orangeColor : amberColor, wireframe: true })
        );
        marker.position.set(x, y, z);
        this.neuralGroup.add(marker);
      }

      // Synaptic Axon Neural Rays
      const axonPoints = [];
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dist = nodePositions[i].distanceTo(nodePositions[j]);
          if (dist < 1.1) {
            axonPoints.push(nodePositions[i], nodePositions[j]);
          }
        }
      }
      const axonGeo = new THREE.BufferGeometry().setFromPoints(axonPoints);
      const axonLines = new THREE.LineSegments(
        axonGeo,
        new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.5 })
      );
      this.neuralGroup.add(axonLines);

      // Node Point Clouds
      const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodePositions);
      const nodeMat = new THREE.PointsMaterial({
        size: 0.2,
        map: pointMap || undefined,
        color: isDark ? 0xffedd5 : 0xea580c,
        transparent: true,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      });
      this.neuralGroup.add(new THREE.Points(nodeGeo, nodeMat));

      // Central Neural Core (Dodecahedron Processor + Octahedron Singularity)
      const coreGeo = new THREE.DodecahedronGeometry(0.55, 0);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: orangeColor,
        emissive: amberColor,
        emissiveIntensity: 0.35,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: true,
      });
      this.centerOrb = new THREE.Mesh(coreGeo, coreMat);
      this.neuralGroup.add(this.centerOrb);

      const innerCore = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.32, 0),
        new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe: true })
      );
      this.centerOrb.add(innerCore);

      this.mainGroup.add(this.neuralGroup);

    } else if (targetPreset === 'tesseract_chronos') {
      // ===================================================================
      // 4. 4D HYPER-DIMENSIONAL TESSERACT ARMILLARY (Chrono-Geometric Engine)
      // ===================================================================
      this.tesseractGroup = new THREE.Group();

      // Outer 4D Projection Hypercube Frame
      const outerBoxGeo = new THREE.BoxGeometry(2.0, 2.0, 2.0);
      this.outerCubeWire = new THREE.LineSegments(
        new THREE.WireframeGeometry(outerBoxGeo),
        new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: this.isWireframe ? 0.95 : 0.2 })
      );
      this.tesseractGroup.add(this.outerCubeWire);

      // Outer Corner Node Points
      const cornerGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(1, 1, -1), new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, -1, 1), new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, 1, 1), new THREE.Vector3(-1, 1, 1),
      ]);
      const cornerPoints = new THREE.Points(cornerGeo, new THREE.PointsMaterial({
        size: 0.22,
        map: pointMap || undefined,
        color: isDark ? 0xffedd5 : 0xea580c,
        transparent: true,
        blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        depthWrite: false,
      }));
      this.tesseractGroup.add(cornerPoints);

      // Inner 4D Projection Cube Frame
      const innerBoxGeo = new THREE.BoxGeometry(1.05, 1.05, 1.05);
      this.innerCube = new THREE.LineSegments(
        new THREE.WireframeGeometry(innerBoxGeo),
        new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.85 })
      );
      this.tesseractGroup.add(this.innerCube);

      // 8 Tesseract Dimensional Ray Connectors (Outer vertices to Inner vertices)
      const tesseractRays = [
        new THREE.Vector3(-1, -1, -1), new THREE.Vector3(-0.525, -0.525, -0.525),
        new THREE.Vector3(1, -1, -1), new THREE.Vector3(0.525, -0.525, -0.525),
        new THREE.Vector3(1, 1, -1), new THREE.Vector3(0.525, 0.525, -0.525),
        new THREE.Vector3(-1, 1, -1), new THREE.Vector3(-0.525, 0.525, -0.525),
        new THREE.Vector3(-1, -1, 1), new THREE.Vector3(-0.525, -0.525, 0.525),
        new THREE.Vector3(1, -1, 1), new THREE.Vector3(0.525, -0.525, 0.525),
        new THREE.Vector3(1, 1, 1), new THREE.Vector3(0.525, 0.525, 0.525),
        new THREE.Vector3(-1, 1, 1), new THREE.Vector3(-0.525, 0.525, 0.525),
      ];
      const rayGeo = new THREE.BufferGeometry().setFromPoints(tesseractRays);
      const rayLines = new THREE.LineSegments(
        rayGeo,
        new THREE.LineBasicMaterial({ color: amberColor, transparent: true, opacity: 0.75 })
      );
      this.tesseractGroup.add(rayLines);

      // Concentric Chrono Astrolabe Rings
      this.chronoRing1 = new THREE.LineLoop(this.createRingGeometry(2.2, 64), new THREE.LineBasicMaterial({ color: orangeColor }));
      this.chronoRing1.rotation.x = Math.PI / 3;
      this.tesseractGroup.add(this.chronoRing1);

      this.chronoRing2 = new THREE.LineLoop(this.createRingGeometry(1.85, 64), new THREE.LineBasicMaterial({ color: amberColor }));
      this.chronoRing2.rotation.y = Math.PI / 4;
      this.tesseractGroup.add(this.chronoRing2);

      this.chronoRing3 = new THREE.LineLoop(this.createRingGeometry(1.5, 64), new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.65 }));
      this.chronoRing3.rotation.z = Math.PI / 6;
      this.tesseractGroup.add(this.chronoRing3);

      // Central Merkaba Star Core (Interlocking Counter-Tetrahedra)
      this.centerOrb = new THREE.Group();
      const tetra1 = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.48, 0),
        new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true })
      );
      const tetra2 = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.48, 0),
        new THREE.MeshBasicMaterial({ color: orangeColor, wireframe: true })
      );
      tetra2.rotation.set(Math.PI, 0, Math.PI / 2);
      this.centerOrb.add(tetra1);
      this.centerOrb.add(tetra2);
      this.tesseractGroup.add(this.centerOrb);

      this.mainGroup.add(this.tesseractGroup);
    }
  }

  setupEventListeners() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    dom.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.velocity.x = deltaX * 0.007;
      this.velocity.y = deltaY * 0.007;

      this.mainGroup.rotation.y += this.velocity.x;
      this.mainGroup.rotation.x += this.velocity.y;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    dom.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.velocity.x = deltaX * 0.007;
      this.velocity.y = deltaY * 0.007;

      this.mainGroup.rotation.y += this.velocity.x;
      this.mainGroup.rotation.x += this.velocity.y;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    dom.addEventListener('click', () => {
      if (this.mainGroup && typeof gsap !== 'undefined') {
        gsap.to(this.mainGroup.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 0.18, yoyo: true, repeat: 1 });
      }
    });

    window.addEventListener('resize', () => this.updateSize());
    if (typeof ResizeObserver !== 'undefined' && this.container) {
      new ResizeObserver(() => this.updateSize()).observe(this.container);
    }
  }

  setupUIControls() {
    const presetBtns = document.querySelectorAll('.preset-switch-btn');
    const activeClasses = ['bg-zinc-950', 'text-white', 'dark:bg-white', 'dark:text-zinc-950'];
    const inactiveClasses = ['bg-zinc-400/60', 'dark:bg-obsidian-800', 'text-zinc-800', 'dark:text-gray-300'];

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selectedPreset = btn.getAttribute('data-preset');
        if (selectedPreset) {
          presetBtns.forEach(b => {
            b.classList.remove(...activeClasses);
            b.classList.add(...inactiveClasses);
          });
          btn.classList.remove(...inactiveClasses);
          btn.classList.add(...activeClasses);

          this.buildPresetModel(selectedPreset);
        }
      });
    });

    const wireframeBtn = document.getElementById('toggle-3d-wireframe');
    const wireframeStatusText = document.getElementById('wireframe-status-text');
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        this.isWireframe = !this.isWireframe;
        if (wireframeStatusText) {
          wireframeStatusText.innerText = `Wireframe: ${this.isWireframe ? 'ON' : 'MIN'}`;
        }
        this.buildPresetModel(this.currentPreset);
      });
    }

    const autorotateBtn = document.getElementById('toggle-3d-autorotate');
    const autorotateStatusText = document.getElementById('autorotate-status-text');
    const speedIndicator = document.getElementById('3d-speed-indicator');

    if (autorotateBtn) {
      autorotateBtn.addEventListener('click', () => {
        this.isAutoRotate = !this.isAutoRotate;
        if (autorotateStatusText) {
          autorotateStatusText.innerText = `Spin: ${this.isAutoRotate ? 'ON' : 'PAUSED'}`;
        }
        if (speedIndicator) {
          speedIndicator.innerText = `SPIN: ${this.isAutoRotate ? 'ACTIVE' : 'PAUSED'}`;
          speedIndicator.className = this.isAutoRotate 
            ? 'text-zinc-950 dark:text-white font-bold'
            : 'text-zinc-500 font-bold';
        }
      });
    }

    const resetBtn = document.getElementById('reset-3d-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.mainGroup) {
          if (typeof gsap !== 'undefined') {
            gsap.to(this.mainGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.out' });
          } else {
            this.mainGroup.rotation.set(0, 0, 0);
          }
        }
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    if (this.mainGroup) {
      if (!this.isDragging && this.isAutoRotate) {
        this.mainGroup.rotation.y += 0.005;
        this.mainGroup.rotation.x += 0.002;
      } else if (!this.isDragging) {
        this.velocity.x *= 0.94;
        this.velocity.y *= 0.94;
        this.mainGroup.rotation.y += this.velocity.x;
        this.mainGroup.rotation.x += this.velocity.y;
      }

      // Reactor Animations
      if (this.gimbalRing1) this.gimbalRing1.rotation.z = elapsedTime * 0.4;
      if (this.gimbalRing2) this.gimbalRing2.rotation.x = -elapsedTime * 0.35;
      if (this.gimbalRing3) this.gimbalRing3.rotation.y = elapsedTime * 0.25;
      if (this.plasmaConduit) this.plasmaConduit.rotation.y = elapsedTime * 0.5;
      if (this.fluxPoints) this.fluxPoints.rotation.z = -elapsedTime * 0.3;

      // Satellite Animations
      if (this.dishWire) this.dishWire.rotation.y = Math.sin(elapsedTime * 0.8) * 0.4;
      if (this.solarWings && this.solarWings.length) {
        this.solarWings.forEach((wing, i) => {
          wing.rotation.y = Math.sin(elapsedTime * 0.5 + i * Math.PI) * 0.08;
        });
      }
      if (this.escortProbes && this.escortProbes.length) {
        this.escortProbes.forEach((probe, i) => {
          const angle = elapsedTime * 0.9 + i * Math.PI;
          probe.position.set(Math.cos(angle) * 1.8, Math.sin(angle * 0.8) * 0.6, Math.sin(angle) * 1.8);
          probe.rotation.y += 0.03;
        });
      }
      if (this.orbitTrackRing) this.orbitTrackRing.rotation.z = elapsedTime * 0.2;

      // Neural Matrix Animations
      if (this.cortexWire) this.cortexWire.rotation.y = elapsedTime * 0.2;
      if (this.subCortexWire) this.subCortexWire.rotation.y = -elapsedTime * 0.25;

      // Tesseract Chronos Animations
      if (this.innerCube) {
        this.innerCube.rotation.y = -elapsedTime * 0.6;
        this.innerCube.rotation.x = elapsedTime * 0.4;
      }
      if (this.chronoRing1) this.chronoRing1.rotation.z = elapsedTime * 0.4;
      if (this.chronoRing2) this.chronoRing2.rotation.x = -elapsedTime * 0.35;
      if (this.chronoRing3) this.chronoRing3.rotation.y = elapsedTime * 0.25;

      // Center Core
      if (this.centerOrb) {
        this.centerOrb.rotation.y = -elapsedTime * 0.8;
        this.centerOrb.rotation.x = elapsedTime * 0.3;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// ===================================================================
// 3. MINIMAL 3D PROJECT CARD MODELS MANAGER (WebGL)
// ===================================================================
class ProjectCard3DModel {
  constructor(container, modelType) {
    this.container = container;
    this.modelType = modelType;
    this.isVisible = false;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, container.clientWidth / (container.clientHeight || 1), 0.1, 100);
    this.camera.position.z = 3.6;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.container.appendChild(this.renderer.domElement);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.clock = new THREE.Clock();
    this.buildModel();
    this.setupObserver();
  }

  buildModel() {
    while (this.group.children.length > 0) {
      const obj = this.group.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
      this.group.remove(obj);
    }

    const isDark = document.documentElement.classList.contains('dark');
    const orangeColor = isDark ? 0xf97316 : 0xea580c;
    const secondaryColor = isDark ? 0xffffff : 0x18181b;
    const amberColor = isDark ? 0xfbbf24 : 0xd97706;

    const lineMat = new THREE.LineBasicMaterial({ color: orangeColor });
    const lineDimMat = new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: isDark ? 0.7 : 0.85 });
    const lineAmberMat = new THREE.LineBasicMaterial({ color: amberColor });
    const innerGlassMat = new THREE.MeshBasicMaterial({ color: isDark ? 0x200c00 : 0x27272a, wireframe: true, transparent: true, opacity: 0.35 });

    if (this.modelType === 'torusknot') {
      // 01. Torus Knot Engine + Orbital Ring
      const geo = new THREE.TorusKnotGeometry(0.72, 0.22, 64, 16, 2, 3);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      const inner = new THREE.Mesh(geo, innerGlassMat);
      this.group.add(wire);
      this.group.add(inner);

      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.35, 0, Math.PI * 2, true).getPoints(48)
      );
      this.subRing = new THREE.LineLoop(ringGeo, lineDimMat);
      this.subRing.rotation.x = Math.PI / 3;
      this.group.add(this.subRing);

      const coreGeo = new THREE.OctahedronGeometry(0.22, 0);
      const coreMat = new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true });
      this.coreOrb = new THREE.Mesh(coreGeo, coreMat);
      this.group.add(this.coreOrb);

    } else if (this.modelType === 'prism') {
      // 02. Broadcast Octahedral Prism + Wave Grid Planes
      const geo = new THREE.OctahedronGeometry(0.85, 0);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      this.group.add(wire);

      const planeGeo = new THREE.PlaneGeometry(1.9, 1.9, 4, 4);
      this.scanPlane = new THREE.LineSegments(new THREE.WireframeGeometry(planeGeo), lineDimMat);
      this.scanPlane.rotation.x = Math.PI / 2;
      this.group.add(this.scanPlane);

      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.25, 0, Math.PI * 2, true).getPoints(48)
      );
      this.subRing = new THREE.LineLoop(ringGeo, lineAmberMat);
      this.group.add(this.subRing);

    } else if (this.modelType === 'radar') {
      // 03. Geodesic Radar Telemetry Sphere + Latitude Rings
      const geo = new THREE.IcosahedronGeometry(0.82, 1);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      const inner = new THREE.Mesh(geo, innerGlassMat);
      this.group.add(wire);
      this.group.add(inner);

      const ringGeo1 = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.15, 0, Math.PI * 2, true).getPoints(48)
      );
      this.radarRing1 = new THREE.LineLoop(ringGeo1, lineDimMat);
      this.radarRing1.rotation.x = Math.PI / 4;
      this.group.add(this.radarRing1);

      const ringGeo2 = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.28, 0, Math.PI * 2, true).getPoints(48)
      );
      this.radarRing2 = new THREE.LineLoop(ringGeo2, lineAmberMat);
      this.radarRing2.rotation.y = Math.PI / 3;
      this.group.add(this.radarRing2);

      const beaconGeo = new THREE.OctahedronGeometry(0.18, 0);
      this.coreOrb = new THREE.Mesh(beaconGeo, new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true }));
      this.group.add(this.coreOrb);

    } else if (this.modelType === 'dodecahedron') {
      // 04. Hyper-Dodecahedron Commerce Core + Nested Cube
      const geo = new THREE.DodecahedronGeometry(0.82, 0);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      this.group.add(wire);

      const innerCubeGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
      this.innerCube = new THREE.LineSegments(new THREE.WireframeGeometry(innerCubeGeo), lineDimMat);
      this.group.add(this.innerCube);

      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.3, 0, Math.PI * 2, true).getPoints(48)
      );
      this.subRing = new THREE.LineLoop(ringGeo, lineAmberMat);
      this.subRing.rotation.x = Math.PI / 2.5;
      this.group.add(this.subRing);

    } else if (this.modelType === 'mobius') {
      // 05. Parametric WebGL Kinetic Mobius Ribbon
      const geo = new THREE.TorusKnotGeometry(0.68, 0.16, 72, 12, 3, 5);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      this.group.add(wire);

      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.35, 0, Math.PI * 2, true).getPoints(48)
      );
      this.subRing = new THREE.LineLoop(ringGeo, lineDimMat);
      this.subRing.rotation.y = Math.PI / 3;
      this.group.add(this.subRing);

      const axisGeo = new THREE.OctahedronGeometry(0.24, 0);
      this.coreOrb = new THREE.Mesh(axisGeo, new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true }));
      this.group.add(this.coreOrb);

    } else if (this.modelType === 'sentinel') {
      // 06. Sentinel Cluster Node Matrix + Orbiting Node Cubes
      const geo = new THREE.IcosahedronGeometry(0.72, 0);
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat);
      this.group.add(wire);

      this.satelliteNodes = [];
      const nodeCount = 3;
      for (let i = 0; i < nodeCount; i++) {
        const satGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
        const satMat = new THREE.MeshBasicMaterial({ color: i === 0 ? orangeColor : (i === 1 ? amberColor : secondaryColor), wireframe: true });
        const sat = new THREE.Mesh(satGeo, satMat);
        this.group.add(sat);
        this.satelliteNodes.push(sat);
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, 1.28, 0, Math.PI * 2, true).getPoints(48)
      );
      this.subRing = new THREE.LineLoop(ringGeo, lineDimMat);
      this.subRing.rotation.x = Math.PI / 3.5;
      this.group.add(this.subRing);
    }
  }

  setupObserver() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.1 });
      observer.observe(this.container);
    } else {
      this.isVisible = true;
    }

    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => {
        this.updateSize();
      }).observe(this.container);
    }
  }

  updateSize() {
    if (!this.container) return;
    const width = this.container.clientWidth || 200;
    const height = this.container.clientHeight || 160;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  render(elapsedTime) {
    if (!this.isVisible) return;

    if (this.group) {
      this.group.rotation.y = elapsedTime * 0.4;
      this.group.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
    }

    if (this.subRing) {
      this.subRing.rotation.z = -elapsedTime * 0.3;
    }

    if (this.innerCube) {
      this.innerCube.rotation.y = -elapsedTime * 0.7;
      this.innerCube.rotation.x = elapsedTime * 0.4;
    }

    if (this.scanPlane) {
      this.scanPlane.position.y = Math.sin(elapsedTime * 1.5) * 0.5;
      this.scanPlane.rotation.z = elapsedTime * 0.2;
    }

    if (this.radarRing1) {
      this.radarRing1.rotation.z = elapsedTime * 0.5;
    }
    if (this.radarRing2) {
      this.radarRing2.rotation.x = -elapsedTime * 0.4;
    }

    if (this.coreOrb) {
      this.coreOrb.rotation.y = -elapsedTime * 0.8;
      this.coreOrb.rotation.z = elapsedTime * 0.5;
    }

    if (this.satelliteNodes && this.satelliteNodes.length) {
      this.satelliteNodes.forEach((node, i) => {
        const angle = elapsedTime * 0.8 + (i * Math.PI * 2) / this.satelliteNodes.length;
        const radius = 1.28;
        node.position.x = Math.cos(angle) * radius;
        node.position.y = Math.sin(angle) * radius * Math.sin(Math.PI / 3.5);
        node.position.z = Math.sin(angle) * radius * Math.cos(Math.PI / 3.5);
        node.rotation.x += 0.02;
        node.rotation.y += 0.03;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}

class Project3DModelManager {
  constructor() {
    this.models = [];
    this.clock = new THREE.Clock();
    this.init();
  }

  init() {
    const viewports = document.querySelectorAll('.project-3d-model-viewport');
    viewports.forEach((el) => {
      const modelType = el.getAttribute('data-project-model') || 'torusknot';
      const model = new ProjectCard3DModel(el, modelType);
      this.models.push(model);
    });

    this.animate();

    window.addEventListener('themeChanged', () => {
      this.models.forEach(model => model.buildModel());
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const elapsedTime = this.clock.getElapsedTime();
    this.models.forEach(model => model.render(elapsedTime));
  }
}

// ===================================================================
// 4. INTERACTIVE 3D SKILLS TECH GLOBE ENGINE (WebGL + 3D Projections)
// ===================================================================

const SKILLS_GLOBE_DATA = [
  {
    id: 'react',
    name: 'React.js (v18+)',
    category: 'frontend',
    categoryName: 'FRONTEND_CORE',
    percentage: 95,
    level: '95% (Senior L5)',
    desc: 'Fiber Architecture, Concurrent Mode, Custom Hooks, Suspense, and Complex State Normalization.',
    impact: 'Architected reactive frontend state tree handling 2.5K+ daily active SaaS enterprise employees with zero memory leaks.',
    chips: ['Concurrent Mode', 'Custom Hooks', 'Fiber Engine', 'Context API']
  },
  {
    id: 'nextjs',
    name: 'Next.js (v14/15)',
    category: 'frontend',
    categoryName: 'FRONTEND_SSR',
    percentage: 90,
    level: '90% (Architect)',
    desc: 'App Router, Streaming SSR, Incremental Static Regeneration, and Edge API Routes.',
    impact: 'Engineered high-traffic news portals serving 10M+ monthly page views with 1.1s LCP & 0 CLS.',
    chips: ['App Router', 'Streaming SSR', 'ISR', 'Edge Functions']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryName: 'TYPE_SYSTEM',
    percentage: 92,
    level: '92% (Strict Typing)',
    desc: 'Generics, Discriminated Unions, Strict Interfaces, Mapped & Utility Types.',
    impact: 'Enforced 100% type-safe schemas across enterprise frontends eliminating runtime TypeError regressions.',
    chips: ['Generics', 'Strict Mode', 'Utility Types', 'Mapped Types']
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryName: 'CORE_ENGINE',
    percentage: 96,
    level: '96% (Expert)',
    desc: 'Async/Await, Event Loop, Microtasks, Closures, Prototype Chain, Memory Profiling.',
    impact: 'Optimized critical JavaScript runtime evaluation down to sub-50ms Total Blocking Time (TBT).',
    chips: ['Event Loop', 'Async/Await', 'Memory Optimization', 'DOM API']
  },
  {
    id: 'htmlcss',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    categoryName: 'UI_FOUNDATION',
    percentage: 97,
    level: '97% (Pixel-Perfect)',
    desc: 'Semantic HTML5, CSS Grid, Flexbox, Custom Properties, WCAG 2.1 AA Accessibility.',
    impact: 'Engineered responsive layouts with 100/100 Lighthouse Accessibility & SEO scores.',
    chips: ['CSS Grid', 'Flexbox', 'WCAG 2.1', 'Semantic Web']
  },
  {
    id: 'redux',
    name: 'Redux Toolkit & RTK',
    category: 'state',
    categoryName: 'STATE_&_APIS',
    percentage: 94,
    level: '94% (Lead)',
    desc: 'State Normalization, Async Thunks, Automated Cache Invalidation, and Optimistic UI updates.',
    impact: 'Reduced repeated API requests by 45% using normalized entities and RTK Query caching.',
    chips: ['createSlice', 'Async Thunks', 'Entity Adapter', 'RTK Query']
  },
  {
    id: 'zustand',
    name: 'Context & Zustand',
    category: 'state',
    categoryName: 'STATE_&_APIS',
    percentage: 90,
    level: '90% (Advanced)',
    desc: 'Atomic Micro-Stores, Memoized Context Providers, and Selector-based Global State.',
    impact: 'Eliminated unnecessary component re-renders across deep layout trees.',
    chips: ['Atomic Stores', 'Memoization', 'Selective Re-render']
  },
  {
    id: 'rest',
    name: 'RESTful APIs & Axios',
    category: 'state',
    categoryName: 'STATE_&_APIS',
    percentage: 95,
    level: '95% (Expert)',
    desc: 'Axios Interceptors, JWT Token Refresh Gateways, Rate-Limiting, and Error Handlers.',
    impact: 'Streamlined multi-tenant enterprise API calls with automated retry algorithms.',
    chips: ['Interceptors', 'JWT Auth', 'Error Gateway', 'Exponential Backoff']
  },
  {
    id: 'graphql',
    name: 'GraphQL & Apollo',
    category: 'state',
    categoryName: 'STATE_&_APIS',
    percentage: 88,
    level: '88% (Advanced)',
    desc: 'Schema Definitions, Typed Queries, Mutations, Subscriptions, and In-Memory Cache.',
    impact: 'Eliminated over-fetching by 60% on complex dashboard aggregation widgets.',
    chips: ['Typed Queries', 'Mutations', 'Normalized Cache', 'Subscriptions']
  },
  {
    id: 'websockets',
    name: 'WebSockets & Socket.io',
    category: 'state',
    categoryName: 'STATE_&_APIS',
    percentage: 88,
    level: '88% (Real-Time)',
    desc: 'Bidirectional Streaming, High-Frequency Telemetry Push, Heartbeat Reconnection.',
    impact: 'Streamed 50K+ live data node positions directly to WebGL visualization dashboards at 60 FPS.',
    chips: ['Binary Streams', 'Heartbeats', 'Event Channels', 'Reconnection']
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'ui',
    categoryName: 'UI_&_MOTION',
    percentage: 96,
    level: '96% (Expert)',
    desc: 'Design Tokens, Utility Layering, Dark Mode Theming, and Custom Plugin Extensions.',
    impact: 'Built modular, highly performant design systems with zero CSS runtime bloat.',
    chips: ['JIT Engine', 'Tokens', 'Theming Engine', 'Arbitrary Values']
  },
  {
    id: 'gsap',
    name: 'GSAP & ScrollTrigger',
    category: 'ui',
    categoryName: 'UI_&_MOTION',
    percentage: 92,
    level: '92% (Advanced)',
    desc: 'Pinned Timelines, Kinetic Horizontal Scrubbing, FLIP Morphing, and SVG Animations.',
    impact: 'Crafted fluid, award-winning user experiences locked at a smooth 60 FPS.',
    chips: ['ScrollTrigger', 'Timelines', 'Kinetic Scrub', 'Stagger Physics']
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'ui',
    categoryName: 'UI_&_MOTION',
    percentage: 86,
    level: '86% (3D Hardware)',
    desc: 'Instanced Geometries, GLSL Custom Shaders, Wireframe Models, and Lighting.',
    impact: 'Integrated lightweight 3D interactive graphics without degrading device battery or frame rate.',
    chips: ['GLSL Shaders', 'Instanced Mesh', 'Raycasting', 'BufferGeometry']
  },
  {
    id: 'lenis',
    name: 'Lenis Smooth Scroll',
    category: 'ui',
    categoryName: 'UI_&_MOTION',
    percentage: 90,
    level: '90% (Specialist)',
    desc: 'Inertial Physics Scrolling, GSAP Ticker Synchronization, and Virtualized Scrollbars.',
    impact: 'Harmonized desktop and mobile kinetic momentum across all major browsers.',
    chips: ['Inertial Physics', 'Ticker Sync', 'Smooth UX']
  },
  {
    id: 'mui',
    name: 'MUI & Design Systems',
    category: 'ui',
    categoryName: 'UI_&_MOTION',
    percentage: 92,
    level: '92% (Enterprise)',
    desc: 'Theme Palette Customization, Component Overrides, and Atomic Component Systems.',
    impact: 'Standardized UI across 15+ internal enterprise applications.',
    chips: ['Theme Overrides', 'Atomic Design', 'Design Tokens']
  },
  {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: 'backend',
    categoryName: 'BACKEND_&_TOOLS',
    percentage: 85,
    level: '85% (Server-Side)',
    desc: 'REST Endpoints, Express Middleware Pipelines, JWT Authentication, and Microservices.',
    impact: 'Engineered high-throughput backend services and secure authentication gateways.',
    chips: ['Express.js', 'Middleware', 'Microservices', 'JWT']
  },
  {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    category: 'backend',
    categoryName: 'BACKEND_&_TOOLS',
    percentage: 84,
    level: '84% (Database)',
    desc: 'Aggregation Pipelines, Compound Indexing, Schema Validation, and Data Modeling.',
    impact: 'Designed normalized and fast querying collections for high-volume telemetry.',
    chips: ['Aggregation', 'Indexing', 'Mongoose ODM', 'Transactions']
  },
  {
    id: 'vite',
    name: 'Vite & Webpack',
    category: 'backend',
    categoryName: 'BACKEND_&_TOOLS',
    percentage: 90,
    level: '90% (DevOps/Build)',
    desc: 'Module Federation, Tree-Shaking, Code-Splitting, and Sub-second Hot Module Replacement.',
    impact: 'Cut production bundle sizes by 35% and accelerated dev build startup from 40s to 300ms.',
    chips: ['Module Federation', 'Tree Shaking', 'HMR', 'Code Splitting']
  },
  {
    id: 'jest',
    name: 'Jest & RTL',
    category: 'backend',
    categoryName: 'BACKEND_&_TOOLS',
    percentage: 86,
    level: '86% (QA/Testing)',
    desc: 'Unit Testing, Component Mocks, Regression Suites, and TDD Methodologies.',
    impact: 'Achieved 85%+ test coverage on core payroll and calculation business logic.',
    chips: ['Unit Tests', 'React Testing Library', 'Mocking', 'CI Integration']
  },
  {
    id: 'seo',
    name: 'Core Web Vitals & SEO',
    category: 'backend',
    categoryName: 'BACKEND_&_TOOLS',
    percentage: 95,
    level: '95% (Specialist)',
    desc: 'Sub-1.2s LCP, Zero CLS Ad-Tech Containment, Technical SEO (+40% Organic Traffic).',
    impact: 'Boosted search indexing ranking and user retention across enterprise publishing platforms.',
    chips: ['LCP / CLS / INP', 'Technical SEO', 'Schema Markup', 'Performance Profiling']
  }
];

class Skills3DGlobe {
  constructor() {
    this.canvasContainer = document.getElementById('skills-3d-globe-canvas');
    this.overlayContainer = document.getElementById('skills-3d-tag-overlay');
    if (!this.canvasContainer || !this.overlayContainer) return;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.canvasContainer.clientWidth / this.canvasContainer.clientHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });

    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.clock = new THREE.Clock();

    this.isAutoSpin = true;
    this.activeFilter = 'all';
    this.selectedIndex = 0;

    this.nodes = [];
    this.tagElements = [];

    this.init();
  }

  init() {
    this.updateSize();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.canvasContainer.appendChild(this.renderer.domElement);

    this.camera.position.z = 6.4;

    this.globeGroup = new THREE.Group();
    this.scene.add(this.globeGroup);

    this.buildGlobeGeometry();
    this.buildSkillNodes();
    this.buildQuickSelector();
    this.setupEventListeners();
    this.setupUIControls();
    this.selectSkill(0);

    window.addEventListener('themeChanged', () => {
      while (this.globeGroup.children.length > 0) {
        const obj = this.globeGroup.children[0];
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
        this.globeGroup.remove(obj);
      }
      this.buildGlobeGeometry();
      this.buildSkillNodes();
    });

    this.animate();
  }

  updateSize() {
    if (!this.canvasContainer) return;
    const width = this.canvasContainer.clientWidth || 600;
    const height = this.canvasContainer.clientHeight || 500;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  buildGlobeGeometry() {
    const isDark = document.documentElement.classList.contains('dark');
    const orangeColor = isDark ? 0xf97316 : 0xea580c;
    const secondaryColor = isDark ? 0xffffff : 0x18181b;
    const amberColor = isDark ? 0xfbbf24 : 0xd97706;

    // 1. Geodesic Sphere Wireframe
    const sphereGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const wireMat = new THREE.LineBasicMaterial({
      color: orangeColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
    });
    this.sphereWire = new THREE.LineSegments(new THREE.WireframeGeometry(sphereGeo), wireMat);
    this.globeGroup.add(this.sphereWire);

    // 2. Latitude & Longitude Rings
    const ringMat1 = new THREE.LineBasicMaterial({ color: orangeColor, transparent: true, opacity: 0.85 });
    const ringMat2 = new THREE.LineBasicMaterial({ color: secondaryColor, transparent: true, opacity: 0.55 });
    const ringMat3 = new THREE.LineBasicMaterial({ color: amberColor, transparent: true, opacity: 0.65 });

    // Equator ring
    const equator = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(
      new THREE.Path().absarc(0, 0, 2.22, 0, Math.PI * 2, true).getPoints(64)
    ), ringMat1);
    equator.rotation.x = Math.PI / 2;
    this.globeGroup.add(equator);

    // Inclined ring 1
    const incRing1 = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(
      new THREE.Path().absarc(0, 0, 2.25, 0, Math.PI * 2, true).getPoints(64)
    ), ringMat2);
    incRing1.rotation.x = Math.PI / 4;
    incRing1.rotation.y = Math.PI / 6;
    this.globeGroup.add(incRing1);

    // Inclined ring 2
    const incRing2 = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(
      new THREE.Path().absarc(0, 0, 2.25, 0, Math.PI * 2, true).getPoints(64)
    ), ringMat3);
    incRing2.rotation.x = -Math.PI / 4;
    incRing2.rotation.y = -Math.PI / 6;
    this.globeGroup.add(incRing2);

    // 3. Glowing Inner Core Particles
    const dustCount = 100;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = Math.random() * 1.8;
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      dustPos[i * 3] = r * Math.sin(theta) * Math.cos(phi);
      dustPos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      dustPos[i * 3 + 2] = r * Math.cos(theta);
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: isDark ? 0xffedd5 : 0xea580c,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.innerDust = new THREE.Points(dustGeo, dustMat);
    this.globeGroup.add(this.innerDust);

    // 4. Central Glowing Orb
    const coreGeo = new THREE.OctahedronGeometry(0.35, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: amberColor, wireframe: true, transparent: true, opacity: 0.9 });
    this.centralCore = new THREE.Mesh(coreGeo, coreMat);
    this.globeGroup.add(this.centralCore);
  }

  buildSkillNodes() {
    this.overlayContainer.innerHTML = '';
    this.nodes = [];
    this.tagElements = [];

    const count = SKILLS_GLOBE_DATA.length;
    const radius = 2.45;

    // Distribute nodes evenly on sphere using Fibonacci distribution
    for (let i = 0; i < count; i++) {
      const data = SKILLS_GLOBE_DATA[i];
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);

      // 3D Visual Marker Mesh attached to globeGroup
      const markerGeo = new THREE.OctahedronGeometry(0.09, 0);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.copy(pos);
      this.globeGroup.add(marker);

      // HTML Overlay Tag Element
      const tagEl = document.createElement('div');
      tagEl.className = 'skill-globe-tag absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border transition-all duration-150 backdrop-blur-md shadow-sm select-none';
      tagEl.setAttribute('data-index', i);
      tagEl.setAttribute('data-category', data.category);

      // Base Styling
      tagEl.style.backgroundColor = 'rgba(24, 24, 27, 0.85)';
      tagEl.style.color = '#ffffff';
      tagEl.style.borderColor = 'rgba(255, 255, 255, 0.2)';

      tagEl.innerHTML = `
        <span class="inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>${data.name}</span>
        </span>
      `;

      tagEl.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectSkill(i);
      });

      tagEl.addEventListener('mouseenter', () => {
        tagEl.style.borderColor = '#ffffff';
        tagEl.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
      });

      tagEl.addEventListener('mouseleave', () => {
        if (this.selectedIndex !== i) {
          tagEl.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          tagEl.style.backgroundColor = 'rgba(24, 24, 27, 0.85)';
        }
      });

      this.overlayContainer.appendChild(tagEl);

      this.nodes.push({
        data,
        pos,
        marker,
        element: tagEl
      });

      this.tagElements.push(tagEl);
    }
  }

  buildQuickSelector() {
    const selectorContainer = document.getElementById('quick-skills-selector');
    if (!selectorContainer) return;

    selectorContainer.innerHTML = '';
    SKILLS_GLOBE_DATA.forEach((skill, idx) => {
      const chip = document.createElement('button');
      chip.className = 'quick-skill-chip px-2 py-1 rounded text-[10px] font-mono font-bold transition-all bg-zinc-300 dark:bg-obsidian-900 border border-zinc-400/40 dark:border-white/10 text-zinc-900 dark:text-zinc-300 hover:border-zinc-950 dark:hover:border-white hover:text-zinc-950 dark:hover:text-white';
      chip.setAttribute('data-index', idx);
      chip.innerText = skill.name;

      chip.addEventListener('click', () => {
        this.selectSkill(idx);
      });

      selectorContainer.appendChild(chip);
    });
  }

  selectSkill(index) {
    if (index < 0 || index >= SKILLS_GLOBE_DATA.length) return;
    this.selectedIndex = index;
    const skill = SKILLS_GLOBE_DATA[index];

    // 1. Update HUD Elements
    const hudCategory = document.getElementById('hud-skill-category');
    const hudIndex = document.getElementById('hud-skill-index');
    const hudName = document.getElementById('hud-skill-name');
    const hudDesc = document.getElementById('hud-skill-desc');
    const hudPercentage = document.getElementById('hud-skill-percentage');
    const hudBar = document.getElementById('hud-skill-bar');
    const hudImpact = document.getElementById('hud-skill-impact');
    const hudChips = document.getElementById('hud-skill-chips');

    if (hudCategory) hudCategory.innerText = skill.categoryName;
    if (hudIndex) hudIndex.innerText = `NODE // ${String(index + 1).padStart(2, '0')} of ${SKILLS_GLOBE_DATA.length}`;
    if (hudName) hudName.innerText = skill.name;
    if (hudDesc) hudDesc.innerText = skill.desc;
    if (hudPercentage) hudPercentage.innerText = skill.level;
    if (hudBar) hudBar.style.width = `${skill.percentage}%`;
    if (hudImpact) hudImpact.innerText = skill.impact;

    if (hudChips) {
      hudChips.innerHTML = '';
      skill.chips.forEach(chipText => {
        const span = document.createElement('span');
        span.className = 'px-2 py-0.5 rounded bg-zinc-300 dark:bg-obsidian-900 border border-zinc-400/40 dark:border-white/10 text-zinc-900 dark:text-zinc-200';
        span.innerText = chipText;
        hudChips.appendChild(span);
      });
    }

    // 2. Highlight active tag overlay badge
    this.tagElements.forEach((el, i) => {
      if (i === index) {
        el.style.borderColor = '#f97316';
        el.style.backgroundColor = 'rgba(234, 88, 12, 0.9)';
        el.style.boxShadow = '0 0 16px rgba(249, 115, 22, 0.6)';
        el.style.color = '#ffffff';
      } else {
        el.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        el.style.backgroundColor = 'rgba(24, 24, 27, 0.85)';
        el.style.boxShadow = 'none';
        el.style.color = '#e4e4e7';
      }
    });

    // 3. Highlight quick selector chip
    const chips = document.querySelectorAll('.quick-skill-chip');
    chips.forEach((c, i) => {
      if (i === index) {
        c.className = 'quick-skill-chip px-2 py-1 rounded text-[10px] font-mono font-bold transition-all bg-orange-500 text-white shadow-sm border-transparent';
      } else {
        c.className = 'quick-skill-chip px-2 py-1 rounded text-[10px] font-mono font-bold transition-all bg-zinc-300 dark:bg-obsidian-900 border border-zinc-400/40 dark:border-white/10 text-zinc-900 dark:text-zinc-300 hover:border-orange-500 dark:hover:border-orange-500';
      }
    });

    // 4. Smoothly rotate globe to center the selected node in front of camera
    if (this.nodes[index] && typeof gsap !== 'undefined') {
      const nodePos = this.nodes[index].pos.clone().normalize();
      
      // Calculate target yaw and pitch
      const targetYaw = -Math.atan2(nodePos.x, nodePos.z);
      const targetPitch = Math.asin(nodePos.y);

      gsap.to(this.globeGroup.rotation, {
        y: targetYaw,
        x: targetPitch,
        duration: 0.85,
        ease: 'power2.out'
      });
    }
  }

  setFilter(filterName) {
    this.activeFilter = filterName;
    const label = document.getElementById('globe-active-filter-label');
    if (label) {
      label.innerText = `[FILTER: ${filterName.toUpperCase()}]`;
    }

    this.nodes.forEach((node) => {
      const match = (filterName === 'all' || node.data.category === filterName);
      if (match) {
        node.element.style.display = 'block';
        node.marker.visible = true;
      } else {
        node.element.style.display = 'none';
        node.marker.visible = false;
      }
    });
  }

  setupEventListeners() {
    const dom = this.canvasContainer;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    dom.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.velocity.x = deltaX * 0.006;
      this.velocity.y = deltaY * 0.006;

      this.globeGroup.rotation.y += this.velocity.x;
      this.globeGroup.rotation.x += this.velocity.y;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch Support
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    dom.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.velocity.x = deltaX * 0.006;
      this.velocity.y = deltaY * 0.006;

      this.globeGroup.rotation.y += this.velocity.x;
      this.globeGroup.rotation.x += this.velocity.y;

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('resize', () => this.updateSize());
    if (typeof ResizeObserver !== 'undefined' && this.canvasContainer) {
      new ResizeObserver(() => this.updateSize()).observe(this.canvasContainer);
    }
  }

  setupUIControls() {
    // Globe Category Filter Buttons
    const filterBtns = document.querySelectorAll('.globe-filter-btn');
    const activeClasses = ['bg-orange-500', 'text-white', 'shadow-sm'];
    const inactiveClasses = ['bg-zinc-200', 'dark:bg-obsidian-800', 'text-zinc-900', 'dark:text-gray-300', 'border', 'border-zinc-400', 'dark:border-white/10'];

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove(...activeClasses);
          b.classList.add(...inactiveClasses);
        });

        btn.classList.remove(...inactiveClasses);
        btn.classList.add(...activeClasses);

        const filterVal = btn.getAttribute('data-globe-filter') || 'all';
        this.setFilter(filterVal);
      });
    });

    // Auto-Spin Toggle
    const spinBtn = document.getElementById('toggle-globe-spin');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => {
        this.isAutoSpin = !this.isAutoSpin;
        spinBtn.innerText = `SPIN: ${this.isAutoSpin ? 'AUTO' : 'PAUSED'}`;
        spinBtn.className = this.isAutoSpin
          ? 'px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold transition-colors'
          : 'px-2.5 py-1 rounded bg-amber-900/60 text-amber-300 text-[11px] font-bold transition-colors';
      });
    }

    // Reset View Button
    const resetBtn = document.getElementById('reset-globe-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(this.globeGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.8, ease: 'power2.out' });
        } else {
          this.globeGroup.rotation.set(0, 0, 0);
        }
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const elapsedTime = this.clock.getElapsedTime();

    if (this.globeGroup) {
      if (!this.isDragging && this.isAutoSpin) {
        this.globeGroup.rotation.y += 0.003;
      } else if (!this.isDragging) {
        this.velocity.x *= 0.93;
        this.velocity.y *= 0.93;
        this.globeGroup.rotation.y += this.velocity.x;
        this.globeGroup.rotation.x += this.velocity.y;
      }

      if (this.centralCore) {
        this.centralCore.rotation.y = -elapsedTime * 0.8;
        this.centralCore.rotation.z = elapsedTime * 0.5;
      }

      if (this.innerDust) {
        this.innerDust.rotation.y = -elapsedTime * 0.05;
      }
    }

    // Project 3D Node positions to 2D screen overlay
    if (this.canvasContainer && this.nodes.length) {
      const containerWidth = this.canvasContainer.clientWidth || 600;
      const containerHeight = this.canvasContainer.clientHeight || 500;
      const halfWidth = containerWidth / 2;
      const halfHeight = containerHeight / 2;

      this.nodes.forEach((node) => {
        if (this.activeFilter !== 'all' && node.data.category !== this.activeFilter) {
          node.element.style.display = 'none';
          return;
        }

        // Clone world position
        const worldPos = node.pos.clone().applyMatrix4(this.globeGroup.matrixWorld);
        const screenPos = worldPos.clone().project(this.camera);

        const x = (screenPos.x * halfWidth) + halfWidth;
        const y = -(screenPos.y * halfHeight) + halfHeight;

        // Depth attenuation: front nodes are bright and scaled, back nodes are dimmed
        const isFacingCamera = worldPos.z > -0.5;
        const depthFactor = (worldPos.z + 2.5) / 5.0; // range ~0 to 1

        node.element.style.left = `${x}px`;
        node.element.style.top = `${y}px`;

        if (worldPos.z < -0.8) {
          node.element.style.opacity = '0.12';
          node.element.style.transform = `translate(-50%, -50%) scale(0.7)`;
          node.element.style.zIndex = '1';
        } else if (worldPos.z < 0.5) {
          node.element.style.opacity = '0.6';
          node.element.style.transform = `translate(-50%, -50%) scale(0.85)`;
          node.element.style.zIndex = '5';
        } else {
          node.element.style.opacity = '1';
          node.element.style.transform = `translate(-50%, -50%) scale(1.0)`;
          node.element.style.zIndex = '20';
        }

        node.element.style.display = 'block';
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}

function initAll3DScenes() {
  if (!window.heroMinimal3D) window.heroMinimal3D = new HeroMinimalScene();
  if (!window.widget3D) window.widget3D = new MinimalModelWidget();
  if (!window.projects3D) window.projects3D = new Project3DModelManager();
  if (!window.skillsGlobe3D) window.skillsGlobe3D = new Skills3DGlobe();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll3DScenes);
} else {
  initAll3DScenes();
}

