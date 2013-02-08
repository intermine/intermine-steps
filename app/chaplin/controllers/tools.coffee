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
        Mediator.publish 'tool:new'

        @_chrome()

        # Do we know this tool in a registry?
        unless spec = Registry[slug]
            window.App.router.route '/error/404', { 'changeURL': false }
            assert spec, "Tool `#{slug}` does not exist"

        # Require the Model.
        Clazz = require "tools/models/#{spec.name}"
        # Blank slate, only the spec.
        model = new Clazz spec

        # Require the View.
        Clazz = require "tools/views/#{spec.name}"

        # Render the View.
        @views.push new Clazz 'model': model

        # Change the title.
        @adjustTitle model.get 'title'

    cont: ({ slug }) ->
        Mediator.publish 'tool:cont'

        @_chrome()

        # Do we know this tool in a registry?
        unless spec = Registry[slug]
            window.App.router.route '/error/404', { 'changeURL': false }
            assert spec, "Tool `#{slug}` does not exist"

        # Require the Model.
        Clazz = require "tools/models/#{spec.name}"
        # Blank slate, only the spec.
        model = new Clazz spec

        # Require the View.
        Clazz = require "tools/views/#{spec.name}"

        previous = @collection.getCurrent()
        # Did we actually have a previous step?
        unless previous
            window.App.router.route '/error/404', { 'changeURL': false }
            assert model, 'No previous step'

        # Render the View.
        @views.push new Clazz 'model': model, 'previous': previous.toJSON()

        # Change the title.
        @adjustTitle model.get 'title'

    old: ({ slug, guid }) ->
        Mediator.publish 'tool:old'

        # Find the model in question.
        [ model ] = @collection.where 'slug': slug, 'guid': guid
        unless model
            window.App.router.route '/error/404', { 'changeURL': false }
            assert model, 'We do not have this Model in History'

        @_chrome()

        # Require the View.
        Clazz = require "tools/views/#{model.get('name')}"

        # Lock the Model.
        model.set 'locked', true

        # Render the View.
        @views.push new Clazz 'model': model

        # Activate this model.
        Mediator.publish 'history:activate', guid

        # Change the title.
        @adjustTitle model.get 'title'