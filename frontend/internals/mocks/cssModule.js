module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        return false;
      }
      return key.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
    },
  },
);
