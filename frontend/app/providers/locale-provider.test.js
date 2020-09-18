/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { render, fireEvent } from "test-utils"; // eslint-disable-line
import { renderHook, act } from '@testing-library/react-hooks';
import { LocaleProvider, useLocale } from './locale-provider';

const TestComponent = ({ fn }) => {
  useEffect(
    () => () => {
      fn();
    },
    []
  );
  const { setLocale } = useLocale();
  return (
    <div>
      <button onClick={() => setLocale('th')}>Change Locale</button>
      <div>TestItem</div>
    </div>
  );
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(() => 'en'),
}));

test('change locale with LocaleProvider', () => {
  const { result } = renderHook(() => useLocale(), {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => <LocaleProvider>{children}</LocaleProvider>,
  });

  expect(result.current.locale).toBe('en');

  act(() => {
    result.current.setLocale('th');
  });

  expect(result.current.locale).toBe('th');
});

test('useLocale should be used within the LocaleProvider', () => {
  const { result } = renderHook(() => useLocale());

  expect(result.error).toEqual(
    Error('useLocale must be used within a LocaleProvider')
  );
});

test('change locale, the children will not be unmounted', () => {
  const fn = jest.fn();
  const { getByText } = render(
    <LocaleProvider>
      <TestComponent fn={fn}/>
    </LocaleProvider>
  );

  expect(getByText('TestItem')).toBeInTheDocument();

  const button = getByText('Change Locale');

  fireEvent.click(button);

  expect(fn).not.toHaveBeenCalled();
});
