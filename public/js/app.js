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

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"chaplin/controllers/error": function(exports, require, module) {
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

    ErrorController.prototype.historyURL = function(params) {
      return '';
    };

    ErrorController.prototype[404] = function(params) {
      this.views.push(new ErrorView({
        'template': 404
      }));
      return this.adjustTitle('404');
    };

    return ErrorController;

  })(Controller);
  
}});

window.require.define({"chaplin/controllers/landing": function(exports, require, module) {
  var Controller, LandingController, LandingView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  LandingView = require('chaplin/views/Landing');

  module.exports = LandingController = (function(_super) {

    __extends(LandingController, _super);

    function LandingController() {
      return LandingController.__super__.constructor.apply(this, arguments);
    }

    LandingController.prototype.historyURL = function(params) {
      return '';
    };

    LandingController.prototype.index = function(params) {
      this.views.push(new LandingView());
      return this.adjustTitle('Welcome');
    };

    return LandingController;

  })(Controller);
  
}});

window.require.define({"chaplin/controllers/tools": function(exports, require, module) {
  var AppView, Controller, HistoryView, LeftSidebarView, Mediator, ModalView, RightSidebarView, ToolsController,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('chaplin/core/Controller');

  Mediator = require('chaplin/core/Mediator');

  AppView = require('chaplin/views/App');

  LeftSidebarView = require('chaplin/views/LeftSidebar');

  RightSidebarView = require('chaplin/views/RightSidebar');

  HistoryView = require('chaplin/views/History');

  ModalView = require('chaplin/views/Modal');

  module.exports = ToolsController = (function(_super) {

    __extends(ToolsController, _super);

    function ToolsController() {
      return ToolsController.__super__.constructor.apply(this, arguments);
    }

    ToolsController.prototype.historyURL = function(params) {
      return '';
    };

    ToolsController.prototype.collection = window.History;

    ToolsController.prototype._chrome = function() {
      this.views.push(new AppView());
      this.views.push(new HistoryView({
        'collection': this.collection
      }));
      this.views.push(new LeftSidebarView());
      this.views.push(new RightSidebarView());
      return this.views.push(new ModalView());
    };

    ToolsController.prototype["new"] = function(_arg) {
      var Clazz, model, name, slug;
      slug = _arg.slug;
      this._chrome();
      name = window.Utils.hyphenToPascal(slug);
      Clazz = require("tools/models/" + name);
      model = new Clazz();
      Clazz = require("tools/views/" + name);
      this.views.push(new Clazz({
        'model': model
      }));
      return this.adjustTitle(model.get('title'));
    };

    ToolsController.prototype.cont = function(_arg) {
      var Clazz, guid, model, name, previous, slug;
      slug = _arg.slug, guid = _arg.guid;
      this._chrome();
      name = window.Utils.hyphenToPascal(slug);
      Clazz = require("tools/models/" + name);
      model = new Clazz();
      Clazz = require("tools/views/" + name);
      previous = (this.collection.where({
        'guid': guid
      })).pop();
      if (!previous) {
        window.App.router.route('/error/404', {
          'changeURL': false
        });
        assert(false, 'No previous step');
      }
      model.set({
        'parent': guid
      });
      this.views.push(new Clazz({
        'model': model,
        'previous': previous.toJSON()
      }));
      return this.adjustTitle(model.get('title'));
    };

    ToolsController.prototype.old = function(_arg) {
      var Clazz, guid, model, slug;
      slug = _arg.slug, guid = _arg.guid;
      model = this.collection.where({
        'slug': slug,
        'guid': guid
      })[0];
      if (!model) {
        window.App.router.route('/error/404', {
          'changeURL': false
        });
        assert(false, 'We do not have this Model in History');
      }
      this._chrome();
      Clazz = require("tools/views/" + (model.get('name')));
      model = this.collection.dupe(model);
      this.views.push(new Clazz({
        'model': model
      }));
      Mediator.publish('history:activate', guid);
      return this.adjustTitle(model.get('title'));
    };

    return ToolsController;

  })(Controller);
  
}});

