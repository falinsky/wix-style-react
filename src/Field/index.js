import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Text from 'wix-style-react/Text';
import Tooltip from 'wix-style-react/Tooltip';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

import styles from './styles.scss';

const asterisk = ({isInline} = {}) =>
  <div
    data-hook="field-asterisk"
    className={classnames(styles.asterisk, {[styles.asteriskInline]: isInline})}
    children="*"
    />;

const infoIcon = ({isInline, content} = {}) =>
  <div
    className={classnames(styles.infoIcon, {[styles.infoIconInline]: isInline})}
    data-hook="field-infoicon"
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

const Field = ({children, label, required, info}) =>
  <div className={styles.root}>
    { label &&
      <div className={styles.heading}>
        <div
          className={styles.label}
          data-hook="field-label"
          >
          <Text appearance="T1" children={label}/>

          { required && asterisk() }
          { info && infoIcon({content: info}) }
        </div>
      </div>
    }

    <div
      data-hook="field-children"
      className={classnames(styles.children, {[styles.childrenInline]: !label})}
      children={children}
      />

    { !label && required && asterisk({isInline: true}) }
    { !label && info && infoIcon({content: info, isInline: true}) }
  </div>;

Field.displayName = 'Field';
Field.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  required: PropTypes.bool,
  info: PropTypes.node
};
Field.defaultProps = {};

export default Field;
