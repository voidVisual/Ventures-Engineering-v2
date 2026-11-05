import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Crosshair, Compass, Zap } from 'lucide-react';

export default function ThreeStage({ theme = 'dark', activeHoveredService = null }) {
  const mountRef = useRef(null);
  const [trackingMode, setTrackingMode] = useState('cursor'); // 'cursor' | 'auto'
  const [activeTelemetry, setActiveTelemetry] = useState({ x: 0, y: 0, rot: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(theme === 'dark' ? 0x090a0d : 0xf8f8f5, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x242834 : 0xe0e0e0,
      theme === 'dark' ? 1.4 : 2.0
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xd4a373, 2.5);
    keyLight.position.set(5, 8, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(theme === 'dark' ? 0x38bdf8 : 0x0284c7, 1.8);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xe58a3c, 1.2, 10);
    fillLight.position.set(0, 1, 2);
    scene.add(fillLight);

    // --- Palette Materials ---
    const isDark = theme === 'dark';
    const matTitanium = new THREE.MeshStandardMaterial({
      color: isDark ? 0x222630 : 0xd8d8d0,
      metalness: 0.85,
      roughness: 0.25,
    });

    const matCeramic = new THREE.MeshStandardMaterial({
      color: isDark ? 0x12141a : 0xf0f0ec,
      metalness: 0.4,
      roughness: 0.45,
    });

    const matBrass = new THREE.MeshStandardMaterial({
      color: 0xd4a373,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x8a5a2a,
      emissiveIntensity: 0.2,
    });

    const matGlowAmber = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
    });

    const matGridWire = new THREE.LineBasicMaterial({
      color: isDark ? 0xd4a373 : 0xb87532,
      transparent: true,
      opacity: isDark ? 0.25 : 0.35,
    });

    // --- Structural Base Platform (Steel I-Beam Girder) ---
    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    const girderGroup = new THREE.Group();
    const girderLength = 12;
    const flangeGeom = new THREE.BoxGeometry(girderLength, 0.12, 1.8);
    const webGeom = new THREE.BoxGeometry(girderLength, 1.4, 0.14);

    const topFlange = new THREE.Mesh(flangeGeom, matCeramic);
    topFlange.position.y = 0;
    const web = new THREE.Mesh(webGeom, matTitanium);
    web.position.y = -0.7;
    const btmFlange = new THREE.Mesh(flangeGeom, matCeramic);
    btmFlange.position.y = -1.4;

    girderGroup.add(topFlange, web, btmFlange);
    girderGroup.position.set(0, -1.2, 0);
    stageRoot.add(girderGroup);

    // Girder bolt studs
    const boltGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 6);
    for (let i = -5; i <= 5; i += 0.8) {
      const bolt1 = new THREE.Mesh(boltGeom, matBrass);
      bolt1.position.set(i, 0.08, 0.7);
      const bolt2 = new THREE.Mesh(boltGeom, matBrass);
      bolt2.position.set(i, 0.08, -0.7);
      girderGroup.add(bolt1, bolt2);
    }

    // --- 3D Space-Frame Lattice / Structural Truss in Background ---
    const trussGroup = new THREE.Group();
    const nodeGeom = new THREE.SphereGeometry(0.1, 12, 12);
    const trussNodes = [];

    for (let x = -6; x <= 6; x += 2) {
      for (let y = 0; y <= 4; y += 2) {
        const node = new THREE.Mesh(nodeGeom, matBrass);
        node.position.set(x, y - 0.5, -2.5);
        trussGroup.add(node);
        trussNodes.push(node);
      }
    }

    // Connect truss nodes with fine lines
    const linePoints = [];
    for (let i = 0; i < trussNodes.length; i++) {
      for (let j = i + 1; j < trussNodes.length; j++) {
        const dist = trussNodes[i].position.distanceTo(trussNodes[j].position);
        if (dist <= 2.2) {
          linePoints.push(trussNodes[i].position);
          linePoints.push(trussNodes[j].position);
        }
      }
    }
    const trussLineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);
    const trussLines = new THREE.LineSegments(trussLineGeom, matGridWire);
    trussGroup.add(trussLines);
    stageRoot.add(trussGroup);

    // --- The Architectural Character ("The Structural Analyst") ---
    const characterGroup = new THREE.Group();
    characterGroup.position.set(0, -1.14, 0); // Standing on top of girder
    stageRoot.add(characterGroup);

    // Pelvis
    const pelvisGeom = new THREE.BoxGeometry(0.6, 0.28, 0.38);
    const pelvis = new THREE.Mesh(pelvisGeom, matTitanium);
    pelvis.position.y = 1.35;
    characterGroup.add(pelvis);

    // Legs
    const upperLegGeom = new THREE.CylinderGeometry(0.09, 0.08, 0.55, 8);
    const lowerLegGeom = new THREE.CylinderGeometry(0.08, 0.07, 0.6, 8);
    const kneeGeom = new THREE.SphereGeometry(0.09, 8, 8);
    const bootGeom = new THREE.BoxGeometry(0.18, 0.14, 0.36);

    const leftLeg = new THREE.Group();
    leftLeg.position.set(-0.24, 1.25, 0);
    const leftUpper = new THREE.Mesh(upperLegGeom, matCeramic);
    leftUpper.position.y = -0.25;
    const leftKnee = new THREE.Mesh(kneeGeom, matBrass);
    leftKnee.position.y = -0.55;
    const leftLower = new THREE.Mesh(lowerLegGeom, matTitanium);
    leftLower.position.y = -0.85;
    const leftBoot = new THREE.Mesh(bootGeom, matCeramic);
    leftBoot.position.set(0, -1.2, 0.08);
    leftLeg.add(leftUpper, leftKnee, leftLower, leftBoot);

    const rightLeg = new THREE.Group();
    rightLeg.position.set(0.24, 1.25, 0);
    const rightUpper = new THREE.Mesh(upperLegGeom, matCeramic);
    rightUpper.position.y = -0.25;
    const rightKnee = new THREE.Mesh(kneeGeom, matBrass);
    rightKnee.position.y = -0.55;
    const rightLower = new THREE.Mesh(lowerLegGeom, matTitanium);
    rightLower.position.y = -0.85;
    const rightBoot = new THREE.Mesh(bootGeom, matCeramic);
    rightBoot.position.set(0, -1.2, 0.08);
    rightLeg.add(rightUpper, rightKnee, rightLower, rightBoot);

    characterGroup.add(leftLeg, rightLeg);

    // Torso / Chest
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 1.5, 0);

    const spineGeom = new THREE.CylinderGeometry(0.12, 0.16, 0.4, 8);
    const spine = new THREE.Mesh(spineGeom, matTitanium);
    spine.position.y = 0.2;

    const chestGeom = new THREE.BoxGeometry(0.72, 0.55, 0.44);
    const chest = new THREE.Mesh(chestGeom, matCeramic);
    chest.position.y = 0.55;

    // Glowing core reactor / stress gauge on chest
    const coreGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 16);
    coreGeom.rotateX(Math.PI / 2);
    const core = new THREE.Mesh(coreGeom, matGlowAmber);
    core.position.set(0, 0.58, 0.23);

    torsoGroup.add(spine, chest, core);
    characterGroup.add(torsoGroup);

    // Head & Scanner Visor
    const neckGeom = new THREE.CylinderGeometry(0.08, 0.1, 0.18, 8);
    const neck = new THREE.Mesh(neckGeom, matTitanium);
    neck.position.y = 0.9;

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.15, 0);

    const craniumGeom = new THREE.BoxGeometry(0.36, 0.42, 0.38);
    const cranium = new THREE.Mesh(craniumGeom, matCeramic);

    // Sleek geometric visor
    const visorGeom = new THREE.BoxGeometry(0.34, 0.1, 0.12);
    const visor = new THREE.Mesh(visorGeom, matGlowAmber);
    visor.position.set(0, 0.02, 0.19);

    // Antenna scanner probe
    const antennaGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.3, 6);
    const antenna = new THREE.Mesh(antennaGeom, matBrass);
    antenna.position.set(0.18, 0.25, -0.05);

    headGroup.add(cranium, visor, antenna);
    torsoGroup.add(neck, headGroup);

    // Arms
    const shoulderGeom = new THREE.SphereGeometry(0.1, 8, 8);
    const armSegmentGeom = new THREE.CylinderGeometry(0.07, 0.06, 0.48, 8);

    // Left Arm (relaxed at side / slight grip)
    const leftArm = new THREE.Group();
    leftArm.position.set(-0.45, 0.75, 0);
    const leftShoulder = new THREE.Mesh(shoulderGeom, matBrass);
    const leftBicep = new THREE.Mesh(armSegmentGeom, matTitanium);
    leftBicep.position.y = -0.24;
    const leftForearm = new THREE.Mesh(armSegmentGeom, matCeramic);
    leftForearm.position.set(0.05, -0.65, 0.1);
    leftForearm.rotation.x = -0.4;
    leftArm.add(leftShoulder, leftBicep, leftForearm);
    torsoGroup.add(leftArm);

    // Right Arm holding Theodolite / Laser Scanner
    const rightArm = new THREE.Group();
    rightArm.position.set(0.45, 0.75, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeom, matBrass);
    const rightBicep = new THREE.Mesh(armSegmentGeom, matTitanium);
    rightBicep.position.y = -0.24;
    rightBicep.rotation.x = -0.3;

    const rightForearm = new THREE.Mesh(armSegmentGeom, matCeramic);
    rightForearm.position.set(-0.08, -0.58, 0.22);
    rightForearm.rotation.x = -1.1;

    // Theodolite Instrument Unit
    const theodoliteGroup = new THREE.Group();
    theodoliteGroup.position.set(-0.08, -0.85, 0.45);

    const bodyGeom = new THREE.BoxGeometry(0.22, 0.22, 0.32);
    const theodoliteBody = new THREE.Mesh(bodyGeom, matTitanium);

    const lensGeom = new THREE.CylinderGeometry(0.06, 0.08, 0.16, 16);
    lensGeom.rotateX(Math.PI / 2);
    const theodoliteLens = new THREE.Mesh(lensGeom, matBrass);
    theodoliteLens.position.z = 0.22;

    theodoliteGroup.add(theodoliteBody, theodoliteLens);

    // Dynamic Laser Ray
    const laserRayGeom = new THREE.CylinderGeometry(0.015, 0.08, 9, 8);
    laserRayGeom.rotateX(Math.PI / 2);
    laserRayGeom.translate(0, 0, 4.5);
    const laserRayMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const laserRay = new THREE.Mesh(laserRayGeom, laserRayMat);
    laserRay.position.z = 0.24;
    theodoliteGroup.add(laserRay);

    rightArm.add(rightShoulder, rightBicep, rightForearm, theodoliteGroup);
    torsoGroup.add(rightArm);

    // --- Dynamic Target Reticle Plane on Ground ---
    const reticleGeom = new THREE.RingGeometry(0.2, 0.4, 24);
    reticleGeom.rotateX(-Math.PI / 2);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0xd4a373,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const targetReticle = new THREE.Mesh(reticleGeom, reticleMat);
    targetReticle.position.set(0, -1.13, 2.5);
    stageRoot.add(targetReticle);

    // --- Atmospheric Coordinate Dust Particles ---
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = Math.random() * 6 - 1;
      particlePos[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: isDark ? 0xd4a373 : 0xb87532,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    stageRoot.add(particles);

    // --- Interaction State ---
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollProgress = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      pointer.targetX = (clientX / rect.width) * 2 - 1;
      pointer.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointermove', handlePointerMove);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer lerp
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;

      // Telemetry update throttling
      if (Math.floor(elapsedTime * 10) % 3 === 0) {
        setActiveTelemetry({
          x: pointer.x.toFixed(2),
          y: pointer.y.toFixed(2),
          rot: (characterGroup.rotation.y * (180 / Math.PI)).toFixed(1),
        });
      }

      // Autonomous vs Cursor Tracking
      let lookTargetX = pointer.x;
      let lookTargetY = pointer.y;

      if (trackingMode === 'auto') {
        lookTargetX = Math.sin(elapsedTime * 0.8) * 0.7;
        lookTargetY = Math.cos(elapsedTime * 0.5) * 0.3;
      }

      // Torso & Head IK kinematics
      torsoGroup.rotation.y = lookTargetX * 0.35 + Math.sin(elapsedTime * 1.2) * 0.03;
      torsoGroup.rotation.x = -lookTargetY * 0.2;
      torsoGroup.position.y = 1.5 + Math.sin(elapsedTime * 2.0) * 0.02; // Breathing idle

      headGroup.rotation.y = lookTargetX * 0.55;
      headGroup.rotation.x = -lookTargetY * 0.45;

      // Right arm / laser aiming
      theodoliteGroup.rotation.y = lookTargetX * 0.6;
      theodoliteGroup.rotation.x = -lookTargetY * 0.5;

      // Laser reticle tracking position
      targetReticle.position.x = lookTargetX * 2.5;
      targetReticle.position.z = 2.5 - lookTargetY * 1.5;
      targetReticle.rotation.z = elapsedTime * 1.5;

      // Active Hover Reaction: Pulse laser intensity if a service is hovered
      if (activeHoveredService) {
        laserRayMat.opacity = 0.95 + Math.sin(elapsedTime * 10) * 0.15;
        core.scale.setScalar(1.2 + Math.sin(elapsedTime * 12) * 0.2);
      } else {
        laserRayMat.opacity = 0.5 + Math.sin(elapsedTime * 2) * 0.1;
        core.scale.setScalar(1.0);
      }

      // Scroll-driven dynamic camera & stage choreography
      camera.position.y = 2.2 - scrollProgress * 1.5;
      camera.position.z = 7.5 - scrollProgress * 2.0;
      stageRoot.rotation.y = scrollProgress * 0.8 + Math.sin(elapsedTime * 0.2) * 0.05;

      // Subtle particle float
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [theme, trackingMode, activeHoveredService]);

  return (
    <div className="relative w-full h-[520px] lg:h-[680px] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-crosshair" />

      {/* Futuristic Architectural HUD / Telemetry Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-canvas)]/80 backdrop-blur-md border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--accent-brass)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)] animate-ping" />
          <span>UNIT 01: STRUCTURAL ANALYST</span>
        </div>
        <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider pl-2">
          TARGET: [{activeTelemetry.x}, {activeTelemetry.y}] / AZIMUTH: {activeTelemetry.rot}°
        </div>
      </div>

      {/* Floating Mode Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={() => setTrackingMode((prev) => (prev === 'cursor' ? 'auto' : 'cursor'))}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md transition-all duration-300 border border-[var(--border-subtle)] bg-[var(--bg-canvas)]/80 hover:border-[var(--accent-brass)] hover:text-[var(--accent-brass)] text-[var(--text-secondary)] shadow-lg"
          title="Toggle Character Kinematics Mode"
        >
          {trackingMode === 'cursor' ? (
            <>
              <Crosshair size={13} className="text-[var(--accent-amber)]" />
              <span>TRACK: CURSOR</span>
            </>
          ) : (
            <>
              <Compass size={13} className="text-[var(--accent-cyan)] animate-spin" />
              <span>AUTO SURVEY</span>
            </>
          )}
        </button>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-canvas)]/80 border border-[var(--border-subtle)] backdrop-blur-md">
          <Zap size={12} className="text-[var(--accent-brass)]" />
          <span>60 FPS // THREE.JS WEBGL</span>
        </div>
      </div>

      {/* Architectural Cad Framing Corners */}
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-brass)]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-brass)]/40 pointer-events-none" />
    </div>
  );
}

