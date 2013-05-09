exports.config =
    files:
        javascripts:
            joinTo:
                'js/app.js': /^app\/(chaplin|tools)/
                'js/vendor.js': /^vendor\/js/
            order:
                before: [
                    'vendor/js/setImmediate-1.0.1.js'
                    'vendor/js/jquery-1.9.1.js'
                    'vendor/js/lodash.underscore-1.2.1.js'
                    'vendor/js/backbone-1.0.0.js'
                    'vendor/js/rainbow-1.1.8.js'
                    'vendor/js/im-2.5.1.js'
                ]

        stylesheets:
            joinTo:
                'css/app.css': /^app\/styles/
                'css/vendor.css': /^vendor\/css/
            order:
                before: [
                    'vendor/css/foundation3.css' # Foundation 3
                ]
                after: [
                    'app/styles/app.styl' # app style
                ]

        templates:
            defaultExtension: 'eco'
            joinTo: 'js/app.js'

    server:
        path: 'server.coffee'
        run: yes