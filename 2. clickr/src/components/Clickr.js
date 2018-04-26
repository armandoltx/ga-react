import React, { PureComponent } from 'react';

class clickr extends PureComponent {

  constructor() {
    super(); // calls the original version of constructor() defined in PureComponent
    console.log("constructor working");
    this.state = { clicks: 0 };
    this._incrementClicks = this._incrementClicks.bind(this) // Preserve connection to original object
  } 

  _incrementClicks() { // we put "_" because it is an even handler
    console.log('there was a click');
    console.log(this);
    this.setState( { clicks: this.state.clicks + 1 } )
    
  }

  render () {
    return (<button onClick={ this._incrementClicks }>{ this.state.clicks } clicks so far</button>);
  }
}

export default clickr;
