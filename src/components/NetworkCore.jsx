import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NetworkCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // distribute member "nodes" evenly over a loose sphere
    const NODE_COUNT = 46;
    const nodePositions = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      const r = 2.7 + (Math.random() - 0.5) * 0.7;
      nodePositions.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      );
    }

    const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodePositions);
    const nodeMat = new THREE.PointsMaterial({ color: 0xff8a4c, size: 0.09, transparent: true, opacity: 0.95 });
    const nodesMesh = new THREE.Points(nodeGeo, nodeMat);
    group.add(nodesMesh);

    // connect nearby nodes — this is the "network" of the community
    const THRESH = 1.75;
    const edgeVerts = [];
    const edgeList = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < THRESH) {
          edgeVerts.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z);
          edgeVerts.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z);
          edgeList.push([nodePositions[i], nodePositions[j]]);
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.Float32BufferAttribute(edgeVerts, 3));
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x5ee6a6, transparent: true, opacity: 0.16 });
    const edgesMesh = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(edgesMesh);

    // pulses of "activity" traveling the connections
    const PULSE_COUNT = 28;
    const pulseData = Array.from({ length: PULSE_COUNT }, () => {
      const edge = edgeList[Math.floor(Math.random() * edgeList.length)];
      return { a: edge[0], b: edge[1], phase: Math.random(), speed: 0.12 + Math.random() * 0.22 };
    });
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(PULSE_COUNT * 3);
    pulseGeo.setAttribute("position", new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({ color: 0xeaf3ec, size: 0.065, transparent: true, opacity: 0.95 });
    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    group.add(pulseMesh);

    // faint outer shell for depth/structure
    const shellGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const shellEdgesGeo = new THREE.EdgesGeometry(shellGeo);
    const shellMat = new THREE.LineBasicMaterial({ color: 0xeaf3ec, transparent: true, opacity: 0.05 });
    const shell = new THREE.LineSegments(shellEdgesGeo, shellMat);
    group.add(shell);

    const ambient = new THREE.AmbientLight(0x1c2a24, 1.2);
    scene.add(ambient);
    const key = new THREE.PointLight(0xff8a4c, 1.6, 20);
    key.position.set(3, 2, 4);
    scene.add(key);

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const onMouseMove = (e) => {
      const r = mount.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouseY = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      group.rotation.y = t * 0.06 + targetX * 0.5;
      group.rotation.x = targetY * 0.32;

      const posAttr = pulseMesh.geometry.attributes.position;
      for (let i = 0; i < PULSE_COUNT; i++) {
        const p = pulseData[i];
        const tp = (t * p.speed + p.phase) % 1;
        posAttr.array[i * 3] = p.a.x + (p.b.x - p.a.x) * tp;
        posAttr.array[i * 3 + 1] = p.a.y + (p.b.y - p.a.y) * tp;
        posAttr.array[i * 3 + 2] = p.a.z + (p.b.z - p.a.z) * tp;
      }
      posAttr.needsUpdate = true;

      camera.position.x += (targetX * 1.2 - camera.position.x) * 0.02;
      camera.position.y += (-targetY * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      [nodeGeo, edgeGeo, pulseGeo, shellGeo, shellEdgesGeo].forEach((g) => g.dispose());
      [nodeMat, edgeMat, pulseMat, shellMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" data-cursor="link" />;
}
