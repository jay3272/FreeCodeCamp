import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text : "Hello"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      text:'You clicked!'
    })
  }
  render() {
    const firstName = this.state.firstName;
    return (
      <div>
        <button onClick={this.handleClick}>Clich Me</button>
        <h1>{this.state.text}</h1>
      </div>
    );
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
