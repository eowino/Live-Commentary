import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';

interface IScrollArea {
  height: string;
}

export class ScrollArea extends React.PureComponent<IScrollArea> {
  private renderScrollView(props: any) {
    return <div className="scroll-area" {...props} />;
  }

  render() {
    return (
      <Scrollbars
        {...this.props}
        autoHide
        style={{ height: this.props.height }}
        renderView={this.renderScrollView}
      />
    );
  }
}
