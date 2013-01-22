Chaplin = require 'chaplin'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

History = require 'chaplin/models/History'
Tool = require 'chaplin/models/Tool'
Registry = require 'chaplin/models/Registry'

module.exports = class InterMineSteps

    # Cleanup views here.
    views: []

    constructor: ->
        # Show the landing page.
        @views.push new LandingView()

        # Listen to router requests.
        Chaplin.mediator.subscribe 'router:route', @route

    # Route based on tool name.
    route: (objOrName, step=1, params={}) =>
        # Create the main app view.
        @appView ?= new AppView()
        @historyView ?= new HistoryView 'collection': window.History
        @leftSidebarView ?= new LeftSidebarView()
        @rightSidebarView ?= new RightSidebarView()

        # Cleanup previous "pages".
        ( view.dispose() for view in @views )

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
        
        # Load it.
        @views.push view = new Clazz 'model': model, 'step': step, 'params': params