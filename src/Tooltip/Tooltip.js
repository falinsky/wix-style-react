import React, {cloneElement} from 'react';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';
import ReactDOM from 'react-dom';
import TooltipContent from './TooltipContent';
import position from './TooltipPosition';
import styles from './TooltipContent.scss';
import {TooltipContainerStrategy} from './TooltipContainerStrategy';
import throttle from 'lodash/throttle';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

//maintain a 60fps rendering
const createAThrottledOptimizedFunction = cb => () => window.requestAnimationFrame(throttle(cb, 16));

/** A Tooltip component */
class Tooltip extends WixComponent {
  static displayName = 'Tooltip';

  static propTypes = {
    /** alignment of the tooltip's text  */
    textAlign: PropTypes.string,
    children: PropTypes.node,
    content: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    alignment: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
    theme: PropTypes.oneOf(['light', 'dark', 'error']),
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    showTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    hideTrigger: PropTypes.oneOf(['custom', 'mouseenter', 'mouseleave', 'click', 'focus', 'blur']),
    active: PropTypes.bool,
    bounce: PropTypes.bool,
    disabled: PropTypes.bool,

    /** The tooltip max width  */
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** The tooltip min width  */
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Callback when cliking outside  */
    onClickOutside: PropTypes.func,

    /** override the theme text color of the tooltip  */
    color: PropTypes.string,

    /** override the theme text line height of the tooltip  */
    lineHeight: PropTypes.string,

    /** Callback to be called when the tooltip has been shown */
    onShow: PropTypes.func,

    /** Callback to be called when the tooltip has been hidden */
    onHide: PropTypes.func,

    /** z index of the tooltip  */
    zIndex: PropTypes.number,

    /**
     * In some cases when you need a tooltip scroll with your element, you can append the tooltip to the direct parent, just
     * don't forget to apply `relative`, `absolute` positioning. And be aware that some of your styles may leak into
     * tooltip content.
     */
    appendToParent: PropTypes.bool,

    /**
     * In cases where you need to append the tooltip to some ancestor which is not the direct parent, you can pass a
     * predicate function of the form `(element: DOMElement) => Boolean`, and the tooltip will be attached to the
     * closest ancestor for which the predicate returns `true`
     */
    appendByPredicate: PropTypes.func,

    /** Element to attach the tooltip to  */
    appendTo: PropTypes.any,

    /**
     * Allows to shift the tooltip position by x and y pixels.
     * Both positive and negative values are accepted.
     */
    moveBy: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),

    /**
     * Allows to position the arrow relative to tooltip.
     * Positive value calculates position from left/top.
     * Negative one calculates position from right/bottom.
     */
    moveArrowTo: PropTypes.number,
    size: PropTypes.oneOf(['normal', 'large']),
    shouldCloseOnClickOutside: PropTypes.bool,
    relative: PropTypes.bool,

    /** Allows changing the padding of the content */
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Allows updating the tooltip position **/
    shouldUpdatePosition: PropTypes.bool,

