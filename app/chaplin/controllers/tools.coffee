Controller = require 'chaplin/core/Controller'

Mediator = require 'chaplin/core/Mediator'

AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

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

        # Convert to PascalCase.
        name = window.Utils.hyphenToPascal slug

        # Require the Model.
        Clazz = require "tools/models/#{name}"
        model = new Clazz()

        # Require the View.
        Clazz = require "tools/views/#{name}"

        # Render the View.
        @views.push new Clazz 'model': model

        # Change the title.
        @adjustTitle model.get 'title'

    cont: ({ slug }) ->
        Mediator.publish 'tool:cont'

        @_chrome()

        # Convert to PascalCase.
        name = window.Utils.hyphenToPascal slug

        # Require the Model.
        Clazz = require "tools/models/#{name}"
        model = new Clazz()

        # Require the View.
        Clazz = require "tools/views/#{name}"

        previous = @collection.getCurrent()
        # Did we actually have a previous step?
        unless previous
            window.App.router.route '/error/404', { 'changeURL': false }
            assert false, 'No previous step'

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
            assert false, 'We do not have this Model in History'

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