window.require.define({"chaplin/core/Application": function(exports, require, module) {
  var Chaplin, InterMineSteps, Layout, Mediator, Registry, Routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('chaplin/core/AssertException');

  require('chaplin/core/Console');

  require('chaplin/core/Utils');

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

    InterMineSteps.prototype.initialize = function() {
      InterMineSteps.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        'controllerPath': 'chaplin/controllers/',
        'controllerSuffix': ''
      });
      this.initLayout();
      this.initRegistry();
      this.initRouter(Routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    InterMineSteps.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    InterMineSteps.prototype.initRegistry = function() {
      var key, map, _results;
      _results = [];
      for (key in Registry) {
        map = Registry[key];
        _results.push((function(key, map) {
          return Mediator.subscribe("context:" + key, function() {
            var obj, _i, _len, _results1;
            _results1 = [];
            for (_i = 0, _len = map.length; _i < _len; _i++) {
              obj = map[_i];
              _results1.push(Mediator.publish("contextRender:" + key, obj));
            }
            return _results1;
          }, this);
        })(key, map));
      }
      return _results;
    };

    return InterMineSteps;

  })(Chaplin.Application);
  
}});

window.require.define({"chaplin/core/AssertException": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/core/Collection": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/core/Console": function(exports, require, module) {
  
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
  
}});

window.require.define({"chaplin/core/Controller": function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

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
  
}});

window.require.define({"chaplin/core/Layout": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/core/LocalStorage": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/core/Mediator": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/core/Routes": function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'landing#index');
    match('tool/:slug/new', 'tools#new');
    match('tool/:slug/continue/:guid', 'tools#cont');
    match('tool/:slug/id/:guid', 'tools#old');
    return match('error/404', 'error#404');
  };
  
}});

window.require.define({"chaplin/core/Utils": function(exports, require, module) {
  
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
    }
  };
  
}});

window.require.define({"chaplin/core/View": function(exports, require, module) {
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

    View.prototype.afterRender = function() {
      View.__super__.afterRender.apply(this, arguments);
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

    return View;

  })(Chaplin.View);
  
}});

window.require.define({"chaplin/initialize": function(exports, require, module) {
  var History, InterMineSteps, root;

  InterMineSteps = require('chaplin/core/Application');

  History = require('chaplin/models/History');

  root = this;

  $(function() {
    return (new History()).bootup(function(collection) {
      root.History = collection;
      root.App = new InterMineSteps();
      return root.App.initialize();
    });
  });
  
}});

window.require.define({"chaplin/models/History": function(exports, require, module) {
  var Collection, History, LocalStorage, Mediator, Tool,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('chaplin/core/Collection');

  Mediator = require('chaplin/core/Mediator');

  LocalStorage = require('chaplin/core/LocalStorage');

  Tool = require('chaplin/models/Tool');

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
      return Mediator.subscribe('history:add', this.addTool, this);
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
            _this.checkStorage();
            return cb(coll);
          }
        });
      } else {
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          obj = data[_i];
          this.add(obj);
        }
        this.checkStorage();
        return cb(this);
      }
    };

    History.prototype.checkStorage = function() {
      var guid, obj, _i, _len, _ref;
      _ref = this.storage.findAll();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        guid = obj.guid;
        assert(guid, 'LocalStorage object has no `guid`');
        switch (this.where({
              'guid': guid
            }).length) {
          case 0:
            console.log("Adding `" + guid + "`");
            this.add(obj);
            break;
          case 1:
            break;
          default:
            assert(false, 'Cannot have more than 1 object with the same `guid`');
        }
      }
      return this.timeouts.push(setTimeout(this.checkStorage, 1000));
    };

    History.prototype.addTool = function(model) {
      var guid, notfound, parent;
      if (model.get('locked') != null) {
        if (parent = model.get('parent')) {
          window.App.router.changeURL("/tool/" + (model.get('slug')) + "/continue/" + parent);
        } else {
          window.App.router.changeURL("/tool/" + (model.get('slug')) + "/new");
        }
      }
      model.set('created', new Date());
      notfound = true;
      while (notfound) {
        guid = window.Utils.guid();
        if (this.where({
          'guid': guid
        }).length === 0) {
          notfound = false;
        }
      }
      model.set({
        'guid': guid
      });
      model.set({
        'locked': true
      });
      this.add(model);
      this.storage.add(model.toJSON());
      Mediator.publish('history:render', model);
      Mediator.publish('history:activate', guid);
      return Backbone.sync('update', this);
    };

    History.prototype.dupe = function(model) {
      var Clazz, key, obj, _i, _len, _ref;
      obj = model.toJSON();
      _ref = ['guid', 'created'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        delete obj[key];
      }
      Clazz = require("tools/models/" + obj.name);
      return new Clazz(obj);
    };

    return History;

  })(Collection);
  
}});

