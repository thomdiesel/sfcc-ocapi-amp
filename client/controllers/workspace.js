var Workspace = Backbone.Router.extend({
  routes: {
    "something": "help"
  },
  help: function() {
    console.log('help is here!');
  }
});