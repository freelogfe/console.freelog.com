'use strict';

module.exports = app => {
  class ResourceController extends app.Controller {
    * index() {
      const {ctx} = this;
      yield ctx.render('index.nj');
    }
  }
  return ResourceController;
};
