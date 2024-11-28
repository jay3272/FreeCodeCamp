import React from 'react';
import PropTypes from 'prop-types';

class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
    }
    shouldComponentUpdate(nextProps, nextState){
      console.log('Should I update?');
      if (nextProps.value % 2 == 0) {
        return true;
      }
      return false;
    }
    componentDidUpdate(){
      console.log('Component re-rendered.')
    }
  render() {
    return (
      <div>
        <h1>{this.props.value}</h1>
      </div>
    )
  }
};

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}

function Fcc() {
  return (
    <div>
      <Controller />
    </div>
  );
}

export default Fcc;
