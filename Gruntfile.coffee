module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON("package.json")
        
        # Compile all client app source files.
        apps_c:
            commonjs:
                src: [
                    # App.
                    'client/src/**/*.{coffee,litcoffee,js,eco}'
                    # Tools packaged into the main app.
                    'tools/**/*.{coffee,litcoffee,js,eco}'
                ]
                dest: 'client/build/app.js'
                options:
                    main: 'client/src/initialize.coffee'
                    name: 'steps'

        # Compile all client app styles.
        stylus:
            compile:
                options:
                    paths: [ 'client/src/app.styl' ]
                files:
                    'client/build/app.css': 'client/src/app.styl'

        concat:
            # Merge client side app with its dependencies.
            scripts:
                src: [
                    # jQuery ready...
                    'client/vendor/jquery/jquery.js'
                    # Our app with CommonJS requirerer (needed by Chaplin).
                    'client/build/app.js'
                    # Vendor dependencies.
                    'client/vendor/lodash/dist/lodash.js'
                    'client/vendor/backbone/backbone.js'
                    'client/vendor/chaplin/chaplin.js'
                    'client/vendor/d3/d3.js'
                    'client/vendor/async/lib/async.js'
                    'client/vendor/modernizr/modernizr.js'
                    'client/vendor/moment/moment.js'
                    'client/vendor/pomme.js/build/app.js'
                ]
                dest: 'client/build/app.bundle.js'
                options:
                    separator: ';' # we will minify...

            # Merge client side app with its dependencies.
            styles:
                src: [
                    # Vendor dependencies?
                    # Our style.
                    'client/build/app.css'
                ]
                dest: 'client/build/app.bundle.css'

            # Apps/A.
            iframe_apps_a:
                src: [
                    'client/vendor/im.api/index.js'
                    'client/vendor/im.apps-a/index.js'
                    'client/vendor/lodash/dist/lodash.js'
                    'client/vendor/pomme.js/build/app.js'
                ]
                dest: 'client/build/iframe/im.apps-a.bundle.js'

            # imtables.
            iframe_imtables_js:
                src: [
                    'client/vendor/lodash/dist/lodash.js'
                    'client/vendor/jquery/jquery.js'
                    'client/vendor/backbone/backbone.js'
                    'client/vendor/im.js/index.js'
                    'client/vendor/im.tables.js/index.js'
                    'client/vendor/pomme.js/build/app.js'
                ]
                dest: 'client/build/iframe/im.tables.bundle.js'

            iframe_imtables_css:
                src: [
                    'client/vendor/bootstrap2/index.css'
                    'client/vendor/im.tables.css/index.css'
                ]
                dest: 'client/build/iframe/im.tables.bundle.css'

            # List Widgets.
            iframe_widgets_js:
                src: [
                    'client/vendor/im.widgets/index.js'
                    'client/vendor/setImmediate/index.js'
                    'client/vendor/async/lib/async.js'
                    'client/vendor/jquery/jquery.js'
                    'client/vendor/lodash/dist/lodash.js'
                    'client/vendor/backbone/backbone.js'
                    'client/vendor/google/index'
                    'client/vendor/im.js/index.js'
                    'client/vendor/fileSaver/index.js'
                    'client/vendor/pomme.js/build/app.js'
                ]
                dest: 'client/build/iframe/im.widgets.bundle.js'

            iframe_widgets_css:
                src: 'client/vendor/bootstrap2/index.css'
                dest: 'client/build/iframe/im.widgets.bundle.css'

        # Minification.
        uglify:
            my_target:
                files:
                    'client/build/app.min.js': 'client/build/app.js'
                    'client/build/app.bundle.min.js': 'client/build/app.bundle.js'
        
        cssmin:
            combine:
                files:
                    'client/build/app.min.css': 'client/build/app.css'
                    'client/build/app.bundle.min.css': 'client/build/app.bundle.css'

    grunt.loadNpmTasks('grunt-apps-c')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    grunt.registerTask('default', [
        'apps_c'
        'stylus'
        'concat'
    ])

    grunt.registerTask('minify', [
        'uglify'
        'cssmin'
    ])