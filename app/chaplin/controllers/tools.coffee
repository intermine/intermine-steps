Controller = require 'chaplin/core/Controller'

Mediator = require 'chaplin/core/Mediator'

AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'
ModalView = require 'chaplin/views/Modal'

root = @

module.exports = class ToolsController extends Controller

    historyURL: (params) -> ''

    collection: root.History

    # Init the chrome.
    _chrome: ->
        @views.push new AppView()
        @views.push new HistoryView 'collection': @collection
        @views.push new LeftSidebarView()
        @views.push new RightSidebarView()
        @views.push new ModalView()

    new: ({ slug, extra }) ->
        @_chrome()

        # Convert to PascalCase.
        name = root.Utils.hyphenToPascal slug

        try
            # Require the Model.
            Clazz = require "tools/#{name}/Model"
            model = new Clazz()

            # Require the View.
            Clazz = require "tools/#{name}/View"
        catch e
            @redirectToRoute 404
            assert false, "Unknown tool `#{name}`"

        # Render the View.
        @views.push new Clazz 'model': model, 'extra': extra

        # Change the title.
        @adjustTitle model.get 'title'

    cont: ({ slug, extra, guid }) ->
        @_chrome()

        # Convert to PascalCase.
        name = root.Utils.hyphenToPascal slug

        try
            # Require the Model.
            Clazz = require "tools/#{name}/Model"
            model = new Clazz()

            # Require the View.
            Clazz = require "tools/#{name}/View"
        catch e
            @redirectToRoute 500
            assert false, "Unknown tool `#{name}`"

        previous = (@collection.where({ 'guid': guid })).pop()
        # Did we actually have a previous step?
        unless previous
            @redirectToRoute 500
            assert false, 'No previous step'

        # Set the parent on us.
        model.set 'parent': guid

        # Render the View.
        @views.push new Clazz 'model': model, 'previous': previous.toJSON(), 'extra': extra

        # Change the title.
        @adjustTitle model.get 'title'

    old: ({ guid }) ->
        # Find the model in question.
        [ model ] = @collection.where 'guid': guid
        unless model
            @redirectToRoute 500
            assert false, 'We do not have this Model in History'

        @_chrome()

        name = model.get('name')

        try
            # Require the View.
            Clazz = require "tools/#{name}/View"
        catch e
            @redirectToRoute 500
            assert false, "Unknown tool `#{name}`"

        # Dupe so we set new data on a new model.
        model = @collection.dupe model

        # Render the View.
        @views.push new Clazz 'model': model

        # Activate this model.
        Mediator.publish 'history:activate', guid

        # Change the title.
        @adjustTitle model.get 'title'