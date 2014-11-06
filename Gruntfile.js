module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      homepage: {
        files: {
          'dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/gmaps/gmaps.js',
            'bower_components/underscore/underscore.js',
            'bower_components/tinycolor/tinycolor.js',
            'bower_components/handlebars/handlebars.js',
            'src/js/main.js'
          ]
        }
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);

};
