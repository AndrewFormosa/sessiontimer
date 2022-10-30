import logo from './logo.svg';
import silver from './silver.jpg';
import './App.scss';
import React from 'react';
import materialIcon from 'material-icons';
import beep from './mixkit-alarm-clock-beep-988.wav';

const initialSession = 25;
const initialBreak = 5;
const greenCol = "#00ff00";
const redCol = "#ff0000"

class Controlls extends React.Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.upDateValue = this.upDateValue.bind(this);
  }

  increment() {
    if ((this.props.value() < 60) && (!this.props.running())) {
      this.upDateValue(this.props.value() + 1);

    }
  }
  decrement() {
    if ((this.props.value() > 1) && (!this.props.running())) {
      this.upDateValue(this.props.value() - 1);
    }
  }

  upDateValue(newValue) {
    this.props.callBack(newValue)
  }



  render() {
    return (<div class="session-controls">
      <div id={this.props.labId} class="lable-text">{this.props.title}<br />  {this.props.running}mins</div>


      <button onClick={this.increment} id={this.props.incButtId} class="control-button"><span class="material-symbols-outlined">
        arrow_drop_up
      </span></button>
      <div id={this.props.dispId} class="variable-display">{this.props.value()}</div>
      <button onClick={this.decrement} id={this.props.decButtId} class="control-button"><span class="material-symbols-outlined">
        arrow_drop_down
      </span></button>
    </div>);
  }
}



class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: initialSession,
      breakLength: initialBreak,
      countdown: initialSession*60,
      activePeriod:"session",
      sessionActive: true,
      breakActive: false,
      running: false,
      startStopText: "start",
      buttonColor: greenCol,
      countdownColor:greenCol,
    };
    this.changeSession = this.changeSession.bind(this);
    this.changeBreak = this.changeBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.GetRunning = this.GetRunning.bind(this);
    this.GetSessionLength = this.GetSessionLength.bind(this);
    this.GetBreakLength = this.GetBreakLength.bind(this);
    this.startStop = this.startStop.bind(this);
    this.ChangePeriodType=this.ChangePeriodType.bind(this);
    this.beep=this.beep.bind(this);
    this.stopBeep=this.stopBeep.bind(this);


  }
  //manage ticking time( code below) 
  tick() {

    if (this.state.running) {
    
      let currentTime = this.state.countdown;
      if(currentTime<10){
        this.setState({countdownColor:redCol})
      }
      if (currentTime < 1) {
        //this.beep();
        this.ChangePeriodType();
      } else {
        this.setState({ countdown: currentTime - 1 });
        if(currentTime==1){
          this.beep();
        }
      }

    }
  }
  beep(){
    let audioElement=document.getElementById("beep");
    //audioElement.volume=1.0;
    audioElement.currentTime=0;
    audioElement.play();
  }

  stopBeep(){
    let audioElement=document.getElementById("beep");
    audioElement.currentTime=0;
    audioElement.pause();
  }

  ChangePeriodType(){
    if(this.state.sessionActive){
      this.setState({
        sessionActive:false,
        activePeriod:"break",
        breakActive:true,
        countdown:this.state.breakLength*60,
        countdownColor:greenCol,
      })
    }else{
      this.setState({
        sessionActive:true,
        activePeriod:"session",
        breakActive:false,
        countdown:this.state.sessionLength*60,
        countdownColor:greenCol,
      })
    }

  }


    componentDidMount() {
      this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }
    //manage ticking time (code above)





    changeSession(value){
      this.setState({ sessionLength: value });
      if (this.state.sessionActive) {
        this.setState({ countdown: value * 60 });
      }
    }


    changeBreak(value){
      this.setState({ breakLength: value });
      if (this.state.breakActive) {
        this.setState({ countdown: value * 60 });
      }
    }

    startStop(){
      if (this.state.running) {
        this.setState({
          running: false,
          startStopText: "start",
          buttonColor: greenCol
        });
      } else {
        this.setState({
          running: true,
          startStopText: "stop",
          buttonColor: redCol
        });
      }
    }



    GetRunning = () => this.state.running;
    GetSessionLength = () => this.state.sessionLength;
    GetBreakLength = () => this.state.breakLength;


    reset(){
      this.stopBeep();
      this.setState({
        sessionLength: initialSession,
        breakLength: initialBreak,
        countdown: initialSession*60,
        activePeriod:"session",
        sessionActive: true,
        breakActive: false,
        running: false,
        startStopText: "start",
        buttonColor: greenCol,
        countdownColor:greenCol,
        
      })
    }


    clock = (seconds) => {
      let m2 = (Math.trunc(seconds / 600)).toString();
      let m1 = (Math.trunc(seconds / 60) - m2 * 10).toString();
      let s2 = (Math.trunc(seconds / 10) - (m2 * 10 * 6) - (m1 * 6)).toString();
      let s1 = (Math.trunc(seconds) - (m2 * 10 * 60) - (m1 * 60) - (s2 * 10)).toString();
      return m2 + m1 + ":" + s2 + s1;
    }


    render() {
      return (
        <div class="session-timer">
           <audio id="beep" src={beep}></audio>
          <div class="title-text"> Session Timer AF100<div class="circ"></div></div>

          <image src="./silver.jpg"></image>
          <div class="main-display">
            <div id="timer-label" class="session-display" style={{color:this.state.countdownColor}}>
              {this.state.activePeriod}
            </div>
            <div id="time-left" class="timer-display" style={{color:this.state.countdownColor}}>
              {this.clock(this.state.countdown)}
            </div>
          </div>
          <button id="start_stop" style={{ color: this.state.buttonColor }} onClick={this.startStop} class="start">{this.state.startStopText}</button>
          <button id="reset" onClick={this.reset} class="reset">reset</button>
          <div class="controls">
            <Controlls incButtId="session-increment" dispId="session-length" labId="session-label" decButtId="session-decrement" title="session time" value={() => this.GetSessionLength()} callBack={(x) => this.changeSession(x)} running={() => this.GetRunning()} />
            <Controlls incButtId="break-increment" dispId="break-length" labId="break-label" decButtId="break-decrement" title="break time" value={() => this.GetBreakLength()} callBack={(x) => this.changeBreak(x)} running={() => this.GetRunning()} />
          </div>
         <p class="my-footer">By A Formosa - a freeCodeCamp project</p>
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