window.require.define({"chaplin/models/Tool": function(exports, require, module) {
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
  
}});

window.require.define({"chaplin/templates/404": function(exports, require, module) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="account right">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n        </div>\n    </header>\n\n    <section id="middle">\n        <div id="landing" class="container row">\n            <div class="twelve columns">\n                <h2>404, Page Not Found</h2>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/app": function(exports, require, module) {
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
      
        __out.push('<div id="wrapper">\n    <!-- header, account etc. -->\n    <header id="top">\n        <div class="inner">\n            <div class="account right">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n        </div>\n    </header>\n\n    <section id="middle">\n        <!-- new tools -->\n        <aside id="left"></aside>\n        <!-- the tool -->\n        <div id="widget"></div>\n        <!-- from here -->\n        <aside id="right"></aside>\n    </section>\n</div>\n\n<!-- show when we want to hide the app (but say not the history) -->\n<div id="whiteout"></div>\n\n<!-- tools used in the history -->\n<div id="history"></div>\n\n<!-- history toggler fixed to bottom -->\n<footer id="bottom">\n    <div class="wrap">\n        <a class="button" data-action="history-toggle">Show history</a>\n    </div>\n</footer>\n\n<!-- finally the almighty modal -->\n<div id="modal"></div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/history-tool": function(exports, require, module) {
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
      
        __out.push('<em class="ago"></em>\n<div class="wrap">\n    <a href="/tool/');
      
        __out.push(__sanitize(this.slug));
      
        __out.push('/id/');
      
        __out.push(__sanitize(this.guid));
      
        __out.push('">\n        <div class="box">\n            <h3>');
      
        __out.push(__sanitize(this.name));
      
        __out.push('</h3>\n            ');
      
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
}});

