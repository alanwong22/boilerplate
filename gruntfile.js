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
        app: 'app',
        build: 'build'
    },
    concat: {
      // COMBINE ALL LIBRARIES
      libs: {
        src: [
          '<%= bower.directory %>/angular/angular.min.js',
          '<%= bower.directory %>/angular-route/angular-route.min.js',
          '<%= bower.directory %>/jquery/dist/jquery.min.js',
          '<%= bower.directory %>/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
          '<%= bower.directory %>/velocity/velocity.min.js',
          '<%= bower.directory %>/velocity/velocity.ui.min.js'
        ],
        dest: 'app/js/lib.js'
      },
      // COMBINE ALL PROJECT FILES
      dev: {
        src: [
          '<%= config.app %>/js/app.js',
          '<%= config.app %>/js/*/*.js'
        ],
        dest: '<%= config.app %>/js/<%= pkg.name %>.js'
      }
    },
    // CREATE MINIFIED VERSION OF PROJECT FILES // NOT WORKING
    uglify: {
      build: {
        src: '<%= config.app %>/js/<%= pkg.name %>.js',
        dest: '<%= config.build %>/js/<%= pkg.name %>.min.js'
      }
    },
    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/scss/',
          src: ['**/*.scss'],
          dest: '<%= config.app %>/css/',
          ext: '.css'
        }]
      }
    },
    // COPY SOURCE FILES TO BUILD FOLDER
    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.build %>',
          src: [
            '*.html',
            'css/styles.css',
            'js/lib.js',
            'js/**/*.html'
          ]
        }]
      }
    },
    // INJECT REFERENCES TO INDEX.HTML
    injector: {
      options: {
        ignorePath:["<%= config.build %>/","<%= config.app %>/"]
      },
      dev: {  
        files: {'<%= config.app %>/index.html':[
          '<%= config.app %>/js/lib.js',
          '<%= config.app %>/js/<%= pkg.name %>.js',
          '<%= config.app %>/css/styles.css'
        ]}
      },
      build: {  
        files: {'<%= config.build %>/index.html':[
          '<%= config.build %>/js/lib.js',
          '<%= config.build %>/js/<%= pkg.name %>.min.js',
          '<%= config.build %>/css/styles.css'
        ]}
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
          options: {
              livereload: true//'<%= connect.options.livereload %>'
          },
          files: [
              '<%= config.app %>/{,*/}*.html',
              '.tmp/styles/{,*/}*.css',
              '<%= config.app %>/images/{,*/}*'
          ]
      },
      scripts: {
        files: [
          '<%= config.app %>/js/app.js',
          '<%= config.app %>/js/*/*.js'
        ],
        tasks: ['concat:dev'],
        options: {
          livereload: true   //reloads the browser
        }
      },
      css: {
       files: [
        '<%= config.app %>/scss/*.scss',
        '<%= config.app %>/scss/**/*.scss'
       ],
       tasks: ['sass:dev'],
        options: {
          livereload: true   //reloads the browser
        }
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
                // OPEN NEW WINDOW ON INIT
                livereload: true,
                open: true,
                base: '<%= config.app %>'
            }
        },
        livereloadBuild: {
            options: {
                // OPEN NEW WINDOW ON INIT
                livereload: true,
                open: true,
                base: '<%= config.build %>'
            }
        }
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-injector');

  grunt.registerTask('default', ['concat:libs']);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'injector:dev',
      'connect:livereload',
      'watch'
      ]);
  });

  grunt.registerTask('build', function (target) {
    grunt.task.run([
      'copy:build',
      'uglify',
      'injector:build',
      'connect:livereloadBuild',
      'watch:livereload',
      ]);
  });

};