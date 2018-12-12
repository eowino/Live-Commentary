import React, { PureComponent } from 'react';
import { Commentaries, ICommentary } from './components/Commentary';
import { KeyMoments, IKeyMoment } from './components/KeyMoments';
import { ScrollArea } from './components/ScrollArea';
import commentaries from './api/commentaries';
import { screenSM } from './utilities/breakpoints';

interface IApp {
  stickyClass: string;
  scrollHeight: string;
}
class App extends PureComponent<any, IApp> {
  state = {
    stickyClass: '',
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
    return this.isMobileView ? '200px' : '85vh';
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  };

  handleScroll = (e: Event) => {
    const scrollY = window.scrollY >= 16;
    this.setState(() => ({
      stickyClass:
        scrollY && !this.isMobileView ? 'key-moment-container__sticky' : '',
      scrollHeight: this.keyMomentsScrollHeight,
    }));
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  };

  handleScrollIntoView(id: string) {
    const target = document.querySelector(`[data-target-id="${id}"]`);
    const offsetInMobile = window.innerWidth < screenSM ? 270 : 0;

    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - offsetInMobile,
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="app-grid">
          <div className="commentary-container">
            <Commentaries commentaries={commentaries} />
          </div>
          <div className="key-moment-container">
            <section className={this.state.stickyClass}>
              <h2>Key Moments</h2>
              <ScrollArea height={this.state.scrollHeight}>
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
