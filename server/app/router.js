'use strict';

module.exports = app => {
  app.post('/api/v1/*', 'har.proxy');
  app.get('/api/v1/*', 'har.proxy');

  app.get('/v1/*', 'mock.getHandler');
  app.post('/v1/*', 'mock.postHandler');
};
