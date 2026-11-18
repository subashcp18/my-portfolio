
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ShaderTextProps {
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  className?: string;
  pixelSize?: number;
  distortion?: number;
}

export default function ShaderText({
  text,
  fontSize = 180,
  fontWeight = 900,
  color = "#111111",
  className = "",
  pixelSize = 7,
  distortion = 0.055,
}: ShaderTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0.1, 10
    );
    camera.position.z = 1;

    const textureCanvas = document.createElement("canvas");
    const ctx = textureCanvas.getContext("2d");

    if (!ctx) {
      renderer.dispose();
      container.removeChild(renderer.domElement);
      return;
    }

    const textureWidth = 2048;
    const textureHeight = 512;

    textureCanvas.width = textureWidth;
    textureCanvas.height = textureHeight;

    ctx.clearRect(0, 0, textureWidth, textureHeight);
    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${fontSize}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, textureWidth / 2, textureHeight / 2);

    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(-2, -2) },
      uVelocity: { value: 0 },
      uTime: { value: 0 },
      uPixelSize: { value: pixelSize },
      uDistortion: { value: distortion },
      uResolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uVelocity;
        uniform float uTime;
        uniform float uPixelSize;
        uniform float uDistortion;
        uniform vec2 uResolution;

        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(
            sin(dot(p, vec2(127.1, 311.7)))
            * 43758.5453123
          );
        }

        void main() {
          vec2 uv = vUv;

          float aspect = uResolution.x / uResolution.y;
          vec2 mouse = uMouse;

          vec2 delta = uv - mouse;
          delta.x *= aspect;

          float distanceToMouse = length(delta);

          float radius = 0.30;
          float influence = 1.0 - smoothstep(
            0.0, radius, distanceToMouse
          );

          influence *= influence;

          float pixelAmount = uPixelSize * (
            1.0 + influence * (2.0 + uVelocity * 5.0)
          );

          vec2 pixelGrid = uResolution / pixelAmount;

          vec2 pixelUv = floor(
            uv * pixelGrid
          ) / pixelGrid;

          float wave = sin(
            distanceToMouse * 35.0 - uTime * 4.0
          );

          vec2 direction = normalize(delta + 0.0001);

          vec2 displacement =
            direction *
            wave *
            uDistortion *
            influence *
            (1.0 + uVelocity * 3.0);

          vec2 distortedUv = mix(
            uv,
            pixelUv,
            influence * 0.85
          );

          distortedUv += displacement;

          vec4 original = texture2D(uTexture, uv);
          vec4 distorted = texture2D(
            uTexture,
            clamp(distortedUv, 0.001, 0.999)
          );

          float grain = hash(
            floor(uv * pixelGrid) + floor(uTime * 12.0)
          );

          distorted.rgb +=
            (grain - 0.5) * 0.035 * influence;

          gl_FragColor = mix(
            original,
            distorted,
            influence
          );

          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let width = 1;
    let height = 1;
    let frame = 0;
    let animationId = 0;

    const mouseTarget = new THREE.Vector2(-2, -2);
    const mouseCurrent = new THREE.Vector2(-2, -2);

    let previousMouse = new THREE.Vector2(-2, -2);
    let velocity = 0;
    let lastTime = 0;

    const resize = () => {
      if (!container) return;

      width = container.clientWidth;
      height = container.clientHeight;

      if (!width || !height) return;

      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      mouseTarget.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      );
    };

    const onPointerLeave = () => {
      mouseTarget.set(-2, -2);
    };

    const updateMouse = () => {
      const distance = mouseCurrent.distanceTo(mouseTarget);

      mouseCurrent.lerp(mouseTarget, 0.16);

      velocity = THREE.MathUtils.lerp(
        velocity,
        Math.min(distance * 18, 1),
        0.12
      );

      uniforms.uMouse.value.copy(mouseCurrent);
      uniforms.uVelocity.value = velocity;
    };

    const clock = new THREE.Clock();

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      const delta = Math.min(
        (time - lastTime) / 1000 || 0,
        0.05
      );
      lastTime = time;

      if (!document.hidden) {
        updateMouse();

        uniforms.uTime.value = clock.getElapsedTime();

        renderer.render(scene, camera);
      }
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();

      container.removeEventListener(
        "pointermove",
        onPointerMove
      );

      container.removeEventListener(
        "pointerleave",
        onPointerLeave
      );

      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [text, fontSize, fontWeight, color, pixelSize, distortion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      aria-hidden="true"
    >
      <span className="sr-only">{text}</span>
    </div>
  );
}
