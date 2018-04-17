import React, { PureComponent } from 'react';

class Calculator extends PureComponent {
  constructor(props) { // you can pass props as an argument in the constructor
    super(props)       // you need to pass and receive it in the super as well
    this.state = { a: 0, b: 0 }
    this._updateA = this._updateA.bind(this); // to find the connection
    this._updateB = this._updateB.bind(this); // we need to bind it because we change it
    // any time you change the value of it, like in the input, you need to bind it
  }

  _updateA(event) {
    console.log(event.target.value);
    const a = parseFloat(event.target.value) || 0; // parseFloat to convert it to a number
    this.setState({ a })    //it is equivalent to ==> { a: a }
  }

  _updateB(event) {
    const b = parseFloat(event.target.value) || 0; // parseFloat to convert it to a number
    this.setState({ b })    //it is equivalent to ==> { b: b }

  }

  render() {
    // const a = this.state.a
    // const b = this.state.b
    const { a, b } = this.state;  // similar to the above
    return (
      <div>
        <h1>Calculator</h1>
        <input type="number" value={this.state.a} onChange={this._updateA} />
        <input type="number" value={this.state.b} onChange={this._updateB} />

        <h2>Results</h2>
        <p>{a} + {b} = {a + b} </p>
        <p>{a} - {b} = {a - b} </p>
        <p>{a} * {b} = {a * b} </p>
        <p>{a} / {b} = {a / b} </p>
      </div>
    );
  }
}

export default Calculator;