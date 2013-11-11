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
    
    
    // app.coffee
    require.register('steps/client/src/controllers/app.js', function(exports, require, module) {
    
      var AppController, Controller, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Controller = require('../core/Controller');
      
      module.exports = AppController = (function(_super) {
        __extends(AppController, _super);
      
        function AppController() {
          _ref = AppController.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        AppController.prototype.reset = function(params) {
          var collection,
            _this = this;
          collection = window.History;
          collection.storage.reset();
          collection.reset();
          return setTimeout(function() {
            return Chaplin.helpers.redirectTo('landing');
          }, 0);
        };
      
        return AppController;
      
      })(Controller);
      
    });

    
    // error.coffee
    require.register('steps/client/src/controllers/error.js', function(exports, require, module) {
    
      var Controller, ErrorController, ErrorView, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Controller = require('../core/Controller');
      
      ErrorView = require('../views/Error');
      
      module.exports = ErrorController = (function(_super) {
        __extends(ErrorController, _super);
      
        function ErrorController() {
          _ref = ErrorController.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ErrorController.prototype[404] = function(params) {
          this.views.push(new ErrorView({
            'template': 404
          }));
          return this.adjustTitle('404');
        };
      
        ErrorController.prototype[500] = function(params) {
          this.views.push(new ErrorView({
            'template': 500
          }));
          return this.adjustTitle('500');
        };
      
        return ErrorController;
      
      })(Controller);
      
    });

    
    // landing.coffee
    require.register('steps/client/src/controllers/landing.js', function(exports, require, module) {
    
      var Controller, LandingController, LandingView, Mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Controller = require('../core/Controller');
      
      Mediator = require('../core/Mediator');
      
      LandingView = require('../views/Landing');
      
      module.exports = LandingController = (function(_super) {
        __extends(LandingController, _super);
      
        function LandingController() {
          _ref = LandingController.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        LandingController.prototype.index = function(params) {
          this.views.push(new LandingView());
          return this.adjustTitle('Welcome');
        };
      
        return LandingController;
      
      })(Controller);
      
    });

    
    // tools.coffee
    require.register('steps/client/src/controllers/tools.js', function(exports, require, module) {
    
      var AppView, Controller, HistoryView, Mediator, NextStepsHeaderView, RightSidebarView, ToolsController, root, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Controller = require('../core/Controller');
      
      Mediator = require('../core/Mediator');
      
      AppView = require('../views/App');
      
      NextStepsHeaderView = require('../views/NextStepsHeader');
      
      RightSidebarView = require('../views/RightSidebar');
      
      HistoryView = require('../views/History');
      
      root = this;
      
      module.exports = ToolsController = (function(_super) {
        __extends(ToolsController, _super);
      
        function ToolsController() {
          _ref = ToolsController.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ToolsController.prototype['collection'] = root.History;
      
        ToolsController.prototype._chrome = function() {
          this.views.push(new AppView());
          this.views.push(new NextStepsHeaderView());
          this.views.push(new HistoryView({
            'collection': this.collection
          }));
          return this.views.push(new RightSidebarView());
        };
      
        ToolsController.prototype["new"] = function(_arg) {
          var Clazz, e, extra, model, name, slug;
          slug = _arg.slug, extra = _arg.extra;
          this._chrome();
          name = root.Utils.hyphenToPascal(slug);
          try {
            Clazz = require("/steps/tools/" + name + "/Model");
            model = new Clazz();
            Clazz = require("/steps/tools/" + name + "/View");
          } catch (_error) {
            e = _error;
            Chaplin.helpers.redirectTo('404');
            assert(false, "Unknown tool `" + name + "`");
          }
          this.views.push(new Clazz({
            'model': model,
            'extra': extra
          }));
          return this.adjustTitle(model.get('title'));
        };
      
        ToolsController.prototype.cont = function(_arg) {
          var Clazz, e, extra, guid, model, name, previous, slug;
          slug = _arg.slug, extra = _arg.extra, guid = _arg.guid;
          this._chrome();
          name = root.Utils.hyphenToPascal(slug);
          try {
            Clazz = require("/steps/tools/" + name + "/Model");
            model = new Clazz();
            Clazz = require("/steps/tools/" + name + "/View");
          } catch (_error) {
            e = _error;
            Chaplin.helpers.redirectTo('500');
            assert(false, "Unknown tool `" + name + "`");
          }
          previous = (this.collection.where({
            'guid': guid
          })).pop();
          if (!previous) {
            Chaplin.helpers.redirectTo('500');
            assert(false, 'No previous step');
          }
          model.set({
            'parent': guid
          });
          this.views.push(new Clazz({
            'model': model,
            'previous': previous.toJSON(),
            'extra': extra,
            'step': 1
          }));
          return this.adjustTitle(model.get('title'));
        };
      
        ToolsController.prototype.old = function(_arg, route) {
          var Clazz, e, guid, model, name, step;
          guid = _arg.guid;
          model = this.collection.where({
            'guid': guid
          })[0];
          if (!model) {
            Chaplin.helpers.redirectTo('500');
            assert(false, 'We do not have this Model in History');
          }
          this._chrome();
          name = model.get('name');
          try {
            Clazz = require("/steps/tools/" + name + "/View");
          } catch (_error) {
            e = _error;
            Chaplin.helpers.redirectTo('500');
            assert(false, "Unknown tool `" + name + "`");
          }
          model = this.collection.dupe(model);
          step = route.action === 'results' ? 2 : 1;
          this.views.push(new Clazz({
            'model': model,
            'step': step
          }));
          Mediator.publish('history:activate', guid);
          return this.adjustTitle(model.get('title'));
        };
      
        return ToolsController;
      
      })(Controller);
      
      ToolsController.prototype.results = ToolsController.prototype.old;
      
    });

    
    // Application.coffee
    require.register('steps/client/src/core/Application.js', function(exports, require, module) {
    
      var Controller, Dispatcher, InterMineSteps, Layout, Mediator, config, registry, root, _ref, _ref1,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        __slice = [].slice;
      
      require('./AssertException');
      
      require('./Console');
      
      require('./Utils');
      
      Dispatcher = require('./Dispatcher');
      
      Mediator = require('./Mediator');
      
      Layout = require('./Layout');
      
      Controller = require('./Controller');
      
      _ref = require('/steps/tools/config'), registry = _ref.registry, config = _ref.config;
      
      root = this;
      
      module.exports = InterMineSteps = (function(_super) {
        __extends(InterMineSteps, _super);
      
        function InterMineSteps() {
          _ref1 = InterMineSteps.__super__.constructor.apply(this, arguments);
          return _ref1;
        }
      
        InterMineSteps.prototype.title = 'InterMine Steps';
      
        InterMineSteps.prototype.start = function() {
          this.initLayout();
          this.initRegistry();
          return InterMineSteps.__super__.start.apply(this, arguments);
        };
      
        InterMineSteps.prototype.initLayout = function() {
          return root.Layout = new Layout({
            'title': this.title,
            'openExternalToBlank': true
          });
        };
      
        InterMineSteps.prototype.initRegistry = function() {
          var _this = this;
          return Mediator.subscribe('context:new', function() {
            var Model, context, e, guid, key, model, obj, opts, tool, variant, _i, _len, _results;
            context = arguments[0], guid = arguments[1], opts = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
            if (context == null) {
              context = [];
            }
            _results = [];
            for (_i = 0, _len = registry.length; _i < _len; _i++) {
              tool = registry[_i];
              _results.push((function() {
                var _j, _k, _len1, _len2, _ref2, _ref3, _results1;
                _ref2 = tool.labels;
                _results1 = [];
                for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                  variant = _ref2[_j];
                  assert(variant.place, 'Placement for a tool variant not provided');
                  if (!_.difference(variant.context || [], context).length) {
                    obj = _.clone(variant);
                    obj.name = window.Utils.hyphenToPascal(tool.slug);
                    _ref3 = ['slug', 'help'];
                    for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
                      key = _ref3[_k];
                      obj[key] = tool[key];
                    }
                    try {
                      Model = require("/steps/tools/" + obj.name + "/Model");
                      model = new Model();
                    } catch (_error) {
                      e = _error;
                      Chaplin.helpers.redirectTo('500');
                      assert(false, "Unknown tool `" + obj.name + "`");
                    }
                    obj.type = model.get('type');
                    if (guid) {
                      obj.guid = guid;
                    }
                    model.dispose();
                    if (opts.length !== 0) {
                      obj.extra = (obj.extra || []).concat(opts);
                    }
                    _results1.push(Mediator.publish('context:render', variant.place, context, obj, opts));
                  } else {
                    _results1.push(void 0);
                  }
                }
                return _results1;
              })());
            }
            return _results;
          }, this);
        };
      
        return InterMineSteps;
      
      })(Chaplin.Application);
      
    });

    
    // AssertException.coffee
    require.register('steps/client/src/core/AssertException.js', function(exports, require, module) {
    
      var AssertException;
      
      AssertException = (function() {
        function AssertException(message) {
          this.message = message;
        }
      
        AssertException.prototype.toString = function() {
          return "AssertException: " + this.message;
        };
      
        return AssertException;
      
      })();
      
      this.assert = function(exp, message) {
        if (!exp) {
          throw new AssertException(message);
        }
      };
      
    });

    
    // Collection.coffee
    require.register('steps/client/src/core/Collection.js', function(exports, require, module) {
    
      var Collection, Mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('./Mediator');
      
      module.exports = Collection = (function(_super) {
        __extends(Collection, _super);
      
        function Collection() {
          _ref = Collection.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        Collection.prototype.initialize = function() {
          Collection.__super__.initialize.apply(this, arguments);
          this.timeouts = [];
          return this;
        };
      
        Collection.prototype.dispose = function() {
          var t, _i, _len, _ref1;
          _ref1 = this.timeouts;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            t = _ref1[_i];
            clearTimeout(t);
          }
          Mediator.unsubscribe(null, null, this);
          return Collection.__super__.dispose.apply(this, arguments);
        };
      
        return Collection;
      
      })(Chaplin.Collection);
      
    });

    
    // Console.coffee
    require.register('steps/client/src/core/Console.js', function(exports, require, module) {
    
      this.console = this.console || {
        'log': function() {}
      };
      
      this.console.red = function(text) {
        return console.log("%c" + text, 'color: #FFF; background: #c60f13');
      };
      
      this.console.blue = function(text) {
        return console.log("%c" + text, 'color: #FFF; background: #2ba6cb');
      };
      
      this.console.grey = function(text) {
        return console.log("%c" + text, 'color: #505050; background: #e9e9e9');
      };
      
      this.console.green = function(text) {
        return console.log("%c" + text, 'color: #FFF; background: #5da423');
      };
      
    });

    
    // Controller.coffee
    require.register('steps/client/src/core/Controller.js', function(exports, require, module) {
    
      var Controller, Mediator, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('./Mediator');
      
      module.exports = Controller = (function(_super) {
        __extends(Controller, _super);
      
        function Controller() {
          _ref = Controller.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        Controller.prototype.views = [];
      
        Controller.prototype.initialize = function() {
          return Controller.__super__.initialize.apply(this, arguments);
        };
      
        Controller.prototype.dispose = function() {
          var view, _i, _len, _ref1;
          _ref1 = this.views;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            view = _ref1[_i];
            view.dispose();
          }
          return Controller.__super__.dispose.apply(this, arguments);
        };
      
        return Controller;
      
      })(Chaplin.Controller);
      
    });

    
    // Dispatcher.coffee
    require.register('steps/client/src/core/Dispatcher.js', function(exports, require, module) {
    
      var Dispatcher, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      module.exports = Dispatcher = (function(_super) {
        __extends(Dispatcher, _super);
      
        function Dispatcher() {
          _ref = Dispatcher.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        Dispatcher.prototype.controllerLoaded = function(controllerName, action, params, options, ControllerConstructor) {
          var acts, afterAction, afterActions, args, controller, name, next, _i, _len, _ref1,
            _this = this;
          Dispatcher.__super__.controllerLoaded.apply(this, arguments);
          controller = new ControllerConstructor(params, options);
          afterActions = [];
          args = arguments;
          _ref1 = Chaplin.utils.getAllPropertyVersions(controller, 'afterAction');
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            acts = _ref1[_i];
            for (name in acts) {
              afterAction = acts[name];
              if (name === action || RegExp("^" + name + "$").test(action)) {
                if (typeof afterAction === 'string') {
                  afterAction = controller[afterAction];
                }
                if (typeof afterAction !== 'function') {
                  throw new Error('Controller#executeAfterActions: ' + ("" + afterAction + " is not a valid afterAction method for " + name + "."));
                }
                afterActions.push(afterAction);
              }
            }
          }
          next = function(method, previous) {
            if (previous == null) {
              previous = null;
            }
            if (controller.redirected) {
              return;
            }
            if (!method) {
              return;
            }
            previous = method.call(controller, params, options, previous);
            if (previous && typeof previous.then === 'function') {
              return previous.then(function(data) {
                if (!_this.currentController || controller === _this.currentController) {
                  return next(afterActions.shift(), data);
                }
              });
            } else {
              return next(afterActions.shift(), previous);
            }
          };
          return next(afterActions.shift());
        };
      
        return Dispatcher;
      
      })(Chaplin.Dispatcher);
      
    });

    
    // Layout.coffee
    require.register('steps/client/src/core/Layout.js', function(exports, require, module) {
    
      var Layout, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      module.exports = Layout = (function(_super) {
        __extends(Layout, _super);
      
        function Layout() {
          _ref = Layout.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        Layout.prototype.showHistory = true;
      
        return Layout;
      
      })(Chaplin.Layout);
      
    });

    
    // LocalStorage.coffee
    require.register('steps/client/src/core/LocalStorage.js', function(exports, require, module) {
    
      var LocalStorage,
        __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
      
      module.exports = LocalStorage = (function() {
        function LocalStorage(name) {
          this.name = name;
          this.refreshKeys();
        }
      
        LocalStorage.prototype.refreshKeys = function() {
          var item;
          item = window.localStorage.getItem(this.name);
          return this.keys = (item && item.split(',')) || [];
        };
      
        LocalStorage.prototype.reset = function() {
          var key, _i, _len, _ref;
          _ref = this.keys;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            window.localStorage.removeItem(this.name + '-' + key);
          }
          this.keys = [];
          return this.save();
        };
      
        LocalStorage.prototype.add = function(model) {
          var key;
          assert(model.guid, 'Model `guid` not provided');
          window.localStorage.setItem(this.name + '-' + model.guid, JSON.stringify(model));
          key = model.guid.toString();
          if (__indexOf.call(this.keys, key) < 0) {
            this.keys.push(key);
          }
          return this.save();
        };
      
        LocalStorage.prototype.save = function() {
          return window.localStorage.setItem(this.name, this.keys.join(','));
        };
      
        LocalStorage.prototype.remove = function(model) {
          window.localStorage.removeItem(this.name + '-' + model.guid);
          this.keys.splice(this.keys.indexOf(model.guid), 1);
          return this.save();
        };
      
        LocalStorage.prototype.findAll = function() {
          var key, _i, _len, _ref, _results;
          this.refreshKeys();
          _ref = this.keys;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _results.push(JSON.parse(window.localStorage.getItem(this.name + '-' + key)));
          }
          return _results;
        };
      
        return LocalStorage;
      
      })();
      
    });

    
    // Mediator.coffee
    require.register('steps/client/src/core/Mediator.js', function(exports, require, module) {
    
      var mediator,
        __slice = [].slice;
      
      module.exports = mediator = {};
      
      mediator.publish = function() {
        var opts, _ref;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = Backbone.Events).trigger.apply(_ref, opts);
      };
      
      mediator.subscribe = function() {
        var opts, _ref;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        assert(opts.length === 3, 'Context for the subscriber not provided');
        return (_ref = Backbone.Events).on.apply(_ref, opts);
      };
      
      mediator.unsubscribe = function() {
        var channel, opts, _ref;
        opts = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if ((channel = opts[0]) != null) {
          assert(Backbone.Events._callbacks[channel] != null, "Unknown channel `" + channel + "`");
        }
        return (_ref = Backbone.Events).off.apply(_ref, opts);
      };
      
      mediator.channels = function() {
        return Object.keys(Backbone.Events._callbacks);
      };
      
      mediator.reset = function() {
        return Backbone.Events._callbacks = null;
      };
      
    });

    
    // Routes.coffee
    require.register('steps/client/src/core/Routes.js', function(exports, require, module) {
    
      module.exports = function(match) {
        match('', 'landing#index', {
          name: 'landing'
        });
        match('tool/:slug/new', 'tools#new', {
          name: 'new'
        });
        match('tool/:slug/:extra/new', 'tools#new', {
          name: 'new'
        });
        match('tool/:slug/continue/:guid', 'tools#cont', {
          name: 'cont'
        });
        match('tool/:slug/:extra/continue/:guid', 'tools#cont', {
          name: 'cont'
        });
        match('tool/id/:guid', 'tools#old', {
          name: 'old'
        });
        match('tool/id/:guid/results', 'tools#results', {
          name: 'results'
        });
        match('error/404', 'error#404', {
          name: '404'
        });
        match('error/500', 'error#500', {
          name: '500'
        });
        return match('app/reset', 'app#reset', {
          name: 'reset'
        });
      };
      
    });

    
    // Utils.coffee
    require.register('steps/client/src/core/Utils.js', function(exports, require, module) {
    
      this.Utils = {
        'isInt': function(input) {
          return typeof input === 'number' && input % 1 === 0;
        },
        'guid': function() {
          var s4;
          s4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          };
          return [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('');
        },
        'hyphenToPascal': function(text) {
          var x;
          return ((function() {
            var _i, _len, _ref, _results;
            _ref = text.split('-');
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              x = _ref[_i];
              _results.push(x.charAt(0).toUpperCase() + x.slice(1));
            }
            return _results;
          })()).join('');
        },
        'arrayEql': function(a, b) {
          if (!a || !b) {
            return false;
          }
          return !(a < b || b < a);
        },
        'inFocus': function(cb) {
          var change, hidden, onchange, prop, props, _i, _len, _ref;
          hidden = false;
          onchange = function(evt) {
            if (evt == null) {
              evt = window.event;
            }
            switch (evt.type) {
              case 'focus':
              case 'focusin':
                hidden = false;
                break;
              case 'blur':
              case 'focusout':
                hidden = true;
                break;
              default:
                hidden = !hidden;
            }
            if (!hidden) {
              return cb();
            }
          };
          props = [['hidden', 'visibilitychange'], ['mozHidden', 'mozvisibilitychange'], ['webkitHidden', 'webkitvisibilitychange'], ['msHidden', 'msvisibilitychange']];
          for (_i = 0, _len = props.length; _i < _len; _i++) {
            _ref = props[_i], prop = _ref[0], change = _ref[1];
            if (prop in document) {
              return document.addEventListener(change, onchange);
            }
          }
          if ('onfocusin' in document) {
            return document.onfocusin = document.onfocusout = onchange;
          }
          return window.onfocus = window.onblur = onchange;
        },
        'cloneDeep': function(val) {
          return JSON.parse(JSON.stringify(val));
        }
      };
      
    });

    
    // View.coffee
    require.register('steps/client/src/core/View.js', function(exports, require, module) {
    
      var Mediator, View, root, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('./Mediator');
      
      root = this;
      
      module.exports = View = (function(_super) {
        __extends(View, _super);
      
        function View() {
          _ref = View.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        View.prototype.initialize = function(options) {
          this.options = options;
          View.__super__.initialize.apply(this, arguments);
          this.views = [];
          this.timeouts = [];
          return this;
        };
      
        View.prototype.attach = function() {
          View.__super__.attach.apply(this, arguments);
          return $(this.el).attr('data-cid', this.cid);
        };
      
        View.prototype.dispose = function() {
          var t, v, _i, _j, _len, _len1, _ref1, _ref2;
          _ref1 = this.views;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            v = _ref1[_i];
            if (v != null) {
              v.dispose();
            }
          }
          _ref2 = this.timeouts;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            t = _ref2[_j];
            clearTimeout(t);
          }
          Mediator.unsubscribe(null, null, this);
          return View.__super__.dispose.apply(this, arguments);
        };
      
        View.prototype.property = function(data) {
          return root.Utils.cloneDeep(data);
        };
      
        return View;
      
      })(Chaplin.View);
      
    });

    
    // initialize.coffee
    require.register('steps/client/src/initialize.js', function(exports, require, module) {
    
      var root;
      
      root = this;
      
      $(function() {
        var History, InterMineSteps, View, routes;
        if (!(Modernizr.localstorage && Modernizr.history)) {
          View = require('./views/Error');
          return new View({
            'template': 'no-html5'
          });
        } else {
          InterMineSteps = require('./core/Application');
          routes = require('./core/Routes');
          History = require('./models/History');
          return (new History()).bootup(function(collection) {
            root.History = collection;
            return root.App = new InterMineSteps({
              'controllerPath': '/steps/client/src/controllers/',
              'controllerSuffix': '',
              routes: routes
            });
          });
        }
      });
      
    });

    
    // History.coffee
    require.register('steps/client/src/models/History.js', function(exports, require, module) {
    
      var Collection, Controller, History, LocalStorage, Mediator, Tool, root, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Collection = require('../core/Collection');
      
      Mediator = require('../core/Mediator');
      
      LocalStorage = require('../core/LocalStorage');
      
      Controller = require('../core/Controller');
      
      Tool = require('./Tool');
      
      root = this;
      
      module.exports = History = (function(_super) {
        __extends(History, _super);
      
        function History() {
          this.addTool = __bind(this.addTool, this);
          this.checkStorage = __bind(this.checkStorage, this);
          _ref = History.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        History.prototype['model'] = Tool;
      
        History.prototype.initialize = function() {
          History.__super__.initialize.apply(this, arguments);
          this.storage = new LocalStorage('Steps');
          Mediator.subscribe('history:add', this.addTool, this);
          return this.controller = new Controller();
        };
      
        History.prototype.bootup = function(cb) {
          var data, obj, _i, _len;
          data = this.storage.findAll();
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            obj = data[_i];
            this.add(obj);
          }
          root.Utils.inFocus(this.checkStorage);
          return cb(this);
        };
      
        History.prototype.checkStorage = function() {
          var guid, obj, _i, _len, _ref1, _results;
          _ref1 = this.storage.findAll();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            obj = _ref1[_i];
            guid = obj.guid;
            assert(guid, 'LocalStorage object has no `guid`');
            switch (this.where({
                  'guid': guid
                }).length) {
              case 0:
                console.log("Adding `" + guid + "`");
                _results.push(this.add(obj));
                break;
              case 1:
                break;
              default:
                _results.push(assert(false, 'Cannot have more than 1 object with the same `guid`'));
            }
          }
          return _results;
        };
      
        History.prototype.addTool = function(model, redirect) {
          var guid, locked, notfound;
          if (redirect == null) {
            redirect = true;
          }
          notfound = true;
          while (notfound) {
            guid = root.Utils.guid();
            if (this.where({
              'guid': guid
            }).length === 0) {
              notfound = false;
            }
          }
          model.set({
            'guid': guid
          });
          locked = model.get('locked');
          model.set({
            'locked': true
          });
          model.set('created', new Date());
          this.add(model);
          this.storage.add(model.toJSON());
          if (redirect != null) {
            return Chaplin.helpers.redirectTo('results', {
              'slug': model.get('slug'),
              guid: guid
            });
          }
        };
      
        History.prototype.dupe = function(model) {
          var Clazz, obj;
          obj = model.toJSON();
          Clazz = require("/steps/tools/" + obj.name + "/Model");
          return new Clazz(obj);
        };
      
        return History;
      
      })(Collection);
      
    });

    
    // Tool.coffee
    require.register('steps/client/src/models/Tool.js', function(exports, require, module) {
    
      var Tool, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      module.exports = Tool = (function(_super) {
        __extends(Tool, _super);
      
        function Tool() {
          _ref = Tool.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        return Tool;
      
      })(Chaplin.Model);
      
    });

    
    // action.eco
    require.register('steps/client/src/templates/action.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<!-- help text provided? -->\n');
          
            if (this.help) {
              __out.push('\n    <span class="entypo help -steps-ui" title="Show help for this item"></span>\n');
            }
          
            __out.push('\n\n<!-- the link -->\n');
          
            if (this.extra) {
              __out.push('\n    <a href="/tool/');
              __out.push(__sanitize(this.slug));
              __out.push('/');
              __out.push(__sanitize(this.extra));
              __out.push('/');
              __out.push(__sanitize(this.suffix));
              __out.push('">');
              __out.push(this.label);
              __out.push('</a>\n');
            } else {
              __out.push('\n    <a href="/tool/');
              __out.push(__sanitize(this.slug));
              __out.push('/');
              __out.push(__sanitize(this.suffix));
              __out.push('">');
              __out.push(this.label);
              __out.push('</a>\n');
            }
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // app.eco
    require.register('steps/client/src/templates/app.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div id="wrapper">\n    <!-- header, account etc. -->\n    <header id="top">\n        <div class="row">\n            <div class="third column">\n                <p>Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a></p>\n            </div>\n            <div class="first column">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n            <div class="second column">\n                <input id="search" type="text" placeholder="e.g. list upload, PPARG" />\n                <div id="always-on"></div>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="-steps-ui">\n        <!-- the tool -->\n        <div id="widget"></div>\n        <!-- from here -->\n        <aside id="right" class="-steps-ui"></aside>\n    </section>\n</div>\n\n<!-- tools used in the history -->\n<div id="history" class="-steps-ui"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // crumb.eco
    require.register('steps/client/src/templates/crumb.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<span class="entypo rightopen -steps-ui"></span>\n<a href="/tool/id/');
          
            __out.push(__sanitize(this.guid));
          
            __out.push('">');
          
            __out.push(__sanitize(this.title));
          
            __out.push('</a>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // error-404.eco
    require.register('steps/client/src/templates/error-404.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="row">\n            <div class="first column">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow -steps-ui">\n        <div id="landing" class="row">\n            <h2>404, Not Found</h2>\n        </div>\n    </section>\n</div>\n\n<footer id="wide" class="-steps-ui">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // error-500.eco
    require.register('steps/client/src/templates/error-500.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="row">\n            <div class="first column">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow -steps-ui">\n        <div id="landing" class="row">\n            <h2>500, Internal App Error</h2>\n        </div>\n    </section>\n</div>\n\n<footer id="wide" class="-steps-ui">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // error-no-html5.eco
    require.register('steps/client/src/templates/error-no-html5.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="row">\n            <div class="first column">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow -steps-ui">\n        <div id="landing" class="row">\n            <h2>Your browser does not support either <a href="http://diveintohtml5.info/storage.html" target="_new">localStorage</a> or <a href="http://diveintohtml5.info/history.html" target="_new">pushState</a>, sadness &hellip;</h2>\n            <p>Please use a different browser or disable a browser addon (related to cookies etc.) that could be blocking the functionality.</p>\n        </div>\n    </section>\n</div>\n\n<footer id="wide" class="-steps-ui">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // history-tool.eco
    require.register('steps/client/src/templates/history-tool.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<em class="ago"></em>\n<div class="wrap">\n    <a href="/tool/id/');
          
            __out.push(__sanitize(this.guid));
          
            __out.push('">\n        <div class="box -steps-ui">\n            <h5>');
          
            __out.push(__sanitize(this.name));
          
            __out.push('</h5>\n            ');
          
            if (this.description.length > 15) {
              __out.push('\n                <p title="');
              __out.push(__sanitize(this.description));
              __out.push('">');
              __out.push(this.description.slice(0, 15));
              __out.push(' &hellip;</p>\n            ');
            } else {
              __out.push('\n                <p>');
              __out.push(this.description);
              __out.push('</p>\n            ');
            }
          
            __out.push('\n        </div>\n    </a>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // history.eco
    require.register('steps/client/src/templates/history.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="head">\n    <a class="serialize button -steps-ui">Serialize</a>\n    <a class="hide secondary button -steps-ui" style="margin-right:10px">Hide</a>\n    <a href="/app/reset" class="button secondary -steps-ui" style="margin-right:10px">Clear</a>\n    <h1><span class="entypo flowbranch -steps-ui"></span> History</h1>\n    <p class="message">Steps you have taken will be populated here as you work with this app.</p>\n</div>\n\n<div id="tools">\n    <svg class="canvas"></svg>\n    <table class="grid"></table>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // apps-a.eco
    require.register('steps/client/src/templates/iframe/apps-a.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<!doctype html>\n<html>\n<head>\n    <meta charset="utf-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n\n    <script src="/iframe/im.apps-a.bundle.js"></script>\n</head>\n<body>\n    <script>\n    (function() {\n        var channel = new Pomme({ \'scope\': \'apps-a\' });\n        channel.on(\'load\', function(name, opts) {\n            var apps = new intermine.appsA(document.location.origin);\n            apps.load(name, \'body\', opts);\n        });\n    })();\n    </script>\n</body>\n</html>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // imtables.eco
    require.register('steps/client/src/templates/iframe/imtables.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<!doctype html>\n<html>\n<head>\n    <meta charset="utf-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n    <link rel="stylesheet" href="/iframe/im.tables.bundle.css" />\n    <script src="/iframe/im.tables.bundle.js"></script>\n</head>\n<body>\n    <script>\n    (function() {\n        var channel = new Pomme({ \'scope\': \'imtables\' });\n        channel.on(\'show\', function(config) {\n            config.service = new intermine.Service({\n                \'root\': config.mine,\n                \'token\': config.token,\n                errorHandler: function(err) {\n                    throw err;\n                }\n            })\n            config.type = (config.type) ? config.type : \'table\';\n            $(\'body\').imWidget(config);\n        });\n    })();\n    </script>\n</body>\n</html>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // widgets.eco
    require.register('steps/client/src/templates/iframe/widgets.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<!doctype html>\n<html>\n<head>\n    <meta charset="utf-8" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">\n    <link rel="stylesheet" href="/iframe/im.widgets.bundle.css" />\n    <script src="/iframe/im.widgets.bundle.js"></script>\n</head>\n<body>\n    <script>\n    (function() {\n        var channel = new Pomme({ \'scope\': \'widgets\' });\n        channel.on(\'show\', function(config) {\n            var widgets = new window[\'list-widgets\']({\n                \'root\': config.mine + \'/service/\',\n                \'token\': config.token\n            });\n            widgets[config.type](config.id, config.list, \'body\', {});\n        });\n    })();\n    </script>\n</body>\n</html>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // landing.eco
    require.register('steps/client/src/templates/landing.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="row">\n            <div class="first column">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n            <div class="second column">\n                <input id="search" type="text" placeholder="e.g. list upload, PPARG" />\n            </div>\n            <div class="third column">\n                <p>Monsieur Tout-le-Monde <span>&#8226;</span> <a href="app/reset">Reset Database</a> <span>&#8226;</span> <a>Logout</a></p>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow container -steps-ui">\n        <div class="row -steps-ui">\n            <div class="first column -steps-ui">\n                <div class="nobox -steps-ui">\n                    <h2><span class="entypo lifebuoy -steps-ui"></span> Help</h2>\n                    <ul class="tools -steps-ui">\n                        <li><a>What is <strong>new</strong> since 1.2</a></li>\n                        <li><a>How do I use my <strong>tools</strong></a></li>\n                        <li><a>Where are my <strong>templates</strong></a></li>\n                        <li><a>How do I <strong>cite</strong> this resource</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class="second column -steps-ui">\n                <div class="box -steps-ui">\n                    <h2><span class="entypo crossroads -steps-ui"></span> Tools</h2>\n                    <!-- populate next steps here -->\n                    <div id="next"></div>\n                </div>\n            </div>\n            <div class="third column -steps-ui">\n                <div class="box -steps-ui">\n                    <table class="tabs -steps-ui">\n                        <tr>\n                            <td class="active labeled">\n                                <div>\n                                    <h3>Messages</h3><span class="count">9</span>\n                                </div>\n                            </td>\n                            <td class="inactive">\n                                <div>\n                                    <h3>Continue research</h3>\n                                </div>\n                            </td>\n                        </tr>\n                    </table>\n                    <div class="content">\n                        <ul class="timeline -steps-ui">\n                            <li>\n                                <div class="head">\n                                    <span class="ago">3m ago</span>\n                                    <span class="entypo database -steps-ui"></span><h5>System upgrade</h5>\n                                </div>\n                                <p>The system has been upgraded to the latest version <code>1.2.0</code>.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="ago">A day ago</span>\n                                    <span class="entypo download -steps-ui"></span><h5>Shared list</h5>\n                                </div>\n                                <p>A list <a>Secret Research Genes</a> has been shared with you.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="ago">Jan 27</span>\n                                    <span class="entypo database -steps-ui"></span><h5>System upgrade</h5>\n                                </div>\n                                <p>The system will go down in 30 minutes.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="ago">Jan 26</span>\n                                    <span class="entypo clipboard -steps-ui"></span><h5>Job finished</h5>\n                                </div>\n                                <p>Your job <a>Enriching a List</a> has finished.</p>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide" class="-steps-ui">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // next-steps-header.eco
    require.register('steps/client/src/templates/next-steps-header.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="tools"><!-- tool labels go here --></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // next-steps.eco
    require.register('steps/client/src/templates/next-steps.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="-steps-ui">\n    <div class="tools"><!-- tool labels go here --></div>\n    <a class="tiny secondary button show-truncated -steps-ui">&hellip;</a>\n    <p class="noactions">The filter matched no actions.</p>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // sidebar-right.eco
    require.register('steps/client/src/templates/sidebar-right.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<table class="tabs -steps-ui">\n    <tr>\n        <td class="active"><div><h3>Next Steps</h3></div></td>\n        <td class="inactive"><div><h3>Research Notes</h3></div></td>\n    </tr>\n</table>\n<div class="content">\n    <div id="continue"></div>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // tool.eco
    require.register('steps/client/src/templates/tool.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            var i, title, _ref;
          
            __out.push('<div class="wrap sidebar">\n    <!-- dynamically populated with event handling -->\n    <ul class="breadcrumbs -steps-ui"></ul>\n\n    <div class="head -steps-ui">\n        <h1 class="');
          
            __out.push(__sanitize(this.type));
          
            __out.push('">');
          
            __out.push(__sanitize(this.title));
          
            __out.push('</h1>\n        <em class="ago"></em>\n    </div>\n\n    <ul class="accordion -steps-ui">\n        <!-- we are hardcoding only two steps possible -->\n        ');
          
            _ref = ['Input', 'Output'];
            for (i in _ref) {
              title = _ref[i];
              __out.push('\n            ');
              i = parseInt(i) + 1;
              __out.push('\n            <li class="');
              __out.push(__sanitize(this.type));
              if (i === this.step) {
                __out.push(' active');
              }
              if (i > this.step) {
                __out.push(' inactive');
              }
              __out.push('" data-step="');
              __out.push(__sanitize(i));
              __out.push('">\n                <div class="title">\n                    <!-- first step and root provided and us not on it? -->\n                    ');
              if (i === 1 && i !== this.step && this.root) {
                __out.push('\n                        <h5><a href="/tool/id/');
                __out.push(__sanitize(this.root));
                __out.push('">');
                __out.push(__sanitize(title));
                __out.push('</a></h5>\n                    ');
              } else {
                __out.push('\n                        <h5>');
                __out.push(__sanitize(title));
                __out.push('</h5>\n                    ');
              }
              __out.push('\n                </div>\n                <div class="content -steps-tool">Loading content &hellip;</div>\n            </li>\n        ');
            }
          
            __out.push('\n    </ul>\n</div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // Action.coffee
    require.register('steps/client/src/views/Action.js', function(exports, require, module) {
    
      var ActionView, Mediator, View, root, template, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      Mediator = require('../core/Mediator');
      
      template = require('../templates/action');
      
      root = this;
      
      module.exports = ActionView = (function(_super) {
        __extends(ActionView, _super);
      
        function ActionView() {
          this.showHelp = __bind(this.showHelp, this);
          _ref = ActionView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ActionView.prototype.containerMethod = 'html';
      
        ActionView.prototype.autoRender = true;
      
        ActionView.prototype.tagName = 'li';
      
        ActionView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        ActionView.prototype.getTemplateData = function() {
          return _.extend(root.Utils.cloneDeep(this.options), {
            'label': this.markup(this.options.label)
          });
        };
      
        ActionView.prototype.attach = function() {
          var words,
            _this = this;
          ActionView.__super__.attach.apply(this, arguments);
          $(this.el).addClass(function() {
            var classes;
            classes = [_this.options.type, _this.options.labelClass, 'new'];
            if (_this.options.weight < 10) {
              classes.push('hidden');
            }
            return classes.join(' ');
          });
          words = this.options.label.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase().split(' ');
          this.keywords = _.uniq(words.concat(this.options.keywords)).join(' ');
          this.delegate('click', '.help', this.showHelp);
          return setTimeout(function() {
            return $(_this.el).removeClass('new');
          }, 100);
        };
      
        ActionView.prototype.markup = function(text) {
          text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>");
          return text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
        };
      
        ActionView.prototype.showHelp = function() {
          assert(this.options.help, 'Help content is not provided');
          return console.log({
            'title': this.markup(this.options.label),
            'text': this.options.help
          });
        };
      
        return ActionView;
      
      })(View);
      
    });

    
    // App.coffee
    require.register('steps/client/src/views/App.js', function(exports, require, module) {
    
      var AppView, Mediator, View, root, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      Mediator = require('../core/Mediator');
      
      template = require('../templates/app');
      
      root = this;
      
      module.exports = AppView = (function(_super) {
        __extends(AppView, _super);
      
        function AppView() {
          _ref = AppView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        AppView.prototype.container = 'body';
      
        AppView.prototype.containerMethod = 'html';
      
        AppView.prototype.autoRender = true;
      
        AppView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        AppView.prototype.getTemplateData = function() {
          return {
            'showHistory': root.Layout.showHistory
          };
        };
      
        AppView.prototype.attach = function() {
          AppView.__super__.attach.apply(this, arguments);
          this.delegate('click', '.button[data-action="history-toggle"]', this.historyToggle);
          this.delegate('click', 'header#top h1', function() {
            return Mediator.publish('router:landing');
          });
          this.delegate('keyup', 'input#search', function(e) {
            return Mediator.publish('app:search', $(e.target).val());
          });
          $('body').addClass('app');
          return this;
        };
      
        AppView.prototype.historyToggle = function(e) {
          var btn;
          btn = $(e.target);
          if (btn.attr('data-show') === '0') {
            btn.text('Hide history');
            btn.attr('data-show', '1');
          } else {
            btn.text('Show history');
            btn.attr('data-show', '0');
          }
          return Mediator.publish('history:toggle');
        };
      
        return AppView;
      
      })(View);
      
    });

    
    // Crumb.coffee
    require.register('steps/client/src/views/Crumb.js', function(exports, require, module) {
    
      var CrumbView, View, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      template = require('../templates/crumb');
      
      module.exports = CrumbView = (function(_super) {
        __extends(CrumbView, _super);
      
        function CrumbView() {
          _ref = CrumbView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        CrumbView.prototype.containerMethod = 'html';
      
        CrumbView.prototype.autoRender = true;
      
        CrumbView.prototype.tagName = 'li';
      
        CrumbView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        return CrumbView;
      
      })(View);
      
    });

    
    // Error.coffee
    require.register('steps/client/src/views/Error.js', function(exports, require, module) {
    
      var ErrorView, View, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      module.exports = ErrorView = (function(_super) {
        __extends(ErrorView, _super);
      
        function ErrorView() {
          _ref = ErrorView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ErrorView.prototype.container = 'body';
      
        ErrorView.prototype.containerMethod = 'html';
      
        ErrorView.prototype.autoRender = true;
      
        ErrorView.prototype.getTemplateFunction = function() {
          return require("../templates/error-" + this.options.template);
        };
      
        return ErrorView;
      
      })(View);
      
    });

    
    // GenericTool.coffee
    require.register('steps/client/src/views/GenericTool.js', function(exports, require, module) {
    
      var GenericToolView, View, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      module.exports = GenericToolView = (function(_super) {
        __extends(GenericToolView, _super);
      
        function GenericToolView() {
          this.updateTime = __bind(this.updateTime, this);
          _ref = GenericToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        GenericToolView.prototype.updateTime = function(el) {
          var a, b, c, created, date, guid, queue, _ref1,
            _this = this;
          assert(this.model && (guid = this.model.get('guid')), 'Model is not set or is incomplete, cannot time update');
          created = this.model.get('created');
          assert(created, "Created date not provided for model `" + guid + "`");
          date = new Date(this.model.get('created'));
          assert(!(isNaN(date.getTime())), "Invalid created date `" + created + "`");
          c = null;
          _ref1 = [0, 1], a = _ref1[0], b = _ref1[1];
          return (queue = function() {
            var d, _ref2, _ref3;
            d = moment(date).fromNow();
            if (c !== d) {
              _ref2 = [0, 1], a = _ref2[0], b = _ref2[1];
              el.text(c = d);
            } else {
              _ref3 = [b, a + b], a = _ref3[0], b = _ref3[1];
            }
            return _this.timeouts.push(setTimeout(queue, b * 1e3));
          })();
        };
      
        return GenericToolView;
      
      })(View);
      
    });

    
    // History.coffee
    require.register('steps/client/src/views/History.js', function(exports, require, module) {
    
      var Controller, HistoryToolView, HistoryView, Mediator, Tool, View, root, template, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      View = require('../core/View');
      
      Controller = require('../core/Controller');
      
      HistoryToolView = require('./HistoryTool');
      
      Tool = require('../models/Tool');
      
      template = require('../templates/history');
      
      root = this;
      
      module.exports = HistoryView = (function(_super) {
        __extends(HistoryView, _super);
      
        function HistoryView() {
          this.renderTool = __bind(this.renderTool, this);
          this.resetTable = __bind(this.resetTable, this);
          this.toggleHistory = __bind(this.toggleHistory, this);
          this.checkCollection = __bind(this.checkCollection, this);
          _ref = HistoryView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        HistoryView.prototype['container'] = '#history';
      
        HistoryView.prototype['containerMethod'] = 'html';
      
        HistoryView.prototype['autoRender'] = true;
      
        HistoryView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        HistoryView.prototype.initialize = function() {
          HistoryView.__super__.initialize.apply(this, arguments);
          this.rows = 0;
          this.cols = 0;
          this.grid = [];
          this.guids = {};
          Mediator.subscribe('history:render', this.renderTool, this);
          return Mediator.subscribe('history:toggle', this.toggleHistory, this);
        };
      
        HistoryView.prototype.attach = function() {
          var height,
            _this = this;
          HistoryView.__super__.attach.apply(this, arguments);
          this.tools = $(this.el).find('#tools');
          (height = function() {
            return _this.tools.css('height', ($(window).height() * .33) - 85);
          })();
          $(window).resize(height);
          this.checkCollection();
          this.delegate('click', '.serialize', this.serializeHistory);
          this.delegate('click', '.hide', this.toggleHistory);
          if (!root.Layout.showHistory) {
            $(this.el).hide();
          }
          return this;
        };
      
        HistoryView.prototype.checkCollection = function() {
          var _this = this;
          this.collection.each(function(model) {
            var guid;
            guid = model.get('guid');
            if (!_this.guids[guid]) {
              return _this.renderTool(model);
            }
          });
          return this.timeouts.push(setTimeout(this.checkCollection, 1e3));
        };
      
        HistoryView.prototype.toggleHistory = function() {
          $(this.el).fadeToggle();
          return root.Layout.showHistory = !root.Layout.showHistory;
        };
      
        HistoryView.prototype.resetTable = function() {
          this.rows = 0;
          this.cols = 0;
          d3.select($(this.el).find('svg.canvas')[0]).selectAll('*').remove();
          return $(this.el).find('table.grid').html('');
        };
      
        HistoryView.prototype.addRow = function() {
          var el, i, row, table, _base, _i, _ref1;
          table = $(this.el).find('table.grid');
          row = $('<tr/>', {
            'data-row': this.rows
          });
          for (i = _i = 0, _ref1 = this.cols; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
            row.append(el = $('<td/>', {
              'data-col': i
            }));
            if ((_base = this.grid)[i] == null) {
              _base[i] = [];
            }
            this.grid[i][this.rows] = el;
          }
          table.append(row);
          return this.rows += 1;
        };
      
        HistoryView.prototype.addCol = function() {
          var el, i, table, _base, _i, _name, _ref1;
          table = $(this.el).find('table.grid');
          for (i = _i = 0, _ref1 = this.rows; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
            table.find("tr[data-row=" + i + "]").append(el = $('<td/>', {
              'data-col': this.cols
            }));
            if ((_base = this.grid)[_name = this.cols] == null) {
              _base[_name] = [];
            }
            this.grid[this.cols][i] = el;
          }
          return this.cols += 1;
        };
      
        HistoryView.prototype.renderTool = function(model) {
          var col, parent, pos, row, step, temp;
          this.views.push(step = new HistoryToolView({
            'model': model
          }));
          if (parent = model.get('parent')) {
            assert(pos = this.guids[parent], "Parent element `" + parent + "` is not rendered first");
            if (pos.col + 1 >= this.cols) {
              this.addCol();
              this.grid[col = pos.col + 1][row = pos.row].append(step.el);
            } else {
              if (!(temp = this.grid[col = pos.col + 1][row = pos.row]).children().length) {
                temp.append(step.el);
              } else {
                this.addRow();
                this.grid[col = pos.col + 1][row = this.rows - 1].append(step.el);
              }
            }
            this.drawConnector(pos, {
              'col': col,
              'row': row
            });
          } else {
            this.addRow();
            if (this.cols < 1) {
              this.addCol();
            }
            this.grid[col = 0][row = this.rows - 1].append(step.el);
          }
          this.guids[model.get('guid')] = {
            'col': col,
            'row': row
          };
          $(this.el).find('#tools > *').css('width', 120 * this.cols);
          return $(this.el).find('p.message').hide();
        };
      
        HistoryView.prototype.drawConnector = function(a, b) {
          var height, pos, svg, width, x1, x2, y1, y2, _ref1, _ref2;
          width = 120;
          height = 40;
          if (!a) {
            return;
          }
          pos = function(col, row) {
            var x, y;
            x = ((col + 1) * width) - (width / 2);
            y = ((row + 1) * height) - (height / 2) + 5;
            return [x, y];
          };
          _ref1 = pos(a.col, a.row), x1 = _ref1[0], y1 = _ref1[1];
          _ref2 = pos(b.col, b.row), x2 = _ref2[0], y2 = _ref2[1];
          assert(x1 && y1 && x2 && y2, 'We do not have element position for all elements');
          svg = d3.select($(this.el).find('svg.canvas')[0]);
          svg.append('svg:line').attr('class', 'connector').attr('x1', x1).attr('x2', x2).attr('y1', y1).attr('y2', y2);
          a = y1;
          if (y2 > y1) {
            a = y2;
          }
          if ((b = parseInt(svg.attr('height'))) < a || !b) {
            return svg.attr('height', a + 'px');
          }
        };
      
        HistoryView.prototype.serializeHistory = function() {
          return console.log({
            'title': 'Your history serialized',
            'code': {
              'src': JSON.stringify(window.History.models, null, 4),
              'lang': 'json'
            }
          });
        };
      
        return HistoryView;
      
      })(View);
      
    });

    
    // HistoryTool.coffee
    require.register('steps/client/src/views/HistoryTool.js', function(exports, require, module) {
    
      var GenericToolView, HistoryToolView, Mediator, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      GenericToolView = require('./GenericTool');
      
      template = require('../templates/history-tool');
      
      module.exports = HistoryToolView = (function(_super) {
        __extends(HistoryToolView, _super);
      
        function HistoryToolView() {
          _ref = HistoryToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        HistoryToolView.prototype['containerMethod'] = 'html';
      
        HistoryToolView.prototype['autoRender'] = true;
      
        HistoryToolView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        HistoryToolView.prototype.getTemplateData = function() {
          return this.model.toJSON();
        };
      
        HistoryToolView.prototype.initialize = function() {
          var _this = this;
          HistoryToolView.__super__.initialize.apply(this, arguments);
          Mediator.subscribe('history:activate', function(guid) {
            if (_this.model.get('guid') === guid) {
              return $(_this.el).addClass('active');
            } else {
              return $(_this.el).removeClass('active');
            }
          }, this);
          return this;
        };
      
        HistoryToolView.prototype.attach = function() {
          HistoryToolView.__super__.attach.apply(this, arguments);
          $(this.el).attr('class', "" + (this.model.get('type')) + " step").attr('data-id', this.model.id);
          this.updateTime($(this.el).find('em.ago'));
          return this;
        };
      
        return HistoryToolView;
      
      })(GenericToolView);
      
    });

    
    // Landing.coffee
    require.register('steps/client/src/views/Landing.js', function(exports, require, module) {
    
      var LandingView, Mediator, NextStepsAllView, View, registry, root, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      View = require('../core/View');
      
      NextStepsAllView = require('./NextStepsAll');
      
      template = require('../templates/landing');
      
      registry = require('/steps/tools/config').registry;
      
      root = this;
      
      module.exports = LandingView = (function(_super) {
        __extends(LandingView, _super);
      
        function LandingView() {
          _ref = LandingView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        LandingView.prototype.container = 'body';
      
        LandingView.prototype.containerMethod = 'html';
      
        LandingView.prototype.autoRender = true;
      
        LandingView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        LandingView.prototype.attach = function() {
          LandingView.__super__.attach.apply(this, arguments);
          this.views.push(new NextStepsAllView());
          this.delegate('keyup', 'input#search', function(e) {
            return Mediator.publish('app:search', $(e.target).val());
          });
          $('body').removeClass('app');
          return this;
        };
      
        return LandingView;
      
      })(View);
      
    });

    
    // NextSteps.coffee
    require.register('steps/client/src/views/NextSteps.js', function(exports, require, module) {
    
      var Action, Mediator, NextStepsView, View, root, template, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      View = require('../core/View');
      
      Action = require('./Action');
      
      template = require('../templates/next-steps');
      
      root = this;
      
      module.exports = NextStepsView = (function(_super) {
        __extends(NextStepsView, _super);
      
        function NextStepsView() {
          this.showHidden = __bind(this.showHidden, this);
          this.filterLabels = __bind(this.filterLabels, this);
          this.add = __bind(this.add, this);
          _ref = NextStepsView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        NextStepsView.prototype.containerMethod = 'html';
      
        NextStepsView.prototype.autoRender = true;
      
        NextStepsView.prototype.tagName = 'div';
      
        NextStepsView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        NextStepsView.prototype.initialize = function() {
          var _this = this;
          NextStepsView.__super__.initialize.apply(this, arguments);
          this.context = [];
          assert(this.place, 'Placement for these NextSteps not defined');
          return Mediator.subscribe('context:render', function(place, context, obj) {
            if (_this.place === place) {
              return _this.add(obj);
            }
          }, this);
        };
      
        NextStepsView.prototype.attach = function() {
          var list;
          NextStepsView.__super__.attach.apply(this, arguments);
          this.list = {
            'children': {},
            'entries': list = $('<ul/>', {
              'class': 'tools -steps-ui'
            })
          };
          $(this.el).find('div.tools').append(list);
          Mediator.publish('context:new');
          Mediator.subscribe('app:search', this.filterLabels, this);
          this.delegate('click', '.show-truncated', this.showHidden);
          return this.noActions = $(this.el).find('p.noactions');
        };
      
        NextStepsView.prototype.add = function() {
          var cat, context, dom, i, list, obj, suffix, target, view, _ref1;
          assert(this.method, 'We do not know which linking `method` to use');
          switch (arguments.length) {
            case 1:
              obj = arguments[0];
              break;
            case 2:
              context = arguments[0], obj = arguments[1];
              assert(context && context instanceof Array, 'Context not a list');
              break;
            default:
              assert(false, 'Incorrect number of parameters');
          }
          $(this.el).find('input.filter').show();
          if (this.method === 'continue' && obj.guid) {
            suffix = "continue/" + obj.guid;
          } else {
            suffix = 'new';
          }
          if (obj.category && obj.category instanceof Array) {
            dom = this.list;
            target = $(this.el).find('div.tools');
            _ref1 = obj.category;
            for (i in _ref1) {
              cat = _ref1[i];
              dom = dom.children;
              if (!dom[cat]) {
                target.append($('<h4/>', {
                  'html': cat,
                  'class': "size-" + i
                }));
                dom[cat] = {
                  'children': {},
                  'entries': list = $('<ul/>', {
                    'class': "tools size-" + i + " -steps-ui"
                  })
                };
                target.append(list);
              }
              dom = dom[cat];
            }
          } else {
            dom = this.list;
          }
          if (!(function(views) {
            var view, _i, _len;
            for (_i = 0, _len = views.length; _i < _len; _i++) {
              view = views[_i];
              if (view.options.label === obj.label) {
                return true;
              }
            }
            return false;
          })(this.views)) {
            this.views.push(view = new Action(_.extend(obj, {
              'suffix': suffix,
              'keywords': obj.keywords || [],
              'labelClass': this.labelClass || ''
            })));
            dom.entries.append(view.el);
            if (obj.weight < 10) {
              return $(this.el).find('.show-truncated').show();
            }
          }
        };
      
        NextStepsView.prototype.filterLabels = function(query) {
          var _this = this;
          assert(typeof query === 'string', 'Query input not provided');
          if (this.timeout != null) {
            clearTimeout(this.timeout);
          }
          return this.timeout = setTimeout((function() {
            var part, re, view, _i, _j, _len, _len1, _ref1, _ref2;
            _this.showHidden();
            query = _.uniq($.trim(query.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase()).split(' '));
            if (!root.Utils.arrayEql(query, _this.query)) {
              _this.query = query;
              re = new RegExp(((function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = query.length; _i < _len; _i++) {
                  part = query[_i];
                  _results.push("" + part + ".*");
                }
                return _results;
              })()).join('|'), 'i');
              _ref1 = _this.views;
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                view = _ref1[_i];
                if (view.keywords.match(re)) {
                  $(view.el).show();
                } else {
                  $(view.el).hide();
                }
              }
            }
            if (_this.views.length !== 0) {
              _this.noActions.hide();
              _ref2 = _this.views;
              for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                view = _ref2[_j];
                if ($(view.el).is(':visible')) {
                  return;
                }
              }
              return _this.noActions.show();
            }
          }), 0);
        };
      
        NextStepsView.prototype.showHidden = function(e) {
          if (e) {
            $(e.target).remove();
          } else {
            $(this.el).find('.show').remove();
          }
          return $(this.el).find('.hidden').removeClass('hidden');
        };
      
        return NextStepsView;
      
      })(View);
      
    });

    
    // NextStepsAll.coffee
    require.register('steps/client/src/views/NextStepsAll.js', function(exports, require, module) {
    
      var Mediator, NextStepsAllView, NextStepsView, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      NextStepsView = require('./NextSteps');
      
      module.exports = NextStepsAllView = (function(_super) {
        __extends(NextStepsAllView, _super);
      
        function NextStepsAllView() {
          _ref = NextStepsAllView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        NextStepsAllView.prototype.container = '#next';
      
        NextStepsAllView.prototype.method = 'new';
      
        NextStepsAllView.prototype.place = 'home';
      
        return NextStepsAllView;
      
      })(NextStepsView);
      
    });

    
    // NextStepsHeader.coffee
    require.register('steps/client/src/views/NextStepsHeader.js', function(exports, require, module) {
    
      var Mediator, NextStepsHeaderView, NextStepsView, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      NextStepsView = require('./NextSteps');
      
      template = require('../templates/next-steps-header');
      
      module.exports = NextStepsHeaderView = (function(_super) {
        __extends(NextStepsHeaderView, _super);
      
        function NextStepsHeaderView() {
          _ref = NextStepsHeaderView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        NextStepsHeaderView.prototype.container = '#always-on';
      
        NextStepsHeaderView.prototype.method = 'new';
      
        NextStepsHeaderView.prototype.place = 'header';
      
        NextStepsHeaderView.prototype.labelClass = 'button -steps-ui';
      
        NextStepsHeaderView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        return NextStepsHeaderView;
      
      })(NextStepsView);
      
    });

    
    // NextStepsRight.coffee
    require.register('steps/client/src/views/NextStepsRight.js', function(exports, require, module) {
    
      var Mediator, NextStepsRightView, NextStepsView, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      NextStepsView = require('./NextSteps');
      
      module.exports = NextStepsRightView = (function(_super) {
        __extends(NextStepsRightView, _super);
      
        function NextStepsRightView() {
          _ref = NextStepsRightView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        NextStepsRightView.prototype.container = '#continue';
      
        NextStepsRightView.prototype.method = 'continue';
      
        NextStepsRightView.prototype.place = 'right';
      
        return NextStepsRightView;
      
      })(NextStepsView);
      
    });

    
    // RightSidebar.coffee
    require.register('steps/client/src/views/RightSidebar.js', function(exports, require, module) {
    
      var NextStepsRightView, RightSidebarView, View, template, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      View = require('../core/View');
      
      NextStepsRightView = require('./NextStepsRight');
      
      template = require('../templates/sidebar-right');
      
      module.exports = RightSidebarView = (function(_super) {
        __extends(RightSidebarView, _super);
      
        function RightSidebarView() {
          _ref = RightSidebarView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        RightSidebarView.prototype.container = 'aside#right';
      
        RightSidebarView.prototype.containerMethod = 'html';
      
        RightSidebarView.prototype.autoRender = true;
      
        RightSidebarView.prototype.getTemplateFunction = function() {
          return template;
        };
      
        RightSidebarView.prototype.attach = function() {
          RightSidebarView.__super__.attach.apply(this, arguments);
          this.views.push(new NextStepsRightView());
          return this;
        };
      
        return RightSidebarView;
      
      })(View);
      
    });

    
    // Tool.coffee
    require.register('steps/client/src/views/Tool.js', function(exports, require, module) {
    
      var CrumbView, GenericToolView, Mediator, Tool, ToolView, root, _ref,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('../core/Mediator');
      
      Tool = require('../models/Tool');
      
      GenericToolView = require('./GenericTool');
      
      CrumbView = require('./Crumb');
      
      root = this;
      
      module.exports = ToolView = (function(_super) {
        __extends(ToolView, _super);
      
        function ToolView() {
          this.checkCrumbs = __bind(this.checkCrumbs, this);
          _ref = ToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ToolView.prototype.container = '#widget';
      
        ToolView.prototype.containerMethod = 'html';
      
        ToolView.prototype.autoRender = true;
      
        ToolView.prototype.getTemplateFunction = function() {
          return require('../templates/tool');
        };
      
        ToolView.prototype.getTemplateData = function() {
          var data, extra, _ref1;
          data = _.extend(this.model.toJSON(), {
            'step': this.step
          });
          if (this.options.previous) {
            data = _.extend(data, {
              'previous': (_ref1 = this.options.previous) != null ? _ref1.data : void 0
            });
          }
          if ((extra = this.options.extra) && !(extra instanceof Array)) {
            this.options.extra = extra.split(',');
          }
          if (data.locked != null) {
            data.root = root.History.models.slice(-1)[0].attributes.guid;
          }
          return data;
        };
      
        ToolView.prototype.initialize = function() {
          var extra;
          ToolView.__super__.initialize.apply(this, arguments);
          if ((extra = this.options.extra) && !(extra instanceof Array)) {
            this.options.extra = extra.split(',');
          }
          return this.step = this.options.step || 1;
        };
      
        ToolView.prototype.attach = function() {
          var content, name;
          ToolView.__super__.attach.apply(this, arguments);
          this.crumbs = [];
          name = this.model.get('name');
          assert(name, 'Name of the tool is not provided');
          content = $(this.el).find("ul.accordion li[data-step='" + this.step + "'] div.content");
          content.html((require("/steps/tools/" + name + "/step-" + this.step))(this.getTemplateData()));
          this.checkCrumbs();
          if (this.model.get('locked') != null) {
            this.updateTime($(this.el).find('em.ago'));
          }
          return this;
        };
      
        ToolView.prototype.disposeIframe = function() {
          if (this.intervals && this.intervals instanceof Array) {
            _.map(this.intervals, clearInterval);
          }
          if (this.pomme) {
            return this.pomme.dispose();
          }
        };
      
        ToolView.prototype.dispose = function() {
          this.disposeIframe();
          return ToolView.__super__.dispose.apply(this, arguments);
        };
      
        ToolView.prototype.checkCrumbs = function() {
          var collection, crumb, crumbs, guids, model, models, v, _fn, _i, _j, _len, _len1, _ref1,
            _this = this;
          collection = root.History;
          if (collection.length !== 0) {
            models = collection.models.slice(-3);
            guids = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = models.length; _i < _len; _i++) {
                model = models[_i];
                _results.push(model.get('guid'));
              }
              return _results;
            })();
            if (!root.Utils.arrayEql(this.crumbs, guids)) {
              this.crumbs = guids;
              crumbs = $(this.el).find('ul.breadcrumbs');
              _ref1 = this.views;
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                v = _ref1[_i];
                v.dispose();
              }
              crumbs.html('');
              _fn = function(crumb) {
                var view;
                crumbs.show();
                _this.views.push(view = new CrumbView({
                  'model': crumb
                }));
                return crumbs.append(view.el);
              };
              for (_j = 0, _len1 = models.length; _j < _len1; _j++) {
                crumb = models[_j];
                _fn(crumb);
              }
            }
          }
          return this.timeouts.push(setTimeout(this.checkCrumbs, 1e3));
        };
      
        ToolView.prototype.getDOM = function() {
          return $(this.el).find('ul.accordion > li.active > div.content');
        };
      
        ToolView.prototype.channel = function(opts) {
          var template,
            _this = this;
          template = require("../templates/iframe/" + opts.scope);
          this.disposeIframe();
          $(opts.target).empty();
          this.pomme = new Pomme(_.extend(opts, {
            template: template
          }));
          this.pomme.on('error', function(err) {
            throw "Pomme.js iframe error: " + err;
          });
          if (this.intervals == null) {
            this.intervals = [];
          }
          this.intervals.push(setInterval(function() {
            var body, height;
            if (body = _this.pomme.iframe.el.document.body) {
              height = body.scrollHeight;
              return _this.pomme.iframe.node.style.height = "" + height + "px";
            }
          }, 1e2));
          return this.pomme;
        };
      
        return ToolView;
      
      })(GenericToolView);
      
    });

    
    // Model.coffee
    require.register('steps/tools/ChooseListTool/Model.js', function(exports, require, module) {
    
      var ChooseListTool, Tool, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Tool = require('/steps/client/src/models/Tool');
      
      module.exports = ChooseListTool = (function(_super) {
        __extends(ChooseListTool, _super);
      
        function ChooseListTool() {
          _ref = ChooseListTool.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ChooseListTool.prototype.defaults = {
          'slug': 'choose-list-tool',
          'name': 'ChooseListTool',
          'title': 'Choose a List',
          'description': 'Use an existing list',
          'type': 'goldentainoi'
        };
      
        return ChooseListTool;
      
      })(Tool);
      
    });

    
    // View.coffee
    require.register('steps/tools/ChooseListTool/View.js', function(exports, require, module) {
    
      var ChooseListToolView, Mediator, ToolView, config, root, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('/steps/client/src/core/Mediator');
      
      ToolView = require('/steps/client/src/views/Tool');
      
      config = require('../config').config;
      
      root = this;
      
      module.exports = ChooseListToolView = (function(_super) {
        var queryForList;
      
        __extends(ChooseListToolView, _super);
      
        function ChooseListToolView() {
          _ref = ChooseListToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        queryForList = function(_arg) {
          var name, type;
          type = _arg.type, name = _arg.name;
          return {
            'from': type,
            'select': ['*'],
            'constraints': [[type, 'IN', name]]
          };
        };
      
        ChooseListToolView.prototype.attach = function() {
          var channel, guid, list, opts, self, _ref1;
          ChooseListToolView.__super__.attach.apply(this, arguments);
          self = this;
          switch (this.step) {
            case 1:
              opts = {
                'mine': config.mine,
                'token': config.token,
                'cb': function(err, working, list) {
                  if (err) {
                    throw err;
                  }
                  if (list) {
                    self.model.set('data', {
                      'list': list
                    });
                    return Mediator.publish('history:add', self.model);
                  }
                }
              };
              opts.provided = {
                'selected': (_ref1 = this.model.get('data')) != null ? _ref1.list.name : void 0,
                'hidden': ['temp']
              };
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'apps-a'
              });
              channel.trigger('load', 'choose-list', opts);
              break;
            case 2:
              guid = this.model.get('guid');
              list = this.model.get('data').list;
              opts = _.extend({}, config, {
                'type': 'minimal',
                'query': queryForList(list),
                'events': {
                  'imo:click': function(type, id) {
                    return Mediator.publish('context:new', ['have:list', "type:" + type, 'have:one'], guid, id);
                  }
                }
              });
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'imtables'
              });
              channel.trigger('show', opts);
              Mediator.publish('context:new', ['have:list', "type:" + list.type], guid);
          }
          return this;
        };
      
        return ChooseListToolView;
      
      })(ToolView);
      
    });

    
    // step-1.eco
    require.register('steps/tools/ChooseListTool/step-1.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // step-2.eco
    require.register('steps/tools/ChooseListTool/step-2.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // Model.coffee
    require.register('steps/tools/ListWidgetTool/Model.js', function(exports, require, module) {
    
      var ListWidgetTool, Tool, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Tool = require('/steps/client/src/models/Tool');
      
      module.exports = ListWidgetTool = (function(_super) {
        __extends(ListWidgetTool, _super);
      
        function ListWidgetTool() {
          _ref = ListWidgetTool.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ListWidgetTool.prototype.defaults = {
          'slug': 'list-widget-tool',
          'name': 'ListWidgetTool',
          'title': 'List Widget',
          'description': 'Show a List Widget',
          'type': 'kimberly'
        };
      
        return ListWidgetTool;
      
      })(Tool);
      
    });

    
    // View.coffee
    require.register('steps/tools/ListWidgetTool/View.js', function(exports, require, module) {
    
      var ListWidgetToolView, Mediator, ToolView, config, root, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('/steps/client/src/core/Mediator');
      
      ToolView = require('/steps/client/src/views/Tool');
      
      config = require('../config').config;
      
      root = this;
      
      module.exports = ListWidgetToolView = (function(_super) {
        __extends(ListWidgetToolView, _super);
      
        function ListWidgetToolView() {
          _ref = ListWidgetToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ListWidgetToolView.prototype.attach = function() {
          var channel, data, id, list, opts, save, self, type, widget, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
          ListWidgetToolView.__super__.attach.apply(this, arguments);
          self = this;
          switch (this.step) {
            case 1:
              save = function(data) {
                return setTimeout(function() {
                  self.model.set('data', data);
                  return Mediator.publish('history:add', self.model);
                }, 0);
              };
              if ((data = (_ref1 = this.options) != null ? (_ref2 = _ref1.previous) != null ? _ref2.data : void 0 : void 0) && ((_ref3 = this.options) != null ? _ref3.extra : void 0)) {
                _ref4 = this.options.extra, type = _ref4[0], id = _ref4[1];
                switch (this.options.previous.name) {
                  case 'ResolveIdsTool':
                    save({
                      'widget': {
                        'type': type,
                        'id': id
                      },
                      'list': {
                        'name': data.list
                      }
                    });
                    break;
                  case 'ChooseListTool':
                    save({
                      'widget': {
                        'type': type,
                        'id': id
                      },
                      'list': data.list
                    });
                    break;
                  default:
                    throw 'We do not know this incoming tool yet, fix it.';
                }
              }
              opts = {
                'mine': config.root,
                'token': config.token,
                'cb': function(err, working, list) {
                  if (err) {
                    throw err;
                  }
                  if (list) {
                    return save(_.extend({}, self.model.get('data'), {
                      'list': list
                    }));
                  }
                }
              };
              opts.provided = {
                'selected': (_ref5 = this.model.get('data')) != null ? _ref5.list.name : void 0,
                'hidden': ['temp']
              };
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'apps-a'
              });
              channel.trigger('load', 'choose-list', opts);
              break;
            case 2:
              _ref6 = this.model.get('data'), widget = _ref6.widget, list = _ref6.list;
              opts = _.extend({}, widget, {
                'mine': config.mine,
                'token': config.token,
                'list': list.name
              });
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'widgets'
              });
              channel.trigger('show', opts);
          }
          return this;
        };
      
        return ListWidgetToolView;
      
      })(ToolView);
      
    });

    
    // step-1.eco
    require.register('steps/tools/ListWidgetTool/step-1.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // step-2.eco
    require.register('steps/tools/ListWidgetTool/step-2.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // Model.coffee
    require.register('steps/tools/ResolveIdsTool/Model.js', function(exports, require, module) {
    
      var ResolveIdsTool, Tool, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Tool = require('/steps/client/src/models/Tool');
      
      module.exports = ResolveIdsTool = (function(_super) {
        __extends(ResolveIdsTool, _super);
      
        function ResolveIdsTool() {
          _ref = ResolveIdsTool.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        ResolveIdsTool.prototype.defaults = {
          'slug': 'resolve-ids-tool',
          'name': 'ResolveIdsTool',
          'title': 'Resolve identifiers to a List',
          'description': 'Upload a list of identifiers',
          'type': 'strikemaster'
        };
      
        return ResolveIdsTool;
      
      })(Tool);
      
    });

    
    // View.coffee
    require.register('steps/tools/ResolveIdsTool/View.js', function(exports, require, module) {
    
      var Mediator, ResolveIdsToolView, ToolView, config, root, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
      
      Mediator = require('/steps/client/src/core/Mediator');
      
      ToolView = require('/steps/client/src/views/Tool');
      
      config = require('../config').config;
      
      root = this;
      
      module.exports = ResolveIdsToolView = (function(_super) {
        var queryForList;
      
        __extends(ResolveIdsToolView, _super);
      
        function ResolveIdsToolView() {
          _ref = ResolveIdsToolView.__super__.constructor.apply(this, arguments);
          return _ref;
        }
      
        queryForList = function(_arg) {
          var input, list, query;
          input = _arg.input, list = _arg.list, query = _arg.query;
          return {
            'from': input.type,
            'select': ['*'],
            'constraints': [[input.type, 'IN', list]]
          };
        };
      
        ResolveIdsToolView.prototype.attach = function() {
          var channel, data, guid, opts, self, _ref1;
          ResolveIdsToolView.__super__.attach.apply(this, arguments);
          self = this;
          switch (this.step) {
            case 1:
              opts = {
                'mine': config.mine,
                'token': config.token,
                'type': 'many',
                'cb': function(err, working, out) {
                  if (err) {
                    throw err;
                  }
                  if (out && out.query) {
                    self.model.set('data', out);
                    return Mediator.publish('history:add', self.model);
                  }
                }
              };
              opts.provided = ((_ref1 = this.model.get('data')) != null ? _ref1.input : void 0) || {};
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'apps-a'
              });
              channel.trigger('load', 'identifier-resolution', opts);
              break;
            case 2:
              guid = this.model.get('guid');
              data = this.model.get('data');
              opts = _.extend({}, config, {
                'type': 'minimal',
                'query': queryForList(data),
                'events': {
                  'imo:click': function(type, id) {
                    return Mediator.publish('context:new', ['have:list', "type:" + type, 'have:one'], guid, id);
                  }
                }
              });
              channel = this.channel({
                'target': '.iframe.app.container',
                'scope': 'imtables'
              });
              channel.trigger('show', opts);
              Mediator.publish('context:new', ['have:list', "type:" + data.input.type], guid);
          }
          return this;
        };
      
        return ResolveIdsToolView;
      
      })(ToolView);
      
    });

    
    // step-1.eco
    require.register('steps/tools/ResolveIdsTool/step-1.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // step-2.eco
    require.register('steps/tools/ResolveIdsTool/step-2.js', function(exports, require, module) {
    
      module.exports = function(__obj) {
        if (!__obj) __obj = {};
        var __out = [], __capture = function(callback) {
          var out = __out, result;
          __out = [];
          callback.call(this);
          result = __out.join('');
          __out = out;
          return __safe(result);
        }, __sanitize = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else if (typeof value !== 'undefined' && value != null) {
            return __escape(value);
          } else {
            return '';
          }
        }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
        __safe = __obj.safe = function(value) {
          if (value && value.ecoSafe) {
            return value;
          } else {
            if (!(typeof value !== 'undefined' && value != null)) value = '';
            var result = new String(value);
            result.ecoSafe = true;
            return result;
          }
        };
        if (!__escape) {
          __escape = __obj.escape = function(value) {
            return ('' + value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
          };
        }
        (function() {
          (function() {
            __out.push('<div class="iframe app container"></div>');
          
          }).call(this);
          
        }).call(__obj);
        __obj.safe = __objSafe, __obj.escape = __escape;
        return __out.join('');
      }
    });

    
    // config.coffee
    require.register('steps/tools/config.js', function(exports, require, module) {
    
      exports.config = {
        'mine': 'http://beta.flymine.org/beta',
        'token': 'X1L4z2y3p3ify3y9s0Eb'
      };
      
      exports.registry = [
        {
          'slug': 'resolve-ids-tool',
          'help': 'Upload & resolve a list of identifiers',
          'labels': [
            {
              'label': 'Upload list',
              'weight': 10,
              'place': 'header',
              'keywords': ['list', 'resolve', 'identifiers', 'upload']
            }, {
              'label': 'Upload a new list',
              'weight': 10,
              'place': 'home',
              'keywords': ['list', 'resolve', 'identifiers', 'upload']
            }
          ]
        }, {
          'slug': 'choose-list-tool',
          'help': 'Choose an existing list',
          'labels': [
            {
              'label': 'Choose list',
              'weight': 10,
              'place': 'header',
              'keywords': ['list']
            }, {
              'label': 'Choose an existing list',
              'weight': 10,
              'place': 'home',
              'keywords': ['list']
            }
          ]
        }, {
          'slug': 'list-widget-tool',
          'labels': [
            {
              'label': 'Gene Expression in the Fly (FlyAtlas)',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['chart', 'flyatlas_for_gene']
            }, {
              'label': 'mRNA subcellular localisation (fly-FISH)',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['chart', 'flyfish']
            }, {
              'label': 'BDGP expression patterns',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['chart', 'bdgp']
            }, {
              'label': 'MiRNA Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'miranda_enrichment']
            }, {
              'label': 'Gene Ontology Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'go_enrichment_for_gene']
            }, {
              'label': 'Protein Domain Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'prot_dom_enrichment_for_gene']
            }, {
              'label': 'BDGP Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'bdgp_enrichment']
            }, {
              'label': 'Publication Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'publication_enrichment']
            }, {
              'label': 'Pathway Enrichment',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['enrichment', 'pathway_enrichment']
            }, {
              'label': 'Orthologues',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['table', 'orthologues']
            }, {
              'label': 'Chromosome Distribution',
              'weight': 10,
              'context': ['have:list', 'type:Gene'],
              'place': 'right',
              'category': ['Category 1'],
              'extra': ['chart', 'chromosome_distribution_for_gene']
            }
          ]
        }
      ];
      
    });
  })();

  // Return the main app.
  var main = require("steps/client/src/initialize.js");

  // Global on server, window in browser.
  var root = this;

  // AMD/RequireJS.
  if (typeof define !== 'undefined' && define.amd) {
  
    define("steps", [ /* load deps ahead of time */ ], function () {
      return main;
    });
  
  }

  // CommonJS.
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = main;
  }

  // Globally exported.
  else {
  
    root["steps"] = main;
  
  }

  // Alias our app.
  
  require.alias("steps/client/src/initialize.js", "steps/index.js");
  

  // Export internal loader?
  root.require = (typeof root.require !== 'undefined') ? root.require : require;
})();