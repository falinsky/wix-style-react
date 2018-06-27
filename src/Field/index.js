import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

import MaxLengthCounter from './components/max-length-counter';
import styles from './styles.scss';

const asterisk = ({isInline} = {}) =>
  <div
    data-hook={`field-asterisk${isInline ? '-inline' : ''}`}
    className={styles.asterisk}
    children="*"
    />;

const infoIcon = ({content, isInline} = {}) =>
  <div
    className={styles.infoIcon}
    data-hook={`field-infoicon${isInline ? '-inline' : ''}`}
    >
    <Tooltip
      content={content}
      theme="dark"
      dataHook="field-infotooltip"
      >
      <div>
        <InfoCircle size="24px"/>
      </div>
    </Tooltip>
  </div>;

const renderChildren = ({children, value, onChange}) => {
  if (children && (value || onChange)) {
    return React.cloneElement(
      children,
      {
        ...(value ? {value} : {}),
        ...(onChange ? {onChange} : {})
      }
    );
  }

  return children;
};

const Field = ({children, label, required, info, dataHook, value, valueLength, onChange, maxLength}) =>
  <div
    data-hook={dataHook}
    className={styles.root}
    >
    { label &&
      <div
        className={styles.label}
        data-hook="field-label"
        >
        <Text appearance="T1" children={label}/>

        { required && asterisk() }
        { info && infoIcon({content: info}) }
        { maxLength && <MaxLengthCounter {...{maxLength, value, valueLength}}/> }
      </div>
    }

    <div
      data-hook="field-children"
      className={classnames(styles.children, {[styles.childrenInline]: !label})}
      >
      {renderChildren({children, value, onChange})}
    </div>

    { !label && (required || info) &&
      <div className={styles.suffixesInline}>
        { required && asterisk({isInline: true}) }
        { info && infoIcon({content: info, isInline: true}) }
      </div>
    }
  </div>;

Field.displayName = 'Field';
Field.propTypes = {
  /** any kids to render, should be some form of input. Input, InputArea & RichTextArea work well */
  children: PropTypes.node.isRequired,

  /** optional text labeling this form field */
  label: PropTypes.node,

  /** whether to display an asterisk (*) or not */
  required: PropTypes.bool,

  /** display info icon with tooltip. Node from this prop is content of tooltip */
  info: PropTypes.node,

  /** any value to be passed to children element. When string and maxLength is set, it is used to calculate remaining characters */
  value: PropTypes.any,

  /**
   * custom value length for cases when `value` prop does not represent actual value length.
   * For example, value may be `<p>Hello</p>` (12 chars) but is displayed as just `Hello` (5 chars)
   */
  valueLength: PropTypes.number,

  /** optional handler that will be proxied to children.
   * Mostly for convenience, as it can still be defined on children.
   *
   */
  onChange: PropTypes.func,

  /** number used to display remaining characters left. Should be used together with `value` or `valueLength`.
   * It's `maxLength - valueLength || value.length`.
   * Please note this does not validate data because there can be any type of children and value
   */
  maxLength: PropTypes.number,

  /** used for testing */
  dataHook: PropTypes.string
};

Field.defaultProps = {
  required: false
};

export default Field;
