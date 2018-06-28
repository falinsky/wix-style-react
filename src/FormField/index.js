import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

import MaxLengthCounter from './components/max-length-counter';
import styles from './styles.scss';

const asterisk = () =>
  <div
    data-hook="formfield-asterisk"
    className={styles.asterisk}
    children="*"
    />;

const infoIcon = ({content} = {}) =>
  <div
    className={styles.infoIcon}
    data-hook="formfield-infoicon"
    >
    <Tooltip
      content={content}
      theme="dark"
      dataHook="formfield-infotooltip"
      >
      <div>
        <InfoCircle size="24px"/>
      </div>
    </Tooltip>
  </div>;

class FormField extends React.Component {
  static displayName = 'FormField';
  static propTypes = {
    /** any kids to render, should be some form of input. Input, InputArea & RichTextArea work well */
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

          { required && asterisk() }
          { info && infoIcon({content: info}) }
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
          { required && asterisk() }
          { info && infoIcon({content: info}) }
        </div>
      }
      </div>
    );
  }
}

export default FormField;
