import React, { PureComponent } from 'react';

class HelloWorld extends PureComponent {
  //everycomponente must have a render() method which returns a single parent HTML element
  render() { // it is a function ==> render: function() {}
    return (<h1>Hello World!!!!!!!</h1>);
  }
}

export default HelloWorld;