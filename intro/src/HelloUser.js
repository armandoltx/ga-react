import React, { PureComponent } from 'react';

class HelloUser extends PureComponent {
  render() {
    return (<h2>Hello {this.props.name || "User"}</h2>) // interpolation is important to get vars ==> {}
  }
}

export default HelloUser;