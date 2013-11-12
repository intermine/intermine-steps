(function() {
  var cutoff, document, head, intermine, jobs, load, loading, log, paths, root, _auto, _contains, _each, _get, _keys, _map, _reduce, _setImmediate,
    __slice = [].slice;

  paths = {
    "widgets": {
      "latest": "http://cdn.intermine.org/js/intermine/widgets/latest/intermine.widgets.js",
      "1.0.0": "http://cdn.intermine.org/js/intermine/widgets/1.0.0/intermine.widgets.js",
      "1.1.0": "http://cdn.intermine.org/js/intermine/widgets/1.1.0/intermine.widgets.js",
      "1.1.7": "http://cdn.intermine.org/js/intermine/widgets/1.1.7/intermine.widgets.js",
      "1.1.8": "http://cdn.intermine.org/js/intermine/widgets/1.1.8/intermine.widgets.js",
      "1.1.9": "http://cdn.intermine.org/js/intermine/widgets/1.1.9/intermine.widgets.js",
      "1.1.10": "http://cdn.intermine.org/js/intermine/widgets/1.1.10/intermine.widgets.js",
      "1.2.0": "http://cdn.intermine.org/js/intermine/widgets/1.2.0/intermine.widgets.js",
      "1.2.1": "http://cdn.intermine.org/js/intermine/widgets/1.2.1/intermine.widgets.js",
      "1.3.0": "http://cdn.intermine.org/js/intermine/widgets/1.3.0/intermine.widgets.js",
      "1.4.0": "http://cdn.intermine.org/js/intermine/widgets/1.4.0/intermine.widgets.js",
      "1.4.1": "http://cdn.intermine.org/js/intermine/widgets/1.4.1/intermine.widgets.js",
      "1.4.2": "http://cdn.intermine.org/js/intermine/widgets/1.4.2/intermine.widgets.js",
      "1.6.7": "http://cdn.intermine.org/js/intermine/widgets/1.6.7/intermine.widgets.js",
      "1.6.8": "http://cdn.intermine.org/js/intermine/widgets/1.6.8/intermine.widgets.js",
      "1.7.0": "http://cdn.intermine.org/js/intermine/widgets/1.7.0/intermine.widgets.js",
      "1.7.3": "http://cdn.intermine.org/js/intermine/widgets/1.7.3/intermine.widgets.js",
      "1.8.0": "http://cdn.intermine.org/js/intermine/widgets/1.8.0/intermine.widgets.js",
      "1.8.1": "http://cdn.intermine.org/js/intermine/widgets/1.8.1/intermine.widgets.js",
      "1.8.2": "http://cdn.intermine.org/js/intermine/widgets/1.8.2/intermine.widgets.js",
      "1.8.3": "http://cdn.intermine.org/js/intermine/widgets/1.8.3/intermine.widgets.js",
      "1.9.1": "http://cdn.intermine.org/js/intermine/widgets/1.9.1/intermine.widgets.js",
      "1.10.0": "http://cdn.intermine.org/js/intermine/widgets/1.10.0/intermine.widgets.js",
      "1.11.2": "http://cdn.intermine.org/js/intermine/widgets/1.11.2/intermine.widgets.js"
    },
    "report-widgets": {
      "latest": "http://cdn.intermine.org/js/intermine/report-widgets/latest/intermine.report-widgets.js",
      "0.7.0": "http://cdn.intermine.org/js/intermine/report-widgets/0.7.0/intermine.report-widgets.js"
    }
  };

  root = this;

  root.intermine = intermine = root.intermine || {};

  if (typeof root.window === 'undefined') {
    if (typeof global === 'undefined') {
      throw 'what kind of environment is this?';
    }
    root.window = global;
  }

  if (intermine.load) {
    return;
  }

  intermine.loader = function(path, type, cb) {
    if (type == null) {
      type = 'js';
    }
    switch (type) {
      case 'js':
        return _get.script(path, cb);
      case 'css':
        return _get.style(path, cb);
      default:
        return cb("Unrecognized type `" + type + "`");
    }
  };

  cutoff = 50;

  loading = {};

  jobs = 0;

  load = function(resources, type, cb) {
    var branch, err, exit, exited, job, key, obj, onWindow, seen, value, _fn, _i, _len, _ref;

    job = ++jobs;
    log({
      'job': job,
      'message': 'start'
    });
    onWindow = function(path) {
      var loc, part, _i, _len, _ref;

      if (~path.indexOf('?')) {
        return false;
      }
      loc = root.window;
      _ref = path.split('.');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        if (!((loc[part] != null) && (typeof loc[part] === 'function' || 'object'))) {
          return false;
        }
        loc = loc[part];
      }
      return true;
    };
    exited = false;
    exit = function(err) {
      exited = true;
      return cb(err);
    };
    obj = {};
    _fn = function(key, value) {
      var dep, depends, path, test, _i, _len;

      log({
        'job': job,
        'library': key,
        'message': 'start'
      });
      if (exited) {
        return;
      }
      path = value.path, test = value.test, depends = value.depends;
      if (!path) {
        return exit("Library `path` not provided for " + key);
      }
      if (!!(test && typeof test === 'function' && test()) || onWindow(key)) {
        log({
          'job': job,
          'library': key,
          'message': 'exists'
        });
        return obj[key] = function(cb) {
          return cb(null);
        };
      }
      if (loading[key]) {
        log({
          'job': job,
          'library': key,
          'message': 'will wait'
        });
        return obj[key] = function(cb) {
          return loading[key].push(cb);
        };
      }
      loading[key] = [];
      log({
        'job': job,
        'library': key,
        'message': 'will download'
      });
      obj[key] = function(cb) {
        log({
          'job': job,
          'library': key,
          'message': 'downloading'
        });
        return intermine.loader(path, type, function(err) {
          var isAvailable, isReady, timeout;

          if (err) {
            delete loading[key];
            return exit(err);
          }
          log({
            'job': job,
            'library': key,
            'message': 'downloaded'
          });
          isReady = function() {
            log({
              'job': job,
              'library': key,
              'message': 'ready'
            });
            while (loading[key].length !== 0) {
              loading[key].pop()();
            }
            delete loading[key];
            return cb(null);
          };
          timeout = root.window.setTimeout(isReady, cutoff);
          return (isAvailable = function() {
            if (!!(test && typeof test === 'function' && test()) || onWindow(key)) {
              log({
                'job': job,
                'library': key,
                'message': 'exists'
              });
              root.window.clearTimeout(timeout);
              return isReady();
            } else {
              return _setImmediate(isAvailable);
            }
          })();
        });
      };
      if (depends && depends instanceof Array) {
        for (_i = 0, _len = depends.length; _i < _len; _i++) {
          dep = depends[_i];
          if (!(typeof dep !== 'string' || (resources[dep] == null))) {
            continue;
          }
          delete loading[key];
          return exit("Unrecognized dependency `" + dep + "`");
        }
        return obj[key] = depends.concat(obj[key]);
      }
    };
    for (key in resources) {
      value = resources[key];
      _fn(key, value);
    }
    if (exited) {
      return;
    }
    err = [];
    for (key in obj) {
      value = obj[key];
      if (!(value instanceof Array)) {
        continue;
      }
      seen = {};
      (branch = function(key) {
        var i, val, _i, _ref, _results;

        if (typeof key !== 'string') {
          return;
        }
        if (seen[key] != null) {
          if (!_contains(err, key)) {
            return err.push(key);
          }
        } else {
          seen[key] = true;
          if ((val = obj[key]) instanceof Array) {
            _results = [];
            for (i = _i = 0, _ref = val.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
              _results.push(branch(val[i]));
            }
            return _results;
          }
        }
      })(key);
    }
    if (!!err.length) {
      _ref = _keys(obj);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        delete loading[key];
      }
      return exit("Circular dependencies detected for `" + err + "`");
    }
    return _auto(obj, function(err) {
      if (err) {
        return cb(err);
      } else {
        return cb(null);
      }
    });
  };

  intermine.load = function() {
    var args, cb, exited, handle, i, key, library, name, o, path, resources, type, version, wait, _ref;

    library = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    cb = arguments.length === 1 ? library : args.pop();
    version = 'latest';
    if (typeof args[0] === 'string') {
      version = args[0];
    }
    if (typeof cb !== 'function') {
      cb = function() {};
    }
    if (typeof library === 'string') {
      if (!paths[library]) {
        return cb("Unknown library `" + library + "`");
      }
      if (!(path = paths[library][version])) {
        return cb("Unknown `" + library + "` version " + version);
      }
      o = {};
      o["intermine." + library] = {
        'path': path
      };
      return load(o, 'js', cb);
    }
    if (library instanceof Array) {
      o = {
        'js': {},
        'css': {}
      };
      for (i in library) {
        _ref = library[i], name = _ref.name, path = _ref.path, type = _ref.type, wait = _ref.wait;
        if (!(path || type)) {
          return cb('Library `path` or `type` not provided');
        }
        if (type !== 'css' && type !== 'js') {
          return cb("Library type `" + type + "` not recognized");
        }
        if (!name) {
          name = path.split('/').pop();
        }
        library[i].name = name;
        o[type][name] = {
          'path': path
        };
        if (!!wait && !!parseInt(i)) {
          o[type][name].depends = [library[i - 1].name];
        }
      }
      library = o;
    }
    if (typeof library === 'object') {
      i = _keys(library).length;
      exited = false;
      handle = function(err) {
        if (exited) {
          return;
        }
        if (err) {
          exited = true;
          return cb(err);
        }
        if (i-- && !!!i) {
          return cb(null);
        }
      };
      return (function() {
        var _results;

        _results = [];
        for (key in library) {
          resources = library[key];
          _results.push(load(resources, key, handle));
        }
        return _results;
      })();
    }
    return cb('Unrecognized input');
  };

  if (!(intermine.log && intermine.log instanceof Array)) {
    intermine.log = [];
  }

  log = function() {
    var arg;

    return intermine.log.push([
      'api-loader', (new Date).toLocaleString(), ((function() {
        var _i, _len, _results;

        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          arg = arguments[_i];
          _results.push(JSON.stringify(arg));
        }
        return _results;
      }).apply(this, arguments)).join(' ')
    ]);
  };

  if (typeof process === 'undefined' || !process.nextTick) {
    if (typeof setImmediate === 'function') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = function(fn) {
        return setTimeout(fn, 0);
      };
    }
  } else {
    if (typeof setImmediate !== 'undefined') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = process.nextTick;
    }
  }

  _each = function(arr, iterator) {
    var key, value, _results;

    if (arr.forEach) {
      return arr.forEach(iterator);
    }
    _results = [];
    for (key in arr) {
      value = arr[key];
      _results.push(iterator(value, key, arr));
    }
    return _results;
  };

  _map = function(arr, iterator) {
    var results;

    if (arr.map) {
      return arr.map(iterator);
    }
    results = [];
    _each(arr, function(x, i, a) {
      return results.push(iterator(x, i, a));
    });
    return results;
  };

  _reduce = function(arr, iterator, memo) {
    if (arr.reduce) {
      return arr.reduce(iterator, memo);
    }
    _each(arr, function(x, i, a) {
      return memo = iterator(memo, x, i, a);
    });
    return memo;
  };

  _keys = function(obj) {
    var k, keys;

    if (Object.keys) {
      return Object.keys(obj);
    }
    keys = [];
    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    return keys;
  };

  _contains = function(arr, item) {
    var value, _i, _len;

    if ([].indexOf) {
      return arr.indexOf(item) >= 0;
    }
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      value = arr[_i];
      if (value === item) {
        return true;
      }
    }
    return false;
  };

  _auto = function(tasks, callback) {
    var addListener, keys, listeners, removeListener, results, taskComplete;

    callback = callback || function() {};
    keys = _keys(tasks);
    if (!keys.length) {
      return callback(null);
    }
    results = {};
    listeners = [];
    addListener = function(fn) {
      return listeners.unshift(fn);
    };
    removeListener = function(fn) {
      var i, listener;

      for (i in listeners) {
        listener = listeners[i];
        if (listener === fn) {
          listeners.splice(i, 1);
          return;
        }
      }
    };
    taskComplete = function() {
      return _each(listeners.slice(0), function(fn) {
        return fn();
      });
    };
    addListener(function() {
      if (_keys(results).length === keys.length) {
        callback(null, results);
        return callback = function() {};
      }
    });
    return _each(keys, function(k) {
      var listener, ready, requires, task, taskCallback;

      task = (tasks[k] instanceof Function ? [tasks[k]] : tasks[k]);
      taskCallback = function(err) {
        var args, safeResults;

        args = Array.prototype.slice.call(arguments, 1);
        if (args.length <= 1) {
          args = args[0];
        }
        if (err) {
          safeResults = {};
          _each(_keys(results), function(rkey) {
            return safeResults[rkey] = results[rkey];
          });
          safeResults[k] = args;
          callback(err, safeResults);
          return callback = function() {};
        } else {
          results[k] = args;
          return _setImmediate(taskComplete);
        }
      };
      requires = task.slice(0, Math.abs(task.length - 1)) || [];
      ready = function() {
        return _reduce(requires, function(a, x) {
          return a && results.hasOwnProperty(x);
        }, true) && !results.hasOwnProperty(k);
      };
      if (ready()) {
        return task[task.length - 1](taskCallback, results);
      } else {
        listener = function() {
          if (ready()) {
            removeListener(listener);
            return task[task.length - 1](taskCallback, results);
          }
        };
        return addListener(listener);
      }
    });
  };

  document = root.window.document;

  if (document) {
    head = document.head || document.getElementsByTagName('head')[0];
  }

  _get = {
    'script': function(url, cb) {
      var done, loaded, script;

      if (!head) {
        return cb('`window.document` does not exist');
      }
      done = function() {
        script.onload = script.onreadystatechange = script.onerror = null;
        head.removeChild(script);
        return cb && cb.call(root.window, (loaded ? null : '`script.onerror` fired'));
      };
      script = document.createElement('script');
      loaded = false;
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.onload = script.onreadystatechange = function() {
        var state;

        state = this.readyState;
        if (!loaded && (!state || state === 'complete' || state === 'loaded')) {
          loaded = true;
          return _setImmediate(done);
        }
      };
      script.onerror = done;
      script.async = true;
      script.src = url;
      return head.appendChild(script);
    },
    'style': function(url, cb) {
      var style;

      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = url;
      head.appendChild(style);
      return _setImmediate(cb);
    }
  };

}).call(this);

