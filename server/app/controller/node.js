'use strict';

module.exports = app => {
  class NodeController extends app.Controller {
    * index() {
      const {ctx} = this;
      yield ctx.render('index.nj');
    }
  }
  return NodeController;
};
