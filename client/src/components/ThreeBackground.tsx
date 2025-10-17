import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
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
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (e) {
      setHasWebGL(false);
      return;
    }

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 40;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const shapes: THREE.Mesh[] = [];
    
    for (let i = 0; i < 8; i++) {
      const hue = (260 + (i * 20)) % 360;
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(`hsl(${hue}, 90%, 60%)`),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 1 + Math.random() * 2;
      mesh.scale.set(scale, scale, scale);
      scene.add(mesh);
      shapes.push(mesh);
    }

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x9D4EDD,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const purpleLight = new THREE.PointLight(0x9D4EDD, 2, 100);
    purpleLight.position.set(-10, 10, 10);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x00BCD4, 2, 100);
    cyanLight.position.set(10, -10, 10);
    scene.add(cyanLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      shapes.forEach((mesh, i) => {
        mesh.rotation.x += 0.002 * (i % 2 === 0 ? 1 : -1);
        mesh.rotation.y += 0.003 * (i % 2 === 0 ? -1 : 1);
        mesh.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
      });

      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0003;

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
      geometry.dispose();
      particleGeometry.dispose();
      shapes.forEach(mesh => {
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1a0f2e 100%)' }}
    >
      {!hasWebGL && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-chart-2/20" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      )}
    </div>
  );
}
