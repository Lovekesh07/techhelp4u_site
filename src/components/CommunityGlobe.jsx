
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CommunityGlobe() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 50);
    camera.position.set(0, 0, 5.6);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const sphereGeo = new THREE.SphereGeometry(1.7, 26, 18);
    const dotsMat = new THREE.PointsMaterial({ color: 0x5ee6a6, size: 0.032, transparent: true, opacity: 0.85 });
    const dots = new THREE.Points(sphereGeo, dotsMat);
    scene.add(dots);
    const wireGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.73, 1));
    const wireMat = new THREE.LineBasicMaterial({ color: 0xff8a4c, transparent: true, opacity: 0.16 });
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wire);

    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let raf;
    const loop = () => {
      dots.rotation.y += 0.0022;
      wire.rotation.y -= 0.0014;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      sphereGeo.dispose(); wireGeo.dispose(); dotsMat.dispose(); wireMat.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="globe-canvas" aria-hidden="true" />;
}
