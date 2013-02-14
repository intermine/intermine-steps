window.require.register("chaplin/templates/404", function(exports, require, module) {
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
      
        __out.push('<div id="wrapper">\n    <!-- header, account etc. -->\n    <header id="top">\n        <div class="inner">\n            <div class="account right">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n        </div>\n    </header>\n\n    <section id="middle">\n        <!-- new tools -->\n        <aside id="left"></aside>\n        <!-- the tool -->\n        <div id="widget"></div>\n        <!-- from here -->\n        <aside id="right"></aside>\n    </section>\n</div>\n\n<!-- show when we want to hide the app (but say not the history) -->\n<div id="whiteout"></div>\n\n<!-- tools used in the history -->\n<div id="history"></div>\n\n<!-- history toggler fixed to bottom -->\n<footer id="bottom">\n    <div class="wrap">\n        <a class="button" data-action="history-toggle">Show history</a>\n    </div>\n</footer>\n\n<!-- finally the almighty modal -->\n<div id="modal"></div>');
      
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
      
        __out.push('<span class="entypo rightopen"></span>\n<a href="/tool/');
      
        __out.push(__sanitize(this.slug));
      
        __out.push('/id/');
      
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
      
        __out.push('<div class="head">\n    <a id="serialize" class="button success">Serialize</a> <h1><span class="entypo flowbranch"></span> History</h1>\n    <p class="message">Steps you have taken will be populated here as you work with this app.</p>\n</div>\n\n<div id="tools">\n    <svg class="canvas"></svg>\n    <table class="grid"></table>\n</div>');
      
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
      
        __out.push('<div id="wrapper">\n    <header id="top">\n        <div class="inner">\n            <div class="account right">\n                Monsieur Tout-le-Monde <span>&#8226;</span> <a>Logout</a>\n            </div>\n            <a href="/"><h1>InterMine Steps <span>&alpha;</span></h1></a>\n        </div>\n    </header>\n\n    <section id="middle">\n        <div id="landing" class="container row">\n            <div class="four columns">\n                <h2><span class="entypo crossroads"></span> Tools</h2>\n                <!-- populate next steps here -->\n                <div id="next"></div>\n            </div>\n            <div class="four columns">\n                <h2><span class="entypo lifebuoy"></span> Help</h2>\n                <ul>\n                    <li>Lorem ipsum dolor</li>\n                    <li>Sed ut perspiciatis</li>\n                    <li>At vero eos et accusamus</li>\n                </ul>\n            </div>\n            <div class="four columns">\n                <div class="panel">\n                    <h5>System Actions</h5>\n                    <p>Use the following action to clear\n                        <code>Backbone.js Collection</code> and associated\n                        <code>LocalStorage</code>:</p>\n                    <a class="button" id="reset">Reset Database</a>\n                </div>\n            </div>\n            <div class="six columns">\n                <ul class="pricing-table">\n                    <li class="title">What it does now</li>\n                    <li class="bullet-item">Concept of a tool consisting of multiple steps</li>\n                    <li class="bullet-item"><strong>Linking</strong> between multiple tools through events</li>\n                    <li class="bullet-item">Dynamically updating used tool timestamps (time ago)</li>\n                    <li class="bullet-item"><strong>Serialization</strong> of history to the server (and locally)</li>\n                    <li class="bullet-item">Efficiently using local (rather than server) data when multiple tabbing</li>\n                    <li class="bullet-item"><strong>Multiple</strong> streams of history, splits, all rendered in a <strong>grid</strong></li>\n                    <li class="bullet-item"><strong>Back button</strong> to visit steps saved in the past</li>\n                    <li class="bullet-item"><strong>Multiple tabs</strong> to have an eyeball*</li>\n                    <li class="bullet-item">Latest breadcrumbs and history grid in all tabs</li>\n                    <li class="description">* sync all tabs a user has opened in a browser on 1Hz schedule</li>\n                </ul>\n            </div>\n            <div class="six columns">\n                <ul class="pricing-table">\n                    <li class="title">Working on next &hellip;</li>\n                    <li class="bullet-item">Uncluttered example tools from a spec by Julie</li>\n                    <li class="bullet-item">Tool registry having a label "weight" concept</li>\n                    <li class="bullet-item">Editable help for tools &amp; labels</li>\n                </ul>\n            </div>\n        </div>\n    </section>\n</div>\n\n<footer id="wide">\n    <p>&copy; 2000-2013 InterMine, University of Cambridge</p>\n</footer>');
      
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
      
        __out.push('<div class="wrap">\n    <h3><span class="entypo crossroads"></span> Start all over again</h3>\n    <div id="next"></div>\n</div>');
      
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
      
        __out.push('<div class="wrap">\n    <h3><span class="entypo clippy"></span> What can I do next?</h3>\n    <p class="description">The next steps you can take from here will be shown here.</p>\n    <div id="continue"></div>\n</div>');
      
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
});
window.require.register("tools/templates/EnrichListTool/step-1", function(exports, require, module) {
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
      
        __out.push('<div class="container">\n    <div class="row">\n        <div class="twelve columns">\n            <p>Select the list you want to enrich:</p>\n            <table>\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th>List name</th>\n                        <th>Tags</th>\n                        <th>Size</th>\n                    </tr>\n                </thead>\n                <tbody>\n                ');
      
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
          __out.push('</td>\n                        <td>\n                            <span class="secondary label">Random data</span>\n                        </td>\n                        <td>');
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
window.require.register("tools/templates/EnrichListTool/step-2", function(exports, require, module) {
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
window.require.register("tools/templates/ResultsTableTool/step-1", function(exports, require, module) {
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
});
window.require.register("tools/templates/UploadListTool/step-1", function(exports, require, module) {
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
});
window.require.register("tools/templates/UploadListTool/step-2", function(exports, require, module) {
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
