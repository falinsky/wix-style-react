import React from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../../BaseComponents/WixComponent';
import TextLinkLayout from '../../BaseComponents/TextLinkLayout';

export default class BaseTextLink extends WixComponent {

  static propTypes = {
    ...TextLinkLayout.propTypes,
    link: PropTypes.string,
    disabled: PropTypes.bool,
    download: PropTypes.bool,
    rel: PropTypes.string,
    target: PropTypes.string,
    ariaLabel: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func
  };

  static defaultProps = {
    ...TextLinkLayout.defaultProps,
    disabled: false,
    download: false,
    rel: null,
    target: null,
    onClick: () => {}
  };

  _handleOnClick = event => {
    const {link, disabled} = this.props;

    if (!link || disabled) {
      event.preventDefault();
    }

    if (!disabled) {
      this.props.onClick(event);
    }
  }

  render() {
    const {ariaLabel, disabled, link, children, download, rel, target, onMouseEnter, onMouseLeave} = this.props;

    const props = {
      download,
      href: link,
      onClick: this._handleOnClick,
      role: 'link',
      style: {
        textDecoration: 'inherit',
        tabIndex: 0,
        display: 'inline-block'
      },
      disabled
    };

    if (ariaLabel) {
      props['aria-label'] = ariaLabel;
    }

    if (rel) {
      props.rel = rel;
    }

    if (target) {
      props.target = target;
    }

    if (onMouseEnter) {
      props.onMouseEnter = onMouseEnter;
    }

    if (onMouseLeave) {
      props.onMouseLeave = onMouseLeave;
    }

    return (
      <a {...props}>
        <TextLinkLayout {...this.props}>
          {children}
        </TextLinkLayout>
      </a>
    );
  }
}
