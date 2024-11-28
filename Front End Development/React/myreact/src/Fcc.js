import React from 'react';

const MyComponent = function() {  
 return(
    <div>Completed challenge!</div>
);
}

function Fcc() {
  return (
    <div>
      <h1>Welcome to the FCC Homepage!</h1>
      {/* 渲染 MyComponent */}
      <MyComponent />
    </div>
  );
}

export default Fcc;
