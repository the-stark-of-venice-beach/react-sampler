import React from 'react';
import { render } from 'react-dom';

import Library from './library.jsx';
import Visualizer from './visualizer.jsx';

const VizLib = (props) => {

    return (
      <div id='vizlib'>
        <Library audioFiles={props.audioFiles} addSample={props.addSample} mapSample={props.mapSample}/>
        <Visualizer />
      </div>
    )
}

export default VizLib;