(function() {
  var AppsClient, root, _base, _base1, _each, _extend, _id, _ref, _ref1, _setImmediate,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = this;

  if (typeof process === 'undefined' || !process.nextTick) {
    if (typeof setImmediate === 'function') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = function(fn) {
        return setTimeout(fn, 0);
      };
    }
  } else {
    if (typeof setImmediate !== 'undefined') {
      _setImmediate = setImmediate;
    } else {
      _setImmediate = process.nextTick;
    }
  }

  _each = function(arr, iterator) {
    var key, value, _results;

    if (arr.forEach) {
      return arr.forEach(iterator);
    }
    _results = [];
    for (key in arr) {
      value = arr[key];
      _results.push(iterator(value, key, arr));
    }
    return _results;
  };

  _extend = function(obj) {
    _each(Array.prototype.slice.call(arguments, 1), function(source) {
      var prop, _results;

      if (source) {
        _results = [];
        for (prop in source) {
          _results.push(obj[prop] = source[prop]);
        }
        return _results;
      }
    });
    return obj;
  };

  _id = function() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r;

      r = Math.random() * 16 | 0;
      return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
    });
  };

  root = this;

  if (!document.querySelector) {
    throw 'An old & unsupported browser detected';
  }

  AppsClient = (function() {
    function AppsClient(server) {
      this.load = __bind(this.load, this);
      var callback,
        _this = this;

      this.server = server.replace(/\/+$/, '');
      callback = 'appcall' + +(new Date);
      root[callback] = function(config) {
        _this.config = config;
      };
      root.intermine.load([
        {
          'path': "" + this.server + "/middleware/apps/a?callback=" + callback,
          'type': 'js'
        }
      ]);
    }

    AppsClient.prototype.load = function(appId, target, options) {
      var again, deps, run,
        _this = this;

      if (options == null) {
        options = {};
      }
      again = function() {
        return _this.load(appId, target, options);
      };
      if (!this.config) {
        return _setImmediate(again);
      }
      run = function(err) {
        var id;

        if (err) {
          throw new Error(err);
        }
        id = _id();
        return root.intermine.load([
          {
            'path': "" + _this.server + "/middleware/apps/a/" + appId + "?callback=" + id,
            'type': 'js'
          }
        ], function(err) {
          var app, config, div, instance, module, templates;

          div = document.createElement('div');
          div.setAttribute('class', "-im-apps-a " + appId);
          div.setAttribute('id', 'a' + id);
          document.querySelector(target).appendChild(div);
          if (!root.intermine.temp) {
            throw new Error('`intermine.temp` object cache does not exist');
          }
          if (!(app = root.intermine.temp.apps[id])) {
            throw new Error("Unknown app `" + id + "`");
          }
          module = app[0], config = app[1], templates = app[2];
          if (!module.App) {
            throw new Error('Root module is not exporting App');
          }
          config = _extend(config, options);
          instance = new module.App(config, templates);
          if (!(instance && typeof instance === 'object')) {
            throw new Error('App failed to instantiate');
          }
          if (!(instance.render && typeof instance.render === 'function')) {
            throw new Error('App does not implement `render` function');
          }
          return instance.render("#a" + id + ".-im-apps-a");
        });
      };
      deps = this.config[appId];
      if (deps != null) {
        return root.intermine.load(deps, run);
      } else {
        return run();
      }
    };

    return AppsClient;

  })();

  if (!root.intermine) {
    throw new Error('You need to include the InterMine API Loader first!');
  } else {
    root.intermine.appsA = root.intermine.appsA || AppsClient;
  }

  if ((_ref = (_base = root.intermine).temp) == null) {
    _base.temp = {};
  }

  if ((_ref1 = (_base1 = root.intermine.temp).apps) == null) {
    _base1.apps = {};
  }

}).call(this);

