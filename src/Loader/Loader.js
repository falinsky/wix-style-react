import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../BaseComponents/WixComponent';
import Arc from './Arc';
import css from './Loader.scss';
import Text from '../Deprecated/Text';

const arcsAngles = {
  tiny: {
    light: 216,
    dark: 144
  },
  small: {
    light: 216,
    dark: 144
  },
  medium: {
    light: 108,
    dark: 108
  },
  large: {
    light: 180,
    dark: 180
  }
};
const strokeWidth = 4;
const sizesInPx = {
  tiny: 18,
  small: 30,
  medium: 54,
  large: 102
};

export default class Loader extends WixComponent {

  static displayName = 'Loader';

  static propTypes = {
    /** The size of the loader */
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),

    /** The color of the loader */
    color: PropTypes.oneOf(['blue', 'white']),

    /** Node (usually text) to be shown below the loader */
    text: PropTypes.node
  };

  static defaultProps = {
    size: 'medium',
    color: 'blue'
  };

  render() {
    const {size, color, text} = this.props;
    const sizeInPx = sizesInPx[size];
    const lightArcAngle = arcsAngles[size].light;
    const darkArcAngle = arcsAngles[size].dark;
    const shouldShowText = size !== 'tiny';

    return (
      <div className={classNames(css.loaderContainer, css[size], css[color])}>
        <div
          className={css.arcsContainer}
          style={{
            width: `${sizeInPx}px`,
            height: `${sizeInPx}px`}}
          >
          <Arc
            angle={lightArcAngle}
            className={css.lightArc}
            strokeWidth={strokeWidth}
            viewBoxSize={sizeInPx}
            />
          <Arc
            angle={darkArcAngle}
            className={css.darkArc}
            strokeWidth={strokeWidth}
            viewBoxSize={sizeInPx}
            />
        </div>
        {
          shouldShowText && text &&
          <div className={css.text}>
            <Text appearance="T5" dataHook="loader-text">{this.props.text}</Text>
          </div>
        }
      </div>
    );
  }
}
