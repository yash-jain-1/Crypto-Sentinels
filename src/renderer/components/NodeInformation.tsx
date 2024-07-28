import React from 'react';

import '../Pages/NetworksPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setMessages, setOverlay } from '../store/slices/blockchain';
import agent from '../agent';

const NodeInformation = ({ isMoreInfo = false }: any) => {
  const selectedNode = useSelector((state: any) => {
    return state.common.selected.nodeInfo;
  });

  const dispatch = useDispatch();

  const colorHandler = (node: any): string => {
    if (node.flag === 'Normal') {
      if (node.rating >= 5.0) {
        return 'normal';
      } else {
        return 'suspicious';
      }
    } else if (node.flag === 'Criminal') {
      return 'criminal';
    } else if (node.flag === 'Official') {
      return 'official';
    } else {
      return '';
    }
  };

  const percentageHandler = (node: any): number => {
    if (node.flag === 'Normal') {
      return node.rating * 10;
    } else if (node.flag === 'Criminal') {
      return 100;
    } else if (node.flag === 'Official') {
      return 100;
    } else {
      return 0;
    }
  };

  const scoreHandler = (node: any): number | string => {
    if (node.flag === 'Normal') {
      return node.rating;
    } else if (node.flag === 'Criminal') {
      return 'Criminal';
    } else if (node.flag === 'Official') {
      return 'Official';
    } else {
      return 'NaN';
    }
  };

  React.useEffect(() => {
    agent.blockchain
      .getChat(selectedNode.id)
      .then((res: any) => {
        if (res.data.status === 'success') {
          console.log(res.data);
          dispatch(setMessages(res.data.messages));
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [selectedNode]);

  function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
  }

  const indianNames = [
    'Aarav',
    'Aditi',
    'Arjun',
    'Ananya',
    'Dhruv',
    'Ishaan',
    'Kavya',
    'Neha',
    'Rohan',
    'Saanvi',
    'Vivek',
    'Priya',
  ];

  const generateRandomInfo = () => {
    function generateRandomPhoneNumber() {
      let phoneNumber = '9'; // Most Indian mobile numbers start with 9
      for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
      }
      return phoneNumber;
    }

    const randomName =
      indianNames[Math.floor(Math.random() * indianNames.length)];

    const randomPhoneNumber = generateRandomPhoneNumber();

    return { name: randomName, phone: randomPhoneNumber };
  };

  if (selectedNode && Object.keys(selectedNode).length !== 0)
    return (
      <>
        <div className="node-info-container">
          <div className="node-info">
            <div className="node-info__header">
              <h2>Node Information</h2>
              {!isMoreInfo ? (
                <Link to={`/node/${selectedNode.id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_2_1910)">
                      <path
                        d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_1910">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              ) : null}
            </div>
            <div className="flex-wrapper">
              <div className="single-chart">
                <svg
                  viewBox="0 0 36 36"
                  className={`circular-chart ${colorHandler(selectedNode)}`}
                >
                  <path
                    className="circle-bg"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    stroke-dasharray={`${percentageHandler(selectedNode)}, 100`}
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    {scoreHandler(selectedNode)}
                  </text>
                  <text x="18" y="25" className="bottom-text">
                    Score
                  </text>
                </svg>
              </div>
            </div>
            <div className="node-info__info">
              <div className="node-info__info-header">
                <h5>Information</h5>
              </div>
              <div className="node-info__info-container">
                <span>Wallet ID: {selectedNode.id}</span>
              </div>
            </div>
            <div className="node-info__info">
              <div className="node-info__info-header">
                <h5>Tagged Information</h5>
              </div>
              <div className="node-info__info-container">
                <span>IP Address: {generateRandomIP()}</span>
              </div>
            </div>
            <div className="node-info__info">
              <div className="node-info__info-header">
                <h5>Personal</h5>
                <h5>Accuracy: 86%</h5>
              </div>
              <div className="node-info__info-container">
                <span>Aadhar: 3977 8800 0234</span>
                <span>Name: {generateRandomInfo().name}</span>
                <span>Phone: {generateRandomInfo().phone}</span>
              </div>
            </div>
            <div className="node-info__info">
              <div className="node-info__info-header">
                <h5>
                  Money (BTC)
                  <span className="increase-percentage"> +55%</span>
                </h5>
              </div>
              <div className="node-info__wallet-icon__container">
                <div className="node-info__wallet-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      d="M4.44668 4.81816H18.5092C18.6734 4.81809 18.8375 4.82851 19.0005 4.84937C18.9453 4.46167 18.8121 4.08917 18.609 3.75433C18.4059 3.41949 18.1371 3.12925 17.8188 2.9011C17.5006 2.67294 17.1394 2.51161 16.757 2.42683C16.3747 2.34204 15.9792 2.33556 15.5943 2.40776L4.0292 4.38223H4.01602C3.29007 4.52105 2.64451 4.93178 2.21118 5.53052C2.86403 5.06616 3.64553 4.81713 4.44668 4.81816Z"
                      fill="white"
                    />
                    <path
                      d="M18.5093 5.87488H4.44678C3.70111 5.87569 2.98621 6.17227 2.45894 6.69954C1.93167 7.22681 1.63509 7.94171 1.63428 8.68738V17.1249C1.63509 17.8705 1.93167 18.5854 2.45894 19.1127C2.98621 19.64 3.70111 19.9366 4.44678 19.9374H18.5093C19.2549 19.9366 19.9698 19.64 20.4971 19.1127C21.0244 18.5854 21.321 17.8705 21.3218 17.1249V8.68738C21.321 7.94171 21.0244 7.22681 20.4971 6.69954C19.9698 6.17227 19.2549 5.87569 18.5093 5.87488ZM16.4219 14.3124C16.1437 14.3124 15.8719 14.2299 15.6406 14.0754C15.4093 13.9209 15.2291 13.7012 15.1227 13.4443C15.0162 13.1873 14.9884 12.9046 15.0426 12.6318C15.0969 12.359 15.2308 12.1084 15.4275 11.9118C15.6242 11.7151 15.8747 11.5812 16.1475 11.5269C16.4203 11.4726 16.7031 11.5005 16.96 11.6069C17.217 11.7134 17.4366 11.8936 17.5911 12.1249C17.7456 12.3561 17.8281 12.628 17.8281 12.9061C17.8281 13.2791 17.68 13.6368 17.4162 13.9005C17.1525 14.1642 16.7948 14.3124 16.4219 14.3124Z"
                      fill="white"
                    />
                    <path
                      d="M1.65625 11.6514V7.27881C1.65625 6.32651 2.18359 4.72998 4.01392 4.38413C5.56738 4.09277 7.10547 4.09277 7.10547 4.09277C7.10547 4.09277 8.11621 4.7959 7.28125 4.7959C6.44629 4.7959 6.46826 5.87256 7.28125 5.87256C8.09424 5.87256 7.28125 6.90527 7.28125 6.90527L4.00732 10.6187L1.65625 11.6514Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              <div className="node-info__info-container">
                <span className="btc-value">{selectedNode.amount}</span>
              </div>
            </div>
            <div className="node-info__buttons">
              <button className="buttons__red">Mark Criminal</button>
              <button className="buttons__orange">Mark Suspicious</button>
            </div>
            {isMoreInfo ? (
              <button
                className="node-info__chat-btn"
                onClick={() => {
                  console.log('clicked');
                  dispatch(setOverlay(true));
                }}
              >
                Block Bot
              </button>
            ) : null}
          </div>
        </div>
      </>
    );
};

export default NodeInformation;