window.require.define({"chaplin/templates/history": function(exports, require, module) {
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
      
        __out.push('<div class="head">\n    <a id="serialize" class="button success">Serialize</a> <h1>History</h1>\n    <p class="message">Steps you have taken will be populated here as you work with this app.</p>\n</div>\n\n<div id="tools">\n    <svg class="canvas"></svg>\n    <table class="grid"></table>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/landing": function(exports, require, module) {
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="account right">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n        </div>\n    </header>\n\n    <section id="middle">\n        <div id="landing" class="container row">\n            <div class="four columns">\n                <h2>Tools</h2>\n                <!-- populate next steps here -->\n                <div id="next"></div>\n            </div>\n            <div class="four columns">\n                <h2>Help</h2>\n                <ul>\n                    <li>Lorem ipsum dolor</li>\n                    <li>Sed ut perspiciatis</li>\n                    <li>At vero eos et accusamus</li>\n                </ul>\n            </div>\n            <div class="four columns">\n                <div class="panel">\n                    <h5>System Actions</h5>\n                    <p>Use the following action to clear\n                        <code>Backbone.js Collection</code> and associated\n                        <code>LocalStorage</code>:</p>\n                    <a class="button" id="reset">Reset Database</a>\n                </div>\n            </div>\n            <div class="six columns">\n                <ul class="pricing-table">\n                    <li class="title">What it does now</li>\n                    <li class="bullet-item">Concept of a tool consisting of multiple steps</li>\n                    <li class="bullet-item"><strong>Linking</strong> between multiple tools through events</li>\n                    <li class="bullet-item">Dynamically updating used tool timestamps (time ago)</li>\n                    <li class="bullet-item"><strong>Serialization</strong> of history to the server (and locally)</li>\n                    <li class="bullet-item">Efficiently using local (rather than server) data when multiple tabbing</li>\n                    <li class="bullet-item"><strong>Multiple</strong> streams of history, splits, all rendered in a <strong>grid</strong></li>\n                    <li class="bullet-item"><strong>Back button</strong> to visit steps saved in the past</li>\n                    <li class="bullet-item"><strong>Multiple tabs</strong> to have an eyeball*</li>\n                    <li class="description">* sync all tabs a user has opened in a browser on 1Hz schedule</li>\n                </ul>\n            </div>\n            <div class="six columns">\n                <ul class="pricing-table">\n                    <li class="title">Working on next &hellip;</li>\n                    <li class="bullet-item">Latest breadcrumbs in all tabs</li>\n                    <li class="bullet-item">Tool registry having a label "weight" concept</li>\n                    <li class="bullet-item">Uncluttered example tools from a spec by Julie</li>\n                </ul>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/modal": function(exports, require, module) {
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
      
        __out.push('<h2 class="title"></h2>\n<div class="scroll">\n    <p class="text"></p>\n    <pre><code class="code"></code></pre>\n</div>\n<a class="close-reveal-modal">&#215;</a>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/sidebar-left": function(exports, require, module) {
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
      
        __out.push('<div class="wrap">\n    <h3>Tools</h3>\n    <div id="next"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/sidebar-right": function(exports, require, module) {
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
      
        __out.push('<div class="wrap">\n    <h3>Next Steps from Here</h3>\n    <p>The next steps you can take from here will be shown here.</p>\n    <div id="continue"></div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"chaplin/templates/tool": function(exports, require, module) {
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
      
        __out.push('<div class="wrap sidebar">\n\n    <!-- dynamically populated with event handling -->\n    <ul class="breadcrumbs"></ul>\n\n    <div class="head">\n        <h1>');
      
        __out.push(__sanitize(this.title));
      
        __out.push('</h1>\n        <em class="ago"></em>\n    </div>\n\n    ');
      
        if (this.steps.length !== 0) {
          __out.push('\n        <ul class="accordion">\n            ');
          _ref = this.steps;
          for (i in _ref) {
            title = _ref[i];
            __out.push('\n                ');
            i = parseInt(i) + 1;
            __out.push('\n                <li ');
            if (i === this.step) {
              __out.push('class="active"');
            }
            __out.push(' data-step="');
            __out.push(__sanitize(i));
            __out.push('">\n                    <div class="title">\n                        <h5>#');
            __out.push(__sanitize(i));
            __out.push(': ');
            __out.push(__sanitize(title));
            __out.push('</h5>\n                    </div>\n                    <div class="content">Dummy</div>\n                </li>\n            ');
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
}});

window.require.define({"chaplin/views/App": function(exports, require, module) {
  var AppView, Mediator, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

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

    AppView.prototype.afterRender = function() {
      AppView.__super__.afterRender.apply(this, arguments);
      this.delegate('click', '.button[data-action="history-toggle"]', this.historyToggle);
      this.delegate('click', 'header#top h1', function() {
        return Mediator.publish('router:landing');
      });
      return this;
    };

    AppView.prototype.historyToggle = function(e) {
      var btn;
      btn = $(e.target);
      btn.text(btn.text().slice(0, 4) === 'Show' ? 'Hide history' : 'Show history');
      return Mediator.publish('history:toggle');
    };

    return AppView;

  })(View);
  
}});

window.require.define({"chaplin/views/Error": function(exports, require, module) {
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
      return require("chaplin/templates/" + this.options.template);
    };

    return ErrorView;

  })(View);
  
}});

window.require.define({"chaplin/views/GenericTool": function(exports, require, module) {
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
      var a, b, c, created, queue, _ref;
      assert(this.model, 'Model is not set');
      created = new Date(this.model.get('created'));
      c = null;
      _ref = [0, 1], a = _ref[0], b = _ref[1];
      return (queue = function() {
        var d, _ref1, _ref2;
        d = moment(created).fromNow();
        if (c !== d) {
          _ref1 = [0, 1], a = _ref1[0], b = _ref1[1];
          el.text(c = d);
        } else {
          _ref2 = [b, a + b], a = _ref2[0], b = _ref2[1];
        }
        return setTimeout(queue, b * 1000);
      })();
    };

    return GenericToolView;

  })(View);
  
}});

