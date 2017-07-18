import React from 'react';
import { oneOfType, string, array, func } from 'prop-types';

import MediaRangeHelper from './MediaRangeHelper';

export default class MediaRange extends React.Component {

  constructor(props) {
    super(props);
    this.changeCurrentEnterRange = this.changeCurrentEnterRange.bind(this);
    this.clearEnterRange = this.clearEnterRange.bind(this);

    this.state = {
      currentEnterRange: ''
    };
  }

  componentDidMount() {
    this.setRangeHandlerForChildren();
    this.setRangeHandlerForContainer();

    window.addEventListener('resize', MediaRangeHelper.resizeHandler);
    window.addEventListener('orientationchange', MediaRangeHelper.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', MediaRangeHelper.resizeHandler);
    window.removeEventListener('orientationchange', MediaRangeHelper.resizeHandler);

    MediaRangeHelper.clearHandlers();
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
        MediaRangeHelper.addRange({
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
        MediaRangeHelper.addRange({
          [item.range]: {
            on: item.onEnter,
            off: item.onLeave
          }
        });
      });
    } else {
      // else range prop should be a string
      MediaRangeHelper.addRange({
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
  onLeave: func
};
