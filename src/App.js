import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <div class="session-timer">
          Session Timer
          
          <div class="timer-display">25:00</div>
          <div class="timer-display">25 00</div>
          <div class="circ"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
