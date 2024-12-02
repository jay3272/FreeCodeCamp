import React from 'react';
import { createStore } from 'redux';

const reducer = (state = 5) => {
  return state;
}

// Define an action here:
let action={
  type: 'LOGIN'
}

// 可從 Redux 對象獲得 Redux 方法
// 例如：Redux.createStore()
// 在這裏定義 store here：
const store = createStore(reducer);
let currentState = store.getState();

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reduxState: currentState,
    };
    this.unsubscribe = store.subscribe(() => {
      this.setState({ reduxState: store.getState() });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {    
     return (
      <div>
        <h1>Redux State：{this.state.reduxState}</h1>
      </div>
    );
  }
}

function Fcc() {
  return (
    <div>
      <MyComponent />
    </div>
  );
}

export default Fcc;
