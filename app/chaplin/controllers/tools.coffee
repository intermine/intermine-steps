Controller = require 'chaplin/core/Controller'

Mediator = require 'chaplin/core/Mediator'

AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

Registry = require 'tools/Registry'

module.exports = class ToolsController extends Controller

    historyURL: (params) -> ''

    collection: window.History

    # Init the chrome.
    _chrome: ->
        @views.push new AppView()
        @views.push new HistoryView 'collection': @collection
        @views.push new LeftSidebarView()
        @views.push new RightSidebarView()


    new: ({ slug }) ->
        @_chrome()

        # Do we know this tool in a registry?
        assert spec = Registry[slug], "Tool `#{slug}` does not exist"

        # Require the Model.
        Clazz = require "tools/models/#{spec.name}"
        # Blank slate, only the spec.
        model = new Clazz spec

        # Require the View.
        Clazz = require "tools/views/#{spec.name}"

        # Render the View.
        @views.push new Clazz 'model': model

    cont: ({ slug }) ->
        @_chrome()

        # Do we know this tool in a registry?
        assert spec = Registry[slug], "Tool `#{slug}` does not exist"

        # Require the Model.
        Clazz = require "tools/models/#{spec.name}"
        # Blank slate, only the spec.
        model = new Clazz spec

        # Require the View.
        Clazz = require "tools/views/#{spec.name}"

        previous = @collection.getCurrent()
        # Did we actually have a previous step?
        assert previous, "No previous step"

        # Render the View.
        @views.push new Clazz 'model': model, 'previous': previous.toJSON()

    old: ({ slug, row, col }) ->
        # Convert type.
        row = parseInt(row) ; col = parseInt(col)
        # Find the model in question.
        [ model ] = @collection.where 'slug': slug, 'row': row, 'col': col
        assert model, "We do not have this Model in History"

        @_chrome()

        # Require the View.
        Clazz = require "tools/views/#{model.get('name')}"

        # Render the View.
        @views.push new Clazz 'model': model, 'historical': true

        # Activate this model.
        Mediator.publish 'history:activate', { 'row': model.get('row'), 'col': model.get('col') }