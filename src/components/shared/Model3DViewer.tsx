'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sparkles, Move3d } from 'lucide-react';

interface Model3DViewerProps {
  modelUrl?: string;
  className?: string;
  autoRotate?: boolean;
}

export const Model3DViewer: React.FC<Model3DViewerProps> = ({
  modelUrl = '/models/tiny_wonder.glb?v=3',
  className = 'w-full h-[520px] sm:h-[580px]',
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [showInteractionHint, setShowInteractionHint] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getDims = () => {
      const w = container.clientWidth || container.offsetWidth || 500;
      const h = container.clientHeight || container.offsetHeight || 550;
      return { w, h };
    };

    const { w, h } = getDims();

    // 1. Three.js Scene
    const scene = new THREE.Scene();

    // 2. Camera with wider framing so nothing clips
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    // 3. Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    renderer.domElement.style.border = 'none';
    renderer.domElement.style.pointerEvents = 'auto';

    container.appendChild(renderer.domElement);

    // 4. Orbit Controls (Smooth Auto Rotate)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.target.set(0, -0.1, 0);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 2.2);
    scene.add(ambientLight);

    const mainKey = new THREE.DirectionalLight(0xffffff, 2.8);
    mainKey.position.set(3, 5, 4);
    scene.add(mainKey);

    const fillLight = new THREE.DirectionalLight(0xffede0, 1.8);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    const frontFill = new THREE.DirectionalLight(0xfff5ea, 1.5);
    frontFill.position.set(0, 1.5, 3.5);
    scene.add(frontFill);

    const goldRim = new THREE.PointLight(0xc8a45d, 2.8, 12);
    goldRim.position.set(0, 3.5, -2.5);
    scene.add(goldRim);

    // 6. Draco Loader for High Performance Decompression
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');

    // 7. Load GLB Model
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    let loadedModel: THREE.Group | null = null;

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene;

        // Auto-scale and perfectly center model with generous padding
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / (maxDim || 1);
        loadedModel.scale.setScalar(scale);

        // Center on (0, 0, 0) and lower slightly for top headroom
        loadedModel.position.x = -center.x * scale;
        loadedModel.position.y = -center.y * scale - 0.25;
        loadedModel.position.z = -center.z * scale;

        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(mat.roughness || 0.4, 0.2);
              mat.metalness = Math.min(mat.metalness || 0.1, 0.15);
              mat.needsUpdate = true;
            }
          }
        });

        scene.add(loadedModel);
        setLoadingProgress(100);
        setTimeout(() => {
          setLoading(false);
          setShowInteractionHint(true);
          setTimeout(() => setShowInteractionHint(false), 4500);
        }, 150);
      },
      (xhr) => {
        if (xhr.lengthComputable && xhr.total > 0) {
          const pct = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 99);
          setLoadingProgress(pct);
        } else if (xhr.loaded) {
          // Fallback progress estimate based on ~1.3MB model size
          const estimated = Math.min(Math.round((xhr.loaded / 1350000) * 100), 95);
          setLoadingProgress((prev) => Math.max(prev, estimated));
        }
      },
      (error) => {
        console.error('Error loading 3D model:', error);
        setLoading(false);
      }
    );

    // 8. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const { w: newW, h: newH } = getDims();
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      dracoLoader.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [modelUrl, autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center select-none overflow-visible ${className}`}
      style={{ minHeight: '480px', background: 'transparent' }}
    >
      {/* Luxury Loading Animation */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
          <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl bg-cream-light/85 backdrop-blur-md border border-gold/40 shadow-warm-lg max-w-xs w-full text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            {/* Spinning Aura Emblem */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Pulsing outer aura ring */}
              <div className="absolute inset-0 rounded-full bg-gold/15 animate-ping opacity-60" />
              {/* Outer rotating dashed ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold animate-[spin_8s_linear_infinite]" />
              {/* Fast inner spinner ring */}
              <div className="absolute inset-2 rounded-full border-3 border-cream-border border-t-maroon animate-spin" />
              {/* Center icon */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-maroon text-cream-light flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-gold-light animate-pulse" />
              </div>
            </div>

            {/* Title & Status */}
            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-maroon tracking-wide">
                Loading 3D Experience
              </h4>
              <p className="font-playfair text-xs text-brown-muted italic">
                Cradled in Love • Ancestral Care
              </p>
            </div>

            {/* Sleek Progress Bar */}
            <div className="w-full space-y-1.5">
              <div className="w-full h-2 rounded-full bg-cream-border overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-maroon transition-all duration-300 ease-out"
                  style={{ width: `${Math.max(loadingProgress, 10)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-semibold text-brown-muted px-0.5">
                <span>Optimizing</span>
                <span className="text-maroon font-mono font-bold">{loadingProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating 3D Interaction Hint Badge */}
      {showInteractionHint && !loading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brown/80 backdrop-blur-md text-cream-light text-xs font-medium shadow-warm-md border border-cream-light/20 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
          <Move3d className="w-3.5 h-3.5 text-gold" />
          <span>Drag or swipe to rotate 3D view</span>
        </div>
      )}
    </div>
  );
};

export default Model3DViewer;

