import React, { PureComponent as Component } from 'react';
import { Link } from 'react-router-dom';

class FAQ extends Component {
  render() {
    return (
      <div>
        <h2>This is FAQ</h2>
        <Link to="/">Back home</Link>
      </div>
    )
  }
}

export default FAQ