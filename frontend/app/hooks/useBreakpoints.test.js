import { renderHook } from '@testing-library/react-hooks';
import {
  QUERY_MIN_XS, QUERY_MIN_SM, QUERY_MIN_MD, QUERY_MIN_LG, QUERY_MIN_XL, QUERIES,
} from 'global-constants';
import useBreakpoints from './useBreakpoints';

function mockMatchMedia(mockQuery = QUERY_MIN_XS) {
  const index = QUERIES.indexOf(mockQuery);
  const matchesArr = QUERIES.slice(0, index + 1);
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: matchesArr.includes(query),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
}

test('useBreakpoints default value', () => {
  const { result, unmount } = renderHook(() => useBreakpoints([], 100));
  expect(result.current).toBe(100);

  unmount();
});

test('first parameter for object type', () => {
  mockMatchMedia(QUERY_MIN_XS);
  const { result } = renderHook(() => useBreakpoints({ queries: QUERIES, values: [200] }, 100));

  expect(result.current).toBe(200);
});

test(`device for ${QUERY_MIN_XS}`, () => {
  mockMatchMedia(QUERY_MIN_XS);
  const { result } = renderHook(() => useBreakpoints([200, 300], 100));

  expect(result.current).toBe(200);
});

test(`device for ${QUERY_MIN_SM}`, () => {
  mockMatchMedia(QUERY_MIN_SM);
  const { result } = renderHook(() => useBreakpoints([200, 300], 100));

  expect(result.current).toBe(300);
});

test(`device for ${QUERY_MIN_MD}`, () => {
  mockMatchMedia(QUERY_MIN_MD);
  const { result } = renderHook(() => useBreakpoints([200, 300, 400], 100));

  expect(result.current).toBe(400);
});

test(`device for ${QUERY_MIN_LG}`, () => {
  mockMatchMedia(QUERY_MIN_LG);
  const { result } = renderHook(() => useBreakpoints([200, 300, 400, 500], 100));

  expect(result.current).toBe(500);
});

test(`device for ${QUERY_MIN_XL}`, () => {
  mockMatchMedia(QUERY_MIN_XL);
  const { result } = renderHook(() => useBreakpoints([200, 300, 400, 500, 600], 100));

  expect(result.current).toBe(600);
});
