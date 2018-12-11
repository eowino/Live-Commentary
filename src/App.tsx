import React, { Component } from 'react';
import { Commentaries } from './components/Commentary';
import commentaries from './api/commentaries';

class App extends Component {
  render() {
    return (
      <div className="wrapper pd-t-20">
        <Commentaries commentaries={commentaries} />
      </div>
    );
  }
}

export default App;
