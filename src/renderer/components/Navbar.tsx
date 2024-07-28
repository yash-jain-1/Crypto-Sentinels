import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Navbar.css';

const Navbar = () => {
  const [tab, setTab] = React.useState('networks');

  const networksIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_2_2090)">
        <path
          d="M8.16289 3.46748C8.11927 3.42575 8.06124 3.40247 8.00088 3.40247C7.94052 3.40247 7.88248 3.42575 7.83887 3.46748L2.44531 8.61992C2.42241 8.64183 2.40418 8.66816 2.39175 8.69731C2.37931 8.72647 2.37291 8.75785 2.37295 8.78955L2.37207 13.6253C2.37207 13.8739 2.47084 14.1124 2.64666 14.2882C2.82247 14.464 3.06093 14.5628 3.30957 14.5628H6.125C6.24932 14.5628 6.36855 14.5134 6.45645 14.4255C6.54436 14.3376 6.59375 14.2184 6.59375 14.094V10.1097C6.59375 10.0475 6.61844 9.98789 6.6624 9.94393C6.70635 9.89998 6.76596 9.87529 6.82812 9.87529H9.17187C9.23403 9.87529 9.29365 9.89998 9.3376 9.94393C9.38155 9.98789 9.40625 10.0475 9.40625 10.1097V14.094C9.40625 14.2184 9.45563 14.3376 9.54354 14.4255C9.63145 14.5134 9.75068 14.5628 9.875 14.5628H12.6893C12.9379 14.5628 13.1764 14.464 13.3522 14.2882C13.528 14.1124 13.6268 13.8739 13.6268 13.6253V8.78955C13.6268 8.75785 13.6204 8.72647 13.608 8.69731C13.5955 8.66816 13.5773 8.64183 13.5544 8.61992L8.16289 3.46748Z"
          fill="white"
        />
        <path
          d="M14.8825 7.65369L12.6911 5.5572V2.37585C12.6911 2.25153 12.6417 2.13231 12.5538 2.0444C12.4659 1.95649 12.3467 1.9071 12.2223 1.9071H10.8161C10.6918 1.9071 10.5725 1.95649 10.4846 2.0444C10.3967 2.13231 10.3473 2.25153 10.3473 2.37585V3.31335L8.65047 1.69089C8.49168 1.53035 8.25555 1.43835 8.00037 1.43835C7.74608 1.43835 7.51053 1.53035 7.35174 1.69119L1.1203 7.6531C0.938073 7.82888 0.915221 8.11804 1.08104 8.30847C1.12268 8.35654 1.17367 8.39563 1.23089 8.42337C1.28812 8.4511 1.3504 8.46691 1.41392 8.46981C1.47745 8.47272 1.54091 8.46266 1.60043 8.44026C1.65995 8.41787 1.71429 8.38359 1.76014 8.33953L7.83924 2.53054C7.88286 2.48882 7.94089 2.46553 8.00125 2.46553C8.06161 2.46553 8.11965 2.48882 8.16327 2.53054L14.2429 8.33953C14.3325 8.42541 14.4525 8.47228 14.5765 8.46986C14.7006 8.46745 14.8186 8.41594 14.9048 8.32663C15.0846 8.14031 15.0697 7.83269 14.8825 7.65369Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_2090">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  const crawlerIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_2_2085)">
        <path
          d="M3.5469 15.0316H2.60941C2.42292 15.0316 2.24408 14.9575 2.11222 14.8257C1.98036 14.6938 1.90628 14.515 1.90628 14.3285V10.1097C1.90628 9.92326 1.98036 9.74442 2.11222 9.61256C2.24408 9.4807 2.42292 9.40662 2.60941 9.40662H3.5469C3.73339 9.40662 3.91223 9.4807 4.04409 9.61256C4.17595 9.74442 4.25003 9.92326 4.25003 10.1097V14.3285C4.25003 14.515 4.17595 14.6938 4.04409 14.8257C3.91223 14.9575 3.73339 15.0316 3.5469 15.0316V15.0316Z"
          fill="white"
        />
        <path
          d="M10.1095 15.0308H9.17197C8.98549 15.0308 8.80664 14.9567 8.67478 14.8249C8.54292 14.693 8.46884 14.5142 8.46884 14.3277V7.29645C8.46884 7.10997 8.54292 6.93112 8.67478 6.79926C8.80664 6.6674 8.98549 6.59332 9.17197 6.59332H10.1095C10.2959 6.59332 10.4748 6.6674 10.6066 6.79926C10.7385 6.93112 10.8126 7.10997 10.8126 7.29645V14.3277C10.8126 14.5142 10.7385 14.693 10.6066 14.8249C10.4748 14.9567 10.2959 15.0308 10.1095 15.0308V15.0308Z"
          fill="white"
        />
        <path
          d="M13.3907 15.0311H12.4532C12.2667 15.0311 12.0879 14.957 11.956 14.8252C11.8242 14.6933 11.7501 14.5145 11.7501 14.328V4.0155C11.7501 3.82902 11.8242 3.65018 11.956 3.51832C12.0879 3.38646 12.2667 3.31238 12.4532 3.31238H13.3907C13.5772 3.31238 13.756 3.38646 13.8879 3.51832C14.0198 3.65018 14.0938 3.82902 14.0938 4.0155V14.328C14.0938 14.5145 14.0198 14.6933 13.8879 14.8252C13.756 14.957 13.5772 15.0311 13.3907 15.0311V15.0311Z"
          fill="white"
        />
        <path
          d="M6.82822 15.031H5.89072C5.70424 15.031 5.52539 14.9569 5.39353 14.8251C5.26167 14.6932 5.18759 14.5144 5.18759 14.3279V1.67163C5.18759 1.48515 5.26167 1.30631 5.39353 1.17445C5.52539 1.04258 5.70424 0.968506 5.89072 0.968506H6.82822C7.0147 0.968506 7.19354 1.04258 7.3254 1.17445C7.45726 1.30631 7.53134 1.48515 7.53134 1.67163V14.3279C7.53134 14.5144 7.45726 14.6932 7.3254 14.8251C7.19354 14.9569 7.0147 15.031 6.82822 15.031V15.031Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_2085">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.500092 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="navbar-container">
      <div className="navbar">
        <h1 className="navbar__header">Crypto Sentinel</h1>
        <div className="navbar__button-container">
          <Link
            className={`navbar__button ${
              tab === 'networks' ? 'navbar__button__selected' : null
            }`}
            onClick={() => {
              setTab('networks');
            }}
            to={'/'}
          >
            <span className="navbar__button-icon">{networksIcon}</span>
            <span className="navbar__button-text">Networks</span>
          </Link>
          <Link
            className={`navbar__button ${
              tab === 'crawler' ? 'navbar__button__selected' : null
            }`}
            onClick={() => {
              setTab('crawler');
            }}
            to={'/crawler'}
          >
            <span className="navbar__button-icon">{crawlerIcon}</span>
            <span className="navbar__button-text">Crawler</span>
          </Link>
          <Link
            className={`navbar__button ${
              tab === 'relays' ? 'navbar__button__selected' : null
            }`}
            onClick={() => {
              setTab('relays');
            }}
            to={'/relays'}
          >
            <span className="navbar__button-icon">{networksIcon}</span>
            <span className="navbar__button-text">Relays</span>
          </Link>
          <Link
            className={`navbar__button ${
              tab === 'watchlist' ? 'navbar__button__selected' : null
            }`}
            onClick={() => {
              setTab('watchlist');
            }}
            to={'/watchlist'}
          >
            <span className="navbar__button-icon">{networksIcon}</span>
            <span className="navbar__button-text">Watchlist</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
