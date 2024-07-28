import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ForceGraph2D from 'react-force-graph-2d';
import agent from '../agent';
import { useParams } from 'react-router-dom';
import { setSelected, setSelectedGraph } from '../store/slices/common';
import NodeInformation from '../components/NodeInformation';
import PathInfo from '../components/PathInfo';

const [CRIMINAL, SUSPICIOUS, NORMAL, OFFICIAL] = [
  '#BC3326',
  '#CE762A',
  '#9ABB53',
  '#0070D8',
];

const NodeGraphPage = () => {
  const id: any = useParams().id;

  const data = useSelector((state: any) => state.common.selected.graphData);

  const dispatch = useDispatch();

  const dataClone = structuredClone(data);

  const nodeOnClickHanlder = (node: any) => {
    const clone = structuredClone(node);
    console.log('SELECTED NODE');
    console.log(clone);
    dispatch(setSelected(clone));
  };

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

  React.useEffect(() => {
    agent.blockchain
      .getNodeGraph(id)
      .then((res: any) => {
        dispatch(
          setSelectedGraph({
            nodes: res.data.nodes,
            links: res.data.links,
          }),
        );
        console.log(res.data);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NodeInformation />
      <PathInfo path={'/ Node Information / Graph'} h4={id} />
      <ForceGraph2D
        graphData={dataClone}
        nodeColor={nodeColorHandler}
        onNodeClick={nodeOnClickHanlder}
        nodeRelSize={6}
        linkWidth={3}
        backgroundColor="#1a1a1a"
        linkColor={(n: any) => '#252525'}
        enableNodeDrag={false}
      />
    </>
  );
};

export default NodeGraphPage;
