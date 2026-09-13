'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Model3DViewerProps {
  modelUrl?: string;
  className?: string;
  autoRotate?: boolean;
}

export const Model3DViewer: React.FC<Model3DViewerProps> = ({
  modelUrl = '/models/cradled_in_love.glb',
  className = 'w-full h-[520px] sm:h-[580px]',
  autoRotate = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

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

    // 6. Load GLB Model
    const loader = new GLTFLoader();
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
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
        setLoading(false);
      }
    );

    // 7. Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
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
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-3 border-gold/30 border-t-maroon animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Model3DViewer;
