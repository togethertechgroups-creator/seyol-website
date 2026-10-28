'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sparkles } from 'lucide-react';

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
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const getDims = () => {
      const w = Math.max(mountNode.clientWidth || mountNode.offsetWidth || 400, 280);
      const h = Math.max(mountNode.clientHeight || mountNode.offsetHeight || 480, 360);
      return { w, h };
    };

    const { w, h } = getDims();

    // 1. Three.js Scene
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    // 3. Renderer with safe power preference and transparent background
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
      });
    } catch {
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
        });
      } catch (err) {
        console.error('[Model3D] Error creating WebGL renderer:', err);
        return;
      }
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.outline = 'none';
    renderer.domElement.style.border = 'none';
    renderer.domElement.style.pointerEvents = 'auto';
    renderer.domElement.style.cursor = 'grab';

    // Mount canvas into dedicated container
    mountNode.appendChild(renderer.domElement);

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

        // Auto-scale and perfectly center model
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / (maxDim || 1);
        loadedModel.scale.setScalar(scale);

        // Center on (0, 0, 0) and lower slightly for natural perspective
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
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('[Model3D] Error loading 3D model:', error);
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
      if (!mountNode || !renderer) return;
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
      if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [modelUrl, autoRotate]);

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none overflow-hidden ${className}`}
      style={{ minHeight: '440px', background: 'transparent' }}
    >
      {/* Dedicated Three.js canvas container — React never modifies its internal children */}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />

      {/* Loading state indicator — safely managed by React as a sibling */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 pointer-events-none z-10 bg-[#FAF5EE]/40 backdrop-blur-xs rounded-3xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-3 border-[#A87C4F]/30 border-t-[#721832] animate-spin" />
            <Sparkles className="w-4 h-4 text-[#721832] animate-pulse" />
          </div>
          <span className="text-xs font-semibold text-[#721832] tracking-wider">
            Loading 3D Baby Model...
          </span>
        </div>
      )}
    </div>
  );
};

export default Model3DViewer;
