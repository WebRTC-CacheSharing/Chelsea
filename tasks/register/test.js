module.exports = function (grunt) {
  grunt.registerTask('test', [
    'espower',
    'mochaTest'
  ]);
};
