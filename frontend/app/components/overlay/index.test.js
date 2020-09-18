import React from 'react';
import { render } from 'test-utils'; // eslint-disable-line
import Overlay from '.';

afterAll(() => {
  const overlayRoot = document.getElementById('overlay');
  if (overlayRoot) {
    document.body.removeChild(overlayRoot);
  }
});

test('shows the children', () => {
  const { getByText } = render(
    <Overlay>
      <div>Test</div>
    </Overlay>,
  );

  expect(getByText('Test')).toBeInTheDocument();
});

test('unmount', () => {
  const { unmount } = render(
    <Overlay>
      <div>Test</div>
    </Overlay>,
  );

  unmount();

  expect(document.querySelector('#overlay').childElementCount).toBe(0);
});
