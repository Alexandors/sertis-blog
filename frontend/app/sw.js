/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

workbox.core.setCacheNameDetails({
  prefix: 'journey',
});

workbox.core.skipWaiting();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL('/journey/index.html')
);
