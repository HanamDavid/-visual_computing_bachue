import { useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Controls from './Controls';
import { TextureLoader } from 'three';

function Scene({ mode, videoRef }) {
  const imageTexture = useLoader(TextureLoader, '/panorama.jpg');

  useEffect(() => {
    if (mode === 'video' && videoRef.current) {
      videoRef.current.play();
    }
  }, [mode, videoRef]);

  const videoTexture = useMemo(() => {
    if (videoRef.current) {
      const tex = new THREE.VideoTexture(videoRef.current);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.format = THREE.RGBFormat;
      return tex;
    }
    return null;
  }, [videoRef]);

  return (
    <>
      <color attach="background" args={['#000']} />
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[10, 60, 40]} />
        <meshBasicMaterial
          map={mode === 'video' ? videoTexture : imageTexture}
          side={THREE.BackSide}
        />
      </mesh>
      <Controls />
    </>
  );
}

export default Scene;

