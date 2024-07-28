import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

import React from 'react';

import agent from './agent';
import { setNodes } from './store/slices/blockchain';
import { useDispatch, useSelector } from 'react-redux';

import NetworksPage from './Pages/NetworksPage';

import Navbar from './components/Navbar';
import AlertsPage from './Pages/AlertsPage';
import NodePage from './Pages/NodePage';
import NodeGraphPage from './Pages/NodeGraphPage';
import ErrorPage from './Pages/ErrorPage';
import ChatOverlay from './components/ChatOverlay';
import CrawlerPage from './Pages/CrawlerPage';
// import MapPage from './Pages/MapPage';
import RelaysPage from './Pages/RelaysPage';

export default function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: any) => state.blockchain);

  React.useEffect(() => {
    if (blockchain.nodes.length === 0) {
      agent.blockchain
        .getNodes()
        .then((res: any) => {
          if (res.data.status === 'success') {
            console.log(res.data);
            dispatch(setNodes(res.data));
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <ChatOverlay />
      <Routes>
        <Route path="/" element={<NetworksPage />} />
        <Route path="/crawler" element={<CrawlerPage />} />
        <Route path="/node/:id" element={<NodePage />} />
        <Route path="/node/:id/graph" element={<NodeGraphPage />} />
        <Route path="/relays" element={<RelaysPage />} />
        {/* <Route path="/node/:id/map" element={<MapPage />} /> */}
        {/* <Route path="/404" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
}
