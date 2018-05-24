import React from 'react';
import { render } from 'react-dom';
import axios from "axios";

import Board from './components/Board.jsx';
import VizLib from './components/Vizlib.jsx';
import Settings from './components/Settings.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyCodes: [49, 50, 51, 52, 81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86],
      keySymbols: [1, 2, 3, 4, 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'],
      audioFiles: [
        {
          name: 'clap',
          source: 'samples/ clap.WAV',
        },
        {
          name: 'closed-hat',
          source: 'samples/ closed-hat.WAV',
        },
        {
          name: 'cowbell',
          source: 'samples/ cowbell.WAV',
        },
        {
          name: 'cymbal',
          source: 'samples/ cymbal.WAV',
        },
        {
          name: 'high tom',
          source: 'samples/ high tom.WAV',
        },
        {
          name: 'kick drum',
          source: 'samples/ kick drum.WAV',
        },
        {
          name: 'mid tom',
          source: 'samples/ mid tom.WAV',
        },
        {
          name: 'open-hat',
          source: 'samples/ open-hat.WAV',
        },
        {
          name: 'snare',
          source: 'samples/ snare.WAV',
        },
        {
          name: '808 loop',
          source: 'samples/808 loop.WAV',
        },
        {
          name: 'bass stab',
          source: 'samples/bass stab.WAV',
        },
        {
          name: 'blip',
          source: 'samples/blip.WAV',
        },
        {
          name: 'bongo',
          source: 'samples/bongo.WAV',
        },
        {
          name: 'haht',
          source: 'samples/haht.WAV',
        },
        {
          name: 'house loop',
          source: 'samples/house loop.WAV',
        },
        {
          name: 'nomsayn',
          source: 'samples/nomsayn.WAV',
        },
      ],
      mapText: '',
      mapMode: false,
      loopMode: false,
      user_id: this.props.user_id,
      username: this.props.username

    };
    this.clickHandler = this.clickHandler.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    this.addSample = this.addSample.bind(this);
    this.mapSample = this.mapSample.bind(this);
    this.pausePlay = this.pausePlay.bind(this);

    this.padinfo = this.padinfo.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
  }


  componentDidMount() {

    console.log('this.state.user_id: ', this.state.user_id);


    axios
      .post("/get_config", {
        user_id: this.state.user_id
      })
      .then(res => {
        // console.log("in componentDidMount... res.data: ", res.data);
        // we need to parse the array and remap <audio> src
        const x = document.querySelectorAll('audio');
        let sources = JSON.parse(res.data.keymap);
        for(let i=0; i<x.length; i++){
          x[i].src=sources[i];
          // console.log("changing element : ", x[i]);
          // console.log("to source : ", x[i].src);
        }

      });
  }


  mapSample(e) {
    if (e.target.id === 'loop') {
      this.state.loopMode = true;
      return;
    }
    this.state.mapText = e.target.dataset.source;

    this.state.mapMode = true;
    let buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].style.background = 'linear-gradient(to top, rgb(149, 104, 255), rgb(132, 0, 255))';
    }
    document.getElementById('map-mode').style.visibility = 'visible';
  }

  padinfo() {

    let items = document.getElementsByClassName('character');
    for (let i = 0; i < items.length; i++) {
      if (items[i].style.visibility === "visible") items[i].style.visibility = "hidden";
      else items[i].style.visibility = "visible";
    }
  }

  clickHandler(e) {
    const code = e.target.dataset.key || e.keyCode; //set the code to either the click target or if undefined the keyboard key
    let id = e.target.id;
    const key = document.querySelector(`div[data-key='${code}']`);
    const audio = document.querySelector(`audio[data-key='${code}']`);
    if (this.state.mapMode) {
      audio.src = this.state.mapText;
      const buttons = document.getElementsByClassName('button');
      for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].style.background = 'linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))';
      }
      document.getElementById('map-mode').style.visibility = 'hidden';
    } else if (this.state.loopMode) {
      if (audio.loop === true) {
        audio.loop = false
        key.style.background = 'linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))';
      } else {
        audio.loop = true;
        key.style.background = 'rgba(255, 165, 0, 1)';
      }
      this.state.loopMode = false;
      return;
    } else {
      if (!audio) return;
      if (e.keyCode) {
        key.style.background = 'rgba(255, 165, 0, 1)';
        setTimeout(() => {
          key.style.background = 'linear-gradient(to top, rgb(255, 253, 131), rgb(255, 230, 0))';
        }, 100);
      }
      key.classList.add('playing');
      audio.currentTime = 0;
      audio.play();
    }
    this.state.mapMode = false;
  }

  addSample(e) {
    let samples = [].concat(this.state.audioFiles);
    for (let i = 0; i < e.target.files.length; i += 1) {
      let sampleURL = window.URL.createObjectURL(e.target.files[i]);
      samples.push({ name: e.target.files[i].name.replace(/(^samples\/)|(\..+$)/g, ''), source: sampleURL });
      this.setState({ audioFiles: samples });
    }
  }

  removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  pausePlay() {
    let x = document.querySelectorAll("audio");
    x.forEach((ele) => {
      ele.pause();
    });
  }

  saveConfig() {
    const x = document.querySelectorAll('audio');
    const sources = [];
    x.forEach((audio) => {
      sources.push(audio.src);
    });
    axios
      .post('/config', {
        user_id: this.state.user_id,
        keymap: JSON.stringify(sources),
      })
      .then((res) => {
        console.log('res.data: ', res.data);
        if (res.data === 'ok') {
          alert('Saved config');
        }
      });
  }

  render() {
    window.addEventListener('keydown', this.clickHandler);

    return (
      <div>
        <div id='map-mode'>
          Map Mode
        </div>

        <Board keyCodes={this.state.keyCodes} keySymbols={this.state.keySymbols} clickHandler={this.clickHandler} removeTransition={this.removeTransition} audioFiles={this.state.audioFiles} pausePlay={this.pausePlay} />
        <VizLib audioFiles={this.state.audioFiles} addSample={this.addSample} mapSample={this.mapSample} saveConfig={this.saveConfig} />
        <Settings clickHandler={this.padinfo}/>
      </div>
    );
  }
}

export default App;
