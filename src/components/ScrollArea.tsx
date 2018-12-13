import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

interface IScrollArea {
  height: string;
}

export class ScrollArea extends React.PureComponent<IScrollArea> {
  render() {
    return (
      <Scrollbars
        {...this.props}
        autoHide
        style={{ height: this.props.height }}
        renderTrackHorizontal={props => (
          <div {...props} className="track-horizontal" />
        )}
        renderTrackVertical={props => (
          <div {...props} className="track-vertical" />
        )}
        renderView={(styles, props) => (
          <div
            {...props}
            className="scrollbar-view"
            style={{ ...styles.style, overflowX: 'hidden', marginBottom: 0 }}
          />
        )}
      />
    );
  }
}
