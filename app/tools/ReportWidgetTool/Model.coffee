Tool = require 'chaplin/models/Tool'

module.exports = class ReportWidgetTool extends Tool

    defaults:
        'slug': 'report-widget-tool'
        'name': 'ReportWidgetTool'
        'type': 'deyork'
        'steps': [ 'Choose input', 'See widget' ]