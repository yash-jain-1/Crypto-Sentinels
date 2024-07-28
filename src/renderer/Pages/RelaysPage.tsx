import React from 'react';
import { Link } from 'react-router-dom';

import './RelaysPage.css';
import agent from '../agent';

const RelaysPage = () => {
  const relays = [
    '89.58.26.216',
    '89.58.41.156',
    '89.58.41.251',
    '89.58.52.25',
    '91.132.144.59',
    '91.203.144.194',
    '91.203.145.116',
    '91.203.5.115',
    '91.203.5.118',
    '91.206.26.26',
    '91.208.75.153',
    '91.208.75.156',
    '91.208.75.178',
    '91.208.75.239',
    '91.208.75.3',
    '91.208.75.4',
    '91.210.59.57',
    '91.217.219.254',
    '91.219.237.56',
    '91.219.239.166',
    '91.92.109.126',
    '91.92.109.43',
    '92.118.39.226',
    '92.205.129.119',
    '92.205.163.226',
    '92.205.185.52',
    '92.205.237.227',
    '92.246.84.133',
    '93.123.12.112',
    '93.242.68.75',
    '93.95.225.141',
    '93.95.228.205',
    '93.95.230.165',
    '93.95.230.54',
    '93.99.104.128',
    '93.99.104.18',
    '93.99.104.194',
    '94.102.51.15',
    '94.103.124.184',
    '94.140.115.47',
    '94.140.115.63',
    '94.142.241.194',
    '94.142.244.16',
    '94.156.71.210',
    '94.16.112.22',
    '94.16.116.81',
    '94.16.116.86',
    '94.16.121.226',
    '94.16.121.91',
    '94.21.166.87',
    '94.228.169.70',
    '94.230.208.147',
    '94.230.208.148',
    '94.32.66.15',
    '94.75.225.81',
    '95.111.238.0',
    '95.128.43.164',
    '95.142.161.63',
    '95.143.193.125',
    '95.179.183.185',
    '95.211.210.103',
  ];

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10000) + 1;
    return number;
  };

  const generateRandomBoolean = () => {
    // Generate a random number between 0 and 1
    const randomNum = Math.random();

    // 90% chance of being true (0.0 to 0.89),
    // 10% chance of being false (0.9 to 1)
    const result = randomNum < 0.7;

    return result;
  };

  return (
    <>
      <div className="relays__container">
        <div className="relays__top-header">
          <div className="relays__top-header-left">
            <span>Pages </span> / Relays
            <h4>Tor Exit Node (Relays)</h4>
          </div>
          {/* <button className="relays__graph-button">Disabled</button> */}
        </div>
        <div className="relays__links-container">
          <div className="relays__links-header">
            <div className="relays__links-header__left">
              <h5>Active Nodes</h5>
              <span className="relays__detected-text">
                <span>{relays.length}</span> currently on network
              </span>
            </div>
            <div className="relays__links-header__right">
              <button className="relays__filters-button">Filters (0)</button>
              <div className="relays__search-bar">
                <input type="text" placeholder="Find Wallets" />
              </div>
            </div>
          </div>
          <div className="relays__list-container">
            {relays.map((element) => {
              const randomBool = generateRandomBoolean();
              return (
                <div
                  className={`relays__list-element ${
                    randomBool
                      ? 'relays__list-element-active'
                      : 'relays__list-element-inactive'
                  }`}
                >
                  <span>{element}</span>
                  <span className="relays__list-element-uptime">
                    Uptime: {generateRandomNumber()} seconds
                  </span>
                  {randomBool ? <button>Attack</button> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelaysPage;
