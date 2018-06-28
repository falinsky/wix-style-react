import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Label from 'wix-style-react/Label';

import InfoIcon from './components/InfoIcon';
import typography from '../../Typography';

import styles from './FormField.scss';

class FormField extends React.Component {
  static displayName = 'FormField';
  static propTypes = {
    /**
     * any kids to render, should be some form of input. Input, InputArea & RichTextArea work well
     *
     * `children` can be React node or a function
     *
     * when function, it receives object with:
     * * `setCharactersLeft` - function accepts a number and will display it on top right of `FormField` component
     *
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

    /** optional text labeling this form field */
    label: PropTypes.node,

    /** whether to display an asterisk (*) or not */
    required: PropTypes.bool,

    /** display info icon with tooltip. Node from this prop is content of tooltip */
    infoContent: PropTypes.node,

    /** used for testing */
    dataHook: PropTypes.string
  }

  static defaultProps = {
    required: false
  }

  state = {
    lengthLeft: undefined
  }

  renderAsterisk = () =>
    <div
      data-hook="formfield-asterisk"
      className={styles.asterisk}
      children="*"
      />;

  renderCharactersLeft = lengthLeft =>
    <div
      data-hook="formfield-counter"
      className={classnames(styles.counter, typography.t3, {[typography.t3_5]: lengthLeft < 0})}
      children={lengthLeft}
      />;

  childrenRenderPropInterface = {
    setCharactersLeft: lengthLeft => this.setState({lengthLeft})
  }

  renderChildren() {
    const {children} = this.props;
    if (typeof children === 'function') {
      return children(this.childrenRenderPropInterface);
    }

    return children;
  }

  render() {
    const {label, required, infoContent, dataHook} = this.props;
    const {lengthLeft} = this.state;

    return (
      <div
        data-hook={dataHook}
        className={styles.root}
        >
        { label &&
        <div
          className={styles.label}
          data-hook="formfield-label"
          >
          <Label appearance="T1" children={label}/>

          { required && this.renderAsterisk() }
          { infoContent && <InfoIcon content={infoContent}/> }
          { lengthLeft && this.renderCharactersLeft(lengthLeft) }
        </div>
      }

        <div
          data-hook="formfield-children"
          className={classnames(styles.children, {[styles.childrenWithoutLabel]: !label})}
          >
          {this.renderChildren()}
        </div>

        { !label && (required || infoContent) &&
        <div
          data-hook="formfield-inline-suffixes"
          className={styles.suffixesInline}
          >
          { required && this.renderAsterisk() }
          { infoContent && <InfoIcon content={infoContent}/> }
        </div>
      }
      </div>
    );
  }
}

export default FormField;
