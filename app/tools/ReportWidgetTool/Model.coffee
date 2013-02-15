Tool = require 'chaplin/models/Tool'

module.exports = class ReportWidgetTool extends Tool

    defaults:
        'slug': 'report-widget-tool'
        'name': 'ReportWidgetTool'
        'title': 'Report Widget'
        'description': 'See a report widget'
        'type': 'goldentainoi'
        'steps': [ 'See a Widget' ]