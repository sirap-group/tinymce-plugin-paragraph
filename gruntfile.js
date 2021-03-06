
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    standard: {
      options: { format: false },
      gruntfile: { src: ['gruntfile.js'] },
      plugin: { src: ['src/**/*.js'] }
    },
    browserify: {
      plugin: {
        src: 'src/main.js',
        dest: 'plugin.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'plugin.min.js': ['plugin.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'gh-sirap-group',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }
  })

  grunt.registerTask('default', ['standard', 'browserify', 'uglify'])
}
