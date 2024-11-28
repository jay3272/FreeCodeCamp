import React from 'react';
import PropTypes from 'prop-types';

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({
      inputValue: event.target.value
    })
  }
  
  render() {
    return (
      <div>
        <GetInput input={this.state.inputValue}
        handleChange={this.handleChange} />
        <RenderInput
        input={this.state.inputValue} />
      </div>
    );
  }
};

class GetInput extends React.Component{
  constructor(props){
    super(props);
  }
render(){
  return(
    <div>
      <h3>Get Input:</h3>
      <input 
        value={this.props.input}
        onChange={this.props.handleChange}/>
    </div>
  )
}
}

class RenderInput extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <h3>Input Render:</h3>
        <p>{this.props.input}</p>
      </div>
    )
  }
}

function Fcc() {
  return (
    <div>
      <MyApp />
    </div>
  );
}

export default Fcc;
