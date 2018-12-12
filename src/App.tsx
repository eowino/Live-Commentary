import React, { Component } from 'react';
import { Commentaries, ICommentary } from './components/Commentary';
import { KeyMoments, IKeyMoment } from './components/KeyMoments';
import { ScrollArea } from './components/ScrollArea';
import commentaries from './api/commentaries';
import { screenSM } from './utilities/breakpoints';
class App extends Component {
  selectKeyMoments(commentaries: ICommentary[]): IKeyMoment[] {
    return commentaries
      .filter(commentary => Boolean(commentary.highlight))
      .map(commentary => ({
        time: commentary.time,
        name: commentary.highlight || '',
        id: commentary.id,
        onClick: this.handleScrollIntoView,
      }));
  }

  handleScrollIntoView(id: string) {
    const target = document.querySelector(`[data-target-id="${id}"]`);
    const offsetInMobile = window.innerWidth < screenSM ? 250 : 0;

    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - offsetInMobile,
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <div className="wrapper pd-t-20">
        <div className="app-grid">
          <div className="commentary-container">
            <Commentaries commentaries={commentaries} />
          </div>
          <div className="key-moment-container">
            <section>
              <h2>Key Moments</h2>
              <ScrollArea height="200px">
                <KeyMoments keyMoments={this.selectKeyMoments(commentaries)} />
              </ScrollArea>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
