import { renderHook } from '@testing-library/react-hooks';
import useMedia from './useMedia';

test('useMedia default value', () => {
  const { result } = renderHook(() => useMedia(['min-width: 100px'], [], 100));
  expect(result.current).toBe(100);
});

test('useMedia correct value', () => {
  const { result, unmount } = renderHook(({ value }) => useMedia(['min-width: 100px'], value, 100), {
    initialProps: {
      value: [200],
    },
  });
  expect(result.current).toBe(200);

  unmount();
});
