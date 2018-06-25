import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

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

const Field = ({children, label, required, info, dataHook}) =>
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
      </div>
    }

    <div
      data-hook="field-children"
      className={classnames(styles.children, {[styles.childrenInline]: !label})}
      children={children}
      />

    { !label && (required || info) &&
      <div className={styles.suffixesInline}>
        { required && asterisk({isInline: true}) }
        { info && infoIcon({content: info, isInline: true}) }
      </div>
    }
  </div>;

Field.displayName = 'Field';
Field.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool,
  info: PropTypes.node,
  dataHook: PropTypes.string
};
Field.defaultProps = {};

export default Field;
