import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MediaHelper from './MediaRangeHelper';

const MediaRangeHelper = new MediaHelper();

const MediaRange = ({ children, range, onEnter, onLeave }) => {
  const [currentEnterRange, setCurrentEnterRange] = useState('');

  const changeCurrentEnterRange = (range) => {
    setCurrentEnterRange(range);
  };
  const clearEnterRange = () => setCurrentEnterRange('');

  const setRangeHandlerForChildren = () => {
    React.Children.forEach(children, (item) => {
      if (item.props.range) {
        MediaRangeHelper.addRange({
          [item.props.range]: {
            on: changeCurrentEnterRange,
            off: clearEnterRange
          }
        });
      }
    });
  }

  const setRangeHandlerForContainer = () => {
    // if range prop is array
    if(range && Array.isArray(range)) {
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
      console.log('MediaRangeHelper.addRange', range);

      MediaRangeHelper.addRange({
        [range]: {
          on: onEnter,
          off: onLeave
        }
      });
    }
  }

  useEffect(() => {
    setRangeHandlerForChildren();
    setRangeHandlerForContainer();
    window.addEventListener('resize', MediaRangeHelper.resizeHandler);
    window.addEventListener('orientationchange', MediaRangeHelper.resizeHandler);

    return () => {
      window.removeEventListener('resize', MediaRangeHelper.resizeHandler);
      window.removeEventListener('orientationchange', MediaRangeHelper.resizeHandler);
      MediaRangeHelper.clearHandlers();
    }
  }, []);

  return React.Children.map(children, (item) => {
    if (!item.props.range || currentEnterRange === item.props.range) {
      return item;
    }
  });
};

MediaRange.propTypes = {
  range: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  oneRender: PropTypes.bool,
};

MediaRange.defaultProps = {
  oneRender: true,
};

export default MediaRange;
