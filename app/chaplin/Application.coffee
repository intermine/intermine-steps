Chaplin = require 'chaplin'

LandingView = require 'chaplin/views/Landing'
AppView = require 'chaplin/views/App'
SidebarView = require 'chaplin/views/Sidebar'
ToolView = require 'chaplin/views/Tool'
WorkflowView = require 'chaplin/views/Workflow'

Workflow = require 'chaplin/models/Workflow'
Tool = require 'chaplin/models/Tool'

module.exports = class FluxMine

    constructor: ->
        # Get path.
        path = window.location.pathname

        # Have we asked for a specific tool?
        if path is '/'
            # Create the landing page view.
            new LandingView()
        else
            # Get the tool name.
            tool = ( ( p[0].toUpperCase() + p[1...] ) for p in path.split('/').pop().split('-') ).join('')
            assert tool in [ 'UploadList' ], "Unknown tool `#{tool}`"

            # Create the main app view.
            new AppView()

            # Init the workflow.
            new WorkflowView 'collection': new Workflow()

            # A specific tool, show the sidebar.
            new SidebarView()

            # ...and the actual tool.
            new ToolView 'model': new Tool('name': tool)