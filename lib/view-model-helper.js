function getConfigFromRequest(request) {
  return new Promise((resolve, reject) => {
    if (!request) {
      reject(new Error('request is undefined'));
    } else {
      resolve({ id: 'an id' });
    }
  });
}

function getViewModel(req, Model) {
  const site = req.app.get('site');
  const root = req.app.get('root_category');
  const allCategories = req.app.get('all_categories');
  allCategories[root.id] = root;

  const customer = req.user;
  const basket = req.basket || req.session.basket;

  const config = Object.assign({}, req.params, {
    path: req.path,
    query: req.query,
    body: req.body,
    recordCount: req.recordCount,
    customer_id: req.user.customer_id,
    bearer_token: req.session.bearerToken,
    basket: basket
  });

  return new Promise((resolve, reject) => {
    Model.modelWithConfig(config)
    .then((model) => {
      const fullModel = Object.assign(model, {
        app: {
          site,
          root,
          allCategories,
          containerClass: process.env.CONTAINER_CLASS || 'container'
        },
        customer
      });
      resolve(fullModel);
    })
    .catch(reject);
  });
}

function renderView(res, model, viewPath) {
  res.format({
    json: () => res.json(model),
    html: () => res.render(viewPath, model),
    default: () => res.status(406).send('Not Acceptable')
  });
}

function renderError(res, error) {
  const errorStatus = error ? error.status || 500 : 500;
  const errorMessage = error ? error.message || 'Server Error' : 'Server Error';

  res.format({
    html: () => {
      res.status(errorStatus).send(errorMessage);
    },
    json: () => {
      res.json({
        status: errorStatus,
        error: {
          message: errorMessage
        }
      });
    },
    default: () => {
      res.status(errorStatus).send(errorMessage);
    }
  });
}

module.exports = {
  getConfigFromRequest,
  getViewModel,
  renderView,
  renderError
};
