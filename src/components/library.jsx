import React from 'react';
import { render } from 'react-dom';

const Library = props => {

    let array = props.audioFiles;
    const samples = [];
    for (let i = 0; i < array.length; i++) {
        samples.push(<div key={i} data-source={array[i].source} className={i % 2 === 0 ? 'grey' : 'blue'} onClick={props.mapSample}>{array[i].name.replace(/(^samples\/)|(\..+$)/g,'')}</div>);
    }

    return (
      
      <div id="library">
      <h4>Samples</h4>
        <div id="samples">
            {samples}
        </div>
        <button id="loop" onClick={props.mapSample}>Loop</button>
        <form>
          <input type="file" onChange={props.addSample} multiple/>
        </form>
      </div>
    )
  
}

export default Library;