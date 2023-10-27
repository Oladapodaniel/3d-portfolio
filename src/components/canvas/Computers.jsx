import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"
import CanvasLoader from "../Loader"

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    // <img src={require('../../../public/desktop_pc/')} />
    <mesh>
      {/* <hemisphereLight intensity={0.15} groundColor="black" /> */}
      <ambientLight />
      <pointLight intensity={1} />
      <spotLight
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the value of isMobile initial state
    setIsMobile(mediaQuery.matches);

    // Define a callback to handle any changes to the media query
    const handleMediaChanges = (event) => {
      console.log(event.matches);
      setIsMobile(event.matches)
    }

    // Add a callback function for a listenener to the media query
    mediaQuery.addEventListener('change', handleMediaChanges);
    
    // Remove listener when component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChanges);
    }
  }, [])
  return (
    <Canvas frameloop="demand" shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} minAzimuthAngle="-Infinity" maxAzimuthAngle="Inifinity" />
        <Computers isMobile="isMobile" />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas