Controller = require 'chaplin/core/Controller'

AppView = require 'chaplin/views/App'
LeftSidebarView = require 'chaplin/views/LeftSidebar'
RightSidebarView = require 'chaplin/views/RightSidebar'
HistoryView = require 'chaplin/views/History'

Registry = require 'tools/Registry'

module.exports = class ToolsController extends Controller

    historyURL: (params) -> ''

    collection: window.History

    new: ({ slug }) ->
        # Init the chrome.
        @views.push new AppView()
        @views.push new HistoryView 'collection': @collection
        @views.push new LeftSidebarView()
        @views.push new RightSidebarView()

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

    old: ({ slug, row, col }) ->
        console.log 'old', slug, row, col