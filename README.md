# InterMine Steps

InterMine 2.0 Prototype preserving history of Steps

![image](https://raw.github.com/intermine/intermine-steps/master/example.png)

## Getting Started

The following will install dependencies, get tools as a submodule and start the service in development mode.

```bash
$ npm install
$ git submodule init
$ git submodule foreach git pull origin master
$ NODE_ENV=dev node start.js
```

Visit ``127.0.0.1:9034``.

### Deployment

The app can be deployed using `chernobyl` on `ukraine`.

Use the following to compress JavaScript:

```bash
$ ./node_modules/.bin/brunch build --optimize
```

## Dependencies

Library | Version | Use
--- | --- | ---
`backbone` | 1.0.0 | Client side MVC framework
`chaplin` | 0.8.1 | Gives structure & memory management to `Backbone`
`d3` | 3.0.6 | History view SVG lines rendering
`im` | 2.5.1 | Client side API for InterMine calls
`imtables` | 1.2.0 | InterMine Results Tables
`jquery` | 1.9.1 | Selector magic
`jquery-foundation-forms` | - | Makes forms less sucky
`jquery-foundation-reveal` | - | Popover views
`lodash` | 1.2.1 | Frequently used utility functions & better than `underscore`
`modernizr` | 2.6.2 | Detect support for `LocalStorage` & `PushState` APIs
`moment` | 1.7.2 | Nice formating of time into "ago" form
`pluralize` | - | Pluralize strings like *types* into their plural form
`rainbow` | 1.1.8 | Syntax highlighting
`setImmediate` | 1.0.1 | Cross-browser & JS engine implementation of `nextTick` & `setImmediate`