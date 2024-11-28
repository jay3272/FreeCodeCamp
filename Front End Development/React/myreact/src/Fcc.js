import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name : "Initial State"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState({
      name:'React Rock!'
    })
  }
  render() {
    const firstName = this.state.firstName;
    return (
      <div>
        <button onClick={this.handleClick}>Clich Me</button>
        <h1>{this.state.name}</h1>
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
