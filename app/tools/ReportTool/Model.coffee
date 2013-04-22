Tool = require 'chaplin/models/Tool'

module.exports = class ReportTool extends Tool

    defaults:
        'slug': 'report-tool'
        'name': 'ReportTool'
        'type': 'deyork'
        'steps': [ 'Choose input object', 'See report page' ]