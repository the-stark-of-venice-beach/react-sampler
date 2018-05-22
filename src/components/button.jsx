import React from 'react';
import { render } from 'react-dom';

const Button = props => {
    return (
      <div data-key={props.keyCodes[props.id]} onClick={props.clickHandler} id={props.id} className="button">
         <kbd className="character">{props.keySymbols[props.id]}<br/><br/><b>{props.audioFiles[props.id].name}</b></kbd>
         <audio data-key={props.keyCodes[props.id]} src={props.audioFiles[props.id].source}></audio>
      </div>
    )
  }


export default Button;