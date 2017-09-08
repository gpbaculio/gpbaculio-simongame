import 'babel-polyfill'
import React, { Component } 
  from 'react';

class App extends Component {

  state = {
    power : false,
    strict : false,
    running : false,
    memoryArray : [],
    memoryArrayCounter : 0,
    userArray : [],
    userArrayCounter : 0,
    levelCount : 1,
    tempColor:'',
    runMemory:'',
    matchingArrays:true,
    tempo:''
  }

  componentDidMount() {
    var colors = ['red','green','yellow','blue'],
          tone1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
          tone2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
          tone3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
          tone4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
          buzz  = new Audio('./errorbuzz.mp3'),
          trumpet = new Audio('./successtrumpet.mp3');

  }
  
  render() {

    let { answer, history, warning } = this.state;

    return (<div><span className="title"> Reactjs Calculator </span>
            <div className="container">
            <div className="color-container">
              <div className="inline" id="green"></div>
              <div className="inline" id="red"></div>
              <div className="inline" id="yellow"></div>
              <div className="inline" id="blue"></div>
            </div>
            <button>start </button>
            <button style={this.state.strict ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'white', color: 'black' }}> strict </button>
            <button style={this.state.power ? { backgroundColor: 'green', color: 'white' } : { backgroundColor: 'white', color: 'black' }}>{this.state.power ? 'off' : 'on'}</button>
            <span> count:  {this.state.levelCount} </span>
            <div> 
              <div style={{marginTop: '40px'}}>
                  <span style={{float: 'left'}}> Deployed Heroku App: <a href="https://gpbaculio-twitchtv-api.herokuapp.com/" target="_blank" > link </a> </span>
                  <span style={{float: 'right'}}> Github Repo: <a href="https://github.com/iamglenbacs/gpbaculio-twitchtv-api" target="_blank" > link </a> </span>
              </div>
            </div>  
        </div>
        <span className="footer"> Developed by Glendon Philipp Baculio </span>
    </div>);
  }
}

export default App;
