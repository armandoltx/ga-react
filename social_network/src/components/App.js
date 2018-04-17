import React, { Component } from 'react';
import Profile from "./Profile";

class App extends Component {
  render() {
    return (
      <div className="App">
       <Profile name="Groucho" age="101" bio="More gods more masters" pic="http://fillmurray.com/400/400" />
        <Profile name="Harpo" age="99" bio="No gods no masters" pic="http://fillmurray.com/399/401" />
        <Profile name="Chico" age="85" bio="What ever" pic="http://fillmurray.com/400/400" />        
      </div>
    );
  }
}

export default App;
