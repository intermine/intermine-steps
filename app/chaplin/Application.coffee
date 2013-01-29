Chaplin = require 'chaplin'

Mediator = require 'chaplin/lib/Mediator'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

# Using History.js
PushState = window.History

History = require 'chaplin/models/History'
Tool = require 'chaplin/models/Tool'
Registry = require 'tools/Registry'

module.exports = class InterMineSteps

    constructor: ->
        # Handle URL changes.
        PushState.Adapter.bind window, 'statechange', ->
            State = PushState.getState()
            # Update content.
            # console.log State.data, State.title, State.url

        # Listen to router requests.
        Mediator.subscribe 'router:route',   @route,   @
        Mediator.subscribe 'router:landing', @landing, @

        # Go on the landing page.
        Mediator.publish 'router:landing'

    # Show a landing page.
    landing: =>        
        # Dispose the original views.
        @view?.dispose()

        # Remove the Chrome.
        @appView?.dispose() ; @historyView?.dispose() ; @leftSidebarView?.dispose() ; @rightSidebarView?.dispose()
        @appView = null     ; @historyView = null     ; @leftSidebarView = null     ; @rightSidebarView = null

        # Show the landing page.
        @view = new LandingView()

        # Change the URL to the welcome page.
        PushState.replaceState {}, 'Welcome', '/welcome'

    # Route based on tool name.
    route: (objOrName, step=1, params={}) =>
        @appView ?= new AppView()
        @historyView ?= new HistoryView 'collection': window.History
        @leftSidebarView ?= new LeftSidebarView()
        @rightSidebarView ?= new RightSidebarView()

        # Dispose of the tool view?
        @view?.dispose()

        # Passing Model JSON or string name?
        if typeof objOrName is 'string'
            # Get the settings from registry.
            data = Registry[objOrName]

            # Require the Model.
            Clazz = require "tools/models/#{objOrName}"
            # Load it.
            model = new Clazz data

            # Require the View.
            Clazz = require "tools/views/#{objOrName}"
        else
            Clazz = require "tools/models/#{objOrName.name}"
            # Load it.
            model = new Clazz objOrName

            # Require the View.
            Clazz = require "tools/views/#{objOrName.name}"
        
        # Change the URL to that of the tool's name and log this state.
        PushState.replaceState model, name = model.get('name'), '/tool/' + name.replace(/([A-Z])/g, '-$1').toLowerCase()[1...]

        # Load it.
        @view = new Clazz 'model': model, 'step': step, 'params': params