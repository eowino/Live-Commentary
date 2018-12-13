import React, { PureComponent } from 'react';
import { Commentaries, ICommentary } from './components/Commentary';
import { KeyMoments, IKeyMoment } from './components/KeyMoments';
import { ScrollArea } from './components/ScrollArea';
import commentaries from './api/commentaries';
import { screenSM } from './utilities/breakpoints';
import { delay } from './utilities/util';

interface IApp {
  scrollHeight: string;
}
class App extends PureComponent<any, IApp> {
  private shakeAnimClass = 'shake';

  state = {
    scrollHeight: this.keyMomentsScrollHeight,
  };

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

  get isMobileView() {
    return window.innerWidth < screenSM;
  }

  get keyMomentsScrollHeight() {
    return this.isMobileView ? '200px' : '90vh';
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  };

  handleResize = (e: Event) => {
    this.setState(() => ({
      scrollHeight: this.keyMomentsScrollHeight,
    }));
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  };

  handleAnimationEnd = (e: Event) => {
    (e.target as HTMLElement).classList.remove(this.shakeAnimClass);
  };

  handleScrollIntoView = (id: string) => {
    const target = document.querySelector(`[data-target-id="${id}"]`);
    const offsetInMobile = window.innerWidth < screenSM ? 270 : 0;

    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - offsetInMobile,
        behavior: 'smooth',
      });
      delay(() => {
        target.classList.add(this.shakeAnimClass);
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="app-grid">
          <div className="commentary-container">
            <Commentaries
              commentaries={commentaries.slice().reverse()}
              onAnimationEnd={this.handleAnimationEnd}
            />
          </div>
          <div className="key-moment-wrapper">
            <div className="key-moment-container">
              <section>
                <h2>Key Moments</h2>
                <ScrollArea height={this.state.scrollHeight}>
                  <KeyMoments
                    keyMoments={this.selectKeyMoments(commentaries)}
                  />
                </ScrollArea>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
