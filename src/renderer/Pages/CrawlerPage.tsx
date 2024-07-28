import React from 'react';
import { Link } from 'react-router-dom';

import './CrawlerPage.css';
import agent from '../agent';

const CrawlerPage = () => {
  const [wallets, setWallets] = React.useState([]);

  const tagHandler = (word: any) => {
    if (word === 'porn') return 'Explicit';
    if (word === 'drugs') return 'Narcotics';
  };

  React.useEffect(() => {
    agent.blockchain.getCrawler().then((res) => {
      if (res.data.status === 'success') {
        setWallets(res.data.wallets);
      }
    });
  }, []);
  return (
    <>
      <div className="crawler__container">
        <div className="crawler__top-header">
          <div className="crawler__top-header-left">
            <span>Pages </span> / Crawler
            <h4>Multi-Thread Dark Web Crawler (ACTIVE)</h4>
          </div>
          <button className="crawler__graph-button">Disabled</button>
        </div>
        <div className="crawler__links-container">
          <div className="crawler__links-header">
            <div className="crawler__links-header__left">
              <h5>Detected Wallets</h5>
              <span className="crawler__detected-text">
                <span>Suspicious / Criminal</span> detected
              </span>
            </div>
            <div className="crawler__links-header__right">
              <button className="crawler__filters-button">Filters (0)</button>
              <div className="crawler__search-bar">
                <input type="text" placeholder="Find Wallets" />
              </div>
            </div>
          </div>
          <div className="crawler__list-container">
            {wallets.map((wallet: any) => {
              return (
                <div className="crawler__list-element">
                  <div className="crawler__flag">CRIMINAL</div>
                  <div className="crawler__wallet">
                    Wallet ID:
                    {' ' + wallet.walletId}
                  </div>
                  <div className="crawler__tag-holder">
                    {wallet.keyword.map((word: any) => {
                      return (
                        <span className="crawler__tag">{tagHandler(word)}</span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CrawlerPage;
