import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';

import MaxLengthCounter from './components/MaxLengthCounter';
import InfoIcon from './components/InfoIcon';
import styles from './styles.scss';

class FormField extends React.Component {
  static displayName = 'FormField';
  static propTypes = {
    /**
     * any kids to render, should be some form of input. Input, InputArea & RichTextArea work well
     *
     * `children` can be React node or a function
     *
     * when function, it receives object with:
     * * `setLengthLeft` - function accepts a number and will display it on top right of `FormField` component
     *
     */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,

    /** optional text labeling this form field */
    label: PropTypes.node,

    /** whether to display an asterisk (*) or not */
    required: PropTypes.bool,

    /** display info icon with tooltip. Node from this prop is content of tooltip */
    info: PropTypes.node,

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

  renderChildren() {
    const {children} = this.props;
    if (typeof children === 'function') {
      return children({
        setLengthLeft: lengthLeft => {
          this.setState({lengthLeft});
          return lengthLeft;
        }
      });
    }

    return children;
  }

  render() {
    const {label, required, info, dataHook} = this.props;
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
          <Text appearance="T1" children={label}/>

          { required && this.renderAsterisk() }
          { info && <InfoIcon content={info}/> }
          { lengthLeft && <MaxLengthCounter lengthLeft={lengthLeft}/> }
        </div>
      }

        <div
          data-hook="formfield-children"
          className={classnames(styles.children, {[styles.childrenInline]: !label})}
          >
          {this.renderChildren()}
        </div>

        { !label && (required || info) &&
        <div
          data-hook="formfield-inline-suffixes"
          className={styles.suffixesInline}
          >
          { required && this.renderAsterisk() }
          { info && <InfoIcon content={info}/> }
        </div>
      }
      </div>
    );
  }
}

export default FormField;
