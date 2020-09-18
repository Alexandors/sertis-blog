import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';

export default (element, initialState = { width: Infinity, height: Infinity }) => {
  const wrapperRef = useRef();
  const handler = () => {
    const node = wrapperRef.current;
    if (node) {
      return {
        width: node.offsetWidth,
        height: node.offsetHeight,
      };
    }
    return initialState;
  };
  const [state, setSize] = useState(handler);
  const measuredRef = useCallback((node) => {
    if (node) {
      wrapperRef.current = node;
    }
  }, []);
  useEffect(() => {
    setSize(handler);
    const listener = () => {
      setSize(handler);
    };
    const iframe = wrapperRef.current;
    iframe.contentWindow.addEventListener('resize', listener);
    return () => {
      iframe.contentWindow.removeEventListener('resize', listener);
    };
  }, []);
  if (typeof element === 'function') {
    element = element(state); // eslint-disable-line
  }
  const { props } = element;
  const style = props.style || {};
  style.position = 'relative';
  const sizedEl = (
    <element.type {...props} style={style}>
      <iframe
        data-testid="measured-iframe"
        title="measured wrapper"
        ref={measuredRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: -1,
          background: 'transparent',
          visibility: 'invisible',
        }}
      />
      {props.children}
    </element.type>
  );
  return [sizedEl, state];
};
