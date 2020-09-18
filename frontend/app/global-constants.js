import keyMirror from 'keymirror';

export const DEVICE_XL = 1280;
export const DEVICE_LG = 992;
export const DEVICE_MD = 768;
export const DEVICE_SM = 360;
export const DEVICE_XS = 0;

export const QUERY_MIN_XL = `(min-width: ${DEVICE_XL}px)`;
export const QUERY_MIN_LG = `(min-width: ${DEVICE_LG}px)`;
export const QUERY_MIN_MD = `(min-width: ${DEVICE_MD}px)`;
export const QUERY_MIN_SM = `(min-width: ${DEVICE_SM}px)`;
export const QUERY_MIN_XS = `(min-width: ${DEVICE_XS}px)`;
export const QUERIES = [
  QUERY_MIN_XS,
  QUERY_MIN_SM,
  QUERY_MIN_MD,
  QUERY_MIN_LG,
  QUERY_MIN_XL,
];

export const ActionType = keyMirror({
  SHOW_NOTIFICATION: null,
  SERVER_ERROR: null,
  SHOW_LOADING_MASK: null,
  CLEAR_NOTIFICATION_MESSAGE: null,
  FETCH_ARTICLES_REQUEST:null,
  FETCH_ARTICLES_SUCCESS:null,
  LOGIN_REQUEST:null,
  LOGIN_SUCCESS:null,
  LOGIN_FAILED:null,
});
