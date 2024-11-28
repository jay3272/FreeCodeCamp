import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
return (
      <div>
       <h1>Hello React!</h1>
      </div>
    );
  }
};

function Fcc() {
  return (
    <div>
      {/* 渲染 MyComponent */}
      <MyComponent />
    </div>
  );
}

export default Fcc;