window.require.define({"chaplin/views/History": function(exports, require, module) {
  var HistoryToolView, HistoryView, Mediator, Tool, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  HistoryToolView = require('chaplin/views/HistoryTool');

  Tool = require('chaplin/models/Tool');

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
      this.views = [];
      this.rows = 0;
      this.cols = 0;
      this.grid = [];
      this.guids = {};
      Mediator.subscribe('history:render', this.renderTool, this);
      return Mediator.subscribe('history:toggle', this.toggleHistory, this);
    };

    HistoryView.prototype.afterRender = function() {
      var height,
        _this = this;
      HistoryView.__super__.afterRender.apply(this, arguments);
      $(this.el).css('width', $(window).width() - $('footer#bottom').outerWidth()).addClass('container');
      this.tools = $(this.el).find('#tools');
      (height = function() {
        return _this.tools.css('height', ($(window).height() * .5) - 67);
      })();
      $(window).resize(height);
      this.checkCollection();
      this.delegate('click', '#serialize', this.serializeHistory);
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
      $('div#whiteout').toggle();
      return $(this.el).parent().slideToggle();
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
      $(this.el).find('#tools table.grid').css('width', 180 * this.cols);
      return $(this.el).find('p.message').hide();
    };

    HistoryView.prototype.drawConnector = function(a, b) {
      var height, pos, svg, width, x1, x2, y1, y2, _ref, _ref1;
      width = 180;
      height = 98;
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
        'code': {
          'src': JSON.stringify(window.History.models, null, 4),
          'lang': 'json'
        }
      });
    };

    return HistoryView;

  })(View);
  
}});

window.require.define({"chaplin/views/HistoryTool": function(exports, require, module) {
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

    HistoryToolView.prototype.afterRender = function() {
      HistoryToolView.__super__.afterRender.apply(this, arguments);
      $(this.el).attr('class', "" + (this.model.get('type')) + " step").attr('data-id', this.model.id);
      this.updateTime($(this.el).find('em.ago'));
      return this;
    };

    return HistoryToolView;

  })(GenericToolView);
  
}});

window.require.define({"chaplin/views/Landing": function(exports, require, module) {
  var Chaplin, LandingView, Mediator, NextStepsLandingView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  NextStepsLandingView = require('chaplin/views/NextStepsLanding');

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

    LandingView.prototype.afterRender = function() {
      LandingView.__super__.afterRender.apply(this, arguments);
      this.views.push(new NextStepsLandingView());
      this.delegate('click', '#reset', this.resetDatabase);
      return this;
    };

    LandingView.prototype.resetDatabase = function() {
      var collection;
      collection = window.History;
      collection.storage.reset();
      collection.reset();
      return Backbone.sync('update', collection);
    };

    return LandingView;

  })(View);
  
}});

window.require.define({"chaplin/views/LeftSidebar": function(exports, require, module) {
  var LeftSidebarView, NextStepsLeftView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('chaplin/core/View');

  NextStepsLeftView = require('chaplin/views/NextStepsLeft');

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

    LeftSidebarView.prototype.afterRender = function() {
      LeftSidebarView.__super__.afterRender.apply(this, arguments);
      this.views.push(new NextStepsLeftView());
      return this;
    };

    return LeftSidebarView;

  })(View);
  
}});

window.require.define({"chaplin/views/Modal": function(exports, require, module) {
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

    LeftSidebarView.prototype.afterRender = function() {
      LeftSidebarView.__super__.afterRender.apply(this, arguments);
      $(this.el).addClass('reveal-modal');
      return this;
    };

    LeftSidebarView.prototype.show = function(_arg) {
      var code, el, text, title;
      title = _arg.title, text = _arg.text, code = _arg.code;
      el = $(this.el);
      if (title) {
        el.find('.title').html(title);
      }
      if (code) {
        el.find('.code').html(code.src).attr('data-language', code.lang);
        Rainbow.color();
      }
      el.reveal();
      return el.find('.scroll').css({
        'height': $(window).height() / 2
      });
    };

    return LeftSidebarView;

  })(View);
  
}});

