module.exports = function(grunt) {
//http-server /Users/Station22/Desktop/workspace/Angular-Sorting

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('./.bowerrc'),
    // Project settings
    config: {
        // Path to source files
        app: 'app'
    },
    concat: {
      libs: {
        src: [
          '<%= bower.directory %>/angular/angular.min.js',
          '<%= bower.directory %>/angular-route/angular-route.min.js',
          '<%= bower.directory %>/jquery/dist/jquery.min.js',
        ],
        dest: 'app/js/lib.js'
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '<%= config.app %>/{,*/}*.html',
                '.tmp/styles/{,*/}*.css',
                '<%= config.app %>/images/{,*/}*'
            ]
        }
    },
    // The actual grunt server settings
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            hostname: 'localhost'
        },
        livereload: {
            options: {
                open: true,
                base: [
                    '.tmp',
                    '<%= config.app %>'
                ]
            }
        },
    }


  });

  

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
      ]);
  });

  grunt.registerTask('default', ['concat:libs']);
  grunt.registerTask('dev', ['watch']);


};