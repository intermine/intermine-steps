# InterMine Steps

InterMine 2.0 Prototype preserving history of Steps

![image](https://raw.github.com/intermine/intermine-steps/master/example.png)

## Getting Started

The following will install dependencies, get tools as a submodule and start the service in development mode.

```bash
$ npm install
$ PORT=9034 NODE_ENV=dev node start.js
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
`async` | 0.2.5 | Async calls like a boss
`backbone` | 1.0.0 | Client side MV* framework
`chaplin` | 0.8.1 | Gives structure & memory management to `Backbone`
`d3` | 3.0.6 | History view SVG lines rendering, a bit of an overkill
`jquery` | 1.9.1 | Selector magic
`jschannel` | - | Establish a channel between iframes using `window.postMessage`
`lodash.underscore` | 1.3.1 | Utility function that is globally available and compatible with `underscore`
`modernizr` | 2.6.2 | Detect support for `LocalStorage` & `PushState` APIs
`moment` | 1.7.2 | Nice formating of time into "ago" form
`pluralize` | - | Pluralize strings like *types* into their plural form

## Dependencies (iframe)

The following are assets available to be loaded from within a child iframe.

Library | Version | Use
--- | --- | ---
`lodash.modern` | 1.2.1 | Utility functions and available as CommonJS Module (use `require`)
`intermine.api` | 0.5.2 | A loader for dependencies
`intermine.apps-a` | 1.2.0 | Apps/A middleware client (*loaded when needed incl. deps*)
`intermine.im` | 2.5.1 | Client side API for InterMine calls (*loaded when needed incl. deps*)
`intermine.imtables` | 1.3.0 | InterMine Results Tables coming in a nice bundle (*loaded when needed incl. deps*)
`intermine.widgets` | 1.12.8 | List Widgets (*loaded when needed incl. deps*)