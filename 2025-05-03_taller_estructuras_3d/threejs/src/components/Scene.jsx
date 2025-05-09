import Controls from './Controls';
import { showEdges} from '../utils/showEdges';
import { showFaces } from '../utils/showFaces';
import { showVertices } from '../utils/showVertices';
import Comp from './Comp';

function Scene({transform_comp, onModelInfo}) {

  const transformFunctions = { // Hash map for transformation functions
    'none': showFaces,
    'edges': showEdges,
    'vertices': showVertices,
    'faces': showFaces,
    };
    return (
    <>
      <color attach="background" args={['#000000']} />
      <pointLight position={[0, 2, 2]} intensity={5} color="#00ffff" />
      <pointLight position={[-1, 0, -1]} intensity={20} color="#00ff00" />
      <ambientLight intensity={0.4} color="#ff0000" />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <Controls />
      <Comp transform={transformFunctions[transform_comp]} onModelInfo={onModelInfo} />
    </>
  );
}

export default Scene;
