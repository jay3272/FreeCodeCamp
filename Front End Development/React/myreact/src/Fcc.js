import React from 'react';
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  console.log('Component being mounted');
  }
  render() {
    return <div />
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
