/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const RedisStore = require('connect-redis')(session);
const flash = require('express-flash');
const path = require('path');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const httpProxy = require('http-proxy');
const request = require('request');
const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

// Build out the OCAPI url that we'll use
const targetUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}`;
console.log(`Target OCAPI Url: ${targetUrl}`);

// Build out the proxy
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    changeOrigin: true
});

// Build out the site and catalog root urls
const siteUrl = `${targetUrl}/site?client_id=${process.env.OCAPI_CLIENT_ID}`;
console.log(`Site URL: ${siteUrl}`);
const rootCatUrl = `${targetUrl}/categories/root?client_id=${process.env.OCAPI_CLIENT_ID}&levels=2`;
console.log(`Root Cat  Url: ${rootCatUrl}`);
const authUrl = `${targetUrl}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
console.log(`Auth Url: ${authUrl}`);


/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const categoryController = require('./controllers/category');
const productController = require('./controllers/product');
const productSearchController = require('./controllers/productSearch');
const folderController = require('./controllers/folder');
const contentController = require('./controllers/content');
const contentSearchController = require('./controllers/contentSearch');
const cartController = require('./controllers/cart');
const checkoutController = require('./controllers/checkout');
const accountController = require('./controllers/account');
const storesController = require('./controllers/stores');

/**
 * Create Express server.
 */
const app = express();

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

const exphbs = require('express-handlebars');
const helpers = require('./lib/helpers');
const moreHelpers = require('just-handlebars-helpers');

const hbs = exphbs.create({
  defaultLayout: 'application',
  helpers,
  extname: '.hbs',

  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: [
    'views/common/',
    'views/partials/'
  ]
});

// Register the additional helpers
moreHelpers.registerHelpers(hbs.handlebars);

/**
 * Start Express server.
 */

// Register handlebars template engine
app.hbs = hbs;
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Register the target url via express
app.set('ocapi-targetUrl', targetUrl);
app.set('record-count', 24);

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({
    url: process.env.REDIS_URL,
    autoReconnect: true,
    clear_interval: 3600
  })
}));

// Initialize Session User, if necessary
app.use((req, res, next) => {

  // Seed the default records to retrieve per page
  req.recordCount = 24;

  if (req.session.user && !req.session.user.fault) {
    req.basket = req.session.basket;
    req.user = req.session.user;
    request.post({
      uri: authUrl,
      body: JSON.stringify({ type: 'refresh' }),
      headers: {
        'content-type': 'application/json',
        'authorization': req.session.bearerToken
      }
    }, function (err, response, body) {
      const auth = JSON.parse(body);
      if (err) {
        res.flash('Unable to login');
        return res.redirect('/login');
      }
      if (auth.fault && auth.fault.type === 'ExpiredTokenException') {
        request.post({
          uri: authUrl,
          body: JSON.stringify({ type: 'guest' }),
          headers: {
            'content-type': 'application/json'
          }
        }, function (err, response, body) {
          if (err) {
            res.flash('Unable to login');
            return res.redirect('/login');
          }

          const auth = JSON.parse(body);
          const bearerToken = response.headers.authorization;

          req.user = req.session.user = auth;
          req.basket = req.session.basket = null;
          req.session.bearerToken = bearerToken;

          console.log('-------------- guest user auth --------------');
        });
      } else {
        const bearerToken = response.headers.authorization;
        req.user = req.session.user = auth;
        req.session.bearerToken = bearerToken;
      }
      next();
    });
  } else {
    request.post({
        uri: authUrl,
        body: JSON.stringify({ type: 'guest' }),
        headers: {
          'content-type': 'application/json'
        }
    }, function (err, response, body) {
      if (err) {
        res.flash('Unable to login');
        return res.redirect('/login');
      }

      const auth = JSON.parse(body);
      const bearerToken = response.headers.authorization;

      req.user = req.session.user = auth;
      req.basket = req.session.basket = null;
      req.session.bearerToken = bearerToken;

      console.log('-------------- guest user auth --------------');
      console.dir(auth);

      next();
    });
  }
});

app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.use('/', homeController);
app.use('/category', categoryController);
app.use('/product', productController);
app.use('/productSearch', productSearchController);
app.use('/folder', folderController);
app.use('/content', contentController);
app.use('/contentSearch', contentSearchController);
app.use('/cart', cartController);
app.use('/checkout', checkoutController);
app.use('/account', accountController);
app.use('/stores', storesController);

/**
 * Error Handler.
 */
app.use(errorHandler());
const rp = require('request-promise');

// Recursive function to gather all categories into a single lookup hash
function collectSubCategories(cats, store) {
  cats.forEach((cat) => {
    store[cat.id] = cat;
    if (cat.categories) {
      collectSubCategories(cat.categories, store);
    }
  });
}

rp.get({
  uri: siteUrl,
  json: true
})
.then((site) => {
  app.set('site', site);

  return rp.get({
    uri: rootCatUrl,
    json: true
  });
})
.then((rootCat) => {
  app.set('root_category', rootCat);

  const departments = rootCat.categories;
  const deptKeys = departments.map(dept => dept.id);
  const catIds = `(${deptKeys.join(',')})`;
  const catsUrl = rootCatUrl.replace('root', catIds);

  return rp.get({
    uri: catsUrl,
    json: true
  });
})
.then((catsResult) => {
  const allCategories = {};
  collectSubCategories(catsResult.data, allCategories);

  app.set('all_categories', allCategories);
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
})
.catch((err) => {
  console.error('failed to fetch rootCategory');
  console.dir(err);
});

module.exports = app;
