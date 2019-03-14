import React from 'react';

const PopOver = ({ title, onClose }) => {
  return (
    <div className="pop-over">
      <div className="pop-over-inner">
        <div className="close-btn" onClick={onClose}>
          <img src="/img/cross.svg" alt="X" />
        </div>
        {!!title && <div className="title">{title}</div>}
      </div>
    </div>
  );
};

export default PopOver;