window.require.define({"chaplin/views/NextSteps": function(exports, require, module) {
  var Mediator, NextStepsView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  View = require('chaplin/core/View');

  module.exports = NextStepsView = (function(_super) {

    __extends(NextStepsView, _super);

    function NextStepsView() {
      this.add = __bind(this.add, this);

      this.activate = __bind(this.activate, this);
      return NextStepsView.__super__.constructor.apply(this, arguments);
    }

    NextStepsView.prototype.containerMethod = 'html';

    NextStepsView.prototype.autoRender = true;

    NextStepsView.prototype.tagName = 'div';

    NextStepsView.prototype.getTemplateFunction = function() {};

    NextStepsView.prototype.initialize = function() {
      NextStepsView.__super__.initialize.apply(this, arguments);
      this.list = {};
      return Mediator.subscribe('history:activate', this.activate, this);
    };

    NextStepsView.prototype.activate = function(current) {
      this.current = current;
    };

    NextStepsView.prototype.add = function(_arg) {
      var category, label, slug, suffix;
      slug = _arg.slug, label = _arg.label, category = _arg.category;
      assert(this.method, 'We do not know which linking `method` to use');
      suffix = '';
      if (this.method === 'continue') {
        suffix = "/" + this.current;
      }
      if (!this.list[category]) {
        $(this.el).append($('<h4/>', {
          'text': category
        }));
        $(this.el).append(this.list[category] = $('<ul/>'));
      }
      return this.list[category].append($('<li/>').append($('<a/>', {
        'text': label,
        'href': "/tool/" + slug + "/" + this.method + suffix
      })));
    };

    return NextStepsView;

  })(View);
  
}});

window.require.define({"chaplin/views/NextStepsLanding": function(exports, require, module) {
  var Mediator, NextStepsLandingView, NextStepsView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  NextStepsView = require('chaplin/views/NextSteps');

  module.exports = NextStepsLandingView = (function(_super) {

    __extends(NextStepsLandingView, _super);

    function NextStepsLandingView() {
      return NextStepsLandingView.__super__.constructor.apply(this, arguments);
    }

    NextStepsLandingView.prototype.container = '#next';

    NextStepsLandingView.prototype.method = 'new';

    NextStepsLandingView.prototype.initialize = function() {
      NextStepsLandingView.__super__.initialize.apply(this, arguments);
      return Mediator.subscribe('contextRender:i:onHomepage', this.add, this);
    };

    NextStepsLandingView.prototype.afterRender = function() {
      NextStepsLandingView.__super__.afterRender.apply(this, arguments);
      Mediator.publish('context:i:onHomepage');
      return this;
    };

    return NextStepsLandingView;

  })(NextStepsView);
  
}});

window.require.define({"chaplin/views/NextStepsLeft": function(exports, require, module) {
  var Mediator, NextStepsLeftView, NextStepsView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  NextStepsView = require('chaplin/views/NextSteps');

  module.exports = NextStepsLeftView = (function(_super) {

    __extends(NextStepsLeftView, _super);

    function NextStepsLeftView() {
      return NextStepsLeftView.__super__.constructor.apply(this, arguments);
    }

    NextStepsLeftView.prototype.container = '#next';

    NextStepsLeftView.prototype.method = 'new';

    NextStepsLeftView.prototype.initialize = function() {
      NextStepsLeftView.__super__.initialize.apply(this, arguments);
      return Mediator.subscribe('contextRender:i:onLeft', this.add, this);
    };

    NextStepsLeftView.prototype.afterRender = function() {
      NextStepsLeftView.__super__.afterRender.apply(this, arguments);
      Mediator.publish('context:i:onLeft');
      return this;
    };

    return NextStepsLeftView;

  })(NextStepsView);
  
}});

window.require.define({"chaplin/views/NextStepsRight": function(exports, require, module) {
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

    NextStepsRightView.prototype.initialize = function() {
      var key, map, _results,
        _this = this;
      NextStepsRightView.__super__.initialize.apply(this, arguments);
      _results = [];
      for (key in Registry) {
        map = Registry[key];
        _results.push((function(key, map) {
          return Mediator.subscribe("contextRender:" + key, _this.add, _this);
        })(key, map));
      }
      return _results;
    };

    return NextStepsRightView;

  })(NextStepsView);
  
}});

window.require.define({"chaplin/views/RightSidebar": function(exports, require, module) {
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

    RightSidebarView.prototype.afterRender = function() {
      RightSidebarView.__super__.afterRender.apply(this, arguments);
      this.views.push(new NextStepsRightView());
      return this;
    };

    return RightSidebarView;

  })(View);
  
}});

