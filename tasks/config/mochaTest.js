module.exports = function(grunt) {
  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec',
        timeout: 10 * 1000
      },
      src: ['espowered/**/*test.js']
    }
  });
  
  grunt.loadNpmTasks('grunt-mocha-test');
};