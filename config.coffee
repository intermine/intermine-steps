exports.config =
    files:
        javascripts:
            joinTo:
                'js/app.js': /^app\/(chaplin|tools)/
                'js/vendor.js': /^vendor\/js/
            order:
                before: [
                    'vendor/js/jquery-1.9.1.js',
                    'vendor/js/underscore-1.4.4.js',
                    'vendor/js/backbone-0.9.10.js',
                    'vendor/js/rainbow.js'
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
        port: 9034
        run: yes