window.require.define({"chaplin/views/Tool": function(exports, require, module) {
  var GenericToolView, Mediator, Tool, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  Tool = require('chaplin/models/Tool');

  GenericToolView = require('chaplin/views/GenericTool');

  module.exports = ToolView = (function(_super) {

    __extends(ToolView, _super);

    function ToolView() {
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
      var label, name, _fn, _ref,
        _this = this;
      ToolView.__super__.initialize.apply(this, arguments);
      if (this.contexts) {
        _ref = this.contexts;
        _fn = function(name, label) {
          return Mediator.subscribe("context:" + name, function(next) {
            return next.add(_this.model.get('slug'), label);
          }, _this);
        };
        for (name in _ref) {
          label = _ref[name];
          _fn(name, label);
        }
      }
      this.step = this.options.step || 1;
      return Mediator.subscribe('tool:step', function(step) {
        _this.step = step;
        return _this.render();
      }, this);
    };

    ToolView.prototype.afterRender = function() {
      var crumb, crumbs, name, _fn, _i, _len, _ref;
      ToolView.__super__.afterRender.apply(this, arguments);
      name = this.model.get('name');
      assert(name, 'Name of the tool is not provided');
      $(this.el).find("ul.accordion li(data-step='<%= @step %>') div.content").html((require("tools/templates/" + name + "/step-" + this.step))(this.getTemplateData()));
      if (window.History.length !== 0) {
        crumbs = $(this.el).find('ul.breadcrumbs');
        _ref = window.History.models.slice(-2);
        _fn = function(crumb) {
          var a, li;
          crumbs.show();
          li = $('<li/>', {
            'class': 'entypo rightopen'
          });
          li.append(a = $('<a/>', {
            'href': "/tool/" + (crumb.get('slug')) + "/id/" + (crumb.get('guid')),
            'text': crumb.get('title')
          }));
          return crumbs.append(li);
        };
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          crumb = _ref[_i];
          _fn(crumb);
        }
        crumbs.append($('<li/>', {
          'class': 'entypo rightopen',
          'html': '&nbsp;'
        }));
      }
      if (this.model.get('locked') != null) {
        this.updateTime($(this.el).find('em.ago'));
      }
      return this;
    };

    ToolView.prototype.getDOM = function() {
      return $(this.el).find('ul.accordion li.active div.content');
    };

    return ToolView;

  })(GenericToolView);
  
}});

window.require.define({"tools/Registry": function(exports, require, module) {
  
  module.exports = {
    'i:onHomepage': [
      {
        'slug': 'upload-list-tool',
        'label': 'Start by uploading a list',
        'category': 'Data loaders'
      }, {
        'slug': 'enrich-list-tool',
        'label': 'Start by enriching an existing list',
        'category': 'Enrichment'
      }
    ],
    'i:onLeft': [
      {
        'slug': 'upload-list-tool',
        'label': 'Upload a new list',
        'category': 'Data loaders'
      }, {
        'slug': 'enrich-list-tool',
        'label': 'Enrich an existing list',
        'category': 'Enrichment'
      }
    ],
    'i:haveList': [
      {
        'slug': 'enrich-list-tool',
        'label': 'Enrich this list',
        'category': 'Enrichment'
      }, {
        'slug': 'results-table-tool',
        'label': 'View this list in a table',
        'category': 'Visualization'
      }
    ]
  };
  
}});

window.require.define({"tools/models/EnrichListTool": function(exports, require, module) {
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
  
}});

window.require.define({"tools/models/ResultsTableTool": function(exports, require, module) {
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
  
}});

window.require.define({"tools/models/UploadListTool": function(exports, require, module) {
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
      'slug': 'upload-list-tool',
      'name': 'UploadListTool',
      'title': 'Upload a List',
      'description': 'Upload a list of identifiers',
      'type': 'deyork',
      'steps': ['Input Identifiers', 'See Result']
    };

    return UploadListTool;

  })(Tool);
  
}});

window.require.define({"tools/templates/EnrichListTool/step-1": function(exports, require, module) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>Select the list you want to enrich.</p>\n        </div>\n    </div>\n    <div class="row">\n        <div class="twelve columns">\n            <a id="submit" class="button">Enrich this list</span></a>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"tools/templates/EnrichListTool/step-2": function(exports, require, module) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="four columns">\n            <h2>Gene Enrichment</h2>\n            <p>A chart would be shown here for identifiers:</p>\n            <ul>\n                ');
      
        _ref = this.data.list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          __out.push('\n                    <li>');
          __out.push(__sanitize(id));
          __out.push('</li>\n                ');
        }
      
        __out.push('\n            </ul>\n        </div>\n        <div class="four columns">\n            <h2>Publication Enrichment</h2>\n            <p>A chart would be shown here for identifiers:</p>\n            <ul>\n                ');
      
        _ref1 = this.data.list;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          id = _ref1[_j];
          __out.push('\n                    <li>');
          __out.push(__sanitize(id));
          __out.push('</li>\n                ');
        }
      
        __out.push('\n            </ul>\n        </div>\n        <div class="four columns">\n            <h2>Protein Enrichment</h2>\n            <p>A chart would be shown here for identifiers:</p>\n            <ul>\n                ');
      
        _ref2 = this.data.list;
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
}});

