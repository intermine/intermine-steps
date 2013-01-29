Chaplin = require 'chaplin'

Mediator = require 'chaplin/core/Mediator'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

History = require 'chaplin/models/History'
Tool = require 'chaplin/models/Tool'
Registry = require 'tools/Registry'

module.exports = class InterMineSteps

    constructor: ->
        # Listen to router requests.
        Mediator.subscribe 'router:route',   @route,   @
        Mediator.subscribe 'router:landing', @landing, @

        # Get the URL of the tool we want to see.
        x = [ slug, row, col ] = window.location.pathname.split('/')[1...]
        unless slug and row and col
            # Go on the landing page.
            Mediator.publish 'router:landing'
        else
            # Type.
            row = parseInt(row) ; col = parseInt(col)

            # Find the appropriate model in our collection.
            [ model ] = window.History.where { 'slug': slug, 'row': row, 'col': col }
            assert model, 'A Model for this URL was not found'
            # Route.
            Mediator.publish 'router:route', model.toJSON()

            # Activate this model.
            Mediator.publish 'step:activate', row, col

    # Show a landing page.
    landing: =>
        # Dispose the original views.
        @view?.dispose()

        # Remove the Chrome.
        @appView?.dispose() ; @historyView?.dispose() ; @leftSidebarView?.dispose() ; @rightSidebarView?.dispose()
        @appView = null     ; @historyView = null     ; @leftSidebarView = null     ; @rightSidebarView = null

        # Show the landing page.
        @view = new LandingView()

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

        # Load it.
        @view = new Clazz 'model': model, 'step': step, 'params': params