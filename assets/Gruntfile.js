module.exports = function(grunt) {

    grunt.initConfig({
        postcss: {
            options: {
                map: true,
                processor: [
                    require('autoprefixer-core')({
                        browsers: 'last 2 versions',
                        map: {
                            inline: true,
                            prev: true
                        }
                    }),
                ],
            },
            dist: {
                src: 'styles/*.css'
            }
        },
        sass: {
            options: {
                sourceComments: false,
                precision: 4,
                outputStyle: 'nested',
                sourceMapContents: false,
                sourceMapComments: false,
            },
            dev: {
                options: {
                    sourceMap: true,
                },
                files: {
                    './styles/styles.css' : './sass/styles.scss'
                },
            }
        },

        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'postcss']
            },
            livereload: {
                files: ['styles/**/*.css'],
                options: {
                    livereload: true,
                    sourceMap: true
                }
            }
        }
    });

    // Measure the time of each task
    require('time-grunt')(grunt);

    // Automatic Dependency Loading
    require('jit-grunt')(grunt);

    // Default Grunt Task, used for watching during main development.
    grunt.registerTask('default', ['watch']);

    // Basic Compilation Task for Recompilling Assets.
    grunt.registerTask('compile', ['sass', 'postcss']);

}
