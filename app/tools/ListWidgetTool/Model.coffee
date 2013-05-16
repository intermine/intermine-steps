Tool = require 'chaplin/models/Tool'

module.exports = class ListWidgetTool extends Tool

    defaults:
        'slug': 'list-widget-tool'
        'name': 'ListWidgetTool'
        'title': 'List Widget'
        'description': 'Show a List Widget'
        'type': 'kimberly'
        'steps': [ 'Choose a list', 'See a Widget' ]