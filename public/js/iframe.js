(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

(function() {
  var document, head, intermine, jobs, load, loading, log, paths, root, _auto, _contains, _each, _get, _keys, _map, _reduce, _setImmediate,
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

  intermine.loader = {
    'timeout': 1e4,
    'processing': 50,
    'fn': function(path, type, cb) {
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
    }
  };

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
        var postCall, timeout;

        log({
          'job': job,
          'library': key,
          'message': 'downloading'
        });
        timeout = root.window.setTimeout(function() {
          log({
            'job': job,
            'library': key,
            'message': 'timed out'
          });
          return postCall("The library `" + key + "` has timed out");
        }, intermine.loader.timeout);
        postCall = function(err) {
          var isAvailable, isReady;

          if (exited) {
            return;
          }
          clearTimeout(timeout);
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
          timeout = root.window.setTimeout(isReady, intermine.loader.processing);
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
        };
        return intermine.loader.fn(path, type, postCall);
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
      script.async = true;
      script.src = url;
      script.onload = script.onreadystatechange = function(event) {
        event = event || root.window.event;
        if (event.type === 'load' || (/loaded|complete/.test(script.readyState) && (!document.documentMode || document.documentMode < 9))) {
          loaded = true;
          script.onload = script.onreadystatechange = script.onerror = null;
          return _setImmediate(done);
        }
      };
      script.onerror = function(event) {
        event = event || root.window.event;
        script.onload = script.onreadystatechange = script.onerror = null;
        return _setImmediate(done);
      };
      return head.insertBefore(script, head.lastChild);
    },
    'style': function(url, cb) {
      var style;

      style = document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = url;
      head.insertBefore(style, head.lastChild);
      return _setImmediate(cb);
    }
  };

}).call(this);
;
/*
 * js_channel is a very lightweight abstraction on top of
 * postMessage which defines message formats and semantics
 * to support interactions more rich than just message passing
 * js_channel supports:
 *  + query/response - traditional rpc
 *  + query/update/response - incremental async return of results
 *    to a query
 *  + notifications - fire and forget
 *  + error handling
 *
 * js_channel is based heavily on json-rpc, but is focused at the
 * problem of inter-iframe RPC.
 *
 * Message types:
 *  There are 5 types of messages that can flow over this channel,
 *  and you may determine what type of message an object is by
 *  examining its parameters:
 *  1. Requests
 *    + integer id
 *    + string method
 *    + (optional) any params
 *  2. Callback Invocations (or just "Callbacks")
 *    + integer id
 *    + string callback
 *    + (optional) params
 *  3. Error Responses (or just "Errors)
 *    + integer id
 *    + string error
 *    + (optional) string message
 *  4. Responses
 *    + integer id
 *    + (optional) any result
 *  5. Notifications
 *    + string method
 *    + (optional) any params
 */

