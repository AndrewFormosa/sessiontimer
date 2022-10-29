import logo from './logo.svg';
import silver from './silver.jpg';
import './App.scss';
import React from 'react';
import materialIcon from 'material-icons';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0 };

  }
  render() {
    return (
      <div class="session-timer">
        <div class="title-text"> Session Timer 1000<div class="circ"></div></div>

        <image src="./silver.jpg"></image>
        <div class="main-display">
          <div class="session-display">
            session
          </div>
          <div class="timer-display">
            25:00
          </div>
        </div>
        <button class="start">start</button>
        <button class="reset">reset</button>
        <div class="controls">
          <div class="session-controls">
            session minutes
            <button class="control-button"><span class="material-symbols-outlined">
arrow_drop_up
</span></button>
            <div class="variable-display">25</div>
            <button class="control-button"><span class="material-symbols-outlined">
arrow_drop_down
</span></button>
          </div>
          <div class="break-controls">
            <button>bq</button>
            <div class="variable-display">25</div>
            <button>b1</button>
          </div>
        </div>

        <div class="circ"></div>
      </div>
    );
  }



}







function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timer />
      </header>
    </div>
  );
}

export default App;
