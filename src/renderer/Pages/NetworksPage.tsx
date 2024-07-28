import React, { useEffect, useState } from 'react';

import InfiniteStage from '../components/InfiniteStage';
import NodeInformation from '../components/NodeInformation';

import './NetworksPage.css';
import Fuse from 'fuse.js';
import { useSelector } from 'react-redux';

const [CRIMINAL, SUSPICIOUS, NORMAL, OFFICIAL] = [
  '#BC3326',
  '#CE762A',
  '#9ABB53',
  '0070D8',
];

const NetworksPage = () => {
  // const nodes = useSelector((state: any) => state.blockchain.nodes);

  // const [query, setQuery] = useState<any>('');
  // const [results, setResults] = useState<any>([]);

  // useEffect(() => {
  //   if (query) {
  //     const fuse = new Fuse(items, {
  //       keys: ['name', 'description'], // Replace with the keys you want to search in
  //       includeScore: true,
  //     });

  //     const result = fuse.search(query);
  //     setResults(result.map((r) => r.item));
  //   } else {
  //     setResults(items);
  //   }
  // }, [query, items]);

  return (
    <>
      <div className="search-bar-container">
        <div className="search-bar">
          <input type="text" placeholder="Search for wallets" />
        </div>
      </div>
      <NodeInformation />
      <InfiniteStage />
    </>
  );
};

export default NetworksPage;
