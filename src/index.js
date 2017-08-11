import React from 'react';
import { oneOfType, string, array, func, bool } from 'prop-types';

import MediaRangeHelper from './MediaRangeHelper';

export default class MediaRange extends React.Component {

  constructor(props) {
    super(props);
    this.changeCurrentEnterRange = this.changeCurrentEnterRange.bind(this);
    this.clearEnterRange = this.clearEnterRange.bind(this);

    this.state = {
      currentEnterRange: ''
    };

    this.MediaRangeHelper = new MediaRangeHelper();
  }

  componentDidMount() {
    this.setRangeHandlerForChildren();
    this.setRangeHandlerForContainer();

    window.addEventListener('resize', this.MediaRangeHelper.resizeHandler);
    window.addEventListener('orientationchange', this.MediaRangeHelper.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.MediaRangeHelper.resizeHandler);
    window.removeEventListener('orientationchange', this.MediaRangeHelper.resizeHandler);

    this.MediaRangeHelper.clearHandlers();
  }

  componentWillReceiveProps() {
    if(!this.props.oneRender) {
      this.MediaRangeHelper.clearHandlers();
      this.setRangeHandlerForContainer();
      this.setRangeHandlerForChildren();
    }
  }

  changeCurrentEnterRange(range) {
    this.setState({
      currentEnterRange: range
    });
  }

	clearEnterRange() {
    this.setState({
			currentEnterRange: ''
		});
	}

  setRangeHandlerForChildren() {
    React.Children.forEach(this.props.children, (item) => {
      if(item.props.range) {
        this.MediaRangeHelper.addRange({
          [item.props.range]: {
            on: this.changeCurrentEnterRange,
            off: this.clearEnterRange
          }
        });
      }
    });
  }

  setRangeHandlerForContainer() {
    const { range, onEnter, onLeave } = this.props;

    // if range prop is array
    if(range && range.forEach) {
      range.forEach((item) => {
        this.MediaRangeHelper.addRange({
          [item.range]: {
            on: item.onEnter,
            off: item.onLeave
          }
        });
      });
    } else {
      // else range prop should be a string
      this.MediaRangeHelper.addRange({
        [range]: {
          on: onEnter,
          off: onLeave
        }
      });
    }
  }

  render() {
    const { children } = this.props;
    const { currentEnterRange } = this.state;

    return (
      <div className="media-range">
        {React.Children.map(children, (item) => {
          if(!item.props.range || currentEnterRange === item.props.range) {
            return item;
          }
        })}
      </div>
    )
  }
}

MediaRange.propTypes = {
  range: oneOfType([string, array]),
  onEnter: func,
  onLeave: func,
  oneRender: bool,
};

MediaRange.defaultProps = {
  oneRender: true,
};
