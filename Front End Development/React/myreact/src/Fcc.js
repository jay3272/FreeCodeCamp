import React from 'react';
import PropTypes from 'prop-types';

class Colorful extends React.Component {
  render() {
    return (
      <div style={{color: "red", fontSize: 72}}>Big Red</div>
    )
  }
}

function Fcc() {
  return (
    <div>
      <Colorful />
    </div>
  );
}

export default Fcc;
