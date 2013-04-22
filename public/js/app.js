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

window.require.register("chaplin/controllers/app", function(exports, require, module) {
  var AppController, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  module.exports = AppController = (function(_super) {

    __extends(AppController, _super);

    function AppController() {
      return AppController.__super__.constructor.apply(this, arguments);
    }

    AppController.prototype.afterAction = {
      'reset': function() {
        return this.redirectToRoute('landing');
      }
    };

    AppController.prototype.reset = function(params) {
      var collection;
      collection = window.History;
      collection.storage.reset();
      return collection.reset();
    };

    return AppController;

  })(Controller);
  
});
window.require.register("chaplin/controllers/error", function(exports, require, module) {
  var Controller, ErrorController, ErrorView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  ErrorView = require('chaplin/views/Error');

  module.exports = ErrorController = (function(_super) {

    __extends(ErrorController, _super);

    function ErrorController() {
      return ErrorController.__super__.constructor.apply(this, arguments);
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
window.require.register("chaplin/controllers/landing", function(exports, require, module) {
  var Controller, LandingController, LandingView, Mediator, ModalView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  Mediator = require('chaplin/core/Mediator');

  LandingView = require('chaplin/views/Landing');

  ModalView = require('chaplin/views/Modal');

  module.exports = LandingController = (function(_super) {

    __extends(LandingController, _super);

    function LandingController() {
      return LandingController.__super__.constructor.apply(this, arguments);
    }

    LandingController.prototype.index = function(params) {
      this.views.push(new LandingView());
      this.views.push(new ModalView());
      return this.adjustTitle('Welcome');
    };

    return LandingController;

  })(Controller);
  
});
window.require.register("chaplin/controllers/tools", function(exports, require, module) {
  var AppView, Controller, HistoryView, LeftSidebarView, Mediator, ModalView, NextStepsHeaderView, RightSidebarView, ToolsController, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  Mediator = require('chaplin/core/Mediator');

  AppView = require('chaplin/views/App');

  NextStepsHeaderView = require('chaplin/views/NextStepsHeader');

  LeftSidebarView = require('chaplin/views/LeftSidebar');

  RightSidebarView = require('chaplin/views/RightSidebar');

  HistoryView = require('chaplin/views/History');

  ModalView = require('chaplin/views/Modal');

  root = this;

  module.exports = ToolsController = (function(_super) {

    __extends(ToolsController, _super);

    function ToolsController() {
      return ToolsController.__super__.constructor.apply(this, arguments);
    }

    ToolsController.prototype['collection'] = root.History;

    ToolsController.prototype._chrome = function() {
      this.views.push(new AppView());
      this.views.push(new NextStepsHeaderView());
      this.views.push(new HistoryView({
        'collection': this.collection
      }));
      this.views.push(new RightSidebarView());
      return this.views.push(new ModalView());
    };

    ToolsController.prototype["new"] = function(_arg) {
      var Clazz, extra, model, name, slug;
      slug = _arg.slug, extra = _arg.extra;
      this._chrome();
      name = root.Utils.hyphenToPascal(slug);
      try {
        Clazz = require("tools/" + name + "/Model");
        model = new Clazz();
        Clazz = require("tools/" + name + "/View");
      } catch (e) {
        this.redirectToRoute('404');
        assert(false, "Unknown tool `" + name + "`");
      }
      this.views.push(new Clazz({
        'model': model,
        'extra': extra
      }));
      return this.adjustTitle(model.get('title'));
    };

    ToolsController.prototype.cont = function(_arg) {
      var Clazz, extra, guid, model, name, previous, slug;
      slug = _arg.slug, extra = _arg.extra, guid = _arg.guid;
      this._chrome();
      name = root.Utils.hyphenToPascal(slug);
      try {
        Clazz = require("tools/" + name + "/Model");
        model = new Clazz();
        Clazz = require("tools/" + name + "/View");
      } catch (e) {
        this.redirectToRoute('500');
        assert(false, "Unknown tool `" + name + "`");
      }
      previous = (this.collection.where({
        'guid': guid
      })).pop();
      if (!previous) {
        this.redirectToRoute('500');
        assert(false, 'No previous step');
      }
      model.set({
        'parent': guid
      });
      this.views.push(new Clazz({
        'model': model,
        'previous': previous.toJSON(),
        'extra': extra
      }));
      return this.adjustTitle(model.get('title'));
    };

    ToolsController.prototype.old = function(_arg) {
      var Clazz, guid, model, name;
      guid = _arg.guid;
      model = this.collection.where({
        'guid': guid
      })[0];
      if (!model) {
        this.redirectToRoute('500');
        assert(false, 'We do not have this Model in History');
      }
      this._chrome();
      name = model.get('name');
      try {
        Clazz = require("tools/" + name + "/View");
      } catch (e) {
        this.redirectToRoute('500');
        assert(false, "Unknown tool `" + name + "`");
      }
      model = this.collection.dupe(model);
      this.views.push(new Clazz({
        'model': model
      }));
      Mediator.publish('history:activate', guid);
      return this.adjustTitle(model.get('title'));
    };

    return ToolsController;

  })(Controller);

  ToolsController.prototype.results = ToolsController.prototype.old;
  
});
window.require.register("chaplin/core/Application", function(exports, require, module) {
  var Chaplin, Dispatcher, InterMineSteps, Layout, Mediator, Registry, Routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('chaplin/core/AssertException');

  require('chaplin/core/Console');

  require('chaplin/core/Utils');

  Dispatcher = require('chaplin/core/Dispatcher');

  Mediator = require('chaplin/core/Mediator');

  Layout = require('chaplin/core/Layout');

  Routes = require('chaplin/core/Routes');

  Registry = require('tools/Registry');

  module.exports = InterMineSteps = (function(_super) {

    __extends(InterMineSteps, _super);

    function InterMineSteps() {
      return InterMineSteps.__super__.constructor.apply(this, arguments);
    }

    InterMineSteps.prototype.title = 'InterMine Steps';

    InterMineSteps.prototype.showHistory = true;

    InterMineSteps.prototype.initialize = function() {
      InterMineSteps.__super__.initialize.apply(this, arguments);
      this.initRouter(Routes);
      this.initDispatcher({
        'controllerPath': 'chaplin/controllers/',
        'controllerSuffix': ''
      });
      this.initLayout();
      this.initComposer();
      this.initRegistry();
      return this.startRouting();
    };

    InterMineSteps.prototype.initLayout = function() {
      return this.layout = new Layout({
        'title': this.title,
        'openExternalToBlank': true
      });
    };

    InterMineSteps.prototype.initRegistry = function() {
      var _this = this;
      return Mediator.subscribe('context:new', function(context, guid) {
        var Model, key, model, obj, tool, variant, _i, _len, _results;
        if (context == null) {
          context = [];
        }
        _results = [];
        for (_i = 0, _len = Registry.length; _i < _len; _i++) {
          tool = Registry[_i];
          _results.push((function() {
            var _j, _k, _len1, _len2, _ref, _ref1, _results1;
            _ref = tool.labels;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              variant = _ref[_j];
              assert(variant.place, 'Placement for a tool variant not provided');
              if (!_.difference(variant.context || [], context).length) {
                obj = _.clone(variant);
                obj.name = window.Utils.hyphenToPascal(tool.slug);
                _ref1 = ['slug', 'help'];
                for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                  key = _ref1[_k];
                  obj[key] = tool[key];
                }
                try {
                  Model = require("/tools/" + obj.name + "/Model");
                  model = new Model();
                } catch (e) {
                  this.publishEvent('!router:routeByName', '500');
                  assert(false, "Unknown tool `" + obj.name + "`");
                }
                obj.type = model.get('type');
                if (guid) {
                  obj.guid = guid;
                }
                model.dispose();
                _results1.push(Mediator.publish('context:render', variant.place, context, obj));
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }).call(_this));
        }
        return _results;
      }, this);
    };

    return InterMineSteps;

  })(Chaplin.Application);
  
});
window.require.register("chaplin/core/AssertException", function(exports, require, module) {
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
window.require.register("chaplin/core/Collection", function(exports, require, module) {
  var Chaplin, Collection, Mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.initialize = function() {
      Collection.__super__.initialize.apply(this, arguments);
      this.timeouts = [];
      return this;
    };

    Collection.prototype.dispose = function() {
      var t, _i, _len, _ref;
      _ref = this.timeouts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        t = _ref[_i];
        clearTimeout(t);
      }
      Mediator.unsubscribe(null, null, this);
      return Collection.__super__.dispose.apply(this, arguments);
    };

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("chaplin/core/Console", function(exports, require, module) {
  
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
window.require.register("chaplin/core/Controller", function(exports, require, module) {
  var Chaplin, Controller, Mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.views = [];

    Controller.prototype.initialize = function() {
      return Controller.__super__.initialize.apply(this, arguments);
    };

    Controller.prototype.dispose = function() {
      var view, _i, _len, _ref;
      _ref = this.views;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        view = _ref[_i];
        view.dispose();
      }
      return Controller.__super__.dispose.apply(this, arguments);
    };

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("chaplin/core/Dispatcher", function(exports, require, module) {
  var Chaplin, Dispatcher, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  utils = require('chaplin/lib/utils');

  module.exports = Dispatcher = (function(_super) {

    __extends(Dispatcher, _super);

    function Dispatcher() {
      return Dispatcher.__super__.constructor.apply(this, arguments);
    }

    Dispatcher.prototype.controllerLoaded = function(controllerName, action, params, options, ControllerConstructor) {
      var acts, afterAction, afterActions, args, controller, name, next, _i, _len, _ref,
        _this = this;
      Dispatcher.__super__.controllerLoaded.apply(this, arguments);
      controller = new ControllerConstructor(params, options);
      afterActions = [];
      args = arguments;
      _ref = utils.getAllPropertyVersions(controller, 'afterAction');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        acts = _ref[_i];
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
window.require.register("chaplin/core/Layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("chaplin/core/LocalStorage", function(exports, require, module) {
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
window.require.register("chaplin/core/Mediator", function(exports, require, module) {
  var Backbone, mediator,
    __slice = [].slice;

  Backbone = require('backbone');

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
window.require.register("chaplin/core/Routes", function(exports, require, module) {
  
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
window.require.register("chaplin/core/Utils", function(exports, require, module) {
  
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
    }
  };
  
});
window.require.register("chaplin/core/View", function(exports, require, module) {
  var Chaplin, Mediator, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function() {
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
      var t, v, _i, _j, _len, _len1, _ref, _ref1;
      _ref = this.views;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        if (v != null) {
          v.dispose();
        }
      }
      _ref1 = this.timeouts;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        t = _ref1[_j];
        clearTimeout(t);
      }
      Mediator.unsubscribe(null, null, this);
      return View.__super__.dispose.apply(this, arguments);
    };

    View.prototype.property = function(data) {
      return _.cloneDeep(data);
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("chaplin/initialize", function(exports, require, module) {
  var root;

  root = this;

  $(function() {
    var History, InterMineSteps, View;
    if (!(Modernizr.localstorage && Modernizr.history)) {
      View = require('chaplin/views/Error');
      return new View({
        'template': 'no-html5'
      });
    } else {
      InterMineSteps = require('chaplin/core/Application');
      History = require('chaplin/models/History');
      return (new History()).bootup(function(collection) {
        root.History = collection;
        root.App = new InterMineSteps();
        return root.App.initialize();
      });
    }
  });
  
});
window.require.register("chaplin/models/History", function(exports, require, module) {
  var Collection, Controller, History, LocalStorage, Mediator, Tool, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('chaplin/core/Collection');

  Mediator = require('chaplin/core/Mediator');

  LocalStorage = require('chaplin/core/LocalStorage');

  Controller = require('chaplin/core/Controller');

  Tool = require('chaplin/models/Tool');

  root = this;

  module.exports = History = (function(_super) {

    __extends(History, _super);

    function History() {
      this.addTool = __bind(this.addTool, this);

      this.checkStorage = __bind(this.checkStorage, this);
      return History.__super__.constructor.apply(this, arguments);
    }

    History.prototype['model'] = Tool;

    History.prototype['url'] = '/api/history';

    History.prototype.initialize = function() {
      History.__super__.initialize.apply(this, arguments);
      this.storage = new LocalStorage('Steps');
      Mediator.subscribe('history:add', this.addTool, this);
      return this.controller = new Controller();
    };

    History.prototype.bootup = function(cb) {
      var data, obj, _i, _len,
        _this = this;
      data = this.storage.findAll();
      if (data.length === 0) {
        return this.fetch({
          'error': function(coll, res) {
            return assert(false, res.responseText);
          },
          'success': function(coll, res) {
            coll.each(function(model) {
              return _this.storage.add(model.toJSON());
            });
            root.Utils.inFocus(_this.checkStorage);
            return cb(coll);
          }
        });
      } else {
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          obj = data[_i];
          this.add(obj);
        }
        root.Utils.inFocus(this.checkStorage);
        return cb(this);
      }
    };

    History.prototype.checkStorage = function() {
      var guid, obj, _i, _len, _ref, _results;
      _ref = this.storage.findAll();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
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
        return this.controller.redirectToRoute('results', {
          'slug': model.get('slug'),
          'guid': guid
        });
      }
    };

    History.prototype.dupe = function(model) {
      var Clazz, obj;
      obj = model.toJSON();
      Clazz = require("tools/" + obj.name + "/Model");
      return new Clazz(obj);
    };

    return History;

  })(Collection);
  
});
window.require.register("chaplin/models/Tool", function(exports, require, module) {
  var Chaplin, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Tool = (function(_super) {

    __extends(Tool, _super);

    function Tool() {
      return Tool.__super__.constructor.apply(this, arguments);
    }

    return Tool;

  })(Chaplin.Model);
  
});
window.require.register("chaplin/templates/action", function(exports, require, module) {
  module.exports = function (__obj) {
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
          __out.push('\n    <span class="entypo help right" title="Show help for this item"></span>\n');
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
window.require.register("chaplin/templates/app", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div id="wrapper">\n    <!-- header, account etc. -->\n    <header id="top">\n        <div class="inner">\n            <div class="third">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <div class="first">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n            <div class="second">\n                <input id="search" type="text" placeholder="e.g. list upload, PPARG" />\n                <div id="always-on"></div>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle">\n        <!-- new tools -->\n        <aside id="left"></aside>\n        <!-- the tool -->\n        <div id="widget"></div>\n        <!-- from here -->\n        <aside id="right"></aside>\n    </section>\n</div>\n\n<!-- tools used in the history -->\n<div id="history"></div>\n\n<!-- history toggler fixed to bottom -->\n<!--\n<footer id="bottom">\n    <div class="wrap">\n        ');
      
        if (this.showHistory) {
          __out.push('\n            <a class="button" data-show="1" data-action="history-toggle">Hide history</a>\n        ');
        } else {
          __out.push('\n            <a class="button" data-show="0" data-action="history-toggle">Show history</a>\n        ');
        }
      
        __out.push('\n    </div>\n</footer>\n-->\n\n<!-- finally the almighty modal -->\n<div id="modal"></div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/crumb", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<span class="entypo rightopen"></span>\n<a href="/tool/id/');
      
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
window.require.register("chaplin/templates/error-404", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="first">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow">\n        <div id="landing" class="container row">\n            <div class="twelve columns">\n                <h2>404, Not Found</h2>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/error-500", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="first">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow">\n        <div id="landing" class="container row">\n            <div class="twelve columns">\n                <h2>500, Internal App Error</h2>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/error-no-html5", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="first">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow">\n        <div id="landing" class="container row">\n            <div class="twelve columns">\n                <h2>Your browser does not support either <a href="http://diveintohtml5.info/storage.html" target="_new">localStorage</a> or <a href="http://diveintohtml5.info/history.html" target="_new">pushState</a>, sadness &hellip;</h2>\n                <p>Please use a different browser or disable a browser addon (related to cookies etc.) that could be blocking the functionality.</p>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/history-tool", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('">\n        <div class="box">\n            <h5>');
      
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
window.require.register("chaplin/templates/history", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="head">\n    <a id="serialize" class="button">Serialize</a>\n    <a href="/app/reset" class="button secondary" style="margin-right:10px">Clear</a>\n    <h1><span class="entypo flowbranch"></span> History</h1>\n    <p class="message">Steps you have taken will be populated here as you work with this app.</p>\n</div>\n\n<div id="tools">\n    <svg class="canvas"></svg>\n    <table class="grid"></table>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/landing", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="row">\n            <div class="first three columns">\n                <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n            </div>\n            <div class="second four columns">\n                <input id="search" type="text" placeholder="e.g. list upload, PPARG" />\n            </div>\n            <div class="third five columns">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a href="app/reset">Reset Database</a> <span>&#8226;</span> <a>Logout</a>\n            </div>\n        </div>\n    </header>\n\n    <section id="middle" class="narrow container">\n        <div class="row">\n            <div class="three columns">\n                <div class="nobox">\n                    <h2><span class="entypo lifebuoy"></span> Help</h2>\n                    <ul class="tools">\n                        <li><a>What is <strong>new</strong> since 1.2</a></li>\n                        <li><a>How do I use my <strong>tools</strong></a></li>\n                        <li><a>Where are my <strong>templates</strong></a></li>\n                        <li><a>How do I <strong>cite</strong> this resource</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class="four columns">\n                <div class="box">\n                    <h2><span class="entypo crossroads"></span> Tools</h2>\n                    <!-- populate next steps here -->\n                    <div id="next"></div>\n                </div>\n            </div>\n            <div class="five columns">\n                <div class="box">\n                    <table class="tabs">\n                        <tr>\n                            <td class="active labeled">\n                                <div>\n                                    <h3>Messages</h3><span class="count">9</span>\n                                </div>\n                            </td>\n                            <td class="inactive">\n                                <div>\n                                    <h3>Continue research</h3>\n                                </div>\n                            </td>\n                        </tr>\n                    </table>\n                    <div class="content">\n                        <ul class="timeline">\n                            <li>\n                                <div class="head">\n                                    <span class="right ago">3m ago</span>\n                                    <span class="entypo database"></span><h5>System upgrade</h5>\n                                </div>\n                                <p>The system has been upgraded to the latest version <code>1.2.0</code>.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="right ago">A day ago</span>\n                                    <span class="entypo download"></span><h5>Shared list</h5>\n                                </div>\n                                <p>A list <a>Secret Research Genes</a> has been shared with you.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="right ago">Jan 27</span>\n                                    <span class="entypo database"></span><h5>System upgrade</h5>\n                                </div>\n                                <p>The system will go down in 30 minutes.</p>\n                            </li>\n                            <li>\n                                <div class="head">\n                                    <span class="right ago">Jan 26</span>\n                                    <span class="entypo clipboard"></span><h5>Job finished</h5>\n                                </div>\n                                <p>Your job <a>Enriching a List</a> has finished.</p>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <div class="seven columns">\n                <div>\n                    <h2><span class="entypo cog"></span> Example tool config</h2>\n                    <pre><code class="code" data-language="json" id="example"></code></pre>\n                </div>\n            </div>\n            <div class="five columns">\n                <div class="description">\n                    <p>You are looking at an example app UI with some dummy tools configured. No data are sent to\n                        the server and everything is working from your browser.</p>\n                    <p>On the left is an example JSON config of a tool action. It is configured to show on this,\n                        the landing page.</p>\n                    <dl>\n                        <dt>label</dt>\n                        <dd>A <a href="http://daringfireball.net/projects/markdown/" target="_blank">Markdown</a>\n                            enriched tool link label to show.</dd>\n                        <dt>category</dt>\n                        <dd>Which group does this tool belong to?</dd>\n                        <dt>keywords</dt>\n                        <dd>Extra keywords that make this tool link show up when we type these keywords into\n                            search box.</dd>\n                        <dt>weight</dt>\n                        <dd>Tools are shown in a category based on their weight. The bigger the "higher" up.\n                            Anything below 10 will be trimmed from the initial listing.</dd>\n                        <dt>help</dt>\n                        <dd>A piece of HTML to show when someone clicks on the tool\'s question mark icon.</dd>\n                    </dl>\n                </div>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>\n\n<!-- finally the almighty modal -->\n<div id="modal"></div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/modal", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<h1><span class="entypo comment"></span> <span class="title"></span></h1>\n<div class="scroll">\n    <p class="text"></p>\n    <pre><code class="code"></code></pre>\n</div>\n<a class="close-reveal-modal">&#215;</a>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/next-steps-header", function(exports, require, module) {
  module.exports = function (__obj) {
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
window.require.register("chaplin/templates/next-steps", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="tools"><!-- tool labels go here --></div>\n<a class="tiny secondary button show hidden">&hellip;</a>\n<p class="noactions">The filter matched no actions.</p>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/sidebar-left", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="wrap">\n    <span class="entypo popup"></span>\n    <h3><span class="entypo crossroads"></span> Start new history</h3>\n    <div id="next"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/sidebar-right", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<table class="tabs">\n    <tr>\n        <td class="active"><div><h3>Next Steps</h3></div></td>\n        <td class="inactive"><div><h3>Research Notes</h3></div></td>\n    </tr>\n</table>\n<div class="content">\n    <p class="description">The next steps you can take from here will be shown here.</p>\n    <div id="continue"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/templates/tool", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="wrap sidebar">\n    <!--<span class="entypo popup"></span>-->\n\n    <!-- dynamically populated with event handling -->\n    <ul class="breadcrumbs"></ul>\n\n    <div class="head">\n        <h1 class="');
      
        __out.push(__sanitize(this.type));
      
        __out.push('">');
      
        __out.push(__sanitize(this.title));
      
        __out.push('</h1>\n        <em class="ago"></em>\n    </div>\n\n    ');
      
        if (this.steps.length !== 0) {
          __out.push('\n        <ul class="accordion">\n            ');
          _ref = this.steps;
          for (i in _ref) {
            title = _ref[i];
            __out.push('\n                ');
            i = parseInt(i) + 1;
            __out.push('\n                <li class="');
            __out.push(__sanitize(this.type));
            if (i === this.step) {
              __out.push(' active');
            }
            __out.push('" data-step="');
            __out.push(__sanitize(i));
            __out.push('">\n                    <div class="title">\n                        ');
            if (this.steps.length !== 1) {
              __out.push('\n                            <h5>#');
              __out.push(__sanitize(i));
              __out.push(': ');
              __out.push(__sanitize(title));
              __out.push('</h5>\n                        ');
            } else {
              __out.push('\n                            <h5>');
              __out.push(__sanitize(title));
              __out.push('</h5>\n                        ');
            }
            __out.push('\n                    </div>\n                    <div class="content">Loading content &hellip;</div>\n                </li>\n            ');
          }
          __out.push('\n        </ul>\n    ');
        } else {
          __out.push('\n        <div class="alert-box alert">\n            No Tool Steps defined.\n        </div>\n    ');
        }
      
        __out.push('\n\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("chaplin/views/Action", function(exports, require, module) {
  var ActionView, Mediator, View, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  Mediator = require('chaplin/core/Mediator');

  root = this;

  module.exports = ActionView = (function(_super) {

    __extends(ActionView, _super);

    function ActionView() {
      this.showHelp = __bind(this.showHelp, this);
      return ActionView.__super__.constructor.apply(this, arguments);
    }

    ActionView.prototype.containerMethod = 'html';

    ActionView.prototype.autoRender = true;

    ActionView.prototype.tagName = 'li';

    ActionView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/action');
    };

    ActionView.prototype.getTemplateData = function() {
      return _.extend(_.cloneDeep(this.options), {
        'label': this.markup(this.options.label)
      });
    };

    ActionView.prototype.attach = function() {
      var words,
        _this = this;
      ActionView.__super__.attach.apply(this, arguments);
      $(this.el).addClass(function() {
        var classes;
        classes = [_this.options.type, _this.options.labelClass];
        if (_this.options.weight < 10) {
          classes.push('hidden');
        }
        return classes.join(' ');
      });
      words = this.options.label.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').toLowerCase().split(' ');
      this.keywords = _.uniq(words.concat(this.options.keywords)).join(' ');
      return this.delegate('click', '.help', this.showHelp);
    };

    ActionView.prototype.markup = function(text) {
      text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>");
      return text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
    };

    ActionView.prototype.showHelp = function() {
      assert(this.options.help, 'Help content is not provided');
      return Mediator.publish('modal:render', {
        'title': this.markup(this.options.label),
        'text': this.options.help
      });
    };

    return ActionView;

  })(View);
  
});
window.require.register("chaplin/views/App", function(exports, require, module) {
  var AppView, Mediator, View, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  root = this;

  module.exports = AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.container = 'body';

    AppView.prototype.containerMethod = 'html';

    AppView.prototype.autoRender = true;

    AppView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/app');
    };

    AppView.prototype.getTemplateData = function() {
      return {
        'showHistory': root.App.showHistory
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
window.require.register("chaplin/views/Crumb", function(exports, require, module) {
  var CrumbView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  module.exports = CrumbView = (function(_super) {

    __extends(CrumbView, _super);

    function CrumbView() {
      return CrumbView.__super__.constructor.apply(this, arguments);
    }

    CrumbView.prototype.containerMethod = 'html';

    CrumbView.prototype.autoRender = true;

    CrumbView.prototype.tagName = 'li';

    CrumbView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/crumb');
    };

    return CrumbView;

  })(View);
  
});
window.require.register("chaplin/views/Error", function(exports, require, module) {
  var ErrorView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  module.exports = ErrorView = (function(_super) {

    __extends(ErrorView, _super);

    function ErrorView() {
      return ErrorView.__super__.constructor.apply(this, arguments);
    }

    ErrorView.prototype.container = 'body';

    ErrorView.prototype.containerMethod = 'html';

    ErrorView.prototype.autoRender = true;

    ErrorView.prototype.getTemplateFunction = function() {
      return require("chaplin/templates/error-" + this.options.template);
    };

    return ErrorView;

  })(View);
  
});
window.require.register("chaplin/views/GenericTool", function(exports, require, module) {
  var GenericToolView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  module.exports = GenericToolView = (function(_super) {

    __extends(GenericToolView, _super);

    function GenericToolView() {
      this.updateTime = __bind(this.updateTime, this);
      return GenericToolView.__super__.constructor.apply(this, arguments);
    }

    GenericToolView.prototype.updateTime = function(el) {
      var a, b, c, created, date, guid, queue, _ref,
        _this = this;
      assert(this.model && (guid = this.model.get('guid')), 'Model is not set or is incomplete, cannot time update');
      created = this.model.get('created');
      assert(created, "Created date not provided for model `" + guid + "`");
      date = new Date(this.model.get('created'));
      assert(!(isNaN(date.getTime())), "Invalid created date `" + created + "`");
      c = null;
      _ref = [0, 1], a = _ref[0], b = _ref[1];
      return (queue = function() {
        var d, _ref1, _ref2;
        d = moment(date).fromNow();
        if (c !== d) {
          _ref1 = [0, 1], a = _ref1[0], b = _ref1[1];
          el.text(c = d);
        } else {
          _ref2 = [b, a + b], a = _ref2[0], b = _ref2[1];
        }
        return _this.timeouts.push(setTimeout(queue, b * 1000));
      })();
    };

    return GenericToolView;

  })(View);
  
});
window.require.register("chaplin/views/History", function(exports, require, module) {
  var Controller, HistoryToolView, HistoryView, Mediator, Tool, View, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  Controller = require('chaplin/core/Controller');

  HistoryToolView = require('chaplin/views/HistoryTool');

  Tool = require('chaplin/models/Tool');

  root = this;

  module.exports = HistoryView = (function(_super) {

    __extends(HistoryView, _super);

    function HistoryView() {
      this.renderTool = __bind(this.renderTool, this);

      this.resetTable = __bind(this.resetTable, this);

      this.toggleHistory = __bind(this.toggleHistory, this);

      this.checkCollection = __bind(this.checkCollection, this);
      return HistoryView.__super__.constructor.apply(this, arguments);
    }

    HistoryView.prototype['container'] = '#history';

    HistoryView.prototype['containerMethod'] = 'html';

    HistoryView.prototype['autoRender'] = true;

    HistoryView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/history');
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
      this.delegate('click', '#serialize', this.serializeHistory);
      if (!root.App.showHistory) {
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
      return this.timeouts.push(setTimeout(this.checkCollection, 1000));
    };

    HistoryView.prototype.toggleHistory = function() {
      $(this.el).fadeToggle();
      return root.App.showHistory = !root.App.showHistory;
    };

    HistoryView.prototype.resetTable = function() {
      this.rows = 0;
      this.cols = 0;
      d3.select($(this.el).find('svg.canvas')[0]).selectAll('*').remove();
      return $(this.el).find('table.grid').html('');
    };

    HistoryView.prototype.addRow = function() {
      var el, i, row, table, _base, _i, _ref, _ref1;
      table = $(this.el).find('table.grid');
      row = $('<tr/>', {
        'data-row': this.rows
      });
      for (i = _i = 0, _ref = this.cols; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        row.append(el = $('<td/>', {
          'data-col': i
        }));
        if ((_ref1 = (_base = this.grid)[i]) == null) {
          _base[i] = [];
        }
        this.grid[i][this.rows] = el;
      }
      table.append(row);
      return this.rows += 1;
    };

    HistoryView.prototype.addCol = function() {
      var el, i, table, _base, _i, _name, _ref, _ref1;
      table = $(this.el).find('table.grid');
      for (i = _i = 0, _ref = this.rows; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        table.find("tr[data-row=" + i + "]").append(el = $('<td/>', {
          'data-col': this.cols
        }));
        if ((_ref1 = (_base = this.grid)[_name = this.cols]) == null) {
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
      var height, pos, svg, width, x1, x2, y1, y2, _ref, _ref1;
      width = 120;
      height = 53;
      if (!a) {
        return;
      }
      pos = function(col, row) {
        var x, y;
        x = ((col + 1) * width) - (width / 2);
        y = ((row + 1) * height) - (height / 2) + 10;
        return [x, y];
      };
      _ref = pos(a.col, a.row), x1 = _ref[0], y1 = _ref[1];
      _ref1 = pos(b.col, b.row), x2 = _ref1[0], y2 = _ref1[1];
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
      return Mediator.publish('modal:render', {
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
window.require.register("chaplin/views/HistoryTool", function(exports, require, module) {
  var Chaplin, GenericToolView, HistoryToolView, Mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  GenericToolView = require('chaplin/views/GenericTool');

  module.exports = HistoryToolView = (function(_super) {

    __extends(HistoryToolView, _super);

    function HistoryToolView() {
      return HistoryToolView.__super__.constructor.apply(this, arguments);
    }

    HistoryToolView.prototype['containerMethod'] = 'html';

    HistoryToolView.prototype['autoRender'] = true;

    HistoryToolView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/history-tool');
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
window.require.register("chaplin/views/Landing", function(exports, require, module) {
  var Chaplin, LandingView, Mediator, NextStepsAllView, Registry, View, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  NextStepsAllView = require('chaplin/views/NextStepsAll');

  Registry = require('tools/Registry');

  root = this;

  module.exports = LandingView = (function(_super) {

    __extends(LandingView, _super);

    function LandingView() {
      return LandingView.__super__.constructor.apply(this, arguments);
    }

    LandingView.prototype.container = 'body';

    LandingView.prototype.containerMethod = 'html';

    LandingView.prototype.autoRender = true;

    LandingView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/landing');
    };

    LandingView.prototype.attach = function() {
      LandingView.__super__.attach.apply(this, arguments);
      this.views.push(new NextStepsAllView());
      this.delegate('keyup', 'input#search', function(e) {
        return Mediator.publish('app:search', $(e.target).val());
      });
      $('body').removeClass('app');
      $(this.el).find('#example').html(JSON.stringify(Registry[0], null, 4));
      Rainbow.color();
      return this;
    };

    return LandingView;

  })(View);
  
});
window.require.register("chaplin/views/LeftSidebar", function(exports, require, module) {
  var LeftSidebarView, NextStepsAllView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  NextStepsAllView = require('chaplin/views/NextStepsAll');

  module.exports = LeftSidebarView = (function(_super) {

    __extends(LeftSidebarView, _super);

    function LeftSidebarView() {
      return LeftSidebarView.__super__.constructor.apply(this, arguments);
    }

    LeftSidebarView.prototype.container = 'aside#left';

    LeftSidebarView.prototype.containerMethod = 'html';

    LeftSidebarView.prototype.autoRender = true;

    LeftSidebarView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/sidebar-left');
    };

    LeftSidebarView.prototype.attach = function() {
      LeftSidebarView.__super__.attach.apply(this, arguments);
      this.views.push(new NextStepsAllView());
      return this;
    };

    return LeftSidebarView;

  })(View);
  
});
window.require.register("chaplin/views/Modal", function(exports, require, module) {
  var LeftSidebarView, Mediator, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  module.exports = LeftSidebarView = (function(_super) {

    __extends(LeftSidebarView, _super);

    function LeftSidebarView() {
      this.show = __bind(this.show, this);
      return LeftSidebarView.__super__.constructor.apply(this, arguments);
    }

    LeftSidebarView.prototype.container = '#modal';

    LeftSidebarView.prototype.containerMethod = 'html';

    LeftSidebarView.prototype.autoRender = true;

    LeftSidebarView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/modal');
    };

    LeftSidebarView.prototype.initialize = function() {
      LeftSidebarView.__super__.initialize.apply(this, arguments);
      Mediator.subscribe('modal:render', this.show, this);
      return this;
    };

    LeftSidebarView.prototype.attach = function() {
      var el;
      LeftSidebarView.__super__.attach.apply(this, arguments);
      (el = $(this.el)).addClass('reveal-modal');
      this.title = el.find('.title');
      this.code = el.find('.code');
      this.text = el.find('.text');
      return this;
    };

    LeftSidebarView.prototype.show = function(_arg) {
      var code, el, scroll, text, title;
      title = _arg.title, text = _arg.text, code = _arg.code;
      el = $(this.el);
      if (title) {
        this.title.html(title);
      } else {
        this.title.html('');
      }
      if (code) {
        this.code.html(code.src).attr('data-language', code.lang);
        Rainbow.color();
      } else {
        this.code.html('');
      }
      if (text) {
        this.text.html(text);
      } else {
        this.text.html('');
      }
      el.reveal();
      scroll = el.find('.scroll');
      scroll.css({
        'height': 'auto'
      });
      if (el.outerHeight() > 500) {
        return scroll.css({
          'height': $(window).height() / 2
        });
      }
    };

    return LeftSidebarView;

  })(View);
  
});
window.require.register("chaplin/views/NextSteps", function(exports, require, module) {
  var Action, Mediator, NextStepsView, View, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  Action = require('chaplin/views/Action');

  root = this;

  module.exports = NextStepsView = (function(_super) {

    __extends(NextStepsView, _super);

    function NextStepsView() {
      this.showHidden = __bind(this.showHidden, this);

      this.filterLabels = __bind(this.filterLabels, this);

      this.add = __bind(this.add, this);
      return NextStepsView.__super__.constructor.apply(this, arguments);
    }

    NextStepsView.prototype.containerMethod = 'html';

    NextStepsView.prototype.autoRender = true;

    NextStepsView.prototype.tagName = 'div';

    NextStepsView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/next-steps');
    };

    NextStepsView.prototype.initialize = function() {
      var _this = this;
      NextStepsView.__super__.initialize.apply(this, arguments);
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
          'class': 'tools'
        })
      };
      $(this.el).find('div.tools').append(list);
      Mediator.publish('context:new');
      Mediator.subscribe('app:search', this.filterLabels, this);
      this.delegate('click', '.show', this.showHidden);
      return this.noActions = $(this.el).find('p.noactions');
    };

    NextStepsView.prototype.add = function() {
      var cat, context, dom, i, list, obj, suffix, target, view, _ref;
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
        _ref = obj.category;
        for (i in _ref) {
          cat = _ref[i];
          dom = dom.children;
          if (!dom[cat]) {
            target.append($('<h4/>', {
              'html': cat,
              'class': "size-" + i
            }));
            dom[cat] = {
              'children': {},
              'entries': list = $('<ul/>', {
                'class': "tools size-" + i
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
          return $(this.el).find('.show.hidden').removeClass('hidden');
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
        var part, re, view, _i, _j, _len, _len1, _ref, _ref1;
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
          _ref = _this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            view = _ref[_i];
            if (view.keywords.match(re)) {
              $(view.el).show();
            } else {
              $(view.el).hide();
            }
          }
        }
        if (_this.views.length !== 0) {
          _this.noActions.hide();
          _ref1 = _this.views;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            view = _ref1[_j];
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
window.require.register("chaplin/views/NextStepsAll", function(exports, require, module) {
  var Mediator, NextStepsAllView, NextStepsView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  NextStepsView = require('chaplin/views/NextSteps');

  module.exports = NextStepsAllView = (function(_super) {

    __extends(NextStepsAllView, _super);

    function NextStepsAllView() {
      return NextStepsAllView.__super__.constructor.apply(this, arguments);
    }

    NextStepsAllView.prototype.container = '#next';

    NextStepsAllView.prototype.method = 'new';

    NextStepsAllView.prototype.place = 'home';

    return NextStepsAllView;

  })(NextStepsView);
  
});
window.require.register("chaplin/views/NextStepsHeader", function(exports, require, module) {
  var Mediator, NextStepsHeaderView, NextStepsView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  NextStepsView = require('chaplin/views/NextSteps');

  module.exports = NextStepsHeaderView = (function(_super) {

    __extends(NextStepsHeaderView, _super);

    function NextStepsHeaderView() {
      return NextStepsHeaderView.__super__.constructor.apply(this, arguments);
    }

    NextStepsHeaderView.prototype.container = '#always-on';

    NextStepsHeaderView.prototype.method = 'new';

    NextStepsHeaderView.prototype.place = 'header';

    NextStepsHeaderView.prototype.labelClass = 'button';

    NextStepsHeaderView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/next-steps-header');
    };

    return NextStepsHeaderView;

  })(NextStepsView);
  
});
window.require.register("chaplin/views/NextStepsRight", function(exports, require, module) {
  var Mediator, NextStepsRightView, NextStepsView, Registry,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  Registry = require('tools/Registry');

  NextStepsView = require('chaplin/views/NextSteps');

  module.exports = NextStepsRightView = (function(_super) {

    __extends(NextStepsRightView, _super);

    function NextStepsRightView() {
      return NextStepsRightView.__super__.constructor.apply(this, arguments);
    }

    NextStepsRightView.prototype.container = '#continue';

    NextStepsRightView.prototype.method = 'continue';

    NextStepsRightView.prototype.place = 'right';

    return NextStepsRightView;

  })(NextStepsView);
  
});
window.require.register("chaplin/views/RightSidebar", function(exports, require, module) {
  var NextStepsRightView, RightSidebarView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  NextStepsRightView = require('chaplin/views/NextStepsRight');

  module.exports = RightSidebarView = (function(_super) {

    __extends(RightSidebarView, _super);

    function RightSidebarView() {
      return RightSidebarView.__super__.constructor.apply(this, arguments);
    }

    RightSidebarView.prototype.container = 'aside#right';

    RightSidebarView.prototype.containerMethod = 'html';

    RightSidebarView.prototype.autoRender = true;

    RightSidebarView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/sidebar-right');
    };

    RightSidebarView.prototype.attach = function() {
      RightSidebarView.__super__.attach.apply(this, arguments);
      this.views.push(new NextStepsRightView());
      return this;
    };

    return RightSidebarView;

  })(View);
  
});
window.require.register("chaplin/views/Tool", function(exports, require, module) {
  var CrumbView, GenericToolView, Mediator, Tool, ToolView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  Tool = require('chaplin/models/Tool');

  GenericToolView = require('chaplin/views/GenericTool');

  CrumbView = require('chaplin/views/Crumb');

  module.exports = ToolView = (function(_super) {

    __extends(ToolView, _super);

    function ToolView() {
      this.checkCrumbs = __bind(this.checkCrumbs, this);
      return ToolView.__super__.constructor.apply(this, arguments);
    }

    ToolView.prototype.container = 'div#widget';

    ToolView.prototype.containerMethod = 'html';

    ToolView.prototype.autoRender = true;

    ToolView.prototype.getTemplateFunction = function() {
      return require('chaplin/templates/tool');
    };

    ToolView.prototype.getTemplateData = function() {
      var data, _ref;
      data = _.extend(this.model.toJSON(), {
        'step': this.step
      });
      if (this.options.previous) {
        data = _.extend(data, {
          'previous': (_ref = this.options.previous) != null ? _ref.data : void 0
        });
      }
      return data;
    };

    ToolView.prototype.initialize = function() {
      var _this = this;
      ToolView.__super__.initialize.apply(this, arguments);
      this.step = this.options.step || 1;
      return Mediator.subscribe('tool:step', function(step) {
        _this.step = step;
        return _this.render();
      }, this);
    };

    ToolView.prototype.attach = function() {
      var content, name;
      ToolView.__super__.attach.apply(this, arguments);
      this.crumbs = [];
      name = this.model.get('name');
      assert(name, 'Name of the tool is not provided');
      content = $(this.el).find("ul.accordion li[data-step='" + this.step + "'] div.content");
      content.html((require("tools/" + name + "/step-" + this.step))(this.getTemplateData()));
      this.checkCrumbs();
      if (this.model.get('locked') != null) {
        this.updateTime($(this.el).find('em.ago'));
      }
      return this;
    };

    ToolView.prototype.checkCrumbs = function() {
      var collection, crumb, crumbs, guids, model, models, v, _fn, _i, _j, _len, _len1, _ref,
        _this = this;
      collection = window.History;
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
        if (!window.Utils.arrayEql(this.crumbs, guids)) {
          this.crumbs = guids;
          crumbs = $(this.el).find('ul.breadcrumbs');
          _ref = this.views;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            v = _ref[_i];
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
      return this.timeouts.push(setTimeout(this.checkCrumbs, 1000));
    };

    ToolView.prototype.getDOM = function() {
      return $(this.el).find('ul.accordion li.active div.content');
    };

    return ToolView;

  })(GenericToolView);
  
});
window.require.register("tools/DownloadTool/Model", function(exports, require, module) {
  var DownloadTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = DownloadTool = (function(_super) {

    __extends(DownloadTool, _super);

    function DownloadTool() {
      return DownloadTool.__super__.constructor.apply(this, arguments);
    }

    DownloadTool.prototype.defaults = {
      'slug': 'download-tool',
      'name': 'DownloadTool',
      'type': 'turq',
      'steps': ['Choose export format', 'Download exported data']
    };

    return DownloadTool;

  })(Tool);
  
});
window.require.register("tools/DownloadTool/View", function(exports, require, module) {
  var DownloadToolView, Mediator, ToolView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = DownloadToolView = (function(_super) {

    __extends(DownloadToolView, _super);

    function DownloadToolView() {
      this.exportData = __bind(this.exportData, this);
      return DownloadToolView.__super__.constructor.apply(this, arguments);
    }

    DownloadToolView.prototype.attach = function() {
      var data, format, list, _ref, _ref1, _ref2, _ref3,
        _this = this;
      DownloadToolView.__super__.attach.apply(this, arguments);
      switch (this.step) {
        case 1:
          data = {};
          list = (_ref = this.options) != null ? (_ref1 = _ref.previous) != null ? (_ref2 = _ref1.data) != null ? _ref2.list : void 0 : void 0 : void 0;
          if (list) {
            data.pq = "<xml key=\"" + list.key + "\"><item select=\"random\"></item></xml>";
          }
          format = (_ref3 = this.options) != null ? _ref3.extra : void 0;
          if (format) {
            data.format = format;
          }
          if (data.pq && data.format) {
            this.exportData(data);
          }
      }
      return this.delegate('click', '#submit', function() {
        var dom;
        dom = _this.getDOM();
        return _this.exportData({
          'pq': dom.find('textarea.pq').val(),
          'format': dom.find('select.format').val()
        });
      });
    };

    DownloadToolView.prototype.exportData = function(data) {
      assert(data, 'No input data provided');
      this.model.set({
        'data': data
      });
      Mediator.publish('history:add', this.model);
      return Mediator.publish('tool:step', this.step += 1);
    };

    return DownloadToolView;

  })(ToolView);
  
});
window.require.register("tools/DownloadTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <form class="row">\n                <div class="twelve columns">\n                    <label>PathQuery to reach the data</label>\n                    ');
      
        if (this.data && this.data.pq) {
          __out.push('\n                        <textarea class="pq">');
          __out.push(this.data.pq);
          __out.push('</textarea>\n                    ');
        } else {
          __out.push('\n                        <textarea class="pq"></textarea>\n                    ');
        }
      
        __out.push('\n                </div>\n            </form>\n            <form class="row">\n                <div class="six columns">\n                    <label>Export format</label>\n                    <select class="format">\n                        ');
      
        if (this.data && this.data.format) {
          __out.push('\n                            <option value="csv" ');
          if (this.data.format === 'csv') {
            __out.push('selected="selected"');
          }
          __out.push('>Comma Separated Values (CSV)</option>\n                            <option value="galaxy" ');
          if (this.data.format === 'galaxy') {
            __out.push('selected="selected"');
          }
          __out.push('>Galaxy @genenetwork.org</option>\n                        ');
        } else {
          __out.push('\n                            <option value="csv">Comma Separated Values (CSV)</option>\n                            <option value="galaxy">Galaxy @genenetwork.org</option>\n                        ');
        }
      
        __out.push('\n                    </select>\n                </div>\n            </form>\n        </div>\n    </div>\n    <div class="row">\n        <div class="twelve columns">\n            <a id="submit" class="button">Export</span></a>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/DownloadTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>You are exporting data and it feels great &hellip;.</p>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/EnrichListTool/Model", function(exports, require, module) {
  var EnrichListTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = EnrichListTool = (function(_super) {

    __extends(EnrichListTool, _super);

    function EnrichListTool() {
      return EnrichListTool.__super__.constructor.apply(this, arguments);
    }

    EnrichListTool.prototype.defaults = {
      'slug': 'enrich-list-tool',
      'name': 'EnrichListTool',
      'title': 'Enrich a List',
      'description': 'Show a list enrichment chart',
      'type': 'crail',
      'steps': ['Choose a list', 'See Chart']
    };

    return EnrichListTool;

  })(Tool);
  
});
window.require.register("tools/EnrichListTool/View", function(exports, require, module) {
  var EnrichListToolView, Mediator, ToolView, lists,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  lists = [
    {
      key: 'acme',
      name: 'ACME/Herman Inc.',
      items: ['Scott Golden', 'Ronan Buckley', 'Bevis Herman', 'Linus Melendez', 'Jameson Maddox']
    }, {
      key: 'caldwell',
      name: 'The Caldwell Trust',
      items: ['Caldwell Little', 'Hyatt Dudley', 'Herman Parks', 'Abdul Owens', 'Tyrone Banks']
    }
  ];

  module.exports = EnrichListToolView = (function(_super) {

    __extends(EnrichListToolView, _super);

    function EnrichListToolView() {
      this.enrichList = __bind(this.enrichList, this);

      this.selectList = __bind(this.selectList, this);
      return EnrichListToolView.__super__.constructor.apply(this, arguments);
    }

    EnrichListToolView.prototype.getTemplateData = function() {
      var found, l, list, _i, _len, _ref, _ref1;
      switch (this.step) {
        case 1:
          list = (_ref = this.model.get('data')) != null ? _ref.list : void 0;
          if (list) {
            found = false;
            _ref1 = this.lists;
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
              l = _ref1[_i];
              if (!found) {
                if (l.key === list.key) {
                  l.selected = true;
                  found = true;
                }
              }
            }
            if (!found) {
              list.selected = true;
              this.lists.push(list);
            }
            this.selected = list;
          }
          return _.extend(EnrichListToolView.__super__.getTemplateData.apply(this, arguments), {
            'lists': this.lists
          });
        default:
          return EnrichListToolView.__super__.getTemplateData.apply(this, arguments);
      }
    };

    EnrichListToolView.prototype.initialize = function() {
      EnrichListToolView.__super__.initialize.apply(this, arguments);
      return this.lists = this.property(lists);
    };

    EnrichListToolView.prototype.attach = function() {
      var list, _ref, _ref1, _ref2;
      EnrichListToolView.__super__.attach.apply(this, arguments);
      switch (this.step) {
        case 1:
          list = (_ref = this.options) != null ? (_ref1 = _ref.previous) != null ? (_ref2 = _ref1.data) != null ? _ref2.list : void 0 : void 0 : void 0;
          if (list) {
            this.selected = list;
            this.enrichList();
          }
          break;
        case 2:
          assert(this.model.get('data'), 'List not provided');
          Mediator.publish('context:new', ['have:list'], this.model.get('guid'));
      }
      this.delegate('click', 'input.check', this.selectList);
      this.delegate('click', '#submit', this.enrichList);
      return this;
    };

    EnrichListToolView.prototype.selectList = function(e) {
      $(this.el).find('table input.check').prop('checked', false);
      this.selected = this.lists[$(e.target).attr('data-key')];
      return $(e.target).prop('checked', true);
    };

    EnrichListToolView.prototype.enrichList = function() {
      if (!this.selected) {
        return Mediator.publish('modal:render', {
          'title': 'Oops &hellip;',
          'text': 'You have not selected any lists.'
        });
      } else {
        this.model.set({
          'data': {
            'list': this.selected
          }
        });
        Mediator.publish('history:add', this.model);
        return Mediator.publish('tool:step', this.step += 1);
      }
    };

    return EnrichListToolView;

  })(ToolView);
  
});
window.require.register("tools/EnrichListTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
        var key, val, _ref;
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>Select the list you want to enrich:</p>\n            <table class="table">\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th>List name</th>\n                        <th>Tags</th>\n                        <th>Size</th>\n                    </tr>\n                </thead>\n                <tbody>\n                ');
      
        _ref = this.lists;
        for (key in _ref) {
          val = _ref[key];
          __out.push('\n                    <tr>\n                        <td style="text-align:center"><input type="checkbox" data-key="');
          __out.push(__sanitize(key));
          __out.push('" class="check" ');
          if (val.selected) {
            __out.push('checked="checked"');
          }
          __out.push(' /></td>\n                        <td>');
          __out.push(__sanitize(val.name));
          __out.push('</td>\n                        <td>\n                            <span class="label">Random data</span>\n                        </td>\n                        <td>');
          __out.push(__sanitize(val.items.length));
          __out.push(' Item(s)</td>\n                    </tr>\n                ');
        }
      
        __out.push('\n                </tbody>\n            </table>\n        </div>\n    </div>\n    <div class="row">\n        <div class="twelve columns">\n            <a id="submit" class="button">Enrich the selected list</span></a>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/EnrichListTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
        var id, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="four columns">\n            <h2>Gene Enrichment</h2>\n            <p>A chart for list "');
      
        __out.push(__sanitize(this.data.list.name));
      
        __out.push('":</p>\n            <ul>\n                ');
      
        _ref = this.data.list.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          __out.push('\n                    <li>');
          __out.push(__sanitize(id));
          __out.push('</li>\n                ');
        }
      
        __out.push('\n            </ul>\n        </div>\n        <div class="four columns">\n            <h2>Publication Enrichment</h2>\n            <p>A chart for list "');
      
        __out.push(__sanitize(this.data.list.name));
      
        __out.push('":</p>\n            <ul>\n                ');
      
        _ref1 = this.data.list.items;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          id = _ref1[_j];
          __out.push('\n                    <li>');
          __out.push(__sanitize(id));
          __out.push('</li>\n                ');
        }
      
        __out.push('\n            </ul>\n        </div>\n        <div class="four columns">\n            <h2>Protein Enrichment</h2>\n            <p>A chart for list "');
      
        __out.push(__sanitize(this.data.list.name));
      
        __out.push('":</p>\n            <ul>\n                ');
      
        _ref2 = this.data.list.items;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          id = _ref2[_k];
          __out.push('\n                    <li>');
          __out.push(__sanitize(id));
          __out.push('</li>\n                ');
        }
      
        __out.push('\n            </ul>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/GenerateCodeTool/Model", function(exports, require, module) {
  var GenerateCodeTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = GenerateCodeTool = (function(_super) {

    __extends(GenerateCodeTool, _super);

    function GenerateCodeTool() {
      return GenerateCodeTool.__super__.constructor.apply(this, arguments);
    }

    GenerateCodeTool.prototype.defaults = {
      'slug': 'generate-code-tool',
      'name': 'GenerateCodeTool',
      'type': 'deyork',
      'steps': ['Choose input', 'See code']
    };

    return GenerateCodeTool;

  })(Tool);
  
});
window.require.register("tools/GenerateCodeTool/View", function(exports, require, module) {
  var GenerateCodeToolView, Mediator, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = GenerateCodeToolView = (function(_super) {

    __extends(GenerateCodeToolView, _super);

    function GenerateCodeToolView() {
      return GenerateCodeToolView.__super__.constructor.apply(this, arguments);
    }

    return GenerateCodeToolView;

  })(ToolView);
  
});
window.require.register("tools/GenerateCodeTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/GenerateCodeTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/LinkoutTool/Model", function(exports, require, module) {
  var LinkoutTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = LinkoutTool = (function(_super) {

    __extends(LinkoutTool, _super);

    function LinkoutTool() {
      return LinkoutTool.__super__.constructor.apply(this, arguments);
    }

    LinkoutTool.prototype.defaults = {
      'slug': 'linkout-tool',
      'name': 'LinkoutTool',
      'type': 'deyork'
    };

    return LinkoutTool;

  })(Tool);
  
});
window.require.register("tools/LinkoutTool/View", function(exports, require, module) {
  var LinkoutToolView, Mediator, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = LinkoutToolView = (function(_super) {

    __extends(LinkoutToolView, _super);

    function LinkoutToolView() {
      return LinkoutToolView.__super__.constructor.apply(this, arguments);
    }

    return LinkoutToolView;

  })(ToolView);
  
});
window.require.register("tools/LinkoutTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/LinkoutTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ListWidgetTool/Model", function(exports, require, module) {
  var ListWidgetTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = ListWidgetTool = (function(_super) {

    __extends(ListWidgetTool, _super);

    function ListWidgetTool() {
      return ListWidgetTool.__super__.constructor.apply(this, arguments);
    }

    ListWidgetTool.prototype.defaults = {
      'slug': 'list-widget-tool',
      'name': 'ListWidgetTool',
      'type': 'deyork',
      'steps': ['Choose input', 'See widget']
    };

    return ListWidgetTool;

  })(Tool);
  
});
window.require.register("tools/ListWidgetTool/View", function(exports, require, module) {
  var ListWidgetToolView, Mediator, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = ListWidgetToolView = (function(_super) {

    __extends(ListWidgetToolView, _super);

    function ListWidgetToolView() {
      return ListWidgetToolView.__super__.constructor.apply(this, arguments);
    }

    return ListWidgetToolView;

  })(ToolView);
  
});
window.require.register("tools/ListWidgetTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ListWidgetTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/QueryBuilderTool/Model", function(exports, require, module) {
  var QueryBuilderTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = QueryBuilderTool = (function(_super) {

    __extends(QueryBuilderTool, _super);

    function QueryBuilderTool() {
      return QueryBuilderTool.__super__.constructor.apply(this, arguments);
    }

    QueryBuilderTool.prototype.defaults = {
      'slug': 'query-builder-tool',
      'name': 'QueryBuilderTool',
      'type': 'deyork',
      'steps': ['Build query', 'See query']
    };

    return QueryBuilderTool;

  })(Tool);
  
});
window.require.register("tools/QueryBuilderTool/View", function(exports, require, module) {
  var Mediator, QueryBuilderView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = QueryBuilderView = (function(_super) {

    __extends(QueryBuilderView, _super);

    function QueryBuilderView() {
      return QueryBuilderView.__super__.constructor.apply(this, arguments);
    }

    return QueryBuilderView;

  })(ToolView);
  
});
window.require.register("tools/QueryBuilderTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/QueryBuilderTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/Registry", function(exports, require, module) {
  var config;

  config = [
    {
      'slug': 'upload-tool',
      'help': 'On first step choose between list, template, region search that changes the form on step 1',
      'labels': [
        {
          'label': 'Upload',
          'weight': 10,
          'place': 'header',
          'keywords': ['list', 'template', 'region']
        }, {
          'label': 'Upload list, template or a region',
          'weight': 10,
          'place': 'home',
          'keywords': ['list', 'template', 'region']
        }
      ]
    }, {
      'slug': 'search-tool',
      'help': 'Filter tools on the page & run quick search on the server',
      'labels': [
        {
          'label': 'Search',
          'weight': 10,
          'place': 'header',
          'keywords': ['filter']
        }
      ]
    }, {
      'slug': 'query-builder-tool',
      'help': 'A query builder or a tool that suggest a query based on your input',
      'labels': [
        {
          'label': 'Build some stuff',
          'weight': 10,
          'place': 'right',
          'category': ['Start again'],
          'keywords': ['query', 'builder', 'suggest']
        }
      ]
    }, {
      'slug': 'blast-tool',
      'help': 'Concordia example tool',
      'labels': [
        {
          'label': 'BLAST from the past',
          'weight': 10,
          'place': 'right',
          'category': ['Start again'],
          'keywords': ['concordia']
        }
      ]
    }, {
      'slug': 'set-operations-tool',
      'help': 'You can always do set operations on a list',
      'labels': [
        {
          'label': 'Do set operations',
          'weight': 10,
          'place': 'right',
          'category': ['Start again'],
          'keywords': ['union', 'intersection', 'subtraction']
        }, {
          'label': 'List union',
          'weight': 10,
          'context': ['have:list'],
          'place': 'right',
          'category': ['Set operations'],
          'extra': 'union'
        }, {
          'label': 'List intersection',
          'weight': 10,
          'context': ['have:list'],
          'place': 'right',
          'category': ['Set operations'],
          'extra': 'intersection'
        }, {
          'label': 'List subtraction',
          'weight': 10,
          'context': ['have:list'],
          'place': 'right',
          'category': ['Set operations'],
          'extra': 'subtraction'
        }
      ]
    }, {
      'slug': 'download-tool',
      'help': 'tab, csv, sequence (fasta), gff3, xml, json, bed',
      'labels': [
        {
          'label': 'Download in TAB format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'tab',
          'keywords': ['export']
        }, {
          'label': 'Download in CSV format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'csv',
          'keywords': ['export']
        }, {
          'label': 'Download in sequence format (FASTA)',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'fasta',
          'keywords': ['export']
        }, {
          'label': 'Download in GFF3 format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'gff3',
          'keywords': ['export']
        }, {
          'label': 'Download in XML format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'xml',
          'keywords': ['export']
        }, {
          'label': 'Download in JSON format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'json',
          'keywords': ['export']
        }, {
          'label': 'Download in BED format',
          'weight': 10,
          'context': ['can:download'],
          'place': 'right',
          'category': ['Download'],
          'extra': 'bed',
          'keywords': ['export']
        }
      ]
    }, {
      'slug': 'save-tool',
      'help': 'when something is saveable, usually it will be a list',
      'labels': [
        {
          'label': 'Save',
          'weight': 10,
          'context': ['can:save'],
          'place': 'right',
          'category': ['Save'],
          'keywords': ['list']
        }
      ]
    }, {
      'slug': 'generate-code-tool',
      'help': 'python, js, ruby, java, perl',
      'labels': [
        {
          'label': 'Generate code in Python',
          'weight': 10,
          'context': ['can:code'],
          'place': 'right',
          'category': ['Code'],
          'extra': 'python'
        }, {
          'label': 'Generate code in JavaScript',
          'weight': 10,
          'context': ['can:code'],
          'place': 'right',
          'category': ['Code'],
          'extra': 'js'
        }, {
          'label': 'Generate code in Ruby',
          'weight': 10,
          'context': ['can:code'],
          'place': 'right',
          'category': ['Code'],
          'extra': 'ruby'
        }, {
          'label': 'Generate code in Java',
          'weight': 10,
          'context': ['can:code'],
          'place': 'right',
          'category': ['Code'],
          'extra': 'java'
        }, {
          'label': 'Generate code in Perl',
          'weight': 10,
          'context': ['can:code'],
          'place': 'right',
          'category': ['Code'],
          'extra': 'perl'
        }
      ]
    }, {
      'slug': 'linkout-tool',
      'help': 'not a tool per se, a link is one provided by config; has an icon to show this fact',
      'labels': [
        {
          'label': 'ArrayExpress Atlas',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.ebi.ac.uk/gxa/gene/<%= @id %>',
          'keywords': ['ebi']
        }, {
          'label': 'UniGene',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene&cmd=search&term=<%= @symbol %>+AND+<%= @taxon %>[orgn]',
          'keywords': ['ncbi', 'entrez']
        }, {
          'label': 'FlyExpress',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.flyexpress.net/search.php?type=image&search=<%= @id %>'
        }, {
          'label': 'FlyBase',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.flybase.org/.bin/fbidq.html?<%= @id %>'
        }, {
          'label': 'GenomeRNAi',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://genomernai.de/GenomeRNAi/genedetails/<%= @id %>'
        }, {
          'label': 'ensembl',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.ensembl.org/Drosophila_melanogaster/geneview?db=core&gene=<%= @id %>',
          'keywords': ['drosophila']
        }, {
          'label': 'BDGP in situ',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.fruitfly.org/cgi-bin/ex/bquery.pl?qtype=report&find=<%= @id %>&searchfield=CG',
          'keywords': ['fruitfly']
        }, {
          'label': 'Entrez Gene',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?db=gene&cmd=Retrieve&dopt=full_report&list_uids=<%= @id %>',
          'keywords': ['ncbi', 'entrez']
        }, {
          'label': 'FlyAtlas',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://flyatlas.org/atlas.cgi?name=<%= @id %>'
        }, {
          'label': 'Homologene',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://www.ncbi.nlm.nih.gov/sites/entrez?Db=homologene&cmd=detailssearch&term=<%= @taxon %>[orgn]+<%= @symbol %>[Gene]',
          'keywords': ['ncbi']
        }, {
          'label': 'BioGRID',
          'weight': 10,
          'context': ['can:linkout'],
          'place': 'linkout',
          'category': ['Linkouts'],
          'href': 'http://thebiogrid.org/search.php?search=<%= @id %>&organism=<%= @organism %>'
        }
      ]
    }, {
      'slug': 'list-widget-tool',
      'help': 'List Widgets',
      'labels': [
        {
          'label': 'Enrichment',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Gene ontology'],
          'extra': 'enrichment',
          'keywords': ['gene', 'ontology', 'enrich', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Gene ontology'],
          'extra': 'chart',
          'keywords': ['gene', 'ontology', 'chart', 'graph', 'widget']
        }, {
          'label': 'Enrichment',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Pathways'],
          'extra': 'enrichment',
          'keywords': ['pathways', 'enrich', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Pathways'],
          'extra': 'chart',
          'keywords': ['pathways', 'chart', 'graph', 'widget']
        }, {
          'label': 'Enrichment',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Literature'],
          'extra': 'enrichment',
          'keywords': ['literature', 'publications', 'enrich', 'widget']
        }, {
          'label': 'Enrichment',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['fly-FISH expression experiment'],
          'extra': 'enrichment',
          'keywords': ['flyfish', 'expression', 'enrich', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['fly-FISH expression experiment'],
          'extra': 'chart',
          'keywords': ['flyfish', 'expression', 'chart', 'graph', 'widget']
        }, {
          'label': 'Enrichment',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['BDGP'],
          'extra': 'enrichment',
          'keywords': ['bdgp', 'enrich', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['BDGP'],
          'extra': 'chart',
          'keywords': ['bdgp', 'chart', 'graph', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Homologue'],
          'extra': 'chart',
          'keywords': ['homologue', 'chart', 'graph', 'widget']
        }, {
          'label': 'Chromosome distribution',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Genes'],
          'extra': 'chart',
          'keywords': ['gene', 'chart', 'graph', 'widget']
        }, {
          'label': 'Chromosome distribution',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Sequence Features'],
          'extra': 'chart',
          'keywords': ['sequence', 'chart', 'graph', 'widget']
        }
      ]
    }, {
      'slug': 'query-tool',
      'labels': [
        {
          'label': 'Query',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Gene ontology'],
          'keywords': ['gene', 'ontology']
        }
      ]
    }, {
      'slug': 'report-tool',
      'labels': [
        {
          'label': 'Show gene summary',
          'weight': 10,
          'context': ['type:gene', 'n:1'],
          'place': 'right',
          'category': ['Genes'],
          'keywords': ['report']
        }, {
          'label': 'Show gene summary',
          'weight': 10,
          'context': ['type:gene', 'n:1'],
          'place': 'right',
          'category': ['Sequence Features'],
          'keywords': ['report']
        }
      ]
    }, {
      'slug': 'report-widget-tool',
      'labels': [
        {
          'label': 'Cytoscape network',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Interactions'],
          'keywords': ['report', 'widget']
        }, {
          'label': 'Visualization',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Regulation'],
          'keywords': ['report', 'widget', 'regulation']
        }, {
          'label': 'Rat diseases',
          'weight': 10,
          'context': ['type:gene'],
          'place': 'right',
          'category': ['Diseases'],
          'keywords': ['report', 'widget', 'disease']
        }
      ]
    }, {
      'slug': 'results-table-tool',
      'labels': [
        {
          'label': 'Show in a table',
          'weight': 10,
          'context': ['have:list'],
          'place': 'right',
          'keywords': ['results']
        }
      ]
    }
  ];

  module.exports = config;
  
});
window.require.register("tools/ReportTool/Model", function(exports, require, module) {
  var ReportTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = ReportTool = (function(_super) {

    __extends(ReportTool, _super);

    function ReportTool() {
      return ReportTool.__super__.constructor.apply(this, arguments);
    }

    ReportTool.prototype.defaults = {
      'slug': 'report-tool',
      'name': 'ReportTool',
      'type': 'deyork',
      'steps': ['Choose input object', 'See report page']
    };

    return ReportTool;

  })(Tool);
  
});
window.require.register("tools/ReportTool/View", function(exports, require, module) {
  var Mediator, ReportToolView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = ReportToolView = (function(_super) {

    __extends(ReportToolView, _super);

    function ReportToolView() {
      return ReportToolView.__super__.constructor.apply(this, arguments);
    }

    return ReportToolView;

  })(ToolView);
  
});
window.require.register("tools/ReportTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ReportTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ReportWidgetTool/Model", function(exports, require, module) {
  var ReportWidgetTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = ReportWidgetTool = (function(_super) {

    __extends(ReportWidgetTool, _super);

    function ReportWidgetTool() {
      return ReportWidgetTool.__super__.constructor.apply(this, arguments);
    }

    ReportWidgetTool.prototype.defaults = {
      'slug': 'report-widget-tool',
      'name': 'ReportWidgetTool',
      'type': 'deyork',
      'steps': ['Choose input', 'See widget']
    };

    return ReportWidgetTool;

  })(Tool);
  
});
window.require.register("tools/ReportWidgetTool/View", function(exports, require, module) {
  var Mediator, ReportWidgetToolView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = ReportWidgetToolView = (function(_super) {

    __extends(ReportWidgetToolView, _super);

    function ReportWidgetToolView() {
      return ReportWidgetToolView.__super__.constructor.apply(this, arguments);
    }

    return ReportWidgetToolView;

  })(ToolView);
  
});
window.require.register("tools/ReportWidgetTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ReportWidgetTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/ResultsTableTool/Model", function(exports, require, module) {
  var ResultsTableTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = ResultsTableTool = (function(_super) {

    __extends(ResultsTableTool, _super);

    function ResultsTableTool() {
      return ResultsTableTool.__super__.constructor.apply(this, arguments);
    }

    ResultsTableTool.prototype.defaults = {
      'slug': 'results-table-tool',
      'name': 'ResultsTableTool',
      'title': 'Results Table',
      'description': 'Show a table of results',
      'type': 'curiousblue',
      'steps': ['See Table']
    };

    return ResultsTableTool;

  })(Tool);
  
});
window.require.register("tools/ResultsTableTool/View", function(exports, require, module) {
  var Mediator, ResultsTableTool, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = ResultsTableTool = (function(_super) {

    __extends(ResultsTableTool, _super);

    function ResultsTableTool() {
      return ResultsTableTool.__super__.constructor.apply(this, arguments);
    }

    ResultsTableTool.prototype.attach = function() {
      ResultsTableTool.__super__.attach.apply(this, arguments);
      return Mediator.publish('context:new', ['have:list'], this.model.get('parent'));
    };

    return ResultsTableTool;

  })(ToolView);
  
});
window.require.register("tools/ResultsTableTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
        var id, _i, _len, _ref;
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            ');
      
        if (this.previous && this.previous.list && this.previous.list.items) {
          __out.push('\n                <table class="table">\n                    <thead>\n                        <tr>\n                            <th>Identifier</th>\n                            <th>Attr 1</th>\n                            <th>Attr 2</th>\n                            <th>Attr 3</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        ');
          _ref = this.previous.list.items;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            id = _ref[_i];
            __out.push('\n                            <tr>\n                                <td>');
            __out.push(__sanitize(id));
            __out.push('</td>\n                                <td>Дмитрий Фролов</td>\n                                <td>Егор Мальцев</td>\n                                <td>Станислав Тарасов</td>\n                            </tr>\n                        ');
          }
          __out.push('\n                    </tbody>\n                </table>\n            ');
        }
      
        __out.push('\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SaveTool/Model", function(exports, require, module) {
  var SaveTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = SaveTool = (function(_super) {

    __extends(SaveTool, _super);

    function SaveTool() {
      return SaveTool.__super__.constructor.apply(this, arguments);
    }

    SaveTool.prototype.defaults = {
      'slug': 'save-tool',
      'name': 'SaveTool',
      'type': 'deyork',
      'steps': ['Choose input', 'Save data']
    };

    return SaveTool;

  })(Tool);
  
});
window.require.register("tools/SaveTool/View", function(exports, require, module) {
  var Mediator, SaveToolView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = SaveToolView = (function(_super) {

    __extends(SaveToolView, _super);

    function SaveToolView() {
      return SaveToolView.__super__.constructor.apply(this, arguments);
    }

    return SaveToolView;

  })(ToolView);
  
});
window.require.register("tools/SaveTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
        var i, id, _ref;
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>Select the type of list to create and either enter in a list\n                of identifiers or upload identifiers from a file. A search will\n                be performed for all the identifiers in your list.</p>\n        </div>\n    </div>\n    <form class="row custom">\n        <div class="six columns">\n            <label>List of identifiers</label>\n            ');
      
        if (this.data && this.data.list) {
          __out.push('\n                <textarea>');
          _ref = this.data.list.items;
          for (i in _ref) {
            id = _ref[i];
            __out.push(__sanitize(id));
            if (parseInt(i) !== this.data.list.items.length - 1) {
              __out.push(' ');
            }
          }
          __out.push('</textarea>\n            ');
        } else {
          __out.push('\n                <textarea>PPARG ZEN MAD</textarea>\n            ');
        }
      
        __out.push('\n        </div>\n        <div class="six columns">\n            <label>Identifier type</label>\n            <select class="three">\n                <option>Genes</option>\n                <option>Proteins</option>\n            </select>\n        </div>\n    </form>\n    <div class="row">\n        <div class="twelve columns">\n            <a id="submit" class="button">Upload a list</span></a>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SaveTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>You have uploaded a list. Maybe some of the steps on the right take your fancy?</p>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SearchTool/Model", function(exports, require, module) {
  var SearchTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = SearchTool = (function(_super) {

    __extends(SearchTool, _super);

    function SearchTool() {
      return SearchTool.__super__.constructor.apply(this, arguments);
    }

    SearchTool.prototype.defaults = {
      'slug': 'search-tool',
      'name': 'SearchTool',
      'type': 'deyork',
      'steps': ['Input query', 'See result']
    };

    return SearchTool;

  })(Tool);
  
});
window.require.register("tools/SearchTool/View", function(exports, require, module) {
  var Mediator, SearchToolView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = SearchToolView = (function(_super) {

    __extends(SearchToolView, _super);

    function SearchToolView() {
      return SearchToolView.__super__.constructor.apply(this, arguments);
    }

    return SearchToolView;

  })(ToolView);
  
});
window.require.register("tools/SearchTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SearchTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SetOperationsTool/Model", function(exports, require, module) {
  var SetOperationsTool, Tool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = SetOperationsTool = (function(_super) {

    __extends(SetOperationsTool, _super);

    function SetOperationsTool() {
      return SetOperationsTool.__super__.constructor.apply(this, arguments);
    }

    SetOperationsTool.prototype.defaults = {
      'slug': 'set-operations-tool',
      'name': 'SetOperationsTool',
      'type': 'deyork',
      'steps': ['Choose lists and operation', 'See result']
    };

    return SetOperationsTool;

  })(Tool);
  
});
window.require.register("tools/SetOperationsTool/View", function(exports, require, module) {
  var Mediator, SetOperationsToolView, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = SetOperationsToolView = (function(_super) {

    __extends(SetOperationsToolView, _super);

    function SetOperationsToolView() {
      return SetOperationsToolView.__super__.constructor.apply(this, arguments);
    }

    return SetOperationsToolView;

  })(ToolView);
  
});
window.require.register("tools/SetOperationsTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/SetOperationsTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
      
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/UploadTool/Model", function(exports, require, module) {
  var Tool, UploadListTool,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tool = require('chaplin/models/Tool');

  module.exports = UploadListTool = (function(_super) {

    __extends(UploadListTool, _super);

    function UploadListTool() {
      return UploadListTool.__super__.constructor.apply(this, arguments);
    }

    UploadListTool.prototype.defaults = {
      'slug': 'upload-tool',
      'name': 'UploadTool',
      'title': 'Upload a List',
      'description': 'Upload a list of identifiers',
      'type': 'deyork',
      'steps': ['Input Identifiers', 'See Result']
    };

    return UploadListTool;

  })(Tool);
  
});
window.require.register("tools/UploadTool/View", function(exports, require, module) {
  var Mediator, ToolView, UploadListToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = UploadListToolView = (function(_super) {

    __extends(UploadListToolView, _super);

    function UploadListToolView() {
      return UploadListToolView.__super__.constructor.apply(this, arguments);
    }

    UploadListToolView.prototype.attach = function() {
      UploadListToolView.__super__.attach.apply(this, arguments);
      switch (this.step) {
        case 2:
          Mediator.publish('context:new', ['have:list'], this.model.get('guid'));
      }
      this.delegate('click', '#submit', function() {
        this.model.set('data', {
          'list': {
            key: 'temp',
            name: 'Just uploaded',
            items: this.getDOM().find('form textarea').val().split(' ')
          }
        });
        Mediator.publish('history:add', this.model);
        return Mediator.publish('tool:step', this.step += 1);
      });
      return this;
    };

    return UploadListToolView;

  })(ToolView);
  
});
window.require.register("tools/UploadTool/step-1", function(exports, require, module) {
  module.exports = function (__obj) {
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
        var i, id, _ref;
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>Select the type of list to create and either enter in a list\n                of identifiers or upload identifiers from a file. A search will\n                be performed for all the identifiers in your list.</p>\n        </div>\n    </div>\n    <form class="row custom">\n        <div class="six columns">\n            <label>List of identifiers</label>\n            ');
      
        if (this.data && this.data.list) {
          __out.push('\n                <textarea>');
          _ref = this.data.list.items;
          for (i in _ref) {
            id = _ref[i];
            __out.push(__sanitize(id));
            if (parseInt(i) !== this.data.list.items.length - 1) {
              __out.push(' ');
            }
          }
          __out.push('</textarea>\n            ');
        } else {
          __out.push('\n                <textarea>PPARG ZEN MAD</textarea>\n            ');
        }
      
        __out.push('\n        </div>\n        <div class="six columns">\n            <label>Identifier type</label>\n            <select class="three">\n                <option>Genes</option>\n                <option>Proteins</option>\n            </select>\n        </div>\n    </form>\n    <div class="row">\n        <div class="twelve columns">\n            <a id="submit" class="button">Upload a list</span></a>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
window.require.register("tools/UploadTool/step-2", function(exports, require, module) {
  module.exports = function (__obj) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>You have uploaded a list. Maybe some of the steps on the right take your fancy?</p>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
});
