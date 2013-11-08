Controller = require '../core/Controller'

Mediator = require '../core/Mediator'

AppView = require '../views/App'
NextStepsHeaderView = require '../views/NextStepsHeader'
RightSidebarView = require '../views/RightSidebar'
HistoryView = require '../views/History'

root = @

module.exports = class ToolsController extends Controller

    'collection': root.History

    # Init the chrome.
    _chrome: ->
        @views.push new AppView()
        @views.push new NextStepsHeaderView()
        @views.push new HistoryView 'collection': @collection
        @views.push new RightSidebarView()

    new: ({ slug, extra }) ->
        do @_chrome

        # Convert to PascalCase.
        name = root.Utils.hyphenToPascal slug

        try
            # Require the Model.
            Clazz = require "/steps/tools/#{name}/Model"
            model = new Clazz()

            # Require the View.
            Clazz = require "/steps/tools/#{name}/View"
        catch e
            Chaplin.helpers.redirectTo '404'
            assert false, "Unknown tool `#{name}`"

        # Render the View.
        @views.push new Clazz 'model': model, 'extra': extra

        # Change the title.
        @adjustTitle model.get 'title'

    # Continue from a previous tool.
    cont: ({ slug, extra, guid }) ->
        do @_chrome

        # Convert to PascalCase.
        name = root.Utils.hyphenToPascal slug

        try
            # Require the Model.
            Clazz = require "/steps/tools/#{name}/Model"
            model = new Clazz()

            # Require the View.
            Clazz = require "/steps/tools/#{name}/View"
        catch e
            Chaplin.helpers.redirectTo '500'
            assert false, "Unknown tool `#{name}`"

        previous = (@collection.where({ 'guid': guid })).pop()
        # Did we actually have a previous step?
        unless previous
            Chaplin.helpers.redirectTo '500'
            assert false, 'No previous step'

        # Set the parent on us.
        model.set 'parent': guid

        # Render the View.
        @views.push new Clazz 'model': model, 'previous': previous.toJSON(), 'extra': extra, 'step': 1

        # Change the title.
        @adjustTitle model.get 'title'

    # Step 1 or 2 of an old/locked tool.
    old: ({ guid }, route) ->
        # Find the model in question.
        [ model ] = @collection.where 'guid': guid
        unless model
            Chaplin.helpers.redirectTo '500'
            assert false, 'We do not have this Model in History'

        do @_chrome

        name = model.get('name')

        try
            # Require the View.
            Clazz = require "/steps/tools/#{name}/View"
        catch e
            Chaplin.helpers.redirectTo '500'
            assert false, "Unknown tool `#{name}`"

        # Dupe so we set new data on a new model.
        model = @collection.dupe model

        # Results step?
        step = if route.action is 'results' then 2 else 1

        # Render the View.
        @views.push new Clazz 'model': model, 'step': step

        # Activate this model.
        Mediator.publish 'history:activate', guid

        # Change the title.
        @adjustTitle model.get 'title'

# Reuse old for results so we get app reload on change.
ToolsController::results = ToolsController::old