    /** Show Tooltip Immediately - with no delay and no animation */
    showImmediately: PropTypes.bool
  };

  static defaultProps = {
    placement: 'top',
    alignment: 'center',
    showTrigger: 'mouseenter',
    hideTrigger: 'mouseleave',
    showDelay: 200,
    hideDelay: 0,
    zIndex: 2000,
    maxWidth: '204px',
    onClickOutside: null,
    onShow: null,
    onHide: null,
    active: false,
    theme: 'light',
    disabled: false,
    children: null,
    size: 'normal',
    shouldCloseOnClickOutside: false,
    textAlign: 'left',
    relative: false,
    shouldUpdatePosition: false,
    showImmediately: false
  };

  _childNode = null;
  _mountNode = null;
  _showTimeout = null;
  _showInterval = null;
  _hideTimeout = null;
  _unmounted = false;
  _containerScrollHandler = null;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      hidden: true
    };

    this._tooltipContainerStrategy = new TooltipContainerStrategy(props.appendTo, props.appendToParent, props.appendByPredicate);
  }

  componentElements() {
    const elements = super.componentElements();
    return this._mountNode ? elements.concat(this._mountNode) : elements;
  }

  onClickOutside(e) {
    if (this.props.shouldCloseOnClickOutside) {
      this.hide();
    }

    this.props.onClickOutside && this.props.onClickOutside(e);
  }

  componentDidUpdate() {
    this.renderTooltipIntoContainer();
  }

  componentWillUnmount() {
    super.componentWillUnmount && super.componentWillUnmount();
    this._unmounted = true;
    this._getContainer() && this.hide();

    if (this._showInterval) {
      clearInterval(this._showInterval);
    }
  }

  componentWillMount() {
    super.componentWillMount && super.componentWillMount();
    if (this.props.active) {
      this.show();
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps && super.componentWillReceiveProps(nextProps);
    if (nextProps.active !== this.props.active || nextProps.disabled !== this.props.disabled) {
      if (this.state.visible && this.props.hideTrigger === 'custom') {
        if (!nextProps.active || nextProps.disabled) {
          this.hide(nextProps);
        }
      }
      if (!this.state.visible && this.props.showTrigger === 'custom') {
        if (nextProps.active && !nextProps.disabled) {
          this.show(nextProps);
        }
      }
    }
  }

  renderTooltipIntoContainer(onSubtreeRendered) {
    if (this._mountNode && this.state.visible) {
      const arrowPlacement = {top: 'bottom', left: 'right', right: 'left', bottom: 'top'};
      const position = this.props.relative ? 'relative' : 'absolute';
      const tooltip = (
        <TooltipContent
          onMouseEnter={() => this._onTooltipContentEnter()}
          onMouseLeave={() => this._onTooltipContentLeave()}
          ref={ref => {
            if (this.props.relative) {
              this.tooltipContent = ref.tooltip;
            } else {
              this.tooltipContent = ref;
            }
          }}
          showImmediately={this.props.showImmediately}
          theme={this.props.theme}
          bounce={this.props.bounce}
          arrowPlacement={arrowPlacement[this.props.placement]}
          style={{zIndex: this.props.zIndex, position}}
          padding={this.props.padding}
          arrowStyle={this.state.arrowStyle}
          maxWidth={this.props.maxWidth}
          minWidth={this.props.minWidth}
          size={this.props.size}
          textAlign={this.props.textAlign}
          lineHeight={this.props.lineHeight}
          color={this.props.color}
          >
          {this.props.content}
        </TooltipContent>);

      renderSubtreeIntoContainer(this, tooltip, this._mountNode, onSubtreeRendered);

      if (this.props.shouldUpdatePosition) {
        setTimeout(() => {
          this._updatePosition(this.tooltipContent);
        });
      }
    }
  }

  render() {
    const child = Array.isArray(this.props.children) ? this.props.children[0] : this.props.children;
    if (child) {
      return cloneElement(child, {
        ref: ref => this._childNode = ReactDOM.findDOMNode(ref),
        onClick: this._chainCallbacks(child.props ? child.props.onClick : null, this._onClick),
        onMouseEnter: this._chainCallbacks(child.props ? child.props.onMouseEnter : null, this._onMouseEnter),
        onMouseLeave: this._chainCallbacks(child.props ? child.props.onMouseLeave : null, this._onMouseLeave),
        onFocus: this._chainCallbacks(child.props ? child.props.onFocus : null, this._onFocus),
        onBlur: this._chainCallbacks(child.props ? child.props.onBlur : null, this._onBlur)
      });
    } else {
      return (<div/>);
    }
  }

  _chainCallbacks = (first, second) => {
    return args => {
      if (first) {
        first.apply(this, args);
      }
      if (second) {
        second.apply(this, args);
      }
    };
  };

  _getContainer() {
    return this._tooltipContainerStrategy.getContainer(this._childNode);
  }

  show = (props = this.props) => {
    if (props.disabled) {
      return;
    }
    if (this._unmounted) {
      return;
    }
    this.setState({hidden: false});
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    if (this._showTimeout) {
      return;
    }
    if (!this.state.visible) {
      const delay = this.props.showImmediately ? 0 : props.showDelay;
      this._showTimeout = setTimeout(() => {
        if (typeof document === 'undefined') {
          return;
        }
        if (props.onShow) {
          props.onShow();
        }

        this.setState({visible: true}, () => {
          if (!this._mountNode) {
            this._mountNode = document.createElement('div');
            const container = this._getContainer();
            if (container) {
              container.appendChild(this._mountNode);
              this._containerScrollHandler = createAThrottledOptimizedFunction(() => this._updatePosition(this.tooltipContent));
              container.addEventListener('scroll', this._containerScrollHandler);
            }
          }
          this._showTimeout = null;

          let fw = 0;
          let sw = 0;
          do {
            // TODO migrate to React Portals
            this.renderTooltipIntoContainer(() => {// eslint-disable-line no-loop-func
              const tooltipNode = ReactDOM.findDOMNode(this.tooltipContent);
              if (tooltipNode) {
                fw = this._getRect(tooltipNode).width;
                this._updatePosition(this.tooltipContent);
                sw = this._getRect(tooltipNode).width;
              }
            });
          } while (!props.appendToParent && fw !== sw);
        });
      }, delay);
    }
  };

  hide = (props = this.props) => {
    this.setState({hidden: true});

    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    }

    if (this._hideTimeout) {
      return;
    }

    if (this.state.visible) {
      const hideLazy = () => {
        if (this._mountNode) {
          ReactDOM.unmountComponentAtNode(this._mountNode);
          props.onHide && props.onHide();
          const container = this._getContainer();
          if (container) {
            container.removeChild(this._mountNode);
            container.removeEventListener('scroll', this._containerScrollHandler);
          }
          this._mountNode = null;
        }
        this._hideTimeout = null;
        if (!this._unmounted) {
          this.setState({visible: false});
        }
      };

      if (this._unmounted) {
        return hideLazy();
      }

      this._hideTimeout = setTimeout(hideLazy, props.hideDelay);
    }
  };

  _hideOrShow(event) {
    if (this.props.hideTrigger === event && !this.state.hidden) {
      this.hide();
    } else if (this.props.showTrigger === event) {
      this.show();
    }
  }

  _onBlur() {
    this._hideOrShow('blur');
  }

  _onFocus() {
    this._hideOrShow('focus');
  }

  _onClick() {
    this._hideOrShow('click');
  }

  _onMouseEnter() {
    this._hideOrShow('mouseenter');
  }

  _onMouseLeave() {
    this._hideOrShow('mouseleave');
  }

  _calculatePosition(ref, tooltipNode) {
    if (!ref || !tooltipNode) {
      return {
        top: -1,
        left: -1
      };
    }
    return this._adjustPosition(position(
      this._getRect(this._childNode),
      this._getRect(tooltipNode),
      {
        placement: this.props.placement,
        alignment: this.props.alignment,
        margin: 10
      },
      this.props.relative
    ));
  }

  _updatePosition(ref) {
    if (ref && this._childNode) {
      const tooltipNode = ReactDOM.findDOMNode(ref);

      const style = this._calculatePosition(ref, tooltipNode);

      if (this.props.relative) {
        tooltipNode.style.top = `${style.top}px`;
        tooltipNode.style.left = `${style.left}px`;
      } else {
        tooltipNode.style.top = `${style.top}px`;
        tooltipNode.style.left = `${style.left}px`;
      }

      const arrowStyles = this._adjustArrowPosition(this.props.placement, this.props.moveArrowTo);
      if (Object.keys(arrowStyles).length) {
        const arrow = tooltipNode.querySelector(`.${styles.arrow}`);
        arrow && Object.keys(arrowStyles).forEach(key => {
          arrow.style[key] = arrowStyles[key];
        });
      }
    }
  }

  _adjustArrowPosition(placement, moveTo) {
    if (moveTo) {
      const isPositive = moveTo > 0;
      const pixels = isPositive ? moveTo : -moveTo;
      if (['top', 'bottom'].includes(placement)) {
        return isPositive ? {left: `${pixels}px`} : {left: 'auto', right: `${pixels}px`};
      }
      return isPositive ? {top: `${pixels}px`} : {top: 'auto', bottom: `${pixels}px`};
    }
    return {};
  }

  _getRect(el) {
    if (this.props.appendToParent) {
      // TODO: Once thoroughly tested, we could use the same approach in both cases.
      return {
        left: el.offsetLeft,
        top: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    }

    const container = this._getContainer(el);
    if (container !== document.body) {
      const containerRect = container.getBoundingClientRect();
      const selfRect = el.getBoundingClientRect();
      return {
        left: selfRect.left - containerRect.left + container.scrollLeft,
        top: selfRect.top - containerRect.top + container.scrollTop,
        width: selfRect.width,
        height: selfRect.height
      };
    }
    return el.getBoundingClientRect();
  }

  _adjustPosition(originalPosition) {
    let {x = 0, y = 0} = this.props.moveBy || {};
    // TODO: Once thoroughly tested, and converted to using offsetX props, we could remove this one.
    if (!this.props.appendToParent) {
      x += (window.scrollX || 0);
      y += (window.scrollY || 0);
    }
    return {
      left: originalPosition.left + x,
      top: originalPosition.top + y
    };
  }

  _onTooltipContentEnter() {
    if (this.props.showTrigger === 'custom') {
      return;
    }
    this.show();
  }

  _onTooltipContentLeave() {
    if (this.props.hideTrigger === 'custom') {
      return;
    }
    this._onMouseLeave();
  }

  isShown() {
    return this.state.visible;
  }
}

export default Tooltip;
