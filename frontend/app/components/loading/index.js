import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.module.scss';

const Loader = ({ center }) => (
  <div data-testid="loading-wrapper" className={classnames({ [styles.wrapper]: center })}>
    Loading...
  </div>
);

Loader.propTypes = {
  center: PropTypes.bool,
};

Loader.defaultProps = {
  center: false,
};

export default memo(Loader);
