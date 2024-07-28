import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ForceGraph2D from 'react-force-graph-2d';
import ForceGraph3D from 'react-force-graph-3d';

import { setDragging, setPosition, setSelected } from '../store/slices/common';
import { setNodes } from '../store/slices/blockchain';

import agent from '../agent';

const [CRIMINAL, SUSPICIOUS, NORMAL, OFFICIAL] = [
  '#BC3326',
  '#CE762A',
  '#9ABB53',
  '#0070D8',
];

function InfiniteStage() {
  const blockchain = useSelector((state: any) => state.blockchain);
  const stagePos = useSelector((state: any) => state.common.canvas);

  const blockchainClone = structuredClone(blockchain);

  const dispatch = useDispatch();

  const nodeColorHandler = (n: any): string => {
    if (n.flag === 'Normal') {
      if (n.rating >= 5.0) {
        return NORMAL;
      } else {
        return SUSPICIOUS;
      }
    } else if (n.flag === 'Criminal') {
      return CRIMINAL;
    } else if (n.flag === 'Official') {
      return OFFICIAL;
    } else {
      return NORMAL;
    }
  };

  const nodeOnClickHanlder = (node: any) => {
    const clone = JSON.parse(JSON.stringify(node));
    console.log('SELECTED NODE');
    console.log(clone);
    dispatch(setSelected(clone));
  };

  React.useEffect(() => {
    dispatch(setPosition({ x: stagePos.x, y: stagePos.y }));
    dispatch(setDragging(stagePos.dragging));
  }, [stagePos]);

  return (
    <>
      <ForceGraph2D
        graphData={blockchainClone}
        nodeColor={nodeColorHandler}
        onNodeClick={nodeOnClickHanlder}
        nodeRelSize={6}
        linkWidth={2}
        backgroundColor="#1a1a1a"
        linkColor={(n: any) => '#252525'}
        enableNodeDrag={false}
        // warmupTicks={200}
        // cooldownTime={0}
        // linkDirectionalParticles={1}
        // linkDirectionalParticleColor={(n: any) => '#252525'}
        // linkDirectionalParticleWidth={6}
        // linkDirectionalParticleSpeed={0.02}
      />
    </>
  );
}

export default InfiniteStage;

// import Konva from 'konva';
// import { Stage, Layer, Line, Circle } from 'react-konva';

// const InfiniteStage = () => {
//   const stageRef = React.useRef<Konva.Stage>(null);

//   const blockchain = useSelector((state: any) => state.blockchain);
//   const stagePos = useSelector((state: any) => state.common.canvas);

//   const data = structuredClone(blockchain);

//   React.useEffect(() => {
//     const stage = stageRef.current?.getStage();

//     // Function to handle zooming with the mouse wheel
//     const handleWheel = (e: WheelEvent) => {
//       e.preventDefault();

//       const scaleBy = 1.1;
//       const oldScale = stage?.scaleX() || 1;

//       const pointer = stage?.getPointerPosition() || { x: 0, y: 0 };
//       const mousePointTo = {
//         x: (pointer.x - (stage?.x() || 0)) / oldScale,
//         y: (pointer.y - (stage?.y() || 0)) / oldScale,
//       };

//       const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

//       stage?.scale({ x: newScale, y: newScale });

//       const newPos = {
//         x: pointer.x - mousePointTo.x * newScale,
//         y: pointer.y - mousePointTo.y * newScale,
//       };

//       stage?.position(newPos);
//       stage?.batchDraw();
//     };

//     // Add wheel event listener for zooming
//     stage?.container().addEventListener('wheel', handleWheel);

//     return () => {
//       stage?.container().removeEventListener('wheel', handleWheel);
//     };
//   }, []);

//   return (
//     <Stage
//       width={window.innerWidth}
//       height={window.innerHeight}
//       ref={stageRef}
//       draggable
//     >
//       <Layer>
//         {/* Render links */}
//         {/* {data.links?.map((link: any) => (
//           <Line
//             key={link.id}
//             points={[
//               link.source.x,
//               link.source.y,
//               link.target.x,
//               link.target.y,
//             ]}
//             stroke="black"
//           />
//         ))} */}

//         {/* Render nodes */}
//         {data.nodes?.map((node: any) => (
//           <Circle
//             key={node.id}
//             x={node.x}
//             y={node.y}
//             width={30}
//             height={30}
//             fill="blue"
//             // draggable
//           />
//         ))}
//       </Layer>
//     </Stage>
//   );
// };

