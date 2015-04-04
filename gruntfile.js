module.exports = function(grunt) {
//http-server /Users/Station22/Desktop/workspace/Angular-Sorting
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('./.bowerrc'),
    concat: {
      libs: {
        src: [
          '<%= bower.directory %>/angular/angular.min.js',
          '<%= bower.directory %>/angular-route/angular-route.min.js',
          '<%= bower.directory %>/jquery/dist/jquery.min.js'
        ],
        dest: 'app/js/lib.js'
      }
    },
    

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat:libs']);

};