window.require.define({"tools/templates/ResultsTableTool/step-1": function(exports, require, module) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <table>\n                <thead>\n                    <tr>\n                        <th>Identifier</th>\n                        <th>Attr 1</th>\n                        <th>Attr 2</th>\n                        <th>Attr 3</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ');
      
        _ref = this.previous.identifiers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          __out.push('\n                        <tr>\n                            <td>');
          __out.push(__sanitize(id));
          __out.push('</td>\n                            <td>Дмитрий Фролов</td>\n                            <td>Егор Мальцев</td>\n                            <td>Станислав Тарасов</td>\n                        </tr>\n                    ');
        }
      
        __out.push('\n                </tbody>\n            </table>\n        </div>\n    </div>\n</div>');
      
      }).call(this);
      
    }).call(__obj);
    __obj.safe = __objSafe, __obj.escape = __escape;
    return __out.join('');
  }
}});

window.require.define({"tools/templates/UploadListTool/step-1": function(exports, require, module) {
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
      
        if (this.data && this.data.identifiers) {
          __out.push('\n                <textarea>');
          _ref = this.data.identifiers;
          for (i in _ref) {
            id = _ref[i];
            __out.push(__sanitize(id));
            if (parseInt(i) !== this.data.identifiers.length - 1) {
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
}});

window.require.define({"tools/templates/UploadListTool/step-2": function(exports, require, module) {
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
}});

window.require.define({"tools/views/EnrichListTool": function(exports, require, module) {
  var EnrichListToolView, Mediator, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mediator = require('chaplin/core/Mediator');

  ToolView = require('chaplin/views/Tool');

  module.exports = EnrichListToolView = (function(_super) {

    __extends(EnrichListToolView, _super);

    function EnrichListToolView() {
      return EnrichListToolView.__super__.constructor.apply(this, arguments);
    }

    EnrichListToolView.prototype.afterRender = function() {
      EnrichListToolView.__super__.afterRender.apply(this, arguments);
      switch (this.step) {
        case 1:
          if (this.options.previous && this.options.previous.data && this.options.previous.data.identifiers) {
            this.setList(this.options.previous.data.identifiers);
          }
          break;
        case 2:
          assert(this.model.get('data'), 'List not provided');
      }
      this.delegate('click', '#submit', function() {
        return this.setList(['Random #1', 'Random #2']);
      });
      return this;
    };

    EnrichListToolView.prototype.setList = function(list) {
      this.model.set({
        'data': {
          'list': list
        }
      });
      Mediator.publish('history:add', this.model);
      return Mediator.publish('tool:step', this.step += 1);
    };

    return EnrichListToolView;

  })(ToolView);
  
}});

window.require.define({"tools/views/ResultsTableTool": function(exports, require, module) {
  var ResultsTableTool, ToolView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ToolView = require('chaplin/views/Tool');

  module.exports = ResultsTableTool = (function(_super) {

    __extends(ResultsTableTool, _super);

    function ResultsTableTool() {
      return ResultsTableTool.__super__.constructor.apply(this, arguments);
    }

    return ResultsTableTool;

  })(ToolView);
  
}});

window.require.define({"tools/views/UploadListTool": function(exports, require, module) {
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

    UploadListToolView.prototype.afterRender = function() {
      UploadListToolView.__super__.afterRender.apply(this, arguments);
      switch (this.step) {
        case 2:
          Mediator.publish('context:i:haveList');
      }
      this.delegate('click', '#submit', function() {
        this.model.set('data', {
          'identifiers': this.getDOM().find('form textarea').val().split(' ')
        });
        Mediator.publish('history:add', this.model);
        return Mediator.publish('tool:step', this.step += 1);
      });
      return this;
    };

    return UploadListToolView;

  })(ToolView);
  
}});