//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

(function() {
  /**
   * Require the given path.
   *
   * @param {String} path
   * @return {Object} exports
   * @api public
   */
  function require(path, parent, orig) {
    var resolved = require.resolve(path);

    // lookup failed
    if (null == resolved) {
      orig = orig || path;
      parent = parent || 'root';
      var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
      err.path = orig;
      err.parent = parent;
      err.require = true;
      throw err;
    }

    var module = require.modules[resolved];

    // perform real require()
    // by invoking the module's
    // registered function
    if (!module._resolving && !module.exports) {
      var mod = {};
      mod.exports = {};
      mod.client = mod.component = true;
      module._resolving = true;
      module.call(this, mod.exports, require.relative(resolved), mod);
      delete module._resolving;
      module.exports = mod.exports;
    }

    return module.exports;
  }

  /**
   * Registered modules.
   */

  require.modules = {};

  /**
   * Registered aliases.
   */

  require.aliases = {};

  /**
   * Resolve `path`.
   *
   * Lookup:
   *
   *   - PATH/index.js
   *   - PATH.js
   *   - PATH
   *
   * @param {String} path
   * @return {String} path or null
   * @api private
   */

  require.resolve = function(path) {
    if (path.charAt(0) === '/') path = path.slice(1);

    var paths = [
      path,
      path + '.js',
      path + '.json',
      path + '/index.js',
      path + '/index.json'
    ];

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i];
      if (require.modules.hasOwnProperty(path)) return path;
      if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
    }
  };

  /**
   * Normalize `path` relative to the current path.
   *
   * @param {String} curr
   * @param {String} path
   * @return {String}
   * @api private
   */

  require.normalize = function(curr, path) {
    var segs = [];

    if ('.' != path.charAt(0)) return path;

    curr = curr.split('/');
    path = path.split('/');

    for (var i = 0; i < path.length; ++i) {
      if ('..' == path[i]) {
        curr.pop();
      } else if ('.' != path[i] && '' != path[i]) {
        segs.push(path[i]);
      }
    }

    return curr.concat(segs).join('/');
  };

  /**
   * Register module at `path` with callback `definition`.
   *
   * @param {String} path
   * @param {Function} definition
   * @api private
   */

  require.register = function(path, definition) {
    require.modules[path] = definition;
  };

  /**
   * Alias a module definition.
   *
   * @param {String} from
   * @param {String} to
   * @api private
   */

  require.alias = function(from, to) {
    if (!require.modules.hasOwnProperty(from)) {
      throw new Error('Failed to alias "' + from + '", it does not exist');
    }
    require.aliases[to] = from;
  };

  /**
   * Return a require function relative to the `parent` path.
   *
   * @param {String} parent
   * @return {Function}
   * @api private
   */

  require.relative = function(parent) {
    var p = require.normalize(parent, '..');

    /**
     * lastIndexOf helper.
     */

    function lastIndexOf(arr, obj) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === obj) return i;
      }
      return -1;
    }

    /**
     * The relative require() itself.
     */

    function localRequire(path) {
      var resolved = localRequire.resolve(path);
      return require(resolved, parent, path);
    }

    /**
     * Resolve relative to the parent.
     */

    localRequire.resolve = function(path) {
      var c = path.charAt(0);
      if ('/' == c) return path.slice(1);
      if ('.' == c) return require.normalize(p, path);

      // resolve deps by returning
      // the dep in the nearest "deps"
      // directory
      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    };

    /**
     * Check if module is defined at `path`.
     */
    localRequire.exists = function(path) {
      return require.modules.hasOwnProperty(localRequire.resolve(path));
    };

    return localRequire;
  };

  // All our modules will see our own require.
  (function() {
    
    
    // channel.coffee
    require.register('pomme.js/src/channel.js', function(exports, require, module) {
    
      var ChanID, Channel, FnID, constants, helpers, iFrame, router, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __slice = [].slice;
      
      iFrame = require('./iframe');
      
      helpers = require('./helpers');
      
      _ref = require('./router'), ChanID = _ref.ChanID, FnID = _ref.FnID, router = _ref.router;
      
      constants = require('./constants');
      
      Channel = (function() {
        Channel.prototype.ready = false;
      
        Channel.prototype.scope = 'testScope';
      
        function Channel(opts) {
          this.onMessage = __bind(this.onMessage, this);
          this.onReady = __bind(this.onReady, this);
          var scope, target, template,
            _this = this;
          if (opts == null) {
            opts = {};
          }
          target = opts.target, scope = opts.scope, template = opts.template;
          this.id = new ChanID().id;
          if (scope) {
            this.scope = scope;
          }
          if (!_.isString(this.scope)) {
            throw 'only strings accepted for a scope';
          }
          switch (false) {
            case !_.isWindow(target):
              this.window = target;
              break;
            case !target:
              this.window = (this.iframe = new iFrame({
                id: this.id,
                target: target,
                scope: this.scope,
                template: template
              })).el;
              break;
            default:
              this.window = window.parent;
              this.child = true;
          }
          if (window === this.window) {
            throw 'child and parent windows cannot be one and the same';
          }
          this.handlers = {};
          this.pending = [];
          router.register(this.window, this.scope, this.onMessage);
          this.on(constants.ready, this.onReady);
          this.on('eval', function(code) {
            return eval.call(_this, code);
          });
          helpers.nextTick(function() {
            return _this.postMessage({
              'method': _this.scopeMethod(constants.ready),
              'params': ['ping']
            }, true);
          });
        }
      
        Channel.prototype.onReady = function(type) {
          var _results;
          if (this.ready) {
            return this.error('received ready message while in ready state');
          }
          this.id += [':B', ':A'][+type === 'ping'];
          this.unbind(constants.ready);
          this.ready = true;
          if (type === 'ping') {
            this.trigger(constants.ready, 'pong');
          }
          _results = [];
          while (this.pending.length) {
            _results.push(this.postMessage(this.pending.pop()));
          }
          return _results;
        };
      
        Channel.prototype.trigger = function() {
          var defunc, e, method, opts, params,
            _this = this;
          method = arguments[0], opts = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          try {
            JSON.stringify(opts);
          } catch (_error) {
            e = _error;
            return this.error('cannot convert circular structure');
          }
          params = (defunc = function(obj) {
            var id;
            if (_.isFunction(obj)) {
              id = new FnID().id;
              _this.on(id, obj);
              return id;
            } else {
              switch (false) {
                case !_.isArray(obj):
                  return _.collect(obj, defunc);
                case !_.isObject(obj):
                  return _.transform(obj, function(result, val, key) {
                    return result[key] = defunc(val);
                  });
                default:
                  return obj;
              }
            }
          })(opts);
          this.postMessage({
            'method': this.scopeMethod(method),
            params: params
          });
          return this;
        };
      
        Channel.prototype.postMessage = function(message, force) {
          if (force == null) {
            force = false;
          }
          if (this.disposed) {
            return;
          }
          if (!force && !this.ready) {
            return this.pending.push(message);
          }
          message[constants.postmessage] = true;
          return this.window.postMessage(JSON.stringify(message), '*');
        };
      
        Channel.prototype.onMessage = function(method, params) {
          var err, handler, makefunc,
            _this = this;
          params = (makefunc = function(obj) {
            switch (false) {
              case !_.isArray(obj):
                return _.collect(obj, makefunc);
              case !_.isObject(obj):
                return _.transform(obj, function(result, val, key) {
                  return result[key] = makefunc(val);
                });
              case !(_.isString(obj) && obj.match(constants["function"])):
                return function() {
                  return _this.trigger.apply(_this, [obj].concat(_.toArray(arguments)));
                };
              default:
                return obj;
            }
          })(params);
          if (!_.isFunction(handler = this.handlers[method])) {
            return;
          }
          if (!_.isArray(params)) {
            params = [params];
          }
          try {
            return handler.apply(null, params);
          } catch (_error) {
            err = _error;
            return this.error(err);
          }
        };
      
        Channel.prototype.scopeMethod = function(method) {
          return [this.scope, method].join('::');
        };
      
        Channel.prototype.on = function(method, cb) {
          if (this.disposed) {
            return;
          }
          if (!method || !_.isString(method)) {
            return this.error('`method` must be string');
          }
          if (!cb || !_.isFunction(cb)) {
            return this.error('callback missing');
          }
          if (this.handlers[method]) {
            return this.error("`" + method + "` is already bound");
          }
          this.handlers[method] = cb;
          return this;
        };
      
        Channel.prototype.unbind = function(method) {
          if (!(method in this.handlers)) {
            return this.error("`" + method + "` is not bound");
          }
          return delete this.handlers[method];
        };
      
        Channel.prototype.error = function(err) {
          var message, _base;
          message = null;
          switch (false) {
            case !_.isString(err):
              message = err;
              break;
            case !_.isArray(err):
              message = err[1];
              break;
            case !(_.isObject(err) && _.isString(err.message)):
              message = err.message;
          }
          if (!message) {
            try {
              message = JSON.stringify(err);
            } catch (_error) {
              message = err.toString();
            }
          }
          if (this.child) {
            if (_.isFunction(this.handlers.error)) {
              return this.handlers.error(message);
            } else {
              return this.trigger('error', message);
            }
          } else {
            if ((_base = this.handlers).error == null) {
              _base.error = function(err) {};
            }
            return this.handlers.error(message);
          }
        };
      
        Channel.prototype.dispose = function() {
          var key, val, _ref1, _ref2;
          if (this.disposed) {
            return;
          }
          this.disposed = true;
          if ((_ref1 = this.iframe) != null) {
            _ref1.dispose();
          }
          _ref2 = this.handlers;
          for (key in _ref2) {
            val = _ref2[key];
            if (key !== 'error') {
              this.unbind(key);
            }
          }
          if (typeof Object.freeze === "function") {
            Object.freeze(this.handlers);
          }
          return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
        };
      
        return Channel;
      
      })();
      
      module.exports = Channel;
      
      _.mixin((function() {
        return {
          'isWindow': function(obj) {
            switch (false) {
              case !!_.isObject(obj):
                return false;
              default:
                return obj.window === obj;
            }
          },
          'transform': function(obj, cb) {
            var key, val;
            for (key in obj) {
              val = obj[key];
              cb(obj, val, key);
            }
            return obj;
          }
        };
      })());
      
    });

    
    // constants.coffee
    require.register('pomme.js/src/constants.js', function(exports, require, module) {
    
      module.exports = {
        'postmessage': '__pomme__',
        'function': '__function::',
        'iframe': '__pomme::',
        'ready': '__ready'
      };
      
    });

    
    // helpers.coffee
    require.register('pomme.js/src/helpers.js', function(exports, require, module) {
    
      var root;
      
      root = window;
      
      module.exports = {
        'nextTick': (function() {
          var fns, tick;
          switch (false) {
            case !('setImmediate' in root && _.isFunction(root.setImmediate)):
              return function(f) {
                return setImmediate(f);
              };
            case !(typeof root === 'undefined' || 'ActiveXObject' in root || !'postMessage' in root):
              return function(f) {
                return setTimeout(f);
              };
            default:
              fns = [];
              tick = function() {
                return root.postMessage('tick', '*');
              };
              root.addEventListener('message', function() {
                var err, fn, _results;
                _results = [];
                while (fns.length) {
                  fn = fns.shift();
                  try {
                    _results.push(fn());
                  } catch (_error) {
                    err = _error;
                    tick();
                    throw err;
                  }
                }
                return _results;
              }, true);
              return function(fn) {
                if (!fns.length) {
                  tick();
                }
                return fns.push(fn);
              };
          }
        })()
      };
      
    });

    
    // iframe.coffee
    require.register('pomme.js/src/iframe.js', function(exports, require, module) {
    
      var constants, iFrame;
      
      constants = require('./constants');
      
      iFrame = (function() {
        function iFrame(_arg) {
          var html, id, name, scope, target, template;
          id = _arg.id, target = _arg.target, scope = _arg.scope, template = _arg.template;
          try {
            document.querySelector(target);
          } catch (_error) {
            return this.error('target selector not found');
          }
          name = constants.iframe + id || +(new Date);
          this.node = document.createElement('iframe');
          this.node.name = name;
          document.querySelector(target).appendChild(this.node);
          if (!_.isFunction(template)) {
            return this.error('template is not a function');
          }
          if (!_.isString(html = template({
            scope: scope
          }))) {
            return this.error('template did not return a string');
          }
          this.node.contentWindow.document.open();
          this.node.contentWindow.document.write(html);
          this.node.contentWindow.document.close();
          this.el = window.frames[name];
        }
      
        iFrame.prototype.error = function(message) {
          this.dispose();
          throw message;
        };
      
        iFrame.prototype.dispose = function() {
          if (this.disposed) {
            return;
          }
          this.disposed = true;
          if (this.node) {
            switch (false) {
              case !_.isFunction(this.node.remove):
                this.node.remove();
                break;
              case !_.isFunction(this.node.removeNode):
                this.node.removeNode(true);
                break;
              case !this.node.parentNode:
                this.node.parentNode.removeChild(this.node);
            }
          }
          return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
        };
      
        return iFrame;
      
      })();
      
      module.exports = iFrame;
      
    });

    
    // router.coffee
    require.register('pomme.js/src/router.js', function(exports, require, module) {
    
      var ChanID, FnID, Router, constants, router,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      constants = require('./constants');
      
      Router = (function() {
        function Router() {
          this.route = __bind(this.route, this);
        }
      
        Router.prototype.table = {};
      
        Router.prototype.transactions = {};
      
        Router.prototype.register = function(win, scope, handler) {
          var route, _base, _i, _len, _ref;
          if (scope == null) {
            scope = '';
          }
          if ((_base = this.table)[scope] == null) {
            _base[scope] = [];
          }
          _ref = this.table[scope];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            route = _ref[_i];
            if (route.win === win) {
              throw "a channel is already bound to the same window under `" + scope + "`";
            }
          }
          return this.table[scope].push({
            win: win,
            handler: handler
          });
        };
      
        Router.prototype.route = function(event) {
          var data, method, route, scope, _i, _len, _ref, _ref1, _ref2;
          data = null;
          try {
            data = JSON.parse(event.data);
          } catch (_error) {}
          if (!(_.isObject(data) && (_ref = constants.postmessage, __indexOf.call(_.keys(data), _ref) >= 0))) {
            return;
          }
          scope = null;
          method = null;
          if (_.isString(data.method)) {
            _ref1 = data.method.match(/^([^:]+)::(.+)$/).slice(1, 3), scope = _ref1[0], method = _ref1[1];
            if (!(scope && method)) {
              method = data.method;
            }
          }
          if (method && (this.table[scope] != null)) {
            _ref2 = this.table[scope];
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              route = _ref2[_i];
              if (route.win === event.source) {
                return route.handler(method, data.params);
              }
            }
          }
        };
      
        return Router;
      
      })();
      
      ChanID = (function() {
        ChanID.prototype._id = 0;
      
        function ChanID() {
          this.id = ChanID.prototype._id++;
        }
      
        return ChanID;
      
      })();
      
      FnID = (function() {
        FnID.prototype._id = 0;
      
        function FnID() {
          this.id = constants["function"] + FnID.prototype._id++;
        }
      
        return FnID;
      
      })();
      
      if (!('postMessage' in window)) {
        throw 'cannot run in this browser, no postMessage';
      }
      
      router = new Router();
      
      switch (false) {
        case !('addEventListener' in window):
          window.addEventListener('message', router.route, false);
          break;
        case !('attachEvent' in window):
          window.attachEvent('onmessage', router.route);
      }
      
      module.exports = {
        ChanID: ChanID,
        FnID: FnID,
        router: router
      };
      
    });
  })();

  // Return the main app.
  var main = require("pomme.js/src/channel.js");

  // Global on server, window in browser.
  var root = this;

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("pomme.js", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("Pomme.js", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("pommejs", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("PommeJS", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("pomme", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
    define("Pomme", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["pomme.js"] = main;
  
    root["Pomme.js"] = main;
  
    root["pommejs"] = main;
  
    root["PommeJS"] = main;
  
    root["pomme"] = main;
  
    root["Pomme"] = main;
  
  }

  // Alias our app.
  
  require.alias("pomme.js/src/channel.js", "pomme.js/index.js");
  
  require.alias("pomme.js/src/channel.js", "Pomme.js/index.js");
  
  require.alias("pomme.js/src/channel.js", "pommejs/index.js");
  
  require.alias("pomme.js/src/channel.js", "PommeJS/index.js");
  
  require.alias("pomme.js/src/channel.js", "pomme/index.js");
  
  require.alias("pomme.js/src/channel.js", "Pomme/index.js");
  

  // Export internal loader?
  root.require = (typeof root.require !== 'undefined') ? root.require : require;
})();