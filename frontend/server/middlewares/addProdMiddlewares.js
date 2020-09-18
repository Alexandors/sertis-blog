const fs = require('fs');
const path = require('path');
const express = require('express');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');
  const assets = JSON.parse(fs.readFileSync(path.resolve(outputPath, 'assets.json'), 'utf8'));

  /**
   * Identifies requests from clients that use http(unsecure) and
   * redirects them to the corresponding https(secure) end point.
   *
   * Identification of protocol is based on the value of non
   * standard http header 'X-Forwarded-Proto', which is set by
   * the proxy(in our case AWS ELB).
   * - when the header is undefined, it is a request sent by
   * the ELB health check.
   * - when the header is 'http' the request needs to be redirected
   * - when the header is 'https' the request is served.
   *
   * @param req the request object
   * @param res the response object
   * @param next the next middleware in chain
   */
  const redirectionFilter = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] === 'http' && req.headers.host !== 'localhost') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
      next();
    }
  };

  /**
   * Apply redirection filter to all requests
   */
  app.all('*', redirectionFilter);

  /**
   * compression middleware compresses your server responses which makes them
   * smaller (applies also to assets). You can read more about that technique
   * and other good practices on official Express.js docs http://mxs.is/googmy
   */
  const UN_CACHE_FILE = 'sw';
  app.use(
    publicPath,
    express.static(outputPath, {
      maxAge: '7d',
      setHeaders(res, path) {
        if (path.indexOf(UN_CACHE_FILE) > 0) {
          res.setHeader('Cache-Control', 'public, max-age=0');
        }
      },
    }),
  );

  app.get('*.css', (req, res, next) => {
    const assetKey = req.url.replace(new RegExp(publicPath), '');
    if (assets[`${assetKey}.gz`]) {
      req.url = assets[`${assetKey}.gz`];
      res.set('Content-Type', 'text/css; charset=UTF-8');
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });

  app.get('*.js', (req, res, next) => {
    const assetKey = req.url.replace(new RegExp(publicPath), '');
    if (assets[`${assetKey}.gz`]) {
      req.url = assets[`${assetKey}.gz`];
      res.set('Content-Type', 'text/javascript; charset=UTF-8');
      res.set('Content-Encoding', 'gzip');
    }
    next();
  });

  /**
   * Apply redirection filter to all requests
   */
  const versionFile = path.resolve(outputPath, 'version.json');
  app.get(['/version', '/journey/version'], (req, res) => {
    res.set({
      'Content-Type': 'application/json',
    });
    res.sendFile(versionFile);
  });

  /**
   * AWS ELB pings this URL to make sure the instance is running
   */
  app.get(['/health', '/journey/health'], (req, res) => {
    res.set({
      'Content-Type': 'text/plain',
      'Content-Length': 2,
    });
    res.write('OK');
    res.status(200).end();
  });

  app.get('/journey/_bootstrap', (req, res) => {
    res.set({ 'Content-Type': 'text/plain' });
    const bootstrapPrefix = process.env.BOOTSTRAP_PREFIX || 'bluecrystal-bootstrap';
    res.write(bootstrapPrefix);
    res.status(200).end();
  });

  /**
   * When the static content for a request is not found,
   * serve 'index.html'. This case arises for Single Page
   * Applications.
   */
  app.get('*', (req, res) => {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/html; charset=UTF-8');
    res.sendFile(path.resolve(outputPath, 'index.html.gz'));
  });
};
