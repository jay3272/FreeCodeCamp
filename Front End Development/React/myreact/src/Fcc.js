import React from 'react';
import PropTypes from 'prop-types';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'CamperBot'
    };
  }
  
  render() {
    return (
      <div>
        <Navbar name = {this.state.name}/>
      </div>
    );
  }
};

class Navbar extends React.Component{
  constructor(props){
    super(props)
  }
render() {
  return(
    <div>
      <h1>Hello, my name is: {this.props.name}</h1>
    </div>
  )
}}

function Fcc() {
  return (
    <div>
      <MyApp />
    </div>
  );
}

export default Fcc;
