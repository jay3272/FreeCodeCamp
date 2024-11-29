import React from 'react';

class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // 修改這行下面的代碼
    if (this.state.input.length > 15) {
      inputStyle = {
        border: '3px solid red'
      };
    }
    // 修改這行上面的代碼
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};


function Fcc() {
  return (
    <div>
      <GateKeeper />
    </div>
  );
}

export default Fcc;
