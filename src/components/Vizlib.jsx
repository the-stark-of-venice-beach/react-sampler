import React from 'react';
import { render } from 'react-dom';

import Library from './Library.jsx';
import Visualizer from './Visualizer.jsx';

const VizLib = (props) => {
  return (
    <div id="vizlib">
      <Library audioFiles={props.audioFiles} addSample={props.addSample} mapSample={props.mapSample} saveConfig={props.saveConfig} />
      {/*<Visualizer />*/}
    </div>
  )
}

export default VizLib;
