/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from 'test-utils'; // eslint-disable-line
import useSize from './useSize';

const TestComponent = ({ state }) => {
  const [element, { width, height }] = useSize(
    ({ width, height }) => (
      <div data-testid="element">
        element width:
        {' '}
        {width}
        element height:
        {' '}
        {height}
      </div>
    ),
    state,
  );
  return (
    <div>
      {element}
      <div data-testid="rect">
        element width:
        {' '}
        {width}
        element height:
        {' '}
        {height}
      </div>
    </div>
  );
};

test('component could render correctly', () => {
  const { getByTestId } = render(<TestComponent/>);

  const element = getByTestId('element');
  const rect = getByTestId('rect');
  const iframe = getByTestId('measured-iframe');

  expect(element).toBeInTheDocument();
  expect(rect).toBeInTheDocument();
  fireEvent(iframe.contentWindow, new Event('resize'));
  expect(iframe).toBeInTheDocument();
});
