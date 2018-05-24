import React from 'react';
import { render } from 'react-dom';

const Settings = (props) => {
  return (
    <div id="settings">
      <div id="info"><i onClick={props.clickHandler} className="fas fa-info-circle"></i></div>
    </div>
  );
};

export default Settings;
