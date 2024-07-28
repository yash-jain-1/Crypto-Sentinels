import React from 'react';

const PathInfo = ({ path, h4 }: any) => {
  return (
    <div className="node__container">
      <div className="node__top-header">
        <div className="node__top-header-left">
          <span>Pages </span> {path}
          <h4>{h4}</h4>
        </div>
      </div>
    </div>
  );
};

export default PathInfo;
