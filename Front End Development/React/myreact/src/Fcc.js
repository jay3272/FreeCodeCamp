import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
        <div>
          <p>Hello, <strong>{this.props.name}</strong>!</p>
        </div>
    );
  }
};

function Fcc() {
  return (
    <div>
      <Welcome name="Jessica"/>
    </div>
  );
}

export default Fcc;
