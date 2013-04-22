# InterMine Steps

InterMine 2.0 Prototype preserving history of Steps

![image](https://raw.github.com/intermine/intermine-steps/master/example.png)

## Getting Started

The following will install dependencies, get tools as a submodule and start the service in development mode.

```bash
$ npm install
$ git submodule init
$ git submodule update
$ NODE_ENV=dev node start.js
```

Visit ``127.0.0.1:9034``.

### Deployment

The app can be deployed using `chernobyl` on `ukraine`.

Use the following to compress JavaScript:

```bash
$ ./node_modules/.bin/brunch build --optimize
```