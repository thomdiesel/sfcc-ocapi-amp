module.exports = function(grunt) {

  ////////////////////////////////////////////////////
  // grunt and plugin configuration
  ////////////////////////////////////////////////////

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
        dist: {
            files: {
                'public/css/main.css': 'public/css/main.scss'
            }
        }
    },

    concat: {
      options: { separator: ';' },

      js: {
        src: ['client/**/*.js', 'client/*.js', 'lib/helpers.js',
          'lib/shop-api/src/**/*.js', 'lib/shop-api/src/*.js'],
        dest: 'public/js/app.js'
      },

      vendor: {
        src: ['public/js/lib/lodash.js', 'public/js/lib/jquery-3.1.1.min.js', 'public/js/lib/backbone.js',
          'public/js/lib/tether.min.js', 'public/js/lib/bootstrap.min.js', 'public/js/lib/currencyFormatter.min.js',
          'public/js/lib/handlebars.runtime.min.js', 'public/js/lib/h.min.js', 'public/js/lib/superagent.js'],
        dest: 'public/js/vendors.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      js: {
        files: {
          'public/js/app.min.js': ['public/js/app.js']
        }
      },
      vendor: {
        files: { 'public/js/vendors.min.js': ['public/js/vendors.js'] }
      }
    },

    cssmin: {
      target: {
        files: { 'public/css/main.min.css': ['public/css/main.css'] }
      }
    },

    watch: {
      scripts: {
        files: ['client/**/*.js', 'client/*.js', 'lib/helpers.js', 'lib/shop-api/src/**/*.js', 'lib/shop-api/src/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
    },
  });

  ////////////////////////////////////////////////////
  // Load all necessary grunt plugins
  ////////////////////////////////////////////////////

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'sass',
    'concat',
    'uglify',
    'cssmin'
  ]);
};