;var Channel = (function() {
    "use strict";

    // current transaction id, start out at a random *odd* number between 1 and a million
    // There is one current transaction counter id per page, and it's shared between
    // channel instances.  That means of all messages posted from a single javascript
    // evaluation context, we'll never have two with the same id.
    var s_curTranId = Math.floor(Math.random()*1000001);

    // no two bound channels in the same javascript evaluation context may have the same origin, scope, and window.
    // futher if two bound channels have the same window and scope, they may not have *overlapping* origins
    // (either one or both support '*').  This restriction allows a single onMessage handler to efficiently
    // route messages based on origin and scope.  The s_boundChans maps origins to scopes, to message
    // handlers.  Request and Notification messages are routed using this table.
    // Finally, channels are inserted into this table when built, and removed when destroyed.
    var s_boundChans = { };

    // add a channel to s_boundChans, throwing if a dup exists
    function s_addBoundChan(win, origin, scope, handler) {
        function hasWin(arr) {
            for (var i = 0; i < arr.length; i++) if (arr[i].win === win) return true;
            return false;
        }

        // does she exist?
        var exists = false;


        if (origin === '*') {
            // we must check all other origins, sadly.
            for (var k in s_boundChans) {
                if (!s_boundChans.hasOwnProperty(k)) continue;
                if (k === '*') continue;
                if (typeof s_boundChans[k][scope] === 'object') {
                    exists = hasWin(s_boundChans[k][scope]);
                    if (exists) break;
                }
            }
        } else {
            // we must check only '*'
            if ((s_boundChans['*'] && s_boundChans['*'][scope])) {
                exists = hasWin(s_boundChans['*'][scope]);
            }
            if (!exists && s_boundChans[origin] && s_boundChans[origin][scope])
            {
                exists = hasWin(s_boundChans[origin][scope]);
            }
        }
        if (exists) throw "A channel is already bound to the same window which overlaps with origin '"+ origin +"' and has scope '"+scope+"'";

        if (typeof s_boundChans[origin] != 'object') s_boundChans[origin] = { };
        if (typeof s_boundChans[origin][scope] != 'object') s_boundChans[origin][scope] = [ ];
        s_boundChans[origin][scope].push({win: win, handler: handler});
    }

    function s_removeBoundChan(win, origin, scope) {
        var arr = s_boundChans[origin][scope];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].win === win) {
                arr.splice(i,1);
            }
        }
        if (s_boundChans[origin][scope].length === 0) {
            delete s_boundChans[origin][scope];
        }
    }

    function s_isArray(obj) {
        if (Array.isArray) return Array.isArray(obj);
        else {
            return (obj.constructor.toString().indexOf("Array") != -1);
        }
    }

    // No two outstanding outbound messages may have the same id, period.  Given that, a single table
    // mapping "transaction ids" to message handlers, allows efficient routing of Callback, Error, and
    // Response messages.  Entries are added to this table when requests are sent, and removed when
    // responses are received.
    var s_transIds = { };

    // class singleton onMessage handler
    // this function is registered once and all incoming messages route through here.  This
    // arrangement allows certain efficiencies, message data is only parsed once and dispatch
    // is more efficient, especially for large numbers of simultaneous channels.
    var s_onMessage = function(e) {
        try {
          var m = JSON.parse(e.data);
          if (typeof m !== 'object' || m === null) throw "malformed";
        } catch(e) {
          // just ignore any posted messages that do not consist of valid JSON
          return;
        }

        var w = e.source;
        var o = e.origin;
        var s, i, meth;

        if (typeof m.method === 'string') {
            var ar = m.method.split('::');
            if (ar.length == 2) {
                s = ar[0];
                meth = ar[1];
            } else {
                meth = m.method;
            }
        }

        if (typeof m.id !== 'undefined') i = m.id;

        // w is message source window
        // o is message origin
        // m is parsed message
        // s is message scope
        // i is message id (or undefined)
        // meth is unscoped method name
        // ^^ based on these factors we can route the message

        // if it has a method it's either a notification or a request,
        // route using s_boundChans
        if (typeof meth === 'string') {
            var delivered = false;
            if (s_boundChans[o] && s_boundChans[o][s]) {
                for (var j = 0; j < s_boundChans[o][s].length; j++) {
                    if (s_boundChans[o][s][j].win === w) {
                        s_boundChans[o][s][j].handler(o, meth, m);
                        delivered = true;
                        break;
                    }
                }
            }

            if (!delivered && s_boundChans['*'] && s_boundChans['*'][s]) {
                for (var j = 0; j < s_boundChans['*'][s].length; j++) {
                    if (s_boundChans['*'][s][j].win === w) {
                        s_boundChans['*'][s][j].handler(o, meth, m);
                        break;
                    }
                }
            }
        }
        // otherwise it must have an id (or be poorly formed
        else if (typeof i != 'undefined') {
            if (s_transIds[i]) s_transIds[i](o, meth, m);
        }
    };

    // Setup postMessage event listeners
    if (window.addEventListener) window.addEventListener('message', s_onMessage, false);
    else if(window.attachEvent) window.attachEvent('onmessage', s_onMessage);

    /* a messaging channel is constructed from a window and an origin.
     * the channel will assert that all messages received over the
     * channel match the origin
     *
     * Arguments to Channel.build(cfg):
     *
     *   cfg.window - the remote window with which we'll communicate
     *   cfg.origin - the expected origin of the remote window, may be '*'
     *                which matches any origin
     *   cfg.scope  - the 'scope' of messages.  a scope string that is
     *                prepended to message names.  local and remote endpoints
     *                of a single channel must agree upon scope. Scope may
     *                not contain double colons ('::').
     *   cfg.debugOutput - A boolean value.  If true and window.console.log is
     *                a function, then debug strings will be emitted to that
     *                function.
     *   cfg.debugOutput - A boolean value.  If true and window.console.log is
     *                a function, then debug strings will be emitted to that
     *                function.
     *   cfg.postMessageObserver - A function that will be passed two arguments,
     *                an origin and a message.  It will be passed these immediately
     *                before messages are posted.
     *   cfg.gotMessageObserver - A function that will be passed two arguments,
     *                an origin and a message.  It will be passed these arguments
     *                immediately after they pass scope and origin checks, but before
     *                they are processed.
     *   cfg.onReady - A function that will be invoked when a channel becomes "ready",
     *                this occurs once both sides of the channel have been
     *                instantiated and an application level handshake is exchanged.
     *                the onReady function will be passed a single argument which is
     *                the channel object that was returned from build().
     */
    return {
        build: function(cfg) {
            var debug = function(m) {
                if (cfg.debugOutput && window.console && window.console.log) {
                    // try to stringify, if it doesn't work we'll let javascript's built in toString do its magic
                    try { if (typeof m !== 'string') m = JSON.stringify(m); } catch(e) { }
                    console.log("["+chanId+"] " + m);
                }
            };

            /* browser capabilities check */
            if (!window.postMessage) throw("jschannel cannot run this browser, no postMessage");
            if (!window.JSON || !window.JSON.stringify || ! window.JSON.parse) {
                throw("jschannel cannot run this browser, no JSON parsing/serialization");
            }

            /* basic argument validation */
            if (typeof cfg != 'object') throw("Channel build invoked without a proper object argument");

            if (!cfg.window || !cfg.window.postMessage) throw("Channel.build() called without a valid window argument");

            /* we'd have to do a little more work to be able to run multiple channels that intercommunicate the same
             * window...  Not sure if we care to support that */
            if (window === cfg.window) throw("target window is same as present window -- not allowed");

            // let's require that the client specify an origin.  if we just assume '*' we'll be
            // propagating unsafe practices.  that would be lame.
            var validOrigin = false;
            if (typeof cfg.origin === 'string') {
                var oMatch;
                if (cfg.origin === "*") validOrigin = true;
                // allow valid domains under http and https.  Also, trim paths off otherwise valid origins.
                else if (null !== (oMatch = cfg.origin.match(/^https?:\/\/(?:[-a-zA-Z0-9_\.])+(?::\d+)?/))) {
                    cfg.origin = oMatch[0].toLowerCase();
                    validOrigin = true;
                }
            }

            if (!validOrigin) throw ("Channel.build() called with an invalid origin");

            if (typeof cfg.scope !== 'undefined') {
                if (typeof cfg.scope !== 'string') throw 'scope, when specified, must be a string';
                if (cfg.scope.split('::').length > 1) throw "scope may not contain double colons: '::'";
            }

            /* private variables */
            // generate a random and psuedo unique id for this channel
            var chanId = (function () {
                var text = "";
                var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                for(var i=0; i < 5; i++) text += alpha.charAt(Math.floor(Math.random() * alpha.length));
                return text;
            })();

            // registrations: mapping method names to call objects
            var regTbl = { };
            // current oustanding sent requests
            var outTbl = { };
            // current oustanding received requests
            var inTbl = { };
            // are we ready yet?  when false we will block outbound messages.
            var ready = false;
            var pendingQueue = [ ];

            var createTransaction = function(id,origin,callbacks) {
                var shouldDelayReturn = false;
                var completed = false;

                return {
                    origin: origin,
                    invoke: function(cbName, v) {
                        // verify in table
                        if (!inTbl[id]) throw "attempting to invoke a callback of a nonexistent transaction: " + id;
                        // verify that the callback name is valid
                        var valid = false;
                        for (var i = 0; i < callbacks.length; i++) if (cbName === callbacks[i]) { valid = true; break; }
                        if (!valid) throw "request supports no such callback '" + cbName + "'";

                        // send callback invocation
                        postMessage({ id: id, callback: cbName, params: v});
                    },
                    error: function(error, message) {
                        completed = true;
                        // verify in table
                        if (!inTbl[id]) throw "error called for nonexistent message: " + id;

                        // remove transaction from table
                        delete inTbl[id];

                        // send error
                        postMessage({ id: id, error: error, message: message });
                    },
                    complete: function(v) {
                        completed = true;
                        // verify in table
                        if (!inTbl[id]) throw "complete called for nonexistent message: " + id;
                        // remove transaction from table
                        delete inTbl[id];
                        // send complete
                        postMessage({ id: id, result: v });
                    },
                    delayReturn: function(delay) {
                        if (typeof delay === 'boolean') {
                            shouldDelayReturn = (delay === true);
                        }
                        return shouldDelayReturn;
                    },
                    completed: function() {
                        return completed;
                    }
                };
            };

            var setTransactionTimeout = function(transId, timeout, method) {
              return window.setTimeout(function() {
                if (outTbl[transId]) {
                  // XXX: what if client code raises an exception here?
                  var msg = "timeout (" + timeout + "ms) exceeded on method '" + method + "'";
                  (1,outTbl[transId].error)("timeout_error", msg);
                  delete outTbl[transId];
                  delete s_transIds[transId];
                }
              }, timeout);
            };

            var onMessage = function(origin, method, m) {
                // if an observer was specified at allocation time, invoke it
                if (typeof cfg.gotMessageObserver === 'function') {
                    // pass observer a clone of the object so that our
                    // manipulations are not visible (i.e. method unscoping).
                    // This is not particularly efficient, but then we expect
                    // that message observers are primarily for debugging anyway.
                    try {
                        cfg.gotMessageObserver(origin, m);
                    } catch (e) {
                        debug("gotMessageObserver() raised an exception: " + e.toString());
                    }
                }

                // now, what type of message is this?
                if (m.id && method) {
                    // a request!  do we have a registered handler for this request?
                    if (regTbl[method]) {
                        var trans = createTransaction(m.id, origin, m.callbacks ? m.callbacks : [ ]);
                        inTbl[m.id] = { };
                        try {
                            // callback handling.  we'll magically create functions inside the parameter list for each
                            // callback
                            if (m.callbacks && s_isArray(m.callbacks) && m.callbacks.length > 0) {
                                for (var i = 0; i < m.callbacks.length; i++) {
                                    var path = m.callbacks[i];
                                    var obj = m.params;
                                    var pathItems = path.split('/');
                                    for (var j = 0; j < pathItems.length - 1; j++) {
                                        var cp = pathItems[j];
                                        if (typeof obj[cp] !== 'object') obj[cp] = { };
                                        obj = obj[cp];
                                    }
                                    obj[pathItems[pathItems.length - 1]] = (function() {
                                        var cbName = path;
                                        return function(params) {
                                            return trans.invoke(cbName, params);
                                        };
                                    })();
                                }
                            }
                            var resp = regTbl[method](trans, m.params);
                            if (!trans.delayReturn() && !trans.completed()) trans.complete(resp);
                        } catch(e) {
                            // automagic handling of exceptions:
                            var error = "runtime_error";
                            var message = null;
                            // * if it's a string then it gets an error code of 'runtime_error' and string is the message
                            if (typeof e === 'string') {
                                message = e;
                            } else if (typeof e === 'object') {
                                // either an array or an object
                                // * if it's an array of length two, then  array[0] is the code, array[1] is the error message
                                if (e && s_isArray(e) && e.length == 2) {
                                    error = e[0];
                                    message = e[1];
                                }
                                // * if it's an object then we'll look form error and message parameters
                                else if (typeof e.error === 'string') {
                                    error = e.error;
                                    if (!e.message) message = "";
                                    else if (typeof e.message === 'string') message = e.message;
                                    else e = e.message; // let the stringify/toString message give us a reasonable verbose error string
                                }
                            }

                            // message is *still* null, let's try harder
                            if (message === null) {
                                try {
                                    message = JSON.stringify(e);
                                    /* On MSIE8, this can result in 'out of memory', which
                                     * leaves message undefined. */
                                    if (typeof(message) == 'undefined')
                                      message = e.toString();
                                } catch (e2) {
                                    message = e.toString();
                                }
                            }

                            trans.error(error,message);
                        }
                    }
                } else if (m.id && m.callback) {
                    if (!outTbl[m.id] ||!outTbl[m.id].callbacks || !outTbl[m.id].callbacks[m.callback])
                    {
                        debug("ignoring invalid callback, id:"+m.id+ " (" + m.callback +")");
                    } else {
                        // XXX: what if client code raises an exception here?
                        outTbl[m.id].callbacks[m.callback](m.params);
                    }
                } else if (m.id) {
                    if (!outTbl[m.id]) {
                        debug("ignoring invalid response: " + m.id);
                    } else {
                        // XXX: what if client code raises an exception here?
                        if (m.error) {
                            (1,outTbl[m.id].error)(m.error, m.message);
                        } else {
                            if (m.result !== undefined) (1,outTbl[m.id].success)(m.result);
                            else (1,outTbl[m.id].success)();
                        }
                        delete outTbl[m.id];
                        delete s_transIds[m.id];
                    }
                } else if (method) {
                    // tis a notification.
                    if (regTbl[method]) {
                        // yep, there's a handler for that.
                        // transaction has only origin for notifications.
                        regTbl[method]({ origin: origin }, m.params);
                        // if the client throws, we'll just let it bubble out
                        // what can we do?  Also, here we'll ignore return values
                    }
                }
            };

            // now register our bound channel for msg routing
            s_addBoundChan(cfg.window, cfg.origin, ((typeof cfg.scope === 'string') ? cfg.scope : ''), onMessage);

            // scope method names based on cfg.scope specified when the Channel was instantiated
            var scopeMethod = function(m) {
                if (typeof cfg.scope === 'string' && cfg.scope.length) m = [cfg.scope, m].join("::");
                return m;
            };

            // a small wrapper around postmessage whose primary function is to handle the
            // case that clients start sending messages before the other end is "ready"
            var postMessage = function(msg, force) {
                if (!msg) throw "postMessage called with null message";

                // delay posting if we're not ready yet.
                var verb = (ready ? "post  " : "queue ");
                debug(verb + " message: " + JSON.stringify(msg));
                if (!force && !ready) {
                    pendingQueue.push(msg);
                } else {
                    if (typeof cfg.postMessageObserver === 'function') {
                        try {
                            cfg.postMessageObserver(cfg.origin, msg);
                        } catch (e) {
                            debug("postMessageObserver() raised an exception: " + e.toString());
                        }
                    }

                    cfg.window.postMessage(JSON.stringify(msg), cfg.origin);
                }
            };

            var onReady = function(trans, type) {
                debug('ready msg received');
                if (ready) throw "received ready message while in ready state.  help!";

                if (type === 'ping') {
                    chanId += '-R';
                } else {
                    chanId += '-L';
                }

                obj.unbind('__ready'); // now this handler isn't needed any more.
                ready = true;
                debug('ready msg accepted.');

                if (type === 'ping') {
                    obj.notify({ method: '__ready', params: 'pong' });
                }

                // flush queue
                while (pendingQueue.length) {
                    postMessage(pendingQueue.pop());
                }

                // invoke onReady observer if provided
                if (typeof cfg.onReady === 'function') cfg.onReady(obj);
            };

            var obj = {
                // tries to unbind a bound message handler.  returns false if not possible
                unbind: function (method) {
                    if (regTbl[method]) {
                        if (!(delete regTbl[method])) throw ("can't delete method: " + method);
                        return true;
                    }
                    return false;
                },
                bind: function (method, cb) {
                    if (!method || typeof method !== 'string') throw "'method' argument to bind must be string";
                    if (!cb || typeof cb !== 'function') throw "callback missing from bind params";

                    if (regTbl[method]) throw "method '"+method+"' is already bound!";
                    regTbl[method] = cb;
                    return this;
                },
                call: function(m) {
                    if (!m) throw 'missing arguments to call function';
                    if (!m.method || typeof m.method !== 'string') throw "'method' argument to call must be string";
                    if (!m.success || typeof m.success !== 'function') throw "'success' callback missing from call";

                    // now it's time to support the 'callback' feature of jschannel.  We'll traverse the argument
                    // object and pick out all of the functions that were passed as arguments.
                    var callbacks = { };
                    var callbackNames = [ ];
                    var seen = [ ];

                    var pruneFunctions = function (path, obj) {
                        if (seen.indexOf(obj) >= 0) {
                            throw "params cannot be a recursive data structure"
                        }
                        seen.push(obj);
                       
                        if (typeof obj === 'object') {
                            for (var k in obj) {
                                if (!obj.hasOwnProperty(k)) continue;
                                var np = path + (path.length ? '/' : '') + k;
                                if (typeof obj[k] === 'function') {
                                    callbacks[np] = obj[k];
                                    callbackNames.push(np);
                                    delete obj[k];
                                } else if (typeof obj[k] === 'object') {
                                    pruneFunctions(np, obj[k]);
                                }
                            }
                        }
                    };
                    pruneFunctions("", m.params);

                    // build a 'request' message and send it
                    var msg = { id: s_curTranId, method: scopeMethod(m.method), params: m.params };
                    if (callbackNames.length) msg.callbacks = callbackNames;

                    if (m.timeout)
                      // XXX: This function returns a timeout ID, but we don't do anything with it.
                      // We might want to keep track of it so we can cancel it using clearTimeout()
                      // when the transaction completes.
                      setTransactionTimeout(s_curTranId, m.timeout, scopeMethod(m.method));

                    // insert into the transaction table
                    outTbl[s_curTranId] = { callbacks: callbacks, error: m.error, success: m.success };
                    s_transIds[s_curTranId] = onMessage;

                    // increment current id
                    s_curTranId++;

                    postMessage(msg);
                },
                notify: function(m) {
                    if (!m) throw 'missing arguments to notify function';
                    if (!m.method || typeof m.method !== 'string') throw "'method' argument to notify must be string";

                    // no need to go into any transaction table
                    postMessage({ method: scopeMethod(m.method), params: m.params });
                },
                destroy: function () {
                    s_removeBoundChan(cfg.window, cfg.origin, ((typeof cfg.scope === 'string') ? cfg.scope : ''));
                    if (window.removeEventListener) window.removeEventListener('message', onMessage, false);
                    else if(window.detachEvent) window.detachEvent('onmessage', onMessage);
                    ready = false;
                    regTbl = { };
                    inTbl = { };
                    outTbl = { };
                    cfg.origin = null;
                    pendingQueue = [ ];
                    debug("channel destroyed");
                    chanId = "";
                }
            };

            obj.bind('__ready', onReady);
            setTimeout(function() {
                postMessage({ method: scopeMethod('__ready'), params: "ping" }, true);
            }, 0);

            return obj;
        }
    };
})();;
window.require.register("iframe/Samskipti", function(exports, require, module) {
  var Samskipti, functions, root, type, _, _fn, _i, _len, _ref,
    __slice = [].slice;

  root = this;

  functions = ['apps', 'imtables'];

  module.exports = Samskipti = (function() {

    Samskipti.prototype.prefix = '__function__';

    function Samskipti(name, opts, cb) {
      var fn, self, _fn, _i, _len, _ref;
      self = this;
      self.id = 'Samskipti::' + name;
      if (!_.isFunction(cb)) {
        cb = (function(err) {
          throw err;
        });
      }
      this.err = function(err) {
        return cb(self.id + ' ' + err);
      };
      self.idCounter = 0;
      self.channel = root.Channel.build(opts);
      self.invoke = {};
      self.listenOn = {};
      self.callbacks = {};
      _ref = functions.concat([self.prefix]);
      _fn = function(fn) {
        self.invoke[fn] = function() {
          var callbacks, defunc, json, opts;
          opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          callbacks = [];
          defunc = function(obj) {
            var id, key, value;
            if (_.isFunction(obj)) {
              callbacks.push(id = self.prefix + ++self.idCounter);
              self.callbacks[id] = obj;
              return id;
            } else {
              if (_.isArray(obj)) {
                return obj.map(defunc);
              }
              if (_.isObject(obj)) {
                for (key in obj) {
                  value = obj[key];
                  obj[key] = defunc(value);
                }
                return obj;
              }
              return obj;
            }
          };
          json = JSON.stringify(defunc(opts));
          return self.channel.call({
            'method': fn,
            'params': [json],
            'success': function(thoseCallbacks) {
              if (!_.areArraysEqual(callbacks, thoseCallbacks)) {
                return self.err('Not all callbacks got recognized');
              }
            },
            'error': function(type, message) {
              console.log(arguments);
              return self.err(message);
            }
          });
        };
        return self.channel.bind(fn, function(trans, _arg) {
          var callbacks, json, makefunc;
          json = _arg[0];
          callbacks = [];
          makefunc = function(obj) {
            var key, value;
            if (_.isArray(obj)) {
              return obj.map(makefunc);
            }
            if (_.isObject(obj)) {
              for (key in obj) {
                value = obj[key];
                obj[key] = makefunc(value);
              }
              return obj;
            }
            if (_.isString(obj)) {
              if (obj.match(new RegExp('^' + self.prefix + '\\d+$'))) {
                callbacks.push(obj);
                return function() {
                  return self.invoke[self.prefix].apply(null, ['call::' + obj, arguments]);
                };
              }
            }
            return obj;
          };
          if (self.listenOn[fn] && _.isFunction(self.listenOn[fn])) {
            self.listenOn[fn].apply(null, makefunc(JSON.parse(json)));
            return callbacks;
          }
          return self.err("Why u no define `" + fn + "`?");
        });
      };
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fn = _ref[_i];
        _fn(fn);
      }
      this.listenOn[self.prefix] = function(call, obj) {
        var args, key, matches, value;
        if (_.isString(call) && (matches = call.match(new RegExp('^call::(' + self.prefix + '\\d+)$')))) {
          if ((fn = self.callbacks[matches[1]]) && _.isFunction(fn)) {
            args = (function() {
              var _results;
              _results = [];
              for (key in obj) {
                value = obj[key];
                _results.push(value);
              }
              return _results;
            })();
            fn.apply(null, args);
            return;
          }
          return self.err("Unrecognized function `" + matches[1] + "`");
        }
        return self.err('Why `call` malformed?');
      };
    }

    return Samskipti;

  })();

  _ = {};

  _.functions = function(obj) {
    var key, _results;
    _results = [];
    for (key in obj) {
      if (_.isFunction(obj[key])) {
        _results.push(key);
      }
    }
    return _results;
  };

  _.values = function(obj) {
    var key, _results;
    _results = [];
    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        _results.push(obj[key]);
      }
    }
    return _results;
  };

  _ref = ['Function', 'Array', 'String'];
  _fn = function(type) {
    return _["is" + type] = function(obj) {
      return Object.prototype.toString.call(obj) === ("[object " + type + "]");
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    type = _ref[_i];
    _fn(type);
  }

  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  _.areArraysEqual = function(a, b) {
    return !(a < b || b < a);
  };
  
});
window.require.register("iframe/child", function(exports, require, module) {
  var Samskipti, bundles, get;

  Samskipti = require('iframe/Samskipti');

  bundles = {
    'apps-a': {
      'js': {
        'intermine.apps-a': {
          path: '/iframe/js/intermine/intermine.apps-a-1.2.0.js'
        }
      }
    },
    'imtables': {
      'css': {
        'whateva1': {
          path: '/iframe/css/bootstrap-2.0.4.prefixed.css'
        },
        'whateva2': {
          path: '/iframe/css/intermine/imtables-1.3.0.css'
        }
      },
      'js': {
        '_': {
          path: '/iframe/js/lodash.underscore-1.2.1.js'
        },
        'jQuery': {
          path: '/iframe/js/jquery-1.9.1.js'
        },
        'jQuery.imWidget': {
          path: '/iframe/js/intermine/imtables-mini-bundle-1.3.0.js',
          depends: ['intermine.imjs']
        },
        'intermine.imjs': {
          path: '/iframe/js/intermine/im-2.5.1.js',
          depends: ['jQuery', '_']
        },
        'Backbone': {
          path: '/iframe/js/backbone-1.0.0.js',
          depends: ['jQuery', '_']
        }
      }
    }
  };

  get = function(bundle, cb) {
    return intermine.load(bundles[bundle], cb);
  };

  module.exports = function() {
    var channel;
    channel = new Samskipti('B', {
      'window': window.parent,
      'origin': '*',
      'scope': 'steps'
    });
    channel.listenOn.apps = function(name, config) {
      var load;
      load = function() {
        var apps;
        apps = new intermine.appsA(document.location.href.replace('/iframe.html', ''));
        return apps.load(name, 'body', config);
      };
      if (intermine.appsA) {
        return load.call(null);
      }
      return get('apps-a', function(err) {
        if (err) {
          throw err;
        }
        return load.call(null);
      });
    };
    return channel.listenOn.imtables = function(config) {
      var load;
      load = function() {
        var _ref;
        config.service = new intermine.Service({
          'root': config.mine,
          'token': config.token,
          'errorHandler': function(err) {
            throw err;
          }
        });
        if ((_ref = config.type) == null) {
          config.type = 'table';
        }
        return $('body').imWidget(config);
      };
      if (typeof $ !== "undefined" && $ !== null ? $.imWidget : void 0) {
        return load.call(null);
      }
      return get('imtables', function(err) {
        if (err) {
          throw err;
        }
        return load.call(null);
      });
    };
  };
  
});
