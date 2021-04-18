import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.id = null;
    this.interval = 1000;
    this.state = { time: 0, slow: 0, showButtons: true };
  }

  updateTimer = () => {
    if (this.id) {
      clearInterval(this.id);
    }
    this.id = setInterval(() => {
      this.setState(
        { time: this.state.time + 1, slow: this.state.slow + 1 },
        () => {
          this.increaseInterval();
        }
      );
    }, this.interval);
  };

  increaseInterval = () => {
    if (this.state.slow === 10) {
      clearInterval(this.id);
      this.interval += 300;
      this.setState({ slow: 0 }, () => {
        this.updateTimer();
      });
    }
  };
  startTimer = () => {
    if (this.id) {
      return;
    }
    this.updateTimer();
  };
  resetTimer = () => {
    clearInterval(this.id);
    this.setState({ time: 0, slow: 0 });
    this.id = null;
    this.interval = 1000;
  };
  showButtons = () => {
    this.setState({ showButtons: true });
  };
  hideButtons = () => {
    this.setState({ showButtons: false });
  };
  render() {
    const { time, showButtons } = this.state;
    return (
      <div
        className="App"
        onMouseEnter={this.showButtons}
        onMouseLeave={this.hideButtons}
      >
        <header className="App-header">
          <p className="timer">{time}</p>
          <div className={`buttons ${showButtons ? "" : "hidden"}`}>
            <button className="button" onClick={this.startTimer}>
              Start
            </button>
            <button className="button" onClick={this.resetTimer}>
              Reset
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
