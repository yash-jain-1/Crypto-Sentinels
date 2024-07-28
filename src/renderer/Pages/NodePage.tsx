import React from 'react';
import NodeInformation from '../components/NodeInformation';
import agent from '../agent';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '../store/slices/common';

import './NodePage.css';

const NodePage = () => {
  const id: any = useParams().id;

  const transactions = useSelector(
    (state: any) => state.common.selected.transactions,
  );

  const selected = useSelector((state: any) => state.common.selected.nodeInfo);

  const dispatch = useDispatch();

  const rows: any = [];

  transactions.map((transaction: any) => {
    rows.push(
      <TransactionRows transaction={transaction} selected={selected} />,
    );
  });

  React.useEffect(() => {
    agent.blockchain
      .getNode(id)
      .then((res: any) => {
        dispatch(setTransactions(res.data.transactions));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NodeInformation isMoreInfo={true} />
      <div className="node__container">
        <div className="node__top-header">
          <div className="node__top-header-left">
            <span>Pages </span> / Node Information
            <h4>{selected.name}</h4>
          </div>
          <Link to={`/node/${id}/graph`} className="node__graph-button">
            Graph
          </Link>
        </div>
        <div className="node__links-container">
          <div className="node__links-header">
            <div className="node__links-header__left">
              <h5>Transactions</h5>
              <span className="node__detected-text">
                <span>Suspicious / Criminal</span> detected
              </span>
            </div>
            <div className="node__links-header__right">
              <button className="node__filters-button">Filters (0)</button>
              <div className="node__search-bar">
                <input type="text" placeholder="Find Transactions" />
              </div>
            </div>
          </div>
          {/* <div className="nano" id="sidebar"> */}
          <div className="node__links-table-container">
            <table className="node__links-table">
              <thead className="node__links-table-head">
                <tr>
                  <th scope="cols"></th>
                  <th scope="col">Wallet ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Flag</th>
                  <th scope="col">Recieved/Sent</th>
                  <th scope="col">Rating</th>
                </tr>
              </thead>
              <tbody className="node__links-table-body">{...rows}</tbody>
            </table>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const TransactionRows = ({ transaction, selected }: any) => {
  const [incoming, setIncoming] = React.useState(false);

  const flagColorHandler = (node: any): string => {
    if (node.flag === 'Normal') {
      if (node.rating >= 5.0) {
        return 'node__normal';
      } else {
        return 'node__suspicious';
      }
    } else if (node.flag === 'Criminal') {
      return 'node__criminal';
    } else if (node.flag === 'Official') {
      return 'node__official';
    } else {
      return '';
    }
  };

  const flagTextHandler = (node: any): string => {
    if (node.flag === 'Normal') {
      if (node.rating >= 5.0) {
        return 'Normal';
      } else {
        return 'Suspicious';
      }
    } else if (node.flag === 'Criminal') {
      return 'Criminal';
    } else if (node.flag === 'Official') {
      return 'Official';
    } else {
      return '';
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
    if (selected.id === transaction.target.id) {
      setIncoming(true);
    }
  }, []);

  if (incoming) {
    return (
      <>
        <tr>
          <td scope="row" data-label="">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17.5" cy="17.5" r="17" stroke="#E31A1A" />
              <circle cx="17.5" cy="17.5" r="17" stroke="#E31A1A" />
              <path
                d="M20.8749 17.7812L17.4999 21.1562L14.1249 17.7812"
                stroke="#E31A1A"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4996 20.6875L17.4996 13.8438"
                stroke="#E31A1A"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </td>
          <td scope="row" data-label="Wallet ID">
            {transaction.source.name}
          </td>
          <td data-label="Date">06/06/2003</td>
          <td data-label="Flag">
            <span
              className={`node__flag ${flagColorHandler(transaction.source)}`}
            >
              {flagTextHandler(transaction.source)}
            </span>
          </td>
          <td data-label="Recieved/Sent">
            BTC {parseFloat(transaction.amount).toFixed(2)}
          </td>
          <td data-label="Rating">{transaction.source.rating}</td>
        </tr>
      </>
    );
  } else {
    return (
      <>
        <tr>
          <td scope="row" data-label="">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17.5" cy="17.5" r="17" stroke="#01B574" />
              <path
                d="M14.125 17.2188L17.5 13.8438L20.875 17.2188"
                stroke="#01B574"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5002 14.3125L17.5002 21.1562"
                stroke="#01B574"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </td>
          <td scope="row" data-label="Wallet ID">
            {transaction.target.name}
          </td>
          <td data-label="Date">09/26/2023</td>
          <td data-label="Flag">
            <span
              className={`node__flag ${flagColorHandler(transaction.target)}`}
            >
              {flagTextHandler(transaction.target)}
            </span>
          </td>
          <td data-label="Recieved/Sent">
            BTC {parseFloat(transaction.amount).toFixed(8)}
          </td>
          <td data-label="Rating">{transaction.target.rating}</td>
        </tr>
      </>
    );
  }
};

export default NodePage;
