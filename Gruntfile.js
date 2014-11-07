module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    // Transpile LESS
    less: {
      options: {
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: true
        },
        files: {
          "dist/style.css": "src/css/style.less"
        }
      }
    },

    // Pre-render Handlebars templates
    handlebars: {
      options: {
        // Returns the filename, with its parent directory if
        // it's in a subdirectory of the src/templates folder
        processName: function(filePath) {
          var path = filePath.toLowerCase(),
              pieces = path.split("/"),
              name = '';
          if(pieces[pieces.length - 2] !== 'templates') {
            name = name + pieces[pieces.length - 2];
          }
          name = name + pieces[pieces.length - 1];
          return name.split(".")[0];
        }
      },
      compile: {
        files: {
          'build/templates.js': ['src/templates/**.hbs']
        }
      }
    },

    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },

    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      homepage: {
        files: {
          'dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/geocomplete/jquery.geocomplete.js',
            'bower_components/gmaps/gmaps.js',
            'bower_components/underscore/underscore.js',
            'bower_components/handlebars/handlebars.runtime.js',
            'bower_components/numeral/numeral.js',
            'build/templates.js',
            'src/js/palette.js',
            'src/js/key.js',
            'src/js/results.js',
            'src/js/map.js',
            'src/js/main.js'
          ]
        }
      }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', ['less', 'handlebars', 'jshint', 'uglify']);

};
