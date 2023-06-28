import logo from './logo.svg';
import './App.css';
import HModel from '../src/human_body.glb'
import { Html, useFBX, useGLTF, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Suspense, useMemo, useRef, useState } from 'react'
// import { useRouter } from 'next/navigation'
import { OBJLoader } from 'three-stdlib'
import blu from './pexels-blue.jpg'

function App() {

   const Scene = () => {
    const { scene } = useGLTF('/human_body.glb')
    const [texture, setTexture] = useState(blu)
    const [ss, setSS] = useState('')

    const colorMap = useTexture(texture)
    const { gl, camera } = useThree()
    const geometry = useMemo(() => {
      let g;
      scene.traverse((c) => {
        if (c.type === "Mesh") {
          const _c = c;
          g = _c.geometry;
        }
      });
      return g;
    }, [scene]);

    function ScreenShot() {
      console.log(gl)
      gl.render(scene, camera)
      // gl.toneMapping = THREE.ACESFilmicToneMapping
      // gl.toneMappingExposure = 0.6
      gl.preserveDrawingBuffer = true
      gl.domElement.toBlob(
        function(blob) {
          var a = document.createElement('a')
          var url = URL.createObjectURL(blob)
          a.href = url
          a.download = 'canvas.jpg'
          a.click()
          console.log('function is actually being used')
        },
        'image/jpg',
        1.0
      )
    }

    return (

      <mesh onClick={ScreenShot} rotation={[Math.PI/2, 0, -Math.PI/25]} position={[0,-1,3]} geometry={geometry} >
        <meshPhongMaterial map={colorMap} />
        {/* <Html>
          <a download href={ss}>click</a>
        </Html> */}
      </mesh>
    );
  }

  return (
    <div className="App">
      <Canvas>
        <Scene/>
        <pointLight position={[2, 0, 5]} />
        <spotLight position={[2, 0, 5]} />
        <pointLight position={[0, 0, -5]} />
        <pointLight position={[0, 0, 5]} />
        <pointLight position={[2, 0, -5]} />
        <spotLight position={[2, 0, -5]} />
        
      </Canvas>

    </div>
  );
}

export default App;
