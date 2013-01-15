Chaplin = require 'chaplin'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
ToolView = require 'chaplin/views/Tool'
HistoryView = require 'chaplin/views/History'

History = require 'chaplin/models/History'
Tool = require 'chaplin/models/Tool'

module.exports = class InterMineSteps

    # Whitelist of tools we can use.
    tools: [ 'UploadList', 'CompareLists', 'UseSteps' ]

    constructor: ->
        # Which page are we serving?
        [ ctrl, action ] = window.location.pathname.split('/')[1...]

        # An individual tool?
        if action and ctrl is 'tool'
            # Get the tool name.
            tool = ( ( p[0].toUpperCase() + p[1...] if p ) for p in action.split('-') ).join('')
            assert tool in @tools, "Unknown tool `#{tool}`"

            # Create the main app view.
            new AppView()

            # Init the history view.
            new HistoryView 'collection': window.History

            # A specific tool, show the sidebar.
            new LeftSidebarView()

            # ...and the actual tool.
            new ToolView 'model': new Tool('name': tool)

        # Landing page.
        else
            # Create the landing page view.
            new LandingView()

            # Reset the history.
            window.History.reset()