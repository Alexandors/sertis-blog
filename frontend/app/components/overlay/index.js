import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './overlay.module.scss';

let overlayRoot = document.getElementById('overlay');
if (!overlayRoot) {
  overlayRoot = document.createElement('div');
  overlayRoot.setAttribute('id', 'overlay');
  document.body.appendChild(overlayRoot);
}

const Overlay = ({ children }) => {
  const el = useRef(document.createElement('div'));
  useEffect(() => {
    document.getElementById('overlay').appendChild(el.current);
    return () => {
      document.getElementById('overlay').removeChild(el.current);
    };
  }, []);
  return ReactDOM.createPortal(<div className={styles.overlay}>{children}</div>, el.current);
};

Overlay.propTypes = {
  children: PropTypes.element,
};

export default Overlay;
