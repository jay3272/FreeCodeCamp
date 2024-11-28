import React from 'react';
import PropTypes from 'prop-types';

class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName : "Jay"
    }
  }
  render() {
    const firstName = this.state.firstName;
    return (
      <div>
        <h1>{firstName}</h1>
      </div>
    );
  }
};

function Fcc() {
  return (
    <div>
      <StatefulComponent />
    </div>
  );
}

export default Fcc;
