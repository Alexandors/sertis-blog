import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './usePrevious';

test('usePrevious default value', () => {
  const { result } = renderHook(() => usePrevious(1, 2));

  expect(result.current).toBe(2);
});

test('usePrevious cache previous value', () => {
  const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
    initialProps: {
      value: 1,
    },
  });

  expect(result.current).toBeUndefined();

  rerender({ value: 2 });

  expect(result.current).toBe(1);

  rerender({ value: 3 });

  expect(result.current).toBe(2);
});
