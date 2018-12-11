import React, { Component } from 'react';
import { Commentaries, ICommentary } from './components/Commentary';
import { KeyMoments, IKeyMoment } from './components/KeyMoments';
import commentaries from './api/commentaries';

class App extends Component {
  selectKeyMoments(commentaries: ICommentary[]): IKeyMoment[] {
    return commentaries
      .filter(commentary => Boolean(commentary.highlight))
      .map(commentary => ({
        time: commentary.time,
        name: commentary.highlight || '',
        id: commentary.id,
      }));
  }

  render() {
    return (
      <div className="wrapper pd-t-20">
        <Commentaries commentaries={commentaries} />
        <KeyMoments keyMoments={this.selectKeyMoments(commentaries)} />
      </div>
    );
  }
}

export default App;
