import React from 'react';

const PopOver = ({ title, description, Content }) => {
  return (
    <div className="pop-over">
      <div className="close-btn"><img src="/img/cross.svg" alt="X" /></div>
      {!!title && <div className="title">{title}</div>}
      {!!description && <div className="description">{description}</div>}
    </div>
  );
};

export default PopOver;
