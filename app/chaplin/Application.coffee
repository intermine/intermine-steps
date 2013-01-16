Chaplin = require 'chaplin'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

History = require 'chaplin/models/History'
Tool = require 'chaplin/models/Tool'

module.exports = class InterMineSteps

    # Whitelist of tools we can use.
    tools: [ 'UploadListTool', 'CompareListsTool', 'UseStepsTool' ]

    # Cleanup views here.
    views: []

    constructor: ->
        # Which page are we serving?
        [ action, name ] = window.location.pathname.split('/')[1...]

        if action is 'tool' and name then @changeTool name
        else @landing()

        # Listen to traffic trying to change the tool.
        Chaplin.mediator.subscribe 'app:changeTool', @changeTool

    changeTool: (tool, step=1) =>
        assert tool in @tools, "Unknown tool `#{tool}`"

        # Cleanup previous.
        ( view.dispose() for view in @views )

        # Create the main app view.
        @appView ?= new AppView()

        # Init the history view.
        @historyView ?= new HistoryView 'collection': window.History

        # A specific tool, show the sidebars.
        @leftSidebarView ?= new LeftSidebarView()
        @rightSidebarView ?= new RightSidebarView()
        
        # ...and the actual tool.
        Clazz = require "chaplin/views/tools/#{tool}"
        @views.push new Clazz
            'model': new Tool('name': tool)
            'step': step

    # Landing page.
    landing: =>
        # Create the landing page view.
        @views.push new LandingView()

        # Reset the history.
        window.History.reset()