// export default InfiniteStage;

// import * as PIXI from 'pixi.js';

// import '@pixi/unsafe-eval';

// const InfiniteStage = () => {
//   const pixiContainer = React.useRef<HTMLDivElement>(null);
//   const [app, setApp] = React.useState<PIXI.Application | null>(null);

//   const blockchain = useSelector((state: any) => state.blockchain);
//   const stagePos = useSelector((state: any) => state.common.canvas);

//   const data = structuredClone(blockchain);

//   React.useEffect(() => {
//     const application = new PIXI.Application({
//       width: window.innerWidth,
//       height: window.innerHeight,
//       backgroundColor: 0xffffff,
//       antialias: true,
//       autoDensity: true,
//       resolution: devicePixelRatio,
//     });

//     setApp(application);

//     if (pixiContainer.current) {
//       pixiContainer.current.appendChild(application.view as unknown as Node);
//     }

//     // Enable interaction (panning and zooming)
//     application.stage.interactive = true;
//     application.stage.hitArea = new PIXI.Rectangle(
//       0,
//       0,
//       window.innerWidth,
//       window.innerHeight,
//     );

//     const initialPosition = new PIXI.Point(
//       window.innerWidth / 2,
//       window.innerHeight / 2,
//     );

//     application.stage.position.copyFrom(initialPosition);
//     application.stage.pivot.copyFrom(initialPosition);

//     const scale = new PIXI.Point(1, 1);

//     application.stage.scale.copyFrom(scale);

//     // Add event listeners for zooming
//     application.stage.on('wheel', (event: WheelEvent) => {
//       event.preventDefault();
//       const scaleFactor = 1.2;
//       const newScale =
//         event.deltaY > 0 ? scale.x * scaleFactor : scale.x / scaleFactor;

//       // Limit the scale to a reasonable range
//       const minScale = 0.1;
//       const maxScale = 5;

//       scale.x = Math.min(Math.max(newScale, minScale), maxScale);
//       scale.y = Math.min(Math.max(newScale, minScale), maxScale);

//       application.stage.scale.copyFrom(scale);
//     });

//     // Add event listener for panning
//     application.stage.on('mousedown', (event: any) => {
//       const originalPosition = new PIXI.Point(event.clientX, event.clientY);

//       const onMove = (e: any) => {
//         const newPosition = new PIXI.Point(e.clientX, e.clientY);

//         const delta = new PIXI.Point();
//         delta.x = newPosition.x - originalPosition.x;
//         delta.y = newPosition.y - originalPosition.y;

//         application.stage.position.x += delta.x;
//         application.stage.position.y += delta.y;

//         originalPosition.copyFrom(newPosition);
//       };

//       const onUp = () => {
//         window.removeEventListener('mousemove', onMove);
//         window.removeEventListener('mouseup', onUp);
//       };

//       window.addEventListener('mousemove', onMove);
//       window.addEventListener('mouseup', onUp);
//     });

//     return () => {
//       application.destroy();
//     };
//   }, []);

//   React.useEffect(() => {
//     if (!app) return;

//     const graphics = new PIXI.Graphics();
//     app.stage.addChild(graphics);

//     // Clear the graphics container
//     graphics.clear();

//     // Render links
//     // blockchain.links.forEach((link) => {
//     //   graphics.lineStyle(2, 0x000000); // Line color and width
//     //   graphics.moveTo(link.source.x, link.source.y);
//     //   graphics.lineTo(link.target.x, link.target.y);
//     // });

//     // Render nodes
//     data.nodes.forEach((node: any) => {
//       graphics.beginFill(0x0000ff); // Circle color
//       graphics.drawCircle(node.x, node.y, 10); // Circle radius
//       graphics.endFill();
//     });

//     app.ticker.add(() => {
//       // Update rendering
//       graphics.clear();

//       // // Render links
//       // links.forEach((link) => {
//       //   graphics.lineStyle(2, 0x000000);
//       //   graphics.moveTo(link.source.x, link.source.y);
//       //   graphics.lineTo(link.target.x, link.target.y);
//       // });

//       // Render nodes
//       data.nodes.forEach((node: any) => {
//         graphics.beginFill(0x0000ff);
//         graphics.drawCircle(node.x, node.y, 10);
//         graphics.endFill();
//       });
//     });
//   }, [app, data]);

//   return <div ref={pixiContainer} />;
// };

// export default InfiniteStage;
