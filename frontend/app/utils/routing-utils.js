export const goToWebAdmin = (path) => {
  window.location = `${document.location.origin}/admin${path}`;
};

export const redirect = (path) => {
  window.location = path;
};

export const isLocalIP = (url = window.location.origin) => /^https?:\/\/(localhost|192\.168\.)/.test(url);

export const defaultJourneyPath = 'journey';
