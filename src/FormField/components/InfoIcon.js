import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'wix-style-react/Tooltip';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';

import styles from '../FormField.scss';

const InfoIcon = ({content}) =>
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

InfoIcon.propTypes = {
  content: PropTypes.any.isRequired
};

export default InfoIcon;
