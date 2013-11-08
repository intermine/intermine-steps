Tool = require '/steps/client/src/models/Tool'

module.exports = class ListWidgetTool extends Tool

    defaults:
        'slug': 'list-widget-tool'
        'name': 'ListWidgetTool'
        'title': 'List Widget'
        'description': 'Show a List Widget'
        'type': 'kimberly'