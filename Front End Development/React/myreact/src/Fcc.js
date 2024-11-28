import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleEnter = this.handleEnter.bind(this); 
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown",this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleEnter(){
    this.setState((state) =>({
      message: state.message + 'Yoou presses the enter key!'
    }))
  }

  handleKeyPress(event){
    if(event.keyCode === 13){
      this.handleEnter();
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    )
  }
};


function Fcc() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

export default Fcc;
