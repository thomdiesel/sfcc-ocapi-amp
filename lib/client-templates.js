'use strict';

const exphbs  = require('express-handlebars');

/**
 * Module dependencies.
 */

// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(path) {
  const safePath = path || 'views/';

  return (req, res, next) => {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    const hbs = req.app.hbs;
    hbs.getTemplates(safePath, {
      cache: req.app.enabled('view cache'),
      precompiled: true
    }).then((templates) => {
      // RegExp to remove the ".handlebars" extension from the template names.
      const extRegex = new RegExp(hbs.extname + '$');

      // Creates an array of templates which are exposed via
      // `res.locals.templates`.
      const filteredTemplates = [];

      Object.keys(templates).forEach((name) => {
        let baseName = name.replace(extRegex, '');
        if (baseName.indexOf('layouts/') < 0) {
          const parts = baseName.split('/');
          parts.shift();
          baseName = parts.join('/');
          filteredTemplates.push({
            name: baseName,
            template: templates[name]
          });
        }
      });

      // Exposes the templates during view rendering.
      if (filteredTemplates.length) {
        res.locals.templates = filteredTemplates;
      }

      setImmediate(next);
    })
    .catch(next);
  }
}

module.exports = exposeTemplates;
