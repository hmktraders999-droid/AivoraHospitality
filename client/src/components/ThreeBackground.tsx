import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 35;
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const torusGeometry = new THREE.TorusGeometry(2.5, 0.4, 16, 100);
    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const octahedronGeometry = new THREE.OctahedronGeometry(2, 0);

    const geometries = [torusGeometry, sphereGeometry, octahedronGeometry];

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      positions[i] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i + 2] = radius * Math.cos(theta);

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const shapes: Array<{ mesh: THREE.Mesh; velocity: THREE.Vector3; rotationSpeed: THREE.Vector3 }> = [];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[i % geometries.length];

      const hue = 200 + (i * 15);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(`hsl(${hue}, 70%, 50%)`),
        wireframe: true,
        transparent: true,
        opacity: 0.25,
        metalness: 0.8,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const angle = (i / 12) * Math.PI * 2;
      const distance = 20 + Math.random() * 15;
      mesh.position.set(
        Math.cos(angle) * distance,
        (Math.random() - 0.5) * 30,
        Math.sin(angle) * distance
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      const scale = 0.8 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);

      scene.add(mesh);
      shapes.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      });
    }

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00D9FF,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const blueLight = new THREE.PointLight(0x0099FF, 3, 100);
    blueLight.position.set(-15, 10, 15);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00FFD9, 3, 100);
    cyanLight.position.set(15, -10, 15);
    scene.add(cyanLight);

    const backLight = new THREE.PointLight(0x0055FF, 2, 100);
    backLight.position.set(0, 0, -30);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0x202040, 0.8);
    scene.add(ambientLight);

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      camera.position.x += (mouseRef.current.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      shapes.forEach((shape, i) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        shape.mesh.position.x += Math.sin(elapsedTime * 0.3 + i) * 0.02;
        shape.mesh.position.y += Math.cos(elapsedTime * 0.2 + i) * 0.02;
        shape.mesh.position.z += Math.sin(elapsedTime * 0.25 + i * 0.5) * 0.01;

        const dist = Math.sqrt(
          shape.mesh.position.x ** 2 +
          shape.mesh.position.y ** 2 +
          shape.mesh.position.z ** 2
        );
        if (dist > 50) {
          shape.mesh.position.normalize().multiplyScalar(50);
        }
      });

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;

      const particlePositions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] += velocities[i];
        particlePositions[i + 1] += velocities[i + 1];
        particlePositions[i + 2] += velocities[i + 2];

        const dist = Math.sqrt(
          particlePositions[i] ** 2 +
          particlePositions[i + 1] ** 2 +
          particlePositions[i + 2] ** 2
        );

        if (dist > 65 || dist < 5) {
          velocities[i] *= -1;
          velocities[i + 1] *= -1;
          velocities[i + 2] *= -1;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      blueLight.position.x = Math.sin(elapsedTime * 0.5) * 20;
      blueLight.position.y = Math.cos(elapsedTime * 0.3) * 15;

      cyanLight.position.x = Math.cos(elapsedTime * 0.4) * 20;
      cyanLight.position.y = Math.sin(elapsedTime * 0.6) * 15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (containerRef.current && renderer?.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.error('Error removing renderer', e);
        }
      }
      renderer?.dispose();
      torusGeometry.dispose();
      sphereGeometry.dispose();
      octahedronGeometry.dispose();
      particleGeometry.dispose();
      shapes.forEach(shape => {
        if (shape.mesh.material instanceof THREE.Material) {
          shape.mesh.material.dispose();
        }
      });
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #000510 0%, #001025 50%, #000820 100%)' }}
    >
      {!hasWebGL && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-cyan-500/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </div>